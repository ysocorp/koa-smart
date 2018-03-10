const __ = string => string;

let options = {
  logAll: false,
  logErrorUnknown: false,
  logErrorSequelize: false,
  logErrorApp: false,
}

function displayLog(error, type) {
  if (options.logAll || options[type]) {
    console.error(error);
  }
}

function getMessageTranslate(ctx, msg, toTranslate) {
  if (toTranslate) {
    if (ctx.i18n && ctx.i18n.__) {
      return ctx.i18n.__(msg);
    } else if (ctx.state && ctx.state.__) {
      return ctx.state.__(msg);
    }
  }
  return msg;
}

async function handleError(ctx, next) {
  try {
    await next();
  } catch (err) {
    const arraySequelize = ['SequelizeValidationError', 'SequelizeUniqueConstraintError'];

    if (err.constructor.name === 'ErrorApp') { // expected error
      ctx.status = err.status;
      ctx.body = { message: getMessageTranslate(ctx, err.message, err.toTranslate) };
      displayLog(err, 'logErrorApp');
    } else if (arraySequelize.includes(err.name)) { // sequilize expected error by validattor or other
      ctx.status = 400;
      ctx.body = { message: getMessageTranslate(ctx, err.message.split(':').pop(), true) };
      displayLog(err, 'logErrorSequelize');
    } else { // unexpected error
      ctx.status = 500;
      ctx.body = { message: getMessageTranslate(ctx, __('Please contact the support'), true) };
      displayLog(err, 'logErrorUnknown');
    }
  }
}

export default (opt = {}) => {
  options = {
    ...options,
    ...opt,
  }
  return handleError;
};
