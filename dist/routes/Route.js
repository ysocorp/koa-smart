'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _class, _temp;

var _koaRouter2 = require('koa-router');

var _koaRouter3 = _interopRequireDefault(_koaRouter2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _koa2Ratelimit = require('koa2-ratelimit');

var _ErrorApp = require('../utils/ErrorApp');

var _ErrorApp2 = _interopRequireDefault(_ErrorApp);

var _StatusCode = require('../utils/StatusCode');

var _StatusCode2 = _interopRequireDefault(_StatusCode);

var _utils = require('../utils/utils');

var _RouteDecorators = require('./RouteDecorators');

var _RouteDecorators2 = _interopRequireDefault(_RouteDecorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Route = (_temp = _class = function () {
  function Route(_ref) {
    var app = _ref.app,
        prefix = _ref.prefix,
        routes = _ref.routes,
        models = _ref.models,
        model = _ref.model,
        _ref$disable = _ref.disable,
        disable = _ref$disable === undefined ? false : _ref$disable;
    (0, _classCallCheck3.default)(this, Route);

    this.app = app;
    this.prefix = prefix;
    this.allRoutesInstance = routes;
    this.models = models;
    this.disable = disable;
    if (this.models && model) {
      this.model = this.models[model];
    }
    this.koaRouter = new _koaRouter3.default();
    this.privateKeyInParamsRoute = ['__force', '__func'];
    // This Variable are set by RouteDecorators
    this.routes;
    this.routeBase;
  }

  (0, _createClass3.default)(Route, [{
    key: 'log',
    value: function log(str) {
      if (Route.displayLog) {
        var _console;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_console = console).log.apply(_console, [str].concat(args));
      }
    }
  }, {
    key: 'mount',
    value: function mount() {
      if (this.disable) {
        for (var type in this.routes) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(this.routes[type]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var route = _step.value;

              var routePath = ('/' + this.prefix + '/' + this.routeBase + '/' + route.path).replace(/[/]{2,10}/g, '/');
              if (!route.options.disable) {
                var _koaRouter;

                this.log(_chalk2.default.green.bold('[Mount route]'), type, routePath);
                (_koaRouter = this.koaRouter)[type].apply(_koaRouter, [routePath].concat((0, _toConsumableArray3.default)(this._use(route))));
              } else {
                this.log(_chalk2.default.yellow.bold('[Disable Mount route]'), type, routePath);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      } else {
        this.log(_chalk2.default.yellow.bold('Routes "' + this.routeBase + '" of class ' + this.constructor.name + ' are\'t add'));
      }
    }

    // ************************************ MIDDLEWARE *********************************

  }, {
    key: '_use',
    value: function _use(infos) {
      var _infos$options = infos.options,
          options = _infos$options === undefined ? {} : _infos$options;
      var _options$before = options.before,
          before = _options$before === undefined ? [] : _options$before,
          _options$after = options.after,
          after = _options$after === undefined ? [] : _options$after;


      var middlewares = [this._beforeRoute(infos)];
      middlewares.push.apply(middlewares, (0, _toConsumableArray3.default)(before));
      middlewares.push(infos.call.bind(this));
      middlewares.push.apply(middlewares, (0, _toConsumableArray3.default)(after));

      return middlewares;
    }
  }, {
    key: '_getRateLimit',
    value: function _getRateLimit(option, routePath, type) {
      option.interval = _koa2Ratelimit.RateLimit.RateLimit.timeToMs(option.interval);
      return _koa2Ratelimit.RateLimit.middleware((0, _extends3.default)({
        prefixKey: type + '|' + routePath + '|' + option.interval
      }, option));
    }
  }, {
    key: 'addRateLimit',
    value: function addRateLimit(middlewares, _ref2) {
      var options = _ref2.options;
      var rateLimit = options.rateLimit,
          routePath = options.routePath,
          type = options.type;


      if (rateLimit) {
        if (Array.isArray(rateLimit)) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator3.default)(rateLimit), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var elem = _step2.value;

              middlewares.push(this._getRateLimit(elem, routePath, type));
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        } else {
          middlewares.push(this._getRateLimit(rateLimit, routePath, type));
        }
      }
    }
  }, {
    key: '_beforeRoute',
    value: function _beforeRoute(infos) {
      var _this = this;

      return function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this.beforeRoute(ctx, infos, next);

                case 2:
                  return _context.abrupt('return', _context.sent);

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x, _x2) {
          return _ref3.apply(this, arguments);
        };
      }();
    }
  }, {
    key: 'beforeRoute',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, _ref5, next) {
        var options = _ref5.options;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.mlParams(ctx, options);

                if (!next) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 4;
                return next();

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function beforeRoute(_x3, _x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return beforeRoute;
    }()
  }, {
    key: 'mlParams',
    value: function mlParams(ctx, _ref6) {
      var params = _ref6.params;

      ctx.request.bodyOrig = (0, _utils.deepCopy)(ctx.request.body);
      ctx.request.body = this.mlTestParams(ctx, ctx.request.body, params);
    }
  }, {
    key: 'mlParamsExecFunc',
    value: function mlParamsExecFunc(ctx, body, keyBody, param) {
      if (body && body[keyBody]) {
        var __func = param.__func;

        if (__func && Array.isArray(__func)) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = (0, _getIterator3.default)(__func), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var func = _step3.value;

              body[keyBody] = func(body[keyBody], this, { ctx: ctx, body: body, keyBody: keyBody });
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      }
    }
  }, {
    key: 'mlTestParams',
    value: function mlTestParams(ctx, body, paramsTest) {
      var bodyVerif = {};
      var paramsConvert = this.paramsNormalize(paramsTest);
      for (var key in paramsConvert) {
        var param = paramsConvert[key];

        var bodyElem = body ? body[key] : undefined;
        // test param
        if (param.__force && (bodyElem === undefined || bodyElem === null)) {
          this.throw(400, ctx.state.__('param required:') + ' ' + key);
        }
        this.mlParamsExecFunc(ctx, body, key, param);

        if (this.paramsHasSubElement(param)) {
          if (body && (0, _utils.isObject)(body)) {
            var tmp = this.mlTestParams(ctx, body[key], param);
            if (body[key]) {
              bodyVerif[key] = tmp;
            }
          } else {
            var _tmp = this.mlTestParams(ctx, undefined, param);
            if (body && (0, _utils.isObject)(body) && body[key] !== undefined) {
              bodyVerif[key] = _tmp;
            }
          }
        } else if (body && (0, _utils.isObject)(body) && body[key] !== undefined) {
          bodyVerif[key] = body[key];
        }
      }
      return bodyVerif;
    }
  }, {
    key: 'paramsNormalize',
    value: function paramsNormalize(paramsTest) {
      var paramsConvert = {};
      // convert array to object
      if ((0, _utils.isArray)(paramsTest)) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = (0, _getIterator3.default)(paramsTest), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var elem = _step4.value;

            if ((0, _utils.isObject)(elem, false)) {
              paramsConvert = (0, _assign2.default)(paramsConvert, elem);
            } else {
              paramsConvert[elem] = false;
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      } else {
        paramsConvert = paramsTest;
      }

      // normalize objects
      for (var key in paramsConvert) {
        var _elem = paramsConvert[key];
        if (!this.privateKeyInParamsRoute.includes(key)) {
          if ((0, _utils.isObject)(_elem) || (0, _utils.isArray)(_elem)) {
            paramsConvert[key] = this.paramsNormalize(_elem);
          } else if (_elem === false || _elem === true) {
            paramsConvert[key] = { __force: _elem };
          }
        }
      }
      return paramsConvert;
    }
  }, {
    key: 'paramsHasSubElement',
    value: function paramsHasSubElement(paramsTest) {
      for (var key in paramsTest) {
        if (!this.privateKeyInParamsRoute.includes(key)) {
          return true;
        }
      }
      return false;
    }

    // ************************************ !MIDDLEWARE *********************************

  }, {
    key: 'body',
    value: function body(ctx) {
      var original = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return original ? ctx.request.bodyOrig : ctx.request.body;
    }
  }, {
    key: 'bodyGet',
    value: function bodyGet(ctx) {
      return ctx.request.query || {};
    }
  }, {
    key: 'paramsGet',
    value: function paramsGet(ctx) {
      return this.bodyGet(ctx);
    }
  }, {
    key: 'send',
    value: function send(ctx) {
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
      var data = arguments[2];
      var message = arguments[3];

      ctx.status = status;
      if (data) {
        ctx.body.data = data;
      }
      if (message) {
        ctx.body.message = message;
      }
      ctx.body.date = new Date();
    }
  }, {
    key: 'sendOk',
    value: function sendOk(ctx, data, message) {
      return this.send(ctx, _StatusCode2.default.ok, data, message);
    }
  }, {
    key: 'sendCreated',
    value: function sendCreated(ctx, data, message) {
      return this.send(ctx, _StatusCode2.default.created, data, message);
    }
  }, {
    key: 'sendNoContent',
    value: function sendNoContent(ctx, data, message) {
      return this.send(ctx, _StatusCode2.default.noContent, data, message);
    }
  }, {
    key: 'sendBadRequest',
    value: function sendBadRequest(ctx, data, message) {
      return this.send(ctx, _StatusCode2.default.badRequest, data, message);
    }
  }, {
    key: 'sendUnauthorized',
    value: function sendUnauthorized(ctx, data, message) {
      return this.send(ctx, _StatusCode2.default.unauthorized, data, message);
    }
  }, {
    key: 'sendForbidden',
    value: function sendForbidden(ctx, data, message) {
      return this.send(ctx, _StatusCode2.default.forbidden, data, message);
    }
  }, {
    key: 'sendNotFound',
    value: function sendNotFound(ctx, data, message) {
      return this.send(ctx, _StatusCode2.default.notFound, data, message);
    }
  }, {
    key: 'sendInternalServerError',
    value: function sendInternalServerError(ctx, data, message) {
      return this.send(ctx, _StatusCode2.default.internalServerError, data, message);
    }
  }, {
    key: 'throw',
    value: function _throw(status, message) {
      var translate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      throw new _ErrorApp2.default(status, message, translate);
    }
  }, {
    key: 'assert',
    value: function assert(condition, status, message) {
      var translate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!condition) {
        this.throw(status, message, translate);
      }
    }
  }]);
  return Route;
}(), _class.displayLog = true, _class.Get = _RouteDecorators2.default.Get, _class.Post = _RouteDecorators2.default.Post, _class.Put = _RouteDecorators2.default.Put, _class.Patch = _RouteDecorators2.default.Patch, _class.Delete = _RouteDecorators2.default.Delete, _class.Route = _RouteDecorators2.default.Route, _temp);
exports.default = Route;