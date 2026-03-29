import { useState } from 'react';
import { labelAPI } from '../services/api';

const Label = ({ label, onDelete, onUpdate, editable = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(label?.name || '');
  const [editColor, setEditColor] = useState(label?.color || '#FF6B6B');
  const [loading, setLoading] = useState(false);

  const labelColors = [
    '#FF6B6B', '#FD79A8', '#FDCB6E', '#6C5CE7',
    '#00B894', '#00CEC9', '#0984E3', '#2D3436',
  ];

  const handleSave = async () => {
    if (!editName.trim()) return;

    try {
      setLoading(true);
      await labelAPI.update(label.id, { name: editName, color: editColor });
      onUpdate({ ...label, name: editName, color: editColor });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating label:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this label?')) {
      try {
        setLoading(true);
        await labelAPI.delete(label.id);
        onDelete(label.id);
      } catch (error) {
        console.error('Error deleting label:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (isEditing && editable) {
    return (
      <div
        style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #ddd',
          marginBottom: '0.5rem',
        }}
      >
        <div className="form-group">
          <label className="form-label">Label Name</label>
          <input
            type="text"
            className="form-input"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Color</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {labelColors.map((color) => (
              <button
                key={color}
                style={{
                  width: '100%',
                  height: '40px',
                  backgroundColor: color,
                  border: editColor === color ? '3px solid #333' : '2px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onClick={() => setEditColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-primary btn-small"
            onClick={handleSave}
            disabled={loading}
          >
            Save
          </button>
          <button
            className="btn btn-secondary btn-small"
            onClick={() => {
              setIsEditing(false);
              setEditName(label.name);
              setEditColor(label.color);
            }}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.8rem 1rem',
        borderRadius: '6px',
        backgroundColor: label?.color || '#FF6B6B',
        color: 'white',
        marginBottom: '0.5rem',
        cursor: editable ? 'pointer' : 'default',
      }}
      onClick={() => editable && setIsEditing(true)}
    >
      <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>
        {label?.name || 'Label'}
      </span>
      {editable && (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            disabled={loading}
          >
            ✏️
          </button>
          <button
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            disabled={loading}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Label;
