import * as labelModel from '../models/labelModel.js';

export const getLabelsByBoardId = async (req, res) => {
  try {
    const labels = await labelModel.getLabelsByBoardId(req.params.boardId);
    res.json(labels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLabel = async (req, res) => {
  try {
    const { boardId, name, color } = req.body;
    if (!boardId || !name) return res.status(400).json({ error: 'boardId and name are required' });
    const label = await labelModel.createLabel(boardId, name, color);
    res.status(201).json(label);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLabel = async (req, res) => {
  try {
    const { name, color } = req.body;
    const label = await labelModel.updateLabel(req.params.id, name, color);
    res.json(label);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLabel = async (req, res) => {
  try {
    await labelModel.deleteLabel(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addLabelToCard = async (req, res) => {
  try {
    const { cardId, labelId } = req.body;
    if (!cardId || !labelId) return res.status(400).json({ error: 'cardId and labelId are required' });
    await labelModel.addLabelToCard(cardId, labelId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeLabelFromCard = async (req, res) => {
  try {
    const { cardId, labelId } = req.body;
    if (!cardId || !labelId) return res.status(400).json({ error: 'cardId and labelId are required' });
    await labelModel.removeLabelFromCard(cardId, labelId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
