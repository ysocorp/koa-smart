import { TypeAny } from './TypeAny';
import { resolveType } from './TypeTyping';
declare type unroleResolveType<T extends [...any[]]> = T extends [infer Head, ...infer Tail] ? [
    resolveType<Head>,
    ...unroleResolveType<Tail>
] : [];
export declare class TypeOneOf<T extends unknown[] = []> extends TypeAny {
    _types: Array<TypeAny>;
    _errors: Array<string>;
    constructor(params?: {
        i18n: {};
    });
    _getErrorInvalidValue: ({ _i18n }: {
        _i18n: any;
    }) => any;
    _getDescription: (prefix?: string) => string;
    types(...rest: T extends [] ? TypeAny[] : unroleResolveType<T>): this;
    _testType(): boolean;
    _test(): boolean;
}
export {};
