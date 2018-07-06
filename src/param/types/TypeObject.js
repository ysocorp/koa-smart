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

  keys(object) {
    this._schema = { ...this._schema, ...object };
    return this;
  }

  errors() {
    return this._errors;
  }

  _setError(key, value) {
    this._errors[key] = value;
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
        this._setError(key, param.error);
      } else {
        this._value[key] = param.value;
      }
    }

    return true;
  }
}
