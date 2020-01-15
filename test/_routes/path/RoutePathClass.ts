import Route from '../../../dist/routes/Route';

@Route.Route({
  routeBase: 'path',
})
export default class RoutePathClass extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({ path: '' })
  async index(ctx) {
    this.sendOk(ctx, 'hellow');
  }

  @Route.Get({})
  async MyPath(ctx) {
    this.sendOk(ctx, 'hellow');
  }

  @Route.Get({})
  async mypath(ctx) {
    this.sendOk(ctx, 'hellow');
  }

  @Route.Get({
    path: 'path-change',
  })
  async myNewPath(ctx) {
    this.sendOk(ctx, 'hellow');
  }

  @Route.Get({ path: 'samepath' })
  async samepathGet(ctx) {
    this.sendOk(ctx, 'get');
  }

  @Route.Post({ path: 'samepath' })
  async samepathPost(ctx) {
    this.sendOk(ctx, 'post');
  }

  @Route.Patch({ path: 'samepath' })
  async samepathPatch(ctx) {
    this.sendOk(ctx, 'patch');
  }

  @Route.Put({ path: 'samepath' })
  async samepathPut(ctx) {
    this.sendOk(ctx, 'put');
  }

  @Route.Delete({ path: 'samepath' })
  async samepathDelete(ctx) {
    this.sendOk(ctx, 'delete');
  }
}
