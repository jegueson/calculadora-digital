'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CashFlow {
  amount: number;
  discountedAmount: number;
  cumulativeAmount: number;
  cumulativeDiscountedAmount: number;
}

export default function PaybackCalculator() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    initialInvestment: 100000,
    discountRate: 8,
    numberOfFlows: 5,
    cashFlows: Array(12).fill(0),
  });

  const [results, setResults] = useState<{
    regularPayback: number | null;
    discountedPayback: number | null;
    cashFlowTable: CashFlow[];
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const calculatePaybackPeriods = () => {
    const cashFlowTable: CashFlow[] = [];
    let cumulativeAmount = -formData.initialInvestment;
    let cumulativeDiscountedAmount = -formData.initialInvestment;
    let regularPayback: number | null = null;
    let discountedPayback: number | null = null;

    // Calculate regular and discounted cash flows
    for (let i = 0; i < formData.numberOfFlows; i++) {
      const amount = formData.cashFlows[i];
      const discountedAmount = amount / Math.pow(1 + formData.discountRate / 100, i + 1);
      
      cumulativeAmount += amount;
      cumulativeDiscountedAmount += discountedAmount;

      // Find regular payback period
      if (regularPayback === null && cumulativeAmount >= 0) {
        const surplus = cumulativeAmount - amount;
        regularPayback = i + Math.abs(surplus) / amount;
      }

      // Find discounted payback period
      if (discountedPayback === null && cumulativeDiscountedAmount >= 0) {
        const surplusDiscounted = cumulativeDiscountedAmount - discountedAmount;
        discountedPayback = i + Math.abs(surplusDiscounted) / discountedAmount;
      }

      cashFlowTable.push({
        amount,
        discountedAmount,
        cumulativeAmount,
        cumulativeDiscountedAmount
      });
    }

    setResults({
      regularPayback,
      discountedPayback,
      cashFlowTable
    });
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'numberOfFlows') {
      const numFlows = Math.min(Math.max(parseInt(value) || 1, 1), 12);
      setFormData(prev => ({
        ...prev,
        numberOfFlows: numFlows
      }));
    } else if (field.startsWith('cashFlow')) {
      const index = parseInt(field.replace('cashFlow', ''));
      const newCashFlows = [...formData.cashFlows];
      newCashFlows[index] = parseFloat(value.replace(/[^0-9.-]/g, '')) || 0;
      setFormData(prev => ({
        ...prev,
        cashFlows: newCashFlows
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: parseFloat(value.replace(/[^0-9.-]/g, '')) || 0
      }));
    }
  };

  const chartData = results ? {
    labels: Array.from({ length: formData.numberOfFlows }, (_, i) => `Ano ${i + 1}`),
    datasets: [
      {
        label: 'Fluxo de Caixa Acumulado',
        data: results.cashFlowTable.map(row => row.cumulativeAmount),
        borderColor: '#36A2EB',
        tension: 0.1,
      },
      {
        label: 'Fluxo de Caixa Descontado Acumulado',
        data: results.cashFlowTable.map(row => row.cumulativeDiscountedAmount),
        borderColor: '#FF6384',
        tension: 0.1,
      }
    ]
  } : null;

  if (!mounted) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Dados do Investimento</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Investimento Inicial
              </label>
              <input
                type="text"
                value={formatCurrency(formData.initialInvestment)}
                onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taxa de Desconto (%)
              </label>
              <input
                type="number"
                value={formData.discountRate}
                onChange={(e) => handleInputChange('discountRate', e.target.value)}
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número de Fluxos de Caixa
              </label>
              <input
                type="number"
                value={formData.numberOfFlows}
                onChange={(e) => handleInputChange('numberOfFlows', e.target.value)}
                min="1"
                max="12"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {Array.from({ length: formData.numberOfFlows }).map((_, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700">
                  Fluxo de Caixa {index + 1}
                </label>
                <input
                  type="text"
                  value={formatCurrency(formData.cashFlows[index])}
                  onChange={(e) => handleInputChange(`cashFlow${index}`, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}

            <button
              onClick={calculatePaybackPeriods}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calcular
            </button>
          </div>
        </div>

        {/* Resultados */}
        {results && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Resultados</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Payback Simples:</p>
                <p className="text-lg font-semibold">
                  {results.regularPayback 
                    ? `${results.regularPayback.toFixed(2)} anos`
                    : 'Maior que o período analisado'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payback Descontado:</p>
                <p className="text-lg font-semibold">
                  {results.discountedPayback 
                    ? `${results.discountedPayback.toFixed(2)} anos`
                    : 'Maior que o período analisado'}
                </p>
              </div>

              {chartData && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Evolução do Fluxo de Caixa</h3>
                  <Line data={chartData} options={{ 
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => formatCurrency(Number(value)),
                        },
                      },
                    },
                  }} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tabela de Fluxos de Caixa */}
      {results && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Tabela de Fluxos de Caixa</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Período
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fluxo de Caixa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fluxo Descontado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FC Acumulado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FC Descontado Acumulado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(-formData.initialInvestment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(-formData.initialInvestment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(-formData.initialInvestment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(-formData.initialInvestment)}
                </td>
              </tr>
              {results.cashFlowTable.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(row.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(row.discountedAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(row.cumulativeAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(row.cumulativeDiscountedAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 