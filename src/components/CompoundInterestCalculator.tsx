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

interface MonthlyResult {
  month: number;
  totalInvested: number;
  interestEarned: number;
  totalAmount: number;
}

export default function CompoundInterestCalculator() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    initialValue: 1000,
    monthlyValue: 1000,
    interestRate: 8,
    period: 20,
    isAnnualRate: true,
  });

  // Add display values state for currency inputs
  const [displayValues, setDisplayValues] = useState({
    initialValue: '1.000,00',
    monthlyValue: '1.000,00',
  });

  const [results, setResults] = useState<{
    totalInvested: number;
    totalInterest: number;
    finalAmount: number;
    monthlyResults: MonthlyResult[];
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

  const handleCurrencyInput = (field: string, value: string) => {
    // Remove any non-digit characters
    const numericValue = value.replace(/\D/g, '');
    
    // Convert to number and divide by 100 to handle decimals
    const numberValue = parseInt(numericValue) / 100 || 0;

    setFormData(prev => ({
      ...prev,
      [field]: numberValue
    }));
  };

  const formatInputCurrency = (value: number): string => {
    return (value || 0).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calculateCompoundInterest = () => {
    const monthlyResults: MonthlyResult[] = [];
    const totalMonths = formData.period * 12;
    const monthlyRate = formData.isAnnualRate 
      ? Math.pow(1 + formData.interestRate / 100, 1/12) - 1
      : formData.interestRate / 100;

    let currentAmount = formData.initialValue;
    let totalInvested = formData.initialValue;
    let totalInterest = 0;

    for (let month = 1; month <= totalMonths; month++) {
      // Add monthly investment
      currentAmount += formData.monthlyValue;
      totalInvested += formData.monthlyValue;

      // Calculate interest for this month
      const interestThisMonth = currentAmount * monthlyRate;
      currentAmount += interestThisMonth;
      totalInterest += interestThisMonth;

      // Store monthly results
      if (month % 12 === 0 || month === totalMonths) {
        monthlyResults.push({
          month,
          totalInvested,
          interestEarned: totalInterest,
          totalAmount: currentAmount
        });
      }
    }

    setResults({
      totalInvested,
      totalInterest,
      finalAmount: currentAmount,
      monthlyResults
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'isAnnualRate' ? value === 'true' : parseFloat(value.replace(/[^0-9.-]/g, '')) || 0
    }));
  };

  const chartData = results ? {
    labels: results.monthlyResults.map(r => `Ano ${Math.floor(r.month / 12)}`),
    datasets: [
      {
        label: 'Total Investido',
        data: results.monthlyResults.map(r => r.totalInvested),
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB33',
        fill: true,
      },
      {
        label: 'Rendimento',
        data: results.monthlyResults.map(r => r.interestEarned),
        borderColor: '#FF6384',
        backgroundColor: '#FF638433',
        fill: true,
      },
      {
        label: 'Total Acumulado',
        data: results.monthlyResults.map(r => r.totalAmount),
        borderColor: '#4BC0C0',
        backgroundColor: '#4BC0C033',
        fill: true,
      }
    ]
  } : null;

  if (!mounted) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Instruções */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Como usar a calculadora</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900">Passo 1</h3>
            <p className="text-gray-600">Preencha o campo "Valor Inicial" com a quantia que você irá investir inicialmente.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Passo 2</h3>
            <p className="text-gray-600">No campo "Valor Mensal" coloque o quanto você pretende investir por mês.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Passo 3</h3>
            <p className="text-gray-600">No campo "Taxa de Juros" informe qual será a taxa de juros do investimento e selecione se é mensal ou anual.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Passo 4</h3>
            <p className="text-gray-600">Preencha o campo "Período" com o tempo em anos que você pretende investir.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Passo 5</h3>
            <p className="text-gray-600">Clique em "Calcular" para ver os resultados.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Dados do Investimento</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor Inicial
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatInputCurrency(formData.initialValue)}
                  onChange={(e) => handleCurrencyInput('initialValue', e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor Mensal
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatInputCurrency(formData.monthlyValue)}
                  onChange={(e) => handleCurrencyInput('monthlyValue', e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taxa de Juros
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  value={formData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  step="0.1"
                  className="flex-1 rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <select
                  value={formData.isAnnualRate.toString()}
                  onChange={(e) => handleInputChange('isAnnualRate', e.target.value)}
                  className="rounded-r-md border-l-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="true">% ao ano</option>
                  <option value="false">% ao mês</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Período (anos)
              </label>
              <input
                type="number"
                value={formData.period}
                onChange={(e) => handleInputChange('period', e.target.value)}
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={calculateCompoundInterest}
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
                <p className="text-sm text-gray-600">Total Investido:</p>
                <p className="text-lg font-semibold">{formatCurrency(results.totalInvested)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rendimento Total:</p>
                <p className="text-lg font-semibold">{formatCurrency(results.totalInterest)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Montante Final:</p>
                <p className="text-lg font-semibold">{formatCurrency(results.finalAmount)}</p>
              </div>

              {chartData && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Evolução do Investimento</h3>
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

      {/* Tabela de Resultados */}
      {results && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Evolução Anual</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ano
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Investido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rendimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montante
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.monthlyResults.map((result, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(result.month / 12)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(result.totalInvested)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(result.interestEarned)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(result.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Fórmula e Explicação */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Sobre Juros Compostos</h2>
        <div className="prose max-w-none">
          <h3>Fórmula dos Juros Compostos</h3>
          <p className="font-mono">M = C (1 + i)^t</p>
          <p>Onde:</p>
          <ul>
            <li>M = Montante final</li>
            <li>C = Capital inicial</li>
            <li>i = Taxa de juros</li>
            <li>t = Tempo de aplicação</li>
          </ul>
          
          <h3 className="mt-6">Como funcionam os Juros Compostos?</h3>
          <p>
            Os juros compostos são conhecidos como "juros sobre juros" porque o rendimento de cada período é reinvestido, 
            passando a render juros também. Este é o tipo de juros mais comum em investimentos e é considerado uma das 
            ferramentas mais poderosas para construção de patrimônio no longo prazo.
          </p>
          
          <p>
            No caso de investimentos regulares (aportes mensais), o cálculo se torna mais complexo, pois cada novo aporte 
            começará a render juros em momentos diferentes. Nossa calculadora leva em consideração tanto o investimento 
            inicial quanto os aportes mensais para dar uma visão precisa do crescimento do seu patrimônio.
          </p>
        </div>
      </div>
    </div>
  );
} 