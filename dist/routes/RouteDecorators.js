"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *@ignore
 */
class RouteDecorators {
    // replace A-Z to lowercase and add - ex myFunc => my-func
    static _getRouteFromMethode(str) {
        return str.replace(/([A-Z])/g, (_fullString, letter, index) => index === 0 ? `${letter.toLowerCase()}` : `-${letter.toLowerCase()}`);
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
    static Route(options = {}) {
        return (target /*, key, descriptor*/) => {
            const opt = Object.assign(Object.assign({}, options), { disable: !!options.disable });
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
            options = Object.assign({ path: undefined, accesses: [], bodyType: null, queryType: null, routeBase: target.routeBase, doc: {} }, options);
            Object.defineProperty(target, functionName, descriptor);
            const routeName = options.path === undefined
                ? RouteDecorators._getRouteFromMethode(functionName)
                : options.path;
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
exports.default = RouteDecorators;
//# sourceMappingURL=RouteDecorators.js.map