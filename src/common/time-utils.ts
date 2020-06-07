import moment from 'moment';

export class TimeUtils {
  static isInDateStringForm(date: string): boolean {
    const yyyyMmDd = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    return yyyyMmDd.test(date);
  }

  static buildTimestampLimits(
    date: string
  ): { startDate: Date; endDate: Date } {
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
      throw new Error('Date is invalid');
    }

    const [year, month, day] = date.split('-');
    const startDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      0,
      0,
      0,
      0
    );

    const endDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day) + 1, // +1 day at 12am
      0,
      0,
      0,
      0
    );

    return { startDate, endDate };
  }
}
