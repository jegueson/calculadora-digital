'use client';

import { useMemo, useState } from 'react';
import { formatBRL } from '@/utils/currency';

export default function ValeTransporteCalculator() {
  const [salary, setSalary] = useState(3000);
  const [dailyCost, setDailyCost] = useState(10);
  const [workDays, setWorkDays] = useState(22);

  const result = useMemo(() => {
    const sal = Math.max(0, salary);
    const days = Math.max(0, workDays);
    const cost = Math.max(0, dailyCost) * days;
    const cap = sal * 0.06;
    const discount = Math.min(cost, cap);
    const employerPays = cost - discount;
    return { cost, cap, discount, employerPays };
  }, [salary, dailyCost, workDays]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salário bruto (R$)
          </label>
          <input
            type="number"
            min={0}
            value={salary}
            onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Custo diário de transporte (ida + volta, R$)
          </label>
          <input
            type="number"
            min={0}
            step={0.5}
            value={dailyCost}
            onChange={(e) =>
              setDailyCost(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Dias úteis no mês
          </label>
          <input
            type="number"
            min={0}
            max={31}
            value={workDays}
            onChange={(e) =>
              setWorkDays(parseInt(e.target.value, 10) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Desconto legal</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Custo mensal necessário</span>
            <span>{formatBRL(result.cost)}</span>
          </li>
          <li className="flex justify-between">
            <span>Teto de desconto (6% do salário)</span>
            <span>{formatBRL(result.cap)}</span>
          </li>
          <li className="flex justify-between font-semibold text-red-600">
            <span>Desconto máximo no salário</span>
            <span>− {formatBRL(result.discount)}</span>
          </li>
          <li className="flex justify-between text-green-700">
            <span>Participação estimada do empregador</span>
            <span>{formatBRL(result.employerPays)}</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        O desconto não pode ultrapassar 6% do salário bruto (Lei 7.418/1985). Valores
        reais dependem do benefício concedido e do trajeto obrigatório casa–trabalho.
      </p>
    </div>
  );
}
