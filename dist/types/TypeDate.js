'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeDate = undefined;

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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _TypeAny2 = require('./TypeAny');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeDate = function (_TypeAny) {
  (0, _inherits3.default)(TypeDate, _TypeAny);

  // latest possible date

  // the date's output format(will output a string instead of a date)
  function TypeDate() {
    (0, _classCallCheck3.default)(this, TypeDate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TypeDate.__proto__ || (0, _getPrototypeOf2.default)(TypeDate)).call(this, 'date'));

    _this._getDescription = function () {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'It should be ';

      var msgError = prefix + 'a date';
      var paramsDesc = [];
      if (_this._max) {
        paramsDesc.push('is before ' + _this._max.toDateString());
      }
      if (_this._min) {
        paramsDesc.push('is after ' + _this._min.toDateString());
      }
      if (_this._formatIn) {
        paramsDesc.push('is formated as ' + (typeof _this._formatIn === 'function' ? 'ISO_8601' : _this._formatIn));
      }
      var paramMsg = _this._generateParamDescription(paramsDesc, ' which');
      return '' + msgError + paramMsg + '.';
    };

    _this._errorMessages[_this._TypeError.INVALIDE_VALUE] = _this._getDescription;
    return _this;
  } // earliest possible date
  // the date's input format


  (0, _createClass3.default)(TypeDate, [{
    key: '_isValid',
    value: function _isValid(date) {
      return date && !isNaN(date.getTime());
    }
  }, {
    key: '_formatDateIfEnabled',
    value: function _formatDateIfEnabled(value) {
      if (this._formatIn) {
        var date = (0, _moment2.default)(value, this._formatIn, true);
        return date.isValid() ? date.toDate() : new Date(value);
      } else {
        return new Date(value);
      }
    }
  }, {
    key: 'min',
    value: function min(_min) {
      this._min = _min;
      return this;
    }
  }, {
    key: 'max',
    value: function max(_max) {
      this._max = _max;
      return this;
    }
  }, {
    key: 'startOf',
    value: function startOf(period) {
      this._startOf = period;
      return this;
    }
  }, {
    key: 'endOf',
    value: function endOf(period) {
      this._endOf = period;
      return this;
    }
  }, {
    key: 'between',
    value: function between(min, max) {
      this._min = min;
      this._max = max;
      return this;
    }
  }, {
    key: 'iso',
    value: function iso() {
      this._formatIn = _moment2.default.ISO_8601;
      return this;
    }
  }, {
    key: 'formatIn',
    value: function formatIn(format) {
      this._formatIn = format;
      return this;
    }
  }, {
    key: 'formatOut',
    value: function formatOut(format) {
      this._formatOut = format;
      return this;
    }
  }, {
    key: '_generateError',
    value: function _generateError() {
      this.error = 'Invalid field ' + this.key;
    }
  }, {
    key: '_testType',
    value: function _testType() {}
  }, {
    key: '_test',
    value: function _test() {
      (0, _get3.default)(TypeDate.prototype.__proto__ || (0, _getPrototypeOf2.default)(TypeDate.prototype), '_test', this).call(this);
      var t = this._TypeError.INVALIDE_VALUE;
      if (!this._isValid(this._value)) {
        return this._setError(t);
      }
      if (this._min && (0, _moment2.default)(this._value).isBefore(this._formatDateIfEnabled(this._min))) {
        return this._setError(t);
      }
      if (this._max && (0, _moment2.default)(this._value).isAfter(this._formatDateIfEnabled(this._max))) {
        return this._setError(t);
      }
      if (this._formatOut) {
        this._value = (0, _moment2.default)(this._value).format(this._formatOut);
        if (this._value === 'Invalid date') {
          return this._setError(t);
        }
      }
    }
  }, {
    key: '_transform',
    value: function _transform() {
      this._value = this._formatDateIfEnabled(this._value);
      if (this._startOf) {
        this._value = (0, _moment2.default)(this._value).startOf(this._startOf).toDate();
      }
      if (this._endOf) {
        this._value = (0, _moment2.default)(this._value).endOf(this._endOf).toDate();
      }
    }
  }]);
  return TypeDate;
}(_TypeAny2.TypeAny);

exports.TypeDate = TypeDate;