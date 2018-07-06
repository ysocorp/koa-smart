import expect from 'expect';

import { Param } from '../../dist/param/Param';

describe('TypeAny', () => {
  before(async () => {});

  after(async () => {});

  describe('Allow types', () => {
    let schema;
    beforeEach(async () => {
      schema = Param.any();
    });

    it('Should allow type string', async () => {
      schema.test('toto');
      expect(schema.error).toBeFalsy();
    });
    it('Should allow type boolean', async () => {
      schema.test(true);
      expect(schema.error).toBeFalsy();
      schema.test(false);
      expect(schema.error).toBeFalsy();
    });
    it('Should allow type number', async () => {
      schema.test(123);
      expect(schema.error).toBeFalsy();
    });
    it('Should allow type array', async () => {
      schema.test([123, 'tutu']);
      expect(schema.error).toBeFalsy();
    });
    it('Should allow type object', async () => {
      schema.test({ tutu: 'toto' });
      expect(schema.error).toBeFalsy();
    });
    it('Should allow null', async () => {
      schema.test(null);
      expect(schema.error).toBeFalsy();
    });
    it('Should allow undefined', async () => {
      schema.test();
      expect(schema.error).toBeFalsy();
    });
  });

  describe('Option required', () => {
    let schema;
    beforeEach(async () => {
      schema = Param.any().required();
    });

    it('Should not allow undefined', async () => {
      schema.test();
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.REQUIRED);
    });
    it('Should not allow null', async () => {
      schema.test(null);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.IS_NULL);
    });
    describe('with option allowNull', () => {
      it('Should allow null', async () => {
        schema.allowNull().test(null);
        expect(schema.error).toBeFalsy();
      });
    });
  });

  describe('Option allowNull', () => {
    describe('With param = false', () => {
      it('Should not allow null', async () => {
        const schema = Param.any().allowNull(false);
        schema.test(null);
        expect(schema.error).toBeTruthy();
        expect(schema.error.code).toBe(schema._errorCodes.IS_NULL);
      });
    });
    describe('With param = true', () => {
      it('Should allow null', async () => {
        const schema = Param.any().allowNull(true);
        schema.test(null);
        expect(schema.error).toBeFalsy();
      });
    });
  });

  describe('Option default', () => {
    it('Should return the default value if value = null', async () => {
      const schema = Param.any().default('default');
      schema.test(null);
      expect(schema.value).toBe('default');
      expect(schema.error).toBeFalsy();
    });
    it('Should not return default if the value is not null', async () => {
      const schema = Param.any().default('default');
      schema.test('not null');
      expect(schema.value).toBe('not null');
      expect(schema.error).toBeFalsy();
    });
    it('Should return default if has error', async () => {
      const schema = Param.any()
        .default('default')
        .required();
      schema.test(null);
      expect(schema.value).toBe('default');
      expect(schema._hasError).toBe(true);
      expect(schema.error).toBeFalsy();
    });
  });
});
