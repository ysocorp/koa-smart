'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _fs = require('fs');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaLocale = require('koa-locale');

var _koaLocale2 = _interopRequireDefault(_koaLocale);

var _Route = require('./routes/Route');

var _Route2 = _interopRequireDefault(_Route);

var _notFound = require('./middlewares/notFound');

var _notFound2 = _interopRequireDefault(_notFound);

var _utils = require('./utils/utils');

var _docGenerator = require('./utils/docGenerator');

var docGenerator = _interopRequireWildcard(_docGenerator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function () {
  /**
   * @ignore
   */
  function App(opt) {
    (0, _classCallCheck3.default)(this, App);
    this.routeParam = null;
    this.routes = {};
    var _opt$routeParam = opt.routeParam,
        routeParam = _opt$routeParam === undefined ? {} : _opt$routeParam,
        _opt$port = opt.port,
        port = _opt$port === undefined ? process.env.PORT || 3000 : _opt$port,
        _opt$docPath = opt.docPath,
        docPath = _opt$docPath === undefined ? (0, _path.join)(__dirname, '..', 'apidoc') : _opt$docPath,
        _opt$generateDoc = opt.generateDoc,
        generateDoc = _opt$generateDoc === undefined ? false : _opt$generateDoc;

    this.routeParam = routeParam;
    /**
     * @ignore
     * @type {number}
     */
    this.port = port;
    /**
     * @ignore
     * @type {Koa}
     */
    this.koaApp = new _koa2.default();

    (0, _koaLocale2.default)(this.koaApp);

    docGenerator.init(docPath, generateDoc);
  }

  /**
   * @ignore
   */

  /**
   * @ignore
   */


  (0, _createClass3.default)(App, [{
    key: '_getAllRoutes',
    value: function _getAllRoutes(path, prefix) {
      var _this = this;

      this.routes[prefix] = this.routes[prefix] || {};

      (0, _fs.readdirSync)(path).filter(function (file) {
        return file.endsWith('.js') || file.endsWith('.ts');
      }).forEach(function (file) {
        var RouteClass = require((0, _path.join)(path, file)).default;
        if (RouteClass && RouteClass.prototype instanceof _Route2.default) {
          var route = new RouteClass((0, _extends3.default)({
            prefix: prefix,
            koaApp: _this.koaApp,
            routes: _this.routes[prefix]
          }, _this.routeParam));
          _this.routes[prefix][route.constructor.name] = route;
        }
      });
      return (0, _utils.objValToArray)(this.routes[prefix]);
    }

    /**
     * @access public
     * @desc adds the provided functions to the list of Koa middlewares to be executed for all routes.
     * @param {function} middlewares an array of Koa-compliant middlewares
     * @return { }
     */

  }, {
    key: 'addMiddlewares',
    value: function addMiddlewares(middlewares) {
      var _this2 = this;

      middlewares.forEach(function (e) {
        return _this2.addMiddleware(e);
      });
    }

    /**
     * @access public
     * @desc adds the provided function to the list of Koa middlewares to be executed for all routes.
     * @param {function[]} middleware an array of middlewares
     * @return { }
     */

  }, {
    key: 'addMiddleware',
    value: function addMiddleware(middleware) {
      this.koaApp.use(middleware);
    }

    /**
     * @access public
     * @desc "mounts" a folder, scanning it for route files, then adding the discovered routes to the app.
     *       a route is a class which extends {@link Route}
     * @param {string} pathFolder the path of the folder to mount
     * @param {string} [prefix='/'] an optional prefix to prepend to all of the folder's routes
     * @return { }
     */

  }, {
    key: 'mountFolder',
    value: function mountFolder(pathFolder) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';
      var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _opt$generateDoc2 = opt.generateDoc,
          generateDoc = _opt$generateDoc2 === undefined ? true : _opt$generateDoc2;

      var routes = this._getAllRoutes(pathFolder, prefix);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(routes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var route = _step.value;

          route.generateDoc = generateDoc;
          route.mount();
          this.koaApp.use(route.koaRouter.middleware());
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

    /**
     * @access public
     * @desc Launches the app and starts listening on the configured port.
     * @return {Koa}
     */

  }, {
    key: 'start',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.koaApp.use((0, _notFound2.default)());

                docGenerator.end();

                return _context.abrupt('return', this.koaApp.listen(this.port));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }]);
  return App;
}();

exports.default = App;