'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = exports.timeout = exports.lodash = undefined;

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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lodash = exports.lodash = _lodash2.default;

function random(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function ucFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}
function capitalize(str) {
  return ucFirst(str);
}

function dateYYYYMMDD(date) {
  if (!date) {
    return undefined;
  }
  return (0, _moment2.default)(date).format('YYYY-MM-DD');
}

function isArray(array) {
  return Array.isArray(array);
}

function trim(elem) {
  if (elem.trim) {
    return elem.trim();
  }
  return null;
}

var wait = exports.wait = timeout;

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

function notEmpty(elem) {
  return !isEmpty(elem);
}

function nullIfEmpty(elem) {
  //TODO test if object, string or array
  return isEmpty(elem) ? null : elem;
}

function jsonEncode(json) {
  return (0, _stringify2.default)(json).catch(function () {
    return null;
  });
}

function jsonDecode(string) {
  return JSON.parse(string).catch(function () {
    return null;
  });
}

function toNumber(elem) {
  return Number(elem);
}

function deepCopy(obj) {
  return _lodash2.default.cloneDeep(obj);
}

function objValToArray(obj) {
  return (0, _keys2.default)(obj).map(function (k) {
    return obj[k];
  });
}