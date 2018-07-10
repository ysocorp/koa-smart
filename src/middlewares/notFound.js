

async function notFound(ctx) {
  ctx.status = 404;
  ctx.body = {
    message: ctx.state.__ ? ctx.state.__('Not found') : 'Not found',
  };
}

/**
 * @desc middleware preventingly setting the response's status to 404, in case no path is picked up
 */
export default () => notFound;
