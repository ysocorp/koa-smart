import expect from 'expect';

import { Types } from '../../dist/types';

describe('TypeArray', () => {
  describe('type checking', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.array();
    });

    it('Should validate a string and turn it into an array of characters', async () => {
      let value = 'abcdefg';
      schema.test(value);
      expect(schema.value).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
    });

    it('Should validate an array', async () => {
      let value = [1, 2, 3];
      schema.test(value);
      expect(schema.value).toEqual(value);
    });

    it('Should reject a number', async () => {
      let value = 42;
      schema.test(value);
      expect(schema.error).toBeTruthy();
    });

    it('Should reject an object', async () => {
      let value = { some: 'param' };
      schema.test(value);
      expect(schema.error).toBeTruthy();
    });
  });

  describe('Option single', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.array().single();
    });

    it('Should validate a number in single mode', async () => {
      let value = 5;
      schema.test(value);
      expect(schema.value).toEqual([5]);
    });

    it('Should validate an object in single mode', async () => {
      let value = { some: 'param' };
      schema.test(value);
      expect(schema.value).toEqual([{ some: 'param' }]);
    });

    it('Should still validate arrays in single mode', async () => {
      let value = [1];
      schema.test(value);
      expect(schema.value).toEqual(value);
    });
  });

  describe('Option length', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.array().length(4);
    });

    it('Should validate a an array with the correct length', async () => {
      let value = [1, 2, 3, 4];
      schema.test(value);
      expect(schema.value).toEqual(value);
    });

    it('Should reject an array with a greater length', async () => {
      let value = [1, 2, 3, 4, 5];
      schema.test(value);
      expect(schema.error).toBeTruthy();
    });

    it('Should an array with a lesser length', async () => {
      let value = [1, 2, 3];
      schema.test(value);
      expect(schema.error).toBeTruthy();
    });
  });

  describe('Option min', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.array().min(4);
    });

    it('Should validate an array with length 6 >= 4', async () => {
      let value = [1, 2, 3, 4, 5, 6];
      schema.test(value);
      expect(schema.value).toEqual(value);
    });

    it('Should validate an array with length  4 >= 4', async () => {
      let value = [1, 2, 3, 4];
      schema.test(value);
      expect(schema.value).toEqual(value);
    });

    it('Should reject an array with length 3 >= 4', () => {
      let value = [1, 2, 3];
      schema.test(value);
      expect(schema.error).toBeTruthy();
    });
  });

  describe('Option max', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.array().max(6);
    });

    it('Should validate an array with length 4 <= 6', async () => {
      let value = [1, 2, 3, 4];
      schema.test(value);
      expect(schema.value).toEqual(value);
    });

    it('Should validate an array with length  6 <= 6', async () => {
      let value = [1, 2, 3, 4, 5, 6];
      schema.test(value);
      expect(schema.value).toEqual(value);
    });

    it('Should reject an array with length 7 <= 6', async () => {
      let value = [1, 2, 3, 4, 5, 6, 7];
      schema.test(value);
      expect(schema.error).toBeTruthy();
    });
  });

  describe('Option type', () => {
    let schema;
    beforeEach(() => {
      schema = Types.object().keys({
        listNumber: Types.array().type(Types.number()),
        listOfList: Types.array().type(Types.array().type(Types.number())),
      });
    });

    it('Should validate an array of numbers', () => {
      schema.test({ listNumber: [1, 2, 3, 4] });
      expect(schema.error).toBeNull();
    });

    it('Should reject an array of strings', () => {
      let value = { listNumber: ['hello', 'there'] };
      schema.test(value);
      expect(schema.error).not.toBeNull();
    });

    it('Should accept an array of array of numbers', () => {
      let value = { listOfList: [[1, 2], [3, 4]] };
      schema.test(value);
      expect(schema.error).toBeNull();
    });

    it('Should reject an array of array containing a string', () => {
      let value = {
        listOfList: [[4, 5], ['notANumber', 7]],
      };
      schema.test(value);
      expect(schema.error).not.toBeNull();
    });
  });

  describe('Top level array', () => {
    let schema;
    beforeEach(() => {
      schema = Types.array().type(Types.number());
    });

    it('Should validate an array of numbers', () => {
      let value = [1, 2, 3, 4];
      schema.test(value);
      expect(schema.error).toBeNull();
    });

    it('Should reject an array of string', () => {
      let value = ['hello', 'there'];
      schema.test(value);
      expect(schema.error).not.toBeNull();
    });
  });
});
