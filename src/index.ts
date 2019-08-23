import Route from './routes/Route';
import App from './App';
import ErrorApp from './utils/ErrorApp';
import StatusCode from './utils/StatusCode';
import * as Types from './types/index';

module.exports = {
  App,
  Route,
  ErrorApp,
  StatusCode,
  ...Types,
};
