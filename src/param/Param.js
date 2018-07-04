import { TypeAny } from './types/TypeAny';
import { TypeNumber } from './types/TypeNumber';
import { TypeObject } from './types/TypeObject';
import { TypeOneOf } from './types/TypeOneOf';
import { TypeString } from './types/TypeString';

export const Param = {
  any: () => new TypeAny(),
  number: () => new TypeNumber(),
  object: () => new TypeObject(),
  oneOf: () => new TypeOneOf(),
  string: () => new TypeString(),
};
