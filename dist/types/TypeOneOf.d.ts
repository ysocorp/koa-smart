import { TypeAny } from './TypeAny';
import { ResolveType } from './TypeTyping';
declare type UnroleResolveType<T extends [...any[]]> = T extends [infer Head, ...infer Tail] ? [
    ResolveType<Head>,
    ...UnroleResolveType<Tail>
] : [];
export declare class TypeOneOf<T extends unknown[] = []> extends TypeAny {
    _types: Array<TypeAny>;
    constructor(params?: {
        i18n: {};
    });
    _getErrorInvalidValue: ({ _i18n }: {
        _i18n: any;
    }) => any;
    _getDescription: (prefix?: string) => string;
    types(...rest: T extends [] ? TypeAny[] : UnroleResolveType<T>): this;
    _testType(): boolean;
    _test(): boolean;
}
export {};
