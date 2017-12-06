'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var handleError = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    var msg, arraySequelize, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 14;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            ctx.status = _context.t0.status || 500;
            ctx.status = ctx.status !== 500 ? ctx.status : 400;
            ctx.body = { message: _context.t0.message };
            if (!(_context.t0 instanceof _ErrorApp2.default)) {
              msg = __('Please contact the support');

              ctx.body = { message: getMessageTranslate(ctx, msg) };
            }
            arraySequelize = ['SequelizeValidationError', 'SequelizeUniqueConstraintError'];

            if (arraySequelize.includes(_context.t0.name) || _context.t0.toTranslate) {
              message = _context.t0.message.split(':').pop();

              ctx.body.message = getMessageTranslate(ctx, message);
            }
            throw _context.t0;

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 5]]);
  }));

  return function handleError(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _ErrorApp = require('../utils/ErrorApp');

var _ErrorApp2 = _interopRequireDefault(_ErrorApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __ = function __(string) {
  return string;
};

function getMessageTranslate(ctx, msg) {
  if (ctx.state.__) {
    return ctx.state.__(msg);
  }
  return msg;
}

exports.default = handleError;