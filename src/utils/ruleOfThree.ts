export type RuleOfThreeMode = 'direct' | 'inverse';

/**
 * Direct: a/b = c/x → x = (b * c) / a
 * Inverse: a*b = c*x → x = (a * b) / c
 */
export function solveRuleOfThree(
  a: number,
  b: number,
  c: number,
  mode: RuleOfThreeMode
): number {
  if (![a, b, c].every((n) => Number.isFinite(n))) {
    throw new Error('All values must be finite numbers.');
  }
  if (mode === 'direct') {
    if (a === 0) throw new Error('O primeiro valor não pode ser zero na regra direta.');
    return (b * c) / a;
  }
  if (c === 0) throw new Error('O terceiro valor não pode ser zero na regra inversa.');
  return (a * b) / c;
}
