import { TypeAny } from './TypeAny';
export declare class TypeString extends TypeAny {
    _min: number;
    _max: number;
    _length?: number;
    _regex: any;
    _valid: string[];
    _tTrim: boolean;
    _tTruncate: boolean;
    _tUppercase: boolean;
    _tLowercase: boolean;
    _tReplace: any;
    _errorKey: any;
    constructor(params?: {
        i18n: {};
    });
    _getErrorInvalidValue: ({ _i18n }: {
        _i18n: any;
    }, key: any) => any;
    _getDescription: (prefix?: string) => string;
    trim(needTrim?: boolean): this;
    min(nb?: number): this;
    max(nb?: number): this;
    length(nb: any): this;
    regex(regex: any): this;
    valid(valid: string[]): this;
    between(nbMin: any, nbMax: any): this;
    uppercase(val?: boolean): this;
    lowercase(val?: boolean): this;
    truncate(val?: boolean): this;
    replace(pattern: any, replaceWith?: string): this;
    _test(): boolean;
    _transform(): void;
}
