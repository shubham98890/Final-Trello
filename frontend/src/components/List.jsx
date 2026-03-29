import { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { listAPI, cardAPI } from '../services/api';
import Card from './Card';

const List = ({ list, boardId, onCardClick, onListUpdate, onCardDelete, dragHandleProps }) => {
  const [cards, setCards] = useState(list?.cards || []);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDueDate, setNewCardDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingListName, setEditingListName] = useState(false);
  const [listName, setListName] = useState(list?.name || '');

  useEffect(() => {
    setCards(list?.cards || []);
  }, [list?.cards]);

  const handleAddCard = async () => {
    if (!newCardTitle.trim()) return;

    try {
      setLoading(true);
      const response = await cardAPI.create({
        listId: list.id,
        boardId,
        title: newCardTitle,
        position: cards.length,
        description: '',
        dueDate: newCardDueDate || null,
      });
      setCards([...cards, response.data]);
      setNewCardTitle('');
      setNewCardDueDate('');
      setShowAddCard(false);
    } catch (error) {
      console.error('Error creating card:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateListName = async () => {
    if (listName === list.name) {
      setEditingListName(false);
      return;
    }

    try {
      setLoading(true);
      await listAPI.update(list.id, { name: listName });
      onListUpdate({ ...list, name: listName });
      setEditingListName(false);
    } catch (error) {
      console.error('Error updating list:', error);
      setListName(list.name);
    } finally {
      setLoading(false);
    }
  };

  const handleCardDeleted = (cardId) => {
    setCards(cards.filter((c) => c.id !== cardId));
    onCardDelete(cardId);
  };

  return (
    <div className="list">
      {/* List Header with Drag Handle */}
      <div className="list-header" {...dragHandleProps} style={{ cursor: 'grab' }}>
        {editingListName ? (
          <input
            type="text"
            className="form-input"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            onBlur={handleUpdateListName}
            onKeyPress={(e) => e.key === 'Enter' && handleUpdateListName()}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div>
            <div
              className="list-title"
              onClick={() => setEditingListName(true)}
              style={{ cursor: 'pointer' }}
            >
              {list.name}
            </div>
            <div className="list-count">{cards.length} cards</div>
          </div>
        )}
      </div>

      {/* Droppable Cards Container */}
      <Droppable droppableId={list.id} type="CARD">
        {(provided, snapshot) => (
          <div
            className="list-content"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              ...provided.droppableProps.style,
              backgroundColor: snapshot.isDraggingOver ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              minHeight: '100px',
              borderRadius: '8px',
            }}
          >
            {cards.length === 0 && !provided.placeholder ? (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <div className="empty-state-text">No cards yet</div>
              </div>
            ) : (
              cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.7 : 1,
                        transform: snapshot.isDragging
                          ? provided.draggableProps.style.transform
                          : 'none',
                      }}
                    >
                      <Card
                        card={card}
                        onCardClick={onCardClick}
                        onCardDelete={handleCardDeleted}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add Card */}
      <div className="list-actions">
        {showAddCard ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Card title..."
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCard()}
              disabled={loading}
              autoFocus
            />
            <input
              type="date"
              className="form-input"
              value={newCardDueDate}
              onChange={(e) => setNewCardDueDate(e.target.value)}
              disabled={loading}
              style={{ fontSize: '0.9rem' }}
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-primary btn-small"
                onClick={handleAddCard}
                disabled={loading}
              >
                Add
              </button>
              <button
                className="btn btn-secondary btn-small"
                onClick={() => {
                  setShowAddCard(false);
                  setNewCardTitle('');
                  setNewCardDueDate('');
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <button
            className="add-card-btn"
            onClick={() => setShowAddCard(true)}
          >
            + Add Card
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
