declare function logger(ctx: any, next: any): Promise<void>;
declare const _default: () => typeof logger;
/**
 * @desc middleware handling logging each time a request is made
 */
export default _default;
