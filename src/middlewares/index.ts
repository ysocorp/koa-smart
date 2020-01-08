import kcompress from 'koa-compress';
import khelmet from 'koa-helmet';
import kbodyParser from 'koa-body';
import kcors from 'kcors';
import ki18n from 'koa-i18n';

export { RateLimit, Stores as RateLimitStores } from 'koa2-ratelimit';
export { default as addDefaultBody } from './addDefaultBody';
export { default as handleError } from './handleError';
export { default as logger } from './logger';

export const compress = kcompress;
export const helmet = khelmet;
export const bodyParser = kbodyParser;
export const cors = kcors;
export const i18n = ki18n;
