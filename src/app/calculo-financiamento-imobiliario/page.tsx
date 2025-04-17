import React from 'react';
import PropertyFinanceCalculator from '@/components/PropertyFinanceCalculator';

export default function PropertyFinanceCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculadora de Financiamento Imobiliário
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-gray-600 mb-6 text-center">
            Simule seu financiamento imobiliário de forma rápida e precisa. Calcule prestações, juros e planeje sua aquisição.
          </p>
          <PropertyFinanceCalculator />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <article className="prose prose-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Como Usar a Calculadora de Financiamento Imobiliário</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Campos de Entrada</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Valor do Imóvel:</strong> Digite o valor total do imóvel que deseja financiar.</li>
              <li><strong>Valor da Entrada:</strong> Informe quanto você pode pagar de entrada (recomendado mínimo de 20%).</li>
              <li><strong>Taxa de Juros Anual:</strong> Digite a taxa de juros anual do financiamento (geralmente entre 6% e 12%).</li>
              <li><strong>Prazo em Anos:</strong> Escolha o prazo do financiamento (geralmente entre 20 e 35 anos).</li>
              <li><strong>Seguro Mensal:</strong> Valor do seguro habitacional mensal (obrigatório).</li>
              <li><strong>Taxa Administrativa Mensal:</strong> Valor da taxa de administração cobrada pelo banco.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Interpretando os Resultados</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Valor da Parcela:</strong> Mostra o valor total mensal que você irá pagar, incluindo amortização, juros, seguros e taxas.</li>
              <li><strong>Valor Total do Financiamento:</strong> Apresenta o custo total do financiamento ao longo de todo o período.</li>
              <li><strong>Gráfico de Composição:</strong> Demonstra visualmente como sua parcela é composta entre principal, juros e encargos.</li>
              <li><strong>Tabela de Amortização:</strong> Detalha mês a mês como será a evolução do seu financiamento.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Dicas Importantes</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Quanto maior a entrada, menor será o valor financiado e, consequentemente, menor o valor total pago em juros.</li>
              <li>Prazos mais longos resultam em parcelas menores, mas aumentam significativamente o valor total pago.</li>
              <li>Compare diferentes cenários alterando os valores de entrada e prazo para encontrar a melhor opção.</li>
              <li>Considere sua capacidade de pagamento mensal, que idealmente não deve comprometer mais de 30% da sua renda.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Sistema de Amortização</h3>
            <p className="mb-4">
              Esta calculadora utiliza o Sistema de Amortização Constante (SAC), onde:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>O valor da amortização é fixo ao longo do financiamento.</li>
              <li>As prestações são decrescentes, pois os juros diminuem conforme o saldo devedor é reduzido.</li>
              <li>Ideal para quem pode pagar parcelas maiores no início do financiamento.</li>
            </ul>
          </article>
        </div>
      </div>
    </main>
  );
} 