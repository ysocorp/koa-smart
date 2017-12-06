export default async (ctx, next) => {
  ctx.body = ctx.body ? ctx.body : {};
  await next();
};
