import * as checklistModel from '../models/checklistModel.js';

export const getChecklistsByCardId = async (req, res) => {
  try {
    const checklists = await checklistModel.getChecklistsByCardId(req.params.cardId);
    res.json(checklists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createChecklist = async (req, res) => {
  try {
    const { cardId, name } = req.body;
    if (!cardId || !name) return res.status(400).json({ error: 'cardId and name are required' });
    const checklist = await checklistModel.createChecklist(cardId, name);
    res.status(201).json(checklist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteChecklist = async (req, res) => {
  try {
    await checklistModel.deleteChecklist(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addChecklistItem = async (req, res) => {
  try {
    const { checklistId, text } = req.body;
    if (!checklistId || !text) return res.status(400).json({ error: 'checklistId and text are required' });
    const item = await checklistModel.addChecklistItem(checklistId, text);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateChecklistItem = async (req, res) => {
  try {
    const { text, checked } = req.body;
    const item = await checklistModel.updateChecklistItem(req.params.id, text, checked);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteChecklistItem = async (req, res) => {
  try {
    await checklistModel.deleteChecklistItem(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
