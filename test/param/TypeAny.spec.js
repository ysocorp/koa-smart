import expect from 'expect';

import { Param } from '../../dist/param/Param';

describe('TypeAny', () => {
  before(async () => {});

  after(async () => {});

  describe('Allow types', () => {
    let shema;
    beforeEach(async () => {
      shema = Param.any();
    });

    it('Should allow type string', async () => {
      shema.test('toto');
      expect(shema.error).toBeFalsy();
    });
    it('Should allow type boolean', async () => {
      shema.test(true);
      expect(shema.error).toBeFalsy();
      shema.test(false);
      expect(shema.error).toBeFalsy();
    });
    it('Should allow type number', async () => {
      shema.test(123);
      expect(shema.error).toBeFalsy();
    });
    it('Should allow type array', async () => {
      shema.test([123, 'tutu']);
      expect(shema.error).toBeFalsy();
    });
    it('Should allow type object', async () => {
      shema.test({ tutu: 'toto' });
      expect(shema.error).toBeFalsy();
    });
    it('Should allow null', async () => {
      shema.test(null);
      expect(shema.error).toBeFalsy();
    });
    it('Should allow undefined', async () => {
      shema.test();
      expect(shema.error).toBeFalsy();
    });
  });

  describe('Option required', () => {
    let shema;
    beforeEach(async () => {
      shema = Param.any().required();
    });

    it('Should not allow undefined', async () => {
      shema.test();
      expect(shema.error).toBeTruthy();
    });
    it('Should not allow null', async () => {
      shema.test();
      expect(shema.error).toBeTruthy();
    });
    describe('with option allowNull', () => {
      it('Should allow null', async () => {
        shema.allowNull().test(null);
        expect(shema.error).toBeFalsy();
      });
    });
  });

  describe('Option allowNull', () => {
    describe('With param = false', () => {
      it('Should not allow null', async () => {
        const shema = Param.any().allowNull(false);
        shema.test(null);
        expect(shema.error).toBeTruthy();
      });
    });
    describe('With param = true', () => {
      it('Should allow null', async () => {
        const shema = Param.any().allowNull(true);
        shema.test(null);
        expect(shema.error).toBeFalsy();
      });
    });
  });

  describe('Option default', () => {
    it('Should return the default value if value = null', async () => {
      const shema = Param.any().default('default');
      shema.test(null);
      expect(shema.value).toBe('default');
      expect(shema.error).toBeFalsy();
    });
    it('Should not return default if the value is not null', async () => {
      const shema = Param.any().default('default');
      shema.test('not null');
      expect(shema.value).toBe('not null');
      expect(shema.error).toBeFalsy();
    });
    it('Should return default if has error', async () => {
      const shema = Param.any()
        .default('default')
        .required();
      shema.test(null);
      expect(shema.value).toBe('default');
      expect(shema._hasError).toBe(true);
      expect(shema.error).toBeFalsy();
    });
  });
});
