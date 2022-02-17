import { TypeAny } from './TypeAny';
import { ObjectTyping } from './TypeTyping';

export class TypeObject<T = any> extends TypeAny {
  _schema = {};
  _errorWithKey;

  constructor(params = { i18n: {} }) {
    super({ ...params, type: 'object' });
  }

  _getErrorInvalidValue = ({ _i18n }, key, keyError, msg) => {
    if (key === 'add') {
      return this._errorWithKey ? `${keyError}: ${msg}` : msg;
    }
    return _i18n.__('Is not an object');
  }

  _getDescription = (prefix = 'It should be ') => `${prefix}an object`;

  _initValues(value) {
    super._initValues(value);
    this._errors = {};
  }

  setErrorMsg(msg, typeError?) {
    super.setErrorMsg(msg, typeError);
    this._errorWithKey = false;
    return this;
  }

  errorWithKey(value = true) {
    this._errorWithKey = value;
    return this;
  }

  keys(object: ObjectTyping<T>) {
    this._schema = { ...this._schema, ...object };
    return this;
  }

  _test() {
    const oldValue = { ...this._value };
    this._value = {};

    for (const key in this._schema) {
      if (this._schema.hasOwnProperty(key)) {
        const param = this._schema[key];

        param.test(oldValue[key]);
        if (param.error) {
          this._addError(key, param);
        } else {
          this._value[key] = param.value;
        }
      }
    }
    return true;
  }
}
