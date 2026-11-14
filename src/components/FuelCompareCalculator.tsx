'use client';

import { useMemo, useState } from 'react';
import { compareEthanolGasoline } from '@/utils/fuelCompare';
import { formatBRL } from '@/utils/currency';

export default function FuelCompareCalculator() {
  const [ethanolPrice, setEthanolPrice] = useState(4.19);
  const [gasolinePrice, setGasolinePrice] = useState(6.29);
  const [ethanolKm, setEthanolKm] = useState('');
  const [gasolineKm, setGasolineKm] = useState('');

  const result = useMemo(() => {
    try {
      const eKm = ethanolKm.trim() === '' ? null : parseFloat(ethanolKm.replace(',', '.'));
      const gKm = gasolineKm.trim() === '' ? null : parseFloat(gasolineKm.replace(',', '.'));
      return compareEthanolGasoline({
        ethanolPrice,
        gasolinePrice,
        ethanolKmPerLiter: eKm != null && Number.isFinite(eKm) ? eKm : null,
        gasolineKmPerLiter: gKm != null && Number.isFinite(gKm) ? gKm : null,
      });
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Erro' };
    }
  }, [ethanolPrice, gasolinePrice, ethanolKm, gasolineKm]);

  const label =
    result && 'recommendation' in result
      ? result.recommendation === 'ethanol'
        ? 'Álcool (etanol) compensa mais'
        : result.recommendation === 'gasoline'
          ? 'Gasolina compensa mais'
          : 'Empate nesta comparação'
      : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="ethanol">
            Preço do etanol (R$/L)
          </label>
          <input
            id="ethanol"
            type="number"
            min={0}
            step={0.01}
            value={ethanolPrice}
            onChange={(e) => setEthanolPrice(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="gasoline">
            Preço da gasolina (R$/L)
          </label>
          <input
            id="gasoline"
            type="number"
            min={0}
            step={0.01}
            value={gasolinePrice}
            onChange={(e) => setGasolinePrice(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="e-km">
            Consumo etanol (km/L) — opcional
          </label>
          <input
            id="e-km"
            value={ethanolKm}
            onChange={(e) => setEthanolKm(e.target.value)}
            placeholder="Ex: 8"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="g-km">
            Consumo gasolina (km/L) — opcional
          </label>
          <input
            id="g-km"
            value={gasolineKm}
            onChange={(e) => setGasolineKm(e.target.value)}
            placeholder="Ex: 11.5"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      {result && 'error' in result ? (
        <p className="text-red-600" role="alert">
          {result.error}
        </p>
      ) : null}

      {result && 'recommendation' in result ? (
        <div className="rounded-lg bg-blue-50 p-4 space-y-1" aria-live="polite">
          <p className="text-lg font-semibold text-gray-900">{label}</p>
          <p className="text-gray-700">
            Relação etanol/gasolina:{' '}
            <strong>{(result.ratio * 100).toFixed(1).replace('.', ',')}%</strong> (limite{' '}
            {(result.threshold * 100).toFixed(1).replace('.', ',')}%)
          </p>
          {result.usedConsumption ? (
            <p className="text-gray-700">
              Custo por km — etanol {formatBRL(result.ethanolCostPerKm ?? 0)} · gasolina{' '}
              {formatBRL(result.gasolineCostPerKm ?? 0)}
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Usando a regra dos 70%. Informe o consumo do seu carro para um resultado mais preciso.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
