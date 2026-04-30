'use client';

import { useMemo, useState } from 'react';
import { formatBRL } from '@/utils/currency';

export default function CdbCdiCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [cdiAnnual, setCdiAnnual] = useState(10.75);
  const [percentOfCdi, setPercentOfCdi] = useState(100);
  const [months, setMonths] = useState(12);
  const [taxBracket, setTaxBracket] = useState(20);

  const result = useMemo(() => {
    const p = Math.max(0, principal);
    const eff = (cdiAnnual * (percentOfCdi / 100)) / 100;
    const monthly = Math.pow(1 + eff, 1 / 12) - 1;
    const n = Math.max(0, months);
    const gross = p * Math.pow(1 + monthly, n);
    const yieldGross = gross - p;
    const tax = yieldGross * (taxBracket / 100);
    const net = gross - tax;
    return { gross, yieldGross, tax, net, yieldNet: net - p };
  }, [principal, cdiAnnual, percentOfCdi, months, taxBracket]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Valor investido (R$)
          </label>
          <input
            type="number"
            min={0}
            value={principal}
            onChange={(e) =>
              setPrincipal(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CDI anual de referência (%)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={cdiAnnual}
            onChange={(e) =>
              setCdiAnnual(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            % do CDI do investimento
          </label>
          <input
            type="number"
            min={0}
            step={1}
            value={percentOfCdi}
            onChange={(e) =>
              setPercentOfCdi(parseFloat(e.target.value) || 0)
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
            max={600}
            value={months}
            onChange={(e) =>
              setMonths(parseInt(e.target.value, 10) || 1)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            IR sobre rendimento (% — CDB comum: 15–22,5% conforme prazo)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            step={1}
            value={taxBracket}
            onChange={(e) =>
              setTaxBracket(parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Projeção</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Rendimento bruto</span>
            <span>{formatBRL(result.yieldGross)}</span>
          </li>
          <li className="flex justify-between">
            <span>IR (estimado)</span>
            <span>− {formatBRL(result.tax)}</span>
          </li>
          <li className="flex justify-between">
            <span>Montante líquido</span>
            <span className="font-semibold text-green-700">
              {formatBRL(result.net)}
            </span>
          </li>
          <li className="flex justify-between border-t pt-2">
            <span>Ganho líquido</span>
            <span>{formatBRL(result.yieldNet)}</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Usa capitalização mensal composta sobre taxa efetiva = (% CDI) × (CDI anual). CDBs
        reais usam dias úteis e % do CDI diário; IR varia pelo prazo. Ajuste os parâmetros
        conforme o prospecto do título.
      </p>
    </div>
  );
}
