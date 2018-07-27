import moment from 'moment';

import { TypeAny } from './TypeAny';

export class TypeDate extends TypeAny {
  _startOf;
  _endOf;
  _formatIn; // the date's input format
  _formatOut; // the date's output format(will output a string instead of a date)
  _min; // earliest possible date
  _max; // latest possible date

  constructor() {
    super('date');
    this._errorMessages[this._TypeError.INVALIDE_VALUE] = this._getDescription;
  }

  _getDescription = (prefix = 'It should be ') => {
    let msgError = `${prefix}a date`;
    const paramsDesc = [];
    if (this._max) {
      paramsDesc.push(`is before ${this._max.toDateString()}`);
    }
    if (this._min) {
      paramsDesc.push(`is after ${this._min.toDateString()}`);
    }
    if (this._formatIn) {
      paramsDesc.push(`is formated as ${typeof this._formatIn === 'function' ? 'ISO_8601' : this._formatIn}`);
    }
    const paramMsg = this._generateParamDescription(paramsDesc, ' which');
    return `${msgError}${paramMsg}.`;
  };

  _isValid(date) {
    return date && !isNaN(date.getTime());
  }

  _formatDateIfEnabled(value) {
    if (this._formatIn) {
      const date = moment(value, this._formatIn, true);
      return date.isValid() ? date.toDate() : new Date(value);
    } else {
      return new Date(value);
    }
  }

  min(min) {
    this._min = min;
    return this;
  }

  max(max) {
    this._max = max;
    return this;
  }

  startOf(period) {
    this._startOf = period;
    return this;
  }

  endOf(period) {
    this._endOf = period;
    return this;
  }

  between(min, max) {
    this._min = min;
    this._max = max;
    return this;
  }

  iso() {
    this._formatIn = moment.ISO_8601;
    return this;
  }

  formatIn(format) {
    this._formatIn = format;
    return this;
  }

  formatOut(format) {
    this._formatOut = format;
    return this;
  }

  _generateError() {
    this.error = `Invalid field ${this.key}`;
  }

  _testType() {}

  _test() {
    super._test();
    const t = this._TypeError.INVALIDE_VALUE;
    if (!this._isValid(this._value)) {
      return this._setError(t);
    }
    if (this._min && moment(this._value).isBefore(this._formatDateIfEnabled(this._min))) {
      return this._setError(t);
    }
    if (this._max && moment(this._value).isAfter(this._formatDateIfEnabled(this._max))) {
      return this._setError(t);
    }
    if (this._formatOut) {
      this._value = moment(this._value).format(this._formatOut);
      if (this._value === 'Invalid date') {
        return this._setError(t);
      }
    }
  }

  _transform() {
    this._value = this._formatDateIfEnabled(this._value);
    if (this._startOf) {
      this._value = moment(this._value)
        .startOf(this._startOf)
        .toDate();
    }
    if (this._endOf) {
      this._value = moment(this._value)
        .endOf(this._endOf)
        .toDate();
    }
  }
}
