import { TypeAny } from './TypeAny';
export declare class TypeBinary extends TypeAny {
    _encoding: any;
    _length: any;
    _min: any;
    _max: any;
    _errorKey: any;
    constructor(params?: {
        i18n: {};
    });
    _getErrorInvalidValue: ({ _i18n }: {
        _i18n: any;
    }, key: any) => any;
    _getDescription: (prefix?: string) => string;
    encoding(encodingName: any): this;
    max(max: any): this;
    min(min: any): this;
    length(length: any): this;
    _testType(): boolean;
    _test(): boolean;
    _transform(): boolean;
}
