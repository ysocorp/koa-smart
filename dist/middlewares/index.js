"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_compress_1 = __importDefault(require("koa-compress"));
const koa_helmet_1 = __importDefault(require("koa-helmet"));
const koa_body_1 = __importDefault(require("koa-body"));
const kcors_1 = __importDefault(require("kcors"));
const koa_i18n_1 = __importDefault(require("koa-i18n"));
var koa2_ratelimit_1 = require("koa2-ratelimit");
exports.RateLimit = koa2_ratelimit_1.RateLimit;
exports.RateLimitStores = koa2_ratelimit_1.Stores;
var addDefaultBody_1 = require("./addDefaultBody");
exports.addDefaultBody = addDefaultBody_1.default;
var handleError_1 = require("./handleError");
exports.handleError = handleError_1.default;
var logger_1 = require("./logger");
exports.logger = logger_1.default;
exports.compress = koa_compress_1.default;
exports.helmet = koa_helmet_1.default;
exports.bodyParser = koa_body_1.default;
exports.cors = kcors_1.default;
exports.i18n = koa_i18n_1.default;
//# sourceMappingURL=index.js.map