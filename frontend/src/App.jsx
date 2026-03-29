import { useState } from 'react';
import Home from './pages/Home';
import ChatBot from './components/ChatBot';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/main.css';

function App() {
  return (
    <ThemeProvider>
      <div>
        <Home />
        <ChatBot />
      </div>
    </ThemeProvider>
  );
}

export default App;
