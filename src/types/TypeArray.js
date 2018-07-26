import { castArray } from 'lodash';

import { TypeAny } from './TypeAny';

export class TypeArray extends TypeAny {
  _tSingle = false; // whether single values are allowed
  _tSplitBy;
  _length; // the array's exact allowed length
  _min; // the array's minimum allowed length
  _max; // the array's maximum allowed length
  _innerType; // the array's inner type

  constructor() {
    super('Array');
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
    this._tSingle = enabled;
    return this;
  }

  splitBy(split) {
    this._tSplitBy = split;
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
    const canSplit = this._tSplitBy != null && typeof this._value === 'string';
    if (!Array.isArray(this._value) && !this._tSingle && !canSplit) {
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
    if (this._innerType && this._value) {
      let test = true;
      for (let i = 0; i < this._value.length; i++) {
        this._innerType.test(this._value[i]);
        if (this._innerType.error) {
          test = false;
          break;
        }
        this._value[i] = this._innerType.value;
      }
      if (!test) return this._setError(this._TypeError.INVALIDE_TYPE);
    }
  }

  _transform() {
    if (this._tSplitBy != null && typeof this._value === 'string') {
      this._value = this._value.split(this._tSplitBy);
    }
    if (this._tSingle && !Array.isArray(this._value)) {
      this._value = castArray(this._value);
    }
  }
}
