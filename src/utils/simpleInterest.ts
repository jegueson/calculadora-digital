export interface SimpleInterestInput {
  principal: number;
  ratePercent: number;
  periods: number;
}

export interface SimpleInterestResult {
  interest: number;
  total: number;
}

/**
 * Simple interest: J = C * i * t, M = C + J.
 * `ratePercent` is the rate per period (e.g. 1.5 for 1.5% per month).
 */
export function calcSimpleInterest({
  principal,
  ratePercent,
  periods,
}: SimpleInterestInput): SimpleInterestResult {
  if (principal < 0 || periods < 0) {
    throw new Error('Principal and periods must be non-negative.');
  }
  const rate = ratePercent / 100;
  const interest = Math.round(principal * rate * periods * 100) / 100;
  const total = Math.round((principal + interest) * 100) / 100;
  return { interest, total };
}
