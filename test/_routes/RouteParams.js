import Route from '../../dist/routes/Route';

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

  @Route.Post({ 
    path: 'samepath',
    params: {
      post: true,
    },
  })
  async samepathPost(ctx) {
    this.sendOk(ctx, this.body(ctx));
  }

  @Route.Patch({ 
    path: 'samepath',
    params: {
      patch: true,
    },
  })
  async samepathPatch(ctx) {
    this.sendOk(ctx, this.body(ctx));
  }
}
