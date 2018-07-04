import { TypeAny } from './types/TypeAny';
import { TypeNumber } from './types/TypeNumber';

export const Param = {
  any: () => new TypeAny(),
  number: () => new TypeNumber(),
};
