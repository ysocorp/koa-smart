import { TypeAny } from './types/TypeAny';
import { TypeNumber } from './types/TypeNumber';
import { TypeString } from './types/TypeString';

export const Param = {
  any: () => new TypeAny(),
  number: () => new TypeNumber(),
  string: () => new TypeString(),
};
