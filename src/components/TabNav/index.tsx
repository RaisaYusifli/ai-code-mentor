import React from 'react';
import { Book, Code } from 'lucide-react';

interface TabNavProps {
  activeTab: 'challenge' | 'code';
  onTabChange: (tab: 'challenge' | 'code') => void;
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-nav">
      <button
        className={`tab-button ${activeTab === 'challenge' ? 'active' : ''}`}
        onClick={() => onTabChange('challenge')}
      >
        <Book className="icon" />
        Challenge
      </button>
      <button
        className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
        onClick={() => onTabChange('code')}
      >
        <Code className="icon" />
        Code Editor
      </button>
    </div>
  );
};

export default TabNav;