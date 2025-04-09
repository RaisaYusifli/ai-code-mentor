
import { Challenge, Feedback } from '../types';

// Define specific analyzers for each challenge
const challengeAnalyzers: Record<number, (userCode: string) => Feedback> = {
  // Analyzer for Challenge #1: Fix the Array Filter
  1: (userCode: string): Feedback => {
    if (userCode.includes('%')) {
      // User found the modulus operator but might not have a perfect solution
      if (userCode.includes('num % 2 === 0')) {
        return {
          status: 'success',
          message: 'Perfect! Your solution is correct.',
          suggestions: []
        };
      } else {
        return {
          status: 'partial',
          message: 'You\'re on the right track! You\'ve identified that modulus (%) is needed.',
          suggestions: ['Check if you\'re using the correct comparison for even numbers.']
        };
      }
    } else {
      return {
        status: 'error',
        message: 'Your solution doesn\'t produce the expected output.',
        suggestions: [
          'Check your operator. Division (/) checks if a number is divisible, but modulus (%) checks for remainder.',
          'For checking even numbers, we need to check if the remainder when divided by 2 is 0.'
        ]
      };
    }
  },

  // Analyzer for Challenge #2: Implement a Debounce Function
  2: (userCode: string): Feedback => {
    const hasTimeout = userCode.includes('timeout');
    const hasClearTimeout = userCode.includes('clearTimeout');
    const hasSetTimeout = userCode.includes('setTimeout');
    
    if (hasTimeout && hasClearTimeout && hasSetTimeout) {
      if (userCode.includes('return function') && userCode.includes('func.apply')) {
        return {
          status: 'success',
          message: 'Perfect! Your solution is correct.',
          suggestions: []
        };
      } else {
        return {
          status: 'partial',
          message: 'You\'re close! You have the key components for debounce.',
          suggestions: [
            'Make sure you return a function that captures the original arguments.',
            'Use func.apply() to preserve the context when calling the function.'
          ]
        };
      }
    } else {
      return {
        status: 'error',
        message: 'Your solution is missing key components of a debounce function.',
        suggestions: [
          'Make sure you\'re clearing the previous timeout to prevent multiple calls.',
          'Use setTimeout to delay the function execution.',
          'Store the timeout ID to be able to clear it later.'
        ]
      };
    }
  },
  
  // Add more challenge-specific analyzers here...
};

/**
 * Analyzes user code against a challenge solution
 * @param userCode The code submitted by the user
 * @param challenge The challenge being attempted
 * @returns Feedback object with analysis results
 */
export const analyzeCode = (userCode: string, challenge: Challenge): Feedback => {
  // If there's a specific analyzer for this challenge, use it
  if (challengeAnalyzers[challenge.id]) {
    return challengeAnalyzers[challenge.id](userCode);
  }
  
  // Default analysis for challenges without specific analyzers
  if (userCode.trim() === challenge.solution.trim()) {
    return {
      status: 'success',
      message: 'Perfect! Your solution is correct.',
      suggestions: []
    };
  }
  
  // Generic partial credit check - can be expanded
  const solutionKeywords = extractKeywords(challenge.solution);
  const userKeywords = extractKeywords(userCode);
  
  const matchedKeywords = solutionKeywords.filter(keyword => 
    userKeywords.includes(keyword)
  );
  
  // If they've implemented at least 70% of the key concepts
  if (matchedKeywords.length >= solutionKeywords.length * 0.7) {
    return {
      status: 'partial',
      message: 'You\'re on the right track! Your solution contains many of the right components.',
      suggestions: [
        'Compare your implementation with the expected output carefully.',
        'Make sure your logic handles all the test cases correctly.'
      ]
    };
  }
  
  // Default to error feedback
  return {
    status: 'error',
    message: 'Your solution doesn\'t produce the expected output.',
    suggestions: [
      'Review the challenge requirements carefully.',
      'Try running the code with the test case to see what\'s happening.',
      'Break down the problem into smaller steps.'
    ]
  };
};

/**
 * Helper function to extract important keywords from code
 */
const extractKeywords = (code: string): string[] => {
  // Remove comments, strings, and unnecessary whitespace
  const cleanCode = code
    .replace(/\/\/.*$/gm, '') // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/['"`].*?['"`]/g, '') // Remove strings
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Create a set of potential keywords (function names, variables, methods)
  const keywordMatches = cleanCode.match(/\b[a-zA-Z]\w*\b/g) || [];
  
  // Add special operators and syntax elements
  const specialElements = ['=>', '...', 'async', 'await', 'function', 'return', 'if', 
                          'else', 'for', 'while', 'map', 'filter', 'reduce'];
  
  // Create an array of unique keywords without using Set spread
  const combinedKeywords = [
    ...keywordMatches,
    ...specialElements.filter(el => code.includes(el))
  ];
  
  // Manual deduplication using array methods
  const uniqueKeywords = combinedKeywords.filter(
    (keyword, index) => combinedKeywords.indexOf(keyword) === index
  );
  
  return uniqueKeywords;
};