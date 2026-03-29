import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const getCardsByListId = (listId) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM cards WHERE list_id = ? ORDER BY position', [listId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getCardById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM cards WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const getCardWithDetails = (cardId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM cards WHERE id = ?', [cardId], (err, card) => {
      if (err) return reject(err);
      if (!card) return resolve(null);

      // Get labels
      db.all(`
        SELECT l.* FROM labels l
        INNER JOIN card_labels cl ON l.id = cl.label_id
        WHERE cl.card_id = ?
      `, [cardId], (err, labels) => {
        if (err) return reject(err);

        // Get members
        db.all(`
          SELECT m.* FROM members m
          INNER JOIN card_members cm ON m.id = cm.member_id
          WHERE cm.card_id = ?
        `, [cardId], (err, members) => {
          if (err) return reject(err);

          // Get checklists
          db.all('SELECT * FROM checklists WHERE card_id = ?', [cardId], (err, checklists) => {
            if (err) return reject(err);

            resolve({
              ...card,
              labels: labels || [],
              members: members || [],
              checklists: checklists || []
            });
          });
        });
      });
    });
  });
};

export const createCard = (listId, boardId, title, description = '', position = 0) => {
  const id = uuidv4();
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO cards (id, list_id, board_id, title, description, position) VALUES (?, ?, ?, ?, ?, ?)',
      [id, listId, boardId, title, description, position],
      function(err) {
        if (err) reject(err);
        else resolve({
          id,
          list_id: listId,
          board_id: boardId,
          title,
          description,
          position,
          created_at: new Date().toISOString()
        });
      }
    );
  });
};

export const updateCard = (id, { title, description, dueDate, list_id, position, cover_image }) => {
  return new Promise((resolve, reject) => {
    // Build update query dynamically
    let updateFields = [];
    let values = [];

    if (title !== undefined) {
      updateFields.push('title = ?');
      values.push(title);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      values.push(description);
    }
    if (dueDate !== undefined) {
      updateFields.push('due_date = ?');
      values.push(dueDate);
    }
    if (list_id !== undefined) {
      updateFields.push('list_id = ?');
      values.push(list_id);
    }
    if (position !== undefined) {
      updateFields.push('position = ?');
      values.push(position);
    }
    if (cover_image !== undefined) {
      updateFields.push('cover_image = ?');
      values.push(cover_image);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    if (updateFields.length <= 1) {
      return resolve({ id, title, description, dueDate, list_id, position, cover_image });
    }

    const query = `UPDATE cards SET ${updateFields.join(', ')} WHERE id = ?`;
    
    db.run(query, values, function(err) {
      if (err) reject(err);
      else resolve({ id, title, description, dueDate, list_id, position, cover_image });
    });
  });
};

export const deleteCard = (id) => {
  return new Promise((resolve, reject) => {
    // Delete related data
    db.run('DELETE FROM card_labels WHERE card_id = ?', [id], (err) => {
      if (err) return reject(err);
      db.run('DELETE FROM card_members WHERE card_id = ?', [id], (err) => {
        if (err) return reject(err);
        db.run('DELETE FROM checklists WHERE card_id = ?', [id], (err) => {
          if (err) return reject(err);
          db.run('DELETE FROM comments WHERE card_id = ?', [id], (err) => {
            if (err) return reject(err);
            db.run('DELETE FROM cards WHERE id = ?', [id], function(err) {
              if (err) reject(err);
              else resolve({ success: true });
            });
          });
        });
      });
    });
  });
};

export const moveCard = (cardId, newListId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE cards SET list_id = ? WHERE id = ?',
      [newListId, cardId],
      function(err) {
        if (err) reject(err);
        else resolve({ success: true });
      }
    );
  });
};

export const reorderCards = (cards) => {
  return new Promise((resolve, reject) => {
    let completed = 0;
    cards.forEach((card, index) => {
      db.run('UPDATE cards SET position = ? WHERE id = ?', [index, card.id], (err) => {
        if (err) return reject(err);
        completed++;
        if (completed === cards.length) resolve({ success: true });
      });
    });
  });
};
