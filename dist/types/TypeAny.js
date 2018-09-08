'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeAny = exports.TypeError = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _i18n2 = require('i18n-2');

var _i18n3 = _interopRequireDefault(_i18n2);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeError = exports.TypeError = {
  ALL: 'ALL',
  REQUIRED: 'REQUIRED',
  IS_NULL: 'IS_NULL',
  INVALID_TYPE: 'INVALID_TYPE',
  INVALID_VALUE: 'INVALID_VALUE'
};

var TypeAny = exports.TypeAny = function () {
  // options
  function TypeAny(_ref) {
    var _errorCodes,
        _this = this,
        _errorMessages;

    var type = _ref.type,
        i18n = _ref.i18n;
    (0, _classCallCheck3.default)(this, TypeAny);
    this._TypeError = (0, _extends3.default)({}, TypeError);
    this._type = null;
    this._error = null;
    this._hasError = false;
    this._isValueNull = false;
    this._codeError = null;
    this._errorCodes = (_errorCodes = {}, (0, _defineProperty3.default)(_errorCodes, this._TypeError.ALL, 1), (0, _defineProperty3.default)(_errorCodes, this._TypeError.REQUIRED, 2), (0, _defineProperty3.default)(_errorCodes, this._TypeError.IS_NULL, 3), (0, _defineProperty3.default)(_errorCodes, this._TypeError.INVALID_TYPE, 4), (0, _defineProperty3.default)(_errorCodes, this._TypeError.INVALID_VALUE, 5), _errorCodes);
    this._errorMessages = (_errorMessages = {}, (0, _defineProperty3.default)(_errorMessages, this._TypeError.ALL, null), (0, _defineProperty3.default)(_errorMessages, this._TypeError.REQUIRED, function () {
      return _this._i18n.__('Is required');
    }), (0, _defineProperty3.default)(_errorMessages, this._TypeError.IS_NULL, function () {
      return _this._i18n.__('Cannot be null');
    }), (0, _defineProperty3.default)(_errorMessages, this._TypeError.INVALID_TYPE, function () {
      return _this._i18n.__('Expected type %s', _this._type);
    }), (0, _defineProperty3.default)(_errorMessages, this._TypeError.INVALID_VALUE, function () {
      return _this._getErrorInvalidValue.apply(_this, arguments);
    }), _errorMessages);
    this._isRequired = false;
    this._notNull = false;
    this._default = undefined;
    this._value = null;

    this._getErrorInvalidValue = function (_ref2) {
      var _i18n = _ref2._i18n;

      return _i18n.__('Invalid field');
    };

    this._getDescription = function () {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'It should be';

      return prefix + ' any type.';
    };

    this._type = type;
    this._i18nConfig = (0, _extends3.default)({
      directory: (0, _path.join)(__dirname, 'i18n'),
      locales: ['en', 'fr'],
      extension: '.json'
    }, i18n);
    this._i18n = new _i18n3.default(this._i18nConfig);
  }

  (0, _createClass3.default)(TypeAny, [{
    key: 'clone',
    value: function clone() {
      var clone = (0, _assign2.default)((0, _create2.default)((0, _getPrototypeOf2.default)(this)), this);
      clone._i18n = new _i18n3.default(this._i18nConfig);
      return clone;
    }
  }, {
    key: 'setErrorMsg',
    value: function setErrorMsg(msg, typeError) {
      var _this2 = this;

      var type = TypeError[typeError] ? typeError : TypeError.ALL;
      if (typeof msg === 'function') {
        this._errorMessages[type] = msg;
      } else {
        this._errorMessages[type] = function () {
          return _this2._i18n.__(msg);
        };
      }
      return this;
    }
  }, {
    key: 'setLocale',
    value: function setLocale(locale) {
      this._i18n.setLocale(locale);
      return this;
    }
  }, {
    key: '_generateParamDescription',
    value: function _generateParamDescription(params) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (!params.length) {
        return '';
      }
      if (params.length === 1) {
        return prefix + ' ' + params[0];
      }
      var firstPartRes = params.slice(0, -1).join(', ');
      return prefix + ' ' + firstPartRes + ' and ' + params[params.length - 1];
    }
  }, {
    key: '_setError',
    value: function _setError(typeCode) {
      // skip error if has a default value
      if (this._default == null) {
        var fnMessage = this._errorMessages[this._TypeError.ALL] || this._errorMessages[typeCode];

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        this._error = fnMessage.apply(undefined, [this].concat(rest)) || this._i18n.__('Invalid field');
        this._codeError = this._errorCodes[typeCode];
      }
      this._hasError = true;
      return this._hasError;
    }
  }, {
    key: 'default',
    value: function _default(val) {
      this._default = val;
      return this;
    }
  }, {
    key: 'required',
    value: function required() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._isRequired = val;
      this.allowNull(!val);
      return this;
    }
  }, {
    key: 'allowNull',
    value: function allowNull() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._notNull = !val;
      return this;
    }

    // Function when test and transform param

  }, {
    key: 'test',
    value: function test(value) {
      this._initValues(value);
      if (this._testExist() || this._hasError) return;
      if (this._testNull() || this._hasError || this._isValueNull) return;
      if (this._testType() || this._hasError) return;
      this._transform();
      this._test();
    }
  }, {
    key: '_initValues',
    value: function _initValues(value) {
      this._value = value;
      this._error = null;
      this._hasError = false;
      this._isValueNull = false;
    }
  }, {
    key: '_testExist',
    value: function _testExist() {
      var exist = typeof this._value !== 'undefined';
      if (!exist && this._isRequired) {
        this._setError(this._TypeError.REQUIRED);
      }
    }
  }, {
    key: '_testNull',
    value: function _testNull() {
      if (this._value == null && this._notNull) {
        this._setError(TypeError.IS_NULL);
      }
      this._isValueNull = this._value == null;
    }
  }, {
    key: '_testType',
    value: function _testType() {
      if (this._type != null && (0, _typeof3.default)(this._value) !== this._type) {
        this._setError(TypeError.INVALID_TYPE);
        return false;
      }
    }
  }, {
    key: '_test',
    value: function _test() {
      return true;
    }
  }, {
    key: '_transform',
    value: function _transform() {}
  }, {
    key: 'value',
    get: function get() {
      if (this._default != null && (this._value == null || this._hasError)) {
        return this._default;
      }
      return this._value;
    },
    set: function set(val) {
      this._value = val;
    }
  }, {
    key: 'error',
    set: function set(string) {
      // skip error if has a default value
      if (this._default == null) {
        this._error = string;
      }
      this._hasError = true;
    },
    get: function get() {
      if (!this._error) {
        return null;
      }
      return {
        msg: this._error,
        code: this.codeError
      };
    }
  }, {
    key: 'codeError',
    get: function get() {
      return this._codeError;
    }
  }, {
    key: 'codeMsg',
    get: function get() {
      return this._error;
    }
  }]);
  return TypeAny;
}();