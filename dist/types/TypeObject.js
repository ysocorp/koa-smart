'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeObject = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var TypeObject = exports.TypeObject = function (_TypeAny) {
  (0, _inherits3.default)(TypeObject, _TypeAny);

  function TypeObject() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, TypeObject);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TypeObject.__proto__ || (0, _getPrototypeOf2.default)(TypeObject)).call(this, (0, _extends3.default)({}, params, { type: 'object' })));

    _this._schema = {};
    _this._errors = {};

    _this._getErrorInvalidValue = function (_ref, key, keyError, msg) {
      var _i18n = _ref._i18n;

      if (key === 'add') return _this._errorWithKey ? keyError + ': ' + msg : msg;
      return _i18n.__('Is not an object');
    };

    _this._getDescription = function () {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'It should be ';

      return prefix + 'an object';
    };

    return _this;
  }

  (0, _createClass3.default)(TypeObject, [{
    key: '_initValues',
    value: function _initValues(value) {
      (0, _get3.default)(TypeObject.prototype.__proto__ || (0, _getPrototypeOf2.default)(TypeObject.prototype), '_initValues', this).call(this, value);
      this._errors = {};
    }
  }, {
    key: 'setErrorMsg',
    value: function setErrorMsg(msg, typeError) {
      (0, _get3.default)(TypeObject.prototype.__proto__ || (0, _getPrototypeOf2.default)(TypeObject.prototype), 'setErrorMsg', this).call(this, msg, typeError);
      this._errorWithKey = false;
      return this;
    }
  }, {
    key: 'errorWithKey',
    value: function errorWithKey() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._errorWithKey = value;
      return this;
    }
  }, {
    key: 'keys',
    value: function keys(object) {
      this._schema = (0, _extends3.default)({}, this._schema, object);
      return this;
    }
  }, {
    key: '_addError',
    value: function _addError(key, param) {
      if (param.errors) {
        var errors = param.errors;
        for (var keyError in errors) {
          this._errors[key + '.' + keyError] = errors[keyError];
        }
      } else {
        this._errors[key] = param.error;
      }

      var keys = (0, _keys2.default)(this._errors);
      if (keys.length) {
        (0, _get3.default)(TypeObject.prototype.__proto__ || (0, _getPrototypeOf2.default)(TypeObject.prototype), '_setError', this).call(this, this._TypeError.INVALID_VALUE, 'add', keys[0], this._errors[keys[0]].msg);
      }
      this._hasError = true;
      return this._hasError;
    }
  }, {
    key: '_test',
    value: function _test() {
      var oldValue = (0, _extends3.default)({}, this._value);
      this._value = {};

      for (var key in this._schema) {
        var param = this._schema[key];
        param.test(oldValue[key]);
        if (param.error) {
          this._addError(key, param);
        } else {
          this._value[key] = param.value;
        }
      }

      return true;
    }
  }, {
    key: 'errors',
    get: function get() {
      return (0, _keys2.default)(this._errors).length ? this._errors : null;
    }
  }]);
  return TypeObject;
}(_TypeAny2.TypeAny);