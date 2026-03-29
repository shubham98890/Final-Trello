import { useState, useEffect } from 'react';
import { checklistAPI } from '../services/api';

const Checklist = ({ cardId, checklists: initialChecklists = [] }) => {
  const [checklists, setChecklists] = useState(initialChecklists);
  const [newItemName, setNewItemName] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChecklists(initialChecklists);
  }, [initialChecklists]);

  const handleAddItem = async (checklistId) => {
    if (!newItemName[checklistId]) return;

    try {
      setLoading(true);
      const response = await checklistAPI.addItem({
        checklistId,
        text: newItemName[checklistId],
      });

      const updatedChecklists = checklists.map((cl) => {
        if (cl.id === checklistId) {
          return {
            ...cl,
            items: [...(cl.items || []), response.data],
          };
        }
        return cl;
      });

      setChecklists(updatedChecklists);
      setNewItemName({ ...newItemName, [checklistId]: '' });
    } catch (error) {
      console.error('Error adding checklist item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleItem = async (itemId, checked, checklistId) => {
    try {
      await checklistAPI.updateItem(itemId, { checked: !checked });

      const updatedChecklists = checklists.map((cl) => {
        if (cl.id === checklistId) {
          return {
            ...cl,
            items: cl.items.map((item) =>
              item.id === itemId ? { ...item, checked: !checked } : item
            ),
          };
        }
        return cl;
      });

      setChecklists(updatedChecklists);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (itemId, checklistId) => {
    try {
      await checklistAPI.deleteItem(itemId);

      const updatedChecklists = checklists.map((cl) => {
        if (cl.id === checklistId) {
          return {
            ...cl,
            items: cl.items.filter((item) => item.id !== itemId),
          };
        }
        return cl;
      });

      setChecklists(updatedChecklists);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!checklists || checklists.length === 0) {
    return <div className="empty-state">No checklists yet</div>;
  }

  return (
    <div>
      {checklists.map((checklist) => {
        const items = checklist.items || [];
        const completedCount = items.filter((item) => item.checked).length;
        const totalCount = items.length;

        return (
          <div key={checklist.id} className="checklist">
            <div className="checklist-header">
              <span className="checklist-title">{checklist.name}</span>
              {totalCount > 0 && (
                <span className="checklist-progress">
                  {completedCount}/{totalCount}
                </span>
              )}
            </div>

            <div className="checklist-items">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`checklist-item ${item.checked ? 'done' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked || false}
                    onChange={() =>
                      handleToggleItem(item.id, item.checked, checklist.id)
                    }
                  />
                  <span className="checklist-item-text">{item.text}</span>
                  <div className="checklist-item-actions">
                    <button
                      className="btn btn-small btn-danger"
                      onClick={() => handleDeleteItem(item.id, checklist.id)}
                      disabled={loading}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add item..."
                  value={newItemName[checklist.id] || ''}
                  onChange={(e) =>
                    setNewItemName({
                      ...newItemName,
                      [checklist.id]: e.target.value,
                    })
                  }
                  disabled={loading}
                />
                <button
                  className="btn btn-primary btn-small"
                  onClick={() => handleAddItem(checklist.id)}
                  disabled={loading}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Checklist;
