"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorApp_1 = __importDefault(require("./ErrorApp"));
class ErrorAccess extends ErrorApp_1.default {
    constructor(status, message, toTranslate = false) {
        super(status, message, toTranslate);
        this.typeError = 'ErrorAccess';
    }
}
exports.default = ErrorAccess;
//# sourceMappingURL=ErrorAccess.js.map