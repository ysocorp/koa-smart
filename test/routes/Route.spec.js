import expect from 'expect';

import Route from '../../dist/routes/Route';
import ErrorApp from '../../dist/utils/ErrorApp';
import { Types } from '../../dist';

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

    describe('_mlTestParams()', () => {
      let body;
      let ctx;
      let paramsTest;
      beforeEach(() => {
        body = {
          name1: 'name1_val',
          name1_a: 'name1_a_val',
          name2: {
            name2_a: 'name2_a_val',
            name2_b: 'name2_b_val',
            name2_c: 'name2_c_val',
          },
          not_in_param: { toto: 'toto_val', titi: 'titi_val' },
          test: {
            not_in_param2: { not_in_param2_a: 'not_in_param2_a' },
            toto: 'toto_val',
            titi: 'titi_val',
          },
        };
        ctx = {
          state: { __: str => str },
          request: { body },
        };
      });

      it('should keep only elem in params', () => {
        paramsTest = Types.object().keys({
          name1: Types.any(),
          name2: Types.object().keys({
            name2_a: Types.any(),
            name2_c: Types.any(),
            name2_d: Types.any(),
          }),
          not_in_body: Types.object().keys({
            lolo: Types.object().keys({
              lulu: Types.any(),
            }),
            lili: Types.any(),
          }),
          test: Types.object().keys({
            toto: Types.any(),
            titi: Types.any(),
          }),
        });
        const ret = route._mlTestParams(ctx, body, paramsTest);
        expect(ret).toEqual({
          name1: 'name1_val',
          name2: { name2_a: 'name2_a_val', name2_c: 'name2_c_val' },
          test: { toto: 'toto_val', titi: 'titi_val' },
        });
      });
      it('should throw error if elem is force but it is not in body', done => {
        paramsTest = Types.object().keys({
          not_in_body: Types.object()
            .keys({ lolo: Types.any().required() })
            .required(),
        });
        try {
          route._mlTestParams(ctx, body, paramsTest);
          done(new Error('should throw error if elem is force but it is not in body'));
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

      function testCtx(statusCode) {
        expect(ctx.body.message).toEqual(message);
        expect(ctx.body.data).toEqual(data);
        expect(ctx.status).toEqual(statusCode);
      }

      describe('send(ctx, status = 200, data, message)', () => {
        it('should fill body with data, message and correct statusCode', () => {
          route.send(ctx, 201, data, message);
          testCtx(201);
        });
      });
      describe('sendOk(ctx, data, message)', () => {
        it('should fill body with data, message and set statusCode = 200', () => {
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
        it('should fill body with data, message and set statusCode = 201', () => {
          route.sendCreated(ctx, data, message);
          testCtx(Route.StatusCode.created);
        });
      });
      describe('sendNoContent(ctx)', () => {
        it('should not fill body and set statusCode = 204', () => {
          route.sendNoContent(ctx);
          expect(ctx.body.message).toBe(undefined);
          expect(ctx.body.data).toBe(undefined);
          expect(ctx.status).toBe(Route.StatusCode.noContent);
        });
      });
    });

    describe('throw()', () => {
      let message, messages;
      beforeEach(() => {
        message = 'message test';
        messages = { email: { msg: 'message test', code: 1 } };
      });

      it('should throw ErrorApp with correct message and status', () => {
        try {
          route.throw(404, 'message');
        } catch (error) {
          expect(error instanceof ErrorApp).toBeTruthy();
          expect(error.status).toBe(404);
        }
      });
      describe('throwBadRequest', () => {
        it('should throw ErrorApp with message and set statusCode = 400', () => {
          try {
            route.throwBadRequest(message);
          } catch (error) {
            expect(error instanceof ErrorApp).toBeTruthy();
            expect(error.status).toBe(Route.StatusCode.badRequest);
            expect(error.message).toBe(message);
          }
        });
      });
      describe('throwUnauthorized', () => {
        it('should throw ErrorApp with messages and set statusCode = 401', () => {
          try {
            route.throwUnauthorized(messages);
          } catch (error) {
            expect(error instanceof ErrorApp).toBeTruthy();
            expect(error.status).toBe(Route.StatusCode.unauthorized);
            expect(error.messages).toBe(messages);
          }
        });
      });
      describe('throwForbidden', () => {
        it('should throw ErrorApp with message and set statusCode = 403', () => {
          try {
            route.throwForbidden(messages);
          } catch (error) {
            expect(error instanceof ErrorApp).toBeTruthy();
            expect(error.status).toBe(Route.StatusCode.forbidden);
            expect(error.messages).toBe(messages);
          }
        });
      });
      describe('throwNotFound', () => {
        it('should throw ErrorApp with message and set statusCode = 404', () => {
          try {
            route.throwNotFound(messages);
          } catch (error) {
            expect(error instanceof ErrorApp).toBeTruthy();
            expect(error.status).toBe(Route.StatusCode.notFound);
            expect(error.messages).toBe(messages);
          }
        });
      });
      describe('throwInternalServerError', () => {
        it('should throw ErrorApp with message and set statusCode = 500', () => {
          try {
            route.throwInternalServerError(messages);
          } catch (error) {
            expect(error instanceof ErrorApp).toBeTruthy();
            expect(error.status).toBe(Route.StatusCode.internalServerError);
            expect(error.messages).toBe(messages);
          }
        });
      });
    });

    describe('assert()', () => {
      it('should throw ErrorApp (if condiction is false) with correct message and status', () => {
        try {
          route.assert(false, 404, 'message');
        } catch (error) {
          expect(error instanceof ErrorApp).toBeTruthy();
          expect(error.status).toBe(404);
        }
      });
      it('should not throw ErrorApp (if condiction is true)', () => {
        route.assert(true, 404, 'message');
      });
    });
    describe('assertBadRequest', () => {
      it('should throw ErrorApp with message and set statusCode = 400', () => {
        try {
          route.assertBadRequest(false, 'message');
        } catch (error) {
          expect(error instanceof ErrorApp).toBeTruthy();
          expect(error.status).toBe(Route.StatusCode.badRequest);
          expect(error.message).toBe('message');
        }
      });
      it('should not throw ErrorApp (if condiction is true)', () => {
        route.assertBadRequest(true, 'message');
      });
    });
    describe('assertUnauthorized', () => {
      it('should throw ErrorApp with messages and set statusCode = 401', () => {
        try {
          route.assertUnauthorized(false, 'messages');
        } catch (error) {
          expect(error instanceof ErrorApp).toBeTruthy();
          expect(error.status).toBe(Route.StatusCode.unauthorized);
          expect(error.message).toBe('messages');
        }
      });
      it('should not throw ErrorApp (if condiction is true)', () => {
        route.assertUnauthorized(true, 'message');
      });
    });
    describe('assertForbidden', () => {
      it('should throw ErrorApp with message and set statusCode = 403', () => {
        try {
          route.assertForbidden(false, 'messages');
        } catch (error) {
          expect(error instanceof ErrorApp).toBeTruthy();
          expect(error.status).toBe(Route.StatusCode.forbidden);
          expect(error.message).toBe('messages');
        }
      });
      it('should not throw ErrorApp (if condiction is true)', () => {
        route.assertForbidden(true, 'message');
      });
    });
  });
});
