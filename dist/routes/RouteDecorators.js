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

/**
 * @typedef {Object} ParamsMethodDecorator
 * @property {Object.<string, boolean | PostParamsFilter>} params the params describing the route's middlewares,
 *                                                                with the key being the param's name,
 *                                                                and the value describes the way it should be handled.
 *                                                                (only applicable for requests containing a body)
 * @property {string} path the path at which the route will be available.<br/>
 * By default it will take the name of the function and replace uppercase by "-".<br/>
 * ex: a function name addUser will be mount with /add-user
 * @property {boolean} disabled if set to true, the route will be ignored
 * @property {function[]} middlewares an array of Koa Middlewares, which will be mounted for the given route
 * @property {Object} rateLimit a rateLimit object, which lets the user describe the max rate at which a user can access the route
 * @property {function[]} accesses an array of async function, which will be call with ctx, if one of them return true, the current client will access the route. This will overwrite the accesses pass to {ParamsClassDecorator}
 */

/**
 * @typedef {Object} ParamsClassDecorator
 * @property {string} routeBase a prefix which will be preppended all to the route's path
 * @property {boolean} disabled if set to true, all route in the class will be ignored
 * @property {function[]} middlewares an array of Koa Middlewares, which will be mounted for the given route
 * @property {function[]} accesses an array of async function, which will be call (for all routes in the class) with ctx, if one of them return true, the current client will access the route
 */

/**
 *@ignore
 */
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
    value: function Route() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return function (target /*, key, descriptor*/) {
        var opt = (0, _extends3.default)({}, options, { disable: !!options.disable });
        for (var key in opt) {
          if (opt[key] != null) {
            target.prototype[key] = opt[key];
          }
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
          bodyType: null,
          queryType: null,
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