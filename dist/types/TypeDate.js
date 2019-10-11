"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const TypeAny_1 = require("./TypeAny");
class TypeDate extends TypeAny_1.TypeAny {
    constructor(params = { i18n: {} }) {
        super(Object.assign(Object.assign({}, params), { type: 'date' }));
    }
    _getErrorInvalidValue({ _i18n, _max, _min }, key) {
        key = this._errorKey || key;
        this._errorKey = key;
        if (key === 'max') {
            return _i18n.__('Is before %s', _max.toDateString());
        }
        if (key === 'min') {
            return _i18n.__('Is after %s', _min.toDateString());
        }
        if (key === 'invalid') {
            return _i18n.__('Invalid date');
        }
        return null;
    }
    _getDescription(prefix = 'It should be ') {
        const msgError = `${prefix}a date`;
        const paramsDesc = [];
        if (this._max) {
            paramsDesc.push(`is before ${this._max.toDateString()}`);
        }
        if (this._min) {
            paramsDesc.push(`is after ${this._min.toDateString()}`);
        }
        if (this._formatIn) {
            paramsDesc.push(`is formated as ${typeof this._formatIn === 'function' ? 'ISO_8601' : this._formatIn}`);
        }
        const paramMsg = this._generateParamDescription(paramsDesc, ' which');
        return `${msgError}${paramMsg}.`;
    }
    _isValid(date) {
        return date && !isNaN(date.getTime());
    }
    _formatDateIfEnabled(value) {
        if (this._formatIn) {
            const date = moment_1.default(value, this._formatIn, true);
            return date.isValid() ? date.toDate() : new Date(value);
        }
        else {
            return new Date(value);
        }
    }
    min(min) {
        this._min = min;
        return this;
    }
    max(max) {
        this._max = max;
        return this;
    }
    startOf(period) {
        this._startOf = period;
        return this;
    }
    endOf(period) {
        this._endOf = period;
        return this;
    }
    between(min, max) {
        this._min = min;
        this._max = max;
        return this;
    }
    iso() {
        this._formatIn = moment_1.default.ISO_8601;
        return this;
    }
    formatIn(format) {
        this._formatIn = format;
        return this;
    }
    formatOut(format) {
        this._formatOut = format;
        return this;
    }
    _testType() {
        return true;
    }
    _test() {
        super._test();
        const t = this._TypeError.INVALID_VALUE;
        if (!this._isValid(this._value)) {
            return this._setError(t, 'invalid');
        }
        if (this._min &&
            moment_1.default(this._value).isBefore(this._formatDateIfEnabled(this._min))) {
            return this._setError(t, 'min');
        }
        if (this._max &&
            moment_1.default(this._value).isAfter(this._formatDateIfEnabled(this._max))) {
            return this._setError(t, 'max');
        }
        if (this._formatOut) {
            this._value = moment_1.default(this._value).format(this._formatOut);
            if (this._value === 'Invalid date') {
                return this._setError(t, 'invalid');
            }
        }
        return true;
    }
    _transform() {
        this._value = this._formatDateIfEnabled(this._value);
        if (this._startOf) {
            this._value = moment_1.default(this._value)
                .startOf(this._startOf)
                .toDate();
        }
        if (this._endOf) {
            this._value = moment_1.default(this._value)
                .endOf(this._endOf)
                .toDate();
        }
    }
}
exports.TypeDate = TypeDate;
//# sourceMappingURL=TypeDate.js.map