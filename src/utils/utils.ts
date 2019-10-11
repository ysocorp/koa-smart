import moment from 'moment';
import cloneDeep from 'lodash.clonedeep';

/**
 * @desc generates a random number configurable range and floating precision
 */
export function random(from: number, to: number, fixed: number): string {
  return (Math.random() * (to - from) + from).toFixed(fixed);
}

function ucFirst(str: any): any {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

/**
 * @desc turns the first letter of every words into capital letters
 */
export function capitalize(str: any): any {
  return ucFirst(str);
}

/**
 * @desc converts a javascript date to the YYYY-MM-DD format
 */
export function dateYYYYMMDD(date: Date): string {
  if (!date) {
    return undefined;
  }
  return moment(date).format('YYYY-MM-DD');
}

/**
 * @desc checks if the given param is an array
 */
export function isArray(array: any): boolean {
  return Array.isArray(array);
}

/**
 * @desc trim the given element if possible
 */
export function trim(elem: string | any): string | null {
  if (elem.trim) {
    return elem.trim();
  }
  return null;
}

/**
 * @desc waits for a number of milliseconds
 */
export async function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const wait = timeout;

/**
 * @desc checks whether the given element is an objects
 */
export function isObject(obj: any, excludeArray = true): boolean {
  if (excludeArray) {
    return !isArray(obj) && isObject(obj, false);
  }
  return typeof obj === 'object';
}

/**
 * @desc returns the string in lower case
 */
export function toLowerCase(str: string): string {
  return str.toLowerCase();
}

/**
 * @desc checks whether the given element is empty
 */
export function isEmpty(data: any): boolean | null {
  if (data === null || data === undefined) {
    return true;
  }
  if (typeof data === 'string') {
    return data === '';
  } else if (Array.isArray(data)) {
    return data.length === 0;
  } else if (typeof data === 'object') {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  return null;
}

/**
 * @desc checks whether the given element is NOT empty
 */
export function notEmpty(elem: any): boolean {
  return !isEmpty(elem);
}

/**
 * @desc checks whether the given element is empty, and return null if it is.
 * @todo test if object, string or array
 */
export function nullIfEmpty(elem: any): any | null {
  return isEmpty(elem) ? null : elem;
}

/**
 * @desc transforms a JSON element intro a string
 */
export function jsonEncode(json: Object): string | null {
  try {
    return JSON.stringify(json);
  } catch (e) {
    return null;
  }
}

/**
 * @desc transforms JSON string into a JSON element
 */
export function jsonDecode(string: string): Object | null {
  return JSON.parse(string).catch(() => null);
}

/**
 * @desc converts the given element to a number
 */
export function toNumber(elem: any): number {
  return Number(elem);
}

/**
 * @desc copy an object recursively
 */
export function deepCopy(obj: Object): Object {
  return cloneDeep(obj);
}

interface KeyValue {
  0: string;
  1: any;
}

/**
 * @desc transforms an Object into an array of key-value pairs
 * @todo check if this is right => currently returns array of values and use interface KeyValue
 */
export function objValToArray(obj: Object): Array<any> {
  return Object.keys(obj).map(k => obj[k]);
}

/**
 * @desc join array by adding double cote on string
 */
export function joinWithCote(elems: Array<any>, delimiter = ', '): string {
  let str = '';
  for (let i = 0; i < elems.length; i++) {
    const elem = elems[i];
    if (i > 0) {
      str += delimiter;
    }
    if (typeof elem === 'string') {
      str += `"${elem}"`;
    } else {
      str += `${elem}`;
    }
  }
  return str;
}

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
export function castArray(...args: Array<any>): Array<any> {
  if (!args.length) {
    return [];
  }
  const value = args[0];
  return Array.isArray(value) ? value : [value];
}
