import { useState } from 'react';
import { boardAPI } from '../services/api';

const BoardBackground = ({ board, onUpdate }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(board?.background_color || '#0079BF');
  const [backgroundImage, setBackgroundImage] = useState(board?.background_image || '');
  const [loading, setLoading] = useState(false);

  const predefinedColors = [
    '#0079BF',
    '#5E4DB8',
    '#8B6BBD',
    '#00875A',
    '#CD5A45',
    '#FF9F1C',
    '#2C3E50',
    '#34495E',
  ];

  const handleSaveBackground = async () => {
    try {
      setLoading(true);
      await boardAPI.update(board.id, {
        name: board.name,
        description: board.description,
        background_color: backgroundColor,
        background_image: backgroundImage || undefined,
      });
      onUpdate({
        ...board,
        background_color: backgroundColor,
        background_image: backgroundImage,
      });
      setShowSettings(false);
    } catch (error) {
      console.error('Error updating background:', error);
    } finally {
      setLoading(false);
    }
  };

  const backgroundStyle = {
    backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => setShowSettings(!showSettings)}
        style={{ marginBottom: '1rem' }}
      >
        {showSettings ? '▼' : '▶'} Board Background Settings
      </button>

      {showSettings && (
        <div className="filter-panel" style={{ marginBottom: '2rem' }}>
          <div className="filter-group">
            <div className="filter-group-title">Background Color</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem', marginBottom: '1rem' }}>
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setBackgroundColor(color)}
                  style={{
                    backgroundColor: color,
                    width: '100%',
                    height: '50px',
                    border: backgroundColor === color ? '3px solid white' : '1px solid #ddd',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    boxShadow: backgroundColor === color ? '0 0 0 2px #333' : 'none',
                  }}
                  title={color}
                />
              ))}
            </div>

            <div>
              <label className="form-label">Custom Color</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  style={{ width: '60px', height: '40px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  className="form-input"
                  placeholder="#0079BF"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-group-title">Background Image (Optional)</div>
            <input
              type="url"
              className="form-input"
              placeholder="Paste image URL (e.g., https://example.com/bg.jpg)"
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.target.value)}
              disabled={loading}
            />
            {backgroundImage && (
              <button
                className="btn btn-secondary btn-small"
                onClick={() => setBackgroundImage('')}
                style={{ marginTop: '0.5rem' }}
              >
                Clear Image
              </button>
            )}
          </div>

          {/* Preview */}
          <div className="filter-group">
            <div className="filter-group-title">Preview</div>
            <div
              style={{
                ...backgroundStyle,
                height: '150px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                marginBottom: '1rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-primary"
              onClick={handleSaveBackground}
              disabled={loading}
            >
              Save Background
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowSettings(false);
                setBackgroundColor(board?.background_color || '#0079BF');
                setBackgroundImage(board?.background_image || '');
              }}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardBackground;
