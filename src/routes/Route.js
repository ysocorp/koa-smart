import KoaRouter from 'koa-router';

import ErrorApp from '../utils/ErrorApp';
import StatusCode from '../utils/StatusCode';
import { isArray, isObject, deepCopy } from '../utils/utils';
import RouteDecorators from './RouteDecorators';

export default class Route {
  constructor({ app, prefix, routes, models, model }) {
    this.app = app;
    this.prefix = prefix;
    this.allRoutesInstance = routes;
    this.models = models;
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

  mount() {
    for (const type in this.routes) {
      for (const route of this.routes[type]) {
        const routePath = `/${this.prefix}/${this.routeBase}/${route.path}`.replace(/[/]{2,10}/g, '/');
        console.log('[Mount route] ', type, routePath);
        this.koaRouter[type](routePath, this.beforeRoute(route), route.call.bind(this));
      }
    }
  }

  // ************************************ MIDDLEWARE *********************************
  beforeRoute({ options }) {
    return async (ctx, next) => {
      this.mlParams(ctx, options);
      if (next) {
        await next();
      }
    };
  }

  mlParams(ctx, { params }) {
    ctx.request.bodyOrig = deepCopy(ctx.request.body);
    ctx.request.body = this.mlTestParams(ctx, ctx.request.body, params);
  }

  mlParamsExecFunc(ctx, body, keyBody, param) {
    if (body && body[keyBody]) {
      const { __func } = param;
      if (__func && Array.isArray(__func)) {
        for (const func of __func) {
          body[keyBody] = func(body[keyBody], this, { ctx, body, keyBody });
        }
      }
    }
  }

  mlTestParams(ctx, body, paramsTest) {
    const bodyVerif = {};
    const paramsConvert = this.paramsNormalize(paramsTest);
    for (const key in paramsConvert) {
      const param = paramsConvert[key];

      const bodyElem = body ? body[key] : undefined;
      // test param
      if (param.__force && (bodyElem === undefined || bodyElem === null)) {
        this.throw(400, `${ctx.state.__('param required:')} ${key}`);
      }
      this.mlParamsExecFunc(ctx, body, key, param);


      if (this.paramsHasSubElement(param)) {
        if (body && isObject(body)) {
          const tmp = this.mlTestParams(ctx, body[key], param);
          if (body[key]) {
            bodyVerif[key] = tmp;
          }
        } else {
          const tmp = this.mlTestParams(ctx, undefined, param);
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

  paramsNormalize(paramsTest) {
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
          paramsConvert[key] = this.paramsNormalize(elem);
        } else if (elem === false || elem === true) {
          paramsConvert[key] = { __force: elem };
        }
      }
    }
    return paramsConvert;
  }

  paramsHasSubElement(paramsTest) {
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
    if (data) {
      ctx.body.data = data;
    }
    if (message) {
      ctx.body.message = message;
    }
    ctx.body.date = new Date();
  }
  sendOk(ctx, data, message) {
    return this.send(ctx, StatusCode.ok, data, message);
  }
  sendCreated(ctx, data, message) {
    return this.send(ctx, StatusCode.created, data, message);
  }
  sendNoContent(ctx, data, message) {
    return this.send(ctx, StatusCode.noContent, data, message);
  }
  sendBadRequest(ctx, data, message) {
    return this.send(ctx, StatusCode.badRequest, data, message);
  }
  sendUnauthorized(ctx, data, message) {
    return this.send(ctx, StatusCode.unauthorized, data, message);
  }
  sendForbidden(ctx, data, message) {
    return this.send(ctx, StatusCode.forbidden, data, message);
  }
  sendNotFound(ctx, data, message) {
    return this.send(ctx, StatusCode.notFound, data, message);
  }
  sendInternalServerError(ctx, data, message) {
    return this.send(ctx, StatusCode.internalServerError, data, message);
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
