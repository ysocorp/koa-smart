declare function addDefaultBody(ctx: any, next: any): Promise<void>;
declare const _default: (body?: {}) => typeof addDefaultBody;
/**
 * @desc middleware setting a default starting body
 * @param {Object} body The default body to persist through the app
 * @return {KoaMiddleware}
 */
export default _default;
