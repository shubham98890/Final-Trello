import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const getAttachmentsByCardId = (cardId) => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM attachments WHERE card_id = ? ORDER BY created_at DESC',
      [cardId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      }
    );
  });
};

export const createAttachment = (cardId, fileName, fileUrl, fileSize, fileType) => {
  const id = uuidv4();
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO attachments (id, card_id, file_name, file_url, file_size, file_type) VALUES (?, ?, ?, ?, ?, ?)',
      [id, cardId, fileName, fileUrl, fileSize, fileType],
      function(err) {
        if (err) reject(err);
        else {
          db.get('SELECT * FROM attachments WHERE id = ?', [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });
        }
      }
    );
  });
};

export const deleteAttachment = (attachmentId) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM attachments WHERE id = ?', [attachmentId], function(err) {
      if (err) reject(err);
      else resolve({ id: attachmentId });
    });
  });
};

export const getAttachmentById = (attachmentId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM attachments WHERE id = ?', [attachmentId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};
