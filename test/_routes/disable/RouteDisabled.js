import Route from '../../../dist/routes/Route';

@Route.Route({
  disable: true,
})
export default class RouteDisabled extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({ path: '' })
  async index(ctx) {
    this.sendOk(ctx, "hellow");
  }

  @Route.Get({ disable: false })
  async tryDisable(ctx) {
    this.sendOk(ctx, "hellow");
  }
}
