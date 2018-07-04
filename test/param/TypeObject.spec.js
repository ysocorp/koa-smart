import expect from 'expect';

import { Param } from '../../src/param/Param';

describe('TypeObject', () => {
  before(async () => {});

  after(async () => {});

  describe('Parse Object', () => {
    let shema;
    beforeEach(async () => {
      shema = Param.object().keys({
        a: Param.string(),
        b: Param.string(),
        subObj: Param.object().keys({
          subA: Param.string().trim(false),
          subB: Param.string(),
        }),
      });
    });

    it('should parse all sub object', async () => {
      const value = {
        a: '     myStr    ',
        b: '     myStr2    ',
        subObj: { subA: ' myStrSubA ', subB: ' myStrSubB ' },
      };
      shema.test(value);

      expect(shema.value).toEqual({
        a: 'myStr',
        b: 'myStr2',
        subObj: { subA: ' myStrSubA ', subB: 'myStrSubB' },
      });
    });

    it('should delete not specified values', async () => {
      const value = {
        a: 'myStr',
        b: 'myStr2',
        c: 'myStr2',
        subObj: { subA: 'myStrSubA', subB: 'myStrSubB', subC: 'myStrSubC' },
      };

      shema.test(value);

      expect(shema.value).toEqual({
        a: 'myStr',
        b: 'myStr2',
        subObj: { subA: 'myStrSubA', subB: 'myStrSubB' },
      });
    });
  });

  describe('Error', () => {
    let shema;
    beforeEach(async () => {
      shema = Param.object().keys({
        a: Param.string().required(),
        b: Param.string(),
      });
    });

    it('should not have errors if param receive as unknow params', async () => {
      const value = {
        a: '     myStr    ',
        b: '     myStr2    ',
        subObj: { subA: ' myStrSubA ', subB: ' myStrSubB ' },
      };
      shema.test(value);
      expect(shema.errors()).toEqual({});
    });

    it('should not have errors if param not required is missing', async () => {
      const value = { a: 'myStr' };
      shema.test(value);
      expect(shema.errors()).toEqual({});
    });

    it('should have errors if param required is missing', async () => {
      const value = { b: 'myStr2' };
      shema.test(value);
      expect(shema.errors().a).toBeTruthy();
    });

    it('should have errors if param is invalid', async () => {
      shema = Param.object().keys({ a: Param.string().min(3) });
      const value = { a: 'my' };
      shema.test(value);
      expect(shema.errors().a).toBeTruthy();
    });
  });
});
