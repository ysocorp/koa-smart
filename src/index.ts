import Route from './routes/Route';
import App from './App';
import ErrorApp from './utils/ErrorApp';
import StatusCode from './utils/StatusCode';
import * as Types from './types/index';
import * as middlewares from './middlewares/index';

export = {
  App,
  Route,
  ErrorApp,
  StatusCode,
  middlewares,
  ...Types,
};
