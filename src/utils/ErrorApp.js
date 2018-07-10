export default class ErrorApp extends Error {
  constructor(status, message, toTranslate = false) {
    super ();

    /**
     * @type {number}
     */
    this.status = status;

    /**
     * @type {string}
     */
    this.message = message;

    /**
     * @type {boolean}
     */
    this.toTranslate = toTranslate;

    this.constructor = ErrorApp;
  }
}

ErrorApp.prototype = Error.prototype;
