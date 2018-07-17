import Route from '../../../dist/routes/Route';

@Route.Route({
  accesses: [async () => false],
})
export default class RouteNotAccess extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({ path: '' })
  async index(ctx) {
    this.sendOk(ctx, 'hellow');
  }

  @Route.Get({ accesses: [() => true] })
  async access(ctx) {
    this.sendOk(ctx, 'hellow');
  }
}
