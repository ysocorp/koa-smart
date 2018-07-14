'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = require('../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorApp = function (_Error) {
  (0, _inherits3.default)(ErrorApp, _Error);

  function ErrorApp(status, message) {
    var toTranslate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    (0, _classCallCheck3.default)(this, ErrorApp);

    /**
     * @type {number}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ErrorApp.__proto__ || (0, _getPrototypeOf2.default)(ErrorApp)).call(this));

    _this.status = status;

    /**
     * @type {string}
     */
    _this.message = null;

    /**
     * @type {Object | Array}
     */
    _this.messages = null;

    if ((0, _utils.isArray)(message) || (0, _utils.isObject)(message)) {
      _this.messages = message;
    } else {
      _this.message = message;
    }

    /**
     * @type {boolean}
     */
    _this.toTranslate = toTranslate;

    _this.constructor = ErrorApp;
    return _this;
  }

  return ErrorApp;
}(Error);

exports.default = ErrorApp;


ErrorApp.prototype = Error.prototype;