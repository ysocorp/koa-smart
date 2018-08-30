import { TypeAny } from './TypeAny';

export class TypeBinary extends TypeAny {
  _encoding; // the desired encoding of buffer
  _length; // the buffer's exact allowed length
  _min; // the buffer's minimum allowed length
  _max; // the buffer's maximum allowed length

  constructor(params = {}) {
    super({ ...params, type: 'binary' });
    this._errorMessages[this._TypeError.INVALID_VALUE] = this._getError;
  }

  _getError = ({ _i18n }, key) => {
    key = this._errorKey || key;
    this._errorKey = key;

    if (key === 'length') return _i18n.__('Expected %d bytes', this._length);
    else if (key === 'min') return _i18n.__('Smaller than %d bytes', this._min);
    else if (key === 'max') return _i18n.__('Bigger than %d bytes', this._max);
    return null;
  };

  _getDescription = (prefix = 'It should be ') => {
    let msgError = `${prefix}a binary`;
    const paramsDesc = [];
    if (this._encoding) {
      paramsDesc.push(`a ${this._encoding} encoding`);
    }
    if (this._length) {
      paramsDesc.push(`an exact size of ${this._length} bytes`);
    }
    if (this._min) {
      paramsDesc.push(`a minimum size of ${this._min} bytes`);
    }
    if (this._max) {
      paramsDesc.push(`a maximum size of ${this._max} bytes`);
    }
    const paramMsg = this._generateParamDescription(paramsDesc, ' with');
    return `${msgError}${paramMsg}.`;
  };

  encoding(encodingName) {
    this._encoding = encodingName;
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

  _testType() {
    if (this._encoding && !Buffer.isEncoding(this._encoding)) {
      super._setError(this._TypeError.INVALID_TYPE, 'encoding');
    }
  }

  _test() {
    const t = this._TypeError.INVALID_VALUE;
    if (this._min != null && this._value < this._min) return this._setError(t, 'min');
    if (this._min && this._value.length < this._min) return this._setError(t, 'min');
    if (this._max && this._value.length > this._max) return this._setError(t, 'max');
    if (this._length && this._value.length !== this._length) return this._setError(t, 'length');
  }

  _transform() {
    try {
      this._value = Buffer.from(this._value, this._encoding);
    } catch (e) {
      return this._setError(this._TypeError.INVALID_TYPE);
    }
  }
}
