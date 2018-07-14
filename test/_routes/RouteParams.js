import Route from '../../dist/routes/Route';
import { Types } from '../../dist';

export default class RouteParams extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Post({
    path: '',
    bodyType: Types.object().keys({
      email: Types.any().required(),
      password: Types.any(),
    }),
  })
  async params(ctx) {
    this.sendOk(ctx, {
      bodyChecked: this.body(ctx),
      bodyOriginal: this.body(ctx, true),
    });
  }

  @Route.Post({
    path: 'samepath',
    bodyType: Types.object().keys({
      post: Types.any().required(),
    }),
  })
  async samepathPost(ctx) {
    this.sendOk(ctx, this.body(ctx));
  }

  @Route.Patch({
    path: 'samepath',
    bodyType: Types.object().keys({
      patch: Types.any().required(),
    }),
  })
  async samepathPatch(ctx) {
    this.sendOk(ctx, this.body(ctx));
  }

  @Route.Post({
    path: 'queryType',
    queryType: Types.object().keys({
      email: Types.any().required(),
      passwordQ: Types.any(),
    }),
    bodyType: Types.object().keys({
      email: Types.any().required(),
      passwordB: Types.any(),
    }),
  })
  async postQueryType(ctx) {
    this.sendOk(ctx, {
      bodyChecked: this.body(ctx),
      bodyOriginal: this.body(ctx, true),
      queryChecked: this.queryParam(ctx),
      queryOriginal: this.queryParam(ctx, true),
    });
  }
}
