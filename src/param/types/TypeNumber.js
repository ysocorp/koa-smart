import { TypeAny } from './TypeAny';

export class TypeNumber extends TypeAny {
  _min; // Specifies the minimum value where:
  _max; // Specifies the maximum value where:
  _integer; // Requires the number to be an integer (no floating point).
  _multiple; // Specifies that the value must be a multiple of base:
  _positive; // Requires the number to be positive.
  _negative; // Requires the number to be negative.
  _port; // Requires the number to be a TCP port, so between 0 and 65535.

  _tPrecision; // Specifies the maximum number of decimal places where:
  _tPrecisionType; // Specifies the type of precision : floor, ceil, trunc, round

  constructor() {
    super('number');
  }

  min(nb = 0) {
    this._min = nb;
    return this;
  }

  max(nb = Number.MAX_SAFE_INTEGER) {
    this._max = nb;
    return this;
  }

  between(nbMin, nbMax) {
    this.min(nbMin);
    this.max(nbMax);
    return this;
  }

  integer(val = true) {
    this._integer = val;
    return this;
  }

  multiple(base) {
    this._multiple = base;
    return this;
  }

  positive(val = true) {
    this._positive = val;
    return this;
  }

  negative(val = true) {
    this._negative = val;
    return this;
  }

  port(val = true) {
    this._port = val;
    return this;
  }

  precision(limit, type = 'trunc') {
    this._tPrecision = limit;
    this._tPrecisionType = type;
    return this;
  }

  // Function when test and transform param
  _isTypeNum = () => typeof this.value === 'number';
  _isInteger = () => !!`${this.value}`.match(/^-{0,1}\d+$/);
  _isFloat = () => !!`${this.value}`.match(/^-?\d+\.\d+$/);
  _isNumber = () => this._isInteger() || this._isFloat();

  _testType() {
    if (!this._isNumber()) {
      this.error = `Invalid type to param`;
      return false;
    }
    return true;
  }

  _generateError() {
    this.error = `Invalid field ${this.key} should be a valide number`;
  }

  _test() {
    if (this._min != null && this.value < this._min) this._generateError();
    if (this._max != null && this.value > this._max) this._generateError();
    if (this._multiple != null && this.value % this._multiple !== 0)
      this._generateError();
    if (this._positive && this.value < 0) this._generateError();
    if (this._negative && this.value >= 0) this._generateError();
    if (this._port != null && (this.value < 0 || this.value > 65535))
      this._generateError();

    return !!this.error;
  }

  _precisionTo = (nb, nbDigit, type) =>
    Math[type](nb * 10 ** nbDigit) / 10 ** nbDigit;

  _transform() {
    if (this._integer) {
      this.value = parseInt(this.value);
    } else {
      this.value = parseFloat(this.value);
    }

    if (this._tPrecision >= 0)
      this.value = this._precisionTo(
        this.value,
        this._tPrecision,
        this._tPrecisionType,
      );
  }
}
