import { startOfLocalDay } from './gestational.ts';

export interface ExactAge {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

/**
 * Exact age in years, months and days from a birth date to `today`.
 * Uses civil calendar months: when the birth day-of-month does not exist
 * in the previous month (e.g. Jan 31 → March), that day is clamped to the
 * last day of the month so a completed month is kept instead of dumping
 * everything into leftover days.
 */
export function calcExactAge(birthDate: Date, today: Date = new Date()): ExactAge | null {
  const birth = startOfLocalDay(birthDate);
  const now = startOfLocalDay(today);
  if (birth.getTime() > now.getTime()) return null;

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    const clampedBirthDay = Math.min(birth.getDate(), daysInPrevMonth);
    days = now.getDate() + (daysInPrevMonth - clampedBirthDay);
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.round((now.getTime() - birth.getTime()) / (24 * 60 * 60 * 1000));
  return { years, months, days, totalDays };
}
