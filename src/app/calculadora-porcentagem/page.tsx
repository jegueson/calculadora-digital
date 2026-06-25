import { Metadata } from 'next';
import React from 'react';
import PercentageCalculator from '@/components/PercentageCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Porcentagem Online | Calcule % Grátis',
  description:
    'Calcule porcentagem online grátis: desconto, aumento, quanto é X% de um valor e porcentagem entre dois números. Rápida e fácil.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-porcentagem/',
  },
  openGraph: {
    title: 'Calculadora de Porcentagem Online | Calcule % Grátis',
    description:
      'Calcule porcentagem online grátis: desconto, aumento, quanto é X% de um valor e porcentagem entre dois números.',
    url: 'https://calculadora-digital.com.br/calculadora-porcentagem/',
    type: 'website',
  },
};

export default function PercentageCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculadora de Porcentagem Online
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-gray-600 mb-6 text-center">
            Calcule porcentagens de forma rápida e precisa. Ideal para descontos, aumentos, proporções e mais.
          </p>
          <PercentageCalculator />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <article className="prose prose-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Como Usar a Calculadora de Porcentagem</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Tipos de Cálculos Disponíveis</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Cálculo Básico de Porcentagem:</strong> Descubra quanto é X% de um valor.</li>
              <li><strong>Cálculo de Aumento:</strong> Calcule o valor final após um aumento percentual.</li>
              <li><strong>Cálculo de Desconto:</strong> Determine o valor final após aplicar um desconto.</li>
              <li><strong>Porcentagem entre Números:</strong> Calcule qual a porcentagem um número representa de outro.</li>
              <li><strong>Valor Original:</strong> Encontre o valor inicial antes de um aumento ou desconto.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Como Calcular</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Cálculo Básico:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Digite o valor base no primeiro campo</li>
                  <li>Insira a porcentagem desejada</li>
                  <li>O resultado mostrará quanto representa aquela porcentagem do valor</li>
                </ul>
              </li>
              <li><strong>Aumento/Desconto:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Insira o valor original</li>
                  <li>Digite a porcentagem de aumento ou desconto</li>
                  <li>Visualize o valor final e a diferença</li>
                </ul>
              </li>
              <li><strong>Porcentagem entre Números:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Digite o valor menor (parte)</li>
                  <li>Digite o valor maior (todo)</li>
                  <li>Veja qual porcentagem um representa do outro</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Recursos Especiais</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Formatação Automática:</strong> Os valores são formatados automaticamente para melhor visualização.</li>
              <li><strong>Cálculos em Tempo Real:</strong> Os resultados são atualizados instantaneamente conforme você digita.</li>
              <li><strong>Múltiplos Formatos:</strong> Visualize os resultados tanto em valores absolutos quanto em porcentagens.</li>
              <li><strong>Arredondamento Preciso:</strong> Resultados com até duas casas decimais para maior precisão.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Exemplos Práticos</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Desconto em Compras:</strong> Calcule quanto economizará em um produto com 20% de desconto.</li>
              <li><strong>Aumento Salarial:</strong> Determine seu novo salário após um aumento de 15%.</li>
              <li><strong>Margem de Lucro:</strong> Calcule qual a porcentagem de lucro sobre o custo de um produto.</li>
              <li><strong>Impostos:</strong> Calcule o valor de impostos baseados em porcentagens.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Exemplos Resolvidos</h2>
            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Quanto é 20% de 150?</h3>
                <p className="text-gray-700">150 × 0,20 = <strong>R$ 30,00</strong></p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Como calcular aumento percentual?</h3>
                <p className="text-gray-700">
                  Salário de R$ 3.000 com aumento de 10%: 3.000 × 1,10 = <strong>R$ 3.300,00</strong>
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Como calcular desconto?</h3>
                <p className="text-gray-700">
                  Produto de R$ 200 com 15% de desconto: 200 − (200 × 0,15) = <strong>R$ 170,00</strong>
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Como descobrir a porcentagem entre dois valores?
                </h3>
                <p className="text-gray-700">
                  45 é qual % de 180? (45 ÷ 180) × 100 = <strong>25%</strong>
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Dicas de Uso</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Para calcular descontos sucessivos, use o valor final de um cálculo como entrada para o próximo.</li>
              <li>Em caso de aumentos ou descontos múltiplos, considere o efeito acumulativo das porcentagens.</li>
              <li>Para verificar margens, use a função de porcentagem entre números.</li>
              <li>Utilize a calculadora para conferir descontos e promoções antes de fazer compras.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Aplicações Comuns</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Finanças Pessoais:</strong> Cálculo de descontos, juros e impostos.</li>
              <li><strong>Comércio:</strong> Definição de preços, margens e descontos.</li>
              <li><strong>Educação:</strong> Resolução de problemas matemáticos e estatísticos.</li>
              <li><strong>Negócios:</strong> Análise de crescimento e variações percentuais.</li>
            </ul>
          </article>
        </div>
      </div>
    </main>
  );
} 