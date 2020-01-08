import { TypeAny } from './TypeAny';
export declare class TypeDate extends TypeAny {
    _startOf: any;
    _endOf: any;
    _formatIn: any;
    _formatOut: any;
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
    _isValid(date: any): boolean;
    _formatDateIfEnabled(value: any): Date;
    min(min: any): this;
    max(max: any): this;
    startOf(period: any): this;
    endOf(period: any): this;
    between(min: any, max: any): this;
    iso(): this;
    formatIn(format: any): this;
    formatOut(format: any): this;
    _testType(): boolean;
    _test(): boolean;
    _transform(): void;
}
