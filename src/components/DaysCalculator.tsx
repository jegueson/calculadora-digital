'use client';

import { useMemo, useState } from 'react';
import {
  addDays,
  calendarDaysBetween,
  countBusinessDays,
} from '@/utils/dateDiff';
import { parseISODateLocal, formatDatePtBr } from '@/utils/gestational';

type Mode = 'between' | 'business' | 'add';

export default function DaysCalculator() {
  const [mode, setMode] = useState<Mode>('between');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [base, setBase] = useState('');
  const [offset, setOffset] = useState('30');
  const [excludeHolidays, setExcludeHolidays] = useState(true);

  const result = useMemo(() => {
    if (mode === 'add') {
      const from = parseISODateLocal(base);
      const days = Number(offset);
      if (!from || !Number.isFinite(days)) return null;
      const target = addDays(from, Math.trunc(days));
      return { kind: 'add' as const, target, days: Math.trunc(days) };
    }

    const a = parseISODateLocal(start);
    const b = parseISODateLocal(end);
    if (!a || !b) return null;
    if (mode === 'between') {
      return { kind: 'between' as const, days: calendarDaysBetween(a, b) };
    }
    return {
      kind: 'business' as const,
      days: Math.abs(
        countBusinessDays(a, b, { excludeFixedHolidays: excludeHolidays })
      ),
    };
  }, [mode, start, end, base, offset, excludeHolidays]);

  const tabs: { id: Mode; label: string }[] = [
    { id: 'between', label: 'Dias corridos' },
    { id: 'business', label: 'Dias úteis' },
    { id: 'add', label: 'Somar / subtrair' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
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

      {mode === 'add' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="base-date">
              Data inicial
            </label>
            <input
              id="base-date"
              type="date"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="offset-days">
              Dias (use negativo para subtrair)
            </label>
            <input
              id="offset-days"
              type="number"
              value={offset}
              onChange={(e) => setOffset(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="start-date">
              Data inicial
            </label>
            <input
              id="start-date"
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="end-date">
              Data final
            </label>
            <input
              id="end-date"
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
      )}

      {mode === 'business' ? (
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={excludeHolidays}
            onChange={(e) => setExcludeHolidays(e.target.checked)}
          />
          Excluir feriados nacionais fixos (móveis como Carnaval não entram)
        </label>
      ) : null}

      {result?.kind === 'between' || result?.kind === 'business' ? (
        <div className="rounded-lg bg-blue-50 p-4" aria-live="polite">
          <p className="text-lg font-semibold text-gray-900">
            {result.days} {result.kind === 'business' ? 'dias úteis' : 'dias corridos'}
          </p>
        </div>
      ) : null}

      {result?.kind === 'add' ? (
        <div className="rounded-lg bg-blue-50 p-4" aria-live="polite">
          <p className="text-lg font-semibold text-gray-900">
            Resultado: {formatDatePtBr(result.target)}
          </p>
          <p className="text-gray-700 text-sm">
            {result.days >= 0 ? `+${result.days}` : result.days} dias a partir da data informada.
          </p>
        </div>
      ) : null}
    </div>
  );
}
