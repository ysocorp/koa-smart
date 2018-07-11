import { TypeAny } from './TypeAny';

export class TypeObject extends TypeAny {
  _schema = {};
  _errors = {};

  constructor() {
    super('object');

    this._errorMessages[this._TypeError.INVALIDE_VALUE] = this._getDescription;
  }

  _getDescription = () => {
    // TODO
    return `It should be an object`;
  };

  _initValues(value) {
    super._initValues(value);
    this._errors = {};
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
        this._errors[`${key}.${keyError}`] = errors[keyError];
      }
    } else {
      this._errors[key] = param.error;
    }

    const keys = Object.keys(this._errors);
    const errorsStr = keys.map(k => `${k}: ${this._errors[k]}`);
    if (errorsStr && keys.length) {
      super._setError(this._TypeError.INVALIDE_VALUE);
    }
    this._hasError = true;
    return this._hasError;
  }

  _test() {
    const oldValue = { ...this._value };
    this._value = {};

    for (const key in this._schema) {
      const param = this._schema[key];
      param.test(oldValue[key]);
      if (param.error) {
        this._addError(key, param);
      } else {
        this._value[key] = param.value;
      }
    }

    return true;
  }
}
