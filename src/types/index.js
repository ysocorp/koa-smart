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

export const Types = {
  any: () => new KsAny(),
  array: () => new KsArray(),
  binary: () => new KsBinary(),
  boolean: () => new KsBoolean(),
  date: () => new KsDate(),
  enum: () => new KsEnum(),
  number: () => new KsNumber(),
  object: () => new KsObject(),
  oneOf: () => new KsOneOf(),
  string: () => new KsString(),
};
