
import StatusCode from './StatusCode';

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
