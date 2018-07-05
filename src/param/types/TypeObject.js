import { TypeAny } from './TypeAny';

export class TypeObject extends TypeAny {
  _schema = {};
  _errors = {};

  constructor() {
    super('object');
  }

  keys(object) {
    this._schema = { ...this._schema, ...object };
    return this;
  }

  _setError(key, value) {
    this._errors[key] = value;
    const keys = Object.keys(this._errors);
    const errorsStr = keys.map(k => `${k}: ${this._errors[k]}`);
    if (errorsStr && keys.length) {
      this.error = errorsStr;
    }
  }

  errors() {
    return this._errors;
  }

  // Function when test and transform param

  _generateError() {
    this.error = `Invalid field ${this.key} should be a valide object`;
  }

  _testType() {
    if (typeof this._value !== this._type) {
      this.error = `Invalid type to ${this.key}`;
      return false;
    }
    return true;
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
