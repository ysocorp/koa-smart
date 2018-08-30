'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeString = undefined;

var _maxSafeInteger = require('babel-runtime/core-js/number/max-safe-integer');

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TypeAny2 = require('./TypeAny');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeString = function (_TypeAny) {
  (0, _inherits3.default)(TypeString, _TypeAny);

  function TypeString() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, TypeString);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TypeString.__proto__ || (0, _getPrototypeOf2.default)(TypeString)).call(this, (0, _extends3.default)({}, params, { type: 'string' })));

    _this._tTrim = true;
    _this._tTruncate = false;
    _this._tUppercase = false;
    _this._tLowercase = false;

    _this._getError = function (_ref, key) {
      var _i18n = _ref._i18n;

      key = _this._errorKey || key;
      _this._errorKey = key;

      if (key === 'length') return _i18n.__('Expected %s characters', _this._length);else if (key === 'min') return _i18n.__('Shorter than %d characters', _this._min);else if (key === 'max') return _i18n.__('Longer than %d characters', _this._max);else if (key === 'regex') return _i18n.__('Doesn\'t match with %s', _this._regex.toString());
      return null;
    };

    _this._getDescription = function () {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'It should be ';

      var msgError = prefix + 'a string';

      var paramsDesc = [];
      if (_this._length != null) {
        paramsDesc.push('exactly ' + _this._length + ' characters');
      }
      if (_this._min != null && _this._max != null) {
        paramsDesc.push('between ' + _this._min + ' and ' + _this._max + ' characters');
      } else if (_this._min != null) {
        paramsDesc.push('at least ' + _this._min + ' characters');
      } else if (_this._max != null) {
        paramsDesc.push('a maximum of ' + _this._max + ' characters');
      }
      if (_this._regex != null) {
        paramsDesc.push('that matches with ' + _this._regex.toString());
      }

      return '' + msgError + _this._generateParamDescription(paramsDesc, ' with') + '.';
    };

    _this._errorMessages[_this._TypeError.INVALID_VALUE] = _this._getError;
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
    key: 'regex',
    value: function regex(_regex) {
      this._regex = _regex;
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
  }, {
    key: 'replace',
    value: function replace(pattern) {
      var replaceWith = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      this._tReplace = { pattern: pattern, replaceWith: replaceWith };
      return this;
    }
  }, {
    key: '_test',
    value: function _test() {
      var t = this._TypeError.INVALID_VALUE;
      if (this._length && this._value.length !== this._length) return this._setError(t, 'length');
      if (this._min && this._value.length < this._min) return this._setError(t, 'min');
      if (this._max && this._value.length > this._max) return this._setError(t, 'max');
      if (this._regex && !this._value.match(this._regex)) return this._setError(t, 'regex');
    }
  }, {
    key: '_transform',
    value: function _transform() {
      if (this._tTrim) this._value = this._value.trim();
      if (this._tTruncate && this._max) this._value = this._value.substring(0, this._max);
      if (this._tTruncate && this._length) this._value = this._value.substring(0, this._length);
      if (this._tUppercase) this._value = this._value.toUpperCase();
      if (this._tLowercase) this._value = this._value.toLowerCase();
      if (this._tReplace) this._value = this._value.replace(this._tReplace.pattern, this._tReplace.replaceWith);
    }
  }]);
  return TypeString;
}(_TypeAny2.TypeAny);

exports.TypeString = TypeString;