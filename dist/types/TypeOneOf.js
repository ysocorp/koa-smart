'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeOneOf = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var TypeOneOf = exports.TypeOneOf = function (_TypeAny) {
  (0, _inherits3.default)(TypeOneOf, _TypeAny);

  function TypeOneOf() {
    (0, _classCallCheck3.default)(this, TypeOneOf);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TypeOneOf.__proto__ || (0, _getPrototypeOf2.default)(TypeOneOf)).call(this, 'oneOf'));

    _this._types = [];
    _this._errors = [];

    _this._getDescription = function () {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'It should be ';

      var msgs = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(_this._types), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var t = _step.value;

          var fnMessage = t._getDescription || t._errorMessages[_this._TypeError.ALL] || t._errorMessages[_this._TypeError.INVALIDE_VALUE];
          msgs.push(fnMessage('').slice(0, -1));
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

      return prefix + 'either ' + msgs.join(' OR ') + '.';
    };

    _this._errorMessages[_this._TypeError.INVALIDE_VALUE] = _this._getDescription;
    return _this;
  }

  (0, _createClass3.default)(TypeOneOf, [{
    key: 'types',
    value: function types() {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      this._types = [].concat(rest);
      return this;
    }
  }, {
    key: '_testType',
    value: function _testType() {
      /* overload */
    }
  }, {
    key: '_test',
    value: function _test() {
      var isOneOk = false;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(this._types), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var t = _step2.value;

          t.required(this._required);
          t.test(this._value);
          if (!isOneOk && !t.error) {
            isOneOk = true;
            this._value = t.value;
          }
          if (t.error) {
            this._errors.push(t.error);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (!isOneOk) {
        this._setError(this._TypeError.INVALIDE_VALUE);
      }
    }
  }]);
  return TypeOneOf;
}(_TypeAny2.TypeAny);