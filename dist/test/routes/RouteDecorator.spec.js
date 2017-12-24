'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _koa2Ratelimit = require('koa2-ratelimit');

var _RouteDecorators = require('../../routes/RouteDecorators');

var _RouteDecorators2 = _interopRequireDefault(_RouteDecorators);

var _createserver = require('../_createserver');

var _createserver2 = _interopRequireDefault(_createserver);

var _utils = require('../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('RouteDecorator', function () {
  var request = void 0;
  var _server = void 0;

  before((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _createserver2.default)();

          case 2:
            _server = _context.sent;
            // createserver will return = app.listen()
            request = _supertest2.default.agent(_server);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  after((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _server.close();

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  describe('disabled', function () {
    it('should disabled all route when disable = true on Class Decorator', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var res;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return request.get('/disable/disabled/');

            case 2:
              res = _context3.sent;

              (0, _expect2.default)(res.statusCode).toBe(404);
              _context3.next = 6;
              return request.get('/disable/disabled/try-disable');

            case 6:
              res = _context3.sent;

              (0, _expect2.default)(res.statusCode).toBe(404);

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));
    it('should enabled a class when pass disable = false on super call', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var _ref5, statusCode;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return request.get('/disable/un-disabled');

            case 2:
              _ref5 = _context4.sent;
              statusCode = _ref5.statusCode;

              (0, _expect2.default)(statusCode).toBe(200);

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));
    it('should disabled a single route', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var _ref7, statusCode;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return request.get('/disable/enabled/disabled');

            case 2:
              _ref7 = _context5.sent;
              statusCode = _ref7.statusCode;

              (0, _expect2.default)(statusCode).toBe(404);

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));
    it('should disable a class when pass disable = false on super call but disable it on a route', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var _ref9, statusCode;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return request.get('/disable/un-disabled/disabled');

            case 2:
              _ref9 = _context6.sent;
              statusCode = _ref9.statusCode;

              (0, _expect2.default)(statusCode).toBe(404);

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));
    it('should enable a route class when pass disable = true on Class Decorator', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
      var _ref11, statusCode, res;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return request.get('/disable/enabled');

            case 2:
              _ref11 = _context7.sent;
              statusCode = _ref11.statusCode;

              (0, _expect2.default)(statusCode).toBe(200);
              _context7.next = 7;
              return request.get('/disable/enabled/enabled2');

            case 7:
              res = _context7.sent;

              (0, _expect2.default)(res.statusCode).toBe(200);

            case 9:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));
  });

  describe('Path', function () {
    describe('_getRouteFromMethode', function () {
      it('should get the correct name of the path', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                (0, _expect2.default)(_RouteDecorators2.default._getRouteFromMethode('MyPath')).toBe('my-path');
                (0, _expect2.default)(_RouteDecorators2.default._getRouteFromMethode('myPath')).toBe('my-path');
                (0, _expect2.default)(_RouteDecorators2.default._getRouteFromMethode('my-path')).toBe('my-path');
                (0, _expect2.default)(_RouteDecorators2.default._getRouteFromMethode('MyPatH')).toBe('my-pat-h');
                (0, _expect2.default)(_RouteDecorators2.default._getRouteFromMethode('my-pathMyPathMy2')).toBe('my-path-my-path-my2');

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined);
      })));
    });
    describe('routeBase', function () {
      it('should replace the base route when routeBase is set on decorator class', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
        var res;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return request.get('/path/path');

              case 2:
                res = _context9.sent;

                (0, _expect2.default)(res.statusCode).toBe(200);

              case 4:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, undefined);
      })));
      it('should tranforme function name to path', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
        var res;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return request.get('/path/path/my-path');

              case 2:
                res = _context10.sent;

                (0, _expect2.default)(res.statusCode).toBe(200);
                _context10.next = 6;
                return request.get('/path/path/mypath');

              case 6:
                res = _context10.sent;

                (0, _expect2.default)(res.statusCode).toBe(200);

              case 8:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, undefined);
      })));
      it('should tranforme class name to path and put it to routeBase', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
        var res;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return request.get('/path/base-path');

              case 2:
                res = _context11.sent;

                (0, _expect2.default)(res.statusCode).toBe(200);
                _context11.next = 6;
                return request.get('/path/base-path/my-path');

              case 6:
                res = _context11.sent;

                (0, _expect2.default)(res.statusCode).toBe(200);

              case 8:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, undefined);
      })));
      it('should custom a route path with path route decorator', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
        var res;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return request.get('/path/path/path-change');

              case 2:
                res = _context12.sent;

                (0, _expect2.default)(res.statusCode).toBe(200);

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, undefined);
      })));
    });

    describe('Route.Type with same name', function () {
      describe('Route.Get', function () {
        it('should call the get route', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
          var res;
          return _regenerator2.default.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.next = 2;
                  return request.get('/path/path/samepath');

                case 2:
                  res = _context13.sent;

                  (0, _expect2.default)(res.statusCode).toBeLessThan(400);
                  (0, _expect2.default)(res.body.data).toBe('get');

                case 5:
                case 'end':
                  return _context13.stop();
              }
            }
          }, _callee13, undefined);
        })));
      });
      describe('Route.Post', function () {
        it('should call the post route', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
          var res;
          return _regenerator2.default.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  _context14.next = 2;
                  return request.post('/path/path/samepath');

                case 2:
                  res = _context14.sent;

                  (0, _expect2.default)(res.statusCode).toBeLessThan(400);
                  (0, _expect2.default)(res.body.data).toBe('post');

                case 5:
                case 'end':
                  return _context14.stop();
              }
            }
          }, _callee14, undefined);
        })));
      });
      describe('Route.Put', function () {
        it('should call the put route', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
          var res;
          return _regenerator2.default.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  _context15.next = 2;
                  return request.put('/path/path/samepath');

                case 2:
                  res = _context15.sent;

                  (0, _expect2.default)(res.statusCode).toBeLessThan(400);
                  (0, _expect2.default)(res.body.data).toBe('put');

                case 5:
                case 'end':
                  return _context15.stop();
              }
            }
          }, _callee15, undefined);
        })));
      });
      describe('Route.Patch', function () {
        it('should call the patch route', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
          var res;
          return _regenerator2.default.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  _context16.next = 2;
                  return request.patch('/path/path/samepath');

                case 2:
                  res = _context16.sent;

                  (0, _expect2.default)(res.statusCode).toBeLessThan(400);
                  (0, _expect2.default)(res.body.data).toBe('patch');

                case 5:
                case 'end':
                  return _context16.stop();
              }
            }
          }, _callee16, undefined);
        })));
      });
      describe('Route.Delete', function () {
        it('should call the delete route', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
          var res;
          return _regenerator2.default.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.next = 2;
                  return request.delete('/path/path/samepath');

                case 2:
                  res = _context17.sent;

                  (0, _expect2.default)(res.statusCode).toBeLessThan(400);
                  (0, _expect2.default)(res.body.data).toBe('delete');

                case 5:
                case 'end':
                  return _context17.stop();
              }
            }
          }, _callee17, undefined);
        })));
      });
    });
  });

  describe('params', function () {
    it('should keep only elem in params decorator', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
      var bodySend, _ref23, body, statusCode;

      return _regenerator2.default.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              bodySend = {
                email: 'clientnew@new.com',
                password: 'password',
                notPermited: 'notPermited'
              };
              _context18.next = 3;
              return request.post('/params').send(bodySend);

            case 3:
              _ref23 = _context18.sent;
              body = _ref23.body;
              statusCode = _ref23.statusCode;


              (0, _expect2.default)(statusCode).toBeLessThan(400);
              (0, _expect2.default)(body.data.original).toEqual(bodySend);
              (0, _expect2.default)(body.data.checked).toEqual({
                email: 'clientnew@new.com',
                password: 'password'
              });
              (0, _expect2.default)(body.data.checked.notPermited).toBe(undefined);

            case 10:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, undefined);
    })));
    it('should return 400 if required params are not send', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
      var respKO, respOK;
      return _regenerator2.default.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return request.post('/params').send({ password: 'password' });

            case 2:
              respKO = _context19.sent;

              (0, _expect2.default)(respKO.statusCode).toBe(400);

              _context19.next = 6;
              return request.post('/params').send({ email: 'email' });

            case 6:
              respOK = _context19.sent;

              (0, _expect2.default)(respOK.statusCode).toBeLessThan(400);

            case 8:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, undefined);
    })));
    it('should apply param only in the specific path and type', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20() {
      var bodySend, res;
      return _regenerator2.default.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              bodySend = {
                post: 'post',
                patch: 'patch'
              };
              _context20.next = 3;
              return request.post('/params/samepath').send(bodySend);

            case 3:
              res = _context20.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              (0, _expect2.default)(res.body.data).toEqual({ post: 'post' });
              (0, _expect2.default)(res.body.data.patch).toBe(undefined);
              _context20.next = 9;
              return request.patch('/params/samepath').send(bodySend);

            case 9:
              res = _context20.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              (0, _expect2.default)(res.body.data).toEqual({ patch: 'patch' });
              (0, _expect2.default)(res.body.data.post).toBe(undefined);

            case 13:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, undefined);
    })));
  });

  describe('ratelimit', function () {
    beforeEach((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21() {
      return _regenerator2.default.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _koa2Ratelimit.Stores.Memory.cleanAll();

            case 1:
            case 'end':
              return _context21.stop();
          }
        }
      }, _callee21, undefined);
    })));

    it('should stop user when too much request are made', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22() {
      var res;
      return _regenerator2.default.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return request.get('/rate-limit/min1max2');

            case 2:
              res = _context22.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context22.next = 6;
              return request.get('/rate-limit/min1max2');

            case 6:
              res = _context22.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context22.next = 10;
              return request.get('/rate-limit/min1max2');

            case 10:
              res = _context22.sent;

              (0, _expect2.default)(res.statusCode).toBe(429);

            case 12:
            case 'end':
              return _context22.stop();
          }
        }
      }, _callee22, undefined);
    })));

    it('should stop user only on a specific route', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23() {
      var res;
      return _regenerator2.default.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return request.get('/rate-limit/min1max2');

            case 2:
              res = _context23.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context23.next = 6;
              return request.get('/rate-limit/min1max2');

            case 6:
              res = _context23.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context23.next = 10;
              return request.get('/rate-limit/min1max2');

            case 10:
              res = _context23.sent;

              (0, _expect2.default)(res.statusCode).toBe(429);

              _context23.next = 14;
              return request.get('/rate-limit/sec2max2');

            case 14:
              res = _context23.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);

            case 16:
            case 'end':
              return _context23.stop();
          }
        }
      }, _callee23, undefined);
    })));

    it('should stop user when too much request are made et let him when time is past', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24() {
      var res;
      return _regenerator2.default.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return request.get('/rate-limit/sec2max2');

            case 2:
              res = _context24.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context24.next = 6;
              return request.get('/rate-limit/sec2max2');

            case 6:
              res = _context24.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context24.next = 10;
              return request.get('/rate-limit/sec2max2');

            case 10:
              res = _context24.sent;

              (0, _expect2.default)(res.statusCode).toBe(429);

              _context24.next = 14;
              return (0, _utils.wait)(2000);

            case 14:
              _context24.next = 16;
              return request.get('/rate-limit/sec2max2');

            case 16:
              res = _context24.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);

            case 18:
            case 'end':
              return _context24.stop();
          }
        }
      }, _callee24, undefined);
    })));

    it('should allow multiple ratelimit', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25() {
      var res;
      return _regenerator2.default.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return request.get('/rate-limit/min1max2-sec1max5');

            case 2:
              res = _context25.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context25.next = 6;
              return request.get('/rate-limit/min1max2-sec1max5');

            case 6:
              res = _context25.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context25.next = 10;
              return request.get('/rate-limit/min1max2-sec1max5');

            case 10:
              res = _context25.sent;

              (0, _expect2.default)(res.statusCode).toBe(429);

            case 12:
            case 'end':
              return _context25.stop();
          }
        }
      }, _callee25, undefined);
    })));

    it('should apply ratelimit only on specific type and path', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee26() {
      var res;
      return _regenerator2.default.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return request.get('/rate-limit/samepath-min1max2');

            case 2:
              res = _context26.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context26.next = 6;
              return request.get('/rate-limit/samepath-min1max2');

            case 6:
              res = _context26.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context26.next = 10;
              return request.get('/rate-limit/samepath-min1max2');

            case 10:
              res = _context26.sent;

              (0, _expect2.default)(res.statusCode).toBe(429);

              _context26.next = 14;
              return request.post('/rate-limit/samepath-min1max2');

            case 14:
              res = _context26.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context26.next = 18;
              return request.post('/rate-limit/samepath-min1max2');

            case 18:
              res = _context26.sent;

              (0, _expect2.default)(res.statusCode).toBeLessThan(400);
              _context26.next = 22;
              return request.post('/rate-limit/samepath-min1max2');

            case 22:
              res = _context26.sent;

              (0, _expect2.default)(res.statusCode).toBe(429);

            case 24:
            case 'end':
              return _context26.stop();
          }
        }
      }, _callee26, undefined);
    })));
  });
});