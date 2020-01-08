import Route from './routes/Route';
import App from './App';
import ErrorApp from './utils/ErrorApp';
import * as middlewares from './middlewares/index';
declare const _default: {
    TypeAny: typeof import("./types/TypeAny").TypeAny;
    TypeArray: typeof import("./types/TypeArray").TypeArray;
    TypeBinary: typeof import("./types/TypeBinary").TypeBinary;
    TypeBoolean: typeof import("./types/TypeBoolean").TypeBoolean;
    TypeDate: typeof import("./types/TypeDate").TypeDate;
    TypeEnum: typeof import("./types/TypeEnum").TypeEnum;
    TypeNumber: typeof import("./types/TypeNumber").TypeNumber;
    TypeObject: typeof import("./types/TypeObject").TypeObject;
    TypeOneOf: typeof import("./types/TypeOneOf").TypeOneOf;
    TypeString: typeof import("./types/TypeString").TypeString;
    Types: {
        init: ({ i18n }?: {
            i18n?: {};
        }) => void;
        any: () => import("./types/TypeAny").TypeAny;
        array: () => import("./types/TypeArray").TypeArray;
        binary: () => import("./types/TypeBinary").TypeBinary;
        boolean: () => import("./types/TypeBoolean").TypeBoolean;
        date: () => import("./types/TypeDate").TypeDate;
        enum: () => import("./types/TypeEnum").TypeEnum;
        number: () => import("./types/TypeNumber").TypeNumber;
        object: () => import("./types/TypeObject").TypeObject;
        oneOf: () => import("./types/TypeOneOf").TypeOneOf;
        string: () => import("./types/TypeString").TypeString;
    };
    App: typeof App;
    Route: typeof Route;
    ErrorApp: typeof ErrorApp;
    StatusCode: import("./utils/StatusCode").StatusCode;
    middlewares: typeof middlewares;
};
export = _default;
