'use client';

import { useMemo, useState } from 'react';
import { formatBRL } from '@/utils/currency';

/** Atualize periodicamente conforme portaria — valor ilustrativo. */
const DEFAULT_BPC_CEILING = 788.0;

export default function BpcLoasCalculator() {
  const [householdIncome, setHouseholdIncome] = useState(2500);
  const [people, setPeople] = useState(3);
  const [bpcCeiling, setBpcCeiling] = useState(DEFAULT_BPC_CEILING);

  const result = useMemo(() => {
    const p = Math.max(1, people);
    const perCapita = Math.max(0, householdIncome) / p;
    const underLine = perCapita <= bpcCeiling;
    return { perCapita, underLine };
  }, [householdIncome, people, bpcCeiling]);

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        O BPC exige critérios de idade ou deficiência com avaliação social (CadÚnico). Esta
        ferramenta apenas compara a renda familiar per capita ao teto — não substitui
        análise do INSS.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Renda familiar total mensal (R$)
          </label>
          <input
            type="number"
            min={0}
            value={householdIncome}
            onChange={(e) =>
              setHouseholdIncome(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pessoas no mesmo domicílio
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={people}
            onChange={(e) =>
              setPeople(parseInt(e.target.value, 10) || 1)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Teto de renda per capita (R$, ajuste conforme legislação vigente)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={bpcCeiling}
            onChange={(e) =>
              setBpcCeiling(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Comparativo</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Renda per capita</span>
            <span className="font-semibold">{formatBRL(result.perCapita)}</span>
          </li>
          <li className="flex justify-between">
            <span>Teto informado</span>
            <span>{formatBRL(bpcCeiling)}</span>
          </li>
          <li className="flex justify-between border-t pt-2 font-medium">
            <span>Requisito de renda (apenas uma das etapas)</span>
            <span
              className={
                result.underLine ? 'text-green-700' : 'text-red-600'
              }
            >
              {result.underLine
                ? 'Per capita no limite ou abaixo'
                : 'Per capita acima do teto'}
            </span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Fonte de renda, composição familiar e cadastro são verificados pelo governo. Consulte
        o site do INSS e o CRAS da sua cidade.
      </p>
    </div>
  );
}
