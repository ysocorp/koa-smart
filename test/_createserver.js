import { join } from 'path';

import App from '../dist/App';
import {
  bodyParser,
  i18n,
  compress,
  cors,
  helmet,
  addDefaultBody,
  handleError,
  // logger,
} from '../dist/middlewares';

import { Types } from '../dist';

Types.init({
  i18n: {
    directory: join(__dirname, 'locales', 'types'),
  },
});

export default async function create(options = {}) {
  const app = new App({
    port: options.port || 3331,
    generateDoc: true, // indicates we want koa-smart to generate documentation
    docPath: join(__dirname, '..', 'apidoc'),
  });

  app.addMiddlewares([
    cors({ credentials: true }),
    helmet(),
    bodyParser(),
    i18n(app.koaApp, {
      directory: join(__dirname, 'locales'),
      locales: ['en', 'fr'],
      modes: ['query', 'subdomain', 'cookie', 'header', 'tld'],
    }), // allows us to easily localize the API
    handleError({}),
    // logger(),
    addDefaultBody(),
    compress({}),
  ]);
  app.mountFolder(join(__dirname, '_routes'), '/');
  app.mountFolder(join(__dirname, '_routes/disable'), '/disable');
  app.mountFolder(join(__dirname, '_routes/path'), '/path');
  app.mountFolder(join(__dirname, '_routes/accesses'), '/accesses');

  return app.start();
}
