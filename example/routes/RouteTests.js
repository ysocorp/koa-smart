import { Route } from '../../index';

@Route.Route({
  routeBase: 'tutu',
})
export default class RouteTests extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({})
  async hellow(ctx) {
    this.sendOk(ctx, "hellow");
  }
}
