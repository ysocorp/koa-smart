'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _docGenerator = require('../utils/docGenerator');

var _RouteDecorators = require('./RouteDecorators');

var _RouteDecorators2 = _interopRequireDefault(_RouteDecorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Route = (_temp = _class = function () {

  /**
   * @typedef {Object} BeforeRouteParams
   * @property {string} path the path at which the route will be available.
   * @property {ParamsMethodDecorator} options
   * @property {function} call the fonction to call when route match, this is automaticaly add by route decorator
   */

  /**
   * @typedef {Object} PostParamsFilter
   * @property {ParamMiddlewareFunction[]} __func an array of functions which provides "middleware" functions that will be applied to the corresponding parameter one by one, in order to validate or transform it
   * @property {boolean} __force whether the parameter is required or not.
   */

  /**
   * @typedef {function} ParamMiddlewareFunction
   * @param {*} elem the element the function will act upon
   * @param {Route} [route] the element's current route
   * @param {{ctx: KoaContext, body:Object, keyBody:string}} [context] the element's context
   * @return {*} transformedParam the parameter, after being manipulated by the function
   */

  /**
   * @typedef {Object} RouteParams
   * @property {Koa} koaApp the Koa application
   * @property {string} prefix a prefix which will be preppended before every route's paths
   * @property {Route[]} routes an array containing all the mounted Routes
   * @property {Model[]} [models] an array containing all of the app's models
   * @property {string} [model] the name of the route's own model
   * @property {disable} [boolean] whether the route should be disabled
   *
   */

  /**
   * @typedef {function} Decorator
   * @return { }
   */

  /**
   * @external {KoaContext} http://koajs.com/#api
   */

  /**
   * @external {Koa} http://koajs.com/#application
   */

  /**
   * @param {RouteParams} params the route's parameters
   */

  /**
   * @type {boolean}
   * @desc if true it will log which route are mount and which are not
   */
  function Route(_ref) {
    var koaApp = _ref.koaApp,
        prefix = _ref.prefix,
        routes = _ref.routes,
        models = _ref.models,
        model = _ref.model,
        disable = _ref.disable;
    (0, _classCallCheck3.default)(this, Route);

    /**
     * @type {Koa}
     * @desc the main Koa application
     */
    this.koaApp = koaApp;
    /**
     * @type {string}
     * @desc the route's prefix
     */
    this.prefix = prefix;
    /**
     * @type {Route[]}
     * @desc an array composed of all the availble routes in the application
     */
    this.allRoutesInstance = routes;
    /**
     * @type {Model[]}
     * @desc an array of all the models available in the application
     */
    this.models = models;
    /**
     * @type {boolean}
     * @desc whether the route should be disabled. disabled routes cannot be called.
     */
    this.disable = disable != null ? disable : this.disable;
    /**
     * @type {function[]}
     * @desc the route's registered middlewares
     */
    this.middlewares = this.middlewares || [];
    if (this.models && model) {
      /**
       * @type {Model|undefined}
       * @desc the route's own model
       */
      this.model = this.models[model];
    }
    /**
     * @type {KoaRouter}
     * @desc the underlying koa router for this particular route
     */

    this.koaRouter = new _koaRouter3.default();
    /**
     * @ignore
     */
    this.privateKeyInParamsRoute = ['__force', '__func'];
    // This Variable are set by RouteDecorators
    this.routes;
    this.routeBase;
  }

  /**
   * @access public
   * @desc mounts the tagged function as a GET route.
   * @param {ParamsMethodDecorator} params the route's parameters
   * @return {Decorator}
   */

  /**
   * @type {StatusCode}
   */


  /**
   * @access public
   * @desc mounts the tagged function as a POST route.
   * @param {ParamsMethodDecorator} params the route's parameters
   * @return {Decorator}
   */


  /**
   * @access public
   * @desc mounts the tagged function as a PUT route.
   * @param {ParamsMethodDecorator} params the route's parameters
   * @return {Decorator}
   */


  /**
   * @access public
   * @desc mounts the tagged function as a PATCH route.
   * @param {ParamsMethodDecorator} params the route's parameters
   * @return {Decorator}
   */


  /**
   * @access public
   * @desc mounts the tagged function as a DELETE route.
   * @param {ParamsMethodDecorator} params the route's parameters
   * @return {Decorator}
   */


  /**
   * @access public
   * @desc used to set some parameters on an entire class.The supported parameters are middlewares, disable, and routeBase.
   * @return {Decorator}
   * @param {ParamsClassDecorator} params the route's parameters
   */


  (0, _createClass3.default)(Route, [{
    key: 'log',


    /**
     * logs a message, but only if the route's logs are set to be displayed.
     *
     * accepts several parameters
     */
    value: function log(str) {
      if (Route.displayLog) {
        var _console;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // eslint-disable-next-line
        (_console = console).log.apply(_console, [str].concat(args));
      }
    }

    /**
     * @access public
     * @desc Registers the route and makes it callable once the API is launched.
     *       the route will be called along with the middlewares that were registered in the decorator.
     *
     *       you will usually not need to call this method yourself.
     */

  }, {
    key: 'mount',
    value: function mount() {
      if (this.disable !== true) {
        for (var type in this.routes) {
          // eslint-disable-line
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(this.routes[type]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var route = _step.value;

              var routePath = ('/' + this.prefix + '/' + this.routeBase + '/' + route.path).replace(/[/]{2,10}/g, '/').replace(/[/]$/, '');
              route.options.routePath = routePath;
              route.options.type = type;
              if (!route.options.disable) {
                var _koaRouter;

                this.log(_chalk2.default.green.bold('[Mount route]'), '\t' + type + '\t', routePath);
                (_koaRouter = this.koaRouter)[type].apply(_koaRouter, [routePath].concat((0, _toConsumableArray3.default)(this._use(route))));
                (0, _docGenerator.generateDoc)(this, route);
              } else {
                this.log(_chalk2.default.yellow.bold('[Disable Mount route]\t'), type, routePath);
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
    /**
     *@ignore
     */

  }, {
    key: '_use',
    value: function _use(infos) {
      var _infos$options = infos.options,
          options = _infos$options === undefined ? {} : _infos$options;
      var _options$middlewares = options.middlewares,
          middlewares = _options$middlewares === undefined ? [] : _options$middlewares;


      var middlewaresToAdd = [this._beforeRoute(infos)];
      middlewaresToAdd.push.apply(middlewaresToAdd, (0, _toConsumableArray3.default)(this.middlewares)); // add middlewares of the class
      middlewaresToAdd.push.apply(middlewaresToAdd, (0, _toConsumableArray3.default)(middlewares)); // add middlewares of the specific route
      this.addRateLimit(middlewaresToAdd, infos);
      middlewaresToAdd.push(infos.call.bind(this));

      return middlewaresToAdd;
    }

    /**
     *@ignore
     */

  }, {
    key: 'getRateLimit',
    value: function getRateLimit(option, routePath, type) {
      option.interval = _koa2Ratelimit.RateLimit.RateLimit.timeToMs(option.interval);
      return _koa2Ratelimit.RateLimit.middleware((0, _extends3.default)({
        prefixKey: type + '|' + routePath + '|' + option.interval
      }, option));
    }

    /**
     * if a decorator has a rateLimit property, it will add the rate limiting mechanism to the route,
     * with a unique ID for each route in order to differentiate the various routes.
     *
     * You should not need to call this method directly.
     * @param {function[]} middlewares the array of currently registered middlewares for the given route
     * @param {{options:{rateLimit:Object,routePath:string,type:string}}} params the route's parameters
     */

  }, {
    key: 'addRateLimit',
    value: function addRateLimit(middlewares, _ref2) {
      var options = _ref2.options;
      var rateLimit = options.rateLimit,
          routePath = options.routePath,
          type = options.type;


      if (rateLimit) {
        if ((0, _utils.isArray)(rateLimit)) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator3.default)(rateLimit), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var elem = _step2.value;

              middlewares.push(this.getRateLimit(elem, routePath, type));
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
          middlewares.push(this.getRateLimit(rateLimit, routePath, type));
        }
      }
    }

    // beforeRoute
    /**
     *@ignore
     */

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

    /**
     * @desc a member which can be overriden, which will always be executed before the route is accessed
     * @param {KoaContext} ctx Koa's context object
     * @param {BeforeRouteParams} params an object containing all route parameters
     * @param {function} next the next middleware in the chain
     */

  }, {
    key: 'beforeRoute',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, _ref5, next) {
        var options = _ref5.options;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._mlTestAccess(ctx, options);

              case 2:
                this._mlParams(ctx, options);

                if (!next) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 6;
                return next();

              case 6:
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

    /**
     *@ignore
     */

  }, {
    key: '_mlTestAccess',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, _ref7) {
        var accesses = _ref7.accesses;

        var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, access, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _access;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!((0, _utils.isArray)(accesses) && accesses.length)) {
                  _context3.next = 30;
                  break;
                }

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context3.prev = 4;
                _iterator3 = (0, _getIterator3.default)(accesses);

              case 6:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context3.next = 15;
                  break;
                }

                access = _step3.value;
                _context3.next = 10;
                return access(ctx);

              case 10:
                if (!_context3.sent) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt('return', true);

              case 12:
                _iteratorNormalCompletion3 = true;
                _context3.next = 6;
                break;

              case 15:
                _context3.next = 21;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3['catch'](4);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t0;

              case 21:
                _context3.prev = 21;
                _context3.prev = 22;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 24:
                _context3.prev = 24;

                if (!_didIteratorError3) {
                  _context3.next = 27;
                  break;
                }

                throw _iteratorError3;

              case 27:
                return _context3.finish(24);

              case 28:
                return _context3.finish(21);

              case 29:
                this.throwForbidden(null, true);

              case 30:
                if (!((0, _utils.isArray)(this.accesses) && this.accesses.length)) {
                  _context3.next = 60;
                  break;
                }

                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context3.prev = 34;
                _iterator4 = (0, _getIterator3.default)(this.accesses);

              case 36:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context3.next = 45;
                  break;
                }

                _access = _step4.value;
                _context3.next = 40;
                return _access(ctx);

              case 40:
                if (!_context3.sent) {
                  _context3.next = 42;
                  break;
                }

                return _context3.abrupt('return', true);

              case 42:
                _iteratorNormalCompletion4 = true;
                _context3.next = 36;
                break;

              case 45:
                _context3.next = 51;
                break;

              case 47:
                _context3.prev = 47;
                _context3.t1 = _context3['catch'](34);
                _didIteratorError4 = true;
                _iteratorError4 = _context3.t1;

              case 51:
                _context3.prev = 51;
                _context3.prev = 52;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 54:
                _context3.prev = 54;

                if (!_didIteratorError4) {
                  _context3.next = 57;
                  break;
                }

                throw _iteratorError4;

              case 57:
                return _context3.finish(54);

              case 58:
                return _context3.finish(51);

              case 59:
                this.throwForbidden(null, true);

              case 60:
                return _context3.abrupt('return', true);

              case 61:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 17, 21, 29], [22,, 24, 28], [34, 47, 51, 59], [52,, 54, 58]]);
      }));

      function _mlTestAccess(_x6, _x7) {
        return _ref6.apply(this, arguments);
      }

      return _mlTestAccess;
    }()

    /**
     *@ignore
     */

  }, {
    key: '_mlParams',
    value: function _mlParams(ctx, _ref8) {
      var bodyType = _ref8.bodyType,
          queryType = _ref8.queryType;

      if (bodyType) {
        ctx.request.bodyOrigin = (0, _utils.deepCopy)(ctx.request.body);
        ctx.request.bodyChanged = this._mlTestParams(ctx, ctx.request.body, bodyType);
        ctx.request.body = ctx.request.bodyChanged;
      }
      if (queryType) {
        ctx.request.queryOrigin = (0, _utils.deepCopy)(ctx.request.query || {});
        ctx.request.queryChanged = this._mlTestParams(ctx, ctx.request.query, queryType);
        ctx.request.query = ctx.request.queryChanged;
      }
    }

    /**
     *@ignore
     */

  }, {
    key: '_mlTestParams',
    value: function _mlTestParams(ctx, body, type) {
      type.test(body);
      if (type.error || type.errors) {
        this.throwBadRequest(type.errors || type.error);
      }
      return type.value;
    }

    // ************************************ !MIDDLEWARE *********************************

    /**
     *@desc retrieves the context's body, if the request has one.
     *@param {KoaContext} ctx koa's context object
     *@param {boolean} [original=false] if set to true, the function will return the body before it is filtered by the param decorator.
     *                                  otherwise, it will return the filtered and transformed body.
     */

  }, {
    key: 'body',
    value: function body(ctx) {
      var original = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return original ? ctx.request.bodyOrigin : ctx.request.bodyChanged;
    }

    /**
     * @access public
     * @desc retrieves the query params in a GET request
     * @param {KoaContext} ctx koa's context object
     * @return {Object.<string, *>}
     */

  }, {
    key: 'queryParam',
    value: function queryParam(ctx) {
      var original = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return original ? ctx.request.queryOrigin : ctx.request.queryChanged;
    }

    /**
     * @access public
     * @desc sets the response's body (with a message + data field) and status.
     * @param {KoaContext} ctx koa's context object
     * @param {number} [status] the HTTP status code to end the request with
     * @param {*} [data] the data to be yielded by the requests
     * @param {string} [message] the message to be yielded by the request
     * @return { }
     */

  }, {
    key: 'send',
    value: function send(ctx) {
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
      var data = arguments[2];
      var message = arguments[3];

      ctx.body = ctx.body || {}; // add default body
      ctx.status = status;
      // Do not remove this test because if status = 204 || 304, node will remove body
      // see _hasBody on
      // https://github.com/nodejs/node/blob/master/lib/_http_server.js#L235-L250
      if (ctx.body) {
        if (data != null) {
          ctx.body.data = data;
        }
        if (message != null) {
          ctx.body.message = message;
        }
        ctx.body.date = Date.now();
      }
    }

    /**
     * @access public
     * @desc same as {@link send}, but automatically sets the status to 200 OK
     * @param {KoaContext} ctx koa's context object
     * @param {*} [data] the data to be yielded by the requests
     * @param {string} [message] the message to be yielded by the request
     * @return { }
     */

  }, {
    key: 'sendOk',
    value: function sendOk(ctx, data, message) {
      return this.send(ctx, Route.StatusCode.ok, data, message);
    }

    /**
     * @access public
     * @desc same as {@link send}, but automatically sets the status to 201 CREATED
     * @param {KoaContext} ctx koa's context object
     * @param {*} [data] the data to be yielded by the requests
     * @param {string} [message] the message to be yielded by the request
     * @return { }
     */

  }, {
    key: 'sendCreated',
    value: function sendCreated(ctx, data, message) {
      return this.send(ctx, Route.StatusCode.created, data, message);
    }

    /**
     * @access public
     * @desc replies with an empty body, yielding 204 NO CONTENT as the status
     * @param {KoaContext} ctx koa's context object
     * @return { }
     */

  }, {
    key: 'sendNoContent',
    value: function sendNoContent(ctx) {
      return this.send(ctx, Route.StatusCode.noContent);
    }

    /**
     * @access public
     * @desc throws a formated error to be caught.
     * @param {number} status the error's HTTP status StatusCode
     * @param {string | object} [error] the error(s) to be yielded by the request
     * @param {boolean} translate indicates whether the message should be translated or not
     * @throws {ErrorApp} thrown error.
     * @return { }
     */

  }, {
    key: 'throw',
    value: function _throw(status, error) {
      var translate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      throw new _ErrorApp2.default(status, error, translate);
    }

    /**
     * @access public
     * @version 2.0.0
     * @desc same as {@link throw}, but automatically sets the status to 400 BAD REQUEST
     * @param {string | object} [error] the error(s) to be yielded by the request, default to "Bad request"
     * @param {boolean} translate indicates whether the message should be translated or not
     * @return { }
     */

  }, {
    key: 'throwBadRequest',
    value: function throwBadRequest(error) {
      var translate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return this.throw(Route.StatusCode.badRequest, error || 'Bad request', translate);
    }

    /**
     * @access public
     * @version 2.0.0
     * @desc same as {@link throw}, but automatically sets the status to 401 UNAUTHORIZED
     * @param {string | object} [error] the error(s) to be yielded by the request, default to "Unauthorized"
     * @param {boolean} translate indicates whether the message should be translated or not
     * @return { }
     */

  }, {
    key: 'throwUnauthorized',
    value: function throwUnauthorized(error) {
      var translate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return this.throw(Route.StatusCode.unauthorized, error || 'Unauthorized', translate);
    }

    /**
     * @access public
     * @version 2.0.0
     * @desc same as {@link throw}, but automatically sets the status to 403 FORBIDDEN
     * @param {string | object} [error] the error(s) to be yielded by the request, default to "Forbidden"
     * @param {boolean} translate indicates whether the message should be translated or not
     * @return { }
     */

  }, {
    key: 'throwForbidden',
    value: function throwForbidden(error) {
      var translate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return this.throw(Route.StatusCode.forbidden, error || 'Forbidden', translate);
    }

    /**
     * @access public
     * @version 2.0.0
     * @desc same as {@link throw}, but automatically sets the status to 404 NOT FOUND
     * @param {string | object} [error] the error(s) to be yielded by the request, default to "Not found"
     * @param {boolean} translate indicates whether the message should be translated or not
     * @return { }
     */

  }, {
    key: 'throwNotFound',
    value: function throwNotFound(error) {
      var translate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return this.throw(Route.StatusCode.notFound, error || 'Not found', translate);
    }

    /**
     * @access public
     * @desc checks a condition. If it evaluates to false, throws a formated error to be caught.
     * @param {boolean} condition if set to false; assert will fail and throw.
     * @param {number} status the error's HTTP status StatusCode
     * @param {string | object} [error] the error(s) to be yielded by the request
     * @param {boolean} translate indicates whether the message should be translated or not
     * @throws {ErrorApp} thrown error, should the assert fail.
     * @return { }
     */

  }, {
    key: 'assert',
    value: function assert(condition, status, error) {
      var translate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!condition) {
        this.throw(status, error, translate);
      }
    }

    /**
     * @access public
     * @version 2.0.0
     * @desc same as {@link assert}, but automatically sets the status to 400 BAD REQUEST
     * @param {boolean} condition if set to false; assert will fail and throw.
     * @param {string | object} [error] the error(s) to be yielded by the request, default to "Bad request"
     * @param {boolean} translate indicates whether the message should be translated or not
     * @throws {ErrorApp} thrown error, should the assert fail.
     * @return { }
     */

  }, {
    key: 'assertBadRequest',
    value: function assertBadRequest(condition, error) {
      var translate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.assert(condition, Route.StatusCode.badRequest, error || 'Bad request', translate);
    }

    /**
     * @access public
     * @version 2.0.0
     * @desc same as {@link assert}, but automatically sets the status to 401 UNAUTHORIZED
     * @param {boolean} condition if set to false; assert will fail and throw.
     * @param {string | object} [error] the error(s) to be yielded by the request, default to "Unauthorized"
     * @param {boolean} translate indicates whether the message should be translated or not
     * @throws {ErrorApp} thrown error, should the assert fail.
     * @return { }
     */

  }, {
    key: 'assertUnauthorized',
    value: function assertUnauthorized(condition, error) {
      var translate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.assert(condition, Route.StatusCode.unauthorized, error || 'Unauthorized', translate);
    }

    /**
     * @access public
     * @version 2.0.0
     * @desc same as {@link assert}, but automatically sets the status to 403 FORBIDDEN
     * @param {boolean} condition if set to false; assert will fail and throw.
     * @param {string | object} [error] the error(s) to be yielded by the request, default to "Forbidden"
     * @param {boolean} translate indicates whether the message should be translated or not
     * @throws {ErrorApp} thrown error, should the assert fail.
     * @return { }
     */

  }, {
    key: 'assertForbidden',
    value: function assertForbidden(condition, error) {
      var translate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.assert(condition, Route.StatusCode.forbidden, error || 'Forbidden', translate);
    }
  }]);
  return Route;
}(), _class.displayLog = true, _class.StatusCode = _StatusCode2.default, _class.Get = _RouteDecorators2.default.Get, _class.Post = _RouteDecorators2.default.Post, _class.Put = _RouteDecorators2.default.Put, _class.Patch = _RouteDecorators2.default.Patch, _class.Delete = _RouteDecorators2.default.Delete, _class.Route = _RouteDecorators2.default.Route, _temp);
exports.default = Route;