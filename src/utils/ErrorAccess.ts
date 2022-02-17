import ErrorApp from './ErrorApp';

export default class ErrorAccess extends ErrorApp {
  constructor(status, message, toTranslate = false) {
    super(status, message, toTranslate);
    this.typeError = 'ErrorAccess';
  }
}
