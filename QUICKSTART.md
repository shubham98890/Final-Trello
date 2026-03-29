# 🚀 Quick Start Guide - Trello Clone

## Prerequisites
- Node.js 14+ with npm
- Windows/Mac/Linux

## Installation & Running

### Step 1: Start Backend Server

```bash
cd backend
npm install
npm start
```

✅ Backend runs on: **http://localhost:5000**  
✅ Health check: **http://localhost:5000/health**

### Step 2: Start Frontend Server (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend runs on: **http://localhost:3000**

### Step 3: Open Browser
Visit **http://localhost:3000** in your browser

---

## What You Can Do

### 📋 Boards
1. Click "Create New Board" on home page
2. Name your board
3. Click the board to open it

### 📝 Lists
1. Click "+ Add List" on board
2. Name your list
3. Click on list name to edit it

### 🎯 Cards
1. Click "+ Add Card" in any list
2. Enter card title
3. Click card to view/edit details
4. Manage labels, members, checklists, and due dates

### 🏷️ Labels
1. Click "Manage Labels" on board
2. Create labels with custom colors
3. Add labels to cards in card modal
4. Filter cards by labels

### 👥 Members
1. Create members (or use default ones)
2. Add members to cards in card modal
3. Filter cards by team member

### ☑️ Checklists
1. Open card details
2. Click "Add" in Checklists section
3. Name your checklist
4. Add items
5. Track progress

### 🔍 Search & Filter
1. Use search bar to find cards
2. Use filter panel for labels/members
3. Clear filters to see all cards

### 🤖 Chat Assistant
1. Click chatbot in bottom-right
2. Ask for help or tips
3. Minimize when not needed

---

## Default Data

When you first run the project, sample data is available:
- Sample board with lists
- Pre-created members
- Sample cards with labels

To seed the database with sample data, uncomment this line in `backend/src/server.js`:
```javascript
// await seedDatabase();
```

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Add Card | Enter (in add card input) |
| Add List | Enter (in add list input) |
| Close Modal | Esc key |
| Send Chat Message | Enter (in chat input) |

---

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is free
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm start
```

### Frontend won't connect
```bash
# Verify backend is running
curl http://localhost:5000/health
# Should see: {"status":"Server is running"}

# Check if port 3000 is free
# Clear frontend cache
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Database issues
```bash
# Reset database
# Delete backend/trello.db
# Restart backend server
npm start
```

---

## API Documentation

### Main Endpoints

**Boards**
- `GET /api/boards` - Get all boards
- `POST /api/boards` - Create board

**Lists**
- `GET /api/lists/board/:boardId` - Get lists
- `POST /api/lists` - Create list

**Cards**
- `GET /api/cards/list/:listId` - Get cards
- `POST /api/cards` - Create card
- `PUT /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete card

**Labels**
- `GET /api/labels/board/:boardId` - Get labels
- `POST /api/labels` - Create label
- `POST /api/labels/card/add` - Add to card

**Members**
- `GET /api/members` - Get all members
- `POST /api/members` - Create member
- `POST /api/members/card/add` - Add to card

**Search**
- `GET /api/search/cards?boardId=X&query=Y` - Search

---

## Development Tips

### Add Sample Board Via API

```bash
curl -X POST http://localhost:5000/api/boards \
  -H "Content-Type: application/json" \
  -d '{"name":"My Project","description":"Test board"}'
```

### Check Database
```bash
# Using sqlite3 CLI
sqlite3 backend/trello.db
> SELECT * FROM boards;
```

### View API Logs
Backend logs all requests to console showing operations.

---

## Project Structure

```
trello-clone/
├── backend/          ← Node.js server
│   └── src/
│       ├── config/   ← Database setup
│       ├── controllers/  ← Business logic
│       ├── models/   ← Database queries
│       └── routes/   ← API endpoints
│
├── frontend/         ← React app
│   └── src/
│       ├── components/  ← UI components
│       ├── pages/   ← Pages
│       ├── styles/  ← CSS
│       └── services/ ← API client
│
└── README.md         ← Full documentation
```

---

## Next Steps

1. ✅ Run backend: `npm start` (in backend folder)
2. ✅ Run frontend: `npm run dev` (in frontend folder)
3. ✅ Visit http://localhost:3000
4. ✅ Create a board and start using!
5. ✅ Explore all features

---

## Support

- Check README.md for detailed documentation
- Check PROJECT_VERIFICATION.md for feature list
- Browser console shows helpful error messages
- Backend console shows API logs

---

## Happy Task Management! 🎉

Enjoy using your Trello Clone!
