"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const moment_1 = __importDefault(require("moment"));
function dateFormat(date) {
    return (0, moment_1.default)(date).format('YYYY/MM/DD, h:mm:ss a');
}
function getColor(status) {
    if (status < 400) {
        return 'green';
    }
    else if (status < 500) {
        return 'gray';
    }
    return 'red';
}
async function logger(ctx, next) {
    const start = new Date();
    let status = 500;
    try {
        // eslint-disable-next-line
        console.log(`${chalk_1.default.blue(dateFormat(start))} - ${chalk_1.default.bold(ctx.method)} ${chalk_1.default.blue.bold(ctx.url)} START`);
        await next();
        status = ctx.status;
    }
    catch (err) {
        let msg = err;
        const arraySequelize = [
            'SequelizeValidationError',
            'SequelizeUniqueConstraintError',
        ];
        if (err.constructor.name === 'ErrorApp') {
            msg = `${err.status}: ${err.message || JSON.stringify(err.messages)}`;
            status = err.status;
        }
        if (arraySequelize.includes(err.name)) {
            msg = `${err.name}: ${err.message}`;
            status = 400;
        }
        // eslint-disable-next-line
        console.log(chalk_1.default.red('[ERROR]'), `${chalk_1.default.red.bold(ctx.method)} ${ctx.url}`, msg.toString());
        throw err;
    }
    finally {
        const ms = new Date().getTime() - start.getTime();
        const fColor = chalk_1.default[getColor(status)];
        // eslint-disable-next-line
        console.log(`${fColor(dateFormat(new Date()))} - ${fColor.bold(`${status}`)} ${chalk_1.default.bold(ctx.method)} ${ctx.url} - ${fColor(ms + ' ms')}`);
    }
}
/**
 * @desc middleware handling logging each time a request is made
 */
exports.default = () => logger;
//# sourceMappingURL=logger.js.map