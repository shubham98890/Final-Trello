# Trello Clone

A complete, fully functional Trello clone built with Node.js, Express, SQLite, and React with beautiful modern UI/UX design.

## 🎯 Features

✅ **Board Management** - Create, edit, and delete boards
✅ **Lists** - Organize cards into lists
✅ **Cards** - Create, edit, move, and delete cards  
✅ **Labels** - Color-coded labels for card categorization
✅ **Members** - Assign team members to cards
✅ **Checklists** - Add checklist items with progress tracking
✅ **Search & Filter** - Search by title/description and filter by label or member
✅ **Chatbot** - AI-powered chat assistant (mock responses)
✅ **Drag & Drop** - Smooth drag-and-drop for reordering lists and moving cards
✅ **Comments** - Add, edit, and delete comments on cards
✅ **Attachments** - Add file attachments to cards with delete capability
✅ **Modern UI/UX** - Beautiful gradient design, smooth animations, responsive layout
✅ **SQLite Database** - Persistent data storage

## 📦 Project Structure

```
trello-clone/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # SQLite database configuration
│   │   ├── controllers/           # Business logic for each feature
│   │   ├── routes/                # API routes
│   │   ├── models/                # Database operations
│   │   ├── middleware/            # Error handling
│   │   ├── utils/                 # Utility functions
│   │   ├── app.js                 # Express app setup
│   │   └── server.js              # Server entry point
│   ├── trello.db                  # SQLite database
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── pages/                 # Page components
│   │   ├── services/              # API service layer
│   │   ├── context/               # React context
│   │   ├── hooks/                 # Custom hooks
│   │   ├── styles/                # CSS styles
│   │   ├── App.jsx                # Main app component
│   │   └── main.jsx               # React entry point
│   ├── index.html                 # HTML template
│   ├── vite.config.js             # Vite configuration
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 14+ and npm (or yarn)
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   or for development with auto-reload:
   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. **In a new terminal, navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## 🎨 Features in Detail

### Board Management
- Create new boards with custom colors
- Edit board names and descriptions
- Delete boards

### Lists & Cards
- Add lists to organize work
- Create cards with titles and descriptions
- Edit card details
- Delete cards
- Move cards between lists (via drag-drop or manual update)

### 🎯 Drag & Drop (Core Feature)
- **Horizontal list reordering** - Drag lists left/right to reorder them
- **Vertical card movement** - Drag cards up/down within a list
- **Cross-list card transfer** - Drag cards between different lists
- **Smooth animations** - Visual feedback during drag operations
- **Position persistence** - All positions automatically saved to backend
- Powered by `react-beautiful-dnd` library

### Labels
- Create custom colored labels
- Add/remove labels from cards
- Filter cards by label
- 8 preset colors available

### Team Members
- Manage team members
- Assign members to cards
- Filter cards by assigned member
- Color-coded member avatars

### Checklists
- Create multiple checklists per card
- Add checklist items
- Mark items as complete
- Track progress percentage

### 💬 Comments (New!)
- Add comments to cards with rich text support
- Edit your own comments
- Delete comments
- View comment timestamps and author information
- User-friendly comment interface matching Trello design

### 📎 Attachments (New!)
- Add file attachments to cards
- View all attachments with file icons
- Direct download links to attachments
- Delete attachments when no longer needed
- Support for multiple file types (images, PDFs, docs, etc.)

### Search & Filter
- Search cards by title or description
- Filter by labels
- Filter by assigned members
- Filter by due date range

### Chatbot Assistant
- AI-powered chat assistant
- Helpful tips and tricks
- Minimize/maximize interface
- Real-time responses

### Modern UI/UX
- Gradient design with purple/blue theme
- Smooth animations and transitions
- Responsive layout (desktop, tablet, mobile)
- Clean, intuitive interface
- Loading states and error handling
- Toast notifications (ready to implement)

## 📚 API Endpoints

### Boards
- `GET /api/boards` - Get all boards
- `GET /api/boards/:id` - Get board by ID
- `POST /api/boards` - Create new board
- `PUT /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board

### Lists
- `GET /api/lists/board/:boardId` - Get lists by board
- `POST /api/lists` - Create list
- `PUT /api/lists/:id` - Update list
- `DELETE /api/lists/:id` - Delete list

### Cards
- `GET /api/cards/list/:listId` - Get cards by list
- `GET /api/cards/:id` - Get card details
- `POST /api/cards` - Create card
- `PUT /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete card
- `PUT /api/cards/:id/move` - Move card to another list

### Labels
- `GET /api/labels/board/:boardId` - Get board labels
- `POST /api/labels` - Create label
- `PUT /api/labels/:id` - Update label
- `DELETE /api/labels/:id` - Delete label
- `POST /api/labels/card/add` - Add label to card
- `POST /api/labels/card/remove` - Remove label from card

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member
- `POST /api/members/card/add` - Add member to card
- `POST /api/members/card/remove` - Remove member from card
- `GET /api/members/card/:cardId` - Get card members

### Checklists
- `GET /api/checklists/card/:cardId` - Get card checklists
- `POST /api/checklists` - Create checklist
- `DELETE /api/checklists/:id` - Delete checklist
- `POST /api/checklists/item` - Add checklist item
- `PUT /api/checklists/item/:id` - Update item
- `DELETE /api/checklists/item/:id` - Delete item

### Comments (New!)
- `GET /api/comments/card/:cardId` - Get card comments
- `POST /api/comments` - Create comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Attachments (New!)
- `GET /api/attachments/card/:cardId` - Get card attachments
- `POST /api/attachments` - Create attachment
- `DELETE /api/attachments/:id` - Delete attachment
- `GET /api/attachments/:id` - Get attachment details

### Search & Filter
- `GET /api/search/cards?boardId=X&query=Y` - Search cards
- `GET /api/search/filter/label?boardId=X&labelId=Y` - Filter by label
- `GET /api/search/filter/member?boardId=X&memberId=Y` - Filter by member
- `GET /api/search/filter/duedate?boardId=X&startDate=Y&endDate=Z` - Filter by date

### Chat
- `POST /api/chat/message` - Send chat message

## 🗄️ Database Schema

### Tables
- **boards** - Board information
- **lists** - Lists within boards
- **cards** - Cards within lists
- **labels** - Label definitions
- **card_labels** - Card-label relationships
- **members** - Team member information
- **card_members** - Card-member assignments
- **checklists** - Checklists on cards
- **checklist_items** - Items within checklists
- **comments** - Card comments (NEW!)
- **attachments** - File attachments on cards (NEW!)
- **activity_log** - Activity tracking for future features

## 🔧 Configuration

### Backend Environment
Create `.env` file in backend directory (optional):
```
PORT=5000
NODE_ENV=development
```

### Frontend API Configuration
API base URL is configured in `frontend/src/services/api.js`:
```javascript
const API_BASE = 'http://localhost:5000/api';
```

## 💻 Development

### Backend Technologies
- Express.js - Web framework
- SQLite3 - Database
- CORS - Cross-origin requests
- UUID - Unique IDs

### Frontend Technologies
- React 18 - UI library
- Vite - Build tool
- Axios - HTTP client
- CSS3 - Styling

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Usage Guide

1. **Create a Board** - Click "Create New Board" on the home page
2. **Add Lists** - Click "+ Add List" on the board
3. **Add Cards** - Click "+ Add Card" in any list
4. **Edit Cards** - Click a card to open the modal and edit details
5. **Add Labels** - Click on a card and select labels from available options
6. **Assign Members** - Click on a card and assign team members
7. **Search** - Use the search bar to find cards
8. **Filter** - Use the filter panel to filter by labels, members, or dates

## 📝 Future Enhancements

- Real-time collaboration with WebSockets
- Activity timeline
- Card attachments
- Actual AI chatbot integration
- User authentication
- Email notifications
- Export to PDF/Excel
- Custom card templates
- Power-ups/integrations

## 🔐 Security Notes

Current implementation is for development/demo purposes. For production:
- Add authentication & authorization
- Validate all inputs
- Use environment variables for sensitive data
- Add rate limiting
- Implement CORS more strictly
- Add input sanitization

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Ensure Node.js is installed
- Check npm dependencies: `npm install`

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check proxy configuration in vite.config.js
- Verify API_BASE URL in api.js

### Database issues
- Delete `trello.db` file to reset database
- Check file permissions in backend directory

## 📄 License

This is a learning project. Feel free to use and modify as needed.

## 👨‍💻 Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify both backend and frontend are running
3. Check network requests in browser DevTools
4. Review the API responses

## ✨ Tips

- Use the chatbot for feature guidance
- Hover over elements for tooltips
- Keyboard shortcut: Press Enter to add cards/items
- Press Esc to close modals

Happy Task Management! 🚀
#   T r e l l o  
 