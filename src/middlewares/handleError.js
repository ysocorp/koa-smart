import ErrorApp from '../utils/ErrorApp';

const __ = string => string;

function getMessageTranslate(ctx, msg) {
  if (ctx.i18n.__) {
    return ctx.i18n.__(msg);
  } else if (ctx.state.__) {
    return ctx.state.__(msg);
  }
  return msg;
}

async function handleError(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.status = ctx.status !== 500 ? ctx.status : 400;
    ctx.body = { message: err.message };
    if (!(err instanceof ErrorApp)) {
      let msg = __('Please contact the support');
      ctx.body = { message: getMessageTranslate(ctx, msg)};
    }
    const arraySequelize = ['SequelizeValidationError', 'SequelizeUniqueConstraintError'];
    if (arraySequelize.includes(err.name) || err.toTranslate) {
      const message = err.message.split(':').pop();
      ctx.body.message = getMessageTranslate(ctx, message);
    }
    throw err;
  }
}

export default handleError;
