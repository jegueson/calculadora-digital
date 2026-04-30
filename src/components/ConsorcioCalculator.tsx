'use client';

import { useMemo, useState } from 'react';
import { formatBRL } from '@/utils/currency';

export default function ConsorcioCalculator() {
  const [cartValue, setCartValue] = useState(120000);
  const [months, setMonths] = useState(100);
  const [adminPercentTotal, setAdminPercentTotal] = useState(18);
  const [reservePercent, setReservePercent] = useState(2);
  const [insuranceMonthly, setInsuranceMonthly] = useState(0);

  const result = useMemo(() => {
    const v = Math.max(0, cartValue);
    const n = Math.max(1, months);
    const adm = v * (Math.max(0, adminPercentTotal) / 100);
    const res = v * (Math.max(0, reservePercent) / 100);
    const base = v + adm + res;
    const parcelaMedia = base / n + insuranceMonthly;
    return { adm, res, base, parcelaMedia, totalPago: base + insuranceMonthly * n };
  }, [cartValue, months, adminPercentTotal, reservePercent, insuranceMonthly]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Valor da carta de crédito (R$)
          </label>
          <input
            type="number"
            min={0}
            value={cartValue}
            onChange={(e) => setCartValue(parseFloat(e.target.value) || 0)}
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
            max={240}
            value={months}
            onChange={(e) =>
              setMonths(parseInt(e.target.value, 10) || 1)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Taxa de administração total (% sobre carta)
          </label>
          <input
            type="number"
            min={0}
            step={0.5}
            value={adminPercentTotal}
            onChange={(e) =>
              setAdminPercentTotal(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fundo de reserva (% sobre carta)
          </label>
          <input
            type="number"
            min={0}
            step={0.1}
            value={reservePercent}
            onChange={(e) =>
              setReservePercent(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Seguro mensal estimado (R$, opcional)
          </label>
          <input
            type="number"
            min={0}
            value={insuranceMonthly}
            onChange={(e) =>
              setInsuranceMonthly(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Estimativa de fluxo
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Taxa de administração (valor)</span>
            <span>{formatBRL(result.adm)}</span>
          </li>
          <li className="flex justify-between">
            <span>Fundo de reserva</span>
            <span>{formatBRL(result.res)}</span>
          </li>
          <li className="flex justify-between">
            <span>Parcela média (aprox.)</span>
            <span className="font-semibold text-blue-700">
              {formatBRL(result.parcelaMedia)}
            </span>
          </li>
          <li className="flex justify-between border-t pt-2">
            <span>Total pago até quitação (aprox.)</span>
            <span className="font-semibold text-green-700">
              {formatBRL(result.totalPago)}
            </span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Modelo simplificado: consórcios têm lances, contemplação, correção monetária e
        encargos que variam por administradora. Use apenas como ordem de grandeza.
      </p>
    </div>
  );
}
