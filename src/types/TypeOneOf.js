import { TypeAny } from './TypeAny';

export class TypeOneOf extends TypeAny {
  _types = [];
  _errors = [];

  constructor(params = {}) {
    super({ ...params, type: 'oneOf' });
    this._errorMessages[this._TypeError.INVALID_VALUE] = this._getError;
  }

  _getError = ({ _i18n }) => {
    return _i18n.__('Invalid type');
  };

  _getDescription = (prefix = 'It should be ') => {
    const msgs = [];
    for (const t of this._types) {
      const fnMessage =
        t._getDescription ||
        t._errorMessages[this._TypeError.ALL] ||
        t._errorMessages[this._TypeError.INVALID_VALUE];
      msgs.push(fnMessage('').slice(0, -1));
    }
    return `${prefix}either ${msgs.join(' OR ')}.`;
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
      this._setError(this._TypeError.INVALID_VALUE);
    }
  }
}
