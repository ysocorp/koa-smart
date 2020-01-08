import { TypeAny } from './TypeAny';
export declare class TypeNumber extends TypeAny {
    _min: any;
    _max: any;
    _integer: any;
    _multiple: any;
    _positive: boolean;
    _negative: boolean;
    _tPrecision: any;
    _tPrecisionType: any;
    _errorKey: any;
    constructor(params?: {
        i18n: {};
    });
    _getErrorInvalidValue: ({ _i18n }: {
        _i18n: any;
    }, key: any) => any;
    _getDescription: (prefix?: string) => string;
    min(nb?: number): this;
    max(nb?: number): this;
    between(nbMin: any, nbMax: any): this;
    integer(val?: boolean): this;
    multiple(base: any): this;
    positive(val?: boolean): this;
    negative(val?: boolean): this;
    precision(limit: any, type?: string): this;
    _isTypeNum: () => boolean;
    _isInteger: () => boolean;
    _isFloat: () => boolean;
    _isNumber: () => boolean;
    _testType(): boolean;
    _test(): boolean;
    _precisionTo(nb: any, nbDigit: any, type: any): number;
    _transform(): void;
}
