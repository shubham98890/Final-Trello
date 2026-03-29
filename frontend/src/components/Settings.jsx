import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/settings.css';

const Settings = ({ isOpen, onClose }) => {
  const { currentTheme, setCurrentTheme, THEMES } = useTheme();

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div className="modal-overlay" onClick={onClose} />

      {/* Settings Modal */}
      <div className="settings-modal">
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>

        <div className="settings-content">
          {/* Theme Selection */}
          <div className="settings-section">
            <h3>🎨 Theme Color</h3>
            <p className="settings-label">Choose your preferred color theme:</p>
            <div className="theme-grid">
              {Object.entries(THEMES).map(([key, theme]) => (
                <button
                  key={key}
                  className={`theme-option ${currentTheme === key ? 'active' : ''}`}
                  onClick={() => setCurrentTheme(key)}
                  title={theme.name}
                >
                  <div
                    className="theme-color"
                    style={{
                      background: `linear-gradient(135deg, ${theme.gradient})`,
                    }}
                  />
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="settings-section">
            <h3>ℹ️ About</h3>
            <p>Trello Clone v1.0</p>
            <p className="settings-description">
              A full-featured project management application with boards, lists, cards, and more.
            </p>
          </div>
        </div>

        <div className="settings-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
