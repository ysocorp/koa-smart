import compress from 'koa-compress';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import passport from 'koa-passport';
import { RateLimit, Stores as RateLimitStores } from 'koa2-ratelimit';

import I18n from './I18n';
import addDefaultBody from './addDefaultBody';
import handleError from './handleError';
import logger from './logger';

module.exports = {
  passport,
  cors,
  helmet,
  bodyParser,
  compress,
  I18n,
  addDefaultBody,
  handleError,
  logger,
  RateLimit,
  RateLimitStores,
};
