export class TypeAny {
  _type = null;
  _error = null;
  _hasError = false;
  _isValueNull = false;
  // options
  _isRequired = false;
  _notNull = false;
  _default = undefined;
  _value = null;

  constructor(type) {
    this._type = type;
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

  set error(string) {
    // skip error if has a default value
    if (this._default == null) {
      this._error = string;
    }
    this._hasError = true;
  }
  get error() {
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
    if (!this._testExist() || this._hasError) return;
    if (!this._testNull() || this._hasError || this._isValueNull) return;
    if (!this._testType() || this._hasError) return;
    this._transform();
    this._test();
  }

  _initValues(value) {
    this._value = value;
  }

  _testExist() {
    const exist = this._value !== 'undefined';
    if (!exist && this._isRequired) {
      this.error = `Param is required`;
      return false;
    }
    return true;
  }

  _testNull() {
    if (this._value == null && this._notNull) {
      this.error = `Can not be null`;
      return false;
    }
    this._isValueNull = this._value == null;
    return true;
  }

  _testType() {
    if (!this._type) {
      return true;
    }
    if (typeof this._value !== this._type) {
      this.error = `Invalid type, expect type ${this._type}`;
      return false;
    }
    return true;
  }

  _test() {
    return true;
  }

  _transform() {}
}
