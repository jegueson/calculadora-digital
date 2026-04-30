'use client';

import { useMemo, useState } from 'react';
import { formatBRL } from '@/utils/currency';

type Sistema = 'price' | 'sac';

export default function VehicleFinanceCalculator() {
  const [vehicleValue, setVehicleValue] = useState(80000);
  const [downPayment, setDownPayment] = useState(15000);
  const [months, setMonths] = useState(48);
  const [annualRate, setAnnualRate] = useState(24);
  const [system, setSystem] = useState<Sistema>('price');

  const result = useMemo(() => {
    const principal = Math.max(0, vehicleValue - downPayment);
    const n = Math.max(1, months);
    const i = annualRate / 100 / 12;
    if (system === 'price') {
      const pmt =
        (principal * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
      const total = pmt * n + downPayment;
      const juros = total - vehicleValue;
      return { firstPayment: pmt, lastPayment: pmt, total, juros, pmt };
    }
    const amort = principal / n;
    let balance = principal;
    let totalInterest = 0;
    let first = 0;
    let last = 0;
    for (let k = 0; k < n; k++) {
      const interest = balance * i;
      const installment = amort + interest;
      if (k === 0) first = installment;
      last = installment;
      totalInterest += interest;
      balance -= amort;
    }
    const totalPaid = principal + totalInterest + downPayment;
    return {
      firstPayment: first,
      lastPayment: last,
      total: totalPaid,
      juros: totalInterest,
      pmt: first,
    };
  }, [vehicleValue, downPayment, months, annualRate, system]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Valor do veículo (R$)
          </label>
          <input
            type="number"
            min={0}
            value={vehicleValue}
            onChange={(e) =>
              setVehicleValue(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Entrada (R$)
          </label>
          <input
            type="number"
            min={0}
            value={downPayment}
            onChange={(e) =>
              setDownPayment(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prazo (meses)
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Taxa de juros ao ano (%)
          </label>
          <input
            type="number"
            min={0}
            step={0.1}
            value={annualRate}
            onChange={(e) =>
              setAnnualRate(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Sistema de amortização
          </label>
          <select
            value={system}
            onChange={(e) => setSystem(e.target.value as Sistema)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          >
            <option value="price">Price (parcelas fixas)</option>
            <option value="sac">SAC (parcelas decrescentes)</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Resumo</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Valor financiado</span>
            <span>
              {formatBRL(Math.max(0, vehicleValue - downPayment))}
            </span>
          </li>
          {system === 'price' ? (
            <li className="flex justify-between">
              <span>Parcela fixa</span>
              <span className="font-semibold text-blue-700">
                {formatBRL(result.pmt)}
              </span>
            </li>
          ) : (
            <>
              <li className="flex justify-between">
                <span>1ª parcela (aprox.)</span>
                <span>{formatBRL(result.firstPayment)}</span>
              </li>
              <li className="flex justify-between">
                <span>Última parcela (aprox.)</span>
                <span>{formatBRL(result.lastPayment)}</span>
              </li>
            </>
          )}
          <li className="flex justify-between">
            <span>Juros totais estimados</span>
            <span>{formatBRL(result.juros)}</span>
          </li>
          <li className="flex justify-between border-t pt-2 font-semibold">
            <span>Total pago (entrada + parcelas)</span>
            <span className="text-green-700">{formatBRL(result.total)}</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Simulação sem seguros, tarifas de cadastro ou IOF. No SAC, a primeira parcela é a mais
        alta; valores arredondados. Compare CET (Custo Efetivo Total) nos contratos reais.
      </p>
    </div>
  );
}
