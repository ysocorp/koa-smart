'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeArray = undefined;

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

var _lodash = require('lodash');

var _TypeAny2 = require('./TypeAny');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeArray = function (_TypeAny) {
  (0, _inherits3.default)(TypeArray, _TypeAny);

  // the array's inner type

  // the array's minimum allowed length
  function TypeArray() {
    (0, _classCallCheck3.default)(this, TypeArray);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TypeArray.__proto__ || (0, _getPrototypeOf2.default)(TypeArray)).call(this, 'Array'));

    _this._tSingle = false;

    _this._getDescription = function () {
      // TODO return custom error message
      var msgError = 'It should be an array';
      return msgError + '.';
    };

    _this._errorMessages[_this._TypeError.INVALIDE_VALUE] = _this._getDescription;
    _this._errorMessages[_this._TypeError.INVALIDE_TYPE] = _this._getDescription;
    return _this;
  } // the array's maximum allowed length
  // the array's exact allowed length
  // whether single values are allowed


  (0, _createClass3.default)(TypeArray, [{
    key: '_generateError',
    value: function _generateError() {
      this.error = 'Invalid field ' + this.key;
      return false;
    }
  }, {
    key: 'single',
    value: function single() {
      var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._tSingle = enabled;
      return this;
    }
  }, {
    key: 'splitBy',
    value: function splitBy(split) {
      this._tSplitBy = split;
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
    key: 'type',
    value: function type(itemType) {
      this._innerType = itemType;
      return this;
    }
  }, {
    key: '_testType',
    value: function _testType() {
      var canSplit = this._tSplitBy != null && typeof this._value === 'string';
      if (!Array.isArray(this._value) && !this._tSingle && !canSplit) {
        this._setError(this._TypeError.INVALIDE_TYPE);
      }
    }
  }, {
    key: '_test',
    value: function _test() {
      if (this._min && this._value.length < this._min) {
        return this._setError(this._TypeError.INVALIDE_VALUE);
      }
      if (this._max && this._value.length > this._max) {
        return this._setError(this._TypeError.INVALIDE_VALUE);
      }
      if (this._length && this._value.length !== this._length) {
        return this._setError(this._TypeError.INVALIDE_VALUE);
      }
      if (this._innerType && this._value) {
        var test = true;
        for (var i = 0; i < this._value.length; i++) {
          this._innerType.test(this._value[i]);
          if (this._innerType.error) {
            test = false;
            break;
          }
          this._value[i] = this._innerType.value;
        }
        if (!test) return this._setError(this._TypeError.INVALIDE_TYPE);
      }
    }
  }, {
    key: '_transform',
    value: function _transform() {
      if (this._tSplitBy != null && typeof this._value === 'string') {
        this._value = this._value.split(this._tSplitBy);
      }
      if (this._tSingle && !Array.isArray(this._value)) {
        this._value = (0, _lodash.castArray)(this._value);
      }
    }
  }]);
  return TypeArray;
}(_TypeAny2.TypeAny);

exports.TypeArray = TypeArray;