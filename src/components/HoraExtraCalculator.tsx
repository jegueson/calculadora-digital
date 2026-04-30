'use client';

import { useMemo, useState } from 'react';
import { formatBRL } from '@/utils/currency';

const HORAS_MES_REF = 220;

export default function HoraExtraCalculator() {
  const [salary, setSalary] = useState(3300);
  const [hours50, setHours50] = useState(10);
  const [hours100, setHours100] = useState(0);
  const [nightHours, setNightHours] = useState(0);

  const result = useMemo(() => {
    const sal = Math.max(0, salary);
    const h = sal / HORAS_MES_REF;
    const pay50 = Math.max(0, hours50) * h * 1.5;
    const pay100 = Math.max(0, hours100) * h * 2.0;
    const payNight = Math.max(0, nightHours) * h * 1.2;
    return { h, pay50, pay100, payNight, total: pay50 + pay100 + payNight };
  }, [salary, hours50, hours100, nightHours]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salário base (R$)
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
            Valor hora (calculado ÷ {HORAS_MES_REF}h)
          </label>
          <p className="mt-2 text-lg font-semibold text-gray-800">
            {formatBRL(result.h)}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Horas extras 50% (dia útil)
          </label>
          <input
            type="number"
            min={0}
            value={hours50}
            onChange={(e) =>
              setHours50(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Horas extras 100% (domingo/feriado)
          </label>
          <input
            type="number"
            min={0}
            value={hours100}
            onChange={(e) =>
              setHours100(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Horas noturnas (22h–5h) pagas com adicional de 20%
          </label>
          <input
            type="number"
            min={0}
            value={nightHours}
            onChange={(e) =>
              setNightHours(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
          <p className="mt-1 text-xs text-gray-500">
            Aqui cada hora noturna é paga como hora normal × 1,2 (simplificado). A hora
            noturna pode ser reduzida (52m30s) na conversão — ajuste com seu RH.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Pagamento extra</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>HE 50%</span>
            <span>{formatBRL(result.pay50)}</span>
          </li>
          <li className="flex justify-between">
            <span>HE 100%</span>
            <span>{formatBRL(result.pay100)}</span>
          </li>
          <li className="flex justify-between">
            <span>Noturno (20%)</span>
            <span>{formatBRL(result.payNight)}</span>
          </li>
          <li className="flex justify-between border-t pt-2 font-semibold text-green-700">
            <span>Total</span>
            <span>{formatBRL(result.total)}</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Não soma combinações de HE + noturno no mesmo período (pode haver acúmulo conforme
        convenção coletiva). Use como referência inicial.
      </p>
    </div>
  );
}
