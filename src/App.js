import { join as pathJoin } from 'path';
import { readdirSync } from 'fs';
import Koa from 'koa';
import locale from 'koa-locale';

import Route from './routes/Route';
import notFound from './middlewares/notFound';

import { objValToArray } from './utils/utils';


export default class App {

  /**
   * @access private
   */
  routeParam = null;
  /**
   * @access private
   */
  routes = {};

  constructor(opt) {
    const {
      routeParam = {},
      port = process.env.PORT || 3000,
    } = opt;
    this.routeParam = routeParam;
    /**
     * @access private
     */
    this.port = port;
    /**
     * @access private
     */
    this.app = new Koa();

    locale(this.app)
  }

  _getAllRoutes(path, prefix) {
    this.routes[prefix] = this.routes[prefix] || {};

    readdirSync(path)
      .filter(file => file.endsWith('.js') || file.endsWith('.ts'))
      .forEach((file) => {
        const RouteClass = require(pathJoin(path, file)).default;
        if (RouteClass && RouteClass.prototype instanceof Route) {
          const route = new RouteClass({
            prefix,
            app: this.app,
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
   */
  addMiddlewares(middlewares) {
    middlewares.forEach(e => this.addMiddleware(e));
  }

  /**
   * @access public
   * @desc adds the provided function to the list of Koa middlewares to be executed for all routes.
   * @param {function[]} middleware an array of middlewares
   */
  addMiddleware(middleware) {
    this.app.use(middleware);
  }

  /**
   * @access public
   * @desc "mounts" a folder, scanning it for route files, then adding the discovered routes to the app.
   *       a route is a class which extends {@link Route}
   * @param {string} pathFolder the path of the folder to mount
   * @param {string} [prefix='/'] an optional prefix to prepend to all of the folder's routes
   */
  mountFolder(pathFolder, prefix = '/') {
    const routes = this._getAllRoutes(pathFolder, prefix);
    for (const route of routes) {
      route.mount();
      this.app.use(route.koaRouter.middleware());
    }
  }

  /**
   * @access public
   * @desc Launches the app and starts listening on the configured port.
   */
  async start() {
    this.app.use(notFound());
    return this.app.listen(this.port);
  }
}
