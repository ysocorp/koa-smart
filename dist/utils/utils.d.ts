/**
 * @desc generates a random number configurable range and floating precision
 */
export declare function random(from: number, to: number, fixed: number): string;
/**
 * @desc turns the first letter of every words into capital letters
 */
export declare function capitalize(str: any): any;
/**
 * @desc converts a javascript date to the YYYY-MM-DD format
 */
export declare function dateYYYYMMDD(date: Date): string;
/**
 * @desc checks if the given param is an array
 */
export declare function isArray(array: any): boolean;
/**
 * @desc trim the given element if possible
 */
export declare function trim(elem: string | any): string | null;
/**
 * @desc waits for a number of milliseconds
 */
export declare function timeout(ms: number): Promise<unknown>;
export declare const wait: typeof timeout;
/**
 * @desc checks whether the given element is an objects
 */
export declare function isObject(obj: any, excludeArray?: boolean): boolean;
/**
 * @desc returns the string in lower case
 */
export declare function toLowerCase(str: string): string;
/**
 * @desc checks whether the given element is empty
 */
export declare function isEmpty(data: any): boolean | null;
/**
 * @desc checks whether the given element is NOT empty
 */
export declare function notEmpty(elem: any): boolean;
/**
 * @desc checks whether the given element is empty, and return null if it is.
 * @todo test if object, string or array
 */
export declare function nullIfEmpty(elem: any): any | null;
/**
 * @desc transforms a JSON element intro a string
 */
export declare function jsonEncode(json: Object): string | null;
/**
 * @desc transforms JSON string into a JSON element
 */
export declare function jsonDecode(string: string): Object | null;
/**
 * @desc converts the given element to a number
 */
export declare function toNumber(elem: any): number;
/**
 * @desc copy an object recursively
 */
export declare function deepCopy(obj: Object): Object;
/**
 * @desc transforms an Object into an array of key-value pairs
 * @todo check if this is right => currently returns array of values and use interface KeyValue
 */
export declare function objValToArray(obj: Object): Array<any>;
/**
 * @desc join array by adding double cote on string
 */
export declare function joinWithCote(elems: Array<any>, delimiter?: string): string;
/**
 * @desc Casts `value` as an array if it's not one.
 * @todo Check if this can be upgraded to makle array from all args
 *
 * @example
 *
 * castArray(1)
 * // => [1]
 *
 * castArray({ 'a': 1 })
 * // => [{ 'a': 1 }]
 *
 * castArray('abc')
 * // => ['abc']
 *
 * castArray(null)
 * // => [null]
 *
 * castArray(undefined)
 * // => [undefined]
 *
 * castArray()
 * // => []
 *
 * const array = [1, 2, 3]
 * console.log(castArray(array) === array)
 * // => true
 */
export declare function castArray(...args: Array<any>): Array<any>;
