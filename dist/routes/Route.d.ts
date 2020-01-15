import KoaRouter from 'koa-router';
import Koa from 'koa';
import { ParamsMethodDecorator, ParamsClassDecorator } from './RouteDecorators';
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
     * an array containing all of the app's models
     */
    models: any[];
    /**
     * the name of the route's own model
     */
    model: string;
    /**
     * whether the route should be disabled
     */
    disable: boolean;
}
declare type Decorator = Function;
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
    static Get: (params: ParamsMethodDecorator) => Decorator;
    /**
     * @desc mounts the tagged function as a POST route.
     */
    static Post: (params: ParamsMethodDecorator) => Decorator;
    /**
     * @desc mounts the tagged function as a PUT route.
     */
    static Put: (params: ParamsMethodDecorator) => Decorator;
    /**
     * @desc mounts the tagged function as a PATCH route.
     */
    static Patch: (params: ParamsMethodDecorator) => Decorator;
    /**
     * @desc mounts the tagged function as a DELETE route.
     */
    static Delete: (params: ParamsMethodDecorator) => Decorator;
    /**
     * @desc used to set some parameters on an entire class.
     * The supported parameters are middlewares, disable, and routeBase.
     */
    static Route: (params: ParamsClassDecorator) => Decorator;
    /**
     * @desc if true it will log which route are mount and which are not
     */
    static displayLog: boolean;
    static StatusCode: import("../utils/StatusCode").StatusCode;
    koaApp: Koa;
    prefix: string;
    allRoutesInstance: Route[];
    disable: boolean;
    middlewares: Array<(ctx: Koa.Context, next: Function) => Promise<void>>;
    koaRouter: KoaRouter;
    routes: {
        [routeType: string]: Array<Route>;
    };
    routeBase: string;
    accesses: Array<(ctx: Koa.Context) => Promise<boolean>>;
    path: string;
    options: any;
    constructor({ koaApp, prefix, disable }: RouteParams);
    /**
     * logs a message, but only if the route's logs are set to be displayed.
     *
     * accepts several parameters
     */
    log(...args: string[]): void;
    /**
     * @desc Registers the route and makes it callable once the API is launched.
     *       the route will be called along with the middlewares that were registered in the decorator.
     *
     *       you will usually not need to call this method yourself.
     */
    mount(): void;
    /**
     *@ignore
     */
    _use(infos: any): ((ctx: any, next: any) => Promise<void>)[];
    /**
     *@ignore
     */
    getRateLimit(option: any, routePath: any, type: any): any;
    /**
     * if a decorator has a rateLimit property, it will add the rate limiting mechanism to the route,
     * with a unique ID for each route in order to differentiate the various routes.
     *
     * You should not need to call this method directly.
     * @param middlewares the array of currently registered middlewares for the given route
     * @param params the route's parameters
     */
    addRateLimit(middlewares: Function[], { options }: RateLimitOptions): void;
    /**
     *@ignore
     */
    _beforeRoute(infos: any): (ctx: any, next: any) => Promise<void>;
    /**
     * @desc a member which can be overriden, which will always be executed before the route is accessed
     * @param ctx Koa's context object
     * @param params an object containing all route parameters
     * @param next the next middleware in the chain
     */
    beforeRoute(ctx: Koa.Context, { options }: BeforeRouteParams, next: Function): Promise<void>;
    /**
     *@ignore
     */
    _mlTestAccess(ctx: any, { accesses }: {
        accesses?: any[];
    }): Promise<boolean>;
    /**
     *@ignore
     */
    _mlParams(ctx: any, { bodyType, queryType }: {
        bodyType?: any;
        queryType?: any;
    }): void;
    /**
     *@ignore
     */
    _mlTestParams(ctx: any, body: any, type: any): any;
    /**
     * @desc retrieves the context's body, if the request has one.
     * @param ctx koa's context object
     * @param original if set to true, the function will return the body before
     * it is filtered by the param decorator.
     * otherwise, it will return the filtered and transformed body.
     * @todo play with bodyOrigin elsewhere to use Koa.Context
     */
    body(ctx: any, original?: boolean): any;
    /**
     * @desc retrieves the query params in a GET request
     * @param ctx koa's context object
     * @todo play with queryOrigin elsewhere to use Koa.Context
     */
    queryParam(ctx: any, original?: boolean): any;
    /**
     * @desc sets the response's body (with a message + data field) and status.
     * @param ctx koa's context object
     * @param status the HTTP status code to end the request with
     * @param data the data to be yielded by the requests
     * @param message the message to be yielded by the request
     */
    send(ctx: Koa.Context, status: number, data: any, message: string): void;
    /**
     * @desc same as {@link send}, but automatically sets the status to 200 OK
     * @param ctx koa's context object
     * @param data the data to be yielded by the requests
     * @param message the message to be yielded by the request
     */
    sendOk(ctx: Koa.Context, data: any, message?: string): void;
    /**
     * @desc same as {@link send}, but automatically sets the status to 201 CREATED
     * @param ctx koa's context object
     * @param data the data to be yielded by the requests
     * @param message the message to be yielded by the request
     */
    sendCreated(ctx: Koa.Context, data: any, message: string): void;
    /**
     * @desc replies with an empty body, yielding 204 NO CONTENT as the status
     * @param ctx koa's context object
     */
    sendNoContent(ctx: Koa.Context): void;
    /**
     * @desc throws a formated error to be caught.
     * @param status the error's HTTP status StatusCode
     * @param error the error(s) to be yielded by the request
     * @param translate indicates whether the message should be translated or not
     * @throws {ErrorApp} thrown error.
     */
    throw(status: number, error: string | Object, translate?: boolean): void;
    /**
     * @version 2.0.0
     * @desc same as {@link throw}, but automatically sets the status to 400 BAD REQUEST
     * @param error the error(s) to be yielded by the request, default to "Bad request"
     * @param translate indicates whether the message should be translated or not
     */
    throwBadRequest(error: string | Object, translate?: boolean): void;
    /**
     * @version 2.0.0
     * @desc same as {@link throw}, but automatically sets the status to 401 UNAUTHORIZED
     * @param error the error(s) to be yielded by the request, default to "Unauthorized"
     * @param translate indicates whether the message should be translated or not
     */
    throwUnauthorized(error: string | Object, translate?: boolean): void;
    /**
     * @version 2.0.0
     * @desc same as {@link throw}, but automatically sets the status to 403 FORBIDDEN
     * @param error the error(s) to be yielded by the request, default to "Forbidden"
     * @param translate indicates whether the message should be translated or not
     */
    throwForbidden(error: string | Object, translate?: boolean): void;
    /**
     * @version 2.0.0
     * @desc same as {@link throw}, but automatically sets the status to 404 NOT FOUND
     * @param error the error(s) to be yielded by the request, default to "Not found"
     * @param translate indicates whether the message should be translated or not
     */
    throwNotFound(error: string | Object, translate?: boolean): void;
    /**
     * @desc checks a condition. If it evaluates to false, throws a formated error to be caught.
     * @param condition if set to false; assert will fail and throw.
     * @param status the error's HTTP status StatusCode
     * @param error the error(s) to be yielded by the request
     * @param translate indicates whether the message should be translated or not
     * @throws {ErrorApp} thrown error, should the assert fail.
     */
    assert(condition: boolean, status: number, error: string | Object, translate?: boolean): void;
    /**
     * @version 2.0.0
     * @desc same as {@link assert}, but automatically sets the status to 400 BAD REQUEST
     * @param condition if set to false; assert will fail and throw.
     * @param error the error(s) to be yielded by the request, default to "Bad request"
     * @param translate indicates whether the message should be translated or not
     * @throws {ErrorApp} thrown error, should the assert fail.
     */
    assertBadRequest(condition: boolean, error: string | Object, translate?: boolean): void;
    /**
     * @version 2.0.0
     * @desc same as {@link assert}, but automatically sets the status to 401 UNAUTHORIZED
     * @param condition if set to false; assert will fail and throw.
     * @param error the error(s) to be yielded by the request, default to "Unauthorized"
     * @param translate indicates whether the message should be translated or not
     * @throws {ErrorApp} thrown error, should the assert fail.
     */
    assertUnauthorized(condition: boolean, error: string | Object, translate?: boolean): void;
    /**
     * @version 2.0.0
     * @desc same as {@link assert}, but automatically sets the status to 403 FORBIDDEN
     * @param condition if set to false; assert will fail and throw.
     * @param error the error(s) to be yielded by the request, default to "Forbidden"
     * @param translate indicates whether the message should be translated or not
     * @throws {ErrorApp} thrown error, should the assert fail.
     */
    assertForbidden(condition: boolean, error: string | Object, translate?: boolean): void;
    /**
     * @version 2.0.0
     * @desc same as {@link assert}, but automatically sets the status to 400 BAD REQUEST
     * @param condition if set to false; assert will fail and throw.
     * @param error the error(s) to be yielded by the request, default to "Not found"
     * @param translate indicates whether the message should be translated or not
     * @throws {ErrorApp} thrown error, should the assert fail.
     */
    assertNotFound(condition: boolean, error: string | Object, translate?: boolean): void;
}
export {};
