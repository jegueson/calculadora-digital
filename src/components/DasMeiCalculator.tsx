'use client';

import { useMemo, useState } from 'react';
import { formatBRL } from '@/utils/currency';

/** Referência aproximada — atualize com salário mínimo vigente. */
const SALARIO_MINIMO_REF = 1518.0;
const INSS_PCT = 0.05;
const ICMS_FIXO = 1.0;
const ISS_FIXO = 5.0;

type TipoAtividade = 'comercio' | 'servico' | 'misto';

export default function DasMeiCalculator() {
  const [tipo, setTipo] = useState<TipoAtividade>('servico');

  const result = useMemo(() => {
    const inss = INSS_PCT * SALARIO_MINIMO_REF;
    let total = inss;
    if (tipo === 'comercio') total += ICMS_FIXO;
    if (tipo === 'servico') total += ISS_FIXO;
    if (tipo === 'misto') total += ICMS_FIXO + ISS_FIXO;
    return { inss, total };
  }, [tipo]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de atividade MEI
        </label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoAtividade)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
        >
          <option value="comercio">Comércio / indústria (INSS + ICMS fixo)</option>
          <option value="servico">Serviços (INSS + ISS fixo)</option>
          <option value="misto">Misto (INSS + ICMS + ISS)</option>
        </select>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Estimativa do DAS
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>INSS (5% do salário mínimo)</span>
            <span>{formatBRL(result.inss)}</span>
          </li>
          {tipo === 'comercio' && (
            <li className="flex justify-between">
              <span>ICMS (valor fixo)</span>
              <span>{formatBRL(ICMS_FIXO)}</span>
            </li>
          )}
          {tipo === 'servico' && (
            <li className="flex justify-between">
              <span>ISS (valor fixo)</span>
              <span>{formatBRL(ISS_FIXO)}</span>
            </li>
          )}
          {tipo === 'misto' && (
            <>
              <li className="flex justify-between">
                <span>ICMS (valor fixo)</span>
                <span>{formatBRL(ICMS_FIXO)}</span>
              </li>
              <li className="flex justify-between">
                <span>ISS (valor fixo)</span>
                <span>{formatBRL(ISS_FIXO)}</span>
              </li>
            </>
          )}
          <li className="flex justify-between border-t pt-2 text-base font-semibold">
            <span>Total mensal aproximado</span>
            <span className="text-green-700">{formatBRL(result.total)}</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Valores de referência com salário mínimo de {formatBRL(SALARIO_MINIMO_REF)}. O DAS
        oficial é emitido no Portal do Simples Nacional e pode incluir encargos por débitos
        automáticos ou diferenças de atividade. Consulte o site da Receita Federal.
      </p>
    </div>
  );
}
