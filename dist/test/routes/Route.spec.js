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

  describe('Methode', function () {
    beforeEach(function () {
      route = new _Route2.default({});
    });

    describe('paramsNormalize()', function () {
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

        var ret = route.paramsNormalize(params);
        (0, _expect2.default)(ret).toEqual(paramsExpect);
      });
    });

    describe('mlTestParams()', function () {
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
        var ret = route.mlTestParams(ctx, body, paramsTest);
        (0, _expect2.default)(ret).toEqual({
          name1: 'name1_val',
          name2: { name2_a: 'name2_a_val', name2_c: 'name2_c_val' },
          test: { toto: 'toto_val', titi: 'titi_val' }
        });
      });
      it('should throw error if elem is force but it is not in body', function (done) {
        paramsTest.not_in_body.lolo.lulu = true;
        try {
          route.mlTestParams(ctx, body, paramsTest);
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
        var ret = route.mlTestParams(ctx, body, paramsTest);
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
        var ret = route.mlTestParams(ctx, body, paramsTest);
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
          route.mlTestParams(ctx, body, paramsTest);
          done(new Error('should throw error if test fonction return false'));
        } catch (err) {
          done();
        }
      });
    });

    describe('send()', function () {
      it('should fill body with message', function () {
        var ctx = { body: {} };
        var data = { titi: 'titiValue', toto: 'totoValue' };
        route.send(ctx, 200, data, 'message test');
        (0, _expect2.default)(ctx.body.message).toEqual('message test');
        (0, _expect2.default)(ctx.body.data).toEqual(data);
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
  });
});