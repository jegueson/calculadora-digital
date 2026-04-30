'use client';

import { useMemo, useState } from 'react';
import { formatBRL } from '@/utils/currency';

type Cenario = 'pedido' | 'sem_justa' | 'com_justa';

function diasAvisoPrevio(anosCompletos: number): number {
  const extra = Math.min(60, Math.floor(anosCompletos) * 3);
  return Math.min(90, 30 + extra);
}

export default function RescisaoCalculator() {
  const [salary, setSalary] = useState(3500);
  const [yearsWorked, setYearsWorked] = useState(3);
  const [months13, setMonths13] = useState(6);
  const [monthsVacation, setMonthsVacation] = useState(8);
  const [daysSalary, setDaysSalary] = useState(15);
  const [fgtsBalance, setFgtsBalance] = useState(12000);
  const [cenario, setCenario] = useState<Cenario>('sem_justa');
  const [avisoIndenizado, setAvisoIndenizado] = useState(true);

  const result = useMemo(() => {
    const sal = Math.max(0, salary);
    const d = Math.max(0, daysSalary);
    const saldoSalario = (d / 30) * sal;
    const decimo = (Math.min(12, Math.max(0, months13)) / 12) * sal;
    const feriasTerco =
      (Math.min(12, Math.max(0, monthsVacation)) / 12) * sal * (4 / 3);
    const diasAviso = diasAvisoPrevio(yearsWorked);
    const avisoValor =
      avisoIndenizado && cenario !== 'pedido'
        ? (diasAviso / 30) * sal
        : 0;
    const multaFgts =
      cenario === 'sem_justa' ? Math.max(0, fgtsBalance) * 0.4 : 0;
    const total =
      saldoSalario + decimo + feriasTerco + avisoValor + multaFgts;
    return {
      saldoSalario,
      decimo,
      feriasTerco,
      diasAviso,
      avisoValor,
      multaFgts,
      total,
    };
  }, [
    salary,
    yearsWorked,
    months13,
    monthsVacation,
    daysSalary,
    fgtsBalance,
    cenario,
    avisoIndenizado,
  ]);

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
            step={0.01}
            value={salary}
            onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Anos completos de serviço (aviso)
          </label>
          <input
            type="number"
            min={0}
            max={80}
            value={yearsWorked}
            onChange={(e) =>
              setYearsWorked(parseInt(e.target.value, 10) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
          <p className="mt-1 text-xs text-gray-500">
            Aviso proporcional: {result.diasAviso} dias (máx. 90)
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meses trabalhados no ano (13º proporcional)
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meses para férias proporcionais + 1/3
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dias de saldo de salário no último mês
          </label>
          <input
            type="number"
            min={0}
            max={31}
            value={daysSalary}
            onChange={(e) =>
              setDaysSalary(parseInt(e.target.value, 10) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Saldo FGTS (multa 40% se aplicável)
          </label>
          <input
            type="number"
            min={0}
            step={1}
            value={fgtsBalance}
            onChange={(e) =>
              setFgtsBalance(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Situação
          </label>
          <select
            value={cenario}
            onChange={(e) => setCenario(e.target.value as Cenario)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          >
            <option value="pedido">Pedido de demissão</option>
            <option value="sem_justa">Dispensa sem justa causa</option>
            <option value="com_justa">Dispensa com justa causa</option>
          </select>
        </div>
        <div className="flex items-end">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={avisoIndenizado}
              onChange={(e) => setAvisoIndenizado(e.target.checked)}
              className="rounded border-gray-300"
              disabled={cenario === 'pedido'}
            />
            Incluir aviso prévio indenizado (não se pedido de demissão)
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Estimativa de verbas
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Saldo de salário</span>
            <span>{formatBRL(result.saldoSalario)}</span>
          </li>
          <li className="flex justify-between">
            <span>13º proporcional</span>
            <span>{formatBRL(result.decimo)}</span>
          </li>
          <li className="flex justify-between">
            <span>Férias proporcionais + 1/3</span>
            <span>{formatBRL(result.feriasTerco)}</span>
          </li>
          <li className="flex justify-between">
            <span>Aviso prévio indenizado</span>
            <span>{formatBRL(result.avisoValor)}</span>
          </li>
          <li className="flex justify-between">
            <span>Multa de 40% sobre FGTS</span>
            <span>{formatBRL(result.multaFgts)}</span>
          </li>
          <li className="flex justify-between border-t pt-2 text-base font-semibold">
            <span>Total aproximado</span>
            <span className="text-green-700">{formatBRL(result.total)}</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Modelo educativo: não contempla todas as verbas (FGTS depositado, multa Art. 477,
        insalubridade, horas extras etc.). Em litígios, prazos e regras do aviso podem variar.
        Consulte um advogado trabalhista para o seu caso.
      </p>
    </div>
  );
}
