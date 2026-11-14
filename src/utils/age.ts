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
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.round((now.getTime() - birth.getTime()) / (24 * 60 * 60 * 1000));
  return { years, months, days, totalDays };
}
