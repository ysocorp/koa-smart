import expect from 'expect';

import { Types } from '../../dist/types';

describe('TypeDate', () => {
  describe('type checking', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.object().keys({ date: Types.date() });
    });

    it('Should validate classical JS date', async () => {
      let object = { date: new Date() };
      schema.test(object);
      expect(schema.value).toEqual(object);
    });

    it('Should reject a string not representing a classical JS date', async () => {
      let object = { date: 'notADate' };
      schema.test(object);
      expect(schema.value).toEqual({});
    });

    it('Should validate a string representing a classical JS date', async () => {
      let object = { date: '11-21-2018' };
      schema.test(object);
      expect(schema.value).toEqual({ date: new Date('11-21-2018') });
    });
  });

  describe('Option format', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.object().keys({
        date: Types.date().formatIn('DD/MM/YYYY'),
      });
    });

    it('Should validate a string in the given format, and convert it into a date', async () => {
      let object = { date: '23/05/2018' };
      schema.test(object);
      expect(schema.value).toEqual({ date: new Date('05-23-2018') });
    });

    it('Should validate a string in the given format, and convert it into a date', async () => {
      let object = { date: '23-05-2018' };
      schema.test(object);
      expect(schema.value).toEqual({});
    });
  });

  describe('Option min', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.object().keys({
        date: Types.date().min(new Date('05-18-2018')),
      });
    });

    it('Should validate a date that is more recent than the min value', async () => {
      let object = { date: '05-23-2018' };
      schema.test(object);
      expect(schema.value).toEqual({ date: new Date('05-23-2018') });
    });

    it('Should reject a date that is older than the min value', async () => {
      let object = { date: '05-17-2018' };
      schema.test(object);
      expect(schema.value).toEqual({});
    });
  });

  describe('Option max', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.object().keys({
        date: Types.date().max(new Date('05-18-2018')),
      });
    });

    it('Should reject a date that is more recent than the max value', async () => {
      let object = { date: '05-23-2018' };
      schema.test(object);
      expect(schema.value).toEqual({});
    });

    it('Should validate a date that is older than the max value', async () => {
      let object = { date: '05-17-2018' };
      schema.test(object);
      expect(schema.value).toEqual({ date: new Date('05-17-2018') });
    });
  });

  describe('Option iso', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.object().keys({
        date: Types.date().iso(),
      });
    });

    it('Should reject a date that is not in ISO format', () => {
      let object = { date: '23-05-2018' };
      schema.test(object);
      expect(schema.value).toEqual({});
    });

    it('Should validate a date that is in ISO format', () => {
      let object = { date: '2018-05-24T14:48:00.000Z' };
      schema.test(object);
      expect(schema.value).toEqual({
        date: new Date('2018-05-24T14:48:00.000Z'),
      });
    });
  });

  describe('Option startOf', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.date().startOf('day');
    });

    it('Should format a date to the start of a day', () => {
      let date = new Date('2020-12-30T12:00:00');
      schema.test(date);
      expect(schema.value).toEqual(new Date('2020-12-30T00:00:00.000'));
    });
  });

  describe('Option endOf', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.date().endOf('day');
    });

    it('Should format a date to the start of a day', () => {
      let date = new Date('2020-12-30T12:00:00');
      schema.test(date);
      expect(schema.value).toEqual(new Date('2020-12-30T23:59:59.999'));
    });
  });

  describe('Option formatOut', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.date().formatOut('DD:MM:YYYY');
    });

    it('Should transform a date and set it to the right format', () => {
      let date = new Date('05/23/1995');
      schema.test(date);
      expect(schema.value).toEqual('23:05:1995');
    });
  });

  describe('Option between', () => {
    let schema;
    beforeEach(async () => {
      schema = Types.object().keys({
        date: Types.date().between(new Date('05-18-2018'), new Date('05-24-2018')),
      });
    });

    it('Should validate a date that is more recent than the min value', async () => {
      let object = { date: '05-23-2018' };
      schema.test(object);
      expect(schema.value).toEqual({ date: new Date('05-23-2018') });
    });

    it('Should reject a date that is older than the min value', async () => {
      let object = { date: '05-17-2018' };
      schema.test(object);
      expect(schema.value).toEqual({});
    });

    it('Should reject a date that is more recent than the max value', async () => {
      let object = { date: '05-27-2018' };
      schema.test(object);
      expect(schema.value).toEqual({});
    });

    it('Should validate a date that is older than the max value', async () => {
      let object = { date: '05-20-2018' };
      schema.test(object);
      expect(schema.value).toEqual({ date: new Date('05-20-2018') });
    });
  });
});
