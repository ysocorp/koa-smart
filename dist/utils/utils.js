"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
/**
 * @desc generates a random number configurable range and floating precision
 */
function random(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed);
}
exports.random = random;
function ucFirst(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}
/**
 * @desc turns the first letter of every words into capital letters
 */
function capitalize(str) {
    return ucFirst(str);
}
exports.capitalize = capitalize;
/**
 * @desc converts a javascript date to the YYYY-MM-DD format
 */
function dateYYYYMMDD(date) {
    if (!date) {
        return undefined;
    }
    return moment_1.default(date).format('YYYY-MM-DD');
}
exports.dateYYYYMMDD = dateYYYYMMDD;
/**
 * @desc checks if the given param is an array
 */
function isArray(array) {
    return Array.isArray(array);
}
exports.isArray = isArray;
/**
 * @desc trim the given element if possible
 */
function trim(elem) {
    if (elem.trim) {
        return elem.trim();
    }
    return null;
}
exports.trim = trim;
/**
 * @desc waits for a number of milliseconds
 */
async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.timeout = timeout;
exports.wait = timeout;
/**
 * @desc checks whether the given element is an objects
 */
function isObject(obj, excludeArray = true) {
    if (excludeArray) {
        return !isArray(obj) && isObject(obj, false);
    }
    return typeof obj === 'object';
}
exports.isObject = isObject;
/**
 * @desc returns the string in lower case
 */
function toLowerCase(str) {
    return str.toLowerCase();
}
exports.toLowerCase = toLowerCase;
/**
 * @desc checks whether the given element is empty
 */
function isEmpty(data) {
    if (data === null || data === undefined) {
        return true;
    }
    if (typeof data === 'string') {
        return data === '';
    }
    else if (Array.isArray(data)) {
        return data.length === 0;
    }
    else if (typeof data === 'object') {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    return null;
}
exports.isEmpty = isEmpty;
/**
 * @desc checks whether the given element is NOT empty
 */
function notEmpty(elem) {
    return !isEmpty(elem);
}
exports.notEmpty = notEmpty;
/**
 * @desc checks whether the given element is empty, and return null if it is.
 * @todo test if object, string or array
 */
function nullIfEmpty(elem) {
    return isEmpty(elem) ? null : elem;
}
exports.nullIfEmpty = nullIfEmpty;
/**
 * @desc transforms a JSON element intro a string
 */
function jsonEncode(json) {
    try {
        return JSON.stringify(json);
    }
    catch (e) {
        return null;
    }
}
exports.jsonEncode = jsonEncode;
/**
 * @desc transforms JSON string into a JSON element
 */
function jsonDecode(string) {
    return JSON.parse(string).catch(() => null);
}
exports.jsonDecode = jsonDecode;
/**
 * @desc converts the given element to a number
 */
function toNumber(elem) {
    return Number(elem);
}
exports.toNumber = toNumber;
/**
 * @desc copy an object recursively
 */
function deepCopy(obj) {
    return lodash_clonedeep_1.default(obj);
}
exports.deepCopy = deepCopy;
/**
 * @desc transforms an Object into an array of key-value pairs
 * @todo check if this is right => currently returns array of values and use interface KeyValue
 */
function objValToArray(obj) {
    return Object.keys(obj).map(k => obj[k]);
}
exports.objValToArray = objValToArray;
/**
 * @desc join array by adding double cote on string
 */
function joinWithCote(elems, delimiter = ', ') {
    let str = '';
    for (let i = 0; i < elems.length; i++) {
        const elem = elems[i];
        if (i > 0) {
            str += delimiter;
        }
        if (typeof elem === 'string') {
            str += `"${elem}"`;
        }
        else {
            str += `${elem}`;
        }
    }
    return str;
}
exports.joinWithCote = joinWithCote;
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
function castArray(...args) {
    if (!args.length) {
        return [];
    }
    const value = args[0];
    return Array.isArray(value) ? value : [value];
}
exports.castArray = castArray;
//# sourceMappingURL=utils.js.map