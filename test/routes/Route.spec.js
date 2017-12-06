import expect from 'expect';

import Route from '../../routes/Route';
import ErrorApp from '../../utils/ErrorApp';
import * as utils from '../../utils/utils';
import * as utilsParam from '../../utils/utils.param';

describe('Route', () => {
  let route;

  describe('Methode', () => {
    beforeEach(() => {
      route = new Route({});
    });

    describe('paramsNormalize()', () => {
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

        const ret = route.paramsNormalize(params);
        expect(ret).toEqual(paramsExpect);
      });
    });

    describe('mlTestParams()', () => {
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
        const ret = route.mlTestParams(ctx, body, paramsTest);
        expect(ret).toEqual({
          name1: 'name1_val',
          name2: { name2_a: 'name2_a_val', name2_c: 'name2_c_val' },
          test: { toto: 'toto_val', titi: 'titi_val' },
        });
      });
      it('should throw error if elem is force but it is not in body', (done) => {
        paramsTest.not_in_body.lolo.lulu = true;
        try {
          route.mlTestParams(ctx, body, paramsTest);
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
        const ret = route.mlTestParams(ctx, body, paramsTest);
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
        const ret = route.mlTestParams(ctx, body, paramsTest);
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
          route.mlTestParams(ctx, body, paramsTest);
          done(new Error('should throw error if test fonction return false'));
        } catch (err) {
          done();
        }
      });
    });

    describe('send()', () => {
      it('should fill body with message', () => {
        const ctx = { body: {} };
        const data = { titi: 'titiValue', toto: 'totoValue' };
        route.send(ctx, 200, data, 'message test');
        expect(ctx.body.message).toEqual('message test');
        expect(ctx.body.data).toEqual(data);
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

  });
});
