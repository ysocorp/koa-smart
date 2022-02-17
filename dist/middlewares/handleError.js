"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorApp_1 = __importDefault(require("../utils/ErrorApp"));
const __ = string => string;
let options = {
    logAll: false,
    logErrorUnknown: false,
    logErrorSequelize: false,
    logErrorApp: false,
};
function displayLog(error, type) {
    if (options.logAll || options[type]) {
        // eslint-disable-next-line
        console.error(error);
    }
}
function getMessageTranslate(ctx, msg, toTranslate) {
    if (toTranslate) {
        if (ctx.i18n && ctx.i18n.__) {
            return ctx.i18n.__(msg);
        }
        else if (ctx.state && ctx.state.__) {
            return ctx.state.__(msg);
        }
    }
    return msg;
}
async function handleError(ctx, next) {
    try {
        await next();
    }
    catch (err) {
        const arraySequelize = [
            'SequelizeValidationError',
            'SequelizeUniqueConstraintError',
        ];
        if (err instanceof ErrorApp_1.default) {
            // expected error
            ctx.status = err.status;
            ctx.body = {};
            if (err.messages) {
                ctx.body.messages = err.messages;
            }
            else {
                ctx.body.message = getMessageTranslate(ctx, err.message, err.toTranslate);
            }
            displayLog(err, 'logErrorApp');
        }
        else if (arraySequelize.includes(err.name)) {
            // sequilize expected error by validattor or other
            ctx.status = 400;
            ctx.body = {
                message: getMessageTranslate(ctx, err.message.split(':').pop(), true),
            };
            displayLog(err, 'logErrorSequelize');
        }
        else {
            // unexpected error
            ctx.status = 500;
            ctx.body = {
                message: getMessageTranslate(ctx, __('Please contact the support'), true),
            };
            displayLog(err, 'logErrorUnknown');
        }
    }
}
/**
 * middleware in charge of handling errors thrown on purpose,
 * either through manually throwing {@link ErrorApp},
 * either through calling {@link Route.throw}.
 *
 * It will also make sure errors pertaining to models as well as unexpected error are given a clearer message.
 * @param {OptionErrors} [opt = {}] option object to set which events should be logged
 */
exports.default = (opt = {}) => {
    options = Object.assign(Object.assign({}, options), opt);
    return handleError;
};
//# sourceMappingURL=handleError.js.map