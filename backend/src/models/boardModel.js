import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const getAllBoards = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM boards ORDER BY updated_at DESC', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getBoardById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM boards WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const createBoard = (name, description = '', color = '#406FFF') => {
  const id = uuidv4();
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO boards (id, name, description, color) VALUES (?, ?, ?, ?)',
      [id, name, description, color],
      function(err) {
        if (err) reject(err);
        else resolve({ id, name, description, color, created_at: new Date().toISOString() });
      }
    );
  });
};

export const updateBoard = (id, { name, description, color, background_color, background_image }) => {
  return new Promise((resolve, reject) => {
    let updateFields = [];
    let values = [];

    if (name !== undefined) {
      updateFields.push('name = ?');
      values.push(name);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      values.push(description);
    }
    if (color !== undefined) {
      updateFields.push('color = ?');
      values.push(color);
    }
    if (background_color !== undefined) {
      updateFields.push('background_color = ?');
      values.push(background_color);
    }
    if (background_image !== undefined) {
      updateFields.push('background_image = ?');
      values.push(background_image);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    if (updateFields.length <= 1) {
      return resolve({ id, name, description, color, background_color, background_image });
    }

    const query = `UPDATE boards SET ${updateFields.join(', ')} WHERE id = ?`;
    
    db.run(query, values, function(err) {
      if (err) reject(err);
      else resolve({ id, name, description, color, background_color, background_image });
    });
  });
};

export const deleteBoard = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM boards WHERE id = ?', [id], function(err) {
      if (err) reject(err);
      else resolve({ success: true });
    });
  });
};

export const getBoardWithLists = (boardId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM boards WHERE id = ?', [boardId], (err, board) => {
      if (err) return reject(err);
      if (!board) return resolve(null);

      db.all('SELECT * FROM lists WHERE board_id = ? ORDER BY position', [boardId], (err, lists) => {
        if (err) return reject(err);
        resolve({ ...board, lists: lists || [] });
      });
    });
  });
};
