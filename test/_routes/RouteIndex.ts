import Route from '../../dist/routes/Route';

@Route.Route({
  routeBase: '',
})
export default class RouteIndex extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({ path: '' })
  async index(ctx) {
    ctx.body.data = 'index';
  }
}
