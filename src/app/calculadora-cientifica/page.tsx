import React from 'react';
import ScientificCalculator from '@/components/ScientificCalculator';

export default function ScientificCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculadora Científica Online
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ScientificCalculator />
        </div>
        <div className="mt-8 text-center text-gray-600">
          <article className="prose prose-lg mx-auto">
            <h2>Calculadora Científica Online Gratuita</h2>
            <p>
              Nossa calculadora científica online oferece todas as funções avançadas necessárias
              para cálculos matemáticos complexos. Ideal para estudantes, professores e profissionais
              que precisam de uma ferramenta confiável para:
            </p>
            <ul className="list-disc text-left pl-8">
              <li>Funções trigonométricas (seno, cosseno, tangente)</li>
              <li>Logaritmos naturais e na base 10</li>
              <li>Constantes matemáticas (π, e)</li>
              <li>Potências e raízes quadradas</li>
              <li>Funções exponenciais</li>
              <li>Memória para armazenar resultados</li>
              <li>Modos RAD/DEG para cálculos trigonométricos</li>
            </ul>
            <p>
              Realize cálculos complexos com facilidade e precisão usando nossa
              calculadora científica gratuita, disponível diretamente no seu navegador.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
} 