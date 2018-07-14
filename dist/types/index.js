'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Types = exports.TypeString = exports.TypeOneOf = exports.TypeObject = exports.TypeNumber = exports.TypeBoolean = exports.TypeBinary = exports.TypeAny = undefined;

var _TypeAny = require('./TypeAny');

var _TypeBinary = require('./TypeBinary');

var _TypeBoolean = require('./TypeBoolean');

var _TypeNumber = require('./TypeNumber');

var _TypeObject = require('./TypeObject');

var _TypeOneOf = require('./TypeOneOf');

var _TypeString = require('./TypeString');

var TypeAny = exports.TypeAny = _TypeAny.TypeAny;
var TypeBinary = exports.TypeBinary = _TypeBinary.TypeBinary;
var TypeBoolean = exports.TypeBoolean = _TypeBoolean.TypeBoolean;
var TypeNumber = exports.TypeNumber = _TypeNumber.TypeNumber;
var TypeObject = exports.TypeObject = _TypeObject.TypeObject;
var TypeOneOf = exports.TypeOneOf = _TypeOneOf.TypeOneOf;
var TypeString = exports.TypeString = _TypeString.TypeString;

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