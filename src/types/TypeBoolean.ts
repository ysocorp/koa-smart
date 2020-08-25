import uniq from 'lodash.uniq';

import { TypeAny } from './TypeAny';
import utils from '../utils';

export class TypeBoolean extends TypeAny {
  _truthyValues = ['true']; // Specifies additional values to be considered as 'truthy'
  _falsyValues = ['false']; // Specifies additional values to be considered as 'falsy'
  _insensitive = true;

  constructor(params = { i18n: {} }) {
    super({ ...params, type: 'boolean' });
  }

  _getErrorInvalidValue = ({ _i18n }) => _i18n.__('Should be a boolean');

  _getDescription = (prefix = 'It should be ') => {
    const valideValue = [...this._truthyValues, ...this._falsyValues];
    return `${prefix}a boolean or one of: (${utils.joinWithCote(
      valideValue,
      ', '
    )}).`;
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
    this._truthyValues = uniq([
      ...this._truthyValues,
      ...utils.castArray(vals),
    ]);
    return this;
  }

  falsy(vals = []) {
    this._falsyValues = uniq([...this._falsyValues, ...utils.castArray(vals)]);
    return this;
  }

  insensitive(val = true) {
    this._insensitive = val;
    return this;
  }

  _testType() {
    if (!['boolean', 'string', 'number'].includes(typeof this._value)) {
      this._setError(this._TypeError.INVALID_TYPE);
      return false;
    }
    return true;
  }

  _test() {
    if (typeof this._value !== 'boolean') {
      this._setError(this._TypeError.INVALID_VALUE);
      return false;
    }
    return true;
  }

  _transform() {
    if (this._insensitive) {
      this._falsyValues = this._insensitiveArray(this._falsyValues);
      this._truthyValues = this._insensitiveArray(this._truthyValues);
      if (typeof this._value === 'string') {
        this._value = this._value.toLocaleLowerCase();
      }
    }

    if (this._truthyValues.includes(this._value)) {
      this._value = true;
    } else if (this._falsyValues.includes(this._value)) {
      this._value = false;
    }
  }
}
