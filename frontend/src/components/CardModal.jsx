import { useState, useEffect } from 'react';
import { labelAPI, memberAPI, checklistAPI, cardAPI } from '../services/api';
import Checklist from './Checklist';
import Comments from './Comments';
import Attachments from './Attachments';
import CardCover from './CardCover';
import ActivityLog from './ActivityLog';
import MemberAvatar from './MemberAvatar';

const CardModal = ({ card, onClose, onUpdate }) => {
  const [title, setTitle] = useState(card?.title || '');
  const [description, setDescription] = useState(card?.description || '');
  const [dueDate, setDueDate] = useState(card?.due_date || '');
  const [labels, setLabels] = useState(card?.labels || []);
  const [members, setMembers] = useState(card?.members || []);
  const [checklists, setChecklists] = useState(card?.checklists || []);
  const [availableLabels, setAvailableLabels] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [newChecklistName, setNewChecklistName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAvailableData();
  }, []);

  const fetchAvailableData = async () => {
    try {
      const labelsRes = await labelAPI.getByBoardId(card.board_id);
      const membersRes = await memberAPI.getAll();
      setAvailableLabels(labelsRes.data);
      setAvailableMembers(membersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await cardAPI.update(card.id, {
        title,
        description,
        dueDate,
      });
      onUpdate({ ...card, title, description, dueDate });
    } catch (error) {
      console.error('Error updating card:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLabel = async (labelId) => {
    try {
      const label = availableLabels.find((l) => l.id === labelId);
      if (!labels.find((l) => l.id === labelId)) {
        await labelAPI.addToCard({ cardId: card.id, labelId });
        setLabels([...labels, label]);
      }
    } catch (error) {
      console.error('Error adding label:', error);
    }
  };

  const handleRemoveLabel = async (labelId) => {
    try {
      await labelAPI.removeFromCard({ cardId: card.id, labelId });
      setLabels(labels.filter((l) => l.id !== labelId));
    } catch (error) {
      console.error('Error removing label:', error);
    }
  };

  const handleAddMember = async (memberId) => {
    try {
      const member = availableMembers.find((m) => m.id === memberId);
      if (!members.find((m) => m.id === memberId)) {
        await memberAPI.addToCard({ cardId: card.id, memberId });
        setMembers([...members, member]);
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await memberAPI.removeMemberFromCard({ cardId: card.id, memberId });
      setMembers(members.filter((m) => m.id !== memberId));
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const handleAddChecklist = async () => {
    if (!newChecklistName) return;
    try {
      const response = await checklistAPI.create({
        cardId: card.id,
        name: newChecklistName,
      });
      setChecklists([...checklists, { ...response.data, items: [] }]);
      setNewChecklistName('');
    } catch (error) {
      console.error('Error creating checklist:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Card Details</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Title */}
        <div className="modal-section">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Description */}
        <div className="modal-section">
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Due Date */}
        <div className="modal-section">
          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Labels */}
        <div className="modal-section">
          <div className="modal-section-title">Labels</div>
          <div className="card-meta">
            {labels.map((label) => (
              <div key={label.id} className="card-label" style={{ backgroundColor: label.color }}>
                {label.name}
                <button
                  style={{
                    marginLeft: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                  onClick={() => handleRemoveLabel(label.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="filter-options" style={{ marginTop: '1rem' }}>
            {availableLabels
              .filter((l) => !labels.find((label) => label.id === l.id))
              .map((label) => (
                <button
                  key={label.id}
                  className="filter-option"
                  onClick={() => handleAddLabel(label.id)}
                  style={{
                    borderColor: label.color,
                    color: label.color,
                  }}
                >
                  + {label.name}
                </button>
              ))}
          </div>
        </div>

        {/* Members */}
        <div className="modal-section">
          <div className="modal-section-title">Team Members</div>
          <div className="card-members" style={{ marginBottom: '1rem' }}>
            {members.map((member) => (
              <div
                key={member.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#f0f0f0',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '4px',
                }}
              >
                <MemberAvatar member={member} size="small" />
                <span>{member.name}</span>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#999',
                  }}
                  onClick={() => handleRemoveMember(member.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="filter-options">
            {availableMembers
              .filter((m) => !members.find((member) => member.id === m.id))
              .map((member) => (
                <button
                  key={member.id}
                  className="filter-option"
                  onClick={() => handleAddMember(member.id)}
                >
                  + {member.name}
                </button>
              ))}
          </div>
        </div>

        {/* Checklists */}
        <div className="modal-section">
          <div className="modal-section-title">Checklists</div>
          <Checklist cardId={card.id} checklists={checklists} />
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="form-input"
              placeholder="New checklist..."
              value={newChecklistName}
              onChange={(e) => setNewChecklistName(e.target.value)}
              disabled={loading}
            />
            <button
              className="btn btn-primary btn-small"
              onClick={handleAddChecklist}
              disabled={loading}
            >
              Add
            </button>
          </div>
        </div>

        {/* Attachments */}
        <div className="modal-section">
          <Attachments cardId={card.id} />
        </div>

        {/* Card Cover */}
        <CardCover card={card} onUpdate={onUpdate} />

        {/* Comments */}
        <div className="modal-section">
          <Comments cardId={card.id} />
        </div>

        {/* Activity Log */}
        <ActivityLog cardId={card.id} />

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', borderTop: '2px solid #f0f0f0', paddingTop: '1.5rem' }}>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={loading}
            style={{ minWidth: '150px' }}
          >
            {loading ? '⏳ Saving...' : '✓ Save Changes'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleSave}
            disabled={loading}
            style={{ minWidth: '150px' }}
          >
            {loading ? 'Saving...' : '✏️ Edit Card'}
          </button>
          <button className="btn btn-secondary" onClick={onClose} style={{ marginLeft: 'auto' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
