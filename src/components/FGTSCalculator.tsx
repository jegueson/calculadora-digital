'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentYear } from '@/utils/date';

interface FGTSResult {
  monthlyDeposit: number;
  totalBalance: number;
  totalDeposits: number;
  totalYield: number;
  annualYield: number;
  withdrawalScenarios: {
    resignation: number;
    termination: number;
    houseFinancing: number;
    retirement: number;
  };
}

interface FGTSHistory {
  year: number;
  balance: number;
  deposits: number;
  yield: number;
}

const FGTS_RATE = 0.08; // 8% employer contribution
const TR_RATE = 0.03; // 3% yearly + TR (simplified)

export default function FGTSCalculator() {
  const [salary, setSalary] = useState<string>('');
  const [workYears, setWorkYears] = useState<string>('');
  const [workMonths, setWorkMonths] = useState<string>('0');
  const [currentBalance, setCurrentBalance] = useState<string>('0');
  const [result, setResult] = useState<FGTSResult | null>(null);
  const [history, setHistory] = useState<FGTSHistory[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(2024);

  // Set year on client side to avoid hydration mismatch
  useEffect(() => {
    setCurrentYear(getCurrentYear());
  }, []);

  const calculateFGTS = useCallback(() => {
    const monthlyGrossSalary = parseFloat(salary) || 0;
    const years = parseInt(workYears) || 0;
    const months = parseInt(workMonths) || 0;
    const currentFGTSBalance = parseFloat(currentBalance) || 0;

    if (monthlyGrossSalary <= 0 || (years === 0 && months === 0)) {
      setResult(null);
      setHistory([]);
      return;
    }

    const totalMonths = years * 12 + months;
    const monthlyDeposit = monthlyGrossSalary * FGTS_RATE;
    
    // Calculate FGTS with compound interest (simplified)
    let balance = currentFGTSBalance;
    const yearlyHistory: FGTSHistory[] = [];
    
    for (let month = 1; month <= totalMonths; month++) {
      // Monthly deposit
      balance += monthlyDeposit;
      
      // Monthly yield (TR + 3% annually, simplified to monthly)
      const monthlyYieldRate = TR_RATE / 12;
      const monthlyYield = balance * monthlyYieldRate;
      balance += monthlyYield;
      
      // Store yearly snapshots
      if (month % 12 === 0 || month === totalMonths) {
        const year = Math.ceil(month / 12);
        yearlyHistory.push({
          year,
          balance: Math.round(balance * 100) / 100,
          deposits: monthlyDeposit * month,
          yield: balance - (monthlyDeposit * month) - currentFGTSBalance,
        });
      }
    }

    const totalDeposits = monthlyDeposit * totalMonths;
    const totalYield = balance - totalDeposits - currentFGTSBalance;
    const annualYield = totalMonths > 0 ? (totalYield / (totalMonths / 12)) : 0;

    // Withdrawal scenarios
    const withdrawalScenarios = {
      resignation: 0, // Cannot withdraw when resigning
      termination: balance, // Full amount + 40% penalty from employer
      houseFinancing: balance * 0.9, // 90% for house financing
      retirement: balance, // Full amount
    };

    setResult({
      monthlyDeposit: Math.round(monthlyDeposit * 100) / 100,
      totalBalance: Math.round(balance * 100) / 100,
      totalDeposits: Math.round(totalDeposits * 100) / 100,
      totalYield: Math.round(totalYield * 100) / 100,
      annualYield: Math.round(annualYield * 100) / 100,
      withdrawalScenarios,
    });

    setHistory(yearlyHistory);
  }, [salary, workYears, workMonths, currentBalance]);

  useEffect(() => {
    if (salary && (workYears || workMonths)) {
      calculateFGTS();
    }
  }, [salary, workYears, workMonths, currentBalance, calculateFGTS]);

  const resetCalculator = () => {
    setSalary('');
    setWorkYears('');
    setWorkMonths('0');
    setCurrentBalance('0');
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
          Calculadora de FGTS {currentYear}
        </h2>
        <p className="text-gray-600">
          Calcule seu saldo do FGTS, rendimentos e cenários de saque
        </p>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
            💰 Salário Bruto (R$)
          </label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Ex: 3000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="workYears" className="block text-sm font-medium text-gray-700 mb-2">
            📅 Anos de Trabalho
          </label>
          <input
            type="number"
            id="workYears"
            value={workYears}
            onChange={(e) => setWorkYears(e.target.value)}
            placeholder="Ex: 5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="0"
            max="50"
          />
        </div>

        <div>
          <label htmlFor="workMonths" className="block text-sm font-medium text-gray-700 mb-2">
            📊 Meses Adicionais
          </label>
          <select
            id="workMonths"
            value={workMonths}
            onChange={(e) => setWorkMonths(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i.toString()}>
                {i} {i === 1 ? 'mês' : 'meses'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="currentBalance" className="block text-sm font-medium text-gray-700 mb-2">
            💳 Saldo Atual (R$)
          </label>
          <input
            type="number"
            id="currentBalance"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            placeholder="Ex: 5000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={calculateFGTS}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          🧮 Calcular FGTS
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
        <div className="mt-8 space-y-6">
          {/* Main Result */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              📊 Resultado do seu FGTS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {formatCurrency(result.monthlyDeposit)}
                </div>
                <div className="text-sm text-gray-600">Depósito Mensal</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {formatCurrency(result.totalBalance)}
                </div>
                <div className="text-sm text-gray-600">Saldo Total</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {formatCurrency(result.totalDeposits)}
                </div>
                <div className="text-sm text-gray-600">Total Depositado</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {formatCurrency(result.totalYield)}
                </div>
                <div className="text-sm text-gray-600">Rendimento Total</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">📈 Rendimento Anual Médio</h4>
              <div className="text-lg font-bold text-green-600">
                {formatCurrency(result.annualYield)} por ano
              </div>
            </div>
          </div>

          {/* Withdrawal Scenarios */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">💰 Cenários de Saque</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h5 className="font-semibold text-red-800 mb-2">❌ Pedido de Demissão</h5>
                <div className="text-lg font-bold text-red-600">
                  {formatCurrency(result.withdrawalScenarios.resignation)}
                </div>
                <p className="text-sm text-red-700 mt-1">
                  Não é possível sacar o FGTS em caso de demissão voluntária
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-800 mb-2">✅ Demissão sem Justa Causa</h5>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(result.withdrawalScenarios.termination)}
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Saque integral + multa de 40% paga pelo empregador
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-800 mb-2">🏠 Financiamento Imobiliário</h5>
                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(result.withdrawalScenarios.houseFinancing)}
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  Até 90% do saldo para casa própria (primeira aquisição)
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h5 className="font-semibold text-purple-800 mb-2">🎯 Aposentadoria</h5>
                <div className="text-lg font-bold text-purple-600">
                  {formatCurrency(result.withdrawalScenarios.retirement)}
                </div>
                <p className="text-sm text-purple-700 mt-1">
                  Saque integral na aposentadoria
                </p>
              </div>
            </div>
          </div>

          {/* Historical Evolution */}
          {history.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">📈 Evolução do Saldo por Ano</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Ano</th>
                      <th className="text-left py-2">Saldo Total</th>
                      <th className="text-left py-2">Depósitos</th>
                      <th className="text-left py-2">Rendimentos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((year, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 font-semibold">{year.year}°</td>
                        <td className="py-2 text-green-600 font-semibold">
                          {formatCurrency(year.balance)}
                        </td>
                        <td className="py-2">{formatCurrency(year.deposits)}</td>
                        <td className="py-2 text-purple-600">
                          {formatCurrency(year.yield)}
                        </td>
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
              <li>• O empregador deposita 8% do salário bruto mensalmente</li>
              <li>• O FGTS rende TR + 3% ao ano (cálculo simplificado)</li>
              <li>• Em demissão sem justa causa, você recebe multa de 40%</li>
              <li>• Consulte sempre a CEF para informações atualizadas</li>
              <li>• Este cálculo é uma estimativa baseada nas regras atuais</li>
            </ul>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">📝 Como Usar</h4>
        <ol className="text-sm text-gray-700 space-y-1">
          <li>1. Informe seu salário bruto atual</li>
          <li>2. Digite o tempo de trabalho em anos e meses</li>
          <li>3. Adicione seu saldo atual do FGTS (se houver)</li>
          <li>4. Veja a projeção do seu fundo e cenários de saque</li>
        </ol>
      </div>
    </div>
  );
} 