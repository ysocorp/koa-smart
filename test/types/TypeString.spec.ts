import expect from 'expect';

import { Types } from '../../dist/types';

describe('TypeString', () => {
  describe('type checking', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.string();
    });

    it('Should validate a string', async () => {
      schema.test('');
      expect(schema.error).toBeNull();
    });

    it('Should reject a number', async () => {
      schema.test(1);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_TYPE);
    });
  });

  describe('Option min', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.string().min(5);
    });

    it('should validate a value with length equale to the min', async () => {
      schema.test('12345');
      expect(schema.value).toEqual('12345');
      expect(schema.error).toBeNull();
    });

    it('should reject a value with length less than the min', async () => {
      schema.test('1234');
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_VALUE);
    });
  });

  describe('Option max', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.string().max(5);
    });

    it('should validate a value with length equale to the max', async () => {
      schema.test('12345');
      expect(schema.value).toEqual('12345');
      expect(schema.error).toBeNull();
    });

    it('should reject a value with length greather than the max', async () => {
      schema.test('123456');
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_VALUE);
    });
  });

  describe('Option length', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.string().length(5);
    });

    it('should validate a value with length equale to the length', async () => {
      schema.test('12345');
      expect(schema.value).toEqual('12345');
      expect(schema.error).toBeNull();
    });

    it('should reject a value with not equale length', async () => {
      schema.test('123456');
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_VALUE);
      schema.test('123');
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_VALUE);
    });
  });

  describe('Option regex', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.string().regex(/^\d+$/);
    });

    it('should validate a value that match the regex', async () => {
      schema.test('126');
      expect(schema.error).toBeNull();
    });

    it('should reject a value that not match the regex', async () => {
      schema.test('nei');
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_VALUE);
    });
  });

  describe('Option trim', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.string()
        .min(5)
        .trim();
    });

    it('should trim the value', async () => {
      schema.test('    12345    ');
      expect(schema.value).toEqual('12345');
      expect(schema.error).toBeNull();
    });

    it('should trim the value then test the length', async () => {
      schema.test('    12345    ');
      expect(schema.value).toEqual('12345');
      expect(schema.error).toBeNull();
    });
  });

  describe('Option truncate', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.string()
        .trim()
        .truncate();
    });

    it('should truncate to the max', async () => {
      schema.max(5).test('    123456789    ');
      expect(schema.value).toEqual('12345');
      expect(schema.error).toBeNull();
    });
    it('should truncate to the length', async () => {
      schema.length(5).test('    123456789    ');
      expect(schema.value).toEqual('12345');
      expect(schema.error).toBeNull();
    });
    it('should not truncate if no "length" and "max" are set', async () => {
      schema.test('    123456789    ');
      expect(schema.value).toEqual('123456789');
      expect(schema.error).toBeNull();
    });
  });

  describe('Option uppercase', () => {
    it('should tranform value to Uppercase', async () => {
      let schema = Types.string().uppercase();
      schema.test('    1aBc289    ');
      expect(schema.value).toEqual('1ABC289');
      expect(schema.error).toBeNull();
    });
  });

  describe('Option lowercase', () => {
    it('should tranform value to Lowercase', async () => {
      let schema = Types.string().lowercase();
      schema.test('    1aBc289    ');
      expect(schema.value).toEqual('1abc289');
      expect(schema.error).toBeNull();
    });
  });

  describe('Option replace', () => {
    it('should replace all "a" to "B"', async () => {
      let schema = Types.string().replace(/a/g, 'B');
      schema.test('I"am a');
      expect(schema.value).toEqual('I"Bm B');
      expect(schema.error).toBeNull();
    });
  });
});
