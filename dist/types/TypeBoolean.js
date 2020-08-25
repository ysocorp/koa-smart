"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeBoolean = void 0;
const lodash_uniq_1 = __importDefault(require("lodash.uniq"));
const TypeAny_1 = require("./TypeAny");
const utils_1 = __importDefault(require("../utils"));
class TypeBoolean extends TypeAny_1.TypeAny {
    constructor(params = { i18n: {} }) {
        super(Object.assign(Object.assign({}, params), { type: 'boolean' }));
        this._truthyValues = ['true']; // Specifies additional values to be considered as 'truthy'
        this._falsyValues = ['false']; // Specifies additional values to be considered as 'falsy'
        this._insensitive = true;
        this._getErrorInvalidValue = ({ _i18n }) => _i18n.__('Should be a boolean');
        this._getDescription = (prefix = 'It should be ') => {
            const valideValue = [...this._truthyValues, ...this._falsyValues];
            return `${prefix}a boolean or one of: (${utils_1.default.joinWithCote(valideValue, ', ')}).`;
        };
    }
    _insensitiveArray(array) {
        return array.map(value => {
            if (typeof value === 'string') {
                return value.toLocaleLowerCase();
            }
            return value;
        });
    }
    truthy(vals = []) {
        this._truthyValues = lodash_uniq_1.default([
            ...this._truthyValues,
            ...utils_1.default.castArray(vals),
        ]);
        return this;
    }
    falsy(vals = []) {
        this._falsyValues = lodash_uniq_1.default([...this._falsyValues, ...utils_1.default.castArray(vals)]);
        return this;
    }
    insensitive(val = true) {
        this._insensitive = val;
        return this;
    }
    _testType() {
        if (!['boolean', 'string', 'number'].includes(typeof this._value)) {
            this._setError(this._TypeError.INVALID_TYPE);
            return false;
        }
        return true;
    }
    _test() {
        if (typeof this._value !== 'boolean') {
            this._setError(this._TypeError.INVALID_VALUE);
            return false;
        }
        return true;
    }
    _transform() {
        if (this._insensitive) {
            this._falsyValues = this._insensitiveArray(this._falsyValues);
            this._truthyValues = this._insensitiveArray(this._truthyValues);
            if (typeof this._value === 'string') {
                this._value = this._value.toLocaleLowerCase();
            }
        }
        if (this._truthyValues.includes(this._value)) {
            this._value = true;
        }
        else if (this._falsyValues.includes(this._value)) {
            this._value = false;
        }
    }
}
exports.TypeBoolean = TypeBoolean;
//# sourceMappingURL=TypeBoolean.js.map