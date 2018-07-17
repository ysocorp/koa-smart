import Route from '../../../dist/routes/Route';

@Route.Route({
  accesses: [() => true],
})
export default class RouteAccess extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({ path: '' })
  async index(ctx) {
    this.sendOk(ctx, 'hellow');
  }

  @Route.Get({ accesses: [() => false] })
  async notAccess(ctx) {
    this.sendOk(ctx, 'hellow');
  }
}
