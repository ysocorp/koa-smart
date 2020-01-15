import expect from 'expect';

import { Types } from '../../dist/types';

describe('TypeBinary', () => {
  describe('type checking', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.binary();
    });

    it('Should validate a string and turn it into a buffer object', async () => {
      let value = 'abcdefg';
      schema.test(value);
      expect(schema.value).toEqual(Buffer.from('abcdefg'));
      expect(schema.error).toBeNull();
    });

    it('Should validate an array and turn it into a buffer object', async () => {
      let value = [1, 2, 5];
      schema.test(value);
      expect(schema.value).toEqual(Buffer.from([1, 2, 5]));
      expect(schema.error).toBeNull();
    });

    it('Should validate a buffer', async () => {
      let value = Buffer.from([1, 2, 5]);
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });

    it('Should reject a number', async () => {
      let value = 42;
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_TYPE);
    });
  });

  describe('Option encoding', () => {
    let schema;

    it('Should decode a string into a hex buffer', async () => {
      schema = Types.binary().encoding('hex');
      let value = '7468697320697320612074c3a97374';
      schema.test(value);
      expect(schema.value.toString()).toEqual('this is a tést');
      expect(schema.error).toBeNull();
    });

    it('Should reject an input with an invalid encoding', async () => {
      schema = Types.binary().encoding('notactuallyanencoding');
      let value = '7468697320697320612074c3a97374';
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_TYPE);
    });
  });

  describe('Option length', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.binary().length(4);
    });

    it('Should validate a buffer with the correct length (string)', async () => {
      let value = 'abcd';
      schema.test(value);
      expect(schema.value).toEqual(Buffer.from('abcd'));
      expect(schema.error).toBeNull();
    });

    it('Should reject a buffer with an incorrect length (string)', async () => {
      let value = 'abcde';
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_VALUE);
    });

    it('Should validate a buffer with the correct length (numbers)', async () => {
      let value = [1, 2, 3, 4];
      schema.test(value);
      expect(schema.value).toEqual(Buffer.from([1, 2, 3, 4]));
      expect(schema.error).toBeNull();
    });

    it('Should reject a buffer with an incorrect length (numbers)', async () => {
      let value = [1, 2, 3];
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_VALUE);
    });

    it('Should validate a raw buffer with the correct length', async () => {
      let value = Buffer.alloc(4);
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });

    it('Should reject a raw buffer with an incorrect length', async () => {
      let value = Buffer.alloc(6);
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_VALUE);
    });
  });

  describe('Option min', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.binary().min(4);
    });

    it('Should validate a buffer with length 6 >= 4', async () => {
      let value = Buffer.alloc(6);
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });

    it('Should validate a buffer with length  4 >= 4', async () => {
      let value = Buffer.alloc(4);
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });

    it('Should reject a buffer with length 3 >= 4', async () => {
      let value = Buffer.alloc(3);
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_VALUE);
    });
  });

  describe('Option max', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.binary().max(6);
    });

    it('Should validate a buffer with length 4 <= 6', async () => {
      let value = Buffer.alloc(4);
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });

    it('Should validate a buffer with length  6 <= 6', async () => {
      let value = Buffer.alloc(6);
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });

    it('Should reject a buffer with length 7 <= 4', async () => {
      let value = Buffer.alloc(7);
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALID_VALUE);
    });
  });
});
