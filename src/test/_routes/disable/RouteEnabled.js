import Route from '../../../routes/Route';

@Route.Route({
  disable: false,
})
export default class RouteEnabled extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({ path: '' })
  async enabled(ctx) {
    this.sendOk(ctx, "hellow");
  }

  @Route.Get({ disable: false })
  async enabled2(ctx) {
    this.sendOk(ctx, "hellow");
  }

  @Route.Get({ disable: true })
  async disabled(ctx) {
    this.sendOk(ctx, "hellow");
  }
}
