'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeEnum = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeEnum = exports.TypeEnum = function (_TypeAny) {
  (0, _inherits3.default)(TypeEnum, _TypeAny);

  function TypeEnum() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, TypeEnum);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TypeEnum.__proto__ || (0, _getPrototypeOf2.default)(TypeEnum)).call(this, (0, _extends3.default)({}, params, { type: 'enum' })));

    _this._oneOf = [];
    _this._insensitive = true;
    _this._number = true;

    _this._getError = function (_ref) {
      var _i18n = _ref._i18n;

      return _i18n.__('Should be one of %s', _utils.utils.joinWithCote(_this._oneOf, ', '));
    };

    _this._getDescription = function () {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'It should be ';

      return prefix + 'one of: (' + _utils.utils.joinWithCote(_this._oneOf, ', ') + ').';
    };

    _this._errorMessages[_this._TypeError.INVALID_VALUE] = _this._getError;
    return _this;
  }

  (0, _createClass3.default)(TypeEnum, [{
    key: '_insensitiveArray',
    value: function _insensitiveArray(array) {
      return array.map(function (value) {
        if (typeof value === 'string') {
          return value.toLocaleLowerCase();
        }
        return value;
      });
    }
  }, {
    key: 'oneOf',
    value: function oneOf() {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      this._oneOf = [].concat(rest);
      return this;
    }
  }, {
    key: 'insensitive',
    value: function insensitive() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._insensitive = val;
      return this;
    }
  }, {
    key: 'number',
    value: function number() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._number = val;
      return this;
    }
  }, {
    key: '_testType',
    value: function _testType() {
      if (!['string', 'number'].includes((0, _typeof3.default)(this._value))) {
        this._setError(this._TypeError.INVALID_TYPE);
      }
    }
  }, {
    key: '_test',
    value: function _test() {
      if (!this._oneOf.includes(this._value)) {
        this._setError(this._TypeError.INVALID_VALUE);
      }
    }
  }, {
    key: '_transform',
    value: function _transform() {
      if (this._insensitive && typeof this._value === 'string') {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(this._oneOf), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var e = _step.value;

            if (typeof e === 'string' && e.toLocaleLowerCase() === this._value.toLocaleLowerCase()) {
              this._value = e;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      if (this._number && !isNaN(parseFloat(this._value))) {
        this._value = parseFloat(this._value);
      }
    }
  }]);
  return TypeEnum;
}(_TypeAny2.TypeAny);