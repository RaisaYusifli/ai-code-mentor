import React from 'react';
import { Challenge } from '../../types';

interface ChallengeDetailsProps {
  challenge: Challenge;
}

const ChallengeDetails: React.FC<ChallengeDetailsProps> = ({ challenge }) => {
  return (
    <div className="challenge-details">
      <div className="challenge-header">
        <h2>{challenge.title}</h2>
        <span className={`difficulty-badge ${challenge.difficulty}`}>
          {challenge.difficulty}
        </span>
      </div>
      <p className="description">{challenge.description}</p>
      
      <div className="code-section">
        <h3>Test Case:</h3>
        <div className="code-block">
          {challenge.testCase}
        </div>
      </div>
      
      <div className="code-section">
        <h3>Expected Result:</h3>
        <div className="code-block">
          {challenge.expectedResult}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;