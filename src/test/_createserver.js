import { join } from 'path';

import App from '../App';
import {
  bodyParser,
  compress,
  cors,
  helmet,
  addDefaultBody,
  handleError,
  logger,
} from '../middlewares';


export default async function create(options = {}) {

  const app = new App({
    port: options.port || 3001,
  });

  app.addMiddlewares([
    cors({ credentials: true }),
    helmet(),
    bodyParser(),
    // logger,
    handleError,
    addDefaultBody,
    compress({}),
  ]);
  console.log('********************MOUNT : GENERAL********************')
  app.mountFolder(join(__dirname, '_routes'), '/');
  console.log('********************MOUNT : DISABLE********************')
  app.mountFolder(join(__dirname, '_routes/disable'), '/disable');
  console.log('********************MOUNT : PATH********************')
  app.mountFolder(join(__dirname, '_routes/path'), '/path');

  return app.start();
}
