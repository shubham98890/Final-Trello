import * as attachmentModel from '../models/attachmentModel.js';

export const getAttachmentsByCardId = async (req, res) => {
  try {
    const { cardId } = req.params;
    const attachments = await attachmentModel.getAttachmentsByCardId(cardId);
    res.json(attachments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAttachment = async (req, res) => {
  try {
    const { cardId, fileName, fileUrl, fileSize, fileType } = req.body;
    if (!cardId || !fileName || !fileUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const attachment = await attachmentModel.createAttachment(
      cardId,
      fileName,
      fileUrl,
      fileSize,
      fileType
    );
    res.status(201).json(attachment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAttachment = async (req, res) => {
  try {
    const { attachmentId } = req.params;
    const result = await attachmentModel.deleteAttachment(attachmentId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAttachmentById = async (req, res) => {
  try {
    const { attachmentId } = req.params;
    const attachment = await attachmentModel.getAttachmentById(attachmentId);
    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found' });
    }
    res.json(attachment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
