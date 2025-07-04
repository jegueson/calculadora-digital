'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface RetirementResult {
  inssRetirement: {
    monthlyBenefit: number;
    retirementAge: number;
    contributionTime: number;
    totalContributed: number;
    replacementRate: number;
  };
  privatePension: {
    monthlyContribution: number;
    totalInvested: number;
    finalBalance: number;
    monthlyIncome: number;
    yieldRate: number;
  };
  combined: {
    totalMonthlyIncome: number;
    lifestyle: string;
    sufficiency: number;
  };
}

interface ContributionHistory {
  year: number;
  salary: number;
  inssContribution: number;
  privateContribution: number;
  totalBalance: number;
}

const INSS_CEILING_2024 = 7507.49; // INSS ceiling for 2024
const INSS_FLOOR_2024 = 1412.00; // Minimum wage 2024
const INSS_RATES = [
  { min: 0, max: 1412.00, rate: 0.075 },
  { min: 1412.01, max: 2666.68, rate: 0.09 },
  { min: 2666.69, max: 4000.03, rate: 0.12 },
  { min: 4000.04, max: 7507.49, rate: 0.14 },
];

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<string>('');
  const [currentSalary, setCurrentSalary] = useState<string>('');
  const [contributionTime, setContributionTime] = useState<string>('');
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [privateContribution, setPrivateContribution] = useState<string>('');
  const [expectedInflation, setExpectedInflation] = useState<string>('4');
  const [expectedReturn, setExpectedReturn] = useState<string>('10');
  const [result, setResult] = useState<RetirementResult | null>(null);
  const [history, setHistory] = useState<ContributionHistory[]>([]);

  const calculateINSSContribution = (salary: number): number => {
    let contribution = 0;
    let remainingSalary = salary;

    for (const bracket of INSS_RATES) {
      if (remainingSalary <= 0) break;
      
      const bracketMax = bracket.max === 7507.49 ? bracket.max : bracket.max;
      const bracketMin = bracket.min;
      const bracketAmount = Math.min(remainingSalary, bracketMax - bracketMin);
      
      if (bracketAmount > 0) {
        contribution += bracketAmount * bracket.rate;
        remainingSalary -= bracketAmount;
      }
    }

    return Math.min(contribution, INSS_CEILING_2024 * 0.14);
  };

  const calculateINSSBenefit = (averageSalary: number, contributionYears: number): number => {
    // Simplified INSS calculation based on 2024 rules
    const contributionFactor = Math.min(contributionYears / 35, 1); // 35 years for full benefit
    let benefit = averageSalary * 0.6; // Base rate 60%
    
    // Additional 2% per year over 20 years (for age rule) or 15 years (for time rule)
    const additionalYears = Math.max(0, contributionYears - 20);
    benefit += averageSalary * (additionalYears * 0.02);
    
    // Apply contribution factor
    benefit *= contributionFactor;
    
    // Apply ceiling and floor
    return Math.max(INSS_FLOOR_2024, Math.min(benefit, INSS_CEILING_2024));
  };

  const calculateRetirement = useCallback(() => {
    const age = parseInt(currentAge) || 0;
    const salary = parseFloat(currentSalary) || 0;
    const contributionYears = parseInt(contributionTime) || 0;
    const targetRetirementAge = parseInt(retirementAge) || 65;
    const privateMonthlyContrib = parseFloat(privateContribution) || 0;
    const inflation = parseFloat(expectedInflation) / 100 || 0.04;
    const returnRate = parseFloat(expectedReturn) / 100 || 0.10;

    if (!age || !salary || age >= targetRetirementAge) {
      setResult(null);
      setHistory([]);
      return;
    }

    const yearsToRetirement = targetRetirementAge - age;
    const totalContributionYears = contributionYears + yearsToRetirement;
    
    // INSS Calculation
    const monthlyINSSContrib = calculateINSSContribution(salary);
    const totalINSSContributed = monthlyINSSContrib * 12 * totalContributionYears;
    const averageContributionSalary = Math.min(salary, INSS_CEILING_2024);
    const inssMonthlyBenefit = calculateINSSBenefit(averageContributionSalary, totalContributionYears);
    
    // Private Pension Calculation
    const realReturnRate = (1 + returnRate) / (1 + inflation) - 1;
    const monthlyRealReturn = realReturnRate / 12;
    const totalMonths = yearsToRetirement * 12;
    
    let privatePensionBalance = 0;
    if (privateMonthlyContrib > 0 && totalMonths > 0) {
      // Future value of ordinary annuity
      privatePensionBalance = privateMonthlyContrib * 
        ((Math.pow(1 + monthlyRealReturn, totalMonths) - 1) / monthlyRealReturn);
    }
    
    const totalPrivateInvested = privateMonthlyContrib * totalMonths;
    
    // Calculate monthly income from private pension (assuming 4% withdrawal rule)
    const privatePensionMonthlyIncome = privatePensionBalance * 0.04 / 12;
    
    // Combined Analysis
    const totalMonthlyIncome = inssMonthlyBenefit + privatePensionMonthlyIncome;
    const replacementRate = (totalMonthlyIncome / salary) * 100;
    
    let lifestyle = "Básico";
    if (replacementRate >= 100) lifestyle = "Confortável";
    else if (replacementRate >= 80) lifestyle = "Adequado";
    else if (replacementRate >= 60) lifestyle = "Moderado";
    
    // Generate historical projection
    const yearlyHistory: ContributionHistory[] = [];
    let runningBalance = 0;
    
    for (let year = 1; year <= Math.min(yearsToRetirement, 10); year++) {
      const yearSalary = salary * Math.pow(1 + inflation, year);
      const yearINSSContrib = calculateINSSContribution(yearSalary);
      const yearPrivateContrib = privateMonthlyContrib * 12 * Math.pow(1 + inflation, year);
      
      runningBalance = (runningBalance + yearPrivateContrib) * (1 + realReturnRate);
      
      yearlyHistory.push({
        year: new Date().getFullYear() + year,
        salary: Math.round(yearSalary),
        inssContribution: Math.round(yearINSSContrib * 12),
        privateContribution: Math.round(yearPrivateContrib),
        totalBalance: Math.round(runningBalance),
      });
    }

    setResult({
      inssRetirement: {
        monthlyBenefit: Math.round(inssMonthlyBenefit),
        retirementAge: targetRetirementAge,
        contributionTime: totalContributionYears,
        totalContributed: Math.round(totalINSSContributed),
        replacementRate: Math.round((inssMonthlyBenefit / salary) * 100),
      },
      privatePension: {
        monthlyContribution: privateMonthlyContrib,
        totalInvested: Math.round(totalPrivateInvested),
        finalBalance: Math.round(privatePensionBalance),
        monthlyIncome: Math.round(privatePensionMonthlyIncome),
        yieldRate: returnRate * 100,
      },
      combined: {
        totalMonthlyIncome: Math.round(totalMonthlyIncome),
        lifestyle,
        sufficiency: Math.round(replacementRate),
      }
    });

    setHistory(yearlyHistory);
  }, [currentAge, currentSalary, contributionTime, retirementAge, privateContribution, expectedInflation, expectedReturn]);

  useEffect(() => {
    if (currentAge && currentSalary && retirementAge) {
      calculateRetirement();
    }
  }, [currentAge, currentSalary, contributionTime, retirementAge, privateContribution, expectedInflation, expectedReturn, calculateRetirement]);

  const resetCalculator = () => {
    setCurrentAge('');
    setCurrentSalary('');
    setContributionTime('');
    setRetirementAge('65');
    setPrivateContribution('');
    setExpectedInflation('4');
    setExpectedReturn('10');
    setResult(null);
    setHistory([]);
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Calculadora de Aposentadoria 2024
        </h2>
        <p className="text-gray-600">
          Simule sua aposentadoria pelo INSS e previdência privada
        </p>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="currentAge" className="block text-sm font-medium text-gray-700 mb-2">
            🎂 Idade Atual
          </label>
          <input
            type="number"
            id="currentAge"
            value={currentAge}
            onChange={(e) => setCurrentAge(e.target.value)}
            placeholder="Ex: 30"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="18"
            max="70"
          />
        </div>

        <div>
          <label htmlFor="currentSalary" className="block text-sm font-medium text-gray-700 mb-2">
            💰 Salário Atual (R$)
          </label>
          <input
            type="number"
            id="currentSalary"
            value={currentSalary}
            onChange={(e) => setCurrentSalary(e.target.value)}
            placeholder="Ex: 5000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="contributionTime" className="block text-sm font-medium text-gray-700 mb-2">
            📅 Anos Contribuídos
          </label>
          <input
            type="number"
            id="contributionTime"
            value={contributionTime}
            onChange={(e) => setContributionTime(e.target.value)}
            placeholder="Ex: 10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="50"
          />
        </div>

        <div>
          <label htmlFor="retirementAge" className="block text-sm font-medium text-gray-700 mb-2">
            🎯 Idade para Aposentar
          </label>
          <select
            id="retirementAge"
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="60">60 anos</option>
            <option value="62">62 anos</option>
            <option value="65">65 anos</option>
            <option value="67">67 anos</option>
            <option value="70">70 anos</option>
          </select>
        </div>

        <div>
          <label htmlFor="privateContribution" className="block text-sm font-medium text-gray-700 mb-2">
            🏦 Previdência Privada (R$/mês)
          </label>
          <input
            type="number"
            id="privateContribution"
            value={privateContribution}
            onChange={(e) => setPrivateContribution(e.target.value)}
            placeholder="Ex: 500"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="expectedInflation" className="block text-sm font-medium text-gray-700 mb-2">
            📈 Inflação Esperada (% a.a.)
          </label>
          <input
            type="number"
            id="expectedInflation"
            value={expectedInflation}
            onChange={(e) => setExpectedInflation(e.target.value)}
            placeholder="Ex: 4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="20"
            step="0.1"
          />
        </div>

        <div>
          <label htmlFor="expectedReturn" className="block text-sm font-medium text-gray-700 mb-2">
            💹 Retorno Esperado (% a.a.)
          </label>
          <input
            type="number"
            id="expectedReturn"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            placeholder="Ex: 10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="30"
            step="0.1"
          />
        </div>

        <div className="flex items-end">
          <div className="w-full space-y-2">
            <button
              onClick={calculateRetirement}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              🧮 Calcular
            </button>
            <button
              onClick={resetCalculator}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              🔄 Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* INSS Results */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              🏛️ Aposentadoria pelo INSS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {formatCurrency(result.inssRetirement.monthlyBenefit)}
                </div>
                <div className="text-sm text-gray-600">Benefício Mensal</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {result.inssRetirement.contributionTime} anos
                </div>
                <div className="text-sm text-gray-600">Tempo Total</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {formatCurrency(result.inssRetirement.totalContributed)}
                </div>
                <div className="text-sm text-gray-600">Total Contribuído</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {result.inssRetirement.replacementRate}%
                </div>
                <div className="text-sm text-gray-600">Taxa de Reposição</div>
              </div>
            </div>
          </div>

          {/* Private Pension Results */}
          {result.privatePension.monthlyContribution > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                🏦 Previdência Privada
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatCurrency(result.privatePension.monthlyIncome)}
                  </div>
                  <div className="text-sm text-gray-600">Renda Mensal</div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatCurrency(result.privatePension.finalBalance)}
                  </div>
                  <div className="text-sm text-gray-600">Saldo Final</div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {formatCurrency(result.privatePension.totalInvested)}
                  </div>
                  <div className="text-sm text-gray-600">Total Investido</div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {result.privatePension.yieldRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Retorno Anual</div>
                </div>
              </div>
            </div>
          )}

          {/* Combined Results */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              🎯 Resultado Combinado
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {formatCurrency(result.combined.totalMonthlyIncome)}
                </div>
                <div className="text-sm text-gray-600">Renda Total Mensal</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  result.combined.sufficiency >= 80 ? 'text-green-600' : 
                  result.combined.sufficiency >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {result.combined.sufficiency}%
                </div>
                <div className="text-sm text-gray-600">Taxa de Reposição Total</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className={`text-lg font-bold mb-1 ${
                  result.combined.lifestyle === 'Confortável' ? 'text-green-600' : 
                  result.combined.lifestyle === 'Adequado' ? 'text-blue-600' :
                  result.combined.lifestyle === 'Moderado' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {result.combined.lifestyle}
                </div>
                <div className="text-sm text-gray-600">Estilo de Vida</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">📊 Análise da Aposentadoria</h4>
              <div className="text-sm text-gray-700">
                {result.combined.sufficiency >= 100 && (
                  <p className="text-green-700">
                    ✅ Excelente! Sua aposentadoria superará sua renda atual. Você terá uma aposentadoria confortável.
                  </p>
                )}
                {result.combined.sufficiency >= 80 && result.combined.sufficiency < 100 && (
                  <p className="text-blue-700">
                    ✅ Boa situação! Sua aposentadoria representa mais de 80% da renda atual. Padrão de vida adequado.
                  </p>
                )}
                {result.combined.sufficiency >= 60 && result.combined.sufficiency < 80 && (
                  <p className="text-yellow-700">
                    ⚠️ Situação moderada. Sua aposentadoria cobrirá 60-80% da renda atual. Considere aumentar contribuições.
                  </p>
                )}
                {result.combined.sufficiency < 60 && (
                  <p className="text-red-700">
                    ❌ Atenção! Sua aposentadoria será insuficiente. É fundamental aumentar as contribuições ou idade de aposentadoria.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Historical Projection */}
          {history.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">📈 Projeção Anual (Próximos 10 Anos)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Ano</th>
                      <th className="text-left py-2">Salário</th>
                      <th className="text-left py-2">INSS</th>
                      <th className="text-left py-2">Previdência</th>
                      <th className="text-left py-2">Saldo Acumulado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((year, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 font-semibold">{year.year}</td>
                        <td className="py-2">{formatCurrency(year.salary)}</td>
                        <td className="py-2 text-blue-600">{formatCurrency(year.inssContribution)}</td>
                        <td className="py-2 text-green-600">{formatCurrency(year.privateContribution)}</td>
                        <td className="py-2 text-purple-600 font-semibold">{formatCurrency(year.totalBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Important Information */}
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Informações Importantes</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Cálculos baseados nas regras do INSS de 2024</li>
              <li>• Valores corrigidos pela inflação projetada</li>
              <li>• Previdência privada calculada com rentabilidade real</li>
              <li>• Consulte sempre um especialista em previdência</li>
              <li>• Este simulador não substitui planejamento profissional</li>
            </ul>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">📝 Como Usar</h4>
        <ol className="text-sm text-gray-700 space-y-1">
          <li>1. Informe sua idade atual e salário</li>
          <li>2. Digite quantos anos já contribuiu para o INSS</li>
          <li>3. Escolha a idade que pretende se aposentar</li>
          <li>4. Adicione contribuição para previdência privada (opcional)</li>
          <li>5. Ajuste as expectativas de inflação e retorno</li>
        </ol>
      </div>
    </div>
  );
} 