import { TypeAny } from './TypeAny';
import { utils } from '../utils';

export class TypeEnum extends TypeAny {
  _oneOf = [];
  _insensitive = true;
  _number = true;

  constructor(params = {}) {
    super({ ...params, type: 'enum' });
    this._errorMessages[this._TypeError.INVALID_VALUE] = this._getError;
  }

  _getError = ({ _i18n }) => {
    return _i18n.__('Should be one of %s', utils.joinWithCote(this._oneOf, ', '));
  };

  _getDescription = (prefix = 'It should be ') => {
    return `${prefix}one of: (${utils.joinWithCote(this._oneOf, ', ')}).`;
  };

  _insensitiveArray(array) {
    return array.map(value => {
      if (typeof value === 'string') {
        return value.toLocaleLowerCase();
      }
      return value;
    });
  }

  oneOf(...rest) {
    this._oneOf = [...rest];
    return this;
  }

  insensitive(val = true) {
    this._insensitive = val;
    return this;
  }

  number(val = true) {
    this._number = val;
    return this;
  }

  _testType() {
    if (!['string', 'number'].includes(typeof this._value)) {
      this._setError(this._TypeError.INVALID_TYPE);
    }
  }

  _test() {
    if (!this._oneOf.includes(this._value)) {
      this._setError(this._TypeError.INVALID_VALUE);
    }
  }

  _transform() {
    if (this._insensitive && typeof this._value === 'string') {
      for (const e of this._oneOf) {
        if (typeof e === 'string' && e.toLocaleLowerCase() === this._value.toLocaleLowerCase()) {
          this._value = e;
        }
      }
    }
    if (this._number && !isNaN(parseFloat(this._value))) {
      this._value = parseFloat(this._value);
    }
  }
}
