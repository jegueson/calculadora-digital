'use client';

import { useMemo, useState } from 'react';
import {
  calcNetSalaryInputs,
  IRRF_DEDUCTION_PER_DEPENDENT,
  INSS_CEILING_2025,
} from '@/utils/brazilPayroll';
import { formatBRL } from '@/utils/currency';

export default function NetSalaryCalculator() {
  const [gross, setGross] = useState(5000);
  const [dependents, setDependents] = useState(0);
  const [vtMonthly, setVtMonthly] = useState(200);
  const [usesVt, setUsesVt] = useState(true);

  const result = useMemo(() => {
    const g = Math.max(0, gross);
    const { inss, taxableBase, irrf, netBeforeVt } = calcNetSalaryInputs(
      g,
      Math.max(0, Math.floor(dependents))
    );
    const capVt = g * 0.06;
    const vtDiscount =
      usesVt && vtMonthly > 0 ? Math.min(vtMonthly, capVt) : 0;
    const net = netBeforeVt - vtDiscount;
    return {
      inss,
      taxableBase,
      irrf,
      vtDiscount,
      capVt,
      net,
      netBeforeVt,
    };
  }, [gross, dependents, vtMonthly, usesVt]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salário bruto mensal (R$)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={gross}
            onChange={(e) => setGross(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dependentes (IRRF)
          </label>
          <input
            type="number"
            min={0}
            max={99}
            value={dependents}
            onChange={(e) =>
              setDependents(parseInt(e.target.value, 10) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Dedução aproximada por dependente: {formatBRL(IRRF_DEDUCTION_PER_DEPENDENT)}
          </p>
        </div>
        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={usesVt}
              onChange={(e) => setUsesVt(e.target.checked)}
              className="rounded border-gray-300"
            />
            Usa vale-transporte (desconto legal até 6% do bruto)
          </label>
        </div>
        {usesVt && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Custo mensal do vale (R$)
            </label>
            <input
              type="number"
              min={0}
              step={1}
              value={vtMonthly}
              onChange={(e) =>
                setVtMonthly(parseFloat(e.target.value) || 0)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Teto de desconto: {formatBRL(result.capVt)}
            </p>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Resultado</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>INSS (até teto {formatBRL(INSS_CEILING_2025)})</span>
            <span className="font-medium text-red-600">
              − {formatBRL(result.inss)}
            </span>
          </li>
          <li className="flex justify-between">
            <span>IRRF (retido na fonte)</span>
            <span className="font-medium text-red-600">
              − {formatBRL(result.irrf)}
            </span>
          </li>
          {usesVt && (
            <li className="flex justify-between">
              <span>Vale-transporte (desconto aplicado)</span>
              <span className="font-medium text-red-600">
                − {formatBRL(result.vtDiscount)}
              </span>
            </li>
          )}
          <li className="flex justify-between border-t pt-2 text-base font-semibold">
            <span>Salário líquido estimado</span>
            <span className="text-green-700">{formatBRL(result.net)}</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Simulação aproximada para CLT: tabelas de INSS/IRRF e deduções podem mudar com a
        legislação. Não inclui sindicato, plano de saúde, outros descontos ou benefícios
        não tributáveis. Confirme com o departamento pessoal ou contador.
      </p>
    </div>
  );
}
