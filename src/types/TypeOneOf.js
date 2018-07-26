import { TypeAny } from './TypeAny';

export class TypeOneOf extends TypeAny {
  _types = [];
  _errors = [];

  constructor() {
    super('oneOf');
    this._errorMessages[this._TypeError.INVALIDE_VALUE] = this._getDescription;
  }

  _getDescription = () => {
    const msgs = [];
    for (const t of this._types) {
      const fnMessage =
        t._errorMessages[this._TypeError.ALL] || t._errorMessages[this._TypeError.INVALIDE_VALUE];
      msgs.push(fnMessage());
    }
    return msgs.join(' OR ');
  };

  types(...rest) {
    this._types = [...rest];
    return this;
  }

  _testType() {
    /* overload */
  }

  _test() {
    let isOneOk = false;
    for (const t of this._types) {
      t.required(this._required);
      t.test(this._value);
      if (!isOneOk && !t.error) {
        isOneOk = true;
        this._value = t.value;
      }
      if (t.error) {
        this._errors.push(t.error);
      }
    }
    if (!isOneOk) {
      this._setError(this._TypeError.INVALIDE_VALUE);
    }
  }
}
