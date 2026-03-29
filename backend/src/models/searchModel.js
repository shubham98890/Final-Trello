import db from '../config/db.js';

export const searchCards = (boardId, query) => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM cards WHERE board_id = ? AND (title LIKE ? OR description LIKE ?) ORDER BY updated_at DESC',
      [boardId, `%${query}%`, `%${query}%`],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

export const filterCardsByLabel = (boardId, labelId) => {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT DISTINCT c.* FROM cards c
      INNER JOIN card_labels cl ON c.id = cl.card_id
      WHERE c.board_id = ? AND cl.label_id = ?
      ORDER BY c.updated_at DESC
    `, [boardId, labelId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const filterCardsByMember = (boardId, memberId) => {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT DISTINCT c.* FROM cards c
      INNER JOIN card_members cm ON c.id = cm.card_id
      WHERE c.board_id = ? AND cm.member_id = ?
      ORDER BY c.updated_at DESC
    `, [boardId, memberId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const filterCardsByDueDate = (boardId, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM cards WHERE board_id = ? AND due_date BETWEEN ? AND ? ORDER BY due_date',
      [boardId, startDate, endDate],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};
