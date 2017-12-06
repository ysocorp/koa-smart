'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _Route = require('./routes/Route');

var _Route2 = _interopRequireDefault(_Route);

var _notFound = require('./middlewares/notFound');

var _notFound2 = _interopRequireDefault(_notFound);

var _utils = require('./utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function () {
  function App(_ref) {
    var routeParam = _ref.routeParam,
        port = _ref.port;
    (0, _classCallCheck3.default)(this, App);
    this.routeParam = null;
    this.routes = {};

    this.routeParam = routeParam || {};
    this.port = port || process.env.PORT || 3000;
    this.app = new _koa2.default();
  }

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
            app: _this.app,
            routes: _this.routes[prefix]
          }, _this.routeParam));
          _this.routes[prefix][route.constructor.name] = route;
        }
      });
      return (0, _utils.objValToArray)(this.routes[prefix]);
    }
  }, {
    key: 'addMiddlewares',
    value: function addMiddlewares(middlewares) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(middlewares), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var elem = _step.value;

          this.app.use(elem);
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
  }, {
    key: 'mountFolder',
    value: function mountFolder(pathFolder) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

      var routes = this._getAllRoutes(pathFolder, prefix);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(routes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var route = _step2.value;

          route.mount();
          this.app.use(route.koaRouter.middleware());
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
    }
  }, {
    key: 'start',
    value: function start() {
      this.app.use(_notFound2.default);
      return this.app.listen(this.port);
    }
  }]);
  return App;
}();

exports.default = App;