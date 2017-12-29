import Route from '../../../dist/routes/Route';

export default class RouteBasePath extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({ path: '' })
  async index(ctx) {
    this.sendOk(ctx, "hellow");
  }

  @Route.Get({})
  async MyPath(ctx) {
    this.sendOk(ctx, "hellow");
  }
}
