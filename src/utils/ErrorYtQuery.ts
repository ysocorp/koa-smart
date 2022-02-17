import ErrorYt from './ErrorYt';

export default class ErrorYtQuery extends ErrorYt {
  constructor(status, message, toTranslate = false) {
    super(status, message, toTranslate);
    this.typeError = 'ErrorYtQuery';
  }
}
