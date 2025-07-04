'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  deduction: number;
}

interface TaxResult {
  grossIncome: number;
  netIncome: number;
  taxAmount: number;
  effectiveRate: number;
  isExempt: boolean;
  bracket: string;
}

const TAX_BRACKETS_2024: TaxBracket[] = [
  { min: 0, max: 2259.20, rate: 0, deduction: 0 },
  { min: 2259.21, max: 2826.65, rate: 0.075, deduction: 169.44 },
  { min: 2826.66, max: 3751.05, rate: 0.15, deduction: 381.44 },
  { min: 3751.06, max: 4664.68, rate: 0.225, deduction: 662.77 },
  { min: 4664.69, max: null, rate: 0.275, deduction: 896.00 },
];

const DEPENDENT_DEDUCTION = 189.59; // Monthly deduction per dependent in 2024

export default function TaxCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [dependents, setDependents] = useState<string>('0');
  const [otherDeductions, setOtherDeductions] = useState<string>('0');
  const [result, setResult] = useState<TaxResult | null>(null);

  const calculateTax = useCallback(() => {
    const grossIncome = parseFloat(monthlyIncome) || 0;
    const numDependents = parseInt(dependents) || 0;
    const otherDeductionsAmount = parseFloat(otherDeductions) || 0;

    if (grossIncome <= 0) {
      setResult(null);
      return;
    }

    // Calculate total deductions
    const dependentDeduction = numDependents * DEPENDENT_DEDUCTION;
    const totalDeductions = dependentDeduction + otherDeductionsAmount;
    
    // Calculate taxable income
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);

    // Find applicable tax bracket
    const bracket = TAX_BRACKETS_2024.find(b => 
      taxableIncome >= b.min && (b.max === null || taxableIncome <= b.max)
    );

    if (!bracket) {
      setResult(null);
      return;
    }

    // Calculate tax amount
    const taxAmount = Math.max(0, (taxableIncome * bracket.rate) - bracket.deduction);
    const netIncome = grossIncome - taxAmount;
    const effectiveRate = grossIncome > 0 ? (taxAmount / grossIncome) * 100 : 0;
    const isExempt = taxAmount === 0;

    // Determine bracket description
    let bracketDescription = '';
    if (bracket.rate === 0) {
      bracketDescription = 'Isento';
    } else if (bracket.max === null) {
      bracketDescription = `${(bracket.rate * 100).toFixed(1)}% (Acima de R$ ${bracket.min.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`;
    } else {
      bracketDescription = `${(bracket.rate * 100).toFixed(1)}% (R$ ${bracket.min.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} - R$ ${bracket.max.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`;
    }

    setResult({
      grossIncome,
      netIncome,
      taxAmount,
      effectiveRate,
      isExempt,
      bracket: bracketDescription,
    });
  }, [monthlyIncome, dependents, otherDeductions]);

  useEffect(() => {
    if (monthlyIncome) {
      calculateTax();
    }
  }, [monthlyIncome, dependents, otherDeductions, calculateTax]);

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const resetCalculator = () => {
    setMonthlyIncome('');
    setDependents('0');
    setOtherDeductions('0');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Calculadora de Imposto de Renda 2024
        </h2>
        <p className="text-gray-600">
          Calcule seu IR mensal com base na tabela progressiva da Receita Federal
        </p>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-2">
            💰 Renda Bruta Mensal (R$)
          </label>
          <input
            type="number"
            id="monthlyIncome"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            placeholder="Ex: 5000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 mb-2">
            👨‍👩‍👧‍👦 Número de Dependentes
          </label>
          <select
            id="dependents"
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[...Array(11)].map((_, i) => (
              <option key={i} value={i.toString()}>
                {i} {i === 1 ? 'dependente' : 'dependentes'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="otherDeductions" className="block text-sm font-medium text-gray-700 mb-2">
            📋 Outras Deduções (R$)
          </label>
          <input
            type="number"
            id="otherDeductions"
            value={otherDeductions}
            onChange={(e) => setOtherDeductions(e.target.value)}
            placeholder="Ex: 500"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={calculateTax}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          🧮 Calcular IR
        </button>
        <button
          onClick={resetCalculator}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          🔄 Limpar
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            📊 Resultado do Cálculo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Renda Bruta</div>
              <div className="text-lg font-bold text-gray-800">
                {formatCurrency(result.grossIncome)}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Imposto a Pagar</div>
              <div className={`text-lg font-bold ${result.isExempt ? 'text-green-600' : 'text-red-600'}`}>
                {result.isExempt ? 'ISENTO' : formatCurrency(result.taxAmount)}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Renda Líquida</div>
              <div className="text-lg font-bold text-green-600">
                {formatCurrency(result.netIncome)}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Alíquota Efetiva</div>
              <div className="text-lg font-bold text-blue-600">
                {result.effectiveRate.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Faixa de Tributação</div>
            <div className="text-lg font-semibold text-gray-800">
              {result.bracket}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">ℹ️ Informações Importantes</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Este cálculo considera apenas o IR mensal (IRRF)</li>
              <li>• Para a declaração anual, considere todos os rendimentos do ano</li>
              <li>• Deduções como plano de saúde e previdência podem reduzir o IR</li>
              <li>• Consulte sempre um contador para casos específicos</li>
            </ul>
          </div>

          {/* Annual Projection */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">📅 Projeção Anual</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Renda Bruta Anual:</span>
                <div className="font-semibold text-blue-800">
                  {formatCurrency(result.grossIncome * 12)}
                </div>
              </div>
              <div>
                <span className="text-blue-700">IR Total Anual:</span>
                <div className="font-semibold text-blue-800">
                  {formatCurrency(result.taxAmount * 12)}
                </div>
              </div>
              <div>
                <span className="text-blue-700">Renda Líquida Anual:</span>
                <div className="font-semibold text-blue-800">
                  {formatCurrency(result.netIncome * 12)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">📝 Como Usar</h4>
        <ol className="text-sm text-gray-700 space-y-1">
          <li>1. Insira sua renda bruta mensal</li>
          <li>2. Informe o número de dependentes (dedução de R$ 189,59 cada)</li>
          <li>3. Adicione outras deduções (previdência, plano de saúde, etc.)</li>
          <li>4. O cálculo será feito automaticamente</li>
        </ol>
      </div>
    </div>
  );
} 