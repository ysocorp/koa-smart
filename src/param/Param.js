import { TypeAny } from './types/TypeAny';
import { TypeNumber } from './types/TypeNumber';
import { TypeObject } from './types/TypeObject';
import { TypeString } from './types/TypeString';

export const Param = {
  any: () => new TypeAny(),
  number: () => new TypeNumber(),
  object: () => new TypeObject(),
  string: () => new TypeString(),
};
