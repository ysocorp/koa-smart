import expect from 'expect';

import { Types } from '../../dist/types';
import { TypeObject } from '../../dist/types/TypeObject';

describe('TypeObject', () => {
  before(async () => {});

  after(async () => {});

  describe('Parse Object', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.object().keys({
        a: Types.string(),
        b: Types.string(),
        subObj: Types.object().keys({
          subA: Types.string().trim(false),
          subB: Types.string(),
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
      schema = Types.object().keys({
        a: Types.string().required(),
        b: Types.string(),
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
      schema = Types.object().keys({ a: Types.string().min(3) });
      const value = { a: 'my' };
      schema.test(value);
      expect(schema.errors.a).toBeTruthy();
    });

    it('should manage deep errors', async () => {
      schema = Types.object().keys({
        a: Types.any().required(),
        b: Types.any(),
        subObj: Types.object()
          .keys({
            subA: Types.any(),
            subB: Types.string()
              .max(3)
              .required(),
            subC: Types.any().required(),
            subD: Types.any().required(),
            sub2: Types.object()
              .keys({
                sub2A: Types.any(),
                sub2B: Types.any().required(),
              })
              .required(),
            sub3: Types.object()
              .keys({ sub3A: Types.any().required() })
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

    it('should force valid type definition', async () => {
      schema = Types.object<{
        a: string,
        b: number,
        g: Date,
        d: string | boolean | number,
        c: {
          a: number,
          b: string,
        } | number,
      }>().keys({
        a: Types.string(),
        b: Types.number(),
        g: Types.date(),
        d: Types.oneOf(),
        c: Types.object<{
          a: number;
          b: string;
        }>().keys({
          a: Types.number(),
          b: Types.string(),
        })
      });
    });
  });
});
