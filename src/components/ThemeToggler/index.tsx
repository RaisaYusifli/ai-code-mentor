import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts';

const ThemeToggler: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="icon" />
      ) : (
        <Sun className="icon" />
      )}
    </button>
  );
};

export default ThemeToggler;