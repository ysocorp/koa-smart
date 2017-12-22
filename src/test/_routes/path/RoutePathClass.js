import Route from '../../../routes/Route';

@Route.Route({
  routeBase: 'path'
})
export default class RoutePathClass extends Route {
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

  @Route.Get({})
  async mypath(ctx) {
    this.sendOk(ctx, "hellow");
  }

  @Route.Get({
    path: 'path-change',
  })
  async myNewPath(ctx) {
    this.sendOk(ctx, "hellow");
  }
}
