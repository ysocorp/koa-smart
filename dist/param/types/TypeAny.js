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
  function TypeAny(type) {
    (0, _classCallCheck3.default)(this, TypeAny);
    this._type = null;
    this._error = null;
    this._isValueNull = false;
    this._isRequired = false;
    this._notNull = false;
    this.value = null;

    this._type = type;
  }
  // options


  (0, _createClass3.default)(TypeAny, [{
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
      if (!this._testExist() || this.error) return;
      if (!this._testNull() || this.error || this._isValueNull) return;
      if (!this._testType() || this.error) return;
      this._transform();
      this._test();
    }
  }, {
    key: '_initValues',
    value: function _initValues(value) {
      this.value = value;
    }
  }, {
    key: '_testExist',
    value: function _testExist() {
      var exist = this.value !== 'undefined';
      if (!exist && this._isRequired) {
        this.error = 'Param is required';
        return false;
      }
      return true;
    }
  }, {
    key: '_testNull',
    value: function _testNull() {
      if (this.value == null && this._notNull) {
        this.error = 'Can not be null';
        return false;
      }
      this._isValueNull = this.value == null;
      return true;
    }
  }, {
    key: '_testType',
    value: function _testType() {
      if (!this._type) {
        return true;
      }
      if ((0, _typeof3.default)(this.value) !== this._type) {
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
    key: 'error',
    set: function set(string) {
      this._error = string;
    },
    get: function get() {
      return this._error;
    }
  }]);
  return TypeAny;
}();