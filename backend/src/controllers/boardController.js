import * as boardModel from '../models/boardModel.js';
import * as listModel from '../models/listModel.js';

export const getAllBoards = async (req, res) => {
  try {
    const boards = await boardModel.getAllBoards();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBoardById = async (req, res) => {
  try {
    const board = await boardModel.getBoardWithLists(req.params.id);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBoard = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const board = await boardModel.createBoard(name, description, color);
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBoard = async (req, res) => {
  try {
    const { name, description, color, background_color, background_image } = req.body;
    const board = await boardModel.updateBoard(req.params.id, { 
      name, 
      description, 
      color,
      background_color,
      background_image
    });
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    await boardModel.deleteBoard(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
