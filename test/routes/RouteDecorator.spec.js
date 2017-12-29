import expect from 'expect';
import supertest from 'supertest';
import { Stores } from 'koa2-ratelimit';

import RDec from '../../dist/routes/RouteDecorators';
import { wait } from '../../dist/utils/utils';
import createserver from '../_createserver';

describe('RouteDecorator', () => {
  let request;
  let _server;

  before(async () => {
    _server = await createserver(); // createserver will return = app.listen()
    request = supertest.agent(_server);
  });

  after(async () => {
    _server.close();
  });

  describe('disabled', () => {
    it('should disabled all route when disable = true on Class Decorator', async () => {
      let res = await request.get('/disable/disabled/');
      expect(res.statusCode).toBe(404);
      res = await request.get('/disable/disabled/try-disable');
      expect(res.statusCode).toBe(404);
    });
    it('should enabled a class when pass disable = false on super call', async () => {
      const { statusCode } = await request.get('/disable/un-disabled');
      expect(statusCode).toBe(200);
    });
    it('should disabled a single route', async () => {
      const { statusCode } = await request.get('/disable/enabled/disabled');
      expect(statusCode).toBe(404);
    });
    it('should disable a class when pass disable = false on super call but disable it on a route', async () => {
      const { statusCode } = await request.get('/disable/un-disabled/disabled');
      expect(statusCode).toBe(404);
    });
    it('should enable a route class when pass disable = true on Class Decorator', async () => {
      const { statusCode } = await request.get('/disable/enabled');
      expect(statusCode).toBe(200);
      const res = await request.get('/disable/enabled/enabled2');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Path', () => {
    describe('_getRouteFromMethode', () => {
      it('should get the correct name of the path', async () => {
        expect(RDec._getRouteFromMethode('MyPath')).toBe('my-path');
        expect(RDec._getRouteFromMethode('myPath')).toBe('my-path');
        expect(RDec._getRouteFromMethode('my-path')).toBe('my-path');
        expect(RDec._getRouteFromMethode('MyPatH')).toBe('my-pat-h');
        expect(RDec._getRouteFromMethode('my-pathMyPathMy2')).toBe('my-path-my-path-my2');
      });
    });
    describe('routeBase', () => {
      it('should replace the base route when routeBase is set on decorator class', async () => {
        let res = await request.get('/path/path');
        expect(res.statusCode).toBe(200);
      });
      it('should tranforme function name to path', async () => {
        let res = await request.get('/path/path/my-path');
        expect(res.statusCode).toBe(200);
        res = await request.get('/path/path/mypath');
        expect(res.statusCode).toBe(200);
      });
      it('should tranforme class name to path and put it to routeBase', async () => {
        let res = await request.get('/path/base-path');
        expect(res.statusCode).toBe(200);
        res = await request.get('/path/base-path/my-path');
        expect(res.statusCode).toBe(200);
      });
      it('should custom a route path with path route decorator', async () => {
        let res = await request.get('/path/path/path-change');
        expect(res.statusCode).toBe(200);
      });
    });

    describe('Route.Type with same name', () => {
      describe('Route.Get', () => {
        it('should call the get route', async () => {
          let res = await request.get('/path/path/samepath');
          expect(res.statusCode).toBeLessThan(400);
          expect(res.body.data).toBe('get');
        });
      });
      describe('Route.Post', () => {
        it('should call the post route', async () => {
          let res = await request.post('/path/path/samepath');
          expect(res.statusCode).toBeLessThan(400);
          expect(res.body.data).toBe('post');
        });
      });
      describe('Route.Put', () => {
        it('should call the put route', async () => {
          let res = await request.put('/path/path/samepath');
          expect(res.statusCode).toBeLessThan(400);
          expect(res.body.data).toBe('put');
        });
      });
      describe('Route.Patch', () => {
        it('should call the patch route', async () => {
          let res = await request.patch('/path/path/samepath');
          expect(res.statusCode).toBeLessThan(400);
          expect(res.body.data).toBe('patch');
        });
      });
      describe('Route.Delete', () => {
        it('should call the delete route', async () => {
          let res = await request.delete('/path/path/samepath');
          expect(res.statusCode).toBeLessThan(400);
          expect(res.body.data).toBe('delete');
        });
      });
    });
  });

  describe('params', () => {
    it('should keep only elem in params decorator', async () => {
      const bodySend = {
        email: 'clientnew@new.com',
        password: 'password',
        notPermited: 'notPermited',
      };
      const { body, statusCode } = await request.post('/params').send(bodySend);

      expect(statusCode).toBeLessThan(400);
      expect(body.data.original).toEqual(bodySend);
      expect(body.data.checked).toEqual({
        email: 'clientnew@new.com',
        password: 'password',
      });
      expect(body.data.checked.notPermited).toBe(undefined);
    });
    it('should return 400 if required params are not send', async () => {
      const respKO = await request.post('/params').send({ password: 'password' });
      expect(respKO.statusCode).toBe(400);

      const respOK = await request.post('/params').send({ email: 'email' });
      expect(respOK.statusCode).toBeLessThan(400);
    });
    it('should apply param only in the specific path and type', async () => {
      const bodySend = {
        post: 'post',
        patch: 'patch',
      };
      let res = await request.post('/params/samepath').send(bodySend);
      expect(res.statusCode).toBeLessThan(400);
      expect(res.body.data).toEqual({ post: 'post' });
      expect(res.body.data.patch).toBe(undefined);
      res = await request.patch('/params/samepath').send(bodySend);
      expect(res.statusCode).toBeLessThan(400);
      expect(res.body.data).toEqual({ patch: 'patch' });
      expect(res.body.data.post).toBe(undefined);
    });
  });

  describe('ratelimit', () => {
    beforeEach(async () => {
      Stores.Memory.cleanAll();
    });

    it('should stop user when too much request are made', async () => {
      let res = await request.get('/rate-limit/min1max2');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.get('/rate-limit/min1max2');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.get('/rate-limit/min1max2');
      expect(res.statusCode).toBe(429);
    });

    it('should stop user only on a specific route', async () => {
      let res = await request.get('/rate-limit/min1max2');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.get('/rate-limit/min1max2');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.get('/rate-limit/min1max2');
      expect(res.statusCode).toBe(429);

      res = await request.get('/rate-limit/sec2max2');
      expect(res.statusCode).toBeLessThan(400);
    });

    it('should stop user when too much request are made et let him when time is past', async () => {
      let res = await request.get('/rate-limit/sec2max2');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.get('/rate-limit/sec2max2');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.get('/rate-limit/sec2max2');
      expect(res.statusCode).toBe(429);

      await wait(2000);
      res = await request.get('/rate-limit/sec2max2');
      expect(res.statusCode).toBeLessThan(400);
    });

    it('should allow multiple ratelimit', async () => {
      let res = await request.get('/rate-limit/min1max2-sec1max5');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.get('/rate-limit/min1max2-sec1max5');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.get('/rate-limit/min1max2-sec1max5');
      expect(res.statusCode).toBe(429);
    });

    it('should apply ratelimit only on specific type and path', async () => {
      let res = await request.get('/rate-limit/samepath-min1max2');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.get('/rate-limit/samepath-min1max2');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.get('/rate-limit/samepath-min1max2');
      expect(res.statusCode).toBe(429);

      res = await request.post('/rate-limit/samepath-min1max2');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.post('/rate-limit/samepath-min1max2');
      expect(res.statusCode).toBeLessThan(400);
      res = await request.post('/rate-limit/samepath-min1max2');
      expect(res.statusCode).toBe(429);
    });

  });

  describe('middlewares', () => {
    it('should call class middlewares and then the route function', async () => {
      const { body } = await request.get('/middlewares/without');

      expect(body.middleware).toEqual('class');
      expect(body.data).toEqual('content');
    });
    it('should call class middlewares then middlewares of the route and finish with the route function', async () => {
      const { body } = await request.get('/middlewares/with');

      expect(body.start).toEqual('class');
      expect(body.middleware).toEqual('route');
      expect(body.data).toEqual('content');
    });
  });

});
