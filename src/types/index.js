import { TypeAny as KsAny } from './TypeAny';
import { TypeBinary as KsBinary } from './TypeBinary';
import { TypeBoolean as KsBoolean } from './TypeBoolean';
import { TypeNumber as KsNumber } from './TypeNumber';
import { TypeObject as KsObject } from './TypeObject';
import { TypeOneOf as KsOneOf } from './TypeOneOf';
import { TypeString as KsString } from './TypeString';

export const TypeAny = KsAny;
export const TypeBinary = KsBinary;
export const TypeBoolean = KsBoolean;
export const TypeNumber = KsNumber;
export const TypeObject = KsObject;
export const TypeOneOf = KsOneOf;
export const TypeString = KsString;

export const Types = {
  any: () => new KsAny(),
  binary: () => new KsBinary(),
  boolean: () => new KsBoolean(),
  number: () => new KsNumber(),
  object: () => new KsObject(),
  oneOf: () => new KsOneOf(),
  string: () => new KsString(),
};
