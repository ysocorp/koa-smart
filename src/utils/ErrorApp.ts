import { isArray, isObject } from './utils';

export default class ErrorApp implements Error {
  name = 'error';
  status: number | null = null;
  message = '';
  messages: Object | Array<any> | null = null;
  toTranslate: Boolean = false;

  constructor(status, message, toTranslate = false) {
    this.status = status;
    if (isArray(message) || isObject(message)) {
      this.messages = message;
    } else {
      this.message = message;
    }
    this.toTranslate = toTranslate;
  }
}
