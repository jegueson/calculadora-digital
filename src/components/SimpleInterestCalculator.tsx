'use client';

import { useMemo, useState } from 'react';
import { calcSimpleInterest } from '@/utils/simpleInterest';
import { formatBRL } from '@/utils/currency';

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(1000);
  const [ratePercent, setRatePercent] = useState(1.5);
  const [periods, setPeriods] = useState(12);

  const result = useMemo(() => {
    try {
      return calcSimpleInterest({
        principal: Math.max(0, principal),
        ratePercent,
        periods: Math.max(0, periods),
      });
    } catch {
      return null;
    }
  }, [principal, ratePercent, periods]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="principal">
            Capital (R$)
          </label>
          <input
            id="principal"
            type="number"
            min={0}
            step={0.01}
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="rate">
            Taxa por período (%)
          </label>
          <input
            id="rate"
            type="number"
            step={0.01}
            value={ratePercent}
            onChange={(e) => setRatePercent(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="periods">
            Número de períodos
          </label>
          <input
            id="periods"
            type="number"
            min={0}
            step={1}
            value={periods}
            onChange={(e) => setPeriods(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      {result ? (
        <div className="rounded-lg bg-blue-50 p-4 space-y-1" aria-live="polite">
          <p className="text-gray-700">
            Juros: <strong>{formatBRL(result.interest)}</strong>
          </p>
          <p className="text-lg font-semibold text-gray-900">
            Montante: {formatBRL(result.total)}
          </p>
          <p className="text-sm text-gray-500">
            Fórmula: J = C × i × t · M = C + J. Para juros compostos, use a calculadora de juros
            compostos.
          </p>
        </div>
      ) : null}
    </div>
  );
}
