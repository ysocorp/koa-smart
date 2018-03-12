import moment from 'moment';
import Lodash from 'lodash';

export const lodash = Lodash;

/**
 * @desc generates a random number configurable range and floating precision
 */
export function random(from, to, fixed) {
  return ((Math.random() * (to - from)) + from).toFixed(fixed) * 1;
}

/**
 * @access private
 */
export function ucFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

/**
 * @desc turns the first letter of every words into capital letters
 */
export function capitalize(str) { return ucFirst(str); }

/**
 * @desc converts a javascript date to the YYYY-MM-DD format
 * @param {Date} date the date to convert
 * @return {string} the formated date
 */
export function dateYYYYMMDD(date) {
  if (!date) { return undefined; }
  return moment(date).format('YYYY-MM-DD');
}

/**
 * @desc checks if the given param is an array
 * @param {*} array the element to check
 * @return {boolean}
 */
export function isArray(array) {
  return Array.isArray(array);
}

/**
 * @desc trim the given element if possible
 * @param {string | any} elem the element to trim
 * @return {string | null} the trimmed element
 */
export function trim(elem) {
  if (elem.trim) {
    return elem.trim();
  }
  return null;
}

export async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const wait = timeout;

/**
 * @desc checks whether the given element is an objects
 * @param {*} obj the element to check
 * @param {boolean} [force = true] if set to true, will first check that obj is not an array.
 * @return {boolean}
 */
export function isObject(obj, force = true) {
  if (force) {
    return !isArray(obj) && isObject(obj, false);
  }
  return typeof obj === 'object';
}

export function toLowerCase(str) {
  return str.toLowerCase();
}

/**
 * @desc checks whether the given element is empty
 * @param {*} data the element to check
 * @return {boolean}
 */
export function isEmpty(data) {
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
 * @param {*} elem the element to check
 * @return {boolean}
 */
export function notEmpty(elem) {
  return !isEmpty(elem);
}

/**
 * @desc checks whether the given element is empty, and return null if it is.
 * @param {*} elem the element to check
 * @return {* | null}
 */
export function nullIfEmpty(elem) {
  //TODO test if object, string or array
  return isEmpty(elem) ? null : elem;
}

/**
 * @desc transforms a JSON element intro a string
 * @param {Object} json the element to encode
 * @return {string}
 */
export function jsonEncode(json) {
  return JSON.stringify(json).catch(() => null);
}

/**
 * @desc transforms JSON string into a JSON element
 * @param {string} string the element to decode
 * @return {Object}
 */
export function jsonDecode(string) {
  return JSON.parse(string).catch(() => null);
}

/**
 * @desc converts the given element to a number
 * @param {*} elem the element to convert
 * @return {number}
 */
export function toNumber(elem) {
  return Number(elem);
}

/**
 * @desc copy an object recursively
 * @param {Object} obj the object to clone
 * @return {Object} a deep copy of the supplied object
 */
export function deepCopy(obj) {
  return Lodash.cloneDeep(obj);
}

/**
 * @desc transforms an Object into an array of key-value pairs
 * @param {Object} obj the object to transform
 * @return {[string, *][]}
 */
export function objValToArray(obj) {
  return Object.keys(obj).map((k) => obj[k]);
}
