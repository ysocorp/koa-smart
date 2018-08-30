import expect from 'expect';

import { Types } from '../../dist/types';

describe('TypeAny', () => {
  before(async () => {});

  after(async () => {});

  describe('Set error message', () => {
    describe('Type String', () => {
      const custumMsg = 'My custum message';
      const schema = Types.object()
        .keys({
          rq: Types.string()
            .min(3)
            .required()
            .setErrorMsg(custumMsg),
        })
        .required();
      it('Should return the default value if value = null', async () => {
        schema.test({ rq: 'rq' });
        expect(schema.error.msg).toBe(custumMsg);
        schema.test({ rq: 5 });
        expect(schema.error.msg).toBe(custumMsg);
        schema.test({});
        expect(schema.error.msg).toBe(custumMsg);
      });
    });
    describe('Function', () => {
      const custumMsg = () => 'My custum message';
      const schema = Types.object()
        .keys({
          rq: Types.string()
            .min(3)
            .required()
            .setErrorMsg(custumMsg),
        })
        .required();
      it('Should return the default value if value = null', async () => {
        schema.test({ rq: 'rq' });
        expect(schema.error.msg).toBe(custumMsg());
        schema.test({ rq: 5 });
        expect(schema.error.msg).toBe(custumMsg());
        schema.test({});
        expect(schema.error.msg).toBe(custumMsg());
      });
    });
  });

  describe('Allow types', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.any();
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
      schema = Types.any().required();
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
        const schema = Types.any().allowNull(false);
        schema.test(null);
        expect(schema.error).toBeTruthy();
        expect(schema.error.code).toBe(schema._errorCodes.IS_NULL);
      });
    });
    describe('With param = true', () => {
      it('Should allow null', async () => {
        const schema = Types.any().allowNull(true);
        schema.test(null);
        expect(schema.error).toBeFalsy();
      });
    });
  });

  describe('Option default', () => {
    it('Should return the default value if value = null', async () => {
      const schema = Types.any().default('default');
      schema.test(null);
      expect(schema.value).toBe('default');
      expect(schema.error).toBeFalsy();
    });
    it('Should not return default if the value is not null', async () => {
      const schema = Types.any().default('default');
      schema.test('not null');
      expect(schema.value).toBe('not null');
      expect(schema.error).toBeFalsy();
    });
    it('Should return default if has error', async () => {
      const schema = Types.any()
        .default('default')
        .required();
      schema.test(null);
      expect(schema.value).toBe('default');
      expect(schema._hasError).toBe(true);
      expect(schema.error).toBeFalsy();
    });
  });
});
