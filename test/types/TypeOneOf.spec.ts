import expect from 'expect';

import { Types } from '../../dist/types';

describe('TypeOneOf', () => {
  before(async () => {});

  after(async () => {});

  describe('Option types', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.oneOf().types(
        Types.number(),
        Types.string(),
        Types.object().keys({
          b: Types.any().required(),
        })
      );
    });

    it('should not alow unknow type', async () => {
      schema.test(true);
      expect(schema.value).toBe(true);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_VALUE);
    });

    it('should not have errors if param receive as unknow params', async () => {
      schema.test('myStr');
      expect(schema.value).toBe('myStr');
      expect(schema.error).toBeNull();
    });

    it('should not have errors if param receive as unknow params', async () => {
      schema.test(12);
      expect(schema.value).toBe(12);
      expect(schema.error).toBeNull();
    });

    it('should validate type constraint', async () => {
      const s = Types.oneOf<[number, string, boolean, { a: string }]>()
        .types(Types.number(), Types.string(), Types.boolean(), Types.object<{ a: string }>());
    });
  });
});
