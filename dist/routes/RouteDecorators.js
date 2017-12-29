'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouteDecorators = function () {
  function RouteDecorators() {
    (0, _classCallCheck3.default)(this, RouteDecorators);
  }

  (0, _createClass3.default)(RouteDecorators, null, [{
    key: '_getRouteFromMethode',

    // replace A-Z to lowercase and add - ex myFunc => my-func
    value: function _getRouteFromMethode(str) {
      return str.replace(/([A-Z])/g, function (str, letter, index) {
        return index === 0 ? '' + letter.toLowerCase() : '-' + letter.toLowerCase();
      });
    }
  }, {
    key: '_initData',
    value: function _initData(target) {
      target.routes = target.routes || {
        get: [],
        post: [],
        delete: [],
        patch: [],
        put: []
      };
      if (target.routeBase === undefined) {
        target.routeBase = target.constructor.name.replace('Route', '');
        target.routeBase = RouteDecorators._getRouteFromMethode(target.routeBase);
      }
    }
  }, {
    key: 'Route',
    value: function Route(_ref) {
      var routeBase = _ref.routeBase,
          _ref$disable = _ref.disable,
          disable = _ref$disable === undefined ? false : _ref$disable,
          _ref$middlewares = _ref.middlewares,
          middlewares = _ref$middlewares === undefined ? null : _ref$middlewares;

      return function (target, key, descriptor) {
        // eslint-disable-line no-unused-vars
        if (routeBase != null) {
          // null or undefined
          target.prototype.routeBase = routeBase;
        }
        if (disable != null) {
          target.prototype.disable = disable;
        }
        if (Array.isArray(middlewares)) {
          target.prototype.middlewares = middlewares;
        }
        RouteDecorators._initData(target);
      };
    }
  }, {
    key: '_addRoute',
    value: function _addRoute(type) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return function (target, functionName, descriptor) {
        RouteDecorators._initData(target);
        options = (0, _extends3.default)({
          path: undefined,
          accesses: [],
          params: {},
          routeBase: target.routeBase
        }, options);
        (0, _defineProperty2.default)(target, functionName, descriptor);

        var routeName = options.path === undefined ? RouteDecorators._getRouteFromMethode(functionName) : options.path;

        target.routeBase = options.routeBase;
        target.routes[type].push({
          path: routeName,
          options: options,
          call: target[functionName]
        });
      };
    }
  }, {
    key: 'Get',
    value: function Get(params) {
      return function (target, key, descriptor) {
        var fuc = RouteDecorators._addRoute('get', params);
        fuc(target, key, descriptor);
      };
    }
  }, {
    key: 'Post',
    value: function Post(params) {
      return function (target, key, descriptor) {
        var fuc = RouteDecorators._addRoute('post', params);
        fuc(target, key, descriptor);
      };
    }
  }, {
    key: 'Patch',
    value: function Patch(params) {
      return function (target, key, descriptor) {
        var fuc = RouteDecorators._addRoute('patch', params);
        fuc(target, key, descriptor);
      };
    }
  }, {
    key: 'Put',
    value: function Put(params) {
      return function (target, key, descriptor) {
        var fuc = RouteDecorators._addRoute('put', params);
        fuc(target, key, descriptor);
      };
    }
  }, {
    key: 'Delete',
    value: function Delete(params) {
      return function (target, key, descriptor) {
        var fuc = RouteDecorators._addRoute('delete', params);
        fuc(target, key, descriptor);
      };
    }
  }]);
  return RouteDecorators;
}();

exports.default = RouteDecorators;