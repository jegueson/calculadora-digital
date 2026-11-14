export interface FuelCompareInput {
  ethanolPrice: number;
  gasolinePrice: number;
  ethanolKmPerLiter?: number | null;
  gasolineKmPerLiter?: number | null;
  /** Used only when consumption is missing. Default 0.7 (70% rule). */
  equivalenceFactor?: number;
}

export interface FuelCompareResult {
  ratio: number;
  threshold: number;
  recommendation: 'ethanol' | 'gasoline' | 'equal';
  ethanolCostPerKm: number | null;
  gasolineCostPerKm: number | null;
  usedConsumption: boolean;
}

/**
 * Compare ethanol vs gasoline using consumption when available,
 * otherwise the classic 70% rule of thumb.
 */
export function compareEthanolGasoline(input: FuelCompareInput): FuelCompareResult {
  const {
    ethanolPrice,
    gasolinePrice,
    ethanolKmPerLiter,
    gasolineKmPerLiter,
    equivalenceFactor = 0.7,
  } = input;

  if (ethanolPrice <= 0 || gasolinePrice <= 0) {
    throw new Error('Prices must be greater than zero.');
  }

  const ratio = ethanolPrice / gasolinePrice;
  const hasConsumption =
    ethanolKmPerLiter != null &&
    gasolineKmPerLiter != null &&
    ethanolKmPerLiter > 0 &&
    gasolineKmPerLiter > 0;

  if (hasConsumption) {
    const ethanolCostPerKm = ethanolPrice / (ethanolKmPerLiter as number);
    const gasolineCostPerKm = gasolinePrice / (gasolineKmPerLiter as number);
    const threshold = (ethanolKmPerLiter as number) / (gasolineKmPerLiter as number);
    let recommendation: FuelCompareResult['recommendation'] = 'equal';
    if (ethanolCostPerKm < gasolineCostPerKm) recommendation = 'ethanol';
    else if (gasolineCostPerKm < ethanolCostPerKm) recommendation = 'gasoline';
    return {
      ratio,
      threshold,
      recommendation,
      ethanolCostPerKm: Math.round(ethanolCostPerKm * 1000) / 1000,
      gasolineCostPerKm: Math.round(gasolineCostPerKm * 1000) / 1000,
      usedConsumption: true,
    };
  }

  let recommendation: FuelCompareResult['recommendation'] = 'equal';
  if (ratio < equivalenceFactor) recommendation = 'ethanol';
  else if (ratio > equivalenceFactor) recommendation = 'gasoline';

  return {
    ratio,
    threshold: equivalenceFactor,
    recommendation,
    ethanolCostPerKm: null,
    gasolineCostPerKm: null,
    usedConsumption: false,
  };
}
