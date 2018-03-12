const __ = string => string;

/**
 * @typedef OptionErrors
 * @property {boolean} [logAll = false] if set to true, all logs will be displayed regardless of their individual settings
 * @property {boolean} [logErrorUnknown = false] whether unknown errors should be displayed
 * @property {boolean} [logErrorSequelize = false] whether errors pertaining to the models should be logged
 * @property {boolean} [logErrorApp = false] whether errors coming from thrown {@link ErrorApp} should be logged
 */
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

/**
 * @desc middleware handling various errors, turning them into readable messages
 * @param {OptionErrors} [opt = {}] option object to set which events should be logged
 */
export default (opt = {}) => {
  options = {
    ...options,
    ...opt,
  }
  return handleError;
};
