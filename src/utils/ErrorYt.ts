import ErrorApp from './ErrorApp';

export default class ErrorYt extends ErrorApp {
  constructor(status, message, toTranslate = false) {
    super(status, message, toTranslate);
    this.typeError = 'ErrorYt';
  }
}
