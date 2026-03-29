import * as commentModel from '../models/commentModel.js';

export const getCommentsByCardId = async (req, res) => {
  try {
    const { cardId } = req.params;
    const comments = await commentModel.getCommentsByCardId(cardId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { cardId, memberId, text } = req.body;
    if (!cardId || !memberId || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const comment = await commentModel.createComment(cardId, memberId, text);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    const comment = await commentModel.updateComment(commentId, text);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const result = await commentModel.deleteComment(commentId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
