import { castArray } from 'lodash';

import { TypeAny } from './TypeAny';

export class TypeArray extends TypeAny {
  _single = false; // whether single values are allowed
  _length; // the array's exact allowed length
  _min; // the array's minimum allowed length
  _max; // the array's maximum allowed length
  _innerType; // the array's inner type

  constructor() {
    super('object');
    this._errorMessages[this._TypeError.INVALIDE_VALUE] = this._getDescription;
    this._errorMessages[this._TypeError.INVALIDE_TYPE] = this._getDescription;
  }

  _getDescription = () => {
    // TODO return custom error message
    let msgError = 'It should be an array';
    return `${msgError}.`;
  };

  _generateError() {
    this.error = `Invalid field ${this.key}`;
    return false;
  }

  single(enabled = true) {
    this._single = enabled;
    return this;
  }

  max(max) {
    this._max = max;
    return this;
  }

  min(min) {
    this._min = min;
    return this;
  }

  length(length) {
    this._length = length;
    return this;
  }

  type(itemType) {
    this._innerType = itemType;
    return this;
  }

  _testType() {
    if (
      !this._single &&
      !Array.isArray(this._value) &&
      typeof this._value !== 'string'
    ) {
      this._setError(this._TypeError.INVALIDE_TYPE);
    }
  }

  _test() {
    if (this._min && this._value.length < this._min) {
      return this._setError(this._TypeError.INVALIDE_VALUE);
    }
    if (this._max && this._value.length > this._max) {
      return this._setError(this._TypeError.INVALIDE_VALUE);
    }
    if (this._length && this._value.length !== this._length) {
      return this._setError(this._TypeError.INVALIDE_VALUE);
    }
    if (
      this._innerType &&
      this._value &&
      !this._value.every(val => {
        this._innerType.test(val);
        return !this._innerType.error;
      })
    ) {
      return this._setError(this._TypeError.INVALIDE_TYPE);
    }
  }

  _transform() {
    if (typeof this._value === 'string') {
      this._value = this._value.split('');
    } else if (this._single && !Array.isArray(this._value)) {
      this._value = castArray(this._value);
    }
  }
}
