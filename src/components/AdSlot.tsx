'use client';

import { useEffect } from 'react';
import { ADSENSE_CLIENT_ID, ADSENSE_SLOT_IDS, type AdPlacement } from '@/lib/analytics-ids';

interface AdsByGoogleWindow extends Window {
  adsbygoogle?: unknown[];
}

/**
 * Renders an AdSense unit only when both the publisher id and the unit id exist.
 * Callers must place this below the calculator inputs so a late ad cannot shift them.
 */
export default function AdSlot({ placement }: { placement: AdPlacement }) {
  const slotId = ADSENSE_SLOT_IDS[placement];

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !slotId) {
      return;
    }
    const adsWindow = window as AdsByGoogleWindow;
    try {
      adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
      adsWindow.adsbygoogle.push({});
    } catch (error) {
      console.error(`AdSense failed for placement ${placement}`, error);
    }
  }, [placement, slotId]);

  if (!ADSENSE_CLIENT_ID || !slotId) {
    return null;
  }

  return (
    <div className="my-6 min-h-[90px]" data-ad-placement={placement}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
