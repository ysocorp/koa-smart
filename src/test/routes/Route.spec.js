import expect from 'expect';

import Route from '../../routes/Route';
import ErrorApp from '../../utils/ErrorApp';
import * as utils from '../../utils/utils';
import * as utilsParam from '../../utils/utils.param';

describe('Route', () => {
  let route;

  describe('StatusCode', () => {
    it('StatusCode should containe correct values ', () => {
      expect(Route.StatusCode.ok).toEqual(200);
      expect(Route.StatusCode.created).toEqual(201);
      expect(Route.StatusCode.noContent).toEqual(204);
      expect(Route.StatusCode.badRequest).toEqual(400);
      expect(Route.StatusCode.unauthorized).toEqual(401);
      expect(Route.StatusCode.forbidden).toEqual(403);
      expect(Route.StatusCode.notFound).toEqual(404);
      expect(Route.StatusCode.internalServerError).toEqual(500);
    });
  });

  describe('Methode', () => {
    beforeEach(() => {
      route = new Route({});
    });

    describe('_paramsNormalize()', () => {
      it('should normalize params ', () => {
        const funcTest = () => { };
        const params = ['name1', {
          lulu: ['lulu2', { lulu3: true }],
          popo: false,
          popo3: {
            __force: true,
            __func: [funcTest],
            popo2a: ['popo2a_1', 'popo2a_2'],
          },
        }];
        const paramsExpect = {
          name1: { __force: false },
          lulu: {
            lulu2: { __force: false },
            lulu3: { __force: true },
          },
          popo: { __force: false },
          popo3: {
            __force: true,
            __func: [funcTest],
            popo2a: {
              popo2a_1: { __force: false },
              popo2a_2: { __force: false },
            },
          },
        };

        const ret = route._paramsNormalize(params);
        expect(ret).toEqual(paramsExpect);
      });
    });

    describe('_mlTestParams()', () => {
      let body;
      let ctx;
      let paramsTest;
      beforeEach(() => {
        body = {
          name1: 'name1_val',
          name1_a: 'name1_a_val',
          name2: { name2_a: 'name2_a_val', name2_b: 'name2_b_val', name2_c: 'name2_c_val' },
          not_in_param: { toto: 'toto_val', titi: 'titi_val' },
          test: { not_in_param2: { not_in_param2_a: 'not_in_param2_a' }, toto: 'toto_val', titi: 'titi_val' },
        };
        ctx = {
          state: { __: str => str },
          request: { body },
        };
        paramsTest = {
          name1: false,
          name2: { name2_a: false, name2_c: false, name2_d: false },
          not_in_body: { lolo: { lulu: false }, lili: false },
          test: { toto: false, titi: false },
        };
      });

      it('should keep only elem in params', () => {
        const ret = route._mlTestParams(ctx, body, paramsTest);
        expect(ret).toEqual({
          name1: 'name1_val',
          name2: { name2_a: 'name2_a_val', name2_c: 'name2_c_val' },
          test: { toto: 'toto_val', titi: 'titi_val' },
        });
      });
      it('should throw error if elem is force but it is not in body', (done) => {
        paramsTest.not_in_body.lolo.lulu = true;
        try {
          route._mlTestParams(ctx, body, paramsTest);
          done(new Error('should throw error if elem is force but it is not in body'));
        } catch (err) {
          done();
        }
      });
      it('should execute fonction to tranforme params', () => {
        paramsTest.name1 = {
          __force: false,
          __func: [
            utils.capitalize,
          ],
        };
        const ret = route._mlTestParams(ctx, body, paramsTest);
        expect(ret).toEqual({
          name1: 'Name1_val',
          name2: { name2_a: 'name2_a_val', name2_c: 'name2_c_val' },
          test: { toto: 'toto_val', titi: 'titi_val' },
        });
      });
      it('should execute fonction to test params', () => {
        paramsTest.name1 = {
          __force: false,
          __func: [
            utilsParam.test(() => true),
          ],
        };
        const ret = route._mlTestParams(ctx, body, paramsTest);
        expect(ret).toEqual({
          name1: 'name1_val',
          name2: { name2_a: 'name2_a_val', name2_c: 'name2_c_val' },
          test: { toto: 'toto_val', titi: 'titi_val' },
        });
      });
      it('should throw error if test fonction return false', (done) => {
        paramsTest.name1 = {
          __force: false,
          __func: [
            utilsParam.test(() => false),
          ],
        };
        try {
          route._mlTestParams(ctx, body, paramsTest);
          done(new Error('should throw error if test fonction return false'));
        } catch (err) {
          done();
        }
      });
    });

    describe('send', () => {
      let ctx, data, message;
      beforeEach(() => {
        ctx = { body: {} };
        data = { titi: 'titiValue', toto: 'totoValue' };
        message = 'message test';
      });

      function testCtx(statusCode, testData = true) {
        expect(ctx.body.message).toEqual(message);
        if (testData) {
          expect(ctx.body.data).toEqual(data);
        }
        expect(ctx.status).toEqual(statusCode);
      }

      describe('send(ctx, status = 200, data, message)', () => {
        it('should fill body with data, message and correct statusCode', () => {
          route.send(ctx, 201, data, message);
          testCtx(201);
        });
      });
      describe('sendOk(ctx, data, message)', () => {
        it('should fill body with data, message and statusCode = 200', () => {
          route.sendOk(ctx, data, message);
          testCtx(Route.StatusCode.ok);
        });
        it('should fill body with no data when data = null', () => {
          data = null;
          route.sendOk(ctx, data, message);
          expect(ctx.body.data).toBe(undefined);
        });
        it('should fill body with no data when data = undefined', () => {
          data = undefined;
          route.sendOk(ctx, data, message);
          expect(ctx.body.data).toBe(undefined);
        });
        it('should fill body with data = false when data = false', () => {
          data = false;
          route.sendOk(ctx, data, message);
          expect(ctx.body.data).toBe(false);
        });
      });
      describe('sendCreated(ctx, data, message)', () => {
        it('should fill body with data, message and statusCode = 201', () => {
          route.sendCreated(ctx, data, message);
          testCtx(Route.StatusCode.created);
        });
      });
      describe('sendNoContent(ctx, message)', () => {
        it('should fill body with message and statusCode = 204', () => {
          route.sendNoContent(ctx, message);
          testCtx(Route.StatusCode.noContent, false);
        });
      });
      describe('sendBadRequest(ctx, data, message)', () => {
        it('should fill body with data, message and statusCode = 400', () => {
          route.sendBadRequest(ctx, data, message);
          testCtx(Route.StatusCode.badRequest);
        });
      });
      describe('sendUnauthorized(ctx, data, message)', () => {
        it('should fill body with data, message and statusCode = 401', () => {
          route.sendUnauthorized(ctx, data, message);
          testCtx(Route.StatusCode.unauthorized);
        });
      });
      describe('sendForbidden(ctx, data, message)', () => {
        it('should fill body with data, message and statusCode = 403', () => {
          route.sendForbidden(ctx, data, message);
          testCtx(Route.StatusCode.forbidden);
        });
      });
      describe('sendNotFound(ctx, data, message)', () => {
        it('should fill body with data, message and statusCode = 404', () => {
          route.sendNotFound(ctx, data, message);
          testCtx(Route.StatusCode.notFound);
        });
      });
      describe('sendInternalServerError(ctx, data, message)', () => {
        it('should fill body with data, message and statusCode = 500', () => {
          route.sendInternalServerError(ctx, data, message);
          testCtx(Route.StatusCode.internalServerError);
        });
      });
    });

    describe('throw()', () => {
      it('should throw ErrorApp with correct message and status', () => {
        try {
          route.throw(404, 'message');
        } catch (error) {
          expect(error instanceof ErrorApp).toBeTruthy();
        }
      });
    });

    describe('assert()', () => {
      it('should throw ErrorApp (if condiction is false) with correct message and status', () => {
        try {
          route.assert(false, 404, 'message');
        } catch (error) {
          expect(error instanceof ErrorApp).toBeTruthy();
        }
      });
      it('should not throw ErrorApp (if condiction is true)', () => {
        route.assert(true, 404, 'message');
      });
    });
  });
});
