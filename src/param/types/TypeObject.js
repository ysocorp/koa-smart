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

  // Function when test and transform param

  _generateError() {
    this.error = `Invalide field ${this.key} should be a valide object`;
  }

  _test() {
    const oldValue = { ...this.value };
    this.value = {};
    if (this.error) return;

    for (const key in this._shema) {
      const param = this._shema[key];
      console.log('key', oldValue, key);
      param.test({ object: oldValue, key });
      if (param.error) {
        this._errors[key] = param.error;
      } else {
        this.value[key] = param.value;
      }
    }
  }

  _transform() {
    if (this.error) return;
  }
}
