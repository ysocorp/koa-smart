'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeNumber = undefined;

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

var TypeNumber = exports.TypeNumber = function (_TypeAny) {
  (0, _inherits3.default)(TypeNumber, _TypeAny);

  // Specifies the type of precision : floor, ceil, trunc, round

  // Requires the number to be a TCP port, so between 0 and 65535.

  // Requires the number to be positive.
  // Requires the number to be an integer (no floating point).
  // Specifies the minimum value where:
  function TypeNumber() {
    (0, _classCallCheck3.default)(this, TypeNumber);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TypeNumber.__proto__ || (0, _getPrototypeOf2.default)(TypeNumber)).call(this, 'number'));

    _this._positive = false;
    _this._negative = false;

    _this._getDescription = function () {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'It should be ';

      var pN = ' ';
      pN = _this._positive ? ' positive ' : pN;
      pN = !_this._positive && _this._negative ? ' negative ' : pN;
      var msgError = prefix + 'a' + pN + 'number';

      var paramsDesc = [];
      if (_this._min != null && _this._max != null) {
        paramsDesc.push('is between ' + _this._min + ' and ' + _this._max);
      } else if (_this._min != null) {
        paramsDesc.push('is greater or equal to ' + _this._min);
      } else if (_this._max != null) {
        paramsDesc.push('is smaller or equal to ' + _this._max);
      }
      if (_this._multiple != null) {
        paramsDesc.push('is a multiple of ' + _this._multiple);
      }
      if (_this._port != null) {
        paramsDesc.push('is between 0 and 65535');
      }
      return '' + msgError + _this._generateParamDescription(paramsDesc, ' which') + '.';
    };

    _this._isTypeNum = function () {
      return typeof _this._value === 'number';
    };

    _this._isInteger = function () {
      return !!('' + _this._value).match(/^-{0,1}\d+$/);
    };

    _this._isFloat = function () {
      return !!('' + _this._value).match(/^-?\d+\.\d+$/);
    };

    _this._isNumber = function () {
      return _this._isInteger() || _this._isFloat();
    };

    _this._precisionTo = function (nb, nbDigit, type) {
      return Math[type](nb * Math.pow(10, nbDigit)) / Math.pow(10, nbDigit);
    };

    _this._errorMessages[_this._TypeError.INVALIDE_VALUE] = _this._getDescription;
    return _this;
  } // Specifies the maximum number of decimal places where:
  // Requires the number to be negative.
  // Specifies that the value must be a multiple of base:
  // Specifies the maximum value where:


  (0, _createClass3.default)(TypeNumber, [{
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
    key: 'between',
    value: function between(nbMin, nbMax) {
      this.min(nbMin);
      this.max(nbMax);
      return this;
    }
  }, {
    key: 'integer',
    value: function integer() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._integer = val;
      return this;
    }
  }, {
    key: 'multiple',
    value: function multiple(base) {
      this._multiple = base;
      return this;
    }
  }, {
    key: 'positive',
    value: function positive() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._positive = val;
      return this;
    }
  }, {
    key: 'negative',
    value: function negative() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._negative = val;
      return this;
    }
  }, {
    key: 'port',
    value: function port() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._port = val;
      return this;
    }
  }, {
    key: 'precision',
    value: function precision(limit) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'trunc';

      this._tPrecision = limit;
      this._tPrecisionType = type;
      return this;
    }

    // Function when test and transform param

  }, {
    key: '_testType',
    value: function _testType() {
      if (!this._isNumber()) {
        this._setError(this._TypeError.INVALIDE_TYPE);
      }
    }
  }, {
    key: '_test',
    value: function _test() {
      var t = this._TypeError.INVALIDE_VALUE;
      if (this._min != null && this._value < this._min) return this._setError(t);
      if (this._max != null && this._value > this._max) return this._setError(t);
      if (this._multiple != null && this._value % this._multiple !== 0) return this._setError(t);
      if (this._positive && this._value < 0) return this._setError(t);
      if (this._negative && this._value >= 0) return this._setError(t);
      if (this._port != null && (this._value < 0 || this._value > 65535)) return this._setError(t);
    }
  }, {
    key: '_transform',
    value: function _transform() {
      if (this._integer) {
        this._value = parseInt(this._value);
      } else {
        this._value = parseFloat(this._value);
      }

      if (this._tPrecision >= 0) this._value = this._precisionTo(this._value, this._tPrecision, this._tPrecisionType);
    }
  }]);
  return TypeNumber;
}(_TypeAny2.TypeAny);