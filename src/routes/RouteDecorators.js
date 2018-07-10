
/**
 * @typedef {Object} ParamsMethodDecorator
 * @property {Object.<string, boolean | PostParamsFilter>} params the params describing the route's middlewares,
 *                                                                with the key being the param's name,
 *                                                                and the value describes the way it should be handled.
 *                                                                (only applicable for requests containing a body)
 * @property {string} path the path at which the route will be available.<br/>
 * By default it will take the name of the function and replace uppercase by "-".<br/>
 * ex: a function name addUser will be mount with /add-user
 * @property {boolean} disabled if set to true, the route will be ignored
 * @property {function[]} middlewares an array of Koa Middlewares, which will be mounted for the given route
 * @property {Object} rateLimit a rateLimit object, which lets the user describe the max rate at which a user can access the route
 */

/**
 * @typedef {Object} ParamsClassDecorator
 * @property {string} routeBase a prefix which will be preppended all to the route's path
 * @property {boolean} disabled if set to true, all route in the class will be ignored
 * @property {function[]} middlewares an array of Koa Middlewares, which will be mounted for the given route
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

  static _initData(target) {
    target.routes = target.routes || {
      get: [],
      post: [],
      delete: [],
      patch: [],
      put: [],
    };
    if (target.routeBase === undefined) {
      target.routeBase = target.constructor.name.replace('Route', '');
      target.routeBase = RouteDecorators._getRouteFromMethode(target.routeBase);
    }
  }

  static Route({ routeBase, disable = false, middlewares = null }) {
    return (target, key, descriptor) => { // eslint-disable-line no-unused-vars
      if (routeBase != null) { // null or undefined
        target.prototype.routeBase = routeBase;
      }
      if (disable != null) {
        target.prototype.disable = disable;
      }
      if (Array.isArray(middlewares)) {
        target.prototype.middlewares = middlewares;
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
        params: {},
        routeBase: target.routeBase,
        ...options,
      };
      Object.defineProperty(target, functionName, descriptor);

      const routeName = options.path === undefined ?
        RouteDecorators._getRouteFromMethode(functionName) : options.path;

      target.routeBase = options.routeBase;
      target.routes[type].push({
        path: routeName,
        options,
        call: target[functionName],
      });
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
