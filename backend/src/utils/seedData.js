import { v4 as uuidv4 } from 'uuid';
import * as boardModel from '../models/boardModel.js';
import * as listModel from '../models/listModel.js';
import * as cardModel from '../models/cardModel.js';
import * as labelModel from '../models/labelModel.js';
import * as memberModel from '../models/memberModel.js';
import * as checklistModel from '../models/checklistModel.js';

export const seedDatabase = async () => {
  try {
    // Create sample board
    const board = await boardModel.createBoard('My Project', 'A sample project board', '#406FFF');
    const boardId = board.id;

    // Create lists
    const listTodo = await listModel.createList(boardId, 'To Do', 0);
    const listInProgress = await listModel.createList(boardId, 'In Progress', 1);
    const listDone = await listModel.createList(boardId, 'Done', 2);

    // Create labels
    const labelBug = await labelModel.createLabel(boardId, 'Bug', '#FF6B6B');
    const labelFeature = await labelModel.createLabel(boardId, 'Feature', '#4ECDC4');
    const labelDocs = await labelModel.createLabel(boardId, 'Documentation', '#45B7D1');

    // Create members
    const member1 = await memberModel.createMember('John Doe', 'john@example.com');
    const member2 = await memberModel.createMember('Jane Smith', 'jane@example.com');

    // Create cards for To Do
    const card1 = await cardModel.createCard(
      listTodo.id,
      boardId,
      'Setup project structure',
      'Initialize the project with basic folder structure',
      0
    );

    const card2 = await cardModel.createCard(
      listTodo.id,
      boardId,
      'Create database models',
      'Design and implement database schema',
      1
    );

    // Create cards for In Progress
    const card3 = await cardModel.createCard(
      listInProgress.id,
      boardId,
      'Build API endpoints',
      'Create REST API for all features',
      0
    );

    // Create cards for Done
    const card4 = await cardModel.createCard(
      listDone.id,
      boardId,
      'Setup Git repository',
      'Initialize version control',
      0
    );

    // Add labels to cards
    await labelModel.addLabelToCard(card1.id, labelFeature.id);
    await labelModel.addLabelToCard(card2.id, labelFeature.id);
    await labelModel.addLabelToCard(card3.id, labelBug.id);

    // Add members to cards
    await memberModel.addMemberToCard(card1.id, member1.id);
    await memberModel.addMemberToCard(card2.id, member2.id);
    await memberModel.addMemberToCard(card3.id, member1.id);
    await memberModel.addMemberToCard(card3.id, member2.id);

    // Add checklists
    const checklist1 = await checklistModel.createChecklist(card1.id, 'Setup Tasks');
    await checklistModel.addChecklistItem(checklist1.id, 'Create src folder');
    await checklistModel.addChecklistItem(checklist1.id, 'Create config folder');
    await checklistModel.addChecklistItem(checklist1.id, 'Create models folder');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
