import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const getLabelsByBoardId = (boardId) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM labels WHERE board_id = ?', [boardId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getLabelById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM labels WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const createLabel = (boardId, name, color = '#FF6B6B') => {
  const id = uuidv4();
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO labels (id, board_id, name, color) VALUES (?, ?, ?, ?)',
      [id, boardId, name, color],
      function(err) {
        if (err) reject(err);
        else resolve({ id, board_id: boardId, name, color, created_at: new Date().toISOString() });
      }
    );
  });
};

export const updateLabel = (id, name, color) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE labels SET name = ?, color = ? WHERE id = ?',
      [name, color, id],
      function(err) {
        if (err) reject(err);
        else resolve({ id, name, color });
      }
    );
  });
};

export const deleteLabel = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM card_labels WHERE label_id = ?', [id], (err) => {
      if (err) return reject(err);
      db.run('DELETE FROM labels WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ success: true });
      });
    });
  });
};

export const addLabelToCard = (cardId, labelId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT OR IGNORE INTO card_labels (card_id, label_id) VALUES (?, ?)',
      [cardId, labelId],
      function(err) {
        if (err) reject(err);
        else resolve({ success: true });
      }
    );
  });
};

export const removeLabelFromCard = (cardId, labelId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM card_labels WHERE card_id = ? AND label_id = ?',
      [cardId, labelId],
      function(err) {
        if (err) reject(err);
        else resolve({ success: true });
      }
    );
  });
};
