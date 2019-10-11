import { castArray } from '../utils/utils';
import { TypeAny } from './TypeAny';

export class TypeArray extends TypeAny {
  _tSingle = false; // whether single values are allowed
  _tSplitBy;
  _length; // the array's exact allowed length
  _min; // the array's minimum allowed length
  _max; // the array's maximum allowed length
  _innerType; // the array's inner type

  constructor(params: any = {}) {
    super({ ...params, type: 'Array' });
    this._errorMessages[
      this._TypeError.INVALID_TYPE
    ] = this._getErrorInvalidValue;
  }

  _getErrorInvalidValue({ _i18n }, key): string {
    if (key === 'type') {
      return _i18n.__('Should be an array');
    }
    if (key === 'length') {
      return _i18n.__('Expected %d items', this._length);
    }
    if (key === 'min') {
      return _i18n.__('Less than %d items', this._min);
    }
    if (key === 'max') {
      return _i18n.__('More than %d items', this._max);
    }
    if (key === 'innerType') {
      return _i18n.__('Invalid item');
    }
    return _i18n.__('Error');
  }

  _getDescription(prefix = 'It should be ') {
    const msgError = `${prefix}an array`;
    const paramsDesc: Array<string> = [];
    if (this._length) {
      paramsDesc.push(`exactly ${this._length} items`);
    }
    if (this._min) {
      paramsDesc.push(`a minimum of ${this._min} items`);
    }
    if (this._max) {
      paramsDesc.push(`a maximum of ${this._max} items`);
    }
    if (this._innerType) {
      paramsDesc.push(
        `each item being ${this._innerType._getDescription('').slice(0, -1)}`
      );
    }
    const paramMsg = this._generateParamDescription(paramsDesc, ' with');
    return `${msgError}${paramMsg}.`;
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
      this._setError(this._TypeError.INVALID_TYPE, 'type');
      return false;
    }
    return true;
  }

  _test() {
    if (this._min && this._value.length < this._min) {
      return this._setError(this._TypeError.INVALID_VALUE, 'min');
    }
    if (this._max && this._value.length > this._max) {
      return this._setError(this._TypeError.INVALID_VALUE, 'max');
    }
    if (this._length && this._value.length !== this._length) {
      return this._setError(this._TypeError.INVALID_VALUE, 'length');
    }
    if (this._innerType && this._value) {
      let innerTypeError = null;
      for (let i = 0; i < this._value.length; i++) {
        this._innerType.test(this._value[i]);
        if (this._innerType.error) {
          innerTypeError = this._innerType.error;
          break;
        }
        this._value[i] = this._innerType.value;
      }
      if (innerTypeError) {
        return this._setError(this._TypeError.INVALID_TYPE, 'innerType');
      }
    }
    return true;
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
