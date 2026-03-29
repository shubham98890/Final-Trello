import * as searchModel from '../models/searchModel.js';

export const searchCards = async (req, res) => {
  try {
    const { boardId, query } = req.query;
    if (!boardId || !query) return res.status(400).json({ error: 'boardId and query are required' });
    const cards = await searchModel.searchCards(boardId, query);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterByLabel = async (req, res) => {
  try {
    const { boardId, labelId } = req.query;
    if (!boardId || !labelId) return res.status(400).json({ error: 'boardId and labelId are required' });
    const cards = await searchModel.filterCardsByLabel(boardId, labelId);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterByMember = async (req, res) => {
  try {
    const { boardId, memberId } = req.query;
    if (!boardId || !memberId) return res.status(400).json({ error: 'boardId and memberId are required' });
    const cards = await searchModel.filterCardsByMember(boardId, memberId);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterByDueDate = async (req, res) => {
  try {
    const { boardId, startDate, endDate } = req.query;
    if (!boardId || !startDate || !endDate) {
      return res.status(400).json({ error: 'boardId, startDate, and endDate are required' });
    }
    const cards = await searchModel.filterCardsByDueDate(boardId, startDate, endDate);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
