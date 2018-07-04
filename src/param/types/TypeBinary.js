import { TypeAny } from './TypeAny';

export class TypeBinary extends TypeAny {
  _encoding; // the desired encoding of buffer
  _length; // the buffer's exact allowed length
  _min; // the buffer's minimum allowed length
  _max; // the buffer's maximum allowed length

  constructor() {
    super('binary');
  }

  _generateError() {
    this.error = `Invalid field ${this.key}`;
    return false;
  }

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
      return this._generateError();
    }
    return true;
  }

  _test() {
    if (this._min && this._value.length < this._min) {
      return this._generateError();
    }
    if (this._max && this._value.length > this._max) {
      return this._generateError();
    }
    if (this._length && this._value.length !== this._length) {
      return this._generateError();
    }
    return true;
  }

  _transform() {
    try {
      this._value = Buffer.from(this._value, this._encoding);
    } catch (e) {
      this._generateError();
    }
  }
}
