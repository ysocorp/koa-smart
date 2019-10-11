"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = {
    body: {},
};
function copyBody() {
    return JSON.parse(JSON.stringify(options.body));
}
async function addDefaultBody(ctx, next) {
    ctx.body = ctx.body || copyBody();
    await next();
}
/**
 * @desc middleware setting a default starting body
 * @param {Object} body The default body to persist through the app
 * @return {KoaMiddleware}
 */
exports.default = (body = {}) => {
    options.body = body;
    return addDefaultBody;
};
//# sourceMappingURL=addDefaultBody.js.map