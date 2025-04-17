import React from 'react';
import PaybackCalculator from '@/components/PaybackCalculator';

export default function PaybackCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculadora de Payback
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-gray-600 mb-6 text-center">
            Calcule o tempo necessário para recuperar seu investimento inicial e avalie a viabilidade financeira do seu projeto.
          </p>
          <PaybackCalculator />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <article className="prose prose-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Como Usar a Calculadora de Payback</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">O que é Payback?</h3>
            <p className="mb-4">
              Payback é o período necessário para recuperar o investimento inicial de um projeto através dos fluxos de caixa gerados.
              É uma das métricas mais importantes para avaliar a viabilidade de um investimento.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Campos de Entrada</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Investimento Inicial:</strong> Digite o valor total do investimento inicial do projeto.</li>
              <li><strong>Fluxo de Caixa Mensal:</strong> Informe a receita líquida mensal esperada do projeto.</li>
              <li><strong>Taxa de Desconto (%):</strong> Taxa utilizada para trazer os valores futuros a valor presente (geralmente a TMA - Taxa Mínima de Atratividade).</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Interpretando os Resultados</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Payback Simples:</strong> Tempo de retorno sem considerar o valor do dinheiro no tempo.</li>
              <li><strong>Payback Descontado:</strong> Tempo de retorno considerando o valor do dinheiro no tempo (mais preciso).</li>
              <li><strong>Gráfico de Recuperação:</strong> Visualização da evolução do retorno do investimento ao longo do tempo.</li>
              <li><strong>Fluxo de Caixa Acumulado:</strong> Mostra o saldo acumulado mês a mês até a recuperação do investimento.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Como Interpretar o Payback</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Payback Curto:</strong> Menor risco, retorno mais rápido do investimento.</li>
              <li><strong>Payback Longo:</strong> Maior risco, pode indicar necessidade de reavaliação do projeto.</li>
              <li><strong>Comparação:</strong> Compare o payback calculado com o período máximo aceitável para seu tipo de negócio.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Dicas de Análise</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Compare diferentes cenários alterando o fluxo de caixa mensal esperado.</li>
              <li>Considere fatores externos que podem impactar o fluxo de caixa futuro.</li>
              <li>Use o payback descontado para uma análise mais conservadora.</li>
              <li>Combine a análise de payback com outros indicadores (TIR, VPL) para uma avaliação mais completa.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Limitações do Payback</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Não considera os fluxos de caixa após o período de recuperação.</li>
              <li>O payback simples não considera o valor do dinheiro no tempo.</li>
              <li>Não mede a rentabilidade do projeto, apenas o tempo de recuperação.</li>
              <li>Deve ser usado em conjunto com outras métricas para uma análise completa.</li>
            </ul>
          </article>
        </div>
      </div>
    </main>
  );
} 