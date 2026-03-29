import { useState } from 'react';
import { cardAPI } from '../services/api';
import MemberAvatar from './MemberAvatar';

const Card = ({ card, onCardClick, onCardDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure?')) {
      try {
        setLoading(true);
        await cardAPI.delete(card.id);
        onCardDelete(card.id);
      } catch (error) {
        console.error('Error deleting card:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const isOverdue = card.due_date && new Date(card.due_date) < new Date();

  return (
    <div className="card" onClick={() => onCardClick(card)}>
      {/* Card Cover Image */}
      {card.cover_image && (
        <img
          src={card.cover_image}
          alt="Card cover"
          style={{
            width: 'calc(100% + 2rem)',
            marginLeft: '-1rem',
            marginRight: '-1rem',
            marginTop: '-1rem',
            marginBottom: '0.8rem',
            height: '120px',
            objectFit: 'cover',
            borderRadius: '8px 8px 0 0',
          }}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div className="card-title">{card.title}</div>
          {card.checklists && card.checklists.length > 0 && (
            <div className="card-checklist-progress">
              ☑️ {card.checklists.length} checklist(s)
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            className="btn btn-small btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              onCardClick(card);
            }}
            style={{ padding: '0.4rem 0.6rem', fontSize: '0.9rem' }}
            title="Edit card"
          >
            ✏️
          </button>
          <button
            className="btn btn-small btn-danger"
            onClick={handleDelete}
            disabled={loading}
            style={{ padding: '0.4rem 0.6rem', fontSize: '0.9rem' }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Due Date */}
      {card.due_date && (
        <div className={`card-due-date ${isOverdue ? 'overdue' : ''}`}>
          📅 {new Date(card.due_date).toLocaleDateString()}
        </div>
      )}

      {/* Meta Information */}
      <div className="card-meta">
        {card.labels && card.labels.length > 0 && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {card.labels.map((label) => (
              <span
                key={label.id}
                className="card-label"
                style={{ backgroundColor: label.color }}
              >
                {label.name}
              </span>
            ))}
          </div>
        )}

        {card.members && card.members.length > 0 && (
          <div className="card-members">
            {card.members.map((member) => (
              <MemberAvatar key={member.id} member={member} size="small" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
