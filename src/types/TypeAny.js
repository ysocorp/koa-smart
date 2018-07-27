export const TypeError = {
  ALL: 'ALL',
  REQUIRED: 'REQUIRED',
  IS_NULL: 'IS_NULL',
  INVALIDE_TYPE: 'INVALIDE_TYPE',
  INVALIDE_VALUE: 'INVALIDE_VALUE',
};

export class TypeAny {
  _TypeError = { ...TypeError };
  _type = null;
  _error = null;
  _hasError = false;
  _isValueNull = false;
  _codeError = null;
  _errorCodes = {
    [this._TypeError.ALL]: 1,
    [this._TypeError.REQUIRED]: 2,
    [this._TypeError.IS_NULL]: 3,
    [this._TypeError.INVALIDE_TYPE]: 4,
    [this._TypeError.INVALIDE_VALUE]: 5,
  };
  _errorMessages = {
    [this._TypeError.ALL]: null,
    [this._TypeError.REQUIRED]: () => 'Is required',
    [this._TypeError.IS_NULL]: () => 'Can not be null',
    [this._TypeError.INVALIDE_TYPE]: () => `Expect type ${this._type}`,
    [this._TypeError.INVALIDE_VALUE]: () => 'Invalid field',
  };
  // options
  _isRequired = false;
  _notNull = false;
  _default = undefined;
  _value = null;

  constructor(type) {
    this._type = type;
  }

  _getDescription = (prefix = 'It should be') => {
    return `${prefix} any type.`;
  };

  _generateParamDescription(params, prefix = '') {
    if (!params.length) {
      return '';
    }
    if (params.length === 1) {
      return `${prefix} ${params[0]}`;
    }
    const firstPartRes = params.slice(0, -1).join(', ');
    return `${prefix} ${firstPartRes} and ${params[params.length - 1]}`;
  }

  get value() {
    if (this._default != null && (this._value == null || this._hasError)) {
      return this._default;
    }
    return this._value;
  }
  set value(val) {
    this._value = val;
  }

  _setError(typeCode) {
    // skip error if has a default value
    if (this._default == null) {
      const fnMessage = this._errorMessages[this._TypeError.ALL] || this._errorMessages[typeCode];
      this._error = fnMessage();
      this._codeError = this._errorCodes[typeCode];
    }
    this._hasError = true;
    return this._hasError;
  }

  set error(string) {
    // skip error if has a default value
    if (this._default == null) {
      this._error = string;
    }
    this._hasError = true;
  }
  get error() {
    if (!this._error) {
      return null;
    }
    return {
      msg: this._error,
      code: this.codeError,
    };
  }

  get codeError() {
    return this._codeError;
  }
  get codeMsg() {
    return this._error;
  }

  default(val) {
    this._default = val;
    return this;
  }

  required(val = true) {
    this._isRequired = val;
    this.allowNull(false);
    return this;
  }

  allowNull(val = true) {
    this._notNull = !val;
    return this;
  }

  // Function when test and transform param
  test(value) {
    this._initValues(value);
    if (this._testExist() || this._hasError) return;
    if (this._testNull() || this._hasError || this._isValueNull) return;
    if (this._testType() || this._hasError) return;
    this._transform();
    this._test();
  }

  _initValues(value) {
    this._value = value;
    this._error = null;
    this._hasError = false;
    this._isValueNull = false;
  }

  _testExist() {
    const exist = typeof this._value !== 'undefined';
    if (!exist && this._isRequired) {
      this._setError(this._TypeError.REQUIRED);
    }
  }

  _testNull() {
    if (this._value == null && this._notNull) {
      this._setError(TypeError.IS_NULL);
    }
    this._isValueNull = this._value == null;
  }

  _testType() {
    if (this._type != null && typeof this._value !== this._type) {
      this._setError(TypeError.INVALIDE_TYPE);
      return false;
    }
  }

  _test() {
    return true;
  }

  _transform() {}
}
