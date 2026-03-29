import { useState } from 'react';
import { cardAPI } from '../services/api';

const CardCover = ({ card, onUpdate }) => {
  const [coverUrl, setCoverUrl] = useState(card?.cover_image || '');
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleAddCover = async () => {
    if (!coverUrl.trim()) return;

    try {
      setLoading(true);
      await cardAPI.update(card.id, { cover_image: coverUrl });
      onUpdate({ ...card, cover_image: coverUrl });
      setShowInput(false);
      setCoverUrl('');
    } catch (error) {
      console.error('Error setting cover:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCover = async () => {
    try {
      setLoading(true);
      await cardAPI.update(card.id, { cover_image: null });
      onUpdate({ ...card, cover_image: null });
    } catch (error) {
      console.error('Error removing cover:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-section">
      <div className="modal-section-title">Card Cover</div>
      
      {card.cover_image && (
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <img
            src={card.cover_image}
            alt="Card cover"
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '0.5rem',
            }}
          />
          <button
            style={{
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
            onClick={handleRemoveCover}
            disabled={loading}
          >
            Remove Cover
          </button>
        </div>
      )}

      {!card.cover_image && !showInput && (
        <button
          className="btn btn-secondary"
          onClick={() => setShowInput(true)}
          style={{ width: '100%' }}
        >
          + Add Cover Image
        </button>
      )}

      {showInput && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input
            type="url"
            className="form-input"
            placeholder="Paste image URL (e.g., https://example.com/image.jpg)"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            disabled={loading}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-primary btn-small"
              onClick={handleAddCover}
              disabled={loading || !coverUrl.trim()}
            >
              Add Cover
            </button>
            <button
              className="btn btn-secondary btn-small"
              onClick={() => {
                setShowInput(false);
                setCoverUrl('');
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

export default CardCover;
