'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var logger = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    var start, status, msg, arraySequelize, ms, fColor;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            start = new Date();
            status = 500;
            _context.prev = 2;

            console.log(_chalk2.default.blue(dateFormat(start)) + ' - ' + _chalk2.default.bold(ctx.method) + ' ' + _chalk2.default.blue.bold(ctx.url) + ' START');
            _context.next = 6;
            return next();

          case 6:
            status = ctx.status;
            _context.next = 17;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](2);
            msg = _context.t0;
            arraySequelize = ['SequelizeValidationError', 'SequelizeUniqueConstraintError'];

            if (_context.t0.constructor.name === 'ErrorApp') {
              msg = _context.t0.status + ': ' + _context.t0.message;
              status = _context.t0.status;
            }if (arraySequelize.includes(_context.t0.name)) {
              msg = _context.t0.name + ': ' + _context.t0.message;
              status = 400;
            }
            console.log(_chalk2.default.red('[ERROR]'), _chalk2.default.red.bold(ctx.method) + ' ' + ctx.url, msg);
            throw _context.t0;

          case 17:
            _context.prev = 17;
            ms = new Date() - start;
            fColor = _chalk2.default[getColor(status)];

            console.log(fColor(dateFormat(new Date())) + ' - ' + fColor.bold(status) + ' ' + _chalk2.default.bold(ctx.method) + ' ' + ctx.url + ' - ' + fColor(ms + ' ms'));
            return _context.finish(17);

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 9, 17, 22]]);
  }));

  return function logger(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dateFormat(date) {
  return (0, _moment2.default)(date).format('YYYY/MM/DD, h:mm:ss a');
}

function getColor(status) {
  if (status < 400) {
    return 'green';
  } else if (status < 500) {
    return 'gray';
  }
  return 'red';
}

exports.default = function () {
  return logger;
};