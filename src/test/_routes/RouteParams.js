import Route from '../../routes/Route';

export default class RouteParams extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Post({
    path: '',
    params: {
      email: true,
      password: false,
    },
  })
  async params(ctx) {
    this.sendOk(ctx, {
      checked: this.body(ctx),
      original: this.body(ctx, true),
    });
  }

}
