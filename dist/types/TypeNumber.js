"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeAny_1 = require("./TypeAny");
class TypeNumber extends TypeAny_1.TypeAny {
    constructor(params = { i18n: {} }) {
        super(Object.assign(Object.assign({}, params), { type: 'number' }));
        this._positive = false; // Requires the number to be positive.
        this._negative = false; // Requires the number to be negative.
        // Function when test and transform param
        this._isTypeNum = () => typeof this._value === 'number';
        this._isInteger = () => !!`${this._value}`.match(/^-{0,1}\d+$/);
        this._isFloat = () => !!`${this._value}`.match(/^-?\d+\.\d+$/);
        this._isNumber = () => this._isInteger() || this._isFloat();
    }
    _getErrorInvalidValue({ _i18n }, key) {
        key = this._errorKey || key;
        this._errorKey = key;
        if (key === 'between') {
            return _i18n.__('Is not between %d and %d', this._min, this._max);
        }
        if (key === 'min') {
            return _i18n.__('Is smaller than %d', this._min);
        }
        if (key === 'max') {
            return _i18n.__('Is greater than %d', this._max);
        }
        if (key === 'multiple') {
            return _i18n.__('Is not a multiple of %d', this._multiple);
        }
        if (key === 'positive') {
            return _i18n.__('Is negative');
        }
        if (key === 'negative') {
            return _i18n.__('Is positive');
        }
        return null;
    }
    _getDescription(prefix = 'It should be ') {
        let pN = ' ';
        pN = this._positive ? ' positive ' : pN;
        pN = !this._positive && this._negative ? ' negative ' : pN;
        const msgError = `${prefix}a${pN}number`;
        const paramsDesc = [];
        if (this._min != null && this._max != null) {
            paramsDesc.push(`is between ${this._min} and ${this._max}`);
        }
        else if (this._min != null) {
            paramsDesc.push(`is greater or equal to ${this._min}`);
        }
        else if (this._max != null) {
            paramsDesc.push(`is smaller or equal to ${this._max}`);
        }
        if (this._multiple != null) {
            paramsDesc.push(`is a multiple of ${this._multiple}`);
        }
        return `${msgError}${this._generateParamDescription(paramsDesc, ' which')}.`;
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
    precision(limit, type = 'trunc') {
        this._tPrecision = limit;
        this._tPrecisionType = type;
        return this;
    }
    _testType() {
        if (!this._isNumber()) {
            this._setError(this._TypeError.INVALID_TYPE);
            return false;
        }
        return true;
    }
    _test() {
        const t = this._TypeError.INVALID_VALUE;
        const tMin = this._min != null && this._value < this._min;
        const tMax = this._max != null && this._value > this._max;
        if (tMin && tMax) {
            return this._setError(t, 'between');
        }
        if (tMin) {
            return this._setError(t, 'min');
        }
        if (tMax) {
            return this._setError(t, 'max');
        }
        if (this._multiple != null && this._value % this._multiple !== 0) {
            return this._setError(t, 'multiple');
        }
        if (this._positive && this._value < 0) {
            return this._setError(t, 'positive');
        }
        if (this._negative && this._value >= 0) {
            return this._setError(t, 'negative');
        }
        return true;
    }
    _precisionTo(nb, nbDigit, type) {
        return Math[type](nb * 10 ** nbDigit) / 10 ** nbDigit;
    }
    _transform() {
        if (this._integer) {
            this._value = parseInt(this._value, 10);
        }
        else {
            this._value = parseFloat(this._value);
        }
        if (this._tPrecision >= 0) {
            this._value = this._precisionTo(this._value, this._tPrecision, this._tPrecisionType);
        }
    }
}
exports.TypeNumber = TypeNumber;
//# sourceMappingURL=TypeNumber.js.map