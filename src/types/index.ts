import { deepCopy } from '../utils/utils';

import { TypeAny as KsAny } from './TypeAny';
import { TypeArray as KsArray } from './TypeArray';
import { TypeBinary as KsBinary } from './TypeBinary';
import { TypeBoolean as KsBoolean } from './TypeBoolean';
import { TypeDate as KsDate } from './TypeDate';
import { TypeEnum as KsEnum } from './TypeEnum';
import { TypeNumber as KsNumber } from './TypeNumber';
import { TypeObject as KsObject } from './TypeObject';
import { TypeOneOf as KsOneOf } from './TypeOneOf';
import { TypeString as KsString } from './TypeString';

export const TypeAny = KsAny;
export const TypeArray = KsArray;
export const TypeBinary = KsBinary;
export const TypeBoolean = KsBoolean;
export const TypeDate = KsDate;
export const TypeEnum = KsEnum;
export const TypeNumber = KsNumber;
export const TypeObject = KsObject;
export const TypeOneOf = KsOneOf;
export const TypeString = KsString;

let opt = {
  i18n: {},
};

export const Types = {
  init: ({ i18n = {} } = {}) => {
    const newOpt = deepCopy(opt);
    opt = {
      ...newOpt,
      i18n: { ...opt.i18n, ...i18n },
    };
  },
  any: () => new KsAny(opt),
  array: <T = any>() => new KsArray<T>(opt),
  binary: () => new KsBinary(opt),
  boolean: () => new KsBoolean(opt),
  date: () => new KsDate(opt),
  enum: () => new KsEnum(opt),
  number: () => new KsNumber(opt),
  object: <T = any>() => new KsObject<T>(opt),
  oneOf: <T extends unknown[] = []>() => new KsOneOf<T>(opt),
  string: () => new KsString(opt),
};
