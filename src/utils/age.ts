import { startOfLocalDay } from './gestational.ts';

export interface ExactAge {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

/**
 * Exact age in years, months and days from a birth date to `today`.
 */
export function calcExactAge(birthDate: Date, today: Date = new Date()): ExactAge | null {
  const birth = startOfLocalDay(birthDate);
  const now = startOfLocalDay(today);
  if (birth.getTime() > now.getTime()) return null;

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    // Borrow full months until the day remainder is non-negative.
    // Needed when the previous month is shorter than the day deficit
    // (e.g. born on the 31st, today is March 1 after a 28-day February).
    let anchorYear = now.getFullYear();
    let anchorMonth = now.getMonth();
    while (days < 0) {
      months -= 1;
      days += new Date(anchorYear, anchorMonth, 0).getDate();
      anchorMonth -= 1;
      if (anchorMonth < 0) {
        anchorMonth = 11;
        anchorYear -= 1;
      }
    }
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.round((now.getTime() - birth.getTime()) / (24 * 60 * 60 * 1000));
  return { years, months, days, totalDays };
}
