'use client';

import { useMemo, useState } from 'react';
import { formatBRL } from '@/utils/currency';

export default function CartaoCreditoCalculator() {
  const [balance, setBalance] = useState(5000);
  const [monthlyRate, setMonthlyRate] = useState(12);
  const [minPercent, setMinPercent] = useState(15);
  const [months, setMonths] = useState(6);

  const result = useMemo(() => {
    let b = Math.max(0, balance);
    const i = Math.max(0, monthlyRate) / 100;
    const minP = Math.max(0, minPercent) / 100;
    let totalInterest = 0;
    const n = Math.max(1, months);
    for (let m = 0; m < n; m++) {
      const interest = b * i;
      totalInterest += interest;
      const minPay = Math.max(b * minP, interest + 1);
      const pay = Math.min(minPay, b + interest);
      b = b + interest - pay;
      if (b <= 0.01) break;
    }
    return { totalInterest, remaining: b };
  }, [balance, monthlyRate, minPercent, months]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fatura parcelada / rotativa (saldo, R$)
          </label>
          <input
            type="number"
            min={0}
            value={balance}
            onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Juros ao mês (%)
          </label>
          <input
            type="number"
            min={0}
            step={0.1}
            value={monthlyRate}
            onChange={(e) =>
              setMonthlyRate(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pagamento mínimo (% do saldo)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={minPercent}
            onChange={(e) =>
              setMinPercent(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meses simulados
          </label>
          <input
            type="number"
            min={1}
            max={120}
            value={months}
            onChange={(e) =>
              setMonths(parseInt(e.target.value, 10) || 1)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Cenário aproximado (rotativo)
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Juros acumulados no período</span>
            <span className="text-red-600 font-medium">
              {formatBRL(result.totalInterest)}
            </span>
          </li>
          <li className="flex justify-between">
            <span>Saldo remanescente após o período</span>
            <span>{formatBRL(result.remaining)}</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Ilustração genérica do custo do crédito rotativo quando se paga só o mínimo. O
        contrato do seu banco define a taxa real, multas e IOF. Priorize quitar a fatura
        completa para evitar juros.
      </p>
    </div>
  );
}
