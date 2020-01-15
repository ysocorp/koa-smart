import Route from '../../../dist/routes/Route';

async function Private() {
  return false;
}
async function Public() {
  return true;
}

@Route.Route({
  accesses: [Public],
})
export default class RouteAccess extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({ path: '' })
  async index(ctx) {
    this.sendOk(ctx, 'hellow');
  }

  @Route.Get({ accesses: [Private] })
  async notAccess(ctx) {
    this.sendOk(ctx, 'hellow');
  }
}
