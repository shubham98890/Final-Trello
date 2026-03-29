import * as cardModel from '../models/cardModel.js';

export const getCardsByListId = async (req, res) => {
  try {
    const cards = await cardModel.getCardsByListId(req.params.listId);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCardById = async (req, res) => {
  try {
    const card = await cardModel.getCardWithDetails(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCard = async (req, res) => {
  try {
    const { listId, boardId, title, description, position } = req.body;
    if (!title || !listId || !boardId) {
      return res.status(400).json({ error: 'Title, listId, and boardId are required' });
    }
    const card = await cardModel.createCard(listId, boardId, title, description, position);
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { title, description, dueDate, list_id, position, cover_image } = req.body;
    const card = await cardModel.updateCard(req.params.id, { 
      title, 
      description, 
      dueDate,
      list_id,
      position,
      cover_image
    });
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCardCover = async (req, res) => {
  try {
    const { cover_image } = req.body;
    if (!cover_image) {
      return res.status(400).json({ error: 'Cover image URL is required' });
    }
    const card = await cardModel.updateCard(req.params.id, { cover_image });
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    await cardModel.deleteCard(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const moveCard = async (req, res) => {
  try {
    const { newListId } = req.body;
    if (!newListId) return res.status(400).json({ error: 'newListId is required' });
    await cardModel.moveCard(req.params.id, newListId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
