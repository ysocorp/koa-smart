import { TypeAny } from './types/TypeAny';
import { TypeBoolean } from './types/TypeBoolean';
import { TypeNumber } from './types/TypeNumber';
import { TypeObject } from './types/TypeObject';
import { TypeOneOf } from './types/TypeOneOf';
import { TypeString } from './types/TypeString';

export const Param = {
  any: () => new TypeAny(),
  boolean: () => new TypeBoolean(),
  number: () => new TypeNumber(),
  object: () => new TypeObject(),
  oneOf: () => new TypeOneOf(),
  string: () => new TypeString(),
};
