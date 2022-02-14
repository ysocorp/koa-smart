import Route from '../../dist/routes/Route';
import { Types } from '../../dist';

export default class RouteReturnTypes extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Post({
    path: '',
    bodyType: Types.object().keys({}),
    returnType: Types.object().keys({
      stringRequired: Types.string().required(),
      stringRequiredWithDefaultValue: Types.string().default('stringRequiredWithDefaultValue').required(),
      stringOptional: Types.string(),
      stringOptionalWithDefaultValue: Types.string().default('stringOptionalWithDefaultValue'),
      deep: Types.object().keys({
        firstName: Types.string().required(),
        lastName: Types.string().default('PWD'),
      }).required(),
    }),
  })
  async returnBody(ctx) {
    this.sendOk(ctx, this.body(ctx, true));
  }
}
