import { TypeAny } from './TypeAny';
export declare class TypeBoolean extends TypeAny {
    _truthyValues: string[];
    _falsyValues: string[];
    _insensitive: boolean;
    constructor(params?: {
        i18n: {};
    });
    _getErrorInvalidValue: ({ _i18n }: {
        _i18n: any;
    }) => any;
    _getDescription: (prefix?: string) => string;
    _insensitiveArray(array: any): any;
    truthy(vals?: any[]): this;
    falsy(vals?: any[]): this;
    insensitive(val?: boolean): this;
    _testType(): boolean;
    _test(): boolean;
    _transform(): void;
}
