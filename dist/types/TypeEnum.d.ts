import { TypeAny } from './TypeAny';
export declare class TypeEnum extends TypeAny {
    _oneOf: Array<any>;
    _insensitive: boolean;
    _number: boolean;
    constructor(params?: {
        i18n: {};
    });
    _getErrorInvalidValue: ({ _i18n }: {
        _i18n: any;
    }) => any;
    _getDescription: (prefix?: string) => string;
    _insensitiveArray(array: any): any;
    oneOf(...rest: any[]): this;
    insensitive(val?: boolean): this;
    number(val?: boolean): this;
    _testType(): boolean;
    _test(): boolean;
    _transform(): void;
}
