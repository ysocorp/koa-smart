'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _Route = require('../../routes/Route');

var _Route2 = _interopRequireDefault(_Route);

var _ErrorApp = require('../../utils/ErrorApp');

var _ErrorApp2 = _interopRequireDefault(_ErrorApp);

var _utils = require('../../utils/utils');

var utils = _interopRequireWildcard(_utils);

var _utils2 = require('../../utils/utils.param');

var utilsParam = _interopRequireWildcard(_utils2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Route', function () {
  var route = void 0;

  describe('StatusCode', function () {
    it('StatusCode should containe correct values ', function () {
      (0, _expect2.default)(_Route2.default.StatusCode.ok).toEqual(200);
      (0, _expect2.default)(_Route2.default.StatusCode.created).toEqual(201);
      (0, _expect2.default)(_Route2.default.StatusCode.noContent).toEqual(204);
      (0, _expect2.default)(_Route2.default.StatusCode.badRequest).toEqual(400);
      (0, _expect2.default)(_Route2.default.StatusCode.unauthorized).toEqual(401);
      (0, _expect2.default)(_Route2.default.StatusCode.forbidden).toEqual(403);
      (0, _expect2.default)(_Route2.default.StatusCode.notFound).toEqual(404);
      (0, _expect2.default)(_Route2.default.StatusCode.internalServerError).toEqual(500);
    });
  });

  describe('Methode', function () {
    beforeEach(function () {
      route = new _Route2.default({});
    });

    describe('_paramsNormalize()', function () {
      it('should normalize params ', function () {
        var funcTest = function funcTest() {};
        var params = ['name1', {
          lulu: ['lulu2', { lulu3: true }],
          popo: false,
          popo3: {
            __force: true,
            __func: [funcTest],
            popo2a: ['popo2a_1', 'popo2a_2']
          }
        }];
        var paramsExpect = {
          name1: { __force: false },
          lulu: {
            lulu2: { __force: false },
            lulu3: { __force: true }
          },
          popo: { __force: false },
          popo3: {
            __force: true,
            __func: [funcTest],
            popo2a: {
              popo2a_1: { __force: false },
              popo2a_2: { __force: false }
            }
          }
        };

        var ret = route._paramsNormalize(params);
        (0, _expect2.default)(ret).toEqual(paramsExpect);
      });
    });

    describe('_mlTestParams()', function () {
      var body = void 0;
      var ctx = void 0;
      var paramsTest = void 0;
      beforeEach(function () {
        body = {
          name1: 'name1_val',
          name1_a: 'name1_a_val',
          name2: { name2_a: 'name2_a_val', name2_b: 'name2_b_val', name2_c: 'name2_c_val' },
          not_in_param: { toto: 'toto_val', titi: 'titi_val' },
          test: { not_in_param2: { not_in_param2_a: 'not_in_param2_a' }, toto: 'toto_val', titi: 'titi_val' }
        };
        ctx = {
          state: { __: function __(str) {
              return str;
            } },
          request: { body: body }
        };
        paramsTest = {
          name1: false,
          name2: { name2_a: false, name2_c: false, name2_d: false },
          not_in_body: { lolo: { lulu: false }, lili: false },
          test: { toto: false, titi: false }
        };
      });

      it('should keep only elem in params', function () {
        var ret = route._mlTestParams(ctx, body, paramsTest);
        (0, _expect2.default)(ret).toEqual({
          name1: 'name1_val',
          name2: { name2_a: 'name2_a_val', name2_c: 'name2_c_val' },
          test: { toto: 'toto_val', titi: 'titi_val' }
        });
      });
      it('should throw error if elem is force but it is not in body', function (done) {
        paramsTest.not_in_body.lolo.lulu = true;
        try {
          route._mlTestParams(ctx, body, paramsTest);
          done(new Error('should throw error if elem is force but it is not in body'));
        } catch (err) {
          done();
        }
      });
      it('should execute fonction to tranforme params', function () {
        paramsTest.name1 = {
          __force: false,
          __func: [utils.capitalize]
        };
        var ret = route._mlTestParams(ctx, body, paramsTest);
        (0, _expect2.default)(ret).toEqual({
          name1: 'Name1_val',
          name2: { name2_a: 'name2_a_val', name2_c: 'name2_c_val' },
          test: { toto: 'toto_val', titi: 'titi_val' }
        });
      });
      it('should execute fonction to test params', function () {
        paramsTest.name1 = {
          __force: false,
          __func: [utilsParam.test(function () {
            return true;
          })]
        };
        var ret = route._mlTestParams(ctx, body, paramsTest);
        (0, _expect2.default)(ret).toEqual({
          name1: 'name1_val',
          name2: { name2_a: 'name2_a_val', name2_c: 'name2_c_val' },
          test: { toto: 'toto_val', titi: 'titi_val' }
        });
      });
      it('should throw error if test fonction return false', function (done) {
        paramsTest.name1 = {
          __force: false,
          __func: [utilsParam.test(function () {
            return false;
          })]
        };
        try {
          route._mlTestParams(ctx, body, paramsTest);
          done(new Error('should throw error if test fonction return false'));
        } catch (err) {
          done();
        }
      });
    });

    describe('send', function () {
      var ctx = void 0,
          data = void 0,
          message = void 0;
      beforeEach(function () {
        ctx = { body: {} };
        data = { titi: 'titiValue', toto: 'totoValue' };
        message = 'message test';
      });

      function testCtx(statusCode) {
        (0, _expect2.default)(ctx.body.message).toEqual(message);
        (0, _expect2.default)(ctx.body.data).toEqual(data);
        (0, _expect2.default)(ctx.status).toEqual(statusCode);
      }

      describe('send(ctx, status = 200, data, message)', function () {
        it('should fill body with data, message and correct statusCode', function () {
          route.send(ctx, 201, data, message);
          testCtx(201);
        });
      });
      describe('sendOk(ctx, data, message)', function () {
        it('should fill body with data, message and set statusCode = 200', function () {
          route.sendOk(ctx, data, message);
          testCtx(_Route2.default.StatusCode.ok);
        });
        it('should fill body with no data when data = null', function () {
          data = null;
          route.sendOk(ctx, data, message);
          (0, _expect2.default)(ctx.body.data).toBe(undefined);
        });
        it('should fill body with no data when data = undefined', function () {
          data = undefined;
          route.sendOk(ctx, data, message);
          (0, _expect2.default)(ctx.body.data).toBe(undefined);
        });
        it('should fill body with data = false when data = false', function () {
          data = false;
          route.sendOk(ctx, data, message);
          (0, _expect2.default)(ctx.body.data).toBe(false);
        });
      });
      describe('sendCreated(ctx, data, message)', function () {
        it('should fill body with data, message and set statusCode = 201', function () {
          route.sendCreated(ctx, data, message);
          testCtx(_Route2.default.StatusCode.created);
        });
      });
      describe('sendNoContent(ctx)', function () {
        it('should not fill body and set statusCode = 204', function () {
          route.sendNoContent(ctx);
          (0, _expect2.default)(ctx.body.message).toBe(undefined);
          (0, _expect2.default)(ctx.body.data).toBe(undefined);
          (0, _expect2.default)(ctx.status).toBe(_Route2.default.StatusCode.noContent);
        });
      });
      describe('sendBadRequest(ctx, data, message)', function () {
        it('should fill body with data, message and set statusCode = 400', function () {
          route.sendBadRequest(ctx, data, message);
          testCtx(_Route2.default.StatusCode.badRequest);
        });
      });
      describe('sendUnauthorized(ctx, data, message)', function () {
        it('should fill body with data, message and set statusCode = 401', function () {
          route.sendUnauthorized(ctx, data, message);
          testCtx(_Route2.default.StatusCode.unauthorized);
        });
      });
      describe('sendForbidden(ctx, data, message)', function () {
        it('should fill body with data, message and set statusCode = 403', function () {
          route.sendForbidden(ctx, data, message);
          testCtx(_Route2.default.StatusCode.forbidden);
        });
      });
      describe('sendNotFound(ctx, data, message)', function () {
        it('should fill body with data, message and set statusCode = 404', function () {
          route.sendNotFound(ctx, data, message);
          testCtx(_Route2.default.StatusCode.notFound);
        });
      });
      describe('sendInternalServerError(ctx, data, message)', function () {
        it('should fill body with data, message and set statusCode = 500', function () {
          route.sendInternalServerError(ctx, data, message);
          testCtx(_Route2.default.StatusCode.internalServerError);
        });
      });
    });

    describe('throw()', function () {
      it('should throw ErrorApp with correct message and status', function () {
        try {
          route.throw(404, 'message');
        } catch (error) {
          (0, _expect2.default)(error instanceof _ErrorApp2.default).toBeTruthy();
        }
      });
    });

    describe('assert()', function () {
      it('should throw ErrorApp (if condiction is false) with correct message and status', function () {
        try {
          route.assert(false, 404, 'message');
        } catch (error) {
          (0, _expect2.default)(error instanceof _ErrorApp2.default).toBeTruthy();
        }
      });
      it('should not throw ErrorApp (if condiction is true)', function () {
        route.assert(true, 404, 'message');
      });
    });
  });
});