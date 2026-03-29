import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const getChecklistsByCardId = (cardId) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM checklists WHERE card_id = ?', [cardId], (err, checklists) => {
      if (err) return reject(err);
      
      let completed = 0;
      const result = [];
      
      if (checklists.length === 0) return resolve([]);
      
      checklists.forEach((checklist) => {
        db.all('SELECT * FROM checklist_items WHERE checklist_id = ?', [checklist.id], (err, items) => {
          if (err) return reject(err);
          result.push({ ...checklist, items: items || [] });
          completed++;
          if (completed === checklists.length) resolve(result);
        });
      });
    });
  });
};

export const createChecklist = (cardId, name) => {
  const id = uuidv4();
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO checklists (id, card_id, name) VALUES (?, ?, ?)',
      [id, cardId, name],
      function(err) {
        if (err) reject(err);
        else resolve({ id, card_id: cardId, name, items: [], created_at: new Date().toISOString() });
      }
    );
  });
};

export const deleteChecklist = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM checklist_items WHERE checklist_id = ?', [id], (err) => {
      if (err) return reject(err);
      db.run('DELETE FROM checklists WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ success: true });
      });
    });
  });
};

export const addChecklistItem = (checklistId, text) => {
  const id = uuidv4();
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO checklist_items (id, checklist_id, text) VALUES (?, ?, ?)',
      [id, checklistId, text],
      function(err) {
        if (err) reject(err);
        else resolve({ id, checklist_id: checklistId, text, checked: false, created_at: new Date().toISOString() });
      }
    );
  });
};

export const updateChecklistItem = (id, text, checked) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE checklist_items SET text = ?, checked = ? WHERE id = ?',
      [text, checked ? 1 : 0, id],
      function(err) {
        if (err) reject(err);
        else resolve({ id, text, checked });
      }
    );
  });
};

export const deleteChecklistItem = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM checklist_items WHERE id = ?', [id], function(err) {
      if (err) reject(err);
      else resolve({ success: true });
    });
  });
};
