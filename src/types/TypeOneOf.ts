import { TypeAny } from './TypeAny';

export class TypeOneOf extends TypeAny {
  _types: Array<TypeAny> = [];
  _errors: Array<string> = [];

  constructor(params = { i18n: {} }) {
    super({ ...params, type: 'oneOf' });
  }

  _getErrorInvalidValue = ({ _i18n }) => _i18n.__('Invalid type');

  _getDescription = (prefix = 'It should be ') => {
    const msgs: Array<string> = [];
    for (const t of this._types) {
      const fnMessage =
        t._getDescription ||
        t._errorMessages[this._TypeError.ALL] ||
        t._errorMessages[this._TypeError.INVALID_VALUE];
      msgs.push(fnMessage({ _i18n: {} }).slice(0, -1));
    }
    return `${prefix}either ${msgs.join(' OR ')}.`;
  }

  types(...rest) {
    this._types = [...rest];
    return this;
  }

  _testType() {
    return true;
    /* overload */
  }

  _test() {
    let isOneOk = false;
    for (const t of this._types) {
      t.required(this._isRequired);
      t.test(this._value);
      if (!isOneOk && !t._error) {
        isOneOk = true;
        this._value = t.value;
      }
      if (t._error) {
        this._errors.push(t._error);
      }
    }
    if (!isOneOk) {
      this._setError(this._TypeError.INVALID_VALUE);
    }
    return true;
  }
}
