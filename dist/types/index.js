'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Types = undefined;

var _TypeAny = require('./TypeAny');

var _TypeBinary = require('./TypeBinary');

var _TypeBoolean = require('./TypeBoolean');

var _TypeNumber = require('./TypeNumber');

var _TypeObject = require('./TypeObject');

var _TypeOneOf = require('./TypeOneOf');

var _TypeString = require('./TypeString');

var Types = exports.Types = {
  any: function any() {
    return new _TypeAny.TypeAny();
  },
  binary: function binary() {
    return new _TypeBinary.TypeBinary();
  },
  boolean: function boolean() {
    return new _TypeBoolean.TypeBoolean();
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