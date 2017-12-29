import { join as pathJoin } from 'path';
import { readdirSync } from 'fs';
import Koa from 'koa';
import locale from 'koa-locale';

import Route from './routes/Route';
import notFound from './middlewares/notFound';

import { objValToArray } from './utils/utils';


export default class App {
  routeParam = null;
  routes = {};

  constructor(opt) {
    const {
      routeParam = {},
      port = process.env.PORT || 3000,
    } = opt;
    this.routeParam = routeParam;
    this.port = port;
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

  addMiddlewares(middlewares) {
    middlewares.forEach(e => this.addMiddleware(e));
  }

  addMiddleware(middleware) {
    this.app.use(middleware);
  }

  mountFolder(pathFolder, prefix = '/') {
    const routes = this._getAllRoutes(pathFolder, prefix);
    for (const route of routes) {
      route.mount();
      this.app.use(route.koaRouter.middleware());
    }
  }

  async start() {
    this.app.use(notFound());
    return this.app.listen(this.port);
  }
}
