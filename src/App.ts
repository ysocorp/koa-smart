import { join as pathJoin } from 'path';
import { readdirSync } from 'fs';

import Koa from 'koa';
import locale from 'koa-locale';

import Route from './routes/Route';
import notFound from './middlewares/notFound';

import { objValToArray } from './utils/utils';
import * as docGenerator from './utils/docGenerator';
import { Server } from 'http';

export default class App {
  /**
   * @ignore
   */
  routeParam: any = null;
  /**
   * @ignore
   */
  routes = {};
  port: number;
  koaApp: Koa;

  constructor(opt) {
    const {
      routeParam = {},
      port = process.env.PORT || 3000,
      docPath = pathJoin(__dirname, '..', 'apidoc'),
      generateDoc = false,
    } = opt;
    this.routeParam = routeParam;
    /**
     * @ignore
     * @type {number}
     */
    this.port = port;
    /**
     * @ignore
     * @type {Koa}
     */
    this.koaApp = new Koa();

    locale(this.koaApp);

    docGenerator.init(docPath, generateDoc);
  }

  /**
   * @ignore
   */
  _getAllRoutes(path, prefix) {
    this.routes[prefix] = this.routes[prefix] || {};

    readdirSync(path)
      .filter(file => file.endsWith('.js') || file.endsWith('.ts'))
      .forEach(file => {
        const RouteClass = require(pathJoin(path, file)).default;
        if (RouteClass && RouteClass.prototype instanceof Route) {
          const route = new RouteClass({
            prefix,
            koaApp: this.koaApp,
            routes: this.routes[prefix],
            ...this.routeParam,
          });
          this.routes[prefix][route.constructor.name] = route;
        }
      });
    return objValToArray(this.routes[prefix]);
  }

  /**
   * @access public
   * @desc adds the provided functions to the list of Koa middlewares to be executed for all routes.
   * @param {function} middlewares an array of Koa-compliant middlewares
   * @return { }
   */
  addMiddlewares(middlewares) {
    middlewares.forEach(e => this.addMiddleware(e));
  }

  /**
   * @access public
   * @desc adds the provided function to the list of Koa middlewares to be executed for all routes.
   * @param {function[]} middleware an array of middlewares
   * @return { }
   */
  addMiddleware(middleware) {
    this.koaApp.use(middleware);
  }

  /**
   * @access public
   * @desc "mounts" a folder, scanning it for route files, then adding the discovered routes to the app.
   *       a route is a class which extends {@link Route}
   * @param {string} pathFolder the path of the folder to mount
   * @param {string} [prefix='/'] an optional prefix to prepend to all of the folder's routes
   * @return { }
   */
  mountFolder(pathFolder, prefix = '/', opt: any = {}) {
    const { generateDoc = true } = opt;
    const routes = this._getAllRoutes(pathFolder, prefix);
    for (const route of routes) {
      route.generateDoc = generateDoc;
      route.mount();
      this.koaApp.use(route.koaRouter.middleware());
    }
  }

  /**
   * @access public
   * @desc "mounts" a file, then adding the discovered routes to the app.
   *       a route is a class which extends {@link Route}
   * @param {string} pathFile the path of the file to mount
   * @param {string} [prefix='/'] an optional prefix to prepend to all of the folder's routes
   * @return { }
   */
  mountFile(pathFile: string, prefix: string, opt: any = {}) {
    const { generateDoc = true } = opt;
    const RouteClass = require(pathFile).default;
    if (RouteClass && RouteClass.prototype instanceof Route) {
      const route = new RouteClass({
        prefix,
        koaApp: this.koaApp,
        routes: this.routes[prefix],
        ...this.routeParam,
      });
      route.generateDoc = generateDoc;
      route.mount();
      this.koaApp.use(route.koaRouter.middleware());
    }
  }

  /**
   * @access public
   * @desc Launches the app and starts listening on the configured port.
   * @return {Koa}
   */
  public async start(): Promise<Server> {
    this.koaApp.use(notFound());

    docGenerator.end();

    return this.koaApp.listen(this.port);
  }
}
