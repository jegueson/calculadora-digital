'use client';

import React from 'react';
import SocialShare from './SocialShare';

interface ShareCalculationResultProps {
  calculatorName: string;
  result: string;
  inputs?: Record<string, any>;
  className?: string;
}

const ShareCalculationResult: React.FC<ShareCalculationResultProps> = ({
  calculatorName,
  result,
  inputs,
  className = ''
}) => {
  const generateShareText = () => {
    let shareText = `Acabei de usar a ${calculatorName} da Calculadora Digital! `;
    
    // Add specific result information based on calculator type
    switch (calculatorName.toLowerCase()) {
      case 'calculadora de imc':
        shareText += `Meu IMC é ${result}. `;
        break;
      case 'calculadora de juros compostos':
        shareText += `Resultado: ${result}. `;
        break;
      case 'calculadora de financiamento':
        shareText += `Prestação calculada: ${result}. `;
        break;
      case 'calculadora de porcentagem':
        shareText += `Resultado: ${result}. `;
        break;
      default:
        shareText += `Resultado: ${result}. `;
    }
    
    shareText += 'Experimente você também!';
    return shareText;
  };

  const generateDescription = () => {
    const baseDescription = `Resultado da ${calculatorName}: ${result}. `;
    return baseDescription + 'Acesse gratuitamente mais de 15 calculadoras online!';
  };

  return (
    <div className={`bg-gray-50 p-4 rounded-lg border ${className}`}>
      <div className="text-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Compartilhe seu resultado!
        </h3>
        <p className="text-sm text-gray-600">
          Ajude seus amigos com esta ferramenta gratuita
        </p>
      </div>
      
      <SocialShare
        title={generateShareText()}
        description={generateDescription()}
        hashtags={['calculadora', 'ferramenta', 'gratuito', 'brasil']}
        showLabels={true}
        variant="horizontal"
        className="justify-center"
      />
    </div>
  );
};

export default ShareCalculationResult;