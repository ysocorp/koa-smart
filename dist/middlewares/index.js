"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_compress_1 = __importDefault(require("koa-compress"));
const koa_helmet_1 = __importDefault(require("koa-helmet"));
const koa_body_1 = __importDefault(require("koa-body"));
const kcors_1 = __importDefault(require("kcors"));
const koa2_ratelimit_1 = require("koa2-ratelimit");
const koa_i18n_1 = __importDefault(require("koa-i18n"));
const addDefaultBody_1 = __importDefault(require("./addDefaultBody"));
const handleError_1 = __importDefault(require("./handleError"));
const logger_1 = __importDefault(require("./logger"));
module.exports = {
    cors: kcors_1.default,
    helmet: koa_helmet_1.default,
    bodyParser: koa_body_1.default,
    compress: koa_compress_1.default,
    i18n: koa_i18n_1.default,
    addDefaultBody: addDefaultBody_1.default,
    handleError: handleError_1.default,
    logger: logger_1.default,
    RateLimit: koa2_ratelimit_1.RateLimit,
    RateLimitStores: koa2_ratelimit_1.Stores,
};
//# sourceMappingURL=index.js.map