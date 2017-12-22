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

function test(func, errMsg) {
  return function (elem, route, _ref) {
    var ctx = _ref.ctx,
        keyBody = _ref.keyBody;

    const dafaultMsgBase = ctx.state.__ ? ctx.state.__('invalide param:') : 'invalide param:';
    if (!func(elem)) {
      route.throw(_StatusCode2.default.badRequest, errMsg || dafaultMsgBase + ' ' + keyBody);
    }
    return elem;
  };
}

function trasform(func) {
  return function (elem) {
    return func(elem);
  };
}

function regex(reg) {
  return function (elem) {
    if (reg instanceof RegExp) {
      return elem.match(reg);
    }
    return false;
  };
}

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