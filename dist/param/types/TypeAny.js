'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeAny = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeAny = exports.TypeAny = function () {
  // options
  function TypeAny(type) {
    (0, _classCallCheck3.default)(this, TypeAny);
    this._type = null;
    this._error = null;
    this._hasError = false;
    this._isValueNull = false;
    this._isRequired = false;
    this._notNull = false;
    this._default = undefined;
    this._value = null;

    this._type = type;
  }

  (0, _createClass3.default)(TypeAny, [{
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
      this.allowNull(false);
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
      if (!this._testExist() || this._hasError) return;
      if (!this._testNull() || this._hasError || this._isValueNull) return;
      if (!this._testType() || this._hasError) return;
      this._transform();
      this._test();
    }
  }, {
    key: '_initValues',
    value: function _initValues(value) {
      this._value = value;
    }
  }, {
    key: '_testExist',
    value: function _testExist() {
      var exist = this._value !== 'undefined';
      if (!exist && this._isRequired) {
        this.error = 'Param is required';
        return false;
      }
      return true;
    }
  }, {
    key: '_testNull',
    value: function _testNull() {
      if (this._value == null && this._notNull) {
        this.error = 'Can not be null';
        return false;
      }
      this._isValueNull = this._value == null;
      return true;
    }
  }, {
    key: '_testType',
    value: function _testType() {
      if (!this._type) {
        return true;
      }
      if ((0, _typeof3.default)(this._value) !== this._type) {
        this.error = 'Invalid type, expect type ' + this._type;
        return false;
      }
      return true;
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
      return this._error;
    }
  }]);
  return TypeAny;
}();