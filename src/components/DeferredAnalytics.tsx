import Script from 'next/script';
import { ADSENSE_CLIENT_ID, GA4_MEASUREMENT_ID, GTM_ID } from '@/lib/analytics-ids';

/**
 * Loads the existing GTM container, and GA4 or AdSense only when their ids are set.
 * lazyOnload waits until the browser is idle so these tags do not block rendering.
 */
export default function DeferredAnalytics() {
  return (
    <>
      <Script id="google-tag-manager" strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      {GA4_MEASUREMENT_ID ? (
        <>
          <Script
            id="ga4-src"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          />
          <Script id="ga4-config" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}
      {ADSENSE_CLIENT_ID ? (
        <Script
          id="adsense"
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      ) : null}
    </>
  );
}
