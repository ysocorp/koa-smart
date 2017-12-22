import Route from '../../../routes/Route';

@Route.Route({
  disable: true,
})
export default class RouteUnDisabled extends Route {
  constructor(params) {
    super({ ...params, disable: false });
  }

  @Route.Get({ path: '' })
  async index(ctx) {
    this.sendOk(ctx, "hellow");
  }

  @Route.Get({ disable: true })
  async disabled(ctx) {
    this.sendOk(ctx, "hellow");
  }
}
