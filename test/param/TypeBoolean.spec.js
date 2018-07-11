import expect from 'expect';

import { Param } from '../../dist/param/Param';

describe('TypeBoolean', () => {
  describe('type checking', () => {
    let schema;
    beforeEach(async () => {
      schema = Param.boolean();
    });

    it('Should validate a false boolean', async () => {
      schema.test(false);
      expect(schema.value).toEqual(false);
      expect(schema.error).toBeNull();
    });

    it('Should validate a true boolean', async () => {
      schema.test(true);
      expect(schema.value).toEqual(true);
      expect(schema.error).toBeNull();
    });

    it('Should validate a "true" string and convert it to a boolean', async () => {
      schema.test('true');
      expect(schema.value).toEqual(true);
      expect(schema.error).toBeNull();
    });

    it('Should validate a "false" string and convert it to a boolean', async () => {
      schema.test('false');
      expect(schema.value).toEqual(false);
      expect(schema.error).toBeNull();
    });

    it('Should reject a number', async () => {
      schema.test(1);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });

    it('Should reject a string different from "true" and "false"', async () => {
      schema.test('test');
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
  });

  describe('Option truthy', () => {
    let schema;
    beforeEach(async () => {
      schema = Param.boolean().truthy(['Y', 'oui', 'yes', 1]);
    });

    it('should validate a value specified in the "truthy" parameter', async () => {
      schema.test('Y');
      expect(schema.value).toEqual(true);
      expect(schema.error).toBeNull();
    });

    it('should validate a value specified in the "truthy" parameter#2', async () => {
      schema.test(1);
      expect(schema.value).toEqual(true);
      expect(schema.error).toBeNull();
    });

    it('should reject a value not specified in the "truthy" parameter', async () => {
      schema.test('ja');
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
  });

  describe('Option falsy', () => {
    let schema;
    beforeEach(async () => {
      schema = Param.boolean().falsy(['N', 'non', 'no', 0]);
    });

    it('should validate a value specified in the "falsy" parameter', async () => {
      schema.test('N');
      expect(schema.value).toEqual(false);
      expect(schema.error).toBeNull();
    });

    it('should validate a value specified in the "falsy" parameter#2', async () => {
      schema.test(0);
      expect(schema.value).toEqual(false);
      expect(schema.error).toBeNull();
    });

    it('should reject a value not specified in the "falsy" parameter', async () => {
      schema.test('nein');
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
  });

  describe('Option insensitive true', () => {
    let schema;
    beforeEach(async () => {
      schema = Param.boolean()
        .insensitive(true)
        .falsy(['N', 'non']);
    });

    it('should validate a value specified in the "falsy" parameter, even with different casing', async () => {
      schema.test('n');
      expect(schema.value).toEqual(false);
      expect(schema.error).toBeNull();
    });

    it('should validate a value specified in the "falsy" parameter, even with different casing#2', async () => {
      schema.test('NoN');
      expect(schema.value).toEqual(false);
      expect(schema.error).toBeNull();
    });

    it('should validate a "true" string, even with different casing', async () => {
      schema.test('TrUe');
      expect(schema.value).toEqual(true);
      expect(schema.error).toBeNull();
    });

    it('should validate a "false" string, even with different casing', async () => {
      schema.test('FALSE');
      expect(schema.value).toEqual(false);
      expect(schema.error).toBeNull();
    });
  });

  describe('Option insensitive false', () => {
    let schema;
    beforeEach(async () => {
      schema = Param.boolean()
        .insensitive(false)
        .falsy(['N', 'non']);
    });

    it('should reject a value specified in the "falsy" parameter, even with different casing', async () => {
      schema.test('n');
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });

    it('should validate a value specified in the "falsy" parameter, even with different casing#2', async () => {
      schema.test('NoN');
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });

    it('should reject a "true" string with different casing', async () => {
      schema.test('TrUe');
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });

    it('should reject a "false" string with different casing', async () => {
      schema.test('FALSE');
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
  });
});
