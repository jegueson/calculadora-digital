'use client';

import { useMemo, useState } from 'react';
import {
  calcNetSalaryInputs,
  INSS_CEILING_2025,
  IRRF_DEDUCTION_PER_DEPENDENT,
} from '@/utils/brazilPayroll';
import { formatBRL } from '@/utils/currency';

export default function PayrollCalculator() {
  const [gross, setGross] = useState(5000);
  const [dependents, setDependents] = useState(0);
  const [otherDiscounts, setOtherDiscounts] = useState(0);

  const result = useMemo(() => {
    const g = Math.max(0, gross);
    const { inss, taxableBase, irrf, netBeforeVt } = calcNetSalaryInputs(
      g,
      Math.max(0, Math.floor(dependents))
    );
    const extra = Math.max(0, otherDiscounts);
    const net = netBeforeVt - extra;
    return { inss, taxableBase, irrf, extra, net, employerApprox: g * 0.28 };
  }, [gross, dependents, otherDiscounts]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="gross">
            Salário bruto (R$)
          </label>
          <input
            id="gross"
            type="number"
            min={0}
            step={0.01}
            value={gross}
            onChange={(e) => setGross(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="deps">
            Dependentes IRRF
          </label>
          <input
            id="deps"
            type="number"
            min={0}
            step={1}
            value={dependents}
            onChange={(e) => setDependents(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="other">
            Outros descontos (R$)
          </label>
          <input
            id="other"
            type="number"
            min={0}
            step={0.01}
            value={otherDiscounts}
            onChange={(e) => setOtherDiscounts(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-4 space-y-1" aria-live="polite">
        <p className="text-gray-700">
          INSS: <strong>{formatBRL(result.inss)}</strong> (teto ref. {formatBRL(INSS_CEILING_2025)})
        </p>
        <p className="text-gray-700">
          Base IRRF: <strong>{formatBRL(result.taxableBase)}</strong> (dedução por dependente{' '}
          {formatBRL(IRRF_DEDUCTION_PER_DEPENDENT)})
        </p>
        <p className="text-gray-700">
          IRRF: <strong>{formatBRL(result.irrf)}</strong>
        </p>
        <p className="text-gray-700">
          Outros descontos: <strong>{formatBRL(result.extra)}</strong>
        </p>
        <p className="text-lg font-semibold text-gray-900">
          Líquido estimado: {formatBRL(result.net)}
        </p>
        <p className="text-sm text-gray-500">
          Estimativa educativa de holerite CLT (INSS + IRRF). Encargos patronais variam — o valor
          aproximado de referência ({formatBRL(result.employerApprox)}) usa ~28% só como ordem de
          grandeza e não é oficial.
        </p>
      </div>
    </div>
  );
}
