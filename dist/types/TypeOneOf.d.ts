import { TypeAny } from './TypeAny';
export declare class TypeOneOf extends TypeAny {
    _types: Array<TypeAny>;
    _errors: Array<string>;
    constructor(params?: {
        i18n: {};
    });
    _getErrorInvalidValue: ({ _i18n }: {
        _i18n: any;
    }) => any;
    _getDescription: (prefix?: string) => string;
    types(...rest: any[]): this;
    _testType(): boolean;
    _test(): boolean;
}
