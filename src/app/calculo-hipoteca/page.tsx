import React from 'react';

export default function MortgageCalculator() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculadora de Hipoteca
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Mortgage Calculator component will be added here */}
          <p className="text-center text-gray-600">Em desenvolvimento...</p>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <article className="prose prose-lg mx-auto">
            <h2>Planeje seu Financiamento Imobiliário</h2>
            <p>
              Nossa calculadora de hipoteca ajuda você a planejar seu financiamento
              imobiliário com precisão. Calcule:
            </p>
            <ul className="list-disc text-left pl-8">
              <li>Valor das prestações mensais</li>
              <li>Total de juros a pagar</li>
              <li>Amortização do empréstimo</li>
              <li>Prazo ideal de pagamento</li>
              <li>Simulações com diferentes taxas de juros</li>
            </ul>
            <p>
              Tome decisões informadas sobre seu financiamento imobiliário com nossa
              calculadora completa e fácil de usar.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
} 