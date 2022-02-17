import ErrorYt from './ErrorYt';

export default class ErrorYtReturn extends ErrorYt {
  constructor(status, message, toTranslate = false) {
    super(status, message, toTranslate);
    this.typeError = 'ErrorYtReturn';
  }
}
