import expect from 'expect';

import { Param } from '../../src/param/Param';

describe.only('TypeObject', () => {
  before(async () => {});

  after(async () => {});

  describe('skdjsdljkl', () => {
    it('should disabled all route when disable = true on Class Decorator', async () => {
      const shema = Param.object().keys({
        a: Param.string(),
        b: Param.string(),
        subObj: Param.object().keys({
          subA: Param.string(),
          subB: Param.string(),
        }),
      });

      const object = {
        a: '     myStr    ',
        b: '     myStr2    ',
        subObj: {
          subA: 'myStrSubA',
          subB: 'myStrSubB',
          subC: 'myStrSubC',
        },
      };

      shema.test({ object, key: 'obj', value: object });

      console.log('value', shema.value);
      console.log('value::_errors', shema._errors);
    });
  });
});
