"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorApp = function ErrorApp(status, message) {
  var toTranslate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  (0, _classCallCheck3.default)(this, ErrorApp);

  this.status = status;
  this.message = message;
  this.toTranslate = toTranslate;
};

exports.default = ErrorApp;