import expect from 'expect';

import { Param } from '../../src/param/Param';

describe('TypeOneOf', () => {
  before(async () => {});

  after(async () => {});

  describe('Option types', () => {
    let shema;
    beforeEach(async () => {
      shema = Param.oneOf().types(
        Param.number(),
        Param.string(),
        Param.object().keys({
          b: Param.any().required(),
        }),
      );
    });

    it('should not alow unknow type', async () => {
      shema.test(true);
      expect(shema.error).toBeTruthy();
    });

    it('should not have errors if param receive as unknow params', async () => {
      shema.test('myStr');
      expect(shema.error).toBeNull();
    });

    it('should not have errors if param receive as unknow params', async () => {
      shema.test(12);
      expect(shema.error).toBeNull();
    });
  });
});
