import { TypeAny } from './TypeAny';
import { ObjectTyping } from './TypeTyping';
export declare class TypeObject<T = any> extends TypeAny {
    _schema: {};
    _errorWithKey: any;
    constructor(params?: {
        i18n: {};
    });
    _getErrorInvalidValue: ({ _i18n }: {
        _i18n: any;
    }, key: any, keyError: any, msg: any) => any;
    _getDescription: (prefix?: string) => string;
    _initValues(value: any): void;
    setErrorMsg(msg: any, typeError?: any): this;
    errorWithKey(value?: boolean): this;
    keys(object: ObjectTyping<T>): this;
    _test(): boolean;
}
