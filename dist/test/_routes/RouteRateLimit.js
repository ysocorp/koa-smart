'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _class;

var _Route2 = require('../../routes/Route');

var _Route3 = _interopRequireDefault(_Route2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var RouteRateLimit = (_dec = _Route3.default.Get({ rateLimit: { interval: { min: 1 }, max: 2 } }), _dec2 = _Route3.default.Get({ rateLimit: { interval: { sec: 2 }, max: 2 } }), _dec3 = _Route3.default.Get({
  rateLimit: [{ interval: { min: 1 }, max: 2 }, { interval: { sec: 1 }, max: 5 }]
}), _dec4 = _Route3.default.Get({
  path: 'samepath-min1max2',
  rateLimit: { interval: { min: 1 }, max: 2 }
}), _dec5 = _Route3.default.Post({
  path: 'samepath-min1max2',
  rateLimit: { interval: { min: 1 }, max: 2 }
}), (_class = function (_Route) {
  (0, _inherits3.default)(RouteRateLimit, _Route);

  function RouteRateLimit(params) {
    (0, _classCallCheck3.default)(this, RouteRateLimit);
    return (0, _possibleConstructorReturn3.default)(this, (RouteRateLimit.__proto__ || (0, _getPrototypeOf2.default)(RouteRateLimit)).call(this, (0, _extends3.default)({}, params)));
  }

  (0, _createClass3.default)(RouteRateLimit, [{
    key: 'min1max2',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.sendNoContent(ctx);

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function min1max2(_x) {
        return _ref.apply(this, arguments);
      }

      return min1max2;
    }()
  }, {
    key: 'sec2max2',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.sendNoContent(ctx);

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function sec2max2(_x2) {
        return _ref2.apply(this, arguments);
      }

      return sec2max2;
    }()
  }, {
    key: 'min1max2Sec1max5',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.sendNoContent(ctx);

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function min1max2Sec1max5(_x3) {
        return _ref3.apply(this, arguments);
      }

      return min1max2Sec1max5;
    }()
  }, {
    key: 'samepathMin1max2Get',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.sendOk(ctx, this.body(ctx));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function samepathMin1max2Get(_x4) {
        return _ref4.apply(this, arguments);
      }

      return samepathMin1max2Get;
    }()
  }, {
    key: 'samepathMin1max2Post',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.sendOk(ctx, this.body(ctx));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function samepathMin1max2Post(_x5) {
        return _ref5.apply(this, arguments);
      }

      return samepathMin1max2Post;
    }()
  }]);
  return RouteRateLimit;
}(_Route3.default), (_applyDecoratedDescriptor(_class.prototype, 'min1max2', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'min1max2'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'sec2max2', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'sec2max2'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'min1max2Sec1max5', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'min1max2Sec1max5'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'samepathMin1max2Get', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'samepathMin1max2Get'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'samepathMin1max2Post', [_dec5], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'samepathMin1max2Post'), _class.prototype)), _class));
exports.default = RouteRateLimit;