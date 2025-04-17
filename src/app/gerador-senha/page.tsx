import React from 'react';
import PasswordGenerator from '@/components/PasswordGenerator';

export default function PasswordGeneratorPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Gerador de Senhas Seguras
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-gray-600 mb-6 text-center">
            Crie senhas fortes e seguras com nosso gerador. Personalize o comprimento e os tipos de caracteres para máxima segurança.
          </p>
          <PasswordGenerator />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <article className="prose prose-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Como Usar o Gerador de Senhas</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Opções de Personalização</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Comprimento da Senha:</strong> Escolha entre 8 e 64 caracteres.</li>
              <li><strong>Tipos de Caracteres:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Letras maiúsculas (A-Z)</li>
                  <li>Letras minúsculas (a-z)</li>
                  <li>Números (0-9)</li>
                  <li>Caracteres especiais (!@#$%^&*)</li>
                </ul>
              </li>
              <li><strong>Exclusão de Caracteres:</strong> Evite caracteres ambíguos ou similares.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Características de Segurança</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Aleatoriedade:</strong> Utiliza geração verdadeiramente aleatória de caracteres.</li>
              <li><strong>Complexidade:</strong> Combina diferentes tipos de caracteres para maior segurança.</li>
              <li><strong>Força da Senha:</strong> Indicador visual da força da senha gerada.</li>
              <li><strong>Sem Armazenamento:</strong> As senhas são geradas localmente e não são salvas.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Como Gerar uma Senha Forte</h3>
            <ol className="list-decimal pl-6 mb-6">
              <li>Selecione o comprimento desejado (recomendado: 12+ caracteres).</li>
              <li>Marque as opções de tipos de caracteres desejados.</li>
              <li>Clique em "Gerar Senha".</li>
              <li>Use o botão "Copiar" para copiar a senha para a área de transferência.</li>
              <li>Salve a senha em um gerenciador de senhas seguro.</li>
            </ol>

            <h3 className="text-xl font-semibold mt-6 mb-3">Melhores Práticas de Segurança</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Comprimento Mínimo:</strong> Use senhas com pelo menos 12 caracteres.</li>
              <li><strong>Complexidade:</strong> Combine todos os tipos de caracteres disponíveis.</li>
              <li><strong>Unicidade:</strong> Use senhas diferentes para cada conta.</li>
              <li><strong>Armazenamento:</strong> Utilize um gerenciador de senhas confiável.</li>
              <li><strong>Atualização:</strong> Troque suas senhas periodicamente.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Dicas de Uso</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Gere várias senhas até encontrar uma que seja fácil de memorizar (se necessário).</li>
              <li>Evite usar informações pessoais em suas senhas.</li>
              <li>Não compartilhe suas senhas com outras pessoas.</li>
              <li>Ative a autenticação de dois fatores quando disponível.</li>
              <li>Mantenha um backup seguro de suas senhas.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Onde Usar Senhas Fortes</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Contas Financeiras:</strong> Bancos, cartões de crédito, investimentos.</li>
              <li><strong>E-mails:</strong> Contas principais e secundárias.</li>
              <li><strong>Redes Sociais:</strong> Facebook, Instagram, Twitter, LinkedIn.</li>
              <li><strong>Serviços em Nuvem:</strong> Google Drive, Dropbox, iCloud.</li>
              <li><strong>Compras Online:</strong> Amazon, Mercado Livre, lojas virtuais.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Recursos Adicionais</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Indicador de Força:</strong> Avalia a segurança da senha gerada.</li>
              <li><strong>Cópia Rápida:</strong> Botão para copiar a senha com um clique.</li>
              <li><strong>Histórico Limpo:</strong> As senhas não são armazenadas no navegador.</li>
              <li><strong>Interface Intuitiva:</strong> Fácil de usar e personalizar.</li>
            </ul>
          </article>
        </div>
      </div>
    </main>
  );
} 