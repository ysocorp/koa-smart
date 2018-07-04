import { TypeAny } from './TypeAny';

export class TypeOneOf extends TypeAny {
  _types = [];
  _errors = [];

  constructor() {
    super('object');
  }

  types(...rest) {
    this._types = [...rest];
    return this;
  }

  // Function when test and transform param

  _generateError() {
    this.error = `Invalid field ${this.key} should be a valide object`;
  }

  _testType() {
    /* overload */
    return true;
  }

  _test() {
    let isOneOk = false;
    for (const t of this._types) {
      t.required(this._required);
      t.test(this._value);
      if (!isOneOk && !t.error) {
        isOneOk = true;
        this._value = t.value;
      }
      if (t.error) {
        this._errors.push(t.error);
      }
    }
    if (!isOneOk) {
      this.error = this._errors.join('.');
    }

    return isOneOk;
  }
}
