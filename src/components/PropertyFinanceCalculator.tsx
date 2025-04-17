'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FinanceData {
  valorImovel: number;
  entrada: number;
  prazo: number;
  taxaJuros: number;
  valorSeguro: number;
  taxaAdministrativa: number;
}

interface AmortizationRow {
  parcela: number;
  prestacao: number;
  juros: number;
  amortizacao: number;
  saldoDevedor: number;
}

export default function PropertyFinanceCalculator() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FinanceData>({
    valorImovel: 500000,
    entrada: 100000,
    prazo: 30,
    taxaJuros: 8.5,
    valorSeguro: 0,
    taxaAdministrativa: 25,
  });

  const [results, setResults] = useState<{
    prestacaoMensal: number;
    totalJuros: number;
    custoTotal: number;
    amortizationTable: AmortizationRow[];
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

  const handleCurrencyInput = (field: keyof FinanceData, value: string) => {
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

  const calculateLoan = () => {
    const valorFinanciado = formData.valorImovel - formData.entrada;
    const taxaMensal = formData.taxaJuros / 12 / 100;
    const numPrestacoes = formData.prazo * 12;
    
    // Cálculo da prestação mensal (Sistema de Amortização Francês - Price)
    const prestacaoBase = valorFinanciado * 
      (taxaMensal * Math.pow(1 + taxaMensal, numPrestacoes)) / 
      (Math.pow(1 + taxaMensal, numPrestacoes) - 1);

    // Adicionar custos mensais
    const prestacaoMensal = prestacaoBase + formData.taxaAdministrativa + formData.valorSeguro;

    // Gerar tabela de amortização
    const amortizationTable: AmortizationRow[] = [];
    let saldoDevedor = valorFinanciado;
    let totalJuros = 0;

    for (let i = 1; i <= numPrestacoes; i++) {
      const juros = saldoDevedor * taxaMensal;
      const amortizacao = prestacaoBase - juros;
      saldoDevedor -= amortizacao;
      totalJuros += juros;

      amortizationTable.push({
        parcela: i,
        prestacao: prestacaoBase,
        juros,
        amortizacao,
        saldoDevedor: Math.max(0, saldoDevedor)
      });
    }

    const custoTotal = (prestacaoMensal * numPrestacoes) + formData.entrada;

    setResults({
      prestacaoMensal,
      totalJuros,
      custoTotal,
      amortizationTable
    });
  };

  const pieChartData = results ? {
    labels: ['Valor do Imóvel', 'Total de Juros', 'Custos Adicionais'],
    datasets: [{
      data: [
        formData.valorImovel,
        results.totalJuros,
        (formData.taxaAdministrativa + formData.valorSeguro) * formData.prazo * 12
      ],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
    }]
  } : null;

  const barChartData = results ? {
    labels: ['Ano 1', 'Ano 5', 'Ano 10', 'Ano 15', 'Ano 20', 'Ano 25', 'Ano 30'].slice(0, Math.ceil(formData.prazo / 5)),
    datasets: [{
      label: 'Saldo Devedor',
      data: [0, 5, 10, 15, 20, 25, 30].slice(0, Math.ceil(formData.prazo / 5))
        .map(year => results.amortizationTable[year * 12]?.saldoDevedor || 0),
      backgroundColor: '#36A2EB',
    }]
  } : null;

  if (!mounted) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Dados do Financiamento</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor do Imóvel
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatInputCurrency(formData.valorImovel)}
                  onChange={(e) => handleCurrencyInput('valorImovel', e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor da Entrada
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatInputCurrency(formData.entrada)}
                  onChange={(e) => handleCurrencyInput('entrada', e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prazo (anos)
              </label>
              <input
                type="number"
                value={formData.prazo}
                onChange={(e) => setFormData(prev => ({ ...prev, prazo: parseInt(e.target.value) || 0 }))}
                min="1"
                max="35"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taxa de Juros Anual (%)
              </label>
              <input
                type="number"
                value={formData.taxaJuros}
                onChange={(e) => setFormData(prev => ({ ...prev, taxaJuros: parseFloat(e.target.value) || 0 }))}
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Seguro Mensal
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatInputCurrency(formData.valorSeguro)}
                  onChange={(e) => handleCurrencyInput('valorSeguro', e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taxa Administrativa Mensal
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatInputCurrency(formData.taxaAdministrativa)}
                  onChange={(e) => handleCurrencyInput('taxaAdministrativa', e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={calculateLoan}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calcular
            </button>
          </div>
        </div>

        {/* Resultados */}
        {results && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Resumo do Financiamento</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Prestação Mensal:</p>
                <p className="text-lg font-semibold">{formatCurrency(results.prestacaoMensal)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de Juros:</p>
                <p className="text-lg font-semibold">{formatCurrency(results.totalJuros)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Custo Total:</p>
                <p className="text-lg font-semibold">{formatCurrency(results.custoTotal)}</p>
              </div>

              {pieChartData && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Composição do Financiamento</h3>
                  <Pie data={pieChartData} options={{ responsive: true }} />
                </div>
              )}

              {barChartData && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Evolução do Saldo Devedor</h3>
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function(tickValue: number | string) {
                              // Ensure we're working with a number
                              const value = typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue;
                              return formatCurrency(value);
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tabela de Amortização */}
      {results && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Tabela de Amortização</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parcela
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prestação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Juros
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amortização
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Saldo Devedor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.amortizationTable.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.parcela}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(row.prestacao)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(row.juros)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(row.amortizacao)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(row.saldoDevedor)}
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