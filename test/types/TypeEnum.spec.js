import expect from 'expect';

import { Types } from '../../dist';

describe('TypeEnum', () => {
  describe('type checking', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.enum().oneOf();
    });

    it('Should validate a string', async () => {
      schema.test('string');
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });

    it('Should validate a number', async () => {
      schema.test(1);
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });

    it('Should reject a boolean', async () => {
      schema.test(true);
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_TYPE);
    });

    it('Should reject a object', async () => {
      schema.test({});
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_TYPE);
    });
  });

  describe('Option oneOf', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.enum().oneOf('TOTO', 1);
    });

    it('should validate a correct string', async () => {
      schema.test('TOTO');
      expect(schema.value).toEqual('TOTO');
      expect(schema.error).toBeNull();
    });

    it('should validate a correct number', async () => {
      schema.test(1);
      expect(schema.value).toEqual(1);
      expect(schema.error).toBeNull();
    });

    it('should reject a incorrect string', async () => {
      schema.test('TOTU');
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });

    it('should reject a incorrect number', async () => {
      schema.test(2);
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
  });

  describe('Option insensitive', () => {
    describe('insensitive = true', () => {
      let schema;
      beforeEach(async () => {
        schema = Types.enum().oneOf('ToTo', 1);
      });

      it('should validate a correct string in insensitive case', async () => {
        schema.test('toto');
        expect(schema.value).toEqual('ToTo');
        expect(schema.error).toBeNull();
      });
    });

    describe('insensitive = true', () => {
      let schema;
      beforeEach(async () => {
        schema = Types.enum()
          .oneOf('ToTo', 1)
          .insensitive(false);
      });

      it('should reject a correct a string even if it is correct in insensitive case', async () => {
        schema.test('toto');
        expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
      });
    });
  });

  describe('Option number', () => {
    describe('number = true', () => {
      let schema;
      beforeEach(async () => {
        schema = Types.enum().oneOf(1, 3, 5);
      });

      it('should convert a string to number if possible and valide the value if correct', async () => {
        schema.test('1');
        expect(schema.value).toEqual(1);
        expect(schema.error).toBeNull();
      });

      it('should convert a string to number if possible and reject the value if incorrect', async () => {
        schema.test('8');
        expect(schema.value).toEqual(8);
        expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
      });

      it('should not convert a string to number if it is not possible', async () => {
        schema.test('a1');
        expect(schema.value).toEqual('a1');
        expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
      });
    });

    describe('number = false', () => {
      let schema;
      beforeEach(async () => {
        schema = Types.enum()
          .oneOf(1, 3, 5)
          .number(false);
      });

      it('should not convert a string to number even if possible and reject the value if incorrect', async () => {
        schema.test('1');
        expect(schema.value).toEqual('1');
        expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
      });
    });
  });
});
