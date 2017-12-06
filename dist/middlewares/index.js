'use strict';

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaHelmet = require('koa-helmet');

var _koaHelmet2 = _interopRequireDefault(_koaHelmet);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _kcors = require('kcors');

var _kcors2 = _interopRequireDefault(_kcors);

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _I18n = require('./I18n');

var _I18n2 = _interopRequireDefault(_I18n);

var _addDefaultBody = require('./addDefaultBody');

var _addDefaultBody2 = _interopRequireDefault(_addDefaultBody);

var _handleError = require('./handleError');

var _handleError2 = _interopRequireDefault(_handleError);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  passport: _koaPassport2.default,
  cors: _kcors2.default,
  helmet: _koaHelmet2.default,
  bodyParser: _koaBodyparser2.default,
  compress: _koaCompress2.default,
  I18n: _I18n2.default,
  addDefaultBody: _addDefaultBody2.default,
  handleError: _handleError2.default,
  logger: _logger2.default
};