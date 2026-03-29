import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

export const getAllMembers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM members', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getMemberById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM members WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const createMember = (name, email) => {
  const id = uuidv4();
  const avatarColor = colors[Math.floor(Math.random() * colors.length)];
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO members (id, name, email, avatar_color) VALUES (?, ?, ?, ?)',
      [id, name, email, avatarColor],
      function(err) {
        if (err) reject(err);
        else resolve({ id, name, email, avatar_color: avatarColor, created_at: new Date().toISOString() });
      }
    );
  });
};

export const updateMember = (id, name, email) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE members SET name = ?, email = ? WHERE id = ?',
      [name, email, id],
      function(err) {
        if (err) reject(err);
        else resolve({ id, name, email });
      }
    );
  });
};

export const deleteMember = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM card_members WHERE member_id = ?', [id], (err) => {
      if (err) return reject(err);
      db.run('DELETE FROM members WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ success: true });
      });
    });
  });
};

export const addMemberToCard = (cardId, memberId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT OR IGNORE INTO card_members (card_id, member_id) VALUES (?, ?)',
      [cardId, memberId],
      function(err) {
        if (err) reject(err);
        else resolve({ success: true });
      }
    );
  });
};

export const removeMemberFromCard = (cardId, memberId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM card_members WHERE card_id = ? AND member_id = ?',
      [cardId, memberId],
      function(err) {
        if (err) reject(err);
        else resolve({ success: true });
      }
    );
  });
};

export const getCardMembers = (cardId) => {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT m.* FROM members m
      INNER JOIN card_members cm ON m.id = cm.member_id
      WHERE cm.card_id = ?
    `, [cardId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
