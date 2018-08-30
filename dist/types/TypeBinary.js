'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeBinary = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TypeAny2 = require('./TypeAny');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeBinary = function (_TypeAny) {
  (0, _inherits3.default)(TypeBinary, _TypeAny);

  // the buffer's maximum allowed length

  // the buffer's exact allowed length
  function TypeBinary() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, TypeBinary);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TypeBinary.__proto__ || (0, _getPrototypeOf2.default)(TypeBinary)).call(this, (0, _extends3.default)({}, params, { type: 'binary' })));

    _this._getError = function (_ref, key) {
      var _i18n = _ref._i18n;

      key = _this._errorKey || key;
      _this._errorKey = key;

      if (key === 'length') return _i18n.__('Expected %d bytes', _this._length);else if (key === 'min') return _i18n.__('Smaller than %d bytes', _this._min);else if (key === 'max') return _i18n.__('Bigger than %d bytes', _this._max);
      return null;
    };

    _this._getDescription = function () {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'It should be ';

      var msgError = prefix + 'a binary';
      var paramsDesc = [];
      if (_this._encoding) {
        paramsDesc.push('a ' + _this._encoding + ' encoding');
      }
      if (_this._length) {
        paramsDesc.push('an exact size of ' + _this._length + ' bytes');
      }
      if (_this._min) {
        paramsDesc.push('a minimum size of ' + _this._min + ' bytes');
      }
      if (_this._max) {
        paramsDesc.push('a maximum size of ' + _this._max + ' bytes');
      }
      var paramMsg = _this._generateParamDescription(paramsDesc, ' with');
      return '' + msgError + paramMsg + '.';
    };

    _this._errorMessages[_this._TypeError.INVALID_VALUE] = _this._getError;
    return _this;
  } // the buffer's minimum allowed length
  // the desired encoding of buffer


  (0, _createClass3.default)(TypeBinary, [{
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
        (0, _get3.default)(TypeBinary.prototype.__proto__ || (0, _getPrototypeOf2.default)(TypeBinary.prototype), '_setError', this).call(this, this._TypeError.INVALID_TYPE, 'encoding');
      }
    }
  }, {
    key: '_test',
    value: function _test() {
      var t = this._TypeError.INVALID_VALUE;
      if (this._min != null && this._value < this._min) return this._setError(t, 'min');
      if (this._min && this._value.length < this._min) return this._setError(t, 'min');
      if (this._max && this._value.length > this._max) return this._setError(t, 'max');
      if (this._length && this._value.length !== this._length) return this._setError(t, 'length');
    }
  }, {
    key: '_transform',
    value: function _transform() {
      try {
        this._value = Buffer.from(this._value, this._encoding);
      } catch (e) {
        return this._setError(this._TypeError.INVALID_TYPE);
      }
    }
  }]);
  return TypeBinary;
}(_TypeAny2.TypeAny);

exports.TypeBinary = TypeBinary;