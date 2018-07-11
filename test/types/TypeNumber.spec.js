import expect from 'expect';

import { Types } from '../../dist/types';

describe('TypeNumber', () => {
  before(async () => {});

  after(async () => {});

  describe('General', () => {
    it('Should test type integer', async () => {
      const schema = Types.object().keys({
        ok1: Types.number().integer(),
        ok2: Types.number().integer(),
        ok3: Types.number().integer(),
        ok4: Types.number().integer(),
        ok5: Types.number().integer(),
        ok6: Types.number().integer(),
        ok7: Types.number().integer(),
        ko1: Types.number().integer(),
        ko2: Types.number().integer(),
        ko3: Types.number().integer(),
      });

      const ok = {
        ok1: 10,
        ok2: 0,
        ok3: -10,
        ok4: '20',
        ok5: '0',
        ok6: '-20',
        ok7: '20.10',
      };
      const ko = { ko1: 'a20', ko2: '20a', ko3: '20,10' };
      const value = { ...ok, ...ko };

      schema.test(value);

      expect(schema.value).toEqual({
        ...ok,
        ok4: 20,
        ok5: 0,
        ok6: -20,
        ok7: 20,
      });
      expect(Object.keys(ko)).toEqual(Object.keys(schema._errors));
    });

    it('Should test type number', async () => {
      const schema = Types.object().keys({
        ok1: Types.number(),
        ok2: Types.number(),
        ok3: Types.number(),
        ok4: Types.number(),
        ok5: Types.number(),
        ok6: Types.number(),
        ko1: Types.number(),
        ko2: Types.number(),
        ko3: Types.number(),
      });

      const ok = {
        ok1: 10.2,
        ok2: 0,
        ok3: -10.2,
        ok4: '20.30',
        ok5: '0.30',
        ok6: '-20.30',
      };
      const ko = { ko1: 'a20', ko2: '20a', ko3: '20,10' };
      const value = { ...ok, ...ko };

      schema.test(value);

      expect(schema.value).toEqual({ ...ok, ok4: 20.3, ok5: 0.3, ok6: -20.3 });
      expect(Object.keys(ko)).toEqual(Object.keys(schema._errors));
    });
  });

  describe('Option max', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.number().max(10);
    });

    it('Should test if 10 >= -10', async () => {
      let value = -10;
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });
    it('Should test if 10 >= 10', async () => {
      let value = 10;
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });
    it('Should test if 10 >= 10.00', async () => {
      let value = 10.0;
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });
    it('Should test if 10 >= "9.99"', async () => {
      let value = 9.99;
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });
    it('Should test if 10 < 10.0001', async () => {
      let value = 10.0001;
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
  });

  describe('Option min', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.number().min(9);
    });

    it('Should test if 9 <= 9', async () => {
      let value = 9;
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });
    it('Should test if 9 <= 10', async () => {
      let value = 10;
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });
    it('Should test if 9 <= 9.00', async () => {
      let value = 9.0;
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });
    it('Should test if 9 >= 8.99', async () => {
      let value = 8.99;
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
  });

  describe('Option positive', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.number().positive();
    });

    it('Should test if 0 is positive', async () => {
      let value = 0;
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });
    it('Should test if -0 is positive', async () => {
      let value = -0;
      schema.test(value);
      expect(schema.value).toEqual(0);
      expect(schema.error).toBeNull();
    });
    it('Should test if -0.01 is not positive', async () => {
      let value = -0.01;
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
    it('Should test if -1 is not positive', async () => {
      let value = -1;
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
  });

  describe('Option negative', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.number().negative();
    });

    it('Should test if -1 is negative', async () => {
      let value = -1;
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });
    it('Should test if -0.1 is negative', async () => {
      let value = -0.1;
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });
    it('Should test if 1 is not negative', async () => {
      let value = 1;
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
    it('Should test if 0 is not negative', async () => {
      let value = 0;
      schema.test(value);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
  });

  describe('Option multiple', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.number().multiple(2);
    });

    it('Should test if 0 is a multiple of 2', async () => {
      let value = 0;
      schema.test(value);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });

    it('Should test if 2 is a multiple of 2', async () => {
      let value = 2;
      schema.test(2);
      expect(schema.value).toEqual(value);
      expect(schema.error).toBeNull();
    });

    it('Should test if 1 is not a multiple of 2', async () => {
      schema.test(1);
      expect(schema.error).toBeTruthy();
      expect(schema.error.code).toBe(schema._errorCodes.INVALIDE_VALUE);
    });
  });

  describe('Option precision', () => {
    describe('trunc', () => {
      let schema;
      beforeEach(async () => {
        schema = Types.number().precision(2, 'trunc');
      });

      it('Should trunc 1.1235 to 1.12', async () => {
        schema.test(1.1235);
        expect(schema.value).toEqual(1.12);
        expect(schema.error).toBeNull();
      });
      it('Should trunc 1.129 to 1.12', async () => {
        schema.test(1.129);
        expect(schema.value).toEqual(1.12);
        expect(schema.error).toBeNull();
      });
      it('Should trunc -1.129 to -1.12', async () => {
        schema.test(-1.129);
        expect(schema.value).toEqual(-1.12);
        expect(schema.error).toBeNull();
      });
      it('Should trunc -1.123 to -1.12', async () => {
        schema.test(-1.123);
        expect(schema.value).toEqual(-1.12);
        expect(schema.error).toBeNull();
      });
    });

    describe('floor', () => {
      let schema;
      beforeEach(async () => {
        schema = Types.number().precision(2, 'floor');
      });

      it('Should floor 1.1235 to 1.12', async () => {
        schema.test(1.1235);
        expect(schema.value).toEqual(1.12);
        expect(schema.error).toBeNull();
      });
      it('Should floor 1.129 to 1.12', async () => {
        schema.test(1.129);
        expect(schema.value).toEqual(1.12);
        expect(schema.error).toBeNull();
      });
      it('Should floor -1.129 to -1.13', async () => {
        schema.test(-1.129);
        expect(schema.value).toEqual(-1.13);
        expect(schema.error).toBeNull();
      });
      it('Should floor -1.123 to -1.13', async () => {
        let value = -1.123;
        schema.test(value);
        expect(schema.value).toEqual(-1.13);
        expect(schema.error).toBeNull();
      });
    });

    describe('ceil', () => {
      let schema;
      beforeEach(async () => {
        schema = Types.number().precision(2, 'ceil');
      });

      it('Should ceil 1.1235 to 1.13', async () => {
        schema.test(1.1235);
        expect(schema.value).toEqual(1.13);
        expect(schema.error).toBeNull();
      });
      it('Should ceil 1.129 to 1.13', async () => {
        schema.test(1.129);
        expect(schema.value).toEqual(1.13);
        expect(schema.error).toBeNull();
      });
      it('Should ceil -1.129 to -1.12', async () => {
        schema.test(-1.129);
        expect(schema.value).toEqual(-1.12);
        expect(schema.error).toBeNull();
      });
      it('Should ceil -1.123 to -1.12', async () => {
        schema.test(-1.123);
        expect(schema.value).toEqual(-1.12);
        expect(schema.error).toBeNull();
      });
    });

    describe('round', () => {
      let schema;
      beforeEach(async () => {
        schema = Types.number().precision(2, 'round');
      });

      it('Should round 1.1235 to 1.12', async () => {
        schema.test(1.1235);
        expect(schema.value).toEqual(1.12);
        expect(schema.error).toBeNull();
      });
      it('Should round 1.129 to 1.13', async () => {
        schema.test(1.129);
        expect(schema.value).toEqual(1.13);
        expect(schema.error).toBeNull();
      });
      it('Should round -1.129 to -1.13', async () => {
        schema.test(-1.129);
        expect(schema.value).toEqual(-1.13);
        expect(schema.error).toBeNull();
      });
      it('Should round -1.123 to -1.12', async () => {
        schema.test(-1.123);
        expect(schema.value).toEqual(-1.12);
        expect(schema.error).toBeNull();
      });
    });
  });
});
