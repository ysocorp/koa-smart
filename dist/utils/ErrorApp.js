"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class ErrorApp {
    constructor(status, message, toTranslate = false) {
        this.name = 'error';
        this.status = null;
        this.message = '';
        this.messages = null;
        this.toTranslate = false;
        this.status = status;
        if ((0, utils_1.isArray)(message) || (0, utils_1.isObject)(message)) {
            this.messages = message;
        }
        else {
            this.message = message;
        }
        this.toTranslate = toTranslate;
    }
}
exports.default = ErrorApp;
//# sourceMappingURL=ErrorApp.js.map