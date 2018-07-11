'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = test;
exports.trasform = trasform;
exports.regex = regex;
exports.isDateBetween = isDateBetween;

var _StatusCode = require('./StatusCode');

var _StatusCode2 = _interopRequireDefault(_StatusCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc allows the user to enforce a test on an object, and throws an error should the check fail.
 * @param {function} func the predicate to check the object
 * @param {string} errMsg the error message to be returned in case the check fails.
 * @return {ParamMiddlewareFunction} a function that can be supplied to a route's param checks
 * @throws {ErrorApp} thrown if the test predicate returns false
 */
function test(func, errMsg) {
  return function (elem, route, _ref) {
    var ctx = _ref.ctx,
        keyBody = _ref.keyBody;

    if (!func(elem)) {
      route.throw(_StatusCode2.default.badRequest, errMsg || ctx.state.__('invalide param:') + ' ' + keyBody);
    }
    return elem;
  };
}

/**
 * @desc allows the user to apply an arbitrary function to an elem.
 * @param {function} func the function to transform the object
 * @return {function} a function that can be supplied
 */
function trasform(func) {
  return function (elem) {
    return func(elem);
  };
}

/**
 * @desc allows the user to check whether an element matches the given regex.
 * @param {RegExp} reg
 * @return {function} a function taking a string, which will attempt to match it against the given regex, and returns true or false.
 */
function regex(reg) {
  return function (elem) {
    if (reg instanceof RegExp) {
      return elem.match(reg);
    }
    return false;
  };
}

/**
 * @desc allows the user to check whether a given date is between a range of dates.
 * @param {Date} d1 the starting date
 * @param {Date} d2 the ending date
 * @return {function} a function taking a date, which will return true if it is between the first two supplied, false otherwise.
 */
function isDateBetween(d1, d2) {
  return function (d) {
    if (d1.getTime() <= d.getTime() && d2.getTime() >= d.getTime()) {
      return true;
    }
    if (d2.getTime() <= d.getTime() && d1.getTime() >= d.getTime()) {
      return true;
    }
    return false;
  };
}