"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAny = exports.TypeError = void 0;
const i18n_2_1 = __importDefault(require("i18n-2"));
const path_1 = require("path");
exports.TypeError = {
    ALL: 'ALL',
    REQUIRED: 'REQUIRED',
    IS_NULL: 'IS_NULL',
    INVALID_TYPE: 'INVALID_TYPE',
    INVALID_VALUE: 'INVALID_VALUE',
};
class TypeAny {
    constructor({ type = null, i18n }) {
        this._TypeError = Object.assign({}, exports.TypeError);
        this._type = null;
        this._errors = {};
        this._hasError = false;
        this._isValueNull = false;
        this._errorCodes = {
            [this._TypeError.ALL]: 1,
            [this._TypeError.REQUIRED]: 2,
            [this._TypeError.IS_NULL]: 3,
            [this._TypeError.INVALID_TYPE]: 4,
            [this._TypeError.INVALID_VALUE]: 5,
        };
        this._errorMessages = {
            [this._TypeError.ALL]: null,
            [this._TypeError.REQUIRED]: () => this._i18n.__('Is required'),
            [this._TypeError.IS_NULL]: () => this._i18n.__('Cannot be null'),
            [this._TypeError.INVALID_TYPE]: () => this._i18n.__('Expected type %s', this._type),
            [this._TypeError.INVALID_VALUE]: (obj, ...args) => this._getErrorInvalidValue(obj, ...args),
        };
        // options
        this._isRequired = false;
        this._notNull = false;
        this._default = undefined;
        this._value = null;
        this._getErrorInvalidValue = ({ _i18n }, ...rest) => {
            if (rest || !rest) {
            }
            return _i18n.__('Invalid field');
        };
        this._getDescription = (prefix = 'It should be') => `${prefix} any type.`;
        this._type = type;
        this._i18nConfig = Object.assign({ directory: (0, path_1.join)(__dirname, 'i18n'), locales: ['en', 'fr'], extension: '.json' }, i18n);
        this._i18n = new i18n_2_1.default(this._i18nConfig);
    }
    clone() {
        const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        clone._i18n = new i18n_2_1.default(this._i18nConfig);
        return clone;
    }
    setErrorMsg(msg, typeError = exports.TypeError.ALL) {
        const type = exports.TypeError[typeError] ? typeError : exports.TypeError.ALL;
        if (typeof msg === 'function') {
            this._errorMessages[type] = msg;
        }
        else {
            this._errorMessages[type] = () => this._i18n.__(msg);
        }
        return this;
    }
    setLocale(locale) {
        this._i18n.setLocale(locale);
        return this;
    }
    _generateParamDescription(params, prefix = '') {
        if (!params.length) {
            return '';
        }
        if (params.length === 1) {
            return `${prefix} ${params[0]}`;
        }
        const firstPartRes = params.slice(0, -1).join(', ');
        return `${prefix} ${firstPartRes} and ${params[params.length - 1]}`;
    }
    get value() {
        if (this._default != null && (this._value == null || this._hasError)) {
            return this._default;
        }
        return this._value;
    }
    set value(val) {
        this._value = val;
    }
    _fnMessage(typeCode, { _i18n, _errorMessages, _TypeError }, ...rest) {
        if (_errorMessages[_TypeError.ALL]) {
            return _errorMessages[_TypeError.ALL]({ _i18n }, ...rest);
        }
        if (_errorMessages[typeCode]) {
            return _errorMessages[typeCode]({ _i18n }, ...rest);
        }
        return _i18n;
    }
    _setError(typeCode, ...rest) {
        // skip error if has a default value
        if (this._default == null) {
            this._error =
                this._fnMessage(typeCode, this, ...rest) ||
                    this._i18n.__('Invalid field');
            this._codeError = this._errorCodes[typeCode];
        }
        this._hasError = true;
        return this._hasError;
    }
    set error({ msg }) {
        // skip error if has a default value
        if (this._default == null) {
            this._error = msg;
        }
        this._hasError = true;
    }
    get error() {
        if (!this._error) {
            return null;
        }
        return {
            msg: this._error,
            code: this.codeError,
        };
    }
    get errors() {
        return Object.keys(this._errors).length ? this._errors : null;
    }
    _addError(key, param) {
        if (param.errors) {
            const errors = param.errors;
            for (const keyError in errors) {
                if (errors.hasOwnProperty(keyError)) {
                    this._errors[`${key}.${keyError}`] = errors[keyError];
                }
            }
        }
        else {
            this._errors[key] = param.error;
        }
        const keys = Object.keys(this._errors);
        if (keys.length) {
            this._setError(this._TypeError.INVALID_VALUE, 'add', keys[0], this._errors[keys[0]].msg);
        }
        this._hasError = true;
        return this._hasError;
    }
    get codeError() {
        return this._codeError;
    }
    get codeMsg() {
        return this._error;
    }
    default(val) {
        this._default = val;
        return this;
    }
    required(val = true) {
        this._isRequired = val;
        this.allowNull(!val);
        return this;
    }
    allowNull(val = true) {
        this._notNull = !val;
        return this;
    }
    // Function when test and transform param
    test(value) {
        this._initValues(value);
        if (!this._testExist() || this._hasError) {
            return;
        }
        if (this._testNull() || this._hasError || this._isValueNull) {
            return;
        }
        if (!this._testType() || this._hasError) {
            return;
        }
        this._transform();
        this._test();
    }
    _initValues(value) {
        this._value = value;
        this._error = '';
        this._hasError = false;
        this._isValueNull = false;
    }
    _testExist() {
        const exist = typeof this._value !== 'undefined';
        if (!exist && this._isRequired) {
            this._setError(this._TypeError.REQUIRED);
        }
        return exist;
    }
    _testNull() {
        if (this._value == null && this._notNull) {
            this._setError(exports.TypeError.IS_NULL);
        }
        this._isValueNull = this._value == null;
        return this._isValueNull;
    }
    _testType() {
        if (this._type != null && typeof this._value !== this._type) {
            this._setError(exports.TypeError.INVALID_TYPE);
            return false;
        }
        return true;
    }
    _test() {
        return true;
    }
    _transform() { }
}
exports.TypeAny = TypeAny;
//# sourceMappingURL=TypeAny.js.map