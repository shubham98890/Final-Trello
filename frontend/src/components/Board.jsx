import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { boardAPI, listAPI, memberAPI, labelAPI, cardAPI } from '../services/api';
import List from './List';
import CardModal from './CardModal';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import Label from './Label';
import BoardBackground from './BoardBackground';
import Navbar from './Navbar';

const Board = ({ boardId }) => {
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filterResults, setFilterResults] = useState([]);
  const [members, setMembers] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddList, setShowAddList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [showLabelPanel, setShowLabelPanel] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#FF6B6B');

  useEffect(() => {
    fetchBoardData();
    fetchMembers();
  }, [boardId]);

  const fetchBoardData = async () => {
    try {
      setLoading(true);
      const [boardRes, listsRes, labelsRes] = await Promise.all([
        boardAPI.getById(boardId),
        listAPI.getByBoardId(boardId),
        labelAPI.getByBoardId(boardId),
      ]);
      
      // Fetch cards for each list
      const listsWithCards = await Promise.all(
        (listsRes.data || []).map(async (list) => {
          try {
            const cardsRes = await cardAPI.getByListId(list.id);
            return {
              ...list,
              cards: cardsRes.data || [],
            };
          } catch (error) {
            console.error(`Error fetching cards for list ${list.id}:`, error);
            return { ...list, cards: [] };
          }
        })
      );
      
      setBoard(boardRes.data);
      setLists(listsWithCards);
      setLabels(labelsRes.data || []);
    } catch (error) {
      console.error('Error fetching board data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await memberAPI.getAll();
      setMembers(response.data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  // Drag and Drop Handler
  const handleDragEnd = async (result) => {
    const { source, destination, draggableId, type } = result;

    // If dropped outside a droppable area
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    try {
      if (type === 'LIST') {
        // Reorder lists
        const newLists = Array.from(lists);
        const [movedList] = newLists.splice(source.index, 1);
        newLists.splice(destination.index, 0, movedList);
        setLists(newLists);

        // Update positions on server
        newLists.forEach((list, index) => {
          listAPI.update(list.id, { position: index });
        });
      } else if (type === 'CARD') {
        // Moving card between lists or within same list
        const newLists = lists.map(list => ({ ...list, cards: [...(list.cards || [])] }));
        const sourceList = newLists.find(l => l.id === source.droppableId);
        const destList = newLists.find(l => l.id === destination.droppableId);

        if (sourceList && destList) {
          const [movedCard] = sourceList.cards.splice(source.index, 1);
          destList.cards.splice(destination.index, 0, movedCard);
          setLists(newLists);

          // Update card on server with new list and position
          await cardAPI.update(movedCard.id, {
            list_id: destination.droppableId,
            position: destination.index,
          });

          // Update positions in source list
          sourceList.cards.forEach((card, index) => {
            cardAPI.update(card.id, { position: index });
          });

          // Update positions in destination list
          destList.cards.forEach((card, index) => {
            cardAPI.update(card.id, { position: index });
          });
        }
      }
    } catch (error) {
      console.error('Error updating positions:', error);
      // Refetch data on error
      fetchBoardData();
    }
  };

  const handleAddList = async () => {
    if (!newListName.trim()) return;

    try {
      const response = await listAPI.create({
        boardId,
        name: newListName,
        position: lists.length,
      });
      setLists([...lists, { ...response.data, cards: [] }]);
      setNewListName('');
      setShowAddList(false);
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const handleAddLabel = async () => {
    if (!newLabelName.trim()) return;

    try {
      const response = await labelAPI.create({
        boardId,
        name: newLabelName,
        color: newLabelColor,
      });
      setLabels([...labels, response.data]);
      setNewLabelName('');
      setNewLabelColor('#FF6B6B');
    } catch (error) {
      console.error('Error creating label:', error);
    }
  };

  const handleLabelUpdate = (updatedLabel) => {
    setLabels(labels.map((l) => (l.id === updatedLabel.id ? updatedLabel : l)));
  };

  const handleLabelDelete = (labelId) => {
    setLabels(labels.filter((l) => l.id !== labelId));
  };

  const handleCardClick = async (card) => {
    try {
      const response = await cardAPI.getById(card.id);
      setSelectedCard(response.data || card);
    } catch (error) {
      setSelectedCard(card);
    }
  };

  const handleCardUpdate = (updatedCard) => {
    setSelectedCard(updatedCard);
    setLists(
      lists.map((list) => ({
        ...list,
        cards: (list.cards || []).map((c) => (c.id === updatedCard.id ? updatedCard : c)),
      }))
    );
  };

  const handleCardDelete = (cardId) => {
    setLists(
      lists.map((list) => ({
        ...list,
        cards: (list.cards || []).filter((c) => c.id !== cardId),
      }))
    );
  };

  const handleListUpdate = (updatedList) => {
    setLists(lists.map((l) => (l.id === updatedList.id ? updatedList : l)));
  };

  if (loading) {
    return <div className="loading" style={{ marginTop: '2rem' }}></div>;
  }

  if (!board) {
    return <div className="empty-state">Board not found</div>;
  }

  const displayLists =
    filterResults.length > 0 && showSearchResults ? [] : lists;

  return (
    <div 
      className="app"
      style={{
        backgroundColor: board?.background_color || '#0079BF',
        backgroundImage: board?.background_image ? `url(${board.background_image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar boardTitle={board.name} boardId={boardId} />

      <div className="board-container">
        <div className="board-header">
          <div>
            <h1 className="board-title">{board.name}</h1>
            {board.description && (
              <p className="board-description">{board.description}</p>
            )}
            <div style={{ marginTop: '0.8rem', display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
              <div>
                <span style={{ opacity: 0.7 }}>Created: </span>
                <strong>{board.created_at ? new Date(board.created_at).toLocaleDateString() : 'N/A'}</strong>
              </div>
              <div>
                <span style={{ opacity: 0.7 }}>Lists: </span>
                <strong>{lists.length}</strong>
              </div>
              <div>
                <span style={{ opacity: 0.7 }}>Total Cards: </span>
                <strong>{lists.reduce((sum, list) => sum + (list.cards?.length || 0), 0)}</strong>
              </div>
              <div>
                <span style={{ opacity: 0.7 }}>Members: </span>
                <strong>{members.length}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <SearchBar
          boardId={boardId}
          onSearch={(results) => {
            setFilterResults(results);
            setShowSearchResults(results.length > 0);
          }}
        />
        <FilterPanel
          boardId={boardId}
          onFilter={(results) => {
            setFilterResults(results);
            setShowSearchResults(results.length > 0);
          }}
        />

        {/* Board Background Settings */}
        <BoardBackground board={board} onUpdate={setBoard} />

        {/* Label Management */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setShowLabelPanel(!showLabelPanel)}
            style={{ marginBottom: '1rem' }}
          >
            {showLabelPanel ? '▼' : '▶'} Manage Labels ({labels.length})
          </button>

          {showLabelPanel && (
            <div className="filter-panel">
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="filter-group-title">All Labels</div>
                {labels.length === 0 ? (
                  <div className="empty-state" style={{ padding: '1rem' }}>
                    No labels yet. Create one below!
                  </div>
                ) : (
                  <div>
                    {labels.map((label) => (
                      <Label
                        key={label.id}
                        label={label}
                        onUpdate={handleLabelUpdate}
                        onDelete={handleLabelDelete}
                        editable={true}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Create New Label</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Label name..."
                  value={newLabelName}
                  onChange={(e) => setNewLabelName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Color</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {['#FF6B6B', '#FD79A8', '#FDCB6E', '#6C5CE7', '#00B894', '#00CEC9', '#0984E3', '#2D3436'].map(
                    (color) => (
                      <button
                        key={color}
                        style={{
                          width: '100%',
                          height: '40px',
                          backgroundColor: color,
                          border: newLabelColor === color ? '3px solid #333' : '2px solid #ddd',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onClick={() => setNewLabelColor(color)}
                      />
                    )
                  )}
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleAddLabel}
                style={{ width: '100%' }}
              >
                Create Label
              </button>
            </div>
          )}
        </div>

        {/* Display Search/Filter Results */}
        {showSearchResults && filterResults.length > 0 && (
          <div className="filter-panel">
            <div className="filter-group-title">Search Results</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filterResults.map((card) => (
                <div
                  key={card.id}
                  className="card"
                  onClick={() => handleCardClick(card)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-title">{card.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drag and Drop Lists */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="board" type="LIST" direction="horizontal">
            {(provided, snapshot) => (
              <div
                className="lists-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  ...provided.droppableProps.style,
                  backgroundColor: snapshot.isDraggingOver ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                }}
              >
                {displayLists.map((list, index) => (
                  <Draggable key={list.id} draggableId={list.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                      >
                        <List
                          list={list}
                          boardId={boardId}
                          onCardClick={handleCardClick}
                          onListUpdate={handleListUpdate}
                          onCardDelete={handleCardDelete}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}

                {/* Add List */}
                <div
                  style={{
                    minWidth: '320px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowAddList(true)}
                >
                  {showAddList ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="List name..."
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddList()}
                        autoFocus
                      />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-primary" onClick={handleAddList}>
                          Add
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setShowAddList(false);
                            setNewListName('');
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: '500' }}>
                      + Add List
                    </div>
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Card Modal */}
      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onUpdate={handleCardUpdate}
          members={members}
        />
      )}
    </div>
  );
};

export default Board;
