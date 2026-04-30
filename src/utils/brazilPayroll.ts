/**
 * Approximate CLT payroll helpers for Brazil (INSS + monthly IRRF withholding).
 * Official ceilings and tables change periodically — update constants from official sources.
 */

/** INSS employee contribution ceiling (2025 reference — verify annually). */
export const INSS_CEILING_2025 = 8157.41;

const INSS_BRACKETS: { upTo: number; rate: number }[] = [
  { upTo: 1518.0, rate: 0.075 },
  { upTo: 2793.88, rate: 0.09 },
  { upTo: 4190.83, rate: 0.12 },
  { upTo: INSS_CEILING_2025, rate: 0.14 },
];

/**
 * Progressive INSS (Regime Geral) on gross salary, capped at ceiling.
 */
export function calcInssEmployee(gross: number): number {
  if (gross <= 0) return 0;
  const base = Math.min(gross, INSS_CEILING_2025);
  let prev = 0;
  let total = 0;
  for (const b of INSS_BRACKETS) {
    if (base <= prev) break;
    const slice = Math.min(base, b.upTo) - prev;
    if (slice > 0) total += slice * b.rate;
    prev = b.upTo;
  }
  return Math.round(total * 100) / 100;
}

/** Deduction per dependent for monthly IRRF base (approximate — verify annually). */
export const IRRF_DEDUCTION_PER_DEPENDENT = 189.59;

/**
 * Monthly IRRF withholding on taxable base (after INSS and dependent deductions).
 * Progressive monthly table — verify updates at Receita Federal.
 */
export function calcIrrfMonthlyWithholding(taxableBase: number): number {
  if (taxableBase <= 0) return 0;
  if (taxableBase <= 2259.2) return 0;
  if (taxableBase <= 2826.65) {
    return Math.max(0, Math.round((taxableBase * 0.075 - 169.44) * 100) / 100);
  }
  if (taxableBase <= 3751.05) {
    return Math.max(0, Math.round((taxableBase * 0.15 - 381.44) * 100) / 100);
  }
  if (taxableBase <= 4664.68) {
    return Math.max(0, Math.round((taxableBase * 0.225 - 662.77) * 100) / 100);
  }
  return Math.max(0, Math.round((taxableBase * 0.275 - 896.0) * 100) / 100);
}

export function calcNetSalaryInputs(gross: number, dependents: number): {
  inss: number;
  taxableBase: number;
  irrf: number;
  netBeforeVt: number;
} {
  const inss = calcInssEmployee(gross);
  const taxableBase = Math.max(
    0,
    gross - inss - dependents * IRRF_DEDUCTION_PER_DEPENDENT
  );
  const irrf = calcIrrfMonthlyWithholding(taxableBase);
  const netBeforeVt = gross - inss - irrf;
  return { inss, taxableBase, irrf, netBeforeVt };
}
