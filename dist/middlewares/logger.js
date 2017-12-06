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
    var start, msg, arraySequelize, ms, fColor;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            start = new Date();
            _context.prev = 1;

            console.log(_chalk2.default.blue(dateFormat(start)) + ' - ' + _chalk2.default.bold(ctx.method) + ' ' + _chalk2.default.blue.bold(ctx.url) + ' START');
            _context.next = 5;
            return next();

          case 5:
            _context.next = 13;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](1);
            msg = _context.t0;
            arraySequelize = ['SequelizeValidationError', 'SequelizeUniqueConstraintError'];

            if (_context.t0 instanceof _ErrorApp2.default || arraySequelize.includes(_context.t0.name)) {
              msg = _context.t0.name + ': ' + _context.t0.message;
            }
            console.error(_chalk2.default.red('[ERROR]'), _chalk2.default.red.bold(ctx.method) + ' ' + ctx.url, msg);

          case 13:
            _context.prev = 13;
            ms = new Date() - start;
            fColor = _chalk2.default[getColor(ctx.status)];

            console.log(fColor(dateFormat(new Date())) + ' - ' + fColor.bold(ctx.status) + ' ' + _chalk2.default.bold(ctx.method) + ' ' + ctx.url + ' - ' + fColor(ms + ' ms'));
            return _context.finish(13);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 7, 13, 18]]);
  }));

  return function logger(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ErrorApp = require('../utils/ErrorApp');

var _ErrorApp2 = _interopRequireDefault(_ErrorApp);

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

exports.default = logger;