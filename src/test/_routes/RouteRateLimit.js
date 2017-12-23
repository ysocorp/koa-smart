import Route from '../../routes/Route';

export default class RouteRateLimit extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({ rateLimit: { interval: { min: 1 }, max: 2 } })
  async min1max2(ctx) {
    this.sendNoContent(ctx);
  }

  @Route.Get({ rateLimit: { interval: { sec: 2 }, max: 2 } })
  async sec2max2(ctx) {
    this.sendNoContent(ctx);
  }

  @Route.Get({
    rateLimit: [
      { interval: { min: 1 }, max: 2 },
      { interval: { sec: 1 }, max: 5 }
    ]
  })
  async min1max2Sec1max5(ctx) {
    this.sendNoContent(ctx);
  }
}
