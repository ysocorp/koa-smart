import expect from 'expect';

import { Param } from '../../dist/param/Param';

describe('TypeOneOf', () => {
  before(async () => {});

  after(async () => {});

  describe('Option types', () => {
    let schema;
    beforeEach(async () => {
      schema = Param.oneOf().types(
        Param.number(),
        Param.string(),
        Param.object().keys({
          b: Param.any().required(),
        }),
      );
    });

    it('should not alow unknow type', async () => {
      schema.test(true);
      expect(schema.value).toBe(true);
      expect(schema.error).toBeTruthy();
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
  });
});
