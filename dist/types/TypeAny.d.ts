export declare const TypeError: {
    ALL: string;
    REQUIRED: string;
    IS_NULL: string;
    INVALID_TYPE: string;
    INVALID_VALUE: string;
};
export declare class TypeAny {
    _i18nConfig: any;
    _i18n: any;
    _TypeError: {
        ALL: string;
        REQUIRED: string;
        IS_NULL: string;
        INVALID_TYPE: string;
        INVALID_VALUE: string;
    };
    _type: any;
    _error: string;
    _errors: {};
    _hasError: boolean;
    _isValueNull: boolean;
    _codeError: number;
    _errorCodes: {
        [x: string]: number;
    };
    _errorMessages: {
        [x: string]: (obj: any, ...args: any) => string;
    };
    _isRequired: boolean;
    _notNull: boolean;
    _default: any;
    _value: any;
    constructor({ type, i18n }: {
        type?: any;
        i18n: any;
    });
    clone(): any;
    setErrorMsg(msg: any, typeError?: string): this;
    setLocale(locale: any): this;
    _getErrorInvalidValue: ({ _i18n }: {
        _i18n: any;
    }, ...rest: any) => string;
    _getDescription: (prefix?: string) => string;
    _generateParamDescription(params: any, prefix?: string): string;
    get value(): any;
    set value(val: any);
    _fnMessage(typeCode: any, { _i18n, _errorMessages, _TypeError }: {
        _i18n: any;
        _errorMessages: any;
        _TypeError: any;
    }, ...rest: any[]): string;
    _setError(typeCode: any, ...rest: any[]): boolean;
    set error({ msg }: {
        msg: string;
        code: number;
    });
    get error(): {
        msg: string;
        code: number;
    };
    get errors(): {};
    _addError(key: any, param: any): boolean;
    get codeError(): number;
    get codeMsg(): string;
    default(val: any): this;
    required(val?: boolean): this;
    allowNull(val?: boolean): this;
    test(value: any): void;
    _initValues(value: any): void;
    _testExist(): boolean;
    _testNull(): boolean;
    _testType(): boolean;
    _test(): boolean;
    _transform(): void;
}
