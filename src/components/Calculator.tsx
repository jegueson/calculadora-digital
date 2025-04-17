'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumberStarted, setNewNumberStarted] = useState(false);

  const handleNumber = (number: string) => {
    if (newNumberStarted) {
      setDisplay(number);
      setNewNumberStarted(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(display);
    
    if (firstNumber === null) {
      setFirstNumber(current);
    } else if (operation) {
      const result = calculate(firstNumber, current, operation);
      setFirstNumber(result);
      setDisplay(result.toString());
    }
    
    setOperation(op);
    setNewNumberStarted(true);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      case '%':
        return (first * second) / 100;
      default:
        return second;
    }
  };

  const handleEqual = () => {
    if (firstNumber === null || operation === null) {
      // If no operation is set but we have a number, check for special operations
      const current = parseFloat(display);
      if (!isNaN(current)) {
        if (operation === 'square') {
          setDisplay((current * current).toString());
        }
      }
      return;
    }

    const secondNumber = parseFloat(display);
    const result = calculate(firstNumber, secondNumber, operation);
    
    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setNewNumberStarted(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumberStarted(false);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleSquare = () => {
    const current = parseFloat(display);
    if (!isNaN(current)) {
      setDisplay((current * current).toString());
      setFirstNumber(null);
      setOperation(null);
      setNewNumberStarted(true);
    }
  };

  const handlePlusMinus = () => {
    const current = parseFloat(display);
    if (!isNaN(current)) {
      setDisplay((current * -1).toString());
    }
  };

  const handlePercentage = () => {
    const current = parseFloat(display);
    if (!isNaN(current)) {
      if (firstNumber === null) {
        setDisplay((current / 100).toString());
      } else {
        // If we have a first number, calculate percentage of that number
        const result = (firstNumber * current) / 100;
        setDisplay(result.toString());
        setFirstNumber(null);
        setOperation(null);
      }
      setNewNumberStarted(true);
    }
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', 'x²', '=']
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 p-4 rounded-t-lg">
        <div className="text-right">
          <div className="text-gray-400 text-sm h-6 overflow-hidden">
            {firstNumber !== null ? `${firstNumber} ${operation || ''}` : '\u00A0'}
          </div>
          <div className="text-white text-4xl font-light overflow-hidden">
            {display}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-1 bg-gray-700 p-1 rounded-b-lg">
        {buttons.map((row, rowIndex) => (
          row.map((btn, btnIndex) => (
            <button
              key={`${rowIndex}-${btnIndex}`}
              className={`p-4 text-xl font-light rounded transition-colors ${
                ['÷', '×', '-', '+'].includes(btn)
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : btn === '='
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : btn === 'C'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : ['±', '%', 'x²'].includes(btn)
                  ? 'bg-gray-500 hover:bg-gray-400 text-white'
                  : 'bg-gray-600 hover:bg-gray-500 text-white'
              }`}
              onClick={() => {
                switch (btn) {
                  case '=':
                    handleEqual();
                    break;
                  case '.':
                    handleDecimal();
                    break;
                  case 'C':
                    handleClear();
                    break;
                  case '±':
                    handlePlusMinus();
                    break;
                  case '%':
                    handlePercentage();
                    break;
                  case 'x²':
                    handleSquare();
                    break;
                  case '÷':
                    handleOperator('/');
                    break;
                  case '×':
                    handleOperator('*');
                    break;
                  case '-':
                  case '+':
                    handleOperator(btn);
                    break;
                  default:
                    handleNumber(btn);
                }
              }}
            >
              {btn}
            </button>
          ))
        ))}
      </div>
    </div>
  );
} 