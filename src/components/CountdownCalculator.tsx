'use client';

import { useEffect, useMemo, useState } from 'react';
import { parseISODateLocal, startOfLocalDay } from '@/utils/gestational';

interface Remaining {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  past: boolean;
}

function splitRemaining(target: Date, now: Date): Remaining {
  const totalMs = target.getTime() - now.getTime();
  const past = totalMs < 0;
  const abs = Math.abs(totalMs);
  const days = Math.floor(abs / (24 * 60 * 60 * 1000));
  const hours = Math.floor((abs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((abs % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((abs % (60 * 1000)) / 1000);
  return { totalMs, days, hours, minutes, seconds, past };
}

export default function CountdownCalculator() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('00:00');
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const target = useMemo(() => {
    const day = parseISODateLocal(date);
    if (!day) return null;
    const [hh, mm] = time.split(':').map((part) => Number(part));
    if (!Number.isFinite(hh) || !Number.isFinite(mm)) return null;
    const value = startOfLocalDay(day);
    value.setHours(hh, mm, 0, 0);
    return value;
  }, [date, time]);

  const remaining = target ? splitRemaining(target, now) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="target-date">
            Data do evento
          </label>
          <input
            id="target-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="target-time">
            Horário
          </label>
          <input
            id="target-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      {remaining ? (
        <div className="rounded-lg bg-blue-50 p-4 space-y-1" aria-live="polite">
          <p className="text-lg font-semibold text-gray-900">
            {remaining.past ? 'Evento já ocorreu há' : 'Faltam'} {remaining.days}d {remaining.hours}
            h {remaining.minutes}m {remaining.seconds}s
          </p>
        </div>
      ) : null}
    </div>
  );
}
