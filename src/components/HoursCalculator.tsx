'use client';

import { useState } from 'react';

type TabId = 'sum' | 'subtract' | 'duration' | 'list';

function parseTimeToMinutes(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const colonMatch = trimmed.match(/^(\d{1,3}):(\d{2})$/);
  if (colonMatch) {
    const hours = parseInt(colonMatch[1], 10);
    const minutes = parseInt(colonMatch[2], 10);
    if (minutes >= 60) return null;
    return hours * 60 + minutes;
  }

  const decimalMatch = trimmed.replace(',', '.').match(/^(\d+(?:\.\d+)?)$/);
  if (decimalMatch) {
    const hours = parseFloat(decimalMatch[1]);
    if (Number.isNaN(hours) || hours < 0) return null;
    return Math.round(hours * 60);
  }

  return null;
}

function formatMinutes(totalMinutes: number, allowNegative = false): string {
  const negative = totalMinutes < 0;
  const abs = Math.abs(totalMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  const formatted = `${hours}:${minutes.toString().padStart(2, '0')}`;
  return negative && allowNegative ? `-${formatted}` : formatted;
}

function parseTimeList(input: string): number[] {
  return input
    .split(/[\n,;]+/)
    .map((part) => parseTimeToMinutes(part))
    .filter((v): v is number => v !== null);
}

export default function HoursCalculator() {
  const [activeTab, setActiveTab] = useState<TabId>('sum');
  const [timeA, setTimeA] = useState('');
  const [timeB, setTimeB] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [listInput, setListInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tabs: { id: TabId; label: string }[] = [
    { id: 'sum', label: 'Somar horas' },
    { id: 'subtract', label: 'Subtrair horas' },
    { id: 'duration', label: 'Duração' },
    { id: 'list', label: 'Somar lista' },
  ];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    if (activeTab === 'sum' || activeTab === 'subtract') {
      const a = parseTimeToMinutes(timeA);
      const b = parseTimeToMinutes(timeB);
      if (a === null || b === null) {
        setError('Informe horários válidos no formato HH:MM (ex: 2:30) ou decimal (ex: 2.5).');
        return;
      }
      const total = activeTab === 'sum' ? a + b : a - b;
      setResult(formatMinutes(total, true));
      return;
    }

    if (activeTab === 'duration') {
      const start = parseTimeToMinutes(startTime);
      const end = parseTimeToMinutes(endTime);
      if (start === null || end === null) {
        setError('Informe horário inicial e final válidos (ex: 08:00 e 17:30).');
        return;
      }
      let diff = end - start;
      if (diff < 0) diff += 24 * 60;
      setResult(formatMinutes(diff));
      return;
    }

    const values = parseTimeList(listInput);
    if (values.length === 0) {
      setError('Informe ao menos um horário válido na lista (um por linha ou separados por vírgula).');
      return;
    }
    const total = values.reduce((acc, v) => acc + v, 0);
    setResult(formatMinutes(total));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id);
              setResult(null);
              setError(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {(activeTab === 'sum' || activeTab === 'subtract') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="time-a" className="block text-sm font-medium text-gray-700 mb-1">
              Primeiro horário
            </label>
            <input
              id="time-a"
              type="text"
              value={timeA}
              onChange={(e) => setTimeA(e.target.value)}
              placeholder="Ex: 2:30"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="time-b" className="block text-sm font-medium text-gray-700 mb-1">
              Segundo horário
            </label>
            <input
              id="time-b"
              type="text"
              value={timeB}
              onChange={(e) => setTimeB(e.target.value)}
              placeholder="Ex: 1:45"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {activeTab === 'duration' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">
              Horário inicial
            </label>
            <input
              id="start-time"
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="Ex: 08:00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-1">
              Horário final
            </label>
            <input
              id="end-time"
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="Ex: 17:30"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {activeTab === 'list' && (
        <div>
          <label htmlFor="list-input" className="block text-sm font-medium text-gray-700 mb-1">
            Lista de horários (um por linha ou separados por vírgula)
          </label>
          <textarea
            id="list-input"
            value={listInput}
            onChange={(e) => setListInput(e.target.value)}
            placeholder={'2:30\n1:15\n0:45'}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Calcular
      </button>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm" role="alert">
          {error}
        </div>
      )}

      {result !== null && (
        <div className="p-6 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-green-700 mb-1">Resultado</p>
          <p className="text-3xl font-bold text-green-800">{result}</p>
          <p className="text-xs text-green-600 mt-2">Formato: horas:minutos</p>
        </div>
      )}

      <p className="text-xs text-gray-500">
        Aceita formato HH:MM (ex: 8:30) ou decimal em horas (ex: 8.5). Na duração, se o fim for
        menor que o início, assume-se o dia seguinte.
      </p>
    </div>
  );
}
