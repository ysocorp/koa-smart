/* eslint-disable no-unused-vars */
import KoaRouter from 'koa-router';
import chalk from 'chalk';
import { RateLimit } from 'koa2-ratelimit';
import Koa from 'koa';

import ErrorApp from '../utils/ErrorApp';
import StatusCode from '../utils/StatusCode';
import { deepCopy, isArray } from '../utils/utils';
import { generateDoc } from '../utils/docGenerator';
import RouteDecorators, {
  ParamsMethodDecorator,
  ParamsClassDecorator,
} from './RouteDecorators';

export interface BeforeRouteParams {
  /**
   * the path at which the route will be available.
   */
  path: string;
  options: ParamsMethodDecorator;
  /**
   * the fonction to call when route match, this is automaticaly add by route decorator
   */
  call: Function;
}

export interface RouteParams {
  /**
   * koaApp the Koa application
   */
  koaApp: Koa;
  /**
   * prefix a prefix which will be preppended before every route's paths
   */
  prefix: string;
  /**
   * whether the route should be disabled
   */
  disable: boolean;
}

type Decorator = Function;

interface RateLimitOptions {
  options: {
    rateLimit: any;
    routePath: string;
    type: string;
  };
}

export default class Route {
  /**
   * @desc mounts the tagged function as a GET route.
   */
  static Get: (params: ParamsMethodDecorator) => Decorator =
  RouteDecorators.Get;

  /**
   * @desc mounts the tagged function as a POST route.
   */
  static Post: (params: ParamsMethodDecorator) => Decorator =
  RouteDecorators.Post;

  /**
   * @desc mounts the tagged function as a PUT route.
   */
  static Put: (params: ParamsMethodDecorator) => Decorator =
  RouteDecorators.Put;

  /**
   * @desc mounts the tagged function as a PATCH route.
   */
  static Patch: (params: ParamsMethodDecorator) => Decorator =
  RouteDecorators.Patch;

  /**
   * @desc mounts the tagged function as a DELETE route.
   */
  static Delete: (params: ParamsMethodDecorator) => Decorator =
  RouteDecorators.Delete;

  /**
   * @desc used to set some parameters on an entire class.
   * The supported parameters are middlewares, disable, and routeBase.
   */
  static Route: (params: ParamsClassDecorator) => Decorator =
  RouteDecorators.Route;
  /**
   * @desc if true it will log which route are mount and which are not
   */
  static displayLog = true;
  static StatusCode = StatusCode;
  static generateDoc = generateDoc;

  koaApp: Koa;
  prefix: string;
  allRoutesInstance: Route[];
  disable: boolean;
  middlewares: Array<(ctx: Koa.Context, next: Function) => Promise<void>>;
  koaRouter: KoaRouter;
  routes: { [routeType: string]: Array<Route> };
  routeBase: string;
  accesses: Array<(ctx: Koa.Context) => Promise<boolean>>;
  path: string;
  options: any;

  constructor({ koaApp, prefix, disable = null }: RouteParams) {
    /**
     * @desc the main Koa application
     */
    this.koaApp = koaApp;
    /**
     * @desc the route's prefix
     */
    this.prefix = prefix;
    /**
     * @desc whether the route should be disabled. disabled routes cannot be called.
     */
    this.disable = disable != null ? disable : this.disable;
    /**
     * @desc the route's registered middlewares
     */
    this.middlewares = this.middlewares || [];
    /**
     * @desc the underlying koa router for this particular route
     */
    this.koaRouter = new KoaRouter();
  }

  /**
   * logs a message, but only if the route's logs are set to be displayed.
   *
   * accepts several parameters
   */
  log(...args: string[]) {
    if (Route.displayLog) {
      // eslint-disable-next-line
      console.log(...args);
    }
  }

  /**
   * @desc Registers the route and makes it callable once the API is launched.
   *       the route will be called along with the middlewares that were registered in the decorator.
   *
   *       you will usually not need to call this method yourself.
   */
  mount() {
    if (this.disable !== true) {
      for (const type in this.routes) {
        if (this.routes.hasOwnProperty(type)) {
          // eslint-disable-line
          for (const route of this.routes[type]) {
            const routePath = `/${this.prefix}/${this.routeBase}/${route.path}`
              .replace(/[/]{2,10}/g, '/')
              .replace(/[/]$/, '');
            route.options.routePath = routePath;
            route.options.type = type;
            if (!route.options.disable) {
              this.log(
                chalk.green.bold('[Mount route]'),
                `\t${type}\t`,
                routePath
              );
              this.koaRouter[type](routePath, ...this._use(route));
              Route.generateDoc(this, route);
            } else {
              this.log(
                chalk.yellow.bold('[Disable Mount route]\t'),
                type,
                routePath
              );
            }
          }
        }
      }
    } else {
      this.log(
        chalk.yellow.bold(
          `Routes "${this.routeBase}" of class ${this.constructor.name} are't add`
        )
      );
    }
  }

  // ************************************ MIDDLEWARE *********************************
  /**
   *@ignore
   */
  _use(infos) {
    const { options = {} } = infos;
    const { middlewares = [] } = options;

    const middlewaresToAdd = [this._beforeRoute(infos)];
    middlewaresToAdd.push(this._afterRoute(infos));
    middlewaresToAdd.push(...this.middlewares); // add middlewares of the class
    middlewaresToAdd.push(...middlewares); // add middlewares of the specific route
    this.addRateLimit(middlewaresToAdd, infos);
    middlewaresToAdd.push(infos.call.bind(this));

    return middlewaresToAdd;
  }

  /**
   *@ignore
   */
  getRateLimit(option, routePath, type) {
    option.interval = RateLimit.RateLimit.timeToMs(option.interval);
    return RateLimit.middleware({
      prefixKey: `${type}|${routePath}|${option.interval}`,
      ...option,
    });
  }

  /**
   * if a decorator has a rateLimit property, it will add the rate limiting mechanism to the route,
   * with a unique ID for each route in order to differentiate the various routes.
   *
   * You should not need to call this method directly.
   * @param middlewares the array of currently registered middlewares for the given route
   * @param params the route's parameters
   */
  addRateLimit(middlewares: Function[], { options }: RateLimitOptions) {
    const { rateLimit, routePath, type } = options;

    if (rateLimit) {
      if (isArray(rateLimit)) {
        for (const elem of rateLimit) {
          middlewares.push(this.getRateLimit(elem, routePath, type));
        }
      } else {
        middlewares.push(this.getRateLimit(rateLimit, routePath, type));
      }
    }
  }

  // beforeRoute
  /**
   *@ignore
   */
  _beforeRoute(infos) {
    return async (ctx, next) => await this.beforeRoute(ctx, infos, next);
  }

  /**
   * @desc a member which can be overriden, which will always be executed before the route is accessed
   * @param ctx Koa's context object
   * @param params an object containing all route parameters
   * @param next the next middleware in the chain
   */
  async beforeRoute(
    ctx: Koa.Context,
    { options }: BeforeRouteParams,
    next: Function
  ) {
    await this._mlTestAccess(ctx, options);
    this._mlParams(ctx, options);
    if (next) {
      await next();
    }
  }

  // afterRoute
  /**
   *@ignore
   */
  _afterRoute(infos) {
    return async (ctx, next) => await this.afterRoute(ctx, infos, next);
  }

  /**
   * @desc a member which can be overriden, which will always be executed after the route finished
   * @param ctx Koa's context object
   * @param params an object containing all route parameters
   * @param next the next middleware in the chain
   */
  async afterRoute( ctx: Koa.Context, { options }: BeforeRouteParams, next: Function) {
    if (next) {
      await next();
    }
    this._mlBodyReturnType(ctx, options);
  }

  /**
   *@ignore
   */
  async _mlTestAccess(ctx, { accesses = [] }) {
    if (isArray(accesses) && accesses.length) {
      for (const access of accesses) {
        if (await access(ctx)) {
          return true;
        }
      }
      this.throwForbidden(null, true);
    }
    if (isArray(this.accesses) && this.accesses.length) {
      for (const access of this.accesses) {
        if (await access(ctx)) {
          return true;
        }
      }
      this.throwForbidden(null, true);
    }

    return true;
  }

  /**
   *@ignore
   */
  _mlParams(ctx, { bodyType = null, queryType = null }) {
    if (bodyType) {
      ctx.request.bodyOrigin = deepCopy(ctx.request.body);
      ctx.request.bodyChanged = this._mlTestParams(
        ctx,
        ctx.request.body,
        bodyType
      );
      ctx.request.body = ctx.request.bodyChanged;
    }
    if (queryType) {
      ctx.request.queryOrigin = deepCopy(ctx.request.query || {});
      ctx.request.queryChanged = this._mlTestParams(
        ctx,
        ctx.request.query,
        queryType
      );
      ctx.request.query = ctx.request.queryChanged;
    }
  }

  /**
   *@ignore
   */
  _mlBodyReturnType(ctx, { returnType = null }) {
    if (returnType && `${ctx.status}`.startsWith('2')) {
      const bodyOrigin = deepCopy(ctx.body.data || {});

      const cloneType = returnType.clone();
      if (ctx.i18n) {
        cloneType.setLocale(ctx.i18n.getLocale());
      }

      cloneType.test(bodyOrigin);
      if (cloneType.error || cloneType.errors) {
        throw new ErrorApp(500, cloneType.errors || cloneType.error, false);
      }

      ctx.body.data = cloneType.value;
    }
  }

  /**
   *@ignore
   */
  _mlTestParams(ctx, body, type) {
    const cloneType = type.clone();
    if (ctx.i18n) {
      cloneType.setLocale(ctx.i18n.getLocale());
    }

    cloneType.test(body);
    if (cloneType.error || cloneType.errors) {
      this.throwBadRequest(cloneType.errors || cloneType.error);
    }
    return cloneType.value;
  }

  // ************************************ !MIDDLEWARE *********************************

  /**
   * @desc retrieves the context's body, if the request has one.
   * @param ctx koa's context object
   * @param original if set to true, the function will return the body before
   * it is filtered by the param decorator.
   * otherwise, it will return the filtered and transformed body.
   * @todo play with bodyOrigin elsewhere to use Koa.Context
   */
  body(ctx: any /* Koa.Context */, original = false) {
    return original ? ctx.request.bodyOrigin : ctx.request.bodyChanged;
  }

  /**
   * @desc retrieves the query params in a GET request
   * @param ctx koa's context object
   * @todo play with queryOrigin elsewhere to use Koa.Context
   */
  queryParam(ctx: any /* Koa.Context */, original = false) {
    return original ? ctx.request.queryOrigin : ctx.request.queryChanged;
  }

  /**
   * @desc sets the response's body (with a message + data field) and status.
   * @param ctx koa's context object
   * @param status the HTTP status code to end the request with
   * @param data the data to be yielded by the requests
   * @param message the message to be yielded by the request
   */
  send(ctx: Koa.Context & { body: any }, status = 200, data?: any, message?: string) {
    ctx.body = ctx.body || {}; // add default body
    ctx.status = status;
    // Do not remove this test because if status = 204 || 304, node will remove body
    // see _hasBody on
    // https://github.com/nodejs/node/blob/master/lib/_http_server.js#L235-L250
    if (ctx.body) {
      if (data != null) {
        ctx.body.data = data;
      }
      if (message != null) {
        ctx.body.message = message;
      }
      ctx.body.date = Date.now();
    }
  }

  /**
   * @desc same as {@link send}, but automatically sets the status to 200 OK
   * @param ctx koa's context object
   * @param data the data to be yielded by the requests
   * @param message the message to be yielded by the request
   */
  sendOk(ctx: Koa.Context, data?: any, message?: string) {
    return this.send(ctx, Route.StatusCode.ok, data, message);
  }

  /**
   * @desc same as {@link send}, but automatically sets the status to 201 CREATED
   * @param ctx koa's context object
   * @param data the data to be yielded by the requests
   * @param message the message to be yielded by the request
   */
  sendCreated(ctx: Koa.Context, data?: any, message?: string) {
    return this.send(ctx, Route.StatusCode.created, data, message);
  }

  /**
   * @desc replies with an empty body, yielding 204 NO CONTENT as the status
   * @param ctx koa's context object
   */
  sendNoContent(ctx: Koa.Context) {
    return this.send(ctx, Route.StatusCode.noContent, null, null);
  }

  /**
   * @desc throws a formated error to be caught.
   * @param status the error's HTTP status StatusCode
   * @param error the error(s) to be yielded by the request
   * @param translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error.
   */
  throw(status: number, error: string | Object, translate = false) {
    throw new ErrorApp(status, error, translate);
  }

  /**
   * @version 2.0.0
   * @desc same as {@link throw}, but automatically sets the status to 400 BAD REQUEST
   * @param error the error(s) to be yielded by the request, default to "Bad request"
   * @param translate indicates whether the message should be translated or not
   */
  throwBadRequest(error?: string | Object, translate = false) {
    return this.throw(
      Route.StatusCode.badRequest,
      error || 'Bad request',
      translate
    );
  }

  /**
   * @version 2.0.0
   * @desc same as {@link throw}, but automatically sets the status to 401 UNAUTHORIZED
   * @param error the error(s) to be yielded by the request, default to "Unauthorized"
   * @param translate indicates whether the message should be translated or not
   */
  throwUnauthorized(error?: string | Object, translate = false) {
    return this.throw(
      Route.StatusCode.unauthorized,
      error || 'Unauthorized',
      translate
    );
  }

  /**
   * @version 2.0.0
   * @desc same as {@link throw}, but automatically sets the status to 403 FORBIDDEN
   * @param error the error(s) to be yielded by the request, default to "Forbidden"
   * @param translate indicates whether the message should be translated or not
   */
  throwForbidden(error?: string | Object, translate = false) {
    return this.throw(
      Route.StatusCode.forbidden,
      error || 'Forbidden',
      translate
    );
  }

  /**
   * @version 2.0.0
   * @desc same as {@link throw}, but automatically sets the status to 404 NOT FOUND
   * @param error the error(s) to be yielded by the request, default to "Not found"
   * @param translate indicates whether the message should be translated or not
   */
  throwNotFound(error?: string | Object, translate = false) {
    return this.throw(
      Route.StatusCode.notFound,
      error || 'Not found',
      translate
    );
  }

  /**
   * @desc checks a condition. If it evaluates to false, throws a formated error to be caught.
   * @param condition if set to false; assert will fail and throw.
   * @param status the error's HTTP status StatusCode
   * @param error the error(s) to be yielded by the request
   * @param translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error, should the assert fail.
   */
  assert(
    condition: boolean,
    status: number,
    error: string | Object,
    translate = false
  ) {
    if (!condition) {
      this.throw(status, error, translate);
    }
  }

  /**
   * @version 2.0.0
   * @desc same as {@link assert}, but automatically sets the status to 400 BAD REQUEST
   * @param condition if set to false; assert will fail and throw.
   * @param error the error(s) to be yielded by the request, default to "Bad request"
   * @param translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error, should the assert fail.
   */
  assertBadRequest(
    condition: boolean,
    error?: string | Object,
    translate = false
  ) {
    this.assert(
      condition,
      Route.StatusCode.badRequest,
      error || 'Bad request',
      translate
    );
  }

  /**
   * @version 2.0.0
   * @desc same as {@link assert}, but automatically sets the status to 401 UNAUTHORIZED
   * @param condition if set to false; assert will fail and throw.
   * @param error the error(s) to be yielded by the request, default to "Unauthorized"
   * @param translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error, should the assert fail.
   */
  assertUnauthorized(
    condition: boolean,
    error?: string | Object,
    translate = false
  ) {
    this.assert(
      condition,
      Route.StatusCode.unauthorized,
      error || 'Unauthorized',
      translate
    );
  }

  /**
   * @version 2.0.0
   * @desc same as {@link assert}, but automatically sets the status to 403 FORBIDDEN
   * @param condition if set to false; assert will fail and throw.
   * @param error the error(s) to be yielded by the request, default to "Forbidden"
   * @param translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error, should the assert fail.
   */
  assertForbidden(
    condition: boolean,
    error?: string | Object,
    translate = false
  ) {
    this.assert(
      condition,
      Route.StatusCode.forbidden,
      error || 'Forbidden',
      translate
    );
  }

  /**
   * @version 2.0.0
   * @desc same as {@link assert}, but automatically sets the status to 400 BAD REQUEST
   * @param condition if set to false; assert will fail and throw.
   * @param error the error(s) to be yielded by the request, default to "Not found"
   * @param translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error, should the assert fail.
   */
  assertNotFound(
    condition: boolean,
    error?: string | Object,
    translate = false
  ) {
    this.assert(
      condition,
      Route.StatusCode.notFound,
      error || 'Not found',
      translate
    );
  }
}
