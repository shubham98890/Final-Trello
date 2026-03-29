import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const getCommentsByCardId = (cardId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT c.*, m.name as member_name, m.avatar_color 
       FROM comments c 
       JOIN members m ON c.member_id = m.id 
       WHERE c.card_id = ? 
       ORDER BY c.created_at DESC`,
      [cardId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      }
    );
  });
};

export const createComment = (cardId, memberId, text) => {
  const id = uuidv4();
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO comments (id, card_id, member_id, text) VALUES (?, ?, ?, ?)',
      [id, cardId, memberId, text],
      function(err) {
        if (err) reject(err);
        else {
          db.get(
            `SELECT c.*, m.name as member_name, m.avatar_color 
             FROM comments c 
             JOIN members m ON c.member_id = m.id 
             WHERE c.id = ?`,
            [id],
            (err, row) => {
              if (err) reject(err);
              else resolve(row);
            }
          );
        }
      }
    );
  });
};

export const updateComment = (commentId, text) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE comments SET text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [text, commentId],
      function(err) {
        if (err) reject(err);
        else {
          db.get(
            `SELECT c.*, m.name as member_name, m.avatar_color 
             FROM comments c 
             JOIN members m ON c.member_id = m.id 
             WHERE c.id = ?`,
            [commentId],
            (err, row) => {
              if (err) reject(err);
              else resolve(row);
            }
          );
        }
      }
    );
  });
};

export const deleteComment = (commentId) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM comments WHERE id = ?', [commentId], function(err) {
      if (err) reject(err);
      else resolve({ id: commentId });
    });
  });
};
