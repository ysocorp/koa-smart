import { TypeString } from './TypeString';
import { TypeArray } from './TypeArray';
import { TypeBoolean } from './TypeBoolean';
import { TypeEnum } from './TypeEnum';
import { TypeNumber } from './TypeNumber';
import { TypeObject } from './TypeObject';
import { TypeOneOf } from './TypeOneOf';
import { TypeAny } from './TypeAny';

type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

export type resolveType<T> = T extends string ? TypeString | TypeEnum | TypeOneOf<any> :
  T extends number ? TypeNumber | TypeBoolean | TypeEnum | TypeOneOf<any> :
    T extends boolean ? TypeBoolean :
      T extends Array<any> ? TypeArray :
        T extends object ? TypeObject<T> :
          IsUnion<T> extends true ? TypeOneOf<[T]> :
            TypeAny;

export type objectTyping<T> = { [P in keyof Required<T>]: resolveType<T[P]>};
