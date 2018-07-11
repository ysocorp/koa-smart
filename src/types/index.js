import { TypeAny } from './TypeAny';
import { TypeBinary } from './TypeBinary';
import { TypeBoolean } from './TypeBoolean';
import { TypeNumber } from './TypeNumber';
import { TypeObject } from './TypeObject';
import { TypeOneOf } from './TypeOneOf';
import { TypeString } from './TypeString';

export const Types = {
  any: () => new TypeAny(),
  binary: () => new TypeBinary(),
  boolean: () => new TypeBoolean(),
  number: () => new TypeNumber(),
  object: () => new TypeObject(),
  oneOf: () => new TypeOneOf(),
  string: () => new TypeString(),
};
