import React from 'react';
import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculadora Digital Online
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-gray-600 mb-6 text-center">
            Realize cálculos básicos e avançados com facilidade e precisão. Interface intuitiva e resultados instantâneos.
          </p>
          <Calculator />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <article className="prose prose-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Bem-vindo à Calculadora Digital</h2>
            <p className="mb-4">
              Nossa calculadora digital online é uma ferramenta gratuita, rápida e fácil de usar para todos os tipos de cálculos.
              Desenvolvida para oferecer praticidade e precisão, ela é perfeita para estudantes, profissionais e qualquer pessoa
              que precise realizar cálculos no dia a dia.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Recursos Principais</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Interface Intuitiva:</strong> Design moderno e fácil de usar</li>
              <li><strong>Cálculos Instantâneos:</strong> Resultados em tempo real</li>
              <li><strong>Histórico de Operações:</strong> Acompanhe seus cálculos anteriores</li>
              <li><strong>Funções Avançadas:</strong> Além das operações básicas</li>
              <li><strong>Acesso Gratuito:</strong> Sem necessidade de cadastro ou instalação</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Nossas Calculadoras Especializadas</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>
                <strong>Calculadora de Porcentagem:</strong> Ideal para descontos, aumentos e variações percentuais
              </li>
              <li>
                <strong>Calculadora de Juros Compostos:</strong> Para análise de investimentos e empréstimos
              </li>
              <li>
                <strong>Calculadora de Financiamento Imobiliário:</strong> Simule prestações e planeje sua aquisição
              </li>
              <li>
                <strong>Calculadora Científica:</strong> Para cálculos matemáticos avançados
              </li>
              <li>
                <strong>Calculadora de Payback:</strong> Avalie o retorno de investimentos
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Como Usar</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Operações Básicas:</strong> Digite os números e use os botões de operação (+, -, ×, ÷)</li>
              <li><strong>Porcentagem:</strong> Use o botão % para cálculos percentuais</li>
              <li><strong>Memória:</strong> Utilize M+, M-, MR para armazenar e recuperar valores</li>
              <li><strong>Limpar:</strong> C para limpar tudo, CE para limpar última entrada</li>
              <li><strong>Resultado:</strong> Pressione = ou Enter para ver o resultado</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Aplicações Práticas</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Estudos:</strong> Resolução de exercícios e verificação de resultados</li>
              <li><strong>Finanças Pessoais:</strong> Cálculo de descontos, juros e orçamentos</li>
              <li><strong>Trabalho:</strong> Cálculos profissionais e análises rápidas</li>
              <li><strong>Compras:</strong> Verificação de preços e descontos</li>
              <li><strong>Planejamento:</strong> Orçamentos e estimativas</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Dicas de Uso</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Utilize o teclado numérico para entrada mais rápida de números</li>
              <li>Aproveite o histórico para verificar cálculos anteriores</li>
              <li>Explore nossas calculadoras especializadas para tarefas específicas</li>
              <li>Salve nossa página nos favoritos para acesso rápido</li>
              <li>Compartilhe com amigos e colegas que possam precisar</li>
            </ul>

            <div className="bg-blue-50 p-4 rounded-lg mt-8">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Por que Escolher Nossa Calculadora?</h3>
              <ul className="list-disc pl-6 text-blue-700">
                <li>Totalmente gratuita e sem anúncios intrusivos</li>
                <li>Funciona em qualquer dispositivo com acesso à internet</li>
                <li>Interface limpa e profissional</li>
                <li>Atualizações regulares com novos recursos</li>
                <li>Suporte a diferentes tipos de cálculos</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
