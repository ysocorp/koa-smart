declare function handleError(ctx: any, next: any): Promise<void>;
declare const _default: (opt?: {}) => typeof handleError;
/**
 * middleware in charge of handling errors thrown on purpose,
 * either through manually throwing {@link ErrorApp},
 * either through calling {@link Route.throw}.
 *
 * It will also make sure errors pertaining to models as well as unexpected error are given a clearer message.
 * @param {OptionErrors} [opt = {}] option object to set which events should be logged
 */
export default _default;
