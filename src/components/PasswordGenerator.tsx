'use client';

import { useState, useEffect } from 'react';
import { FaCopy, FaRedo } from 'react-icons/fa';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

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
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  const generatePassword = () => {
    let charset = '';
    if (options.includeUppercase) charset += characters.uppercase;
    if (options.includeLowercase) charset += characters.lowercase;
    if (options.includeNumbers) charset += characters.numbers;
    if (options.includeSymbols) charset += characters.symbols;

    if (charset === '') {
      setPassword('Selecione pelo menos uma opção');
      return;
    }

    let newPassword = '';
    const charsetLength = charset.length;

    // Ensure at least one character from each selected type
    const requiredChars = [];
    if (options.includeUppercase) requiredChars.push(characters.uppercase[Math.floor(Math.random() * characters.uppercase.length)]);
    if (options.includeLowercase) requiredChars.push(characters.lowercase[Math.floor(Math.random() * characters.lowercase.length)]);
    if (options.includeNumbers) requiredChars.push(characters.numbers[Math.floor(Math.random() * characters.numbers.length)]);
    if (options.includeSymbols) requiredChars.push(characters.symbols[Math.floor(Math.random() * characters.symbols.length)]);

    // Add required characters
    newPassword = requiredChars.join('');

    // Fill the rest randomly
    for (let i = newPassword.length; i < options.length; i++) {
      newPassword += charset[Math.floor(Math.random() * charsetLength)];
    }

    // Shuffle the password
    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('');
    
    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (password && password !== 'Selecione pelo menos uma opção') {
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy password:', err);
      }
    }
  };

  const handleOptionChange = (option: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Password Display */}
        <div className="relative mb-6">
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <div className="flex-grow mr-4 font-mono text-lg break-all">
              {password || 'Clique em Gerar Senha'}
            </div>
            <div className="flex gap-2">
              <button
                onClick={generatePassword}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                title="Gerar Nova Senha"
              >
                <FaRedo />
              </button>
              <button
                onClick={copyToClipboard}
                className={`p-2 ${copied ? 'bg-green-500' : 'bg-blue-500'} text-white rounded hover:bg-blue-600 transition-colors`}
                title="Copiar Senha"
              >
                <FaCopy />
              </button>
            </div>
          </div>
          {copied && (
            <div className="absolute -top-8 right-0 text-green-500 text-sm">
              Senha copiada!
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Comprimento da Senha: {options.length}
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={options.length}
              onChange={(e) => handleOptionChange('length', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.includeUppercase}
                onChange={(e) => handleOptionChange('includeUppercase', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>Letras Maiúsculas (A-Z)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.includeLowercase}
                onChange={(e) => handleOptionChange('includeLowercase', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>Letras Minúsculas (a-z)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.includeNumbers}
                onChange={(e) => handleOptionChange('includeNumbers', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>Números (0-9)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.includeSymbols}
                onChange={(e) => handleOptionChange('includeSymbols', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>Símbolos (!@#$%^&*)</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-6"
          >
            Gerar Senha
          </button>
        </div>
      </div>
    </div>
  );
} 