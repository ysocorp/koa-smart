import { TypeAny } from './TypeAny';

export class TypeBinary extends TypeAny {
  _encoding; // the desired encoding of buffer
  _length; // the buffer's exact allowed length
  _min; // the buffer's minimum allowed length
  _max; // the buffer's maximum allowed length

  constructor() {
    super('binary');
    this._errorMessages[this._TypeError.INVALIDE_VALUE] = this._getDescription;
  }

  _getDescription = () => {
    // TODO return custom error message
    let msgError = `It should be à binary`;
    return `${msgError}.`;
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
      super._setError(this._TypeError.INVALIDE_TYPE);
    }
  }

  _test() {
    const t = this._TypeError.INVALIDE_VALUE;
    if (this._min != null && this._value < this._min) return this._setError(t);
    if (this._min && this._value.length < this._min) return this._setError(t);
    if (this._max && this._value.length > this._max) return this._setError(t);
    if (this._length && this._value.length !== this._length)
      return this._setError(t);
  }

  _transform() {
    try {
      this._value = Buffer.from(this._value, this._encoding);
    } catch (e) {
      return this._setError(this._TypeError.INVALIDE_VALUE);
    }
  }
}
