'use client';

import { useMemo, useState } from 'react';
import {
  calcGestationalAge,
  formatDatePtBr,
  parseISODateLocal,
} from '@/utils/gestational';

export default function GestationalCalculator() {
  const [dum, setDum] = useState('');

  const result = useMemo(() => {
    const parsed = parseISODateLocal(dum);
    if (!parsed) return null;
    return calcGestationalAge(parsed);
  }, [dum]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="dum">
          Data da última menstruação (DUM)
        </label>
        <input
          id="dum"
          type="date"
          value={dum}
          onChange={(e) => setDum(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {dum && !result ? (
        <p className="text-red-600" role="alert">
          Informe uma DUM válida no passado ou hoje.
        </p>
      ) : null}

      {result ? (
        <div className="rounded-lg bg-blue-50 p-4 space-y-2" aria-live="polite">
          <p className="text-lg font-semibold text-gray-900">
            Idade gestacional: {result.weeks} semanas e {result.daysRemainder} dias
          </p>
          <p className="text-gray-700">
            Dias desde a DUM: <strong>{result.daysPregnant}</strong>
          </p>
          <p className="text-gray-700">
            Data provável do parto (DPP): <strong>{formatDatePtBr(result.dueDate)}</strong>
          </p>
          <p className="text-gray-700">
            {result.daysUntilDue >= 0
              ? `Faltam cerca de ${result.daysUntilDue} dias para a DPP.`
              : `A DPP estimada já passou há ${Math.abs(result.daysUntilDue)} dias.`}
          </p>
          <p className="text-sm text-gray-500">
            Estimativa educativa pela regra de Naegele (DUM + 280 dias). Não substitui ultrassom
            nem orientação médica.
          </p>
        </div>
      ) : null}
    </div>
  );
}
