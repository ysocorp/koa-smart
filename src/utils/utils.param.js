
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

export function trasform(func) {
  return elem => func(elem);
}

export function regex(reg) {
  return (elem) => {
    if (reg instanceof RegExp) {
      return elem.match(reg);
    }
    return false;
  };
}

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
