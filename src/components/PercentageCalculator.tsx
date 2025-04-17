'use client';

import { useState } from 'react';

interface CalculationState {
  percentage: string;
  value1: string;
  value2: string;
  result: string;
}

export default function PercentageCalculator() {
  const initialState: CalculationState = {
    percentage: '',
    value1: '',
    value2: '',
    result: ''
  };

  const [calculations, setCalculations] = useState<CalculationState[]>(Array(9).fill({ ...initialState }));

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const calculatePercentage = (index: number) => {
    const calc = calculations[index];
    let result = 0;

    switch (index) {
      case 0: // Quanto é X% de Y
        result = (parseFloat(calc.percentage) / 100) * parseFloat(calc.value1);
        break;
      case 1: // X é qual porcentagem de Y
        result = (parseFloat(calc.value1) / parseFloat(calc.value2)) * 100;
        break;
      case 2: // Aumento percentual
        const increase = parseFloat(calc.value2) - parseFloat(calc.value1);
        result = (increase / parseFloat(calc.value1)) * 100;
        break;
      case 3: // Diminuição percentual
        const decrease = parseFloat(calc.value1) - parseFloat(calc.value2);
        result = (decrease / parseFloat(calc.value1)) * 100;
        break;
      case 4: // X sobre Y é quantos %
        result = (parseFloat(calc.value1) / parseFloat(calc.value2)) * 100;
        break;
      case 5: // Aumentar X em Y%
        result = parseFloat(calc.value1) * (1 + parseFloat(calc.percentage) / 100);
        break;
      case 6: // Diminuir X em Y%
        result = parseFloat(calc.value1) * (1 - parseFloat(calc.percentage) / 100);
        break;
      case 7: // Valor inicial após aumento
        result = parseFloat(calc.value2) / (1 + parseFloat(calc.percentage) / 100);
        break;
      case 8: // Valor inicial após diminuição
        result = parseFloat(calc.value2) / (1 - parseFloat(calc.percentage) / 100);
        break;
    }

    const newCalculations = [...calculations];
    newCalculations[index] = {
      ...calc,
      result: !isNaN(result) ? formatNumber(result) : 'Erro'
    };
    setCalculations(newCalculations);
  };

  const updateCalculation = (index: number, field: keyof CalculationState, value: string) => {
    const newCalculations = [...calculations];
    newCalculations[index] = {
      ...newCalculations[index],
      [field]: value.replace(',', '.')
    };
    setCalculations(newCalculations);
  };

  const calculationTypes = [
    {
      title: 'Quanto é',
      inputs: [
        { field: 'percentage', label: '%' },
        { field: 'value1', label: 'de' }
      ],
      resultPrefix: 'Resultado:'
    },
    {
      title: 'O valor',
      inputs: [
        { field: 'value1', label: 'é qual porcentagem de' },
        { field: 'value2', label: '?' }
      ],
      resultPrefix: 'Porcentagem:'
    },
    {
      title: 'Um valor de',
      inputs: [
        { field: 'value1', label: 'que AUMENTOU para' },
        { field: 'value2', label: '' }
      ],
      resultPrefix: 'Aumento percentual:'
    },
    {
      title: 'Um valor de',
      inputs: [
        { field: 'value1', label: 'que DIMINUIU para' },
        { field: 'value2', label: '' }
      ],
      resultPrefix: 'Diminuição percentual:'
    },
    {
      title: 'O valor',
      inputs: [
        { field: 'value1', label: 'sobre o valor' },
        { field: 'value2', label: 'é quantos por cento?' }
      ],
      resultPrefix: 'Porcentagem:'
    },
    {
      title: 'Tenho um valor de',
      inputs: [
        { field: 'value1', label: 'e quero AUMENTAR' },
        { field: 'percentage', label: '%' }
      ],
      resultPrefix: 'Resultado:'
    },
    {
      title: 'Tenho um valor de',
      inputs: [
        { field: 'value1', label: 'e quero DIMINUIR' },
        { field: 'percentage', label: '%' }
      ],
      resultPrefix: 'Resultado:'
    },
    {
      title: 'Tenho um valor inicial que AUMENTOU em',
      inputs: [
        { field: 'percentage', label: '% e passou para' },
        { field: 'value2', label: '' }
      ],
      resultPrefix: 'Valor inicial:'
    },
    {
      title: 'Tenho um valor inicial que DIMINUIU em',
      inputs: [
        { field: 'percentage', label: '% e passou para' },
        { field: 'value2', label: '' }
      ],
      resultPrefix: 'Valor inicial:'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {calculationTypes.map((type, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <span className="text-gray-700">{type.title}</span>
            <div className="flex flex-wrap items-center gap-2">
              {type.inputs.map((input, inputIndex) => (
                <div key={inputIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={calculations[index][input.field as keyof CalculationState]}
                    onChange={(e) => updateCalculation(index, input.field as keyof CalculationState, e.target.value)}
                    placeholder="0"
                  />
                  <span className="text-gray-700">{input.label}</span>
                </div>
              ))}
              <button
                onClick={() => calculatePercentage(index)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Calcular
              </button>
            </div>
          </div>
          {calculations[index].result && (
            <div className="mt-4 text-lg">
              <span className="font-semibold text-gray-700">{type.resultPrefix}</span>{' '}
              <span className="text-blue-600">{calculations[index].result}</span>
              {(index === 1 || index === 2 || index === 3 || index === 4) && calculations[index].result !== 'Erro' && '%'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 