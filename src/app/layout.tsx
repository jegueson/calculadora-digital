import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Script from 'next/script';
import MobileMenu from '@/components/MobileMenu';
import DesktopNavigation from '@/components/DesktopNavigation';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Calculadora Digital Online | Ferramentas Gratuitas de Cálculo",
  description: "Calculadora digital online gratuita com mais de 15 ferramentas: financeiras, científicas, IMC, porcentagem, juros compostos, financiamento imobiliário e muito mais. Sem instalação, 100% gratuito.",
  keywords: "calculadora online, calculadora digital, calculadora científica, calculadora porcentagem, calculadora financiamento, calculadora juros compostos, calculadora IMC, calculadora imposto renda",
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
    title: "Calculadora Digital Online | Ferramentas Gratuitas de Cálculo",
    description: "Calculadora digital online gratuita com mais de 15 ferramentas: financeiras, científicas, IMC, porcentagem, juros compostos, financiamento imobiliário e muito mais.",
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
    title: "Calculadora Digital Online | Ferramentas Gratuitas de Cálculo",
    description: "Calculadora digital online gratuita com mais de 15 ferramentas: financeiras, científicas, IMC, porcentagem, juros compostos e muito mais.",
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
    google: 'your-google-verification-code', // Replace with actual verification code
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
  "featureList": [
    "Calculadora Científica",
    "Calculadora de Porcentagem",
    "Calculadora de Financiamento Imobiliário",
    "Calculadora de Juros Compostos",
    "Calculadora de Payback",
    "Gerador de Senha",
    "Calculadora de IMC",
    "Calculadora de Imposto de Renda"
  ],
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
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LSC26G"
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
        
        <footer className="bg-gray-800 text-white py-8 mt-12" role="contentinfo">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">🔥 Mais Populares</h3>
                <ul className="space-y-2">
                  <li><Link href="/calculadora-imposto-renda/" className="text-gray-300 hover:text-white">📊 Imposto de Renda 2024</Link></li>
                  <li><Link href="/calculadora-imc/" className="text-gray-300 hover:text-white">⚖️ Calculadora IMC</Link></li>
                  <li><Link href="/calculadora-fgts/" className="text-gray-300 hover:text-white">🏦 FGTS 2024</Link></li>
                  <li><Link href="/calculadora-calorias/" className="text-gray-300 hover:text-white">🍎 Calorias & Dieta</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Calculadoras Financeiras</h3>
                <ul className="space-y-2">
                  <li><Link href="/juros-compostos/" className="text-gray-300 hover:text-white">Juros Compostos</Link></li>
                  <li><Link href="/calculo-financiamento-imobiliario/" className="text-gray-300 hover:text-white">Financiamento Imobiliário</Link></li>
                  <li><Link href="/calculo-payback/" className="text-gray-300 hover:text-white">Payback</Link></li>
                  <li><Link href="/calculadora-aposentadoria/" className="text-gray-300 hover:text-white">Aposentadoria</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">🧮 Ferramentas Básicas</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-300 hover:text-white">🧮 Calculadora Básica</Link></li>
                  <li><Link href="/calculadora-cientifica/" className="text-gray-300 hover:text-white">🔬 Científica</Link></li>
                  <li><Link href="/calculadora-porcentagem/" className="text-gray-300 hover:text-white">% Porcentagem</Link></li>
                  <li><Link href="/gerador-senha/" className="text-gray-300 hover:text-white">🔐 Gerador de Senha</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Sobre</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Calculadora Digital Online oferece ferramentas gratuitas e confiáveis para todos os seus cálculos.
                </p>
                <p className="text-gray-300 text-sm">
                  Desenvolvida com tecnologia moderna para garantir precisão e facilidade de uso.
                </p>
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
