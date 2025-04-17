import React from 'react';
import PercentageCalculator from '@/components/PercentageCalculator';

export default function PercentageCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculadora de Porcentagem Online
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600 mb-6 text-center">
            Ferramenta online que permite calcular porcentagem de várias formas, aumentos, descontos, proporções, etc.
            Basta escolher qual das calculadoras de porcentagem mais se aplica ao seu problema, digitar nos espaços e clicar no botão calcular da linha correspondente.
          </p>
          <PercentageCalculator />
        </div>
        <div className="mt-8 text-center text-gray-600">
          <article className="prose prose-lg mx-auto">
            <h2>Recursos da Calculadora de Porcentagem</h2>
            <ul className="list-disc text-left pl-8">
              <li>Cálculo básico de porcentagem</li>
              <li>Cálculo de aumentos percentuais</li>
              <li>Cálculo de descontos percentuais</li>
              <li>Conversão de valores em porcentagem</li>
              <li>Cálculo de valor original antes de aumento/desconto</li>
              <li>Formatação automática dos números</li>
              <li>Interface intuitiva e responsiva</li>
            </ul>
            <p>
              Nossa calculadora de porcentagem é uma ferramenta essencial para estudantes,
              profissionais de finanças, comerciantes e qualquer pessoa que precise realizar
              cálculos percentuais com rapidez e precisão.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
} 