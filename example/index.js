import { join } from 'path';

import App from '../App';
import { 
  I18n, 
  bodyParser, 
  compress, 
  cors, 
  helmet,
  addDefaultBody,
  handleError,
  logger,
} from '../middlewares';

const app = new App({
  port: 3001,
});

const i18n = new I18n({
  path: join(__dirname, 'locales'),
});

app.addMiddlewares([
  cors({ credentials: true }),
  helmet(),
  bodyParser(),
  i18n.middleware,
  logger,
  handleError,
  addDefaultBody,
  compress({}),
]);

app.mountFolder(join(__dirname, 'routes'), '/toto');

app.start();
