'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface BMIResult {
  bmi: number;
  category: string;
  description: string;
  healthRisk: string;
  idealWeightRange: {
    min: number;
    max: number;
  };
  weightDifference: number;
  color: string;
}

const BMI_CATEGORIES = [
  { min: 0, max: 16.9, category: 'Muito Abaixo do Peso', description: 'Magreza grave', healthRisk: 'Alto', color: 'text-red-600' },
  { min: 17, max: 18.4, category: 'Abaixo do Peso', description: 'Magreza leve', healthRisk: 'Baixo', color: 'text-yellow-600' },
  { min: 18.5, max: 24.9, category: 'Peso Normal', description: 'Saudável', healthRisk: 'Baixo', color: 'text-green-600' },
  { min: 25, max: 29.9, category: 'Sobrepeso', description: 'Sobrepeso', healthRisk: 'Baixo a Moderado', color: 'text-yellow-600' },
  { min: 30, max: 34.9, category: 'Obesidade Grau I', description: 'Obesidade leve', healthRisk: 'Moderado', color: 'text-orange-600' },
  { min: 35, max: 39.9, category: 'Obesidade Grau II', description: 'Obesidade moderada', healthRisk: 'Alto', color: 'text-red-600' },
  { min: 40, max: 100, category: 'Obesidade Grau III', description: 'Obesidade mórbida', healthRisk: 'Muito Alto', color: 'text-red-800' },
];

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = useCallback(() => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert cm to meters

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      setResult(null);
      return;
    }

    const bmi = weightNum / (heightNum * heightNum);
    
    // Find BMI category
    const category = BMI_CATEGORIES.find(cat => bmi >= cat.min && bmi <= cat.max) || BMI_CATEGORIES[BMI_CATEGORIES.length - 1];
    
    // Calculate ideal weight range (BMI 18.5-24.9)
    const idealWeightMin = 18.5 * (heightNum * heightNum);
    const idealWeightMax = 24.9 * (heightNum * heightNum);
    
    // Calculate weight difference to ideal range
    let weightDifference = 0;
    if (bmi < 18.5) {
      weightDifference = idealWeightMin - weightNum; // Need to gain
    } else if (bmi > 24.9) {
      weightDifference = weightNum - idealWeightMax; // Need to lose
    }

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category: category.category,
      description: category.description,
      healthRisk: category.healthRisk,
      idealWeightRange: {
        min: Math.round(idealWeightMin * 10) / 10,
        max: Math.round(idealWeightMax * 10) / 10,
      },
      weightDifference: Math.round(Math.abs(weightDifference) * 10) / 10,
      color: category.color,
    });
  }, [weight, height]);

  useEffect(() => {
    if (weight && height) {
      calculateBMI();
    }
  }, [weight, height, calculateBMI]);

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setResult(null);
  };

  const getRecommendations = () => {
    if (!result) return [];
    
    const recommendations = [];
    
    if (result.bmi < 18.5) {
      recommendations.push(
        '🍽️ Aumente o consumo de calorias saudáveis',
        '💪 Faça exercícios de força para ganhar massa muscular',
        '🥗 Consuma proteínas de qualidade (carnes, ovos, leguminosas)',
        '👩‍⚕️ Consulte um nutricionista para orientação personalizada'
      );
    } else if (result.bmi >= 18.5 && result.bmi <= 24.9) {
      recommendations.push(
        '✅ Mantenha seus hábitos saudáveis atuais',
        '🏃‍♀️ Pratique atividade física regular (150min/semana)',
        '🥬 Mantenha uma alimentação equilibrada',
        '💧 Beba bastante água (pelo menos 2L por dia)'
      );
    } else if (result.bmi >= 25 && result.bmi < 30) {
      recommendations.push(
        '🚶‍♀️ Aumente a atividade física gradualmente',
        '🍎 Reduza calorias com foco em alimentos nutritivos',
        '⏰ Pratique o controle de porções',
        '😴 Mantenha um sono de qualidade (7-8h por noite)'
      );
    } else {
      recommendations.push(
        '👨‍⚕️ Consulte um médico para avaliação completa',
        '📊 Considere acompanhamento nutricional profissional',
        '🏊‍♀️ Inicie atividades físicas de baixo impacto',
        '🎯 Estabeleça metas realistas de perda de peso',
        '❤️ Monitore regularmente pressão arterial e glicemia'
      );
    }
    
    return recommendations;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Calculadora de IMC (Índice de Massa Corporal)
        </h2>
        <p className="text-gray-600">
          Calcule seu IMC e descubra se seu peso está dentro da faixa saudável
        </p>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
            ⚖️ Peso (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Ex: 70"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            max="300"
            step="0.1"
          />
        </div>

        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
            📏 Altura (cm)
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Ex: 175"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="50"
            max="250"
            step="0.1"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
            🎂 Idade (anos)
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Ex: 30"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            max="120"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
            👤 Sexo
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={calculateBMI}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          🧮 Calcular IMC
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              📊 Resultado do seu IMC
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {result.bmi}
                </div>
                <div className="text-sm text-gray-600">Seu IMC</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className={`text-lg font-bold mb-1 ${result.color}`}>
                  {result.category}
                </div>
                <div className="text-sm text-gray-600">{result.description}</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-lg font-bold text-gray-800 mb-1">
                  Risco: {result.healthRisk}
                </div>
                <div className="text-sm text-gray-600">Para a saúde</div>
              </div>
            </div>

            {/* Weight Analysis */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">📈 Análise do Peso</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Peso ideal:</span>
                  <div className="font-semibold text-green-600">
                    {result.idealWeightRange.min}kg - {result.idealWeightRange.max}kg
                  </div>
                </div>
                {result.weightDifference > 0 && (
                  <div>
                    <span className="text-gray-600">
                      {result.bmi < 18.5 ? 'Para ganhar:' : 'Para perder:'}
                    </span>
                    <div className="font-semibold text-blue-600">
                      {result.weightDifference}kg
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BMI Table */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">📋 Tabela de Classificação IMC</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">IMC</th>
                    <th className="text-left py-2">Classificação</th>
                    <th className="text-left py-2">Risco</th>
                  </tr>
                </thead>
                <tbody>
                  {BMI_CATEGORIES.map((cat, index) => (
                    <tr 
                      key={index} 
                      className={`border-b ${result.bmi >= cat.min && result.bmi <= cat.max ? 'bg-blue-50 font-semibold' : ''}`}
                    >
                      <td className="py-2">
                        {cat.max === 100 ? `>${cat.min}` : `${cat.min} - ${cat.max}`}
                      </td>
                      <td className={`py-2 ${cat.color}`}>{cat.category}</td>
                      <td className="py-2">{cat.healthRisk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-4">💡 Recomendações Personalizadas</h4>
            <ul className="space-y-2">
              {getRecommendations().map((rec, index) => (
                <li key={index} className="text-green-700 text-sm">
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Importante</h4>
            <p className="text-yellow-700 text-sm">
              O IMC é uma ferramenta de triagem, não um diagnóstico. Fatores como massa muscular, 
              densidade óssea e composição corporal não são considerados. Consulte sempre um 
              profissional de saúde para avaliação completa.
            </p>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">📝 Como Usar</h4>
        <ol className="text-sm text-gray-700 space-y-1">
          <li>1. Informe seu peso atual em quilogramas</li>
          <li>2. Digite sua altura em centímetros</li>
          <li>3. Adicione sua idade (opcional, para orientações específicas)</li>
          <li>4. Selecione seu sexo</li>
          <li>5. O IMC será calculado automaticamente</li>
        </ol>
      </div>
    </div>
  );
} 