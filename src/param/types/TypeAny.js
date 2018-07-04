export class TypeAny {
  _type = null;
  _error = null;
  _isValueNull = false;
  // options
  _isRequired = false;
  _notNull = false;

  value = null;

  constructor(type) {
    this._type = type;
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
    if (!this._testExist() || this.error) return;
    if (!this._testNull() || this.error || this._isValueNull) return;
    if (!this._testType() || this.error) return;
    this._transform();
    this._test();
  }

  set error(string) {
    this._error = string;
  }
  get error() {
    return this._error;
  }

  _initValues(value) {
    this.value = value;
  }

  _testExist() {
    const exist = this.value !== 'undefined';
    if (!exist && this._isRequired) {
      this.error = `Param is required`;
      return false;
    }
    return true;
  }

  _testNull() {
    if (this.value == null && this._notNull) {
      this.error = `Can not be null`;
      return false;
    }
    this._isValueNull = this.value == null;
    return true;
  }

  _testType() {
    if (!this._type) {
      return true;
    }
    if (typeof this.value !== this._type) {
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
