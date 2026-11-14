'use client';

import { useMemo, useState } from 'react';
import { solveRuleOfThree, type RuleOfThreeMode } from '@/utils/ruleOfThree';

export default function RuleOfThreeCalculator() {
  const [a, setA] = useState('2');
  const [b, setB] = useState('10');
  const [c, setC] = useState('5');
  const [mode, setMode] = useState<RuleOfThreeMode>('direct');

  const parsed = {
    a: parseFloat(a.replace(',', '.')),
    b: parseFloat(b.replace(',', '.')),
    c: parseFloat(c.replace(',', '.')),
  };

  const result = useMemo(() => {
    try {
      if (![parsed.a, parsed.b, parsed.c].every((n) => Number.isFinite(n))) return null;
      return solveRuleOfThree(parsed.a, parsed.b, parsed.c, mode);
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Erro no cálculo' };
    }
  }, [parsed.a, parsed.b, parsed.c, mode]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'direct', label: 'Direta' },
            { id: 'inverse', label: 'Inversa' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              mode === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="val-a">
            A
          </label>
          <input
            id="val-a"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="val-b">
            B (corresponde a A)
          </label>
          <input
            id="val-b"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="val-c">
            C
          </label>
          <input
            id="val-c"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <p className="text-sm text-gray-600">
        {mode === 'direct'
          ? 'Se A está para B, então C está para X → X = (B × C) / A'
          : 'Se A está para B de forma inversa, então C está para X → X = (A × B) / C'}
      </p>

      {result != null && typeof result === 'number' ? (
        <div className="rounded-lg bg-blue-50 p-4" aria-live="polite">
          <p className="text-lg font-semibold text-gray-900">
            X ={' '}
            {result.toLocaleString('pt-BR', {
              maximumFractionDigits: 6,
            })}
          </p>
        </div>
      ) : null}

      {result != null && typeof result === 'object' && 'error' in result ? (
        <p className="text-red-600" role="alert">
          {result.error}
        </p>
      ) : null}
    </div>
  );
}
