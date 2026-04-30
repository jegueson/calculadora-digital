'use client';

import { useMemo, useState } from 'react';
import { formatBRL } from '@/utils/currency';

export default function DecimoTerceiroFeriasCalculator() {
  const [salary, setSalary] = useState(3000);
  const [months13, setMonths13] = useState(12);
  const [monthsVacation, setMonthsVacation] = useState(12);
  const [sellThirdVacation, setSellThirdVacation] = useState(false);

  const decimo = useMemo(() => {
    const sal = Math.max(0, salary);
    const m = Math.min(12, Math.max(0, months13));
    return (m / 12) * sal;
  }, [salary, months13]);

  const ferias = useMemo(() => {
    const sal = Math.max(0, salary);
    const m = Math.min(12, Math.max(0, monthsVacation));
    const umSalario = (m / 12) * sal;
    const terco = umSalario / 3;
    const total = umSalario + terco;
    const abono = sellThirdVacation ? umSalario / 3 : 0;
    return { umSalario, terco, total, abono, withAbono: total + abono };
  }, [salary, monthsVacation, sellThirdVacation]);

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-md font-semibold text-gray-800 mb-3">
          13º salário proporcional
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salário base (R$)
            </label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={salary}
              onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meses trabalhados no ano (0–12)
            </label>
            <input
              type="number"
              min={0}
              max={12}
              value={months13}
              onChange={(e) =>
                setMonths13(parseInt(e.target.value, 10) || 0)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
        </div>
        <p className="mt-3 text-lg font-semibold text-green-700">
          13º proporcional: {formatBRL(decimo)}
        </p>
      </section>

      <section>
        <h3 className="text-md font-semibold text-gray-800 mb-3">
          Férias proporcionais + 1/3 constitucional
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meses do período aquisitivo (0–12)
            </label>
            <input
              type="number"
              min={0}
              max={12}
              value={monthsVacation}
              onChange={(e) =>
                setMonthsVacation(parseInt(e.target.value, 10) || 0)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={sellThirdVacation}
                onChange={(e) => setSellThirdVacation(e.target.checked)}
                className="rounded border-gray-300"
              />
              Incluir abono pecuniário (vender 1/3 das férias)
            </label>
          </div>
        </div>
        <ul className="mt-3 space-y-1 text-sm text-gray-700">
          <li className="flex justify-between">
            <span>Parcela “um salário” de férias</span>
            <span>{formatBRL(ferias.umSalario)}</span>
          </li>
          <li className="flex justify-between">
            <span>1/3 constitucional</span>
            <span>{formatBRL(ferias.terco)}</span>
          </li>
          {sellThirdVacation && (
            <li className="flex justify-between">
              <span>Abono (1/3 vendido)</span>
              <span>{formatBRL(ferias.abono)}</span>
            </li>
          )}
          <li className="flex justify-between font-semibold text-green-700 border-t pt-2">
            <span>Total férias</span>
            <span>
              {formatBRL(sellThirdVacation ? ferias.withAbono : ferias.total)}
            </span>
          </li>
        </ul>
      </section>

      <p className="text-xs text-gray-500 leading-relaxed">
        Valores ilustrativos: na prática podem incidir médias de horas extras, comissões e
        adicionais sobre o salário-base. Confirme com RH ou jurídico.
      </p>
    </div>
  );
}
