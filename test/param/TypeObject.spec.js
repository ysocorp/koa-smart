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
      expect(schema.errors).toBeNull();
    });

    it('should not have errors if param receive as unknow params', async () => {
      schema.required().test();
      expect(schema.errors).toBeNull();
      expect(schema.error.code).toBe(schema._errorCodes.REQUIRED);
    });

    it('should not have errors if param not required is missing', async () => {
      const value = { a: 'myStr' };
      schema.test(value);
      expect(schema.errors).toBeNull();
    });

    it('should have errors if param required is missing', async () => {
      const value = { b: 'myStr2' };
      schema.test(value);
      expect(schema.errors.a).toBeTruthy();
    });

    it('should have errors if param is invalid', async () => {
      schema = Param.object().keys({ a: Param.string().min(3) });
      const value = { a: 'my' };
      schema.test(value);
      expect(schema.errors.a).toBeTruthy();
    });

    it('should manage deep errors', async () => {
      schema = Param.object().keys({
        a: Param.any().required(),
        b: Param.any(),
        subObj: Param.object()
          .keys({
            subA: Param.any(),
            subB: Param.string()
              .max(3)
              .required(),
            subC: Param.any().required(),
            subD: Param.any().required(),
            sub2: Param.object()
              .keys({
                sub2A: Param.any(),
                sub2B: Param.any().required(),
              })
              .required(),
            sub3: Param.object()
              .keys({ sub3A: Param.any().required() })
              .required(),
          })
          .required(),
      });

      schema.test({
        b: 'my',
        subObj: {
          subC: 'subC',
          subB: '1234',
          sub2: {},
        },
      });
      expect(Object.keys(schema.errors)).toEqual([
        'a',
        'subObj.subB',
        'subObj.subD',
        'subObj.sub2.sub2B',
        'subObj.sub3',
      ]);
    });
  });
});
