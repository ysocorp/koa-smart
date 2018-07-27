import Route from '../../dist/routes/Route';
import { Types } from '../../dist';

const fragmentType = {
  any: Types.any(),
  anyRequired: Types.any().required(),
  arrayString: Types.array().type(Types.string().max(100)),
  arrayOneOf: Types.array().type(
    Types.oneOf().types(
      Types.string().max(100),
      Types.number().max(100),
      Types.array().type(Types.string().min(66))
    )
  ),
  binary: Types.binary()
    .encoding('base64')
    .min(3)
    .max(60),
  boolean: Types.boolean(),
  date: Types.date(),
  enum: Types.enum().oneOf('OK', 'KO'),
  number: Types.number().port(),
  oneOf: Types.oneOf().types(Types.string().max(100), Types.number().max(100), Types.any()),
  string: Types.string(),
};

const bodyType = Types.object().keys({
  ...fragmentType,
  object: Types.object()
    .keys({
      ...fragmentType,
      object: Types.object().keys(fragmentType),
    })
    .required(),
});

export default class RouteDocs extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Post({
    bodyType,
    queryType: Types.object().keys({
      getAny: Types.any(),
      getAnyRequired: Types.any().required(),
      getArrayString: Types.array().type(Types.string().max(100)),
    }),
    doc: { description: 'This is my description <br/> Ligne 2' },
  })
  async params(ctx) {
    this.sendOk(ctx, this.body(ctx));
  }

  @Route.Post({ bodyType: Types.array() })
  async paramsArray(ctx) {
    this.sendOk(ctx, this.body(ctx));
  }

  @Route.Post({
    bodyType,
    doc: { disable: true },
  })
  async disableDoc(ctx) {
    this.sendOk(ctx, this.body(ctx));
  }
}
