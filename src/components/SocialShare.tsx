'use client';

import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin, FaTelegram, FaEnvelope, FaLink, FaShare } from 'react-icons/fa';
import { useSocialAnalytics } from './hooks/useSocialAnalytics';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  className?: string;
  showLabels?: boolean;
  variant?: 'horizontal' | 'vertical' | 'floating';
  calculatorName?: string;
  result?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Calculadora Digital Online - Ferramentas Gratuitas',
  description = 'Acesse mais de 15 calculadoras gratuitas: financeiras, científicas, IMC, porcentagem e muito mais!',
  hashtags = ['calculadora', 'ferramentas', 'gratuito'],
  className = '',
  showLabels = false,
  variant = 'horizontal',
  calculatorName,
  result
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const { trackShare } = useSocialAnalytics();

  // Check for native share support on client side only to avoid hydration mismatch
  useEffect(() => {
    setHasNativeShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtags.join(',')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };

  const handleShare = (platform: string) => {
    // Track the share event
    trackShare({
      platform,
      url,
      title,
      calculatorName,
      result
    });

    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
      return;
    }

    if (platform === 'native' && 'share' in navigator) {
      navigator.share({
        title,
        text: description,
        url
      });
      return;
    }

    const shareUrl = shareLinks[platform as keyof typeof shareLinks];
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const socialButtons = [
    { key: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp', color: 'bg-green-500 hover:bg-green-600' },
    { key: 'facebook', icon: FaFacebook, label: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700' },
    { key: 'twitter', icon: FaTwitter, label: 'Twitter', color: 'bg-blue-400 hover:bg-blue-500' },
    { key: 'linkedin', icon: FaLinkedin, label: 'LinkedIn', color: 'bg-blue-700 hover:bg-blue-800' },
    { key: 'telegram', icon: FaTelegram, label: 'Telegram', color: 'bg-blue-500 hover:bg-blue-600' },
    { key: 'email', icon: FaEnvelope, label: 'Email', color: 'bg-gray-600 hover:bg-gray-700' },
  ];

  if (variant === 'floating') {
    return (
      <div className={`fixed right-4 bottom-4 z-50 ${className}`}>
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
            aria-label="Compartilhar"
          >
            <FaShare className="w-5 h-5" />
          </button>
          
          {showShareMenu && (
            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl p-2 min-w-[200px]">
              <div className="text-sm font-medium text-gray-700 mb-2 px-2">Compartilhar</div>
              {socialButtons.map(({ key, icon: Icon, label, color }) => (
                <button
                  key={key}
                  onClick={() => handleShare(key)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-white rounded text-sm transition-colors ${color} mb-1`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
              <button
                onClick={() => handleShare('copy')}
                className="w-full flex items-center gap-2 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm transition-colors"
              >
                <FaLink className="w-4 h-4" />
                {copied ? 'Copiado!' : 'Copiar Link'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const containerClass = variant === 'vertical' 
    ? 'flex flex-col gap-2' 
    : 'flex flex-wrap gap-2 justify-center';

  return (
    <div className={`${containerClass} ${className}`}>
      {showLabels && (
        <div className="text-sm font-medium text-gray-700 mb-2">
          Compartilhar:
        </div>
      )}
      
      {socialButtons.map(({ key, icon: Icon, label, color }) => (
        <button
          key={key}
          onClick={() => handleShare(key)}
          className={`flex items-center gap-2 px-3 py-2 text-white rounded transition-colors ${color} ${
            showLabels ? 'min-w-[120px]' : 'p-2'
          }`}
          title={`Compartilhar no ${label}`}
        >
          <Icon className="w-4 h-4" />
          {showLabels && <span className="text-sm">{label}</span>}
        </button>
      ))}
      
      <button
        onClick={() => handleShare('copy')}
        className="flex items-center gap-2 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
        title="Copiar link"
      >
        <FaLink className="w-4 h-4" />
        {showLabels && <span className="text-sm">{copied ? 'Copiado!' : 'Copiar'}</span>}
      </button>
      
      {/* Native share button for mobile - only render on client after hydration */}
      {hasNativeShare && (
        <button
          onClick={() => handleShare('native')}
          className="flex items-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors"
          title="Compartilhar"
        >
          <FaShare className="w-4 h-4" />
          {showLabels && <span className="text-sm">Compartilhar</span>}
        </button>
      )}
    </div>
  );
};

export default SocialShare;