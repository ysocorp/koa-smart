"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types = exports.TypeString = exports.TypeOneOf = exports.TypeObject = exports.TypeNumber = exports.TypeEnum = exports.TypeDate = exports.TypeBoolean = exports.TypeBinary = exports.TypeArray = exports.TypeAny = void 0;
const utils_1 = require("../utils/utils");
const TypeAny_1 = require("./TypeAny");
const TypeArray_1 = require("./TypeArray");
const TypeBinary_1 = require("./TypeBinary");
const TypeBoolean_1 = require("./TypeBoolean");
const TypeDate_1 = require("./TypeDate");
const TypeEnum_1 = require("./TypeEnum");
const TypeNumber_1 = require("./TypeNumber");
const TypeObject_1 = require("./TypeObject");
const TypeOneOf_1 = require("./TypeOneOf");
const TypeString_1 = require("./TypeString");
exports.TypeAny = TypeAny_1.TypeAny;
exports.TypeArray = TypeArray_1.TypeArray;
exports.TypeBinary = TypeBinary_1.TypeBinary;
exports.TypeBoolean = TypeBoolean_1.TypeBoolean;
exports.TypeDate = TypeDate_1.TypeDate;
exports.TypeEnum = TypeEnum_1.TypeEnum;
exports.TypeNumber = TypeNumber_1.TypeNumber;
exports.TypeObject = TypeObject_1.TypeObject;
exports.TypeOneOf = TypeOneOf_1.TypeOneOf;
exports.TypeString = TypeString_1.TypeString;
let opt = {
    i18n: {},
};
exports.Types = {
    init: ({ i18n = {} } = {}) => {
        const newOpt = (0, utils_1.deepCopy)(opt);
        opt = Object.assign(Object.assign({}, newOpt), { i18n: Object.assign(Object.assign({}, opt.i18n), i18n) });
    },
    any: () => new TypeAny_1.TypeAny(opt),
    array: () => new TypeArray_1.TypeArray(opt),
    binary: () => new TypeBinary_1.TypeBinary(opt),
    boolean: () => new TypeBoolean_1.TypeBoolean(opt),
    date: () => new TypeDate_1.TypeDate(opt),
    enum: () => new TypeEnum_1.TypeEnum(opt),
    number: () => new TypeNumber_1.TypeNumber(opt),
    object: () => new TypeObject_1.TypeObject(opt),
    oneOf: () => new TypeOneOf_1.TypeOneOf(opt),
    string: () => new TypeString_1.TypeString(opt),
};
//# sourceMappingURL=index.js.map