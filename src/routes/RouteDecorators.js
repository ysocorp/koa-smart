

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
    };
    if (target.routeBase === undefined) {
      target.routeBase = target.constructor.name.replace('Route', '');
      target.routeBase = RouteDecorators._getRouteFromMethode(target.routeBase);
    }
  }

  static Route({ routeBase }) {
    return (target, key, descriptor) => { // eslint-disable-line no-unused-vars
      target.prototype.routeBase = routeBase;
      RouteDecorators._initData(target);
    };
  }

  static _addRoute(type, options = {}) {
    return (target, functionName, descriptor) => {
      RouteDecorators._initData(target);
      options = {
        path: undefined,
        fullPath: undefined,
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
