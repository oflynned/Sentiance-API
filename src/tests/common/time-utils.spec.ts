import { TimeUtils } from '../../common/time-utils';

describe('Time utils', () => {
  describe('#isInDateStringForm', () => {
    it('should return false with malformed date', () => {
      expect(TimeUtils.isInDateStringForm('2020-01')).toBeFalsy();
    });

    it('should return false with missing leading zeros', () => {
      expect(TimeUtils.isInDateStringForm('2020-1-1')).toBeFalsy();
    });

    it('should return true with legal date date', () => {
      expect(TimeUtils.isInDateStringForm('2020-01-01')).toBeTruthy();
    });
  });

  describe('#buildTimestampLimits', () => {
    const { startDate, endDate } = TimeUtils.buildTimestampLimits('2020-01-01');

    it('should return object', () => {
      const timestamp = TimeUtils.buildTimestampLimits('2020-01-01');
      expect(typeof timestamp).toBe('object');
    });

    it('should return timestamp details', function() {
      const timestamp = TimeUtils.buildTimestampLimits('2020-01-01');
      expect(Object.keys(timestamp).length).toEqual(2);
      expect(Object.keys(timestamp)).toContain('startDate');
      expect(Object.keys(timestamp)).toContain('endDate');
    });

    it('end date should be after start date', () => {
      expect(endDate.getTime() > startDate.getTime()).toBeTruthy();
      expect(endDate.getTime() - startDate.getTime()).toEqual(86400000);
    });

    it('should start at 12am on the same date', () => {
      expect(startDate.getHours()).toEqual(0);
      expect(startDate.getMinutes()).toEqual(0);
      expect(startDate.getSeconds()).toEqual(0);
      expect(startDate.getMilliseconds()).toEqual(0);
    });

    it('should throw error on nonsensical date', () => {
      expect(() => TimeUtils.buildTimestampLimits('2020-01-32')).toThrow(Error);
    });
  });
});
