import * as KoaRouter from 'koa-router';
import chalk from 'chalk';
import { RateLimit } from 'koa2-ratelimit';
import * as Koa from 'koa';

import ErrorApp from '../utils/ErrorApp';
import StatusCode from '../utils/StatusCode';
import { deepCopy, isArray } from '../utils/utils';
import { generateDoc } from '../utils/docGenerator';
import RouteDecorators from './RouteDecorators';

export default class Route {
  /**
   * @type {boolean}
   * @desc if true it will log which route are mount and which are not
   */
  static displayLog = true;
  /**
   * @type {StatusCode}
   */
  static StatusCode = StatusCode;

  /**
   * @typedef {Object} BeforeRouteParams
   * @property {string} path the path at which the route will be available.
   * @property {ParamsMethodDecorator} options
   * @property {function} call the fonction to call when route match, this is automaticaly add by route decorator
   */

  /**
   * @typedef {Object} RouteParams
   * @property {Koa} koaApp the Koa application
   * @property {string} prefix a prefix which will be preppended before every route's paths
   * @property {Route[]} routes an array containing all the mounted Routes
   * @property {Model[]} [models] an array containing all of the app's models
   * @property {string} [model] the name of the route's own model
   * @property {disable} [boolean] whether the route should be disabled
   *
   */

  /**
   * @typedef {function} Decorator
   * @return { }
   */

  /**
   * @external {KoaContext} http://koajs.com/#api
   */

  /**
   * @external {Koa} http://koajs.com/#application
   */

   koaApp: Koa;
   prefix: string;
   allRoutesInstance: Route[];
   models: any[];
   disable: boolean;
   middlewares: Array<(ctx: Koa.Context, next: Function) => Promise<void>>;
   model: any;
   koaRouter: KoaRouter;
   routes: Array<Array<Route>>;
   routeBase: string;
   accesses: Array<(ctx: Koa.Context) => Promise<boolean>>
   path: string;
   options: any;

  /**
   * @param {RouteParams} params the route's parameters
   */
  constructor({ koaApp, prefix, routes, models, model, disable }) {
    /**
     * @type {Koa}
     * @desc the main Koa application
     */
    this.koaApp = koaApp;
    /**
     * @type {string}
     * @desc the route's prefix
     */
    this.prefix = prefix;
    /**
     * @type {Route[]}
     * @desc an array composed of all the availble routes in the application
     */
    this.allRoutesInstance = routes;
    /**
     * @type {Model[]}
     * @desc an array of all the models available in the application
     */
    this.models = models;
    /**
     * @type {boolean}
     * @desc whether the route should be disabled. disabled routes cannot be called.
     */
    this.disable = disable != null ? disable : this.disable;
    /**
     * @type {function[]}
     * @desc the route's registered middlewares
     */
    this.middlewares = this.middlewares || [];
    if (this.models && model) {
      /**
       * @type {Model|undefined}
       * @desc the route's own model
       */
      this.model = this.models[model];
    }
    /**
     * @type {KoaRouter}
     * @desc the underlying koa router for this particular route
     */

    this.koaRouter = new KoaRouter();
    // This Variable are set by RouteDecorators
    this.routes;
    this.routeBase;
  }

  /**
   * @access public
   * @desc mounts the tagged function as a GET route.
   * @param {ParamsMethodDecorator} params the route's parameters
   * @return {Decorator}
   */
  static Get = RouteDecorators.Get;

  /**
   * @access public
   * @desc mounts the tagged function as a POST route.
   * @param {ParamsMethodDecorator} params the route's parameters
   * @return {Decorator}
   */
  static Post = RouteDecorators.Post;

  /**
   * @access public
   * @desc mounts the tagged function as a PUT route.
   * @param {ParamsMethodDecorator} params the route's parameters
   * @return {Decorator}
   */
  static Put = RouteDecorators.Put;

  /**
   * @access public
   * @desc mounts the tagged function as a PATCH route.
   * @param {ParamsMethodDecorator} params the route's parameters
   * @return {Decorator}
   */
  static Patch = RouteDecorators.Patch;

  /**
   * @access public
   * @desc mounts the tagged function as a DELETE route.
   * @param {ParamsMethodDecorator} params the route's parameters
   * @return {Decorator}
   */
  static Delete = RouteDecorators.Delete;

  /**
   * @access public
   * @desc used to set some parameters on an entire class.The supported parameters are middlewares, disable, and routeBase.
   * @return {Decorator}
   * @param {ParamsClassDecorator} params the route's parameters
   */
  static Route = RouteDecorators.Route;

  /**
   * logs a message, but only if the route's logs are set to be displayed.
   *
   * accepts several parameters
   */
  log(str, ...args) {
    if (Route.displayLog) {
      // eslint-disable-next-line
      console.log(str, ...args);
    }
  }

  /**
   * @access public
   * @desc Registers the route and makes it callable once the API is launched.
   *       the route will be called along with the middlewares that were registered in the decorator.
   *
   *       you will usually not need to call this method yourself.
   */
  mount() {
    if (this.disable !== true) {
      for (const type in this.routes) {
        // eslint-disable-line
        for (const route of this.routes[type]) {
          const routePath = `/${this.prefix}/${this.routeBase}/${route.path}`
            .replace(/[/]{2,10}/g, '/')
            .replace(/[/]$/, '');
          route.options.routePath = routePath;
          route.options.type = type;
          if (!route.options.disable) {
            this.log(chalk.green.bold('[Mount route]'), `\t${type}\t`, routePath);
            this.koaRouter[type](routePath, ...this._use(route));
            generateDoc(this, route);
          } else {
            this.log(chalk.yellow.bold('[Disable Mount route]\t'), type, routePath);
          }
        }
      }
    } else {
      this.log(chalk.yellow.bold(`Routes "${this.routeBase}" of class ${this.constructor.name} are't add`));
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
   * @param {function[]} middlewares the array of currently registered middlewares for the given route
   * @param {{options:{rateLimit:Object,routePath:string,type:string}}} params the route's parameters
   */
  addRateLimit(middlewares, { options }) {
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
   * @param {KoaContext} ctx Koa's context object
   * @param {BeforeRouteParams} params an object containing all route parameters
   * @param {function} next the next middleware in the chain
   */
  async beforeRoute(ctx, { options }, next) {
    await this._mlTestAccess(ctx, options);
    this._mlParams(ctx, options);
    if (next) {
      await next();
    }
  }

  /**
   *@ignore
   */
  async _mlTestAccess(ctx, { accesses }) {
    if (isArray(accesses) && accesses.length) {
      for (const access of accesses) {
        if (await access(ctx)) return true;
      }
      this.throwForbidden(null, true);
    }
    if (isArray(this.accesses) && this.accesses.length) {
      for (const access of this.accesses) {
        if (await access(ctx)) return true;
      }
      this.throwForbidden(null, true);
    }

    return true;
  }

  /**
   *@ignore
   */
  _mlParams(ctx, { bodyType, queryType }) {
    if (bodyType) {
      ctx.request.bodyOrigin = deepCopy(ctx.request.body);
      ctx.request.bodyChanged = this._mlTestParams(ctx, ctx.request.body, bodyType);
      ctx.request.body = ctx.request.bodyChanged;
    }
    if (queryType) {
      ctx.request.queryOrigin = deepCopy(ctx.request.query || {});
      ctx.request.queryChanged = this._mlTestParams(ctx, ctx.request.query, queryType);
      ctx.request.query = ctx.request.queryChanged;
    }
  }

  /**
   *@ignore
   */
  _mlTestParams(ctx, body, type) {
    const cloneType = type.clone();
    if (ctx.i18n) cloneType.setLocale(ctx.i18n.getLocale());

    cloneType.test(body);
    if (cloneType.error || cloneType.errors) {
      this.throwBadRequest(cloneType.errors || cloneType.error);
    }
    return cloneType.value;
  }

  // ************************************ !MIDDLEWARE *********************************

  /**
   *@desc retrieves the context's body, if the request has one.
   *@param {KoaContext} ctx koa's context object
   *@param {boolean} [original=false] if set to true, the function will return the body before it is filtered by the param decorator.
   *                                  otherwise, it will return the filtered and transformed body.
   */
  body(ctx, original = false) {
    return original ? ctx.request.bodyOrigin : ctx.request.bodyChanged;
  }

  /**
   * @access public
   * @desc retrieves the query params in a GET request
   * @param {KoaContext} ctx koa's context object
   * @return {Object.<string, *>}
   */
  queryParam(ctx, original = false) {
    return original ? ctx.request.queryOrigin : ctx.request.queryChanged;
  }

  /**
   * @access public
   * @desc sets the response's body (with a message + data field) and status.
   * @param {KoaContext} ctx koa's context object
   * @param {number} [status] the HTTP status code to end the request with
   * @param {*} [data] the data to be yielded by the requests
   * @param {string} [message] the message to be yielded by the request
   * @return { }
   */
  send(ctx, status = 200, data, message) {
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
   * @access public
   * @desc same as {@link send}, but automatically sets the status to 200 OK
   * @param {KoaContext} ctx koa's context object
   * @param {*} [data] the data to be yielded by the requests
   * @param {string} [message] the message to be yielded by the request
   * @return { }
   */
  sendOk(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.ok, data, message);
  }

  /**
   * @access public
   * @desc same as {@link send}, but automatically sets the status to 201 CREATED
   * @param {KoaContext} ctx koa's context object
   * @param {*} [data] the data to be yielded by the requests
   * @param {string} [message] the message to be yielded by the request
   * @return { }
   */
  sendCreated(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.created, data, message);
  }

  /**
   * @access public
   * @desc replies with an empty body, yielding 204 NO CONTENT as the status
   * @param {KoaContext} ctx koa's context object
   * @return { }
   */
  sendNoContent(ctx) {
    return this.send(ctx, Route.StatusCode.noContent, null, null);
  }

  /**
   * @access public
   * @desc throws a formated error to be caught.
   * @param {number} status the error's HTTP status StatusCode
   * @param {string | object} [error] the error(s) to be yielded by the request
   * @param {boolean} translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error.
   * @return { }
   */
  throw(status, error, translate = false) {
    throw new ErrorApp(status, error, translate);
  }

  /**
   * @access public
   * @version 2.0.0
   * @desc same as {@link throw}, but automatically sets the status to 400 BAD REQUEST
   * @param {string | object} [error] the error(s) to be yielded by the request, default to "Bad request"
   * @param {boolean} translate indicates whether the message should be translated or not
   * @return { }
   */
  throwBadRequest(error, translate = false) {
    return this.throw(Route.StatusCode.badRequest, error || 'Bad request', translate);
  }

  /**
   * @access public
   * @version 2.0.0
   * @desc same as {@link throw}, but automatically sets the status to 401 UNAUTHORIZED
   * @param {string | object} [error] the error(s) to be yielded by the request, default to "Unauthorized"
   * @param {boolean} translate indicates whether the message should be translated or not
   * @return { }
   */
  throwUnauthorized(error, translate = false) {
    return this.throw(Route.StatusCode.unauthorized, error || 'Unauthorized', translate);
  }

  /**
   * @access public
   * @version 2.0.0
   * @desc same as {@link throw}, but automatically sets the status to 403 FORBIDDEN
   * @param {string | object} [error] the error(s) to be yielded by the request, default to "Forbidden"
   * @param {boolean} translate indicates whether the message should be translated or not
   * @return { }
   */
  throwForbidden(error, translate = false) {
    return this.throw(Route.StatusCode.forbidden, error || 'Forbidden', translate);
  }

  /**
   * @access public
   * @version 2.0.0
   * @desc same as {@link throw}, but automatically sets the status to 404 NOT FOUND
   * @param {string | object} [error] the error(s) to be yielded by the request, default to "Not found"
   * @param {boolean} translate indicates whether the message should be translated or not
   * @return { }
   */
  throwNotFound(error, translate = false) {
    return this.throw(Route.StatusCode.notFound, error || 'Not found', translate);
  }

  /**
   * @access public
   * @desc checks a condition. If it evaluates to false, throws a formated error to be caught.
   * @param {boolean} condition if set to false; assert will fail and throw.
   * @param {number} status the error's HTTP status StatusCode
   * @param {string | object} [error] the error(s) to be yielded by the request
   * @param {boolean} translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error, should the assert fail.
   * @return { }
   */
  assert(condition, status, error, translate = false) {
    if (!condition) {
      this.throw(status, error, translate);
    }
  }

  /**
   * @access public
   * @version 2.0.0
   * @desc same as {@link assert}, but automatically sets the status to 400 BAD REQUEST
   * @param {boolean} condition if set to false; assert will fail and throw.
   * @param {string | object} [error] the error(s) to be yielded by the request, default to "Bad request"
   * @param {boolean} translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error, should the assert fail.
   * @return { }
   */
  assertBadRequest(condition, error, translate = false) {
    this.assert(condition, Route.StatusCode.badRequest, error || 'Bad request', translate);
  }

  /**
   * @access public
   * @version 2.0.0
   * @desc same as {@link assert}, but automatically sets the status to 401 UNAUTHORIZED
   * @param {boolean} condition if set to false; assert will fail and throw.
   * @param {string | object} [error] the error(s) to be yielded by the request, default to "Unauthorized"
   * @param {boolean} translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error, should the assert fail.
   * @return { }
   */
  assertUnauthorized(condition, error, translate = false) {
    this.assert(condition, Route.StatusCode.unauthorized, error || 'Unauthorized', translate);
  }

  /**
   * @access public
   * @version 2.0.0
   * @desc same as {@link assert}, but automatically sets the status to 403 FORBIDDEN
   * @param {boolean} condition if set to false; assert will fail and throw.
   * @param {string | object} [error] the error(s) to be yielded by the request, default to "Forbidden"
   * @param {boolean} translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error, should the assert fail.
   * @return { }
   */
  assertForbidden(condition, error, translate = false) {
    this.assert(condition, Route.StatusCode.forbidden, error || 'Forbidden', translate);
  }

  /**
   * @access public
   * @version 2.0.0
   * @desc same as {@link assert}, but automatically sets the status to 400 BAD REQUEST
   * @param {boolean} condition if set to false; assert will fail and throw.
   * @param {string | object} [error] the error(s) to be yielded by the request, default to "Not found"
   * @param {boolean} translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error, should the assert fail.
   * @return { }
   */
  assertNotFound(condition, error, translate = false) {
    this.assert(condition, Route.StatusCode.notFound, error || 'Not found', translate);
  }
}
