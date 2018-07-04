import expect from 'expect';

import { Param } from '../../dist/param/Param';

describe('TypeNumber', () => {
  before(async () => {});

  after(async () => {});

  describe('General', () => {
    it('Should test type integer', async () => {
      const shema = Param.object().keys({
        ok1: Param.number().integer(),
        ok2: Param.number().integer(),
        ok3: Param.number().integer(),
        ok4: Param.number().integer(),
        ok5: Param.number().integer(),
        ok6: Param.number().integer(),
        ok7: Param.number().integer(),
        ko1: Param.number().integer(),
        ko2: Param.number().integer(),
        ko3: Param.number().integer(),
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

      shema.test(value);

      expect(shema.value).toEqual({
        ...ok,
        ok4: 20,
        ok5: 0,
        ok6: -20,
        ok7: 20,
      });
      expect(Object.keys(ko)).toEqual(Object.keys(shema._errors));
    });

    it('Should test type number', async () => {
      const shema = Param.object().keys({
        ok1: Param.number(),
        ok2: Param.number(),
        ok3: Param.number(),
        ok4: Param.number(),
        ok5: Param.number(),
        ok6: Param.number(),
        ko1: Param.number(),
        ko2: Param.number(),
        ko3: Param.number(),
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

      shema.test(value);

      expect(shema.value).toEqual({ ...ok, ok4: 20.3, ok5: 0.3, ok6: -20.3 });
      expect(Object.keys(ko)).toEqual(Object.keys(shema._errors));
    });
  });

  describe('Option max', () => {
    let shema;
    beforeEach(async () => {
      shema = Param.number().max(10);
    });

    it('Should test if 10 >= -10', async () => {
      let value = -10;
      shema.test(value);
      expect(shema.value).toEqual(value);
    });
    it('Should test if 10 >= 10', async () => {
      let value = 10;
      shema.test(value);
      expect(shema.value).toEqual(value);
    });
    it('Should test if 10 >= 10.00', async () => {
      let value = 10.0;
      shema.test(value);
      expect(shema.value).toEqual(value);
    });
    it('Should test if 10 >= "9.99"', async () => {
      let value = 9.99;
      shema.test(value);
      expect(shema.value).toEqual(value);
    });
    it('Should test if 10 < 10.0001', async () => {
      let value = 10.0001;
      shema.test(value);
      expect(shema.error).toBeTruthy();
    });
  });

  describe('Option min', () => {
    let shema;
    beforeEach(async () => {
      shema = Param.number().min(9);
    });

    it('Should test if 9 <= 9', async () => {
      let value = 9;
      shema.test(value);
      expect(shema.value).toEqual(value);
    });
    it('Should test if 9 <= 10', async () => {
      let value = 10;
      shema.test(value);
      expect(shema.value).toEqual(value);
    });
    it('Should test if 9 <= 9.00', async () => {
      let value = 9.0;
      shema.test(value);
      expect(shema.value).toEqual(value);
    });
    it('Should test if 9 >= 8.99', async () => {
      let value = 8.99;
      shema.test(value);
      expect(shema.error).toBeTruthy();
    });
  });

  describe('Option positive', () => {
    let shema;
    beforeEach(async () => {
      shema = Param.number().positive();
    });

    it('Should test if 0 is positive', async () => {
      let value = 0;
      shema.test(value);
      expect(shema.value).toEqual(value);
    });
    it('Should test if -0 is positive', async () => {
      let value = -0;
      shema.test(value);
      expect(shema.value).toEqual(0);
    });
    it('Should test if -0.01 is not positive', async () => {
      let value = -0.01;
      shema.test(value);
      expect(shema.error).toBeTruthy();
    });
    it('Should test if -1 is not positive', async () => {
      let value = -1;
      shema.test(value);
      expect(shema.error).toBeTruthy();
    });
  });

  describe('Option negative', () => {
    let shema;
    beforeEach(async () => {
      shema = Param.number().negative();
    });

    it('Should test if -1 is negative', async () => {
      let value = -1;
      shema.test(value);
      expect(shema.value).toEqual(value);
    });
    it('Should test if -0.1 is negative', async () => {
      let value = -0.1;
      shema.test(value);
      expect(shema.value).toEqual(value);
    });
    it('Should test if 1 is not negative', async () => {
      let value = 1;
      shema.test(value);
      expect(shema.error).toBeTruthy();
    });
    it('Should test if 0 is not negative', async () => {
      let value = 0;
      shema.test(value);
      expect(shema.error).toBeTruthy();
    });
  });

  describe('Option multiple', () => {
    let shema;
    beforeEach(async () => {
      shema = Param.number().multiple(2);
    });

    it('Should test if 0 is a multiple of 2', async () => {
      let value = 0;
      shema.test(value);
      expect(shema.value).toEqual(value);
    });

    it('Should test if 2 is a multiple of 2', async () => {
      let value = 2;
      shema.test(2);
      expect(shema.value).toEqual(value);
    });

    it('Should test if 1 is not a multiple of 2', async () => {
      shema.test(1);
      expect(shema.error).toBeTruthy();
    });
  });

  describe('Option precision', () => {
    describe('trunc', () => {
      let shema;
      beforeEach(async () => {
        shema = Param.number().precision(2, 'trunc');
      });

      it('Should trunc 1.1235 to 1.12', async () => {
        shema.test(1.1235);
        expect(shema.value).toEqual(1.12);
      });
      it('Should trunc 1.129 to 1.12', async () => {
        shema.test(1.129);
        expect(shema.value).toEqual(1.12);
      });
      it('Should trunc -1.129 to -1.12', async () => {
        shema.test(-1.129);
        expect(shema.value).toEqual(-1.12);
      });
      it('Should trunc -1.123 to -1.12', async () => {
        shema.test(-1.123);
        expect(shema.value).toEqual(-1.12);
      });
    });

    describe('floor', () => {
      let shema;
      beforeEach(async () => {
        shema = Param.number().precision(2, 'floor');
      });

      it('Should floor 1.1235 to 1.12', async () => {
        shema.test(1.1235);
        expect(shema.value).toEqual(1.12);
      });
      it('Should floor 1.129 to 1.12', async () => {
        shema.test(1.129);
        expect(shema.value).toEqual(1.12);
      });
      it('Should floor -1.129 to -1.13', async () => {
        shema.test(-1.129);
        expect(shema.value).toEqual(-1.13);
      });
      it('Should floor -1.123 to -1.13', async () => {
        let value = -1.123;
        shema.test(value);
        expect(shema.value).toEqual(-1.13);
      });
    });

    describe('ceil', () => {
      let shema;
      beforeEach(async () => {
        shema = Param.number().precision(2, 'ceil');
      });

      it('Should ceil 1.1235 to 1.13', async () => {
        shema.test(1.1235);
        expect(shema.value).toEqual(1.13);
      });
      it('Should ceil 1.129 to 1.13', async () => {
        shema.test(1.129);
        expect(shema.value).toEqual(1.13);
      });
      it('Should ceil -1.129 to -1.12', async () => {
        shema.test(-1.129);
        expect(shema.value).toEqual(-1.12);
      });
      it('Should ceil -1.123 to -1.12', async () => {
        shema.test(-1.123);
        expect(shema.value).toEqual(-1.12);
      });
    });

    describe('round', () => {
      let shema;
      beforeEach(async () => {
        shema = Param.number().precision(2, 'round');
      });

      it('Should round 1.1235 to 1.12', async () => {
        shema.test(1.1235);
        expect(shema.value).toEqual(1.12);
      });
      it('Should round 1.129 to 1.13', async () => {
        shema.test(1.129);
        expect(shema.value).toEqual(1.13);
      });
      it('Should round -1.129 to -1.13', async () => {
        shema.test(-1.129);
        expect(shema.value).toEqual(-1.13);
      });
      it('Should round -1.123 to -1.12', async () => {
        shema.test(-1.123);
        expect(shema.value).toEqual(-1.12);
      });
    });
  });
});
