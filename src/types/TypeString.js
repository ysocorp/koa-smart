import { TypeAny } from './TypeAny';

export class TypeString extends TypeAny {
  _min;
  _max;
  _length;
  _regex;

  _tTrim = true;
  _tTruncate = false;
  _tUppercase = false;
  _tLowercase = false;
  _tReplace;

  constructor() {
    super('string');
    this._errorMessages[this._TypeError.INVALIDE_VALUE] = this._getDescription;
  }

  _getDescription = () => {
    let msgError = 'It should be a string';

    let and = false;
    if (this._length != null) {
      msgError += `${and ? ' and' : ''} with ${this._length} characters`;
      and = true;
    }
    if (this._min != null && this._max != null) {
      msgError += `${and ? ' and' : ''} with ${this._min} and ${this._max} characters`;
      and = true;
    } else if (this._min != null) {
      msgError += `${and ? ' and' : ''} with at least ${this._min} characters`;
      and = true;
    } else if (this._max != null) {
      msgError += `${and ? ' and' : ''} with a maximum of ${this._max} characters`;
      and = true;
    }
    if (this._regex != null) {
      msgError += `${and ? ' and' : ''} that match with ${this._regex.toString()}`;
      and = true;
    }
    return `${msgError}.`;
  };

  trim(needTrim = true) {
    this._tTrim = needTrim;
    return this;
  }

  min(nb = 0) {
    this._min = nb;
    return this;
  }

  max(nb = Number.MAX_SAFE_INTEGER) {
    this._max = nb;
    return this;
  }

  length(nb) {
    this._length = nb;
    return this;
  }

  regex(regex) {
    this._regex = regex;
    return this;
  }

  between(nbMin, nbMax) {
    this.min(nbMin);
    this.max(nbMax);
    return this;
  }

  uppercase(val = true) {
    this._tUppercase = val;
    return this;
  }

  lowercase(val = true) {
    this._tLowercase = val;
    return this;
  }

  truncate(val = true) {
    this._tTruncate = val;
    return this;
  }

  replace(pattern, replaceWith = '') {
    this._tReplace = { pattern, replaceWith };
    return this;
  }

  _test() {
    const t = this._TypeError.INVALIDE_VALUE;
    if (this._length && this._value.length !== this._length) return this._setError(t);
    if (this._min && this._value.length < this._min) return this._setError(t);
    if (this._max && this._value.length > this._max) return this._setError(t);
    if (this._regex && !this._value.match(this._regex)) return this._setError(t);
  }

  _transform() {
    if (this._tTrim) this._value = this._value.trim();
    if (this._tTruncate && this._max) this._value = this._value.substring(0, this._max);
    if (this._tTruncate && this._length) this._value = this._value.substring(0, this._length);
    if (this._tUppercase) this._value = this._value.toUpperCase();
    if (this._tLowercase) this._value = this._value.toLowerCase();
    if (this._tReplace) this._value = this._value.replace(this._tReplace.pattern, this._tReplace.replaceWith);
  }
}
