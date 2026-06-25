import { Metadata } from 'next';
import React from 'react';
import ScientificCalculator from '@/components/ScientificCalculator';

export const metadata: Metadata = {
  title: 'Calculadora Científica Online Grátis | Com Funções Avançadas',
  description:
    'Use a calculadora científica online grátis para seno, cosseno, tangente, raiz, potência, logaritmo e operações avançadas.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-cientifica/',
  },
  openGraph: {
    title: 'Calculadora Científica Online Grátis | Com Funções Avançadas',
    description:
      'Use a calculadora científica online grátis para seno, cosseno, tangente, raiz, potência, logaritmo e operações avançadas.',
    url: 'https://calculadora-digital.com.br/calculadora-cientifica/',
    type: 'website',
  },
};

export default function ScientificCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculadora Científica Online
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-gray-600 mb-6 text-center">
            Realize cálculos científicos complexos com precisão. Funções trigonométricas, logaritmos, exponenciais e muito mais.
          </p>
          <ScientificCalculator />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <article className="prose prose-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Como Usar a Calculadora Científica</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Funções Principais</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Operações Básicas:</strong> Adição, subtração, multiplicação, divisão e porcentagem.</li>
              <li><strong>Funções Trigonométricas:</strong> Seno, cosseno, tangente e suas inversas.</li>
              <li><strong>Funções Logarítmicas:</strong> Log natural (ln), log base 10 e exponenciais.</li>
              <li><strong>Funções Especiais:</strong> Raiz quadrada, potenciação, fatorial e constantes (π, e).</li>
              <li><strong>Memória:</strong> Armazenamento e recuperação de valores (M+, M-, MR, MC).</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Modos de Operação</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Modo Graus/Radianos:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Alterne entre graus e radianos para cálculos trigonométricos</li>
                  <li>O modo atual é exibido no visor (DEG/RAD)</li>
                </ul>
              </li>
              <li><strong>Notação Científica:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Representação de números muito grandes ou pequenos</li>
                  <li>Formato: a × 10^n (exemplo: 1.23E+6)</li>
                </ul>
              </li>
              <li><strong>Precisão Decimal:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Resultados com alta precisão</li>
                  <li>Arredondamento automático quando necessário</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Funções Avançadas</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Funções Trigonométricas:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>sin, cos, tan: Funções trigonométricas diretas</li>
                  <li>arcsin, arccos, arctan: Funções trigonométricas inversas</li>
                  <li>Funções hiperbólicas (sinh, cosh, tanh)</li>
                </ul>
              </li>
              <li><strong>Funções Logarítmicas:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>ln: Logaritmo natural (base e)</li>
                  <li>log: Logaritmo na base 10</li>
                  <li>exp: Função exponencial (e^x)</li>
                </ul>
              </li>
              <li><strong>Outras Funções:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>x²: Quadrado de um número</li>
                  <li>√x: Raiz quadrada</li>
                  <li>x^y: Potenciação</li>
                  <li>n!: Fatorial</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Dicas de Uso</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Verifique o modo angular (graus/radianos) antes de cálculos trigonométricos.</li>
              <li>Use parênteses para garantir a ordem correta das operações.</li>
              <li>Utilize a memória para armazenar resultados intermediários.</li>
              <li>O botão CE limpa a entrada atual, enquanto C limpa todo o cálculo.</li>
              <li>Para números negativos, use o botão +/- após digitar o número.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Aplicações Comuns</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Matemática:</strong> Cálculos trigonométricos, logaritmos, exponenciais.</li>
              <li><strong>Física:</strong> Conversões de unidades, cálculos de força e energia.</li>
              <li><strong>Engenharia:</strong> Análise de circuitos, cálculos estruturais.</li>
              <li><strong>Estatística:</strong> Cálculos de probabilidade e análise de dados.</li>
              <li><strong>Finanças:</strong> Cálculos de juros compostos e análise financeira.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Recursos de Memória</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>M+:</strong> Adiciona o valor atual à memória.</li>
              <li><strong>M-:</strong> Subtrai o valor atual da memória.</li>
              <li><strong>MR:</strong> Recupera o valor armazenado na memória.</li>
              <li><strong>MC:</strong> Limpa a memória.</li>
              <li><strong>MS:</strong> Armazena o valor atual na memória.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Perguntas Frequentes</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Como usar uma calculadora científica online?
                </h3>
                <p className="text-gray-600">
                  Digite os números, escolha a função desejada (seno, logaritmo, raiz etc.) e pressione
                  o botão de igual. Use o modo graus ou radianos para funções trigonométricas e parênteses
                  para definir a ordem das operações.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  O que é uma calculadora científica?
                </h3>
                <p className="text-gray-600">
                  É uma calculadora com funções avançadas além das operações básicas: trigonometria,
                  logaritmos, exponenciais, fatorial e notação científica. É usada em escola, universidade,
                  engenharia e finanças.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Como calcular seno, cosseno e tangente?
                </h3>
                <p className="text-gray-600">
                  Informe o ângulo, verifique se o modo está em graus (DEG) ou radianos (RAD) e pressione
                  sin, cos ou tan. Para o inverso, use arcsin, arccos ou arctan.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Como fazer potência e raiz quadrada?
                </h3>
                <p className="text-gray-600">
                  Para raiz quadrada, digite o número e pressione √. Para potência, digite a base, use x^y
                  e informe o expoente. Exemplo: 2^8 = 256.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
} 