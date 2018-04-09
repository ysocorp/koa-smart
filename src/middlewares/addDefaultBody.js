let options = {
    body: {},
}

function copyBody() {
  return JSON.parse(JSON.stringify(options.body));
}

async function addDefaultBody(ctx, next) {
  ctx.body = ctx.body || copyBody();
  await next();
}

export default (body = {}) => {
  options.body = body;
  return addDefaultBody;
};
