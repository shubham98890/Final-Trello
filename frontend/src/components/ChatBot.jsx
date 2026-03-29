import { useState } from 'react';
import { chatAPI } from '../services/api';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      text: 'Hi! 👋 I am your Trello assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(inputValue);
      const botMessage = {
        text: response.data.message,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        text: 'Sorry, I could not understand that. Try asking about boards, lists, or cards!',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chatbot ${minimized ? 'minimized' : ''}`}>
      <div
        className="chatbot-header"
        onClick={() => setMinimized(!minimized)}
      >
        <span className="chatbot-title">🤖 Trello Assistant</span>
        <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          {minimized ? '▲' : '▼'}
        </button>
      </div>

      {!minimized && (
        <>
          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                <div className="chatbot-message-bubble">{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-message bot">
                <div className="chatbot-message-bubble">
                  <div className="loading"></div>
                </div>
              </div>
            )}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={loading}
            />
            <button onClick={handleSendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
