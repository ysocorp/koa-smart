'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _Route = require('./routes/Route');

var _Route2 = _interopRequireDefault(_Route);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _ErrorApp = require('./utils/ErrorApp');

var _ErrorApp2 = _interopRequireDefault(_ErrorApp);

var _StatusCode = require('./utils/StatusCode');

var _StatusCode2 = _interopRequireDefault(_StatusCode);

var _types = require('./types');

var Types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _extends3.default)({
  App: _App2.default,
  Route: _Route2.default,
  ErrorApp: _ErrorApp2.default,
  StatusCode: _StatusCode2.default
}, Types);