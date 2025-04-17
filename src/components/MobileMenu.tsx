'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
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

  // Base classes that will be consistent between server and client
  const menuClasses = "absolute right-0 w-64 mt-2 py-2 bg-white shadow-lg rounded-lg z-50";
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
            <div className="space-y-1">
              <h3 className="px-3 py-2 text-sm font-semibold text-gray-500">Calculadoras</h3>
              <div 
                onClick={() => handleNavigation('/calculadora-cientifica')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Calculadora Científica
              </div>
              <div 
                onClick={() => handleNavigation('/calculadora-porcentagem')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Calculadora de Porcentagem
              </div>
              <div 
                onClick={() => handleNavigation('/gerador-senha')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Gerador de Senha
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="px-3 py-2 text-sm font-semibold text-gray-500">Finanças</h3>
              <div 
                onClick={() => handleNavigation('/calculo-financiamento-imobiliario')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Cálculo de Financiamento Imobiliário
              </div>
              <div 
                onClick={() => handleNavigation('/juros-compostos')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Juros Compostos
              </div>
              <div 
                onClick={() => handleNavigation('/calculo-payback')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Cálculo de Payback
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="px-3 py-2 text-sm font-semibold text-gray-500">Outras</h3>
              <div 
                onClick={() => handleNavigation('https://calendario-feriados.com.br/')}
                className="cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Calendário de Feriados
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