'use client';

import { useState } from 'react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [hasResult, setHasResult] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [isRad, setIsRad] = useState(true);
  const [lastAnswer, setLastAnswer] = useState<number>(0);
  const [lastOperator, setLastOperator] = useState<string>('');

  const handleNumber = (number: string) => {
    if (hasResult) {
      setDisplay(number);
      setEquation(number);
      setHasResult(false);
      setLastOperator('');
    } else {
      if (display === '0' && number !== '.') {
        setDisplay(number);
        setEquation(equation === '0' ? number : equation + number);
      } else if (number === '.' && !display.includes('.')) {
        setDisplay(display + number);
        setEquation(equation + number);
      } else if (number !== '.') {
        setDisplay(display + number);
        setEquation(equation + number);
      }
    }
  };

  const handleOperator = (operator: string) => {
    if (hasResult) {
      setEquation(display + ' ' + operator + ' ');
      setLastOperator(operator);
      setHasResult(false);
    } else {
      const trimmedEquation = equation.trim();
      if (trimmedEquation === '') {
        setEquation('0 ' + operator + ' ');
      } else {
        // Check if the last character is an operator
        const lastChar = trimmedEquation.slice(-1);
        if (['+', '-', '*', '/', '%'].includes(lastChar)) {
          // Replace the last operator
          setEquation(trimmedEquation.slice(0, -1) + operator + ' ');
        } else {
          setEquation(trimmedEquation + ' ' + operator + ' ');
        }
      }
      setLastOperator(operator);
    }
    setDisplay('0');
  };

  const calculateResult = (expr: string): number => {
    // Remove any trailing operators
    const cleanExpr = expr.trim().replace(/[+\-*/%]\s*$/, '');
    
    // Split the expression into tokens
    const tokens = cleanExpr.split(' ').filter(token => token !== '');
    
    if (tokens.length === 0) return 0;
    if (tokens.length === 1) return parseFloat(tokens[0]);

    // Process multiplication and division first
    let i = 1;
    while (i < tokens.length - 1) {
      if (tokens[i] === '*' || tokens[i] === '/' || tokens[i] === '%') {
        const left = parseFloat(tokens[i - 1]);
        const right = parseFloat(tokens[i + 1]);
        let result;

        if (tokens[i] === '*') result = left * right;
        else if (tokens[i] === '/') result = left / right;
        else result = left % right;

        tokens.splice(i - 1, 3, result.toString());
        i--;
      }
      i++;
    }

    // Process addition and subtraction
    let result = parseFloat(tokens[0]);
    for (i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = parseFloat(tokens[i + 1]);

      if (operator === '+') result += operand;
      else if (operator === '-') result -= operand;
    }

    return result;
  };

  const handleFunction = (func: string) => {
    try {
      const currentNumber = parseFloat(display);
      let result: number;

      switch (func) {
        case 'sin':
          result = isRad ? Math.sin(currentNumber) : Math.sin(currentNumber * Math.PI / 180);
          break;
        case 'cos':
          result = isRad ? Math.cos(currentNumber) : Math.cos(currentNumber * Math.PI / 180);
          break;
        case 'tan':
          result = isRad ? Math.tan(currentNumber) : Math.tan(currentNumber * Math.PI / 180);
          break;
        case 'log':
          if (currentNumber <= 0) throw new Error('Invalid input for logarithm');
          result = Math.log10(currentNumber);
          break;
        case 'ln':
          if (currentNumber <= 0) throw new Error('Invalid input for natural logarithm');
          result = Math.log(currentNumber);
          break;
        case 'sqrt':
          if (currentNumber < 0) throw new Error('Cannot calculate square root of negative number');
          result = Math.sqrt(currentNumber);
          break;
        case 'x²':
          result = Math.pow(currentNumber, 2);
          break;
        case 'x³':
          result = Math.pow(currentNumber, 3);
          break;
        case '1/x':
          if (currentNumber === 0) throw new Error('Cannot divide by zero');
          result = 1 / currentNumber;
          break;
        case '±':
          result = -currentNumber;
          break;
        case 'π':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        default:
          return;
      }

      const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
      setDisplay(formattedResult);
      setEquation(formattedResult);
      setHasResult(true);
    } catch (error) {
      setDisplay(error instanceof Error ? error.message : 'Error');
      setEquation('');
      setHasResult(true);
    }
  };

  const handleEqual = () => {
    try {
      const result = calculateResult(equation);
      const formattedResult = Number.isInteger(result) ? 
        result.toString() : 
        result.toFixed(8).replace(/\.?0+$/, '');
      
      setDisplay(formattedResult);
      setEquation(formattedResult);
      setHasResult(true);
      setLastAnswer(result);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setHasResult(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setHasResult(false);
    setLastAnswer(0);
    setLastOperator('');
  };

  const handleMemory = (operation: string) => {
    const currentNumber = parseFloat(display);
    switch (operation) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(memory.toString());
        setEquation(memory.toString());
        break;
      case 'M+':
        setMemory(memory + currentNumber);
        break;
      case 'M-':
        setMemory(memory - currentNumber);
        break;
      case 'MS':
        setMemory(currentNumber);
        break;
    }
  };

  const handleSpecialFunction = (func: string) => {
    switch (func) {
      case 'ANS':
        const formattedAns = Number.isInteger(lastAnswer) ? 
          lastAnswer.toString() : 
          lastAnswer.toFixed(8).replace(/\.?0+$/, '');
        setDisplay(formattedAns);
        setEquation(formattedAns);
        break;
      case 'EXP':
        if (display !== '0' && !display.includes('e')) {
          setDisplay(display + 'e');
          setEquation(equation + 'e');
        }
        break;
    }
  };

  const buttons = [
    ['MC', 'MR', 'M+', 'M-', 'MS'],
    ['sin', 'cos', 'tan', 'log', 'ln'],
    ['(', ')', 'π', 'e', '%'],
    ['x²', 'x³', '√', '1/x', '±'],
    ['7', '8', '9', '÷', 'DEG'],
    ['4', '5', '6', '×', 'RAD'],
    ['1', '2', '3', '-', 'EXP'],
    ['0', '.', '=', '+', 'ANS']
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-800 p-4 rounded-t-lg">
        <div className="text-right">
          <div className="text-gray-400 text-sm h-6 overflow-hidden">
            {equation || '\u00A0'}
          </div>
          <div className="text-white text-4xl font-light overflow-hidden">
            {display}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            {isRad ? 'RAD' : 'DEG'} {memory !== 0 && 'M'}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-1 bg-gray-700 p-1 rounded-b-lg">
        <button
          className="col-span-5 p-4 text-white bg-red-500 hover:bg-red-600 rounded"
          onClick={handleClear}
        >
          C
        </button>
        
        {buttons.map((row, rowIndex) => (
          row.map((btn, index) => (
            <button
              key={`${rowIndex}-${btn}`}
              className={`p-4 text-sm font-light rounded transition-colors ${
                ['÷', '×', '-', '+', '%'].includes(btn)
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : btn === '='
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : ['sin', 'cos', 'tan', 'log', 'ln', 'π', 'e', 'x²', 'x³', '√', '1/x', '±'].includes(btn)
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : ['MC', 'MR', 'M+', 'M-', 'MS'].includes(btn)
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : ['DEG', 'RAD', 'EXP', 'ANS'].includes(btn)
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-500 text-white'
              }`}
              onClick={() => {
                if (btn === '=') {
                  handleEqual();
                } else if (['÷', '×', '-', '+', '%'].includes(btn)) {
                  const opMap: { [key: string]: string } = {
                    '÷': '/',
                    '×': '*'
                  };
                  handleOperator(opMap[btn] || btn);
                } else if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', 'x³', '1/x', '±', 'π', 'e'].includes(btn)) {
                  handleFunction(btn);
                } else if (['MC', 'MR', 'M+', 'M-', 'MS'].includes(btn)) {
                  handleMemory(btn);
                } else if (btn === 'RAD') {
                  setIsRad(true);
                } else if (btn === 'DEG') {
                  setIsRad(false);
                } else if (['EXP', 'ANS'].includes(btn)) {
                  handleSpecialFunction(btn);
                } else if (btn === '.') {
                  handleNumber('.');
                } else if (!['(', ')'].includes(btn)) {
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