import { addDays, diffCalendarDays, startOfLocalDay } from './gestational.ts';

/** Fixed national holidays (month/day). Movable holidays are omitted on purpose. */
const FIXED_NATIONAL_HOLIDAYS = new Set([
  '01-01',
  '04-21',
  '05-01',
  '09-07',
  '10-12',
  '11-02',
  '11-15',
  '11-20',
  '12-25',
]);

function holidayKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function isFixedNationalHoliday(date: Date): boolean {
  return FIXED_NATIONAL_HOLIDAYS.has(holidayKey(date));
}

export function isBusinessDay(date: Date, excludeFixedHolidays = true): boolean {
  if (isWeekend(date)) return false;
  if (excludeFixedHolidays && isFixedNationalHoliday(date)) return false;
  return true;
}

/**
 * Count business days between two dates (exclusive of the end date by default,
 * inclusive of the start when start is a business day). Matches common
 * "dias úteis entre datas" UX: start inclusive, end exclusive.
 */
export function countBusinessDays(
  start: Date,
  end: Date,
  options: { excludeFixedHolidays?: boolean; inclusiveEnd?: boolean } = {}
): number {
  const excludeFixedHolidays = options.excludeFixedHolidays ?? true;
  const inclusiveEnd = options.inclusiveEnd ?? false;
  const from = startOfLocalDay(start);
  const to = startOfLocalDay(end);
  if (to.getTime() < from.getTime()) {
    return -countBusinessDays(end, start, options);
  }

  let count = 0;
  let cursor = from;
  const last = inclusiveEnd ? to : addDays(to, -1);
  while (cursor.getTime() <= last.getTime()) {
    if (isBusinessDay(cursor, excludeFixedHolidays)) count += 1;
    cursor = addDays(cursor, 1);
  }
  return count;
}

export function calendarDaysBetween(start: Date, end: Date): number {
  return Math.abs(diffCalendarDays(start, end));
}

export { addDays, diffCalendarDays, startOfLocalDay };
