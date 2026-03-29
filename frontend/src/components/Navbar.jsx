import { useState } from 'react';
import Settings from './Settings';

const Navbar = ({ boardTitle }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-title">🎯 {boardTitle || 'Trello Clone'}</div>
        <div className="navbar-actions">
          <button 
            className="btn btn-primary btn-small"
            onClick={() => setSettingsOpen(true)}
          >
            Settings ⚙️
          </button>
        </div>
      </nav>
      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};

export default Navbar;
