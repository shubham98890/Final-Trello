import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const getListsByBoardId = (boardId) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM lists WHERE board_id = ? ORDER BY position', [boardId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getListById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM lists WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const createList = (boardId, name, position = 0) => {
  const id = uuidv4();
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO lists (id, board_id, name, position) VALUES (?, ?, ?, ?)',
      [id, boardId, name, position],
      function(err) {
        if (err) reject(err);
        else resolve({ id, board_id: boardId, name, position, created_at: new Date().toISOString() });
      }
    );
  });
};

export const updateList = (id, name) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE lists SET name = ? WHERE id = ?',
      [name, id],
      function(err) {
        if (err) reject(err);
        else resolve({ id, name });
      }
    );
  });
};

export const deleteList = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM lists WHERE id = ?', [id], function(err) {
      if (err) reject(err);
      else resolve({ success: true });
    });
  });
};

export const reorderLists = (lists) => {
  return new Promise((resolve, reject) => {
    let completed = 0;
    lists.forEach((list, index) => {
      db.run('UPDATE lists SET position = ? WHERE id = ?', [index, list.id], (err) => {
        if (err) return reject(err);
        completed++;
        if (completed === lists.length) resolve({ success: true });
      });
    });
  });
};
