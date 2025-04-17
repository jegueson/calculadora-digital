'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { FiCopy, FiRefreshCw, FiCheck } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { FaClone } from 'react-icons/fa';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
}

interface PasswordHistoryItem {
  password: string;
  timestamp: number;
  strength: number;
}

const SIMILAR_CHARS = 'iIl1oO0';
const AMBIGUOUS_CHARS = '{}[]()/\\\'"`~,;:.<>';

export default function PasswordGenerator() {
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  });
  const [passwordHistory, setPasswordHistory] = useState<PasswordHistoryItem[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculatePasswordStrength = (pwd: string): number => {
    let strength = 0;
    
    // Length contribution (up to 30 points)
    strength += Math.min(30, pwd.length * 2);

    // Character variety contribution (up to 40 points)
    if (/[A-Z]/.test(pwd)) strength += 10;
    if (/[a-z]/.test(pwd)) strength += 10;
    if (/[0-9]/.test(pwd)) strength += 10;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 10;

    // Pattern penalties
    const repeatingChars = pwd.match(/(.)\1{2,}/g);
    if (repeatingChars) strength -= repeatingChars.length * 5;

    const sequences = pwd.match(/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/gi);
    if (sequences) strength -= sequences.length * 5;

    return Math.max(0, Math.min(100, strength));
  };

  const getStrengthLabel = (strength: number): string => {
    if (strength >= 80) return 'Muito Forte';
    if (strength >= 60) return 'Forte';
    if (strength >= 40) return 'Médio';
    if (strength >= 20) return 'Fraco';
    return 'Muito Fraco';
  };

  const getStrengthColor = (strength: number): string => {
    if (strength >= 80) return 'bg-green-500';
    if (strength >= 60) return 'bg-blue-500';
    if (strength >= 40) return 'bg-yellow-500';
    if (strength >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const generatePassword = useCallback(() => {
    let charset = '';
    let password = '';
    
    if (options.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.includeNumbers) charset += '0123456789';
    if (options.includeSymbols) charset += '!@#$%^&*_-+=';

    if (options.excludeSimilar) {
      charset = charset.split('').filter(char => !SIMILAR_CHARS.includes(char)).join('');
    }
    if (options.excludeAmbiguous) {
      charset = charset.split('').filter(char => !AMBIGUOUS_CHARS.includes(char)).join('');
    }

    if (charset === '') {
      toast.error('Selecione pelo menos uma opção de caracteres');
      return;
    }

    // Ensure at least one character from each selected type
    const types: { [key: string]: string } = {
      includeLowercase: 'abcdefghijklmnopqrstuvwxyz',
      includeUppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      includeNumbers: '0123456789',
      includeSymbols: '!@#$%^&*_-+='
    };

    let requiredChars = '';
    Object.entries(types).forEach(([key, chars]) => {
      if (options[key as keyof PasswordOptions]) {
        const filteredChars = chars.split('').filter(char => {
          if (options.excludeSimilar && SIMILAR_CHARS.includes(char)) return false;
          if (options.excludeAmbiguous && AMBIGUOUS_CHARS.includes(char)) return false;
          return true;
        }).join('');
        if (filteredChars) {
          requiredChars += filteredChars[Math.floor(Math.random() * filteredChars.length)];
        }
      }
    });

    // Fill the rest with random characters
    for (let i = requiredChars.length; i < options.length; i++) {
      requiredChars += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password
    password = requiredChars.split('').sort(() => Math.random() - 0.5).join('');
    
    const strength = calculatePasswordStrength(password);
    setPassword(password);
    setPasswordHistory(prev => [
      { password, timestamp: Date.now(), strength },
      ...prev.slice(0, 4)
    ]);
    setCopied(false);
  }, [options]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast.success('Senha copiada para a área de transferência!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Erro ao copiar senha');
    }
  };

  const handleOptionChange = (option: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [option]: value }));
  };

  const strength = calculatePasswordStrength(password);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="relative mb-4">
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-lg font-mono" role="textbox" aria-label="Senha gerada">
            {password}
          </span>
          <div className="flex gap-2">
            <button
              onClick={generatePassword}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Gerar nova senha"
            >
              <FiRefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Copiar senha"
            >
              {copied ? (
                <FiCheck className="w-5 h-5 text-green-500" />
              ) : (
                <FiCopy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Password Strength Indicator */}
        <div className="mt-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getStrengthColor(strength)} transition-all duration-300`}
              style={{ width: `${strength}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Força da senha: <span className="font-medium">{getStrengthLabel(strength)}</span>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center justify-between">
            <span>Comprimento</span>
            <input
              type="range"
              min="8"
              max="32"
              value={options.length}
              onChange={(e) => handleOptionChange('length', parseInt(e.target.value))}
              className="w-32"
            />
            <span className="w-8 text-right">{options.length}</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={options.includeUppercase}
              onChange={(e) => handleOptionChange('includeUppercase', e.target.checked)}
              className="rounded"
            />
            <span>Letras maiúsculas (A-Z)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={options.includeLowercase}
              onChange={(e) => handleOptionChange('includeLowercase', e.target.checked)}
              className="rounded"
            />
            <span>Letras minúsculas (a-z)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={(e) => handleOptionChange('includeNumbers', e.target.checked)}
              className="rounded"
            />
            <span>Números (0-9)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={(e) => handleOptionChange('includeSymbols', e.target.checked)}
              className="rounded"
            />
            <span>Símbolos (!@#$%^&*)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={options.excludeSimilar}
              onChange={(e) => handleOptionChange('excludeSimilar', e.target.checked)}
              className="rounded"
            />
            <span>Excluir caracteres similares (i, l, 1, L, o, 0, O)</span>
          </label>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="excludeAmbiguous"
              checked={options.excludeAmbiguous}
              onChange={(e) => handleOptionChange('excludeAmbiguous', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="excludeAmbiguous" className="text-gray-700">
              Exclude ambiguous characters (1, l, I, 0, O)
            </label>
          </div>
        </div>

        {/* Password History */}
        {passwordHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Histórico de Senhas</h3>
            <div className="space-y-2">
              {passwordHistory.map((item) => (
                <div key={item.timestamp} className="flex items-center justify-between p-2 bg-gray-100 rounded mb-2">
                  <div className="flex-1">
                    <p className="font-mono">{item.password}</p>
                    <p className="text-sm text-gray-600">
                      Força: {item.strength}% | Comprimento: {options.length}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.password);
                      toast.success('Senha copiada para a área de transferência!');
                    }}
                    className="ml-2 p-2 text-blue-600 hover:text-blue-800"
                  >
                    <FaClone />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 