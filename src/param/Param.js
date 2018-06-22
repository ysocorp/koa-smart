import { TypeAny } from './types/TypeAny';
import { TypeNumber } from './types/TypeNumber';
import { TypeObject } from './types/TypeObject';
import { TypeString } from './types/TypeString';

export class ParamChecker {
  errors = {};

  constructor(values, types) {
    this.values = values;
    this.types = types;
  }

  test() {
    for (const key in this.types) {
      const param = elems[key];
      param._initValue({ object: this.values, key });
      param._transform({ object: this.values, key });
      param._test({ object: this.values, key });
      if (param.error) {
        this.errors[key] = param.error;
      }
    }
  }
}

export const Param = {
  any: () => new TypeAny(),
  number: () => new TypeNumber(),
  object: () => new TypeObject(),
  string: () => new TypeString(),
};
