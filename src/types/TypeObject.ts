import { TypeAny } from './TypeAny';

export class TypeObject extends TypeAny {
  _schema = {};
  _errors = {};
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

  keys(object) {
    this._schema = { ...this._schema, ...object };
    return this;
  }

  get errors() {
    return Object.keys(this._errors).length ? this._errors : null;
  }

  _addError(key, param) {
    if (param.errors) {
      const errors = param.errors;
      for (const keyError in errors) {
        if (errors.hasOwnProperty(keyError)) {
          this._errors[`${key}.${keyError}`] = errors[keyError];
        }
      }
    } else {
      this._errors[key] = param.error;
    }

    const keys = Object.keys(this._errors);
    if (keys.length) {
      super._setError(
        this._TypeError.INVALID_VALUE,
        'add',
        keys[0],
        this._errors[keys[0]].msg
      );
    }
    this._hasError = true;
    return this._hasError;
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
