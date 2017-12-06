async function notFound(ctx) {
  ctx.status = 404;
  ctx.body = {
    message: ctx.state.__('Not found'),
  };
}

export default notFound;
