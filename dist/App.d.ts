/// <reference types="node" />
import Koa from "koa";
import { Server } from 'http';
export default class App {
    /**
     * @ignore
     */
    routeParam: any;
    /**
     * @ignore
     */
    routes: {};
    port: number;
    koaApp: Koa;
    constructor(opt: any);
    /**
     * @ignore
     */
    _getAllRoutes(path: any, prefix: any): any[];
    /**
     * @access public
     * @desc adds the provided functions to the list of Koa middlewares to be executed for all routes.
     * @param {function} middlewares an array of Koa-compliant middlewares
     * @return { }
     */
    addMiddlewares(middlewares: any): void;
    /**
     * @access public
     * @desc adds the provided function to the list of Koa middlewares to be executed for all routes.
     * @param {function[]} middleware an array of middlewares
     * @return { }
     */
    addMiddleware(middleware: any): void;
    /**
     * @access public
     * @desc "mounts" a folder, scanning it for route files, then adding the discovered routes to the app.
     *       a route is a class which extends {@link Route}
     * @param {string} pathFolder the path of the folder to mount
     * @param {string} [prefix='/'] an optional prefix to prepend to all of the folder's routes
     * @return { }
     */
    mountFolder(pathFolder: any, prefix?: string, opt?: any): void;
    /**
     * @access public
     * @desc Launches the app and starts listening on the configured port.
     * @return {Koa}
     */
    start(): Promise<Server>;
}
