import { join as pathJoin } from 'path';
import { readdirSync } from 'fs';
import Koa from 'koa';

import Route from './routes/Route';
import notFound from './middlewares/notFound';

import { objValToArray } from './utils/utils';


export default class App {
  routeParam = null;
  routes = {};

  constructor({ routeParam, port }) {
    this.routeParam = routeParam || {};
    this.port = port || process.env.PORT || 3000;
    this.app = new Koa();
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
    for (const elem of middlewares) {
      this.app.use(elem);
    }
  }

  mountFolder(pathFolder, prefix = '/') {
    const routes = this._getAllRoutes(pathFolder, prefix);
    for (const route of routes) {
      route.mount();
      this.app.use(route.koaRouter.middleware());
    }
  }

  start() {
    this.app.use(notFound);
    return this.app.listen(this.port);
  }
}
