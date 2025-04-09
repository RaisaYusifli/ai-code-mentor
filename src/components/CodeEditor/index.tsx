import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  userCode: string;
  setUserCode: (code: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
  isAnalyzing: boolean;
  showSolution: boolean;
  toggleSolution: () => void;
  solution: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  userCode,
  setUserCode,
  onAnalyze,
  onReset,
  isAnalyzing,
  showSolution,
  toggleSolution,
  solution
}) => {
  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <h3>Your Code:</h3>
        <button 
          onClick={onReset}
          className="reset-button"
        >
          <RotateCcw className="icon" />
          Reset
        </button>
      </div>
      
      <div className="editor-area">
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="code-textarea"
          spellCheck="false"
        />
      </div>
      
      <div className="editor-actions">
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className={`analyze-button ${isAnalyzing ? 'analyzing' : ''}`}
        >
          <Play className="icon" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
        </button>
        
        <button
          onClick={toggleSolution}
          className="solution-button"
        >
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
      </div>
      
      {showSolution && (
        <div className="solution-display">
          <h3>Solution:</h3>
          <div className="solution-code">
            <pre>{solution}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;