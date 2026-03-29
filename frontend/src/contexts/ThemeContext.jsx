import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const THEMES = {
  default: {
    name: 'Purple',
    gradient: '#667eea 0%, #764ba2 100%',
    primary: '#667eea',
    secondary: '#764ba2',
  },
  blue: {
    name: 'Blue',
    gradient: '#3498db 0%, #2980b9 100%',
    primary: '#3498db',
    secondary: '#2980b9',
  },
  green: {
    name: 'Green',
    gradient: '#2ecc71 0%, #27ae60 100%',
    primary: '#2ecc71',
    secondary: '#27ae60',
  },
  orange: {
    name: 'Orange',
    gradient: '#e74c3c 0%, #c0392b 100%',
    primary: '#e74c3c',
    secondary: '#c0392b',
  },
  pink: {
    name: 'Pink',
    gradient: '#ff66b2 0%, #ff1493 100%',
    primary: '#ff66b2',
    secondary: '#ff1493',
  },
  teal: {
    name: 'Teal',
    gradient: '#1abc9c 0%, #16a085 100%',
    primary: '#1abc9c',
    secondary: '#16a085',
  },
  dark: {
    name: 'Dark',
    gradient: '#2c3e50 0%, #34495e 100%',
    primary: '#2c3e50',
    secondary: '#34495e',
  },
  sunset: {
    name: 'Sunset',
    gradient: '#ff6b6b 0%, #ff8e72 100%',
    primary: '#ff6b6b',
    secondary: '#ff8e72',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    return savedTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
  }, [currentTheme]);

  const applyTheme = (themeName) => {
    const theme = THEMES[themeName] || THEMES.default;
    document.documentElement.style.setProperty('--gradient', theme.gradient);
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
    
    // Update body background
    document.body.style.background = `linear-gradient(135deg, ${theme.gradient})`;
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
