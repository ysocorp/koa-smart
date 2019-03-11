/**
 * @typedef {Object} ParamsMethodDecorator
 * @property {Types} bodyType Description of the body receiving
 * @property {Types} queryType Description of the "request.query" receiving
 * @property {string} path the path at which the route will be available.<br/>
 * By default it will take the name of the function and replace uppercase by "-".<br/>
 * ex: a function name addUser will be mount with /add-user
 * @property {boolean} disabled if set to true, the route will be ignored
 * @property {function[]} middlewares an array of Koa Middlewares, which will be mounted for the given route
 * @property {Object} rateLimit a rateLimit object, which lets the user describe the max rate at which a user can access the route
 * @property {function[]} accesses an array of async function, which will be call with ctx, if one of them return true, the current client will access the route. This will overwrite the accesses pass to {ParamsClassDecorator}
 */

/**
 * @typedef {Object} ParamsClassDecorator
 * @property {string} routeBase a prefix which will be preppended all to the route's path
 * @property {boolean} disabled if set to true, all route in the class will be ignored
 * @property {function[]} middlewares an array of Koa Middlewares, which will be mounted for the given route
 * @property {function[]} accesses an array of async function, which will be call (for all routes in the class) with ctx, if one of them return true, the current client will access the route
 */

/**
 *@ignore
 */
export default class RouteDecorators {
  // replace A-Z to lowercase and add - ex myFunc => my-func
  static _getRouteFromMethode(str) {
    return str.replace(/([A-Z])/g, (str, letter, index) => {
      return index === 0 ? `${letter.toLowerCase()}` : `-${letter.toLowerCase()}`;
    });
  }

  // replace A-Z to lowercase and add - ex myFunc => my-func
  static _getEventFromMethode(str) {
    return str.replace(/on([A-Z][a-z]*)/g, (str, letter) => {
      return `${letter.toLowerCase()}`;
    });
  }

  static _initData(target) {
    target.routes = target.routes || {
      get: [],
      post: [],
      delete: [],
      patch: [],
      put: [],
      websocket: [],
    };
    if (target.routeBase === undefined) {
      target.routeBase = target.constructor.name.replace('Route', '');
      target.routeBase = RouteDecorators._getRouteFromMethode(target.routeBase);
    }
  }

  static Route(options = {}) {
    return (target /*, key, descriptor*/) => {
      const opt = { ...options, disable: !!options.disable };
      for (const key in opt) {
        if (opt[key] != null) {
          target.prototype[key] = opt[key];
        }
      }

      RouteDecorators._initData(target);
    };
  }

  static _addRoute(type, options = {}) {
    return (target, functionName, descriptor) => {
      RouteDecorators._initData(target);
      options = {
        path: undefined,
        accesses: [],
        bodyType: null,
        queryType: null,
        routeBase: target.routeBase,
        doc: {},
        ...options,
      };
      Object.defineProperty(target, functionName, descriptor);

      const routeName =
        options.path === undefined ? RouteDecorators._getRouteFromMethode(functionName) : options.path;

      target.routeBase = options.routeBase;
      target.routes[type].push({
        path: routeName,
        options,
        call: target[functionName],
      });
    };
  }

  static WebSocket(params) {
    return (target, key, descriptor) => {
      params = {
        eventName: RouteDecorators._getEventFromMethode(key),
        ...params,
      };
      const fuc = RouteDecorators._addRoute('websocket', params);
      fuc(target, key, descriptor);
    };
  }
  static Get(params) {
    return (target, key, descriptor) => {
      const fuc = RouteDecorators._addRoute('get', params);
      fuc(target, key, descriptor);
    };
  }
  static Post(params) {
    return (target, key, descriptor) => {
      const fuc = RouteDecorators._addRoute('post', params);
      fuc(target, key, descriptor);
    };
  }
  static Patch(params) {
    return (target, key, descriptor) => {
      const fuc = RouteDecorators._addRoute('patch', params);
      fuc(target, key, descriptor);
    };
  }
  static Put(params) {
    return (target, key, descriptor) => {
      const fuc = RouteDecorators._addRoute('put', params);
      fuc(target, key, descriptor);
    };
  }
  static Delete(params) {
    return (target, key, descriptor) => {
      const fuc = RouteDecorators._addRoute('delete', params);
      fuc(target, key, descriptor);
    };
  }
}
