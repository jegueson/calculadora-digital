'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentYear } from '@/utils/date';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setCurrentYear(getCurrentYear());
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      router.push(href);
    }
  };

  // Base classes that will be consistent between server and client - optimized for mobile
  const menuClasses = "absolute right-0 w-80 mt-2 py-3 bg-white shadow-xl rounded-lg z-50 max-h-[80vh] overflow-y-auto";
  const overlayClasses = "fixed inset-0 bg-black bg-opacity-25 z-40";

  return (
    <div className="md:hidden" suppressHydrationWarning>
      <button
        onClick={toggleMenu}
        className="mobile-menu-button p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        aria-label="Menu principal"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {mounted && (
        <>
          <div className={`${menuClasses} ${isOpen ? 'block' : 'hidden'}`}>
            {/* Popular Calculators - New High-Impact */}
            <div className="space-y-1">
              <h3 className="px-3 py-2 text-sm font-semibold text-blue-600 border-b border-gray-200">🔥 Populares</h3>
              <div 
                onClick={() => handleNavigation('/calculadora-imposto-renda')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50"
              >
                📊 Imposto de Renda {currentYear}
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-imc')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50"
              >
                ⚖️ Calculadora de IMC
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-fgts')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50"
              >
                🏦 FGTS {currentYear}
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-de-horas')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50"
              >
                ⏱️ Calculadora de Horas
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-aposentadoria')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50"
              >
                🏛️ Aposentadoria
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-calorias')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50"
              >
                🍎 Calorias & Dieta
              </div>
            </div>

            {/* Basic Calculators */}
            <div className="space-y-1">
              <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 border-b border-gray-200">🧮 Básicas</h3>
              <div 
                onClick={() => handleNavigation('/')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                🧮 Calculadora Básica
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-cientifica')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                🔬 Científica
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-porcentagem')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                % Porcentagem
              </div>
            </div>

            {/* Trabalho & Brasil */}
            <div className="space-y-1">
              <h3 className="px-3 py-2 text-sm font-semibold text-orange-600 border-b border-gray-200">🇧🇷 Trabalho &amp; Brasil</h3>
              <div 
                onClick={() => handleNavigation('/calculadora-salario-liquido')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50"
              >
                💼 Salário líquido
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-rescisao-trabalhista')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50"
              >
                📄 Rescisão trabalhista
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-13-ferias')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50"
              >
                📆 13º e férias
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-hora-extra')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50"
              >
                ⏱️ Horas extras
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-vale-transporte')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50"
              >
                🚌 Vale-transporte
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-das-mei')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50"
              >
                🧾 DAS MEI
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-bpc-loas')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50"
              >
                🤝 BPC / renda per capita
              </div>
            </div>

            {/* Financial Calculators */}
            <div className="space-y-1">
              <h3 className="px-3 py-2 text-sm font-semibold text-green-600 border-b border-gray-200">💰 Finanças</h3>
              <div 
                onClick={() => handleNavigation('/juros-compostos')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50"
              >
                📈 Juros Compostos
              </div>
              <div 
                onClick={() => handleNavigation('/calculo-financiamento-imobiliario')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50"
              >
                🏠 Financiamento imóvel
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-financiamento-veiculo')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50"
              >
                🚗 Financiamento veículo
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-consorcio')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50"
              >
                🤝 Consórcio
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-cdb-cdi')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50"
              >
                📊 CDB / CDI
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-cartao-credito')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50"
              >
                💳 Cartão de crédito
              </div>
              <div 
                onClick={() => handleNavigation('/calculo-payback')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50"
              >
                💰 Payback
              </div>
            </div>

            {/* Utilities */}
            <div className="space-y-1">
              <h3 className="px-3 py-2 text-sm font-semibold text-purple-600 border-b border-gray-200">🔧 Ferramentas</h3>
              <div 
                onClick={() => handleNavigation('/gerador-senha')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-purple-50"
              >
                🔐 Gerador de Senha
              </div>
              <div 
                onClick={() => handleNavigation('https://calendario-feriados.com.br/')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-purple-50"
              >
                📅 Calendário de Feriados
              </div>
            </div>
          </div>

          {isOpen && (
            <div
              className={overlayClasses}
              onClick={toggleMenu}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </div>
  );
} 