/** Gestational age helpers using Naegele's rule (DUM + 280 days). */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function parseISODateLocal(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number): Date {
  const next = startOfLocalDay(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function diffCalendarDays(from: Date, to: Date): number {
  const a = startOfLocalDay(from).getTime();
  const b = startOfLocalDay(to).getTime();
  return Math.round((b - a) / MS_PER_DAY);
}

export interface GestationalResult {
  daysPregnant: number;
  weeks: number;
  daysRemainder: number;
  dueDate: Date;
  daysUntilDue: number;
}

/**
 * Estimate gestational age from last menstrual period (DUM).
 * Returns null when DUM is in the future relative to `today`.
 */
export function calcGestationalAge(dum: Date, today: Date = new Date()): GestationalResult | null {
  const daysPregnant = diffCalendarDays(dum, today);
  if (daysPregnant < 0) return null;
  const dueDate = addDays(dum, 280);
  return {
    daysPregnant,
    weeks: Math.floor(daysPregnant / 7),
    daysRemainder: daysPregnant % 7,
    dueDate,
    daysUntilDue: diffCalendarDays(today, dueDate),
  };
}

export function formatDatePtBr(date: Date): string {
  return date.toLocaleDateString('pt-BR');
}
