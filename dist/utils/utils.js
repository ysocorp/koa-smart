'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = exports.timeout = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var timeout = exports.timeout = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ms) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _promise2.default(function (resolve) {
              return setTimeout(resolve, ms);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function timeout(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.random = random;
exports.ucFirst = ucFirst;
exports.capitalize = capitalize;
exports.dateYYYYMMDD = dateYYYYMMDD;
exports.isArray = isArray;
exports.trim = trim;
exports.isObject = isObject;
exports.toLowerCase = toLowerCase;
exports.isEmpty = isEmpty;
exports.notEmpty = notEmpty;
exports.nullIfEmpty = nullIfEmpty;
exports.jsonEncode = jsonEncode;
exports.jsonDecode = jsonDecode;
exports.toNumber = toNumber;
exports.deepCopy = deepCopy;
exports.objValToArray = objValToArray;
exports.joinWithCote = joinWithCote;
exports.castArray = castArray;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc generates a random number configurable range and floating precision
 */
function random(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

/**
 * @access private
 */
function ucFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

/**
 * @desc turns the first letter of every words into capital letters
 */
function capitalize(str) {
  return ucFirst(str);
}

/**
 * @desc converts a javascript date to the YYYY-MM-DD format
 * @param {Date} date the date to convert
 * @return {string} the formated date
 */
function dateYYYYMMDD(date) {
  if (!date) {
    return undefined;
  }
  return (0, _moment2.default)(date).format('YYYY-MM-DD');
}

/**
 * @desc checks if the given param is an array
 * @param {*} array the element to check
 * @return {boolean}
 */
function isArray(array) {
  return Array.isArray(array);
}

/**
 * @desc trim the given element if possible
 * @param {string | any} elem the element to trim
 * @return {string | null} the trimmed element
 */
function trim(elem) {
  if (elem.trim) {
    return elem.trim();
  }
  return null;
}

var wait = exports.wait = timeout;

/**
 * @desc checks whether the given element is an objects
 * @param {*} obj the element to check
 * @param {boolean} [force = true] if set to true, will first check that obj is not an array.
 * @return {boolean}
 */
function isObject(obj) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (force) {
    return !isArray(obj) && isObject(obj, false);
  }
  return (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object';
}

function toLowerCase(str) {
  return str.toLowerCase();
}

/**
 * @desc checks whether the given element is empty
 * @param {*} data the element to check
 * @return {boolean}
 */
function isEmpty(data) {
  if (data === null || data === undefined) {
    return true;
  }
  if (typeof data === 'string') {
    return data === '';
  } else if (Array.isArray(data)) {
    return data.length === 0;
  } else if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
    for (var key in data) {
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
function notEmpty(elem) {
  return !isEmpty(elem);
}

/**
 * @desc checks whether the given element is empty, and return null if it is.
 * @param {*} elem the element to check
 * @return {* | null}
 */
function nullIfEmpty(elem) {
  //TODO test if object, string or array
  return isEmpty(elem) ? null : elem;
}

/**
 * @desc transforms a JSON element intro a string
 * @param {Object} json the element to encode
 * @return {string}
 */
function jsonEncode(json) {
  return (0, _stringify2.default)(json).catch(function () {
    return null;
  });
}

/**
 * @desc transforms JSON string into a JSON element
 * @param {string} string the element to decode
 * @return {Object}
 */
function jsonDecode(string) {
  return JSON.parse(string).catch(function () {
    return null;
  });
}

/**
 * @desc converts the given element to a number
 * @param {*} elem the element to convert
 * @return {number}
 */
function toNumber(elem) {
  return Number(elem);
}

/**
 * @desc copy an object recursively
 * @param {Object} obj the object to clone
 * @return {Object} a deep copy of the supplied object
 */
function deepCopy(obj) {
  return (0, _lodash2.default)(obj);
}

/**
 * @desc transforms an Object into an array of key-value pairs
 * @param {Object} obj the object to transform
 * @return {[string, *][]}
 */
function objValToArray(obj) {
  return (0, _keys2.default)(obj).map(function (k) {
    return obj[k];
  });
}

/**
 * @desc join array by adding double cote on string
 * @param {Arrat} elems the array to join
 * @return {string}
 */
function joinWithCote(elems) {
  var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ', ';

  var str = '';
  for (var i = 0; i < elems.length; i++) {
    var elem = elems[i];
    if (i > 0) {
      str += delimiter;
    }
    if (typeof elem === 'string') {
      str += '"' + elem + '"';
    } else {
      str += '' + elem;
    }
  }
  return str;
}

/**
 * Casts `value` as an array if it's not one.
 *
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
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
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments.length <= 0 ? undefined : arguments[0];
  return Array.isArray(value) ? value : [value];
}