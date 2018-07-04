import { TypeAny } from './TypeAny';

export class TypeObject extends TypeAny {
  _shema = {};
  _errors = {};

  constructor() {
    super('object');
  }

  keys(object) {
    this._shema = { ...this._shema, ...object };
    return this;
  }

  get error() {
    const errorsStr = Object.keys(this._errors).map(
      k => `${k}: ${this._errors[k]}`,
    );
    return errorsStr.join('; ') || this._error;
  }

  set error(elem) {
    super.error = elem;
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

    for (const key in this._shema) {
      const param = this._shema[key];
      param.test(oldValue[key]);
      if (param.error) {
        this._errors[key] = param.error;
      } else {
        this._value[key] = param.value;
      }
    }

    return true;
  }
}
