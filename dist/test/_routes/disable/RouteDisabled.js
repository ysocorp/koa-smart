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

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

var _Route2 = require('../../../routes/Route');

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

var RouteDisabled = (_dec = _Route3.default.Route({
  disable: true
}), _dec2 = _Route3.default.Get({ path: '' }), _dec3 = _Route3.default.Get({ disable: false }), _dec(_class = (_class2 = function (_Route) {
  (0, _inherits3.default)(RouteDisabled, _Route);

  function RouteDisabled(params) {
    (0, _classCallCheck3.default)(this, RouteDisabled);
    return (0, _possibleConstructorReturn3.default)(this, (RouteDisabled.__proto__ || (0, _getPrototypeOf2.default)(RouteDisabled)).call(this, (0, _extends3.default)({}, params)));
  }

  (0, _createClass3.default)(RouteDisabled, [{
    key: 'index',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.sendOk(ctx, "hellow");

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function index(_x) {
        return _ref.apply(this, arguments);
      }

      return index;
    }()
  }, {
    key: 'tryDisable',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.sendOk(ctx, "hellow");

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function tryDisable(_x2) {
        return _ref2.apply(this, arguments);
      }

      return tryDisable;
    }()
  }]);
  return RouteDisabled;
}(_Route3.default), (_applyDecoratedDescriptor(_class2.prototype, 'index', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'index'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'tryDisable', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'tryDisable'), _class2.prototype)), _class2)) || _class);
exports.default = RouteDisabled;