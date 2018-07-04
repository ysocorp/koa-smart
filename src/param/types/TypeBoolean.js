import { castArray } from 'lodash';

import { TypeAny } from './TypeAny';

export class TypeBoolean extends TypeAny {
  _truthyValues = []; // Specifies additional values to be considered as 'truthy'
  _falsyValues = []; // Specifies additional values to be considered as 'falsy'
  _insensitive = true;

  constructor() {
    super('boolean');
  }

  _generateError() {
    this.error = `Invalid field ${this.key}`;
  }

  _insensitiveArray(array) {
    return array.map(value => {
      if (typeof value === 'string') {
        return value.toLocaleLowerCase();
      }
      return value;
    });
  }

  truthy(vals = []) {
    this._truthyValues = castArray(vals);
    return this;
  }

  falsy(vals = []) {
    this._falsyValues = castArray(vals);
    return this;
  }

  insensitive(val = true) {
    this._insensitive = val;
    return this;
  }

  _testType() {
    return ['boolean', 'string', 'number'].includes(typeof this._value);
  }

  _test() {
    if (typeof this._value !== 'boolean') {
      this._generateError();
      return false;
    }
    return true;
  }

  _transform() {
    if (this.error) return;
    if (this._insensitive) {
      this._falsyValues = this._insensitiveArray(this._falsyValues);
      this._truthyValues = this._insensitiveArray(this._truthyValues);
      if (typeof this._value === 'string') {
        this._value = this._value.toLocaleLowerCase();
      }
    }
    if (this._truthyValues.includes(this._value) || this._value === 'true') {
      this._value = true;
      return;
    }
    if (this._falsyValues.includes(this._value) || this._value === 'false') {
      this._value = false;
      return;
    }
  }
}
