'use client';

import dynamic from 'next/dynamic';

const PasswordGenerator = dynamic(() => import('./PasswordGenerator'), {
  ssr: false,
});

export default function ClientPasswordGenerator() {
  return <PasswordGenerator />;
} 