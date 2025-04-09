import React from 'react';
import { List } from 'lucide-react';
import { Challenge, Difficulty } from '../../types';

interface ChallengeListProps {
  challenges: Challenge[];
  selectedChallenge: Challenge;
  onSelectChallenge: (challenge: Challenge) => void;
  filterDifficulty: Difficulty | 'all';
}

const ChallengeList: React.FC<ChallengeListProps> = ({ 
  challenges, 
  selectedChallenge, 
  onSelectChallenge,
  filterDifficulty
}) => {
  const filteredChallenges = filterDifficulty === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.difficulty === filterDifficulty);

  return (
    <div className="challenge-sidebar">
      <h2>
        <List className="icon" />
        Challenges
      </h2>
      
      {filteredChallenges.length === 0 ? (
        <p className="no-challenges">No challenges match the selected filter.</p>
      ) : (
        <div className="challenge-list">
          {filteredChallenges.map(challenge => (
            <button
              key={challenge.id}
              className={`challenge-item ${selectedChallenge.id === challenge.id ? 'active' : ''}`}
              onClick={() => onSelectChallenge(challenge)}
            >
              <span>{challenge.title}</span>
              <span className={`difficulty-badge ${challenge.difficulty}`}>
                {challenge.difficulty}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChallengeList;