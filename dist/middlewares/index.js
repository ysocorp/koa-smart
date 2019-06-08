'use strict';

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaHelmet = require('koa-helmet');

var _koaHelmet2 = _interopRequireDefault(_koaHelmet);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _kcors = require('kcors');

var _kcors2 = _interopRequireDefault(_kcors);

var _koa2Ratelimit = require('koa2-ratelimit');

var _koaI18n = require('koa-i18n');

var _koaI18n2 = _interopRequireDefault(_koaI18n);

var _addDefaultBody = require('./addDefaultBody');

var _addDefaultBody2 = _interopRequireDefault(_addDefaultBody);

var _handleError = require('./handleError');

var _handleError2 = _interopRequireDefault(_handleError);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  cors: _kcors2.default,
  helmet: _koaHelmet2.default,
  bodyParser: _koaBody2.default,
  compress: _koaCompress2.default,
  i18n: _koaI18n2.default,
  addDefaultBody: _addDefaultBody2.default,
  handleError: _handleError2.default,
  logger: _logger2.default,
  RateLimit: _koa2Ratelimit.RateLimit,
  RateLimitStores: _koa2Ratelimit.Stores
};