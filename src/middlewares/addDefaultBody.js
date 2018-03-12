let options = {
    body: {},
}


async function addDefaultBody(ctx, next) {
  ctx.body = ctx.body || options.body;
  await next();
}

/**
 * @desc middleware setting a default starting body
 * @param {Object} body The default body to persist through the app
 * @return {KoaMiddleware}
 */
export default (body = {}) => {
  options.body = body;
  return addDefaultBody;
};
