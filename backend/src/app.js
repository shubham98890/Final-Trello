import express from 'express';
import cors from 'cors';
import boardRoutes from './routes/boardRoutes.js';
import listRoutes from './routes/listRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import labelRoutes from './routes/labelRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import checklistRoutes from './routes/checklistRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import attachmentRoutes from './routes/attachmentRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/boards', boardRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/labels', labelRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/checklists', checklistRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/attachments', attachmentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling
app.use(errorHandler);

export default app;
