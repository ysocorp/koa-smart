'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var handleError = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    var arraySequelize;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);
            arraySequelize = ['SequelizeValidationError', 'SequelizeUniqueConstraintError'];


            if (_context.t0.constructor.name === 'ErrorApp') {
              // expected error
              ctx.status = _context.t0.status;
              ctx.body = {};
              if (_context.t0.messages) {
                ctx.body.messages = _context.t0.messages;
              } else {
                ctx.body.message = getMessageTranslate(ctx, _context.t0.message, _context.t0.toTranslate);
              }
              displayLog(_context.t0, 'logErrorApp');
            } else if (arraySequelize.includes(_context.t0.name)) {
              // sequilize expected error by validattor or other
              ctx.status = 400;
              ctx.body = { message: getMessageTranslate(ctx, _context.t0.message.split(':').pop(), true) };
              displayLog(_context.t0, 'logErrorSequelize');
            } else {
              // unexpected error
              ctx.status = 500;
              ctx.body = { message: getMessageTranslate(ctx, __('Please contact the support'), true) };
              displayLog(_context.t0, 'logErrorUnknown');
            }

          case 9:
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

/**
 * middleware in charge of handling errors thrown on purpose, either through manually throwing {@link ErrorApp}, either through calling {@link Route.throw}.
 *
 * It will also make sure errors pertaining to models as well as unexpected error are given a clearer message.
 * @param {OptionErrors} [opt = {}] option object to set which events should be logged
 */


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __ = function __(string) {
  return string;
};

/**
 * @typedef OptionErrors
 * @property {boolean} [logAll = false] if set to true, all logs will be displayed regardless of their individual settings
 * @property {boolean} [logErrorUnknown = false] whether unknown errors should be displayed
 * @property {boolean} [logErrorSequelize = false] whether errors pertaining to the models should be logged
 * @property {boolean} [logErrorApp = false] whether errors coming from thrown {@link ErrorApp} should be logged
 */
var options = {
  logAll: false,
  logErrorUnknown: false,
  logErrorSequelize: false,
  logErrorApp: false
};

function displayLog(error, type) {
  if (options.logAll || options[type]) {
    // eslint-disable-next-line
    console.error(error);
  }
}

function getMessageTranslate(ctx, msg, toTranslate) {
  if (toTranslate) {
    if (ctx.i18n && ctx.i18n.__) {
      return ctx.i18n.__(msg);
    } else if (ctx.state && ctx.state.__) {
      return ctx.state.__(msg);
    }
  }
  return msg;
}

exports.default = function () {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  options = (0, _extends3.default)({}, options, opt);
  return handleError;
};