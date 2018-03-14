import KoaRouter from 'koa-router';
import chalk from 'chalk';
import { RateLimit } from 'koa2-ratelimit';

import ErrorApp from '../utils/ErrorApp';
import StatusCode from '../utils/StatusCode';
import { isArray, isObject, deepCopy } from '../utils/utils';
import RouteDecorators from './RouteDecorators';


export default class Route {
  /**
   * @type {boolean}
   */
  static displayLog = true;
  static StatusCode = StatusCode;

  /**
   * @typedef {Object} Params
   * @property {Object.<string, boolean | PostParamsFilter>} params the params describing the route's middlewares,
   *                                                                with the key being the param's name,
   *                                                                and the value describes the way it should be handled.
   *                                                                (only applicable for requests containing a body)
   * @property {string} path the path at which the route will be available.
   * @property {string} routeBase a prefix which will be preppended to the route's path
   * @property {boolean} disabled if set to true, the route will be ignored
   * @property {function[]} middlewares an array of Koa Middlewares, which will be mounted for the given route
   * @property {Object} rateLimit a rateLimit object, which lets the user describe the max rate at which a user can access the route
   */

  /**
   * @typedef {Object} PostParamsFilter
   * @property {ParamMiddlewareFunction[]} __func an array of functions which provides "middleware" functions that will be applied to the corresponding parameter one by one.
   * @property {boolean} __force whether the parameter is required or not.
   */

  /**
   * @typedef {function} ParamMiddlewareFunction
   * @param {*} elem the element the function will act upon
   * @param {Route} [route] the element's current route
   * @param {{ctx: KoaContext, body:Object, keyBody:string}} [context] the element's context
   * @return {*} transformedParam the parameter, after being manipulated by the function
   */

  /**
   * @typedef {Object} RouteParams
   * @property {Koa} app the Koa application
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

   /**
    * @param {RouteParams} params the route's parameters
    */
  constructor({ app, prefix, routes, models, model, disable }) {
    /**
     * @type {Koa}
     * @desc the main Koa application
     */
    this.app = app;
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
    /**
     * @ignore
     */
    this.privateKeyInParamsRoute = ['__force', '__func'];
    // This Variable are set by RouteDecorators
    this.routes;
    this.routeBase;
  }


 /**
  * @access public
  * @desc mounts the tagged function as a GET route.
  * @param {Params} params the route's parameters
  * @return {Decorator}
  */
  static Get = RouteDecorators.Get;

 /**
  * @access public
  * @desc mounts the tagged function as a POST route.
  * @param {Params} params the route's parameters
  * @return {Decorator}
  */
  static Post = RouteDecorators.Post;

 /**
  * @access public
  * @desc mounts the tagged function as a PUT route.
  * @param {Params} params the route's parameters
  * @return {Decorator}
  */
  static Put = RouteDecorators.Put;

 /**
  * @access public
  * @desc mounts the tagged function as a PATCH route.
  * @param {Params} params the route's parameters
  * @return {Decorator}
  */
  static Patch = RouteDecorators.Patch;

 /**
  * @access public
  * @desc mounts the tagged function as a DELETE route.
  * @param {Params} params the route's parameters
  * @return {Decorator}
  */
  static Delete = RouteDecorators.Delete;

 /**
  * @access public
  * @desc used to set some parameters on an entire class.The supported parameters are middlewares, disable, and routeBase.
  * @return {Decorator}
  * @param {Params} params the route's parameters
  */
  static Route = RouteDecorators.Route;

  /**
   * logs a message, but only if the route's logs are set to be displayed.
   *
   * accepts several parameters
   */
  log(str, ...args) {
    if (Route.displayLog) {
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
  /**
   *@ignore
   */
  _beforeRoute(infos) {
    return async (ctx, next) => await this.beforeRoute(ctx, infos, next);
  }

  /**
   * @desc a member which can be overriden, which will always be executed before the route is accessed
   * @param {KoaContext} ctx Koa's context object
   * @param {Params} params an object containing all route parameters
   * @param {function} next the next middleware in the chain
   */
  async beforeRoute(ctx, { options }, next) {
    this._mlParams(ctx, options);
    if (next) {
      await next();
    }
  }

  // test params
  /**
   *@ignore
   */
  _mlParams(ctx, { params }) {
    ctx.request.bodyOrig = deepCopy(ctx.request.body);
    ctx.request.body = this._mlTestParams(ctx, ctx.request.body, params);
  }

  /**
   *@ignore
   */
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

  /**
   *@ignore
   */
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

  /**
   *@ignore
   */
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

  /**
   *@ignore
   */
  _paramsHasSubElement(paramsTest) {
    for (const key in paramsTest) {
      if (!this.privateKeyInParamsRoute.includes(key)) {
        return true;
      }
    }
    return false;
  }

  // ************************************ !MIDDLEWARE *********************************

  /**
   *@desc retrieves the context's body, if the request has one.
   *@param {KoaContext} ctx koa's context object
   *@param {boolean} [original=false] if set to true, the function will return the body before it is filtered by the param decorator.
   *                                  otherwise, it will return the filtered and transformed body.
   */
  body(ctx, original = false) {
    return original ? ctx.request.bodyOrig : ctx.request.body;
  }

  /**
   * @access public
   * @desc retrieves the query params in a GET request
   * @param {KoaContext} ctx koa's context object
   * @return {Object.<string, *>}
   */
  bodyGet(ctx) {
    return ctx.request.query || {};
  }

  /**
   * @access public
   * @desc alias of {@link bodyGet}
   * @param {KoaContext} ctx koa's context object
   * @return {Object.<string, *>}
   */
  paramsGet(ctx) { return this.bodyGet(ctx); }

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
    return this.send(ctx, Route.StatusCode.noContent);
  }

  /**
   * @access public
   * @desc same as {@link send}, but automatically sets the status to 400 BAD REQUEST
   * @param {KoaContext} ctx koa's context object
   * @param {*} [data] the data to be yielded by the requests
   * @param {string} [message] the message to be yielded by the request
   * @return { }
   */
  sendBadRequest(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.badRequest, data, message);
  }

  /**
   * @access public
   * @desc same as {@link send}, but automatically sets the status to 401 UNAUTHORIZED
   * @param {KoaContext} ctx koa's context object
   * @param {*} [data] the data to be yielded by the requests
   * @param {string} [message] the message to be yielded by the request
   * @return { }
   */
  sendUnauthorized(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.unauthorized, data, message);
  }

  /**
   * @access public
   * @desc same as {@link send}, but automatically sets the status to 403 FORBIDDEN
   * @param {KoaContext} ctx koa's context object
   * @param {*} [data] the data to be yielded by the requests
   * @param {string} [message] the message to be yielded by the request
   * @return { }
   */
  sendForbidden(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.forbidden, data, message);
  }

  /**
   * @access public
   * @desc same as {@link send}, but automatically sets the status to 404 NOT FOUND
   * @param {KoaContext} ctx koa's context object
   * @param {*} [data] the data to be yielded by the requests
   * @param {string} [message] the message to be yielded by the request
   * @return { }
   */
  sendNotFound(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.notFound, data, message);
  }

  /**
   * @access public
   * @desc same as {@link send}, but automatically sets the status to 500 INTERNAL SERVER ERROR
   * @param {KoaContext} ctx koa's context object
   * @param {*} [data] the data to be yielded by the requests
   * @param {string} [message] the message to be yielded by the request
   * @return { }
   */
  sendInternalServerError(ctx, data, message) {
    return this.send(ctx, Route.StatusCode.internalServerError, data, message);
  }

  /**
   * @access public
   * @desc throws a formated error to be caught.
   * @param {number} status the error's HTTP status StatusCode
   * @param {string} message  a message describing the error
   * @param {boolean} translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error.
   * @return { }
   */
  throw(status, message, translate = false) {
    throw new ErrorApp(status, message, translate);
  }

  /**
   * @access public
   * @desc checks a condition. If it evaluates to false, throws a formated error to be caught.
   * @param {boolean} condition if set to false; assert will fail and throw.
   * @param {number} status the error's HTTP status StatusCode
   * @param {string} message  a message describing the error
   * @param {boolean} translate indicates whether the message should be translated or not
   * @throws {ErrorApp} thrown error, should the assert fail.
   * @return { }
   */
  assert(condition, status, message, translate = false) {
    if (!condition) {
      this.throw(status, message, translate);
    }
  }
}
