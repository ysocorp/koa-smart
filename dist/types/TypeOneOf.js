"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOneOf = void 0;
const TypeAny_1 = require("./TypeAny");
class TypeOneOf extends TypeAny_1.TypeAny {
    constructor(params = { i18n: {} }) {
        super(Object.assign(Object.assign({}, params), { type: 'oneOf' }));
        this._types = [];
        this._getErrorInvalidValue = ({ _i18n }) => _i18n.__('Invalid type');
        this._getDescription = (prefix = 'It should be ') => {
            const msgs = [];
            for (const t of this._types) {
                const fnMessage = t._getDescription ||
                    t._errorMessages[this._TypeError.ALL] ||
                    t._errorMessages[this._TypeError.INVALID_VALUE];
                msgs.push(fnMessage({ _i18n: {} }).slice(0, -1));
            }
            return `${prefix}either ${msgs.join(' OR ')}.`;
        };
    }
    types(...rest) {
        this._types = [...rest];
        return this;
    }
    _testType() {
        return true;
        /* overload */
    }
    _test() {
        let isOneOk = false;
        for (const t of this._types) {
            t.required(this._isRequired);
            t.test(this._value);
            if (!isOneOk && !t._error) {
                isOneOk = true;
                this._value = t.value;
                break;
            }
        }
        if (!isOneOk) {
            this._setError(this._TypeError.INVALID_VALUE);
        }
        return true;
    }
}
exports.TypeOneOf = TypeOneOf;
//# sourceMappingURL=TypeOneOf.js.map