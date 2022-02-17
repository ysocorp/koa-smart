import ErrorYt from './ErrorYt';

export default class ErrorYtBody extends ErrorYt {
  constructor(status, message, toTranslate = false) {
    super(status, message, toTranslate);
    this.typeError = 'ErrorYtBody';
  }
}
