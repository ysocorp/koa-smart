"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18n = exports.cors = exports.bodyParser = exports.helmet = exports.compress = void 0;
const koa_compress_1 = __importDefault(require("koa-compress"));
const koa_helmet_1 = __importDefault(require("koa-helmet"));
const koa_body_1 = __importDefault(require("koa-body"));
const kcors_1 = __importDefault(require("kcors"));
const koa_i18n_1 = __importDefault(require("koa-i18n"));
var koa2_ratelimit_1 = require("koa2-ratelimit");
Object.defineProperty(exports, "RateLimit", { enumerable: true, get: function () { return koa2_ratelimit_1.RateLimit; } });
Object.defineProperty(exports, "RateLimitStores", { enumerable: true, get: function () { return koa2_ratelimit_1.Stores; } });
var addDefaultBody_1 = require("./addDefaultBody");
Object.defineProperty(exports, "addDefaultBody", { enumerable: true, get: function () { return addDefaultBody_1.default; } });
var handleError_1 = require("./handleError");
Object.defineProperty(exports, "handleError", { enumerable: true, get: function () { return handleError_1.default; } });
var logger_1 = require("./logger");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return logger_1.default; } });
exports.compress = koa_compress_1.default;
exports.helmet = koa_helmet_1.default;
exports.bodyParser = koa_body_1.default;
exports.cors = kcors_1.default;
exports.i18n = koa_i18n_1.default;
//# sourceMappingURL=index.js.map