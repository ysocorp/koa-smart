'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Param = undefined;

var _TypeAny = require('./types/TypeAny');

var _TypeNumber = require('./types/TypeNumber');

var _TypeObject = require('./types/TypeObject');

var _TypeOneOf = require('./types/TypeOneOf');

var _TypeString = require('./types/TypeString');

var Param = exports.Param = {
  any: function any() {
    return new _TypeAny.TypeAny();
  },
  number: function number() {
    return new _TypeNumber.TypeNumber();
  },
  object: function object() {
    return new _TypeObject.TypeObject();
  },
  oneOf: function oneOf() {
    return new _TypeOneOf.TypeOneOf();
  },
  string: function string() {
    return new _TypeString.TypeString();
  }
};