## Features

- Boards, Lists, and Cards management  
- Drag and Drop functionality  
- Labels for categorization  
- Member assignment  
- Checklists with progress tracking  
- Comments system  
- Attachments support  
- Search and Filter  
- Chatbot (mock implementation)  
- Responsive modern UI  
- SQLite database for persistence  

---

## Project Structure


trello-clone/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── models/
│ │ ├── config/
│ │ ├── middleware/
│ │ ├── utils/
│ │ ├── app.js
│ │ └── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── context/
│ │ ├── hooks/
│ │ ├── styles/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
└── README.md


---

## Tech Stack

### Backend
- Node.js
- Express.js
- SQLite

### Frontend
- React (Vite)
- Axios
- CSS3

---

## Getting Started

### Clone Repository

git clone https://github.com/shubham98890/Final-Trello.git

cd Final-Trello


---

### Backend Setup

cd backend
npm install
npm start


Runs on: http://localhost:5000

---

### Frontend Setup

cd frontend
npm install
npm run dev


Runs on: http://localhost:3000

---

## API Configuration

Update in `frontend/src/services/api.js`:

```js
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://final-trello-2.onrender.com/api";
API Endpoints
Feature	Endpoint
Boards	/api/boards
Lists	/api/lists
Cards	/api/cards
Labels	/api/labels
Members	/api/members
Checklists	/api/checklists
Comments	/api/comments
Attachments	/api/attachments
Search	/api/search
Chat	/api/chat
Deployment
Backend (Render)
Root Directory: backend
Start Command:
node src/server.js
Frontend (Netlify)
Build Command:
npm run build
Publish Directory:
frontend/dist
Common Issues
Cannot GET /

Use /api/... routes or add a root route in backend.

CORS Error
app.use(cors({ origin: "*" }));
API Not Working
Check API_BASE URL
Ensure backend is running
Future Improvements
Authentication system
Real-time updates
Dark mode
Activity logs
AI chatbot integration
License

This project is for learning purposes.

Author

Shubham Yadav

Support

Give a star if you like this project.


---
