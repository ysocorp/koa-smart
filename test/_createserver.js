import { join } from 'path';

import App from '../dist/App';
import {
  bodyParser,
  compress,
  cors,
  helmet,
  addDefaultBody,
  handleError,
  // logger,
} from '../dist/middlewares';

export default async function create(options = {}) {
  const app = new App({
    port: options.port || 3001,
  });

  app.addMiddlewares([
    cors({ credentials: true }),
    helmet(),
    bodyParser(),
    handleError({}),
    // logger(),
    addDefaultBody(),
    compress({}),
  ]);
  app.mountFolder(join(__dirname, '_routes'), '/');
  app.mountFolder(join(__dirname, '_routes/disable'), '/disable');
  app.mountFolder(join(__dirname, '_routes/path'), '/path');

  return app.start();
}
