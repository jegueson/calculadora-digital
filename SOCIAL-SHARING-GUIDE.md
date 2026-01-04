# Social Sharing Implementation Guide

## Overview
This guide explains the social sharing functionality implemented in your Calculadora Digital project.

## Components Created

### 1. SocialShare Component (`src/components/SocialShare.tsx`)
A flexible social sharing component with multiple variants:

**Features:**
- Support for WhatsApp, Facebook, Twitter, LinkedIn, Telegram, Email
- Copy link functionality
- Native mobile sharing API support
- Analytics tracking integration
- Three display variants: horizontal, vertical, floating

**Usage:**
```tsx
import SocialShare from '@/components/SocialShare';

// Basic usage
<SocialShare />

// With custom content
<SocialShare 
  title="Custom title"
  description="Custom description"
  hashtags={['tag1', 'tag2']}
  showLabels={true}
  variant="horizontal"
/>

// Floating button
<SocialShare variant="floating" />
```

### 2. ShareCalculationResult Component (`src/components/ShareCalculationResult.tsx`)
Specialized component for sharing calculator results:

**Features:**
- Automatically generates share text based on calculator type
- Customized messages for different calculators
- Integrated with SocialShare component

**Usage:**
```tsx
import ShareCalculationResult from '@/components/ShareCalculationResult';

<ShareCalculationResult
  calculatorName="Calculadora de IMC"
  result="23.5 (Peso Normal)"
  inputs={{ weight: '70', height: '175' }}
/>
```

### 3. Social Analytics Hook (`src/components/hooks/useSocialAnalytics.ts`)
Tracks social sharing events for analytics:

**Features:**
- Google Analytics 4 integration
- Google Tag Manager support
- Development logging

## Implementation Locations

### 1. Global Floating Button
- **Location:** `src/app/layout.tsx`
- **Description:** Floating share button available on all pages
- **Visibility:** Bottom-right corner, always accessible

### 2. Homepage Integration
- **Location:** `src/app/page.tsx`
- **Description:** Social sharing section in the popular calculators area
- **Purpose:** Encourage users to share the main site

### 3. Footer Integration
- **Location:** `src/app/layout.tsx` (footer section)
- **Description:** Social sharing buttons in the footer
- **Purpose:** Additional sharing opportunity on every page

### 4. Calculator Results
- **Location:** Individual calculator components (e.g., `BMICalculator.tsx`)
- **Description:** Share specific calculation results
- **Purpose:** Allow users to share their results with friends

## Customization Options

### Supported Platforms
- **WhatsApp** - Very popular in Brazil
- **Facebook** - General social sharing
- **Twitter/X** - Quick sharing with hashtags
- **LinkedIn** - Professional sharing
- **Telegram** - Alternative messaging
- **Email** - Traditional sharing method
- **Copy Link** - Universal sharing option
- **Native Share** - Mobile device native sharing

### Styling Variants
1. **Horizontal** - Buttons in a row (default)
2. **Vertical** - Buttons stacked vertically
3. **Floating** - Single floating button with dropdown menu

### Customizable Properties
- `title` - Share title text
- `description` - Share description
- `hashtags` - Array of hashtags
- `showLabels` - Show/hide button labels
- `className` - Custom CSS classes
- `calculatorName` - For analytics tracking
- `result` - Calculator result for sharing

## Analytics Tracking

The implementation includes comprehensive analytics tracking:

### Google Analytics 4 Events
```javascript
gtag('event', 'share', {
  method: 'whatsapp',
  content_type: 'calculator',
  item_id: 'calculadora-imc',
  custom_parameters: {
    share_url: 'https://...',
    share_title: '...',
    calculator_result: '23.5 (Peso Normal)'
  }
});
```

### Google Tag Manager Events
```javascript
dataLayer.push({
  event: 'social_share',
  share_platform: 'whatsapp',
  share_url: 'https://...',
  share_title: '...',
  calculator_name: 'Calculadora de IMC',
  calculator_result: '23.5 (Peso Normal)'
});
```

## Adding to New Calculators

To add social sharing to a new calculator:

1. **Import the component:**
```tsx
import ShareCalculationResult from '@/components/ShareCalculationResult';
```

2. **Add to results section:**
```tsx
{result && (
  <div>
    {/* Your existing result display */}
    
    <ShareCalculationResult
      calculatorName="Your Calculator Name"
      result={yourResultString}
      inputs={yourInputs}
      className="mt-6"
    />
  </div>
)}
```

## Best Practices

### 1. Share Text Optimization
- Keep titles concise but descriptive
- Include relevant hashtags for Brazilian audience
- Use emojis to make shares more engaging

### 2. Mobile Optimization
- Floating button is touch-friendly
- Native share API works on mobile devices
- WhatsApp integration is crucial for Brazilian market

### 3. Analytics
- Track different share types separately
- Monitor which calculators get shared most
- Use data to optimize sharing placement

### 4. Performance
- Components are client-side only (`'use client'`)
- Lazy loading for better performance
- Minimal external dependencies

## Future Enhancements

### Potential Additions
1. **Pinterest** integration for visual content
2. **Instagram Stories** sharing
3. **QR Code** generation for easy mobile sharing
4. **Custom share images** for different calculators
5. **Share count** display
6. **Social proof** indicators

### Advanced Features
1. **A/B testing** for share button placement
2. **Personalized share messages** based on user behavior
3. **Share rewards** or gamification
4. **Social login** integration
5. **Share history** for users

## Troubleshooting

### Common Issues
1. **Share buttons not working:** Check if URLs are properly encoded
2. **Analytics not tracking:** Verify GTM/GA4 setup
3. **Mobile sharing issues:** Ensure HTTPS and proper meta tags
4. **WhatsApp not opening:** Check URL encoding and length limits

### Testing
- Test on different devices and browsers
- Verify share content appears correctly on each platform
- Check analytics data is being recorded
- Test with different URL structures

## Conclusion

The social sharing implementation provides comprehensive sharing capabilities across all major platforms relevant to your Brazilian audience. The modular design allows for easy customization and extension as your needs evolve.