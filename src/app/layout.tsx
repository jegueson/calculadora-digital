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
});

export const metadata: Metadata = {
  title: "Calculadora Digital Online",
  description: "Calculadora digital online gratuita com funções básicas e avançadas. Fácil de usar, sem necessidade de instalação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.className} suppressHydrationWarning>
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
                
                <DesktopNavigation />
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
