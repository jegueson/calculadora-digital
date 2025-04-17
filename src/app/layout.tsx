import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Script from 'next/script';
import MobileMenu from '@/components/MobileMenu';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calculadora Digital Online - Simples e Fácil de Usar",
  description: "Calculadora digital online gratuita com funções básicas. Ideal para cálculos rápidos e eficientes diretamente no seu navegador.",
  keywords: "calculadora online, calculadora digital, calculadora grátis, calculadora simples",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5LSC26G');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR-CLIENT-ID"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LSC26G"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="text-xl font-bold text-gray-800">
                    Calculadora Digital
                  </Link>
                </div>
                
                <div className="hidden md:flex md:items-center md:ml-6 space-x-4">
                  {/* Calculadoras Dropdown */}
                  <div className="relative group">
                    <button className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-800">
                      Calculadoras
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        <Link href="/calculadora-cientifica" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Calculadora Científica
                        </Link>
                        <Link href="/calculadora-porcentagem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Calculadora de Porcentagem
                        </Link>
                        <Link href="/gerador-senha" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Gerador de Senha
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Finanças Dropdown */}
                  <div className="relative group">
                    <button className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-800">
                      Finanças
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        <Link href="/calculo-financiamento-imobiliario" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Cálculo de Financiamento Imobiliário
                        </Link>
                        <Link href="/juros-compostos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Juros Compostos
                        </Link>
                        <Link href="/calculo-payback" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Cálculo de Payback
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Outras Dropdown */}
                  <div className="relative group">
                    <button className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-800">
                      Outras
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        <Link href="/calendario-feriados" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Calendário de Feriados
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile menu */}
              <MobileMenu />
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <p>© 2010 -{new Date().getFullYear()} Calculadora Digital Online - Todos os direitos reservados</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
