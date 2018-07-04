'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeString = undefined;

var _maxSafeInteger = require('babel-runtime/core-js/number/max-safe-integer');

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

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

var TypeString = exports.TypeString = function (_TypeAny) {
  (0, _inherits3.default)(TypeString, _TypeAny);

  function TypeString() {
    (0, _classCallCheck3.default)(this, TypeString);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TypeString.__proto__ || (0, _getPrototypeOf2.default)(TypeString)).call(this, 'string'));

    _this._tTrim = true;
    _this._tTruncate = false;
    _this._tUppercase = false;
    _this._tLowercase = false;
    return _this;
  }

  (0, _createClass3.default)(TypeString, [{
    key: 'trim',
    value: function trim() {
      var needTrim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._tTrim = needTrim;
      return this;
    }
  }, {
    key: 'min',
    value: function min() {
      var nb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this._min = nb;
      return this;
    }
  }, {
    key: 'max',
    value: function max() {
      var nb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _maxSafeInteger2.default;

      this._max = nb;
      return this;
    }
  }, {
    key: 'length',
    value: function length(nb) {
      this._length = nb;
      return this;
    }
  }, {
    key: 'between',
    value: function between(nbMin, nbMax) {
      this.min(nbMin);
      this.max(nbMax);
      return this;
    }
  }, {
    key: 'uppercase',
    value: function uppercase() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._tUppercase = val;
      return this;
    }
  }, {
    key: 'lowercase',
    value: function lowercase() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._tLowercase = val;
      return this;
    }
  }, {
    key: 'truncate',
    value: function truncate() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._tTruncate = val;
      return this;
    }

    // Function when test and transform param

  }, {
    key: '_generateError',
    value: function _generateError() {
      this.error = 'Invalid field ' + this.key;
    }
  }, {
    key: '_test',
    value: function _test() {
      if (this._length && this._value.length !== this._length) this._generateError();
      if (this._min && this._value.length < this._min) this._generateError();
      if (this._max && this._value.length > this._max) this._generateError();

      return this._hasError;
    }
  }, {
    key: '_transform',
    value: function _transform() {
      if (this.error) return;

      if (this._tTrim) this._value = this._value.trim();
      if (this._tTruncate && this._max) this._value = this._value.substring(0, this._max);
      if (this._tTruncate && this._length) this._value = this._value.substring(0, this._length);
      if (this._tUppercase) this._value = this._value.toUpperCase();
      if (this._tLowercase) this._value = this._value.toLowerCase();
    }
  }]);
  return TypeString;
}(_TypeAny2.TypeAny);