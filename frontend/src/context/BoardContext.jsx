import { createContext, useState, useCallback } from 'react';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [labels, setLabels] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateLists = useCallback((newLists) => {
    setLists(newLists);
  }, []);

  const updateLabels = useCallback((newLabels) => {
    setLabels(newLabels);
  }, []);

  const updateMembers = useCallback((newMembers) => {
    setMembers(newMembers);
  }, []);

  const value = {
    boards,
    setBoards,
    currentBoard,
    setCurrentBoard,
    lists,
    updateLists,
    labels,
    updateLabels,
    members,
    updateMembers,
    selectedCard,
    setSelectedCard,
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};
