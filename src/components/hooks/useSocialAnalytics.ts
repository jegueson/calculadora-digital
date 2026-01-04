'use client';

import { useCallback } from 'react';

interface ShareEvent {
  platform: string;
  url: string;
  title: string;
  calculatorName?: string;
  result?: string;
}

export const useSocialAnalytics = () => {
  const trackShare = useCallback((event: ShareEvent) => {
    // Google Analytics 4 tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: event.platform,
        content_type: 'calculator',
        item_id: event.calculatorName || 'homepage',
        custom_parameters: {
          share_url: event.url,
          share_title: event.title,
          calculator_result: event.result || null
        }
      });
    }

    // Google Tag Manager tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'social_share',
        share_platform: event.platform,
        share_url: event.url,
        share_title: event.title,
        calculator_name: event.calculatorName,
        calculator_result: event.result
      });
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Social Share Tracked:', event);
    }
  }, []);

  return { trackShare };
};