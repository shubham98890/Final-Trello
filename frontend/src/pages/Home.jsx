import { useState, useEffect } from 'react';
import { boardAPI } from '../services/api';
import Board from '../components/Board';

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showAddBoard, setShowAddBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const response = await boardAPI.getAll();
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) return;

    try {
      const response = await boardAPI.create({
        name: newBoardName,
        description: 'New board',
      });
      setBoards([...boards, response.data]);
      setNewBoardName('');
      setShowAddBoard(false);
      setSelectedBoard(response.data.id);
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      try {
        await boardAPI.delete(boardId);
        setBoards(boards.filter((b) => b.id !== boardId));
      } catch (error) {
        console.error('Error deleting board:', error);
      }
    }
  };

  if (selectedBoard) {
    return (
      <div>
        <button
          className="btn btn-secondary"
          onClick={() => setSelectedBoard(null)}
          style={{
            position: 'fixed',
            top: '1rem',
            left: '1rem',
            zIndex: 200,
          }}
        >
          ← Back to Boards
        </button>
        <Board boardId={selectedBoard} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="navbar">
        <div className="navbar-title">📋 My Trello Boards</div>
      </div>

      <div className="board-container">
        <div className="board-header">
          <h1 className="board-title">Welcome to Trello Clone</h1>
        </div>

        {loading ? (
          <div className="loading"></div>
        ) : (
          <div className="boards-grid">
            {boards.map((board) => (
              <div
                key={board.id}
                className="board-card"
                onClick={() => setSelectedBoard(board.id)}
              >
                <div className="board-card-title">{board.name}</div>
                <div className="board-card-description">
                  {board.description || 'No description'}
                </div>
                <div className="board-card-info">
                  <span>Click to open</span>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBoard(board.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Add Board Card */}
            <div
              className="board-card"
              onClick={() => setShowAddBoard(true)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}
            >
              {showAddBoard ? (
                <div style={{ width: '100%' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Board name..."
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateBoard()}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCreateBoard();
                      }}
                      style={{ flex: 1 }}
                    >
                      Create
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAddBoard(false);
                        setNewBoardName('');
                      }}
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>+</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>
                    Create New Board
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
