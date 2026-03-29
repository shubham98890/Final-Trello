import { useState, useCallback } from 'react';

export const useDragDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = useCallback((e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  return {
    draggedItem,
    setDraggedItem,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
