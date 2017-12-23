'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _App = require('../App');

var _App2 = _interopRequireDefault(_App);

var _middlewares = require('../middlewares');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var app;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app = new _App2.default({
              port: options.port || 3001
            });


            app.addMiddlewares([(0, _middlewares.cors)({ credentials: true }), (0, _middlewares.helmet)(), (0, _middlewares.bodyParser)(),
            // logger,
            _middlewares.handleError, _middlewares.addDefaultBody, (0, _middlewares.compress)({})]);
            console.log('********************MOUNT : GENERAL********************');
            app.mountFolder((0, _path.join)(__dirname, '_routes'), '/');
            console.log('********************MOUNT : DISABLE********************');
            app.mountFolder((0, _path.join)(__dirname, '_routes/disable'), '/disable');
            console.log('********************MOUNT : PATH********************');
            app.mountFolder((0, _path.join)(__dirname, '_routes/path'), '/path');

            return _context.abrupt('return', app.start());

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function create() {
    return _ref.apply(this, arguments);
  }

  return create;
}();