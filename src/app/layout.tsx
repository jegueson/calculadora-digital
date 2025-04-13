import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR-CLIENT-ID"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/" className="text-xl font-bold text-gray-800">
                    Calculadora Digital
                  </a>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <a href="/" className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-800">
                    Calculadora Simples
                  </a>
                  <a href="/peso-ideal" className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-800">
                    Calculadora de Peso Ideal
                  </a>
                  <a href="/ovulacao" className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-800">
                    Calculadora de Ovulação
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <p>© {new Date().getFullYear()} Calculadora Digital Online - Todos os direitos reservados</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
