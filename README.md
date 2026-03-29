Trello Clone – Project Management Tool

A full-stack Kanban-style project management application inspired by modern task management tools like Trello.
This app allows users to manage boards, lists, and cards with advanced features like drag-and-drop, labels, checklists, and more.
<img width="1362" height="653" alt="Screenshot (133)" src="https://github.com/user-attachments/assets/5938013c-47e0-4c84-98c1-074ad9dccdb9" />
KEY CONCEPTS OF YOUR TRELLO CLONE
1.  Component-Based Architecture (Frontend)
 Your frontend is built using React components
<img width="1362" height="653" alt="Screenshot (133)" src="https://github.com/user-attachments/assets/22034477-1902-48b1-8094-237dad99932b" />

Concept:
UI is divided into reusable parts
Example:
Board → List → Card
Explanation (say this in interview):
“I used a component-based architecture where the board contains lists, and each list contains cards. This improves reusability and maintainability.”
2.State Management
You manage app data (boards, lists, cards) using state
<img width="1366" height="644" alt="Screenshot (134)" src="https://github.com/user-attachments/assets/1cb797c2-72a4-4dcb-8a69-0ece98debab9" />

Concept:
Data stored in useState / Context API
Why important:
UI updates automatically when data changes
Example:
Add card → state updates → UI refresh
3.  REST API Communication

 Frontend talks to backend using APIs
<img width="1366" height="653" alt="Screenshot (135)" src="https://github.com/user-attachments/assets/b8870db2-63c1-4ba8-a939-43ee9b533286" />

Concept:
HTTP methods:
GET → fetch data
POST → create
PUT → update
DELETE → remove
4.  Database Design (Most Important )

 You designed relational tables
<img width="1366" height="644" alt="Screenshot (134)" src="https://github.com/user-attachments/assets/fffcf774-78e2-4437-936d-918d8be8f4e1" />

Concept:
Tables + relationships
Example:
Cards belong to Lists
Many-to-many:
Cards ↔ Labels
Cards ↔ Members
5.  CRUD Operations
Core functionality

CRUD:
Create → add card
Read → view board
Update → edit card
Delete → remove card
<img width="1084" height="403" alt="Screenshot (136)" src="https://github.com/user-attachments/assets/071295b2-08aa-4134-a212-9fc7cb515ec4" />



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
