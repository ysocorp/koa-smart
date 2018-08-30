'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Types = exports.TypeString = exports.TypeOneOf = exports.TypeObject = exports.TypeNumber = exports.TypeEnum = exports.TypeDate = exports.TypeBoolean = exports.TypeBinary = exports.TypeArray = exports.TypeAny = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _TypeAny = require('./TypeAny');

var _TypeArray = require('./TypeArray');

var _TypeBinary = require('./TypeBinary');

var _TypeBoolean = require('./TypeBoolean');

var _TypeDate = require('./TypeDate');

var _TypeEnum = require('./TypeEnum');

var _TypeNumber = require('./TypeNumber');

var _TypeObject = require('./TypeObject');

var _TypeOneOf = require('./TypeOneOf');

var _TypeString = require('./TypeString');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeAny = exports.TypeAny = _TypeAny.TypeAny;
var TypeArray = exports.TypeArray = _TypeArray.TypeArray;
var TypeBinary = exports.TypeBinary = _TypeBinary.TypeBinary;
var TypeBoolean = exports.TypeBoolean = _TypeBoolean.TypeBoolean;
var TypeDate = exports.TypeDate = _TypeDate.TypeDate;
var TypeEnum = exports.TypeEnum = _TypeEnum.TypeEnum;
var TypeNumber = exports.TypeNumber = _TypeNumber.TypeNumber;
var TypeObject = exports.TypeObject = _TypeObject.TypeObject;
var TypeOneOf = exports.TypeOneOf = _TypeOneOf.TypeOneOf;
var TypeString = exports.TypeString = _TypeString.TypeString;

var opt = {
  i18n: {}
};

var Types = exports.Types = {
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$i18n = _ref.i18n,
        i18n = _ref$i18n === undefined ? {} : _ref$i18n;

    var newOpt = (0, _lodash.cloneDeep)(opt);
    opt = (0, _extends3.default)({}, newOpt, {
      i18n: (0, _extends3.default)({}, opt.i18n, i18n)
    });
  },
  any: function any() {
    return new _TypeAny.TypeAny(opt);
  },
  array: function array() {
    return new _TypeArray.TypeArray(opt);
  },
  binary: function binary() {
    return new _TypeBinary.TypeBinary(opt);
  },
  boolean: function boolean() {
    return new _TypeBoolean.TypeBoolean(opt);
  },
  date: function date() {
    return new _TypeDate.TypeDate(opt);
  },
  enum: function _enum() {
    return new _TypeEnum.TypeEnum(opt);
  },
  number: function number() {
    return new _TypeNumber.TypeNumber(opt);
  },
  object: function object() {
    return new _TypeObject.TypeObject(opt);
  },
  oneOf: function oneOf() {
    return new _TypeOneOf.TypeOneOf(opt);
  },
  string: function string() {
    return new _TypeString.TypeString(opt);
  }
};