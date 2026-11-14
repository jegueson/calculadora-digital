import assert from 'node:assert/strict';
import test from 'node:test';
import { calcExactAge } from '../src/utils/age.ts';
import { calendarDaysBetween, countBusinessDays } from '../src/utils/dateDiff.ts';
import { compareEthanolGasoline } from '../src/utils/fuelCompare.ts';
import { calcGestationalAge, parseISODateLocal } from '../src/utils/gestational.ts';
import { solveRuleOfThree } from '../src/utils/ruleOfThree.ts';
import { calcSimpleInterest } from '../src/utils/simpleInterest.ts';

test('gestational age uses Naegele 280-day due date', () => {
  const dum = parseISODateLocal('2026-01-01');
  assert.ok(dum);
  const today = parseISODateLocal('2026-01-29');
  assert.ok(today);
  const result = calcGestationalAge(dum, today);
  assert.ok(result);
  assert.equal(result.weeks, 4);
  assert.equal(result.daysRemainder, 0);
  assert.equal(result.dueDate.getFullYear(), 2026);
  assert.equal(result.dueDate.getMonth(), 9);
  assert.equal(result.dueDate.getDate(), 8);
});

test('business days skip weekends', () => {
  const start = parseISODateLocal('2026-11-09'); // Monday
  const end = parseISODateLocal('2026-11-16'); // next Monday
  assert.ok(start && end);
  assert.equal(countBusinessDays(start, end, { excludeFixedHolidays: false }), 5);
  assert.equal(calendarDaysBetween(start, end), 7);
});

test('simple interest matches J = C * i * t', () => {
  const result = calcSimpleInterest({ principal: 1000, ratePercent: 1.5, periods: 12 });
  assert.equal(result.interest, 180);
  assert.equal(result.total, 1180);
});

test('rule of three direct and inverse', () => {
  assert.equal(solveRuleOfThree(2, 10, 5, 'direct'), 25);
  assert.equal(solveRuleOfThree(4, 6, 2, 'inverse'), 12);
});

test('fuel compare uses 70% rule and consumption path', () => {
  const rule = compareEthanolGasoline({ ethanolPrice: 4.19, gasolinePrice: 6.29 });
  assert.equal(rule.recommendation, 'ethanol');
  assert.equal(rule.usedConsumption, false);

  const precise = compareEthanolGasoline({
    ethanolPrice: 4.19,
    gasolinePrice: 6.29,
    ethanolKmPerLiter: 8,
    gasolineKmPerLiter: 11.5,
  });
  assert.equal(precise.usedConsumption, true);
  assert.equal(precise.recommendation, 'ethanol');
});

test('exact age handles month borrow', () => {
  const birth = parseISODateLocal('2000-05-20');
  const today = parseISODateLocal('2026-03-10');
  assert.ok(birth && today);
  const age = calcExactAge(birth, today);
  assert.ok(age);
  assert.equal(age.years, 25);
  assert.equal(age.months, 9);
  assert.equal(age.days, 18);
});

test('exact age keeps a civil month across short Februaries', () => {
  const birth = parseISODateLocal('2026-01-31');
  const today = parseISODateLocal('2026-03-01');
  assert.ok(birth && today);
  const age = calcExactAge(birth, today);
  assert.ok(age);
  // Jan 31 → Feb 28 (clamped) is one month; Feb 28 → Mar 1 is one day.
  assert.equal(age.years, 0);
  assert.equal(age.months, 1);
  assert.equal(age.days, 1);
  assert.ok(age.days >= 0);
});

test('fuel compare rejects zero prices with Portuguese error', () => {
  assert.throws(
    () => compareEthanolGasoline({ ethanolPrice: 0, gasolinePrice: 6 }),
    /preços maiores que zero/i
  );
});

test('business days count is absolute when dates are reversed in the UI helper path', () => {
  const start = parseISODateLocal('2026-11-16');
  const end = parseISODateLocal('2026-11-09');
  assert.ok(start && end);
  assert.equal(Math.abs(countBusinessDays(start, end, { excludeFixedHolidays: false })), 5);
});
