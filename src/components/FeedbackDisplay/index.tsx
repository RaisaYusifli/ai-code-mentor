import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Feedback } from '../../types';

interface FeedbackDisplayProps {
  feedback: Feedback;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  const statusClasses = {
    success: 'success',
    partial: 'partial',
    error: 'error'
  };
  
  return (
    <div className={`feedback-container ${statusClasses[feedback.status]}`}>
      <div className="feedback-content">
        {feedback.status === 'success' ? (
          <CheckCircle className="icon success-icon" />
        ) : (
          <AlertCircle className="icon error-icon" />
        )}
        <div>
          <p className="feedback-message">{feedback.message}</p>
          {feedback.suggestions.length > 0 && (
            <ul className="feedback-suggestions">
              {feedback.suggestions.map((suggestion, idx) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDisplay;