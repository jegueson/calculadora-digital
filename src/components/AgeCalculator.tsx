'use client';

import { useMemo, useState } from 'react';
import { calcExactAge } from '@/utils/age';
import { parseISODateLocal } from '@/utils/gestational';

export default function AgeCalculator() {
  const [birth, setBirth] = useState('');

  const result = useMemo(() => {
    const parsed = parseISODateLocal(birth);
    if (!parsed) return null;
    return calcExactAge(parsed);
  }, [birth]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="birth">
          Data de nascimento
        </label>
        <input
          id="birth"
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {birth && !result ? (
        <p className="text-red-600" role="alert">
          Informe uma data de nascimento válida no passado ou hoje.
        </p>
      ) : null}

      {result ? (
        <div className="rounded-lg bg-blue-50 p-4 space-y-1" aria-live="polite">
          <p className="text-lg font-semibold text-gray-900">
            {result.years} anos, {result.months} meses e {result.days} dias
          </p>
          <p className="text-gray-700">
            Total aproximado: <strong>{result.totalDays.toLocaleString('pt-BR')}</strong> dias de
            vida
          </p>
        </div>
      ) : null}
    </div>
  );
}
