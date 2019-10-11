"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeAny_1 = require("./TypeAny");
class TypeString extends TypeAny_1.TypeAny {
    constructor(params = { i18n: {} }) {
        super(Object.assign(Object.assign({}, params), { type: 'string' }));
        this._tTrim = true;
        this._tTruncate = false;
        this._tUppercase = false;
        this._tLowercase = false;
    }
    _getErrorInvalidValue({ _i18n }, key) {
        key = this._errorKey || key;
        this._errorKey = key;
        if (key === 'length') {
            return _i18n.__('Expected %s characters', this._length);
        }
        else if (key === 'min') {
            return _i18n.__('Shorter than %d characters', this._min);
        }
        else if (key === 'max') {
            return _i18n.__('Longer than %d characters', this._max);
        }
        else if (key === 'regex') {
            return _i18n.__('Doesn\'t match with %s', this._regex.toString());
        }
        return null;
    }
    _getDescription(prefix = 'It should be ') {
        const msgError = `${prefix}a string`;
        const paramsDesc = [];
        if (this._length != null) {
            paramsDesc.push(`exactly ${this._length} characters`);
        }
        if (this._min != null && this._max != null) {
            paramsDesc.push(`between ${this._min} and ${this._max} characters`);
        }
        else if (this._min != null) {
            paramsDesc.push(`at least ${this._min} characters`);
        }
        else if (this._max != null) {
            paramsDesc.push(`a maximum of ${this._max} characters`);
        }
        if (this._regex != null) {
            paramsDesc.push(`that matches with ${this._regex.toString()}`);
        }
        return `${msgError}${this._generateParamDescription(paramsDesc, ' with')}.`;
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
    regex(regex) {
        this._regex = regex;
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
    replace(pattern, replaceWith = '') {
        this._tReplace = { pattern, replaceWith };
        return this;
    }
    _test() {
        const t = this._TypeError.INVALID_VALUE;
        if (this._length && this._value.length !== this._length) {
            return this._setError(t, 'length');
        }
        if (this._min && this._value.length < this._min) {
            return this._setError(t, 'min');
        }
        if (this._max && this._value.length > this._max) {
            return this._setError(t, 'max');
        }
        if (this._regex && !this._value.match(this._regex)) {
            return this._setError(t, 'regex');
        }
        return true;
    }
    _transform() {
        if (this._tTrim) {
            this._value = this._value.trim();
        }
        if (this._tTruncate && this._max) {
            this._value = this._value.substring(0, this._max);
        }
        if (this._tTruncate && this._length) {
            this._value = this._value.substring(0, this._length);
        }
        if (this._tUppercase) {
            this._value = this._value.toUpperCase();
        }
        if (this._tLowercase) {
            this._value = this._value.toLowerCase();
        }
        if (this._tReplace) {
            this._value = this._value.replace(this._tReplace.pattern, this._tReplace.replaceWith);
        }
    }
}
exports.TypeString = TypeString;
//# sourceMappingURL=TypeString.js.map