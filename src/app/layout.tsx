import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Script from 'next/script';
import MobileMenu from '@/components/MobileMenu';
import DesktopNavigation from '@/components/DesktopNavigation';
import DeferredAnalytics from '@/components/DeferredAnalytics';
import SocialShare from '@/components/SocialShare';
import { calculatorPath, formatLabel, getFooterGroup, getPublishedCalculators } from '@/data/calculators';
import { GTM_ID } from '@/lib/analytics-ids';
import { getCurrentYear } from '@/utils/date';

const currentYear = getCurrentYear();

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Calculadora Online Grátis | Simples, Rápida e Fácil",
  description: "Use a calculadora online grátis para fazer contas rápidas no celular ou computador. Simples, prática, sem cadastro e com várias ferramentas de cálculo.",
  keywords: "calculadora online, calculadora online grátis, calculadora simples, calculadora digital, calculadora científica, calculadora porcentagem, calculadora financiamento, calculadora juros compostos, calculadora IMC, calculadora imposto renda",
  authors: [{ name: "Calculadora Digital" }],
  creator: "Calculadora Digital",
  publisher: "Calculadora Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://calculadora-digital.com.br'),
  alternates: {
    canonical: 'https://calculadora-digital.com.br',
  },
  openGraph: {
    title: "Calculadora Online Grátis | Simples, Rápida e Fácil",
    description: "Use a calculadora online grátis para fazer contas rápidas no celular ou computador. Simples, prática, sem cadastro e com várias ferramentas de cálculo.",
    url: 'https://calculadora-digital.com.br',
    siteName: 'Calculadora Digital Online',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadora Digital Online - Ferramentas Gratuitas de Cálculo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calculadora Online Grátis | Simples, Rápida e Fácil",
    description: "Use a calculadora online grátis para fazer contas rápidas no celular ou computador. Simples, prática, sem cadastro e com várias ferramentas de cálculo.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculadora Digital Online",
  "description": "Calculadora digital online gratuita com ferramentas financeiras, científicas e educacionais",
  "url": "https://calculadora-digital.com.br",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL",
    "category": "Free"
  },
  "provider": {
    "@type": "Organization",
    "name": "Calculadora Digital",
    "url": "https://calculadora-digital.com.br"
  },
  "applicationSubCategory": "Calculator",
  "featureList": getPublishedCalculators().map((entry) => entry.title),
  "browserRequirements": "Requires JavaScript. Requires HTML5."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        <DeferredAnalytics />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${inter.className} font-sans`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        
        <nav className="bg-white shadow-md sticky top-0 z-50" role="navigation" aria-label="Main navigation">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                    Calculadora Digital
                  </Link>
                </div>
                
                <DesktopNavigation />
              </div>

              {/* Mobile menu */}
              <MobileMenu />
            </div>
          </div>
        </nav>
        
        <main>
          {children}
        </main>
        
        {/* Floating Social Share Button */}
        <SocialShare variant="floating" />
        
        <footer className="bg-gray-800 text-white py-8 mt-12" role="contentinfo">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">🔥 Mais Populares</h3>
                <ul className="space-y-2">
                  {getFooterGroup('populares').map((entry) => (
                    <li key={entry.slug}>
                      <Link href={calculatorPath(entry.slug)} className="text-gray-300 hover:text-white">
                        {formatLabel(entry.footerLabel ?? entry.title, entry.footerWithYear, currentYear)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Calculadoras Financeiras</h3>
                <ul className="space-y-2">
                  {getFooterGroup('financas').map((entry) => (
                    <li key={entry.slug}>
                      <Link href={calculatorPath(entry.slug)} className="text-gray-300 hover:text-white">
                        {formatLabel(entry.footerLabel ?? entry.title, entry.footerWithYear, currentYear)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Trabalho &amp; Brasil</h3>
                <ul className="space-y-2">
                  {getFooterGroup('trabalho').map((entry) => (
                    <li key={entry.slug}>
                      <Link href={calculatorPath(entry.slug)} className="text-gray-300 hover:text-white">
                        {formatLabel(entry.footerLabel ?? entry.title, entry.footerWithYear, currentYear)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">🧮 Ferramentas Básicas</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-300 hover:text-white">🧮 Calculadora Básica</Link></li>
                  {getFooterGroup('basicas').map((entry) => (
                    <li key={entry.slug}>
                      <Link href={calculatorPath(entry.slug)} className="text-gray-300 hover:text-white">
                        {formatLabel(entry.footerLabel ?? entry.title, entry.footerWithYear, currentYear)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Sobre</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Calculadora Digital Online oferece ferramentas gratuitas e confiáveis para todos os seus cálculos.
                </p>
                <p className="text-gray-300 text-sm mb-4">
                  Desenvolvida com tecnologia moderna para garantir precisão e facilidade de uso.
                </p>
                
                {/* Social Share in Footer */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2 text-gray-300">Compartilhe:</h4>
                  <SocialShare 
                    variant="horizontal"
                    className="justify-start"
                    hashtags={['calculadora', 'ferramentas', 'brasil']}
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                © 2010-{new Date().getFullYear()} Calculadora Digital Online - Todos os direitos reservados
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
