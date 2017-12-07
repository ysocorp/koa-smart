export default class ErrorApp extends Error {
  constructor(status, message, toTranslate = false) {
    super ();
    this.status = status;
    this.message = message;
    this.toTranslate = toTranslate;

    this.constructor = ErrorApp;
  }
}

ErrorApp.prototype = Error.prototype;
