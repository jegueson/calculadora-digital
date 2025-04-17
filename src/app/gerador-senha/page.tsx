import React from 'react';
import ClientPasswordGenerator from '@/components/ClientPasswordGenerator';

export default function PasswordGeneratorPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Gerador de Senhas Online
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600 mb-6 text-center">
            Gere senhas fortes e seguras com nossa ferramenta online gratuita.
            Personalize o comprimento da senha e escolha quais tipos de caracteres incluir.
          </p>
          <ClientPasswordGenerator />
        </div>
        <div className="mt-8 text-center text-gray-600">
          <article className="prose prose-lg mx-auto">
            <h2>Recursos do Gerador de Senhas</h2>
            <ul className="list-disc text-left pl-8">
              <li>Senhas de 4 a 64 caracteres</li>
              <li>Opções para incluir letras maiúsculas e minúsculas</li>
              <li>Inclusão de números e símbolos especiais</li>
              <li>Cópia rápida para a área de transferência</li>
              <li>Interface intuitiva e fácil de usar</li>
              <li>Geração instantânea de novas senhas</li>
              <li>Totalmente gratuito e seguro</li>
            </ul>
            <h3>Dicas para Senhas Seguras</h3>
            <ul className="list-disc text-left pl-8">
              <li>Use senhas com pelo menos 12 caracteres</li>
              <li>Combine diferentes tipos de caracteres</li>
              <li>Evite informações pessoais óbvias</li>
              <li>Use senhas únicas para cada conta</li>
              <li>Troque suas senhas regularmente</li>
            </ul>
            <p>
              Nossa ferramenta de geração de senhas é ideal para criar senhas fortes
              para suas contas online, garantindo maior segurança para seus dados pessoais.
              Todas as senhas são geradas localmente em seu navegador, garantindo que
              nenhuma informação seja transmitida pela internet.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
} 