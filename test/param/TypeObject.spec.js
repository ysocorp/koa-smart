import expect from 'expect';

import { Param } from '../../dist/param/Param';

describe('TypeObject', () => {
  before(async () => {});

  after(async () => {});

  describe('Parse Object', () => {
    let schema;
    beforeEach(async () => {
      schema = Param.object().keys({
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
      schema.test(value);

      expect(schema.value).toEqual({
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

      schema.test(value);

      expect(schema.value).toEqual({
        a: 'myStr',
        b: 'myStr2',
        subObj: { subA: 'myStrSubA', subB: 'myStrSubB' },
      });
    });
  });

  describe('Error', () => {
    let schema;
    beforeEach(async () => {
      schema = Param.object().keys({
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
      schema.test(value);
      expect(schema.errors()).toEqual({});
    });

    it('should not have errors if param not required is missing', async () => {
      const value = { a: 'myStr' };
      schema.test(value);
      expect(schema.errors()).toEqual({});
    });

    it('should have errors if param required is missing', async () => {
      const value = { b: 'myStr2' };
      schema.test(value);
      expect(schema.errors().a).toBeTruthy();
    });

    it('should have errors if param is invalid', async () => {
      schema = Param.object().keys({ a: Param.string().min(3) });
      const value = { a: 'my' };
      schema.test(value);
      expect(schema.errors().a).toBeTruthy();
    });
  });
});
