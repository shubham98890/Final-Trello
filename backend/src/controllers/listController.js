import * as listModel from '../models/listModel.js';
import * as cardModel from '../models/cardModel.js';

export const getListsByBoardId = async (req, res) => {
  try {
    const lists = await listModel.getListsByBoardId(req.params.boardId);
    
    // Get cards for each list
    let completed = 0;
    const result = [];
    
    if (lists.length === 0) return res.json([]);
    
    for (const list of lists) {
      const cards = await cardModel.getCardsByListId(list.id);
      result.push({ ...list, cards: cards || [] });
      completed++;
      if (completed === lists.length) res.json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createList = async (req, res) => {
  try {
    const { name, boardId, position } = req.body;
    if (!name || !boardId) return res.status(400).json({ error: 'Name and boardId are required' });
    const list = await listModel.createList(boardId, name, position);
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateList = async (req, res) => {
  try {
    const { name, position } = req.body;
    
    if (position !== undefined) {
      // Update position for drag and drop
      await new Promise((resolve, reject) => {
        const db = require('../config/db.js').default;
        db.run(
          'UPDATE lists SET position = ? WHERE id = ?',
          [position, req.params.id],
          function(err) {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }
    
    if (name) {
      // Update name for list rename
      await listModel.updateList(req.params.id, name);
    }
    
    const list = await listModel.getListById(req.params.id);
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteList = async (req, res) => {
  try {
    await listModel.deleteList(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
