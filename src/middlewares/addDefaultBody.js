let options = {
    body: {},
}

async function addDefaultBody(ctx, next) {
  ctx.body = ctx.body || options.body;
  await next();
}

export default (body = {}) => {
  options.body = body;
  return addDefaultBody;
};
