import axios from "axios";

// 🔥 Dynamic Base URL (Dev + Production)
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://final-trello-2.onrender.com/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
});


// ===================== BOARD API =====================
export const boardAPI = {
  getAll: () => api.get("/boards"),
  getById: (id) => api.get(`/boards/${id}`),
  create: (data) => api.post("/boards", data),
  update: (id, data) => api.put(`/boards/${id}`, data),
  delete: (id) => api.delete(`/boards/${id}`),
};


// ===================== LIST API =====================
export const listAPI = {
  getByBoardId: (boardId) => api.get(`/lists/board/${boardId}`),
  create: (data) => api.post("/lists", data),
  update: (id, data) => api.put(`/lists/${id}`, data),
  delete: (id) => api.delete(`/lists/${id}`),
};


// ===================== CARD API =====================
export const cardAPI = {
  getByListId: (listId) => api.get(`/cards/list/${listId}`),
  getById: (id) => api.get(`/cards/${id}`),
  create: (data) => api.post("/cards", data),
  update: (id, data) => api.put(`/cards/${id}`, data),
  delete: (id) => api.delete(`/cards/${id}`),
  move: (id, data) => api.put(`/cards/${id}/move`, data),
};


// ===================== LABEL API =====================
export const labelAPI = {
  getByBoardId: (boardId) => api.get(`/labels/board/${boardId}`),
  create: (data) => api.post("/labels", data),
  update: (id, data) => api.put(`/labels/${id}`, data),
  delete: (id) => api.delete(`/labels/${id}`),
  addToCard: (data) => api.post("/labels/card/add", data),
  removeFromCard: (data) => api.post("/labels/card/remove", data),
};


// ===================== MEMBER API =====================
export const memberAPI = {
  getAll: () => api.get("/members"),
  create: (data) => api.post("/members", data),
  update: (id, data) => api.put(`/members/${id}`, data),
  delete: (id) => api.delete(`/members/${id}`),
  addToCard: (data) => api.post("/members/card/add", data),
  removeFromCard: (data) => api.post("/members/card/remove", data),
  getCardMembers: (cardId) => api.get(`/members/card/${cardId}`),
};


// ===================== CHECKLIST API =====================
export const checklistAPI = {
  getByCardId: (cardId) => api.get(`/checklists/card/${cardId}`),
  create: (data) => api.post("/checklists", data),
  delete: (id) => api.delete(`/checklists/${id}`),
  addItem: (data) => api.post("/checklists/item", data),
  updateItem: (id, data) => api.put(`/checklists/item/${id}`, data),
  deleteItem: (id) => api.delete(`/checklists/item/${id}`),
};


// ===================== SEARCH API =====================
export const searchAPI = {
  searchCards: (boardId, query) =>
    api.get(`/search/cards?boardId=${boardId}&query=${query}`),

  filterByLabel: (boardId, labelId) =>
    api.get(`/search/filter/label?boardId=${boardId}&labelId=${labelId}`),

  filterByMember: (boardId, memberId) =>
    api.get(`/search/filter/member?boardId=${boardId}&memberId=${memberId}`),

  filterByDueDate: (boardId, startDate, endDate) =>
    api.get(
      `/search/filter/duedate?boardId=${boardId}&startDate=${startDate}&endDate=${endDate}`
    ),
};


// ===================== CHAT API =====================
export const chatAPI = {
  sendMessage: (message) => api.post("/chat/message", { message }),
};


// ===================== COMMENT API =====================
export const commentAPI = {
  getByCardId: (cardId) => api.get(`/comments/card/${cardId}`),
  create: (data) => api.post("/comments", data),
  update: (id, data) => api.put(`/comments/${id}`, data),
  delete: (id) => api.delete(`/comments/${id}`),
};


// ===================== ATTACHMENT API =====================
export const attachmentAPI = {
  getByCardId: (cardId) => api.get(`/attachments/card/${cardId}`),
  create: (data) => api.post("/attachments", data),
  delete: (id) => api.delete(`/attachments/${id}`),
  getById: (id) => api.get(`/attachments/${id}`),
};