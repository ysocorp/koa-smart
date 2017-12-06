export default class ErrorApp {
  constructor(status, message, toTranslate = false) {
    this.status = status;
    this.message = message;
    this.toTranslate = toTranslate;
  }
}