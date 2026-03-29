import * as memberModel from '../models/memberModel.js';

export const getAllMembers = async (req, res) => {
  try {
    const members = await memberModel.getAllMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMember = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
    const member = await memberModel.createMember(name, email);
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { name, email } = req.body;
    const member = await memberModel.updateMember(req.params.id, name, email);
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    await memberModel.deleteMember(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMemberToCard = async (req, res) => {
  try {
    const { cardId, memberId } = req.body;
    if (!cardId || !memberId) return res.status(400).json({ error: 'cardId and memberId are required' });
    await memberModel.addMemberToCard(cardId, memberId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeMemberFromCard = async (req, res) => {
  try {
    const { cardId, memberId } = req.body;
    if (!cardId || !memberId) return res.status(400).json({ error: 'cardId and memberId are required' });
    await memberModel.removeMemberFromCard(cardId, memberId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCardMembers = async (req, res) => {
  try {
    const members = await memberModel.getCardMembers(req.params.cardId);
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
