'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface CalorieResult {
  bmr: number;
  tdee: number;
  weightLoss: {
    moderate: number;
    aggressive: number;
  };
  weightGain: {
    moderate: number;
    aggressive: number;
  };
  maintenance: number;
  macros: {
    protein: { grams: number; calories: number };
    carbs: { grams: number; calories: number };
    fats: { grams: number; calories: number };
  };
  goal: string;
  timeToGoal: number;
  weeklyChange: number;
}

export default function CalorieCalculator() {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('1.55');
  const [goalType, setGoalType] = useState<string>('maintenance');
  const [targetWeight, setTargetWeight] = useState<string>('');
  const [result, setResult] = useState<CalorieResult | null>(null);

  const activityLevels = [
    { value: '1.2', label: 'Sedentário', description: 'Pouco ou nenhum exercício' },
    { value: '1.375', label: 'Levemente ativo', description: 'Exercício leve 1-3 dias/semana' },
    { value: '1.55', label: 'Moderadamente ativo', description: 'Exercício moderado 3-5 dias/semana' },
    { value: '1.725', label: 'Muito ativo', description: 'Exercício intenso 6-7 dias/semana' },
    { value: '1.9', label: 'Extremamente ativo', description: 'Exercício muito intenso, trabalho físico' },
  ];

  const goalTypes = [
    { value: 'aggressive_loss', label: 'Perda agressiva', description: 'Perder 1kg/semana' },
    { value: 'moderate_loss', label: 'Perda moderada', description: 'Perder 0,5kg/semana' },
    { value: 'maintenance', label: 'Manutenção', description: 'Manter peso atual' },
    { value: 'moderate_gain', label: 'Ganho moderado', description: 'Ganhar 0,5kg/semana' },
    { value: 'aggressive_gain', label: 'Ganho agressivo', description: 'Ganhar 1kg/semana' },
  ];

  const calculateCalories = useCallback(() => {
    const ageNum = parseInt(age) || 0;
    const heightNum = parseFloat(height) || 0;
    const weightNum = parseFloat(weight) || 0;
    const activityNum = parseFloat(activityLevel) || 1.55;
    const targetWeightNum = parseFloat(targetWeight) || weightNum;

    if (!ageNum || !heightNum || !weightNum) {
      setResult(null);
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityNum;

    // Calculate calorie goals
    const weightLoss = {
      moderate: Math.round(tdee - 500),
      aggressive: Math.round(tdee - 1000),
    };

    const weightGain = {
      moderate: Math.round(tdee + 500),
      aggressive: Math.round(tdee + 1000),
    };

    // Determine target calories based on goal
    let targetCalories = tdee;
    let goalDescription = 'Manutenção';
    let weeklyChange = 0;

    switch (goalType) {
      case 'aggressive_loss':
        targetCalories = weightLoss.aggressive;
        goalDescription = 'Perda agressiva';
        weeklyChange = -1;
        break;
      case 'moderate_loss':
        targetCalories = weightLoss.moderate;
        goalDescription = 'Perda moderada';
        weeklyChange = -0.5;
        break;
      case 'moderate_gain':
        targetCalories = weightGain.moderate;
        goalDescription = 'Ganho moderado';
        weeklyChange = 0.5;
        break;
      case 'aggressive_gain':
        targetCalories = weightGain.aggressive;
        goalDescription = 'Ganho agressivo';
        weeklyChange = 1;
        break;
      default:
        targetCalories = tdee;
        goalDescription = 'Manutenção';
        weeklyChange = 0;
    }

    // Calculate time to reach goal
    const weightDifference = Math.abs(targetWeightNum - weightNum);
    const timeToGoal = weeklyChange !== 0 ? Math.ceil(weightDifference / Math.abs(weeklyChange)) : 0;

    // Calculate macros (40% carbs, 30% protein, 30% fat)
    const proteinCalories = targetCalories * 0.30;
    const carbsCalories = targetCalories * 0.40;
    const fatsCalories = targetCalories * 0.30;

    const macros = {
      protein: {
        grams: Math.round(proteinCalories / 4),
        calories: Math.round(proteinCalories),
      },
      carbs: {
        grams: Math.round(carbsCalories / 4),
        calories: Math.round(carbsCalories),
      },
      fats: {
        grams: Math.round(fatsCalories / 9),
        calories: Math.round(fatsCalories),
      },
    };

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss,
      weightGain,
      maintenance: Math.round(tdee),
      macros,
      goal: goalDescription,
      timeToGoal,
      weeklyChange,
    });
  }, [age, gender, height, weight, activityLevel, goalType, targetWeight]);

  useEffect(() => {
    if (age && height && weight) {
      calculateCalories();
    }
  }, [age, gender, height, weight, activityLevel, goalType, targetWeight, calculateCalories]);

  const resetCalculator = () => {
    setAge('');
    setHeight('');
    setWeight('');
    setTargetWeight('');
    setGender('male');
    setActivityLevel('1.55');
    setGoalType('maintenance');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Calculadora de Calorias 2024
        </h2>
        <p className="text-gray-600">
          Calcule suas calorias diárias e planeje sua alimentação para alcançar seus objetivos
        </p>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
            🎂 Idade
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Ex: 25"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="10"
            max="120"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
            ⚧ Sexo
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
            min="100"
            max="250"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
            ⚖️ Peso Atual (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Ex: 70"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="30"
            max="300"
            step="0.1"
          />
        </div>

        <div>
          <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-2">
            🏃‍♂️ Nível de Atividade
          </label>
          <select
            id="activityLevel"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="goalType" className="block text-sm font-medium text-gray-700 mb-2">
            🎯 Objetivo
          </label>
          <select
            id="goalType"
            value={goalType}
            onChange={(e) => setGoalType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {goalTypes.map((goal) => (
              <option key={goal.value} value={goal.value}>
                {goal.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="targetWeight" className="block text-sm font-medium text-gray-700 mb-2">
            🎯 Peso Alvo (kg) - Opcional
          </label>
          <input
            type="number"
            id="targetWeight"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            placeholder="Ex: 65"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="30"
            max="300"
            step="0.1"
          />
        </div>

        <div>
          <div className="flex items-end h-full">
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              🧮 Resultado das Calorias
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {result.bmr}
                </div>
                <div className="text-sm text-gray-600">TMB (Metabolismo Basal)</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {result.tdee}
                </div>
                <div className="text-sm text-gray-600">TDEE (Gasto Total)</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {result.weightLoss.moderate}
                </div>
                <div className="text-sm text-gray-600">Perda Moderada</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {result.weightGain.moderate}
                </div>
                <div className="text-sm text-gray-600">Ganho Moderado</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {result.macros.protein.grams}g
                </div>
                <div className="text-sm text-gray-600">Proteína</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {result.macros.carbs.grams}g
                </div>
                <div className="text-sm text-gray-600">Carboidratos</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {result.macros.fats.grams}g
                </div>
                <div className="text-sm text-gray-600">Gorduras</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">📝 Como Usar</h4>
        <ol className="text-sm text-gray-700 space-y-1">
          <li>1. Insira sua idade, sexo, altura e peso atual</li>
          <li>2. Selecione seu nível de atividade física</li>
          <li>3. Escolha seu objetivo (perda, manutenção ou ganho de peso)</li>
          <li>4. Use as calorias calculadas para planejar sua alimentação</li>
        </ol>
      </div>
    </div>
  );
}
