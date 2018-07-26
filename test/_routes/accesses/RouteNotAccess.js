import Route from '../../../dist/routes/Route';

async function Private() {
  return false;
}
async function Public() {
  return true;
}

@Route.Route({
  accesses: [Private],
})
export default class RouteNotAccess extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({ path: '' })
  async index(ctx) {
    this.sendOk(ctx, 'hellow');
  }

  @Route.Get({ accesses: [Public] })
  async access(ctx) {
    this.sendOk(ctx, 'hellow');
  }
}
