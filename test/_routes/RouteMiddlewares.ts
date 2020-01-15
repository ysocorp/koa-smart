import Route from '../../dist/routes/Route';

@Route.Route({
  middlewares: [
    async (ctx, next) => {
      ctx.body.start = 'class';
      ctx.body.middleware = 'class';
      ctx.body.data = 'class';
      await next();
    },
  ],
})
export default class RouteMiddlewares extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({})
  async without(ctx) {
    ctx.body.data = 'content';
  }

  @Route.Get({
    middlewares: [
      async (ctx, next) => {
        ctx.body.middleware = 'route';
        ctx.body.data = 'route';
        await next();
      },
    ],
  })
  async with(ctx) {
    ctx.body.data = 'content';
  }
}
