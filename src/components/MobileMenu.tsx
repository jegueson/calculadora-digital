'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  calculatorPath,
  formatLabel,
  getMobileGroup,
  type MobileGroup,
} from '@/data/calculators';
import { getCurrentYear } from '@/utils/date';

const SECTIONS: { id: MobileGroup; title: string; titleClass: string; itemClass: string }[] = [
  {
    id: 'populares',
    title: '🔥 Populares',
    titleClass: 'text-blue-600',
    itemClass: 'hover:bg-blue-50',
  },
  {
    id: 'basicas',
    title: '🧮 Básicas',
    titleClass: 'text-gray-500',
    itemClass: 'hover:bg-gray-100',
  },
  {
    id: 'trabalho',
    title: '🇧🇷 Trabalho & Brasil',
    titleClass: 'text-orange-600',
    itemClass: 'hover:bg-orange-50',
  },
  {
    id: 'financas',
    title: '💰 Finanças',
    titleClass: 'text-green-600',
    itemClass: 'hover:bg-green-50',
  },
  {
    id: 'ferramentas',
    title: '🔧 Ferramentas',
    titleClass: 'text-purple-600',
    itemClass: 'hover:bg-purple-50',
  },
];

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

  const menuClasses = "absolute right-0 w-80 mt-2 py-3 bg-white shadow-xl rounded-lg z-50 max-h-[80vh] overflow-y-auto";
  const overlayClasses = "fixed inset-0 bg-black bg-opacity-25 z-40";
  const itemClasses = "cursor-pointer w-full text-left px-3 py-2 text-base font-medium text-gray-700";

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
            {SECTIONS.map((section) => (
              <div className="space-y-1" key={section.id}>
                <h3 className={`px-3 py-2 text-sm font-semibold border-b border-gray-200 ${section.titleClass}`}>
                  {section.title}
                </h3>
                {section.id === 'basicas' ? (
                  <div
                    onClick={() => handleNavigation('/')}
                    className={`${itemClasses} hover:bg-gray-100`}
                  >
                    🧮 Calculadora Básica
                  </div>
                ) : null}
                {getMobileGroup(section.id).map((entry) => (
                  <div
                    key={entry.slug}
                    onClick={() => handleNavigation(calculatorPath(entry.slug))}
                    className={`${itemClasses} ${section.itemClass}`}
                  >
                    {formatLabel(entry.mobileLabel ?? entry.title, entry.mobileWithYear, currentYear)}
                  </div>
                ))}
                {section.id === 'ferramentas' ? (
                  <div
                    onClick={() => handleNavigation('https://calendario-feriados.com.br/')}
                    className={`${itemClasses} hover:bg-purple-50`}
                  >
                    📅 Calendário de Feriados
                  </div>
                ) : null}
              </div>
            ))}
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
