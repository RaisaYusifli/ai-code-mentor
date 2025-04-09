import React from 'react';
import { Difficulty } from '../../types';

interface DifficultyFilterProps {
  selectedDifficulty: Difficulty | 'all';
  onSelectDifficulty: (difficulty: Difficulty | 'all') => void;
}

const DifficultyFilter: React.FC<DifficultyFilterProps> = ({ 
  selectedDifficulty, 
  onSelectDifficulty 
}) => {
  return (
    <div className="difficulty-filter">
      <span className="filter-label">Difficulty:</span>
      <div className="filter-buttons">
        <button 
          className={`filter-button ${selectedDifficulty === 'all' ? 'active' : ''}`}
          onClick={() => onSelectDifficulty('all')}
        >
          All
        </button>
        <button 
          className={`filter-button ${selectedDifficulty === 'easy' ? 'active' : ''}`}
          onClick={() => onSelectDifficulty('easy')}
        >
          Easy
        </button>
        <button 
          className={`filter-button ${selectedDifficulty === 'medium' ? 'active' : ''}`}
          onClick={() => onSelectDifficulty('medium')}
        >
          Medium
        </button>
        <button 
          className={`filter-button ${selectedDifficulty === 'hard' ? 'active' : ''}`}
          onClick={() => onSelectDifficulty('hard')}
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default DifficultyFilter;