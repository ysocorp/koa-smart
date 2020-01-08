declare function notFound(ctx: any): Promise<void>;
declare const _default: () => typeof notFound;
/**
 * @desc middleware preventingly setting the response's status to 404, in case no path is picked up
 */
export default _default;
