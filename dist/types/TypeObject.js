"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeObject = void 0;
const TypeAny_1 = require("./TypeAny");
class TypeObject extends TypeAny_1.TypeAny {
    constructor(params = { i18n: {} }) {
        super(Object.assign(Object.assign({}, params), { type: 'object' }));
        this._schema = {};
        this._getErrorInvalidValue = ({ _i18n }, key, keyError, msg) => {
            if (key === 'add') {
                return this._errorWithKey ? `${keyError}: ${msg}` : msg;
            }
            return _i18n.__('Is not an object');
        };
        this._getDescription = (prefix = 'It should be ') => `${prefix}an object`;
    }
    _initValues(value) {
        super._initValues(value);
        this._errors = {};
    }
    setErrorMsg(msg, typeError) {
        super.setErrorMsg(msg, typeError);
        this._errorWithKey = false;
        return this;
    }
    errorWithKey(value = true) {
        this._errorWithKey = value;
        return this;
    }
    keys(object) {
        this._schema = Object.assign(Object.assign({}, this._schema), object);
        return this;
    }
    _test() {
        const oldValue = Object.assign({}, this._value);
        this._value = {};
        for (const key in this._schema) {
            if (this._schema.hasOwnProperty(key)) {
                const param = this._schema[key];
                param.test(oldValue[key]);
                if (param.error) {
                    this._addError(key, param);
                }
                else {
                    this._value[key] = param.value;
                }
            }
        }
        return true;
    }
}
exports.TypeObject = TypeObject;
//# sourceMappingURL=TypeObject.js.map