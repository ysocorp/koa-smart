import { isArray, isObject } from './utils';

export default class ErrorApp extends Error {
  constructor(status, message, toTranslate = false) {
    super();

    /**
     * @type {number}
     */
    this.status = status;

    /**
     * @type {string}
     */
    this.message = null;

    /**
     * @type {Object | Array}
     */
    this.messages = null;

    if (isArray(message) || isObject(message)) {
      this.messages = message;
    } else {
      this.message = message;
    }

    /**
     * @type {boolean}
     */
    this.toTranslate = toTranslate;

    this.constructor = ErrorApp;
  }
}

ErrorApp.prototype = Error.prototype;
