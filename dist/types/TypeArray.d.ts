import { TypeAny } from './TypeAny';
export declare class TypeArray extends TypeAny {
    _tSingle: boolean;
    _tSplitBy: any;
    _length: any;
    _min: any;
    _max: any;
    _innerType: any;
    constructor(params?: any);
    _getErrorInvalidValue: ({ _i18n }: {
        _i18n: any;
    }, key: any) => string;
    _getDescription: (prefix?: string) => string;
    single(enabled?: boolean): this;
    splitBy(split: any): this;
    max(max: any): this;
    min(min: any): this;
    length(length: any): this;
    type(itemType: any): this;
    _testType(): boolean;
    _test(): boolean;
    _transform(): void;
}
