'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeBinary = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TypeAny2 = require('./TypeAny');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeBinary = function (_TypeAny) {
  (0, _inherits3.default)(TypeBinary, _TypeAny);

  // the buffer's maximum allowed length

  // the buffer's exact allowed length
  function TypeBinary() {
    (0, _classCallCheck3.default)(this, TypeBinary);
    return (0, _possibleConstructorReturn3.default)(this, (TypeBinary.__proto__ || (0, _getPrototypeOf2.default)(TypeBinary)).call(this, 'binary'));
  } // the buffer's minimum allowed length
  // the desired encoding of buffer


  (0, _createClass3.default)(TypeBinary, [{
    key: '_generateError',
    value: function _generateError() {
      this.error = 'Invalid field ' + this.key;
      return false;
    }
  }, {
    key: 'encoding',
    value: function encoding(encodingName) {
      this._encoding = encodingName;
      return this;
    }
  }, {
    key: 'max',
    value: function max(_max) {
      this._max = _max;
      return this;
    }
  }, {
    key: 'min',
    value: function min(_min) {
      this._min = _min;
      return this;
    }
  }, {
    key: 'length',
    value: function length(_length) {
      this._length = _length;
      return this;
    }
  }, {
    key: '_testType',
    value: function _testType() {
      if (this._encoding && !Buffer.isEncoding(this._encoding)) {
        return this._generateError();
      }
      return true;
    }
  }, {
    key: '_test',
    value: function _test() {
      if (this._min && this._value.length < this._min) {
        return this._generateError();
      }
      if (this._max && this._value.length > this._max) {
        return this._generateError();
      }
      if (this._length && this._value.length !== this._length) {
        return this._generateError();
      }
      return true;
    }
  }, {
    key: '_transform',
    value: function _transform() {
      try {
        this._value = Buffer.from(this._value, this._encoding);
      } catch (e) {
        this._generateError();
      }
    }
  }]);
  return TypeBinary;
}(_TypeAny2.TypeAny);

exports.TypeBinary = TypeBinary;