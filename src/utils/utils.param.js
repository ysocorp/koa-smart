
import StatusCode from './StatusCode';

/**
 * @desc allows the user to enforce a test on an object, and throws an error should the check fail.
 * @param {function} func the predicate to check the object
 * @param {string} errMsg the error message to be returned in case the check fails.
 * @return {ParamMiddlewareFunction} a function that can be supplied to a route's param checks
 * @throws {ErrorApp} thrown if the test predicate returns false
 */
export function test(func, errMsg) {
  return (elem, route, { ctx, keyBody }) => {
    if (!func(elem)) {
      route.throw(StatusCode.badRequest, errMsg || `${ctx.state.__('invalide param:')} ${keyBody}`);
    }
    return elem;
  };
}

/**
 * @desc allows the user to apply an arbitrary function to an elem.
 * @param {function} func the function to transform the object
 * @return {function} a function that can be supplied
 */
export function trasform(func) {
  return elem => func(elem);
}

/**
 * @desc allows the user to check whether an element matches the given regex.
 * @param {RegExp} reg
 * @return {function} a function taking a string, which will attempt to match it against the given regex, and returns true or false.
 */
export function regex(reg) {
  return (elem) => {
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
export function isDateBetween(d1, d2) {
  return (d) => {
    if (d1.getTime() <= d.getTime() && d2.getTime() >= d.getTime()) {
      return true;
    }
    if (d2.getTime() <= d.getTime() && d1.getTime() >= d.getTime()) {
      return true;
    }
    return false;
  };
}
