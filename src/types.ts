export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Challenge {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  testCase: string;
  expectedResult: string;
  difficulty: Difficulty;
}

export interface Feedback {
  status: 'success' | 'partial' | 'error';
  message: string;
  suggestions: string[];
}