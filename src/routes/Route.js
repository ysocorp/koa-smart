import KoaRouter from 'koa-router';
import chalk from 'chalk';
import { RateLimit } from 'koa2-ratelimit';

import ErrorApp from '../utils/ErrorApp';
import StatusCode from '../utils/StatusCode';
import { isArray, isObject, deepCopy } from '../utils/utils';
import RouteDecorators from './RouteDecorators';

export default class Route {
  static displayLog = true;
  static StatusCode = StatusCode;

  constructor({ app, prefix, routes, models, model, disable }) {
    this.app = app;
    this.prefix = prefix;
    this.allRoutesInstance = routes;
    this.models = models;
    this.disable = disable != null ? disable : this.disable;
    if (this.models && model) {
      this.model = this.models[model];
    }
    this.koaRouter = new KoaRouter();
    this.privateKeyInParamsRoute = ['__force', '__func'];
    // This Variable are set by RouteDecorators
    this.routes;
    this.routeBase;
  }

  static Get = RouteDecorators.Get;
  static Post = RouteDecorators.Post;
  static Put = RouteDecorators.Put;
  static Patch = RouteDecorators.Patch;
  static Delete = RouteDecorators.Delete;
  static Route = RouteDecorators.Route;

  log(str, ...args) {
    if (Route.displayLog) {
      console.log(str, ...args);
    }
  }

  mount() {
    if (this.disable !== true) {
      for (const type in this.routes) { // eslint-disable-line
        for (const route of this.routes[type]) {
          const routePath = `/${this.prefix}/${this.routeBase}/${route.path}`.replace(/[/]{2,10}/g, '/');
          route.options.routePath = routePath;
          route.options.type = type;
          if (!route.options.disable) {
            this.log(chalk.green.bold('[Mount route]'), `\t${type}\t`, routePath);
            this.koaRouter[type](routePath, ...this._use(route));
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
  _use(infos) {
    const { options = {} } = infos;
    const { before = [], after = [] } = options;

    const middlewares = [this._beforeRoute(infos)];
    middlewares.push(...before);
    this.addRateLimit(middlewares, infos);
    middlewares.push(infos.call.bind(this));
    middlewares.push(...after);

    return middlewares;
  }

  // RateLimit
  getRateLimit(option, routePath, type) {
    option.interval = RateLimit.RateLimit.timeToMs(option.interval);
    return RateLimit.middleware({
      prefixKey: `${type}|${routePath}|${option.interval}`,
      ...option,
    });
  }
  addRateLimit(middlewares, { options }) {
    const { rateLimit, routePath, type } = options;

    if (rateLimit) {
      if (Array.isArray(rateLimit)) {
        for (const elem of rateLimit) {
          middlewares.push(this.getRateLimit(elem, routePath, type));
        }
      } else {
        middlewares.push(this.getRateLimit(rateLimit, routePath, type));
      }
    }
  }

  // beforeRoute
  _beforeRoute(infos) {
    return async (ctx, next) => await this.beforeRoute(ctx, infos, next);
  }
  async beforeRoute(ctx, { options }, next) {
    this._mlParams(ctx, options);
    if (next) {
      await next();
    }
  }
  
  // test params
  _mlParams(ctx, { params }) {
    ctx.request.bodyOrig = deepCopy(ctx.request.body);
    ctx.request.body = this._mlTestParams(ctx, ctx.request.body, params);
  }

  _mlParamsExecFunc(ctx, body, keyBody, param) {
    if (body && body[keyBody]) {
      const { __func } = param;
      if (__func && Array.isArray(__func)) {
        for (const func of __func) {
          body[keyBody] = func(body[keyBody], this, { ctx, body, keyBody });
        }
      }
    }
  }

  _mlTestParams(ctx, body, paramsTest) {
    const bodyVerif = {};
    const paramsConvert = this._paramsNormalize(paramsTest);
    for (const key in paramsConvert) {
      const param = paramsConvert[key];

      const bodyElem = body ? body[key] : undefined;
      // test param
      if (param.__force && (bodyElem === undefined || bodyElem === null)) {
        this.throw(400, `${ctx.state.__ ? ctx.state.__('param required:') : 'param required:'} ${key}`);
      }
      this._mlParamsExecFunc(ctx, body, key, param);


      if (this._paramsHasSubElement(param)) {
        if (body && isObject(body)) {
          const tmp = this._mlTestParams(ctx, body[key], param);
          if (body[key]) {
            bodyVerif[key] = tmp;
          }
        } else {
          const tmp = this._mlTestParams(ctx, undefined, param);
          if (body && isObject(body) && body[key] !== undefined) {
            bodyVerif[key] = tmp;
          }
        }
      } else if (body && isObject(body) && body[key] !== undefined) {
        bodyVerif[key] = body[key];
      }
    }
    return bodyVerif;
  }

  _paramsNormalize(paramsTest) {
    let paramsConvert = {};
    // convert array to object
    if (isArray(paramsTest)) {
      for (const elem of paramsTest) {
        if (isObject(elem, false)) {
          paramsConvert = Object.assign(paramsConvert, elem);
        } else {
          paramsConvert[elem] = false;
        }
      }
    } else {
      paramsConvert = paramsTest;
    }

    // normalize objects
    for (const key in paramsConvert) {
      const elem = paramsConvert[key];
      if (!this.privateKeyInParamsRoute.includes(key)) {
        if (isObject(elem) || isArray(elem)) {
          paramsConvert[key] = this._paramsNormalize(elem);
        } else if (elem === false || elem === true) {
          paramsConvert[key] = { __force: elem };
        }
      }
    }
    return paramsConvert;
  }

  _paramsHasSubElement(paramsTest) {
    for (const key in paramsTest) {
      if (!this.privateKeyInParamsRoute.includes(key)) {
        return true;
      }
    }
    return false;
  }

  // ************************************ !MIDDLEWARE *********************************

  body(ctx, original = false) {
    return original ? ctx.request.bodyOrig : ctx.request.body;
  }
  bodyGet(ctx) {
    return ctx.request.query || {};
  }
  paramsGet(ctx) { return this.bodyGet(ctx); }

  send(ctx, status = 200, data, message) {
    ctx.status = status;
    if (data != null) {
      ctx.body.data = data;
    }
    if (message) {
      ctx.body.message = message;
    }
    ctx.body.date = Date.now();
  }
  sendOk(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.ok, data, message);
  }
  sendCreated(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.created, data, message);
  }
  sendNoContent(ctx, message) {
    return this.send(ctx, Route.StatusCode.noContent, undefined, message);
  }
  sendBadRequest(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.badRequest, data, message);
  }
  sendUnauthorized(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.unauthorized, data, message);
  }
  sendForbidden(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.forbidden, data, message);
  }
  sendNotFound(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.notFound, data, message);
  }
  sendInternalServerError(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.internalServerError, data, message);
  }

  throw(status, message, translate = false) {
    throw new ErrorApp(status, message, translate);
  }

  assert(condition, status, message, translate = false) {
    if (!condition) {
      this.throw(status, message, translate);
    }
  }
}
