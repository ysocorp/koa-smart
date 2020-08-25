"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeEnum = void 0;
const TypeAny_1 = require("./TypeAny");
const utils_1 = __importDefault(require("../utils"));
class TypeEnum extends TypeAny_1.TypeAny {
    constructor(params = { i18n: {} }) {
        super(Object.assign(Object.assign({}, params), { type: 'enum' }));
        this._oneOf = [];
        this._insensitive = true;
        this._number = true;
        this._getErrorInvalidValue = ({ _i18n }) => _i18n.__('Should be one of %s', utils_1.default.joinWithCote(this._oneOf, ', '));
        this._getDescription = (prefix = 'It should be ') => `${prefix}one of: (${utils_1.default.joinWithCote(this._oneOf, ', ')}).`;
    }
    _insensitiveArray(array) {
        return array.map(value => {
            if (typeof value === 'string') {
                return value.toLocaleLowerCase();
            }
            return value;
        });
    }
    oneOf(...rest) {
        this._oneOf = [...rest];
        return this;
    }
    insensitive(val = true) {
        this._insensitive = val;
        return this;
    }
    number(val = true) {
        this._number = val;
        return this;
    }
    _testType() {
        if (!['string', 'number'].includes(typeof this._value)) {
            this._setError(this._TypeError.INVALID_TYPE);
            return false;
        }
        return true;
    }
    _test() {
        if (!this._oneOf.includes(this._value)) {
            this._setError(this._TypeError.INVALID_VALUE);
            return false;
        }
        return true;
    }
    _transform() {
        if (this._insensitive && typeof this._value === 'string') {
            for (const e of this._oneOf) {
                if (typeof e === 'string' &&
                    e.toLocaleLowerCase() === this._value.toLocaleLowerCase()) {
                    this._value = e;
                }
            }
        }
        if (this._number && !isNaN(parseFloat(this._value))) {
            this._value = parseFloat(this._value);
        }
    }
}
exports.TypeEnum = TypeEnum;
//# sourceMappingURL=TypeEnum.js.map