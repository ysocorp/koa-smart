export interface ParamsMethodDecorator {
    /**
     * Description of the body receiving
     */
    bodyType?: any;
    /**
     * Description of the "request.query" receiving
     */
    queryType?: any;
    /**
     * the path at which the route will be available.
     * By default it will take the name of the function and replace uppercase by "-".
     * Ex: a function name addUser will be mount with /add-user
     */
    path?: string;
    /**
     * if set to true, the route will be ignored
     */
    disable?: boolean;
    /**
     * an array of Koa Middlewares, which will be mounted for the given route
     */
    middlewares?: Function[];
    /**
     * a rateLimit object, which lets the user describe the max rate at which a user can access the route
     */
    rateLimit?: Object;
    /**
     * an array of async function, which will be call with ctx,
     * if one of them return true, the current client will access the route.
     * This will overwrite the accesses pass to {ParamsClassDecorator}
     */
    accesses?: Function[];
    /**
     * an object describing the function
     */
    doc?: any;
}
export interface ParamsClassDecorator {
    /**
     * a prefix which will be preppended all to the route's path
     */
    routeBase?: string;
    /**
     * if set to true, all route in the class will be ignored
     */
    disable?: boolean;
    /**
     * an array of Koa Middlewares, which will be mounted for the given route
     */
    middlewares?: Function[];
    /**
     * an array of async function, which will be call (for all routes in the class) with ctx,
     * if one of them return true, the current client will access the route
     */
    accesses?: Function[];
}
/**
 *@ignore
 */
export default class RouteDecorators {
    static _getRouteFromMethode(str: any): any;
    static _initData(target: any): void;
    static Route(options?: any): (target: any) => void;
    static _addRoute(type: any, options?: any): (target: any, functionName: any, descriptor: any) => void;
    static Get(params: any): (target: any, key: any, descriptor: any) => void;
    static Post(params: any): (target: any, key: any, descriptor: any) => void;
    static Patch(params: any): (target: any, key: any, descriptor: any) => void;
    static Put(params: any): (target: any, key: any, descriptor: any) => void;
    static Delete(params: any): (target: any, key: any, descriptor: any) => void;
}
