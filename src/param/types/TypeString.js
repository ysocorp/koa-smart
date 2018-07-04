import { TypeAny } from './TypeAny';

export class TypeString extends TypeAny {
  _min;
  _max;
  _length;

  _tTrim = true;
  _tTruncate = false;
  _tUppercase = false;
  _tLowercase = false;

  constructor() {
    super('string');
  }

  trim(needTrim = true) {
    this._tTrim = needTrim;
    return this;
  }

  min(nb = 0) {
    this._min = nb;
    return this;
  }

  max(nb = Number.MAX_SAFE_INTEGER) {
    this._max = nb;
    return this;
  }

  length(nb) {
    this._length = nb;
    return this;
  }

  between(nbMin, nbMax) {
    this.min(nbMin);
    this.max(nbMax);
    return this;
  }

  uppercase(val = true) {
    this._tUppercase = val;
    return this;
  }

  lowercase(val = true) {
    this._tLowercase = val;
    return this;
  }

  truncate(val = true) {
    this._tTruncate = val;
    return this;
  }

  // Function when test and transform param

  _generateError() {
    this.error = `Invalid field ${this.key}`;
  }

  _test() {
    if (this._length && this.value.length !== this._length)
      this._generateError();
    if (this._min && this.value.length < this._min) this._generateError();
    if (this._max && this.value.length > this._max) this._generateError();

    return !!this.error;
  }

  _transform() {
    if (this.error) return;

    if (this._tTrim) this.value = this.value.trim();
    if (this._tTruncate && this._max)
      this.value = this.value.substring(0, this._max);
    if (this._tTruncate && this._length)
      this.value = this.value.substring(0, this._length);
    if (this._tUppercase) this.value = this.value.toUpperCase();
    if (this._tLowercase) this.value = this.value.toLowerCase();
  }
}
