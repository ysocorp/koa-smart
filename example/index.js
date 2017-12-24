import { join } from 'path';

import App from '../src/App';
import {
  i18n,
  bodyParser, 
  compress, 
  cors, 
  helmet,
  addDefaultBody,
  handleError,
  logger,
} from '../src/middlewares';

const myApp = new App({
  port: 3001,
});

const i18nMd = i18n(myApp.app, {
  directory: join(__dirname, 'locales'),
  locales: ['en', 'fr'],
  modes: ['query', 'subdomain', 'cookie', 'header', 'tld'],
})

myApp.addMiddlewares([
  cors({ credentials: true }),
  helmet(),
  bodyParser(),
  i18nMd,
  logger,
  handleError,
  addDefaultBody,
  compress({}),
]);

myApp.mountFolder(join(__dirname, 'routes'), '/toto');

myApp.start();
