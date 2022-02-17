"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorYt_1 = __importDefault(require("./ErrorYt"));
class ErrorYtBody extends ErrorYt_1.default {
    constructor(status, message, toTranslate = false) {
        super(status, message, toTranslate);
        this.typeError = 'ErrorYtBody';
    }
}
exports.default = ErrorYtBody;
//# sourceMappingURL=ErrorYtBody.js.map