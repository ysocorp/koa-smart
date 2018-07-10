"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var addDefaultBody = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.body = ctx.body || copyBody();
            _context.next = 3;
            return next();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function addDefaultBody(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @desc middleware setting a default starting body
 * @param {Object} body The default body to persist through the app
 * @return {KoaMiddleware}
 */


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  body: {}
};

function copyBody() {
  return JSON.parse((0, _stringify2.default)(options.body));
}

exports.default = function () {
  var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  options.body = body;
  return addDefaultBody;
};