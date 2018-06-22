export class TypeAny {
  _type = null;
  _isRequired = false;
  _error = null;
  _exist = false;

  object = null;
  key = null;
  value = null;

  constructor(type) {
    this._type = type;
  }

  required() {
    this._isRequired = true;
    return this;
  }

  // Function when test and transform param
  test({ object, key, value }) {
    this._initValue({ object, key, value });
    this._transform();
    this._test();
  }

  set error(string) {
    this._error = string;
  }
  get error() {
    return this._error;
  }

  _initValue({ object, key, value }) {
    this.object = object;
    this.key = key;
    this.value = value || object[key];

    this._testExist();
    this._testType();
  }

  _testExist() {
    this._exist = this.value !== 'undefined';
    if (!this._exist && this._isRequired) {
      this.error = `The param ${this.key} is required`;
    }
  }

  _testType() {
    console.log(
      'this.value',
      this.value,
      typeof this.value,
      typeof this.value === this._type,
    );
    if (typeof this.value !== this._type) {
      this.error = `Invalide type to param`;
    }
  }

  _test() {}

  _transform() {}
}
