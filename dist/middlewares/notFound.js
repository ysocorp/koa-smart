'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var notFound = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.status = 404;
            ctx.body = {
              message: ctx.state.__ ? ctx.state.__('Not found') : 'Not found'
            };

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function notFound(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @desc middleware preventingly setting the response's status to 404, in case no path is picked up
 */


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return notFound;
};