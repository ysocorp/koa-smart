import Route from '../../dist/routes/Route';
import { Types } from '../../dist';

export default class RouteParams extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Post({
    path: '',
    bodyType: Types.object().keys({
      email: Types.string().required(),
      password: Types.string(),
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
      email: Types.string().required(),
      passwordQ: Types.string(),
    }),
    bodyType: Types.object().keys({
      email: Types.string().required(),
      passwordB: Types.string(),
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

  @Route.Post({
    queryType: Types.object().keys({
      single: Types.array()
        .type(Types.number())
        .single(),
      notSingle: Types.array().type(Types.number()),
    }),
    bodyType: Types.array().type(Types.number().integer()),
  })
  async array(ctx) {
    this.sendOk(ctx, {
      bodyChecked: this.body(ctx),
      bodyOriginal: this.body(ctx, true),
      queryChecked: this.queryParam(ctx),
      queryOriginal: this.queryParam(ctx, true),
    });
  }
}
