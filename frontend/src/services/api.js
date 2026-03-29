import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Board API
export const boardAPI = {
  getAll: () => axios.get(`${API_BASE}/boards`),
  getById: (id) => axios.get(`${API_BASE}/boards/${id}`),
  create: (data) => axios.post(`${API_BASE}/boards`, data),
  update: (id, data) => axios.put(`${API_BASE}/boards/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/boards/${id}`),
};

// List API
export const listAPI = {
  getByBoardId: (boardId) => axios.get(`${API_BASE}/lists/board/${boardId}`),
  create: (data) => axios.post(`${API_BASE}/lists`, data),
  update: (id, data) => axios.put(`${API_BASE}/lists/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/lists/${id}`),
};

// Card API
export const cardAPI = {
  getByListId: (listId) => axios.get(`${API_BASE}/cards/list/${listId}`),
  getById: (id) => axios.get(`${API_BASE}/cards/${id}`),
  create: (data) => axios.post(`${API_BASE}/cards`, data),
  update: (id, data) => axios.put(`${API_BASE}/cards/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/cards/${id}`),
  move: (id, data) => axios.put(`${API_BASE}/cards/${id}/move`, data),
};

// Label API
export const labelAPI = {
  getByBoardId: (boardId) => axios.get(`${API_BASE}/labels/board/${boardId}`),
  create: (data) => axios.post(`${API_BASE}/labels`, data),
  update: (id, data) => axios.put(`${API_BASE}/labels/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/labels/${id}`),
  addToCard: (data) => axios.post(`${API_BASE}/labels/card/add`, data),
  removeFromCard: (data) => axios.post(`${API_BASE}/labels/card/remove`, data),
};

// Member API
export const memberAPI = {
  getAll: () => axios.get(`${API_BASE}/members`),
  create: (data) => axios.post(`${API_BASE}/members`, data),
  update: (id, data) => axios.put(`${API_BASE}/members/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/members/${id}`),
  addToCard: (data) => axios.post(`${API_BASE}/members/card/add`, data),
  removeFromCard: (data) => axios.post(`${API_BASE}/members/card/remove`, data),
  getCardMembers: (cardId) => axios.get(`${API_BASE}/members/card/${cardId}`),
};

// Checklist API
export const checklistAPI = {
  getByCardId: (cardId) => axios.get(`${API_BASE}/checklists/card/${cardId}`),
  create: (data) => axios.post(`${API_BASE}/checklists`, data),
  delete: (id) => axios.delete(`${API_BASE}/checklists/${id}`),
  addItem: (data) => axios.post(`${API_BASE}/checklists/item`, data),
  updateItem: (id, data) => axios.put(`${API_BASE}/checklists/item/${id}`, data),
  deleteItem: (id) => axios.delete(`${API_BASE}/checklists/item/${id}`),
};

// Search API
export const searchAPI = {
  searchCards: (boardId, query) => axios.get(`${API_BASE}/search/cards?boardId=${boardId}&query=${query}`),
  filterByLabel: (boardId, labelId) => axios.get(`${API_BASE}/search/filter/label?boardId=${boardId}&labelId=${labelId}`),
  filterByMember: (boardId, memberId) => axios.get(`${API_BASE}/search/filter/member?boardId=${boardId}&memberId=${memberId}`),
  filterByDueDate: (boardId, startDate, endDate) => axios.get(`${API_BASE}/search/filter/duedate?boardId=${boardId}&startDate=${startDate}&endDate=${endDate}`),
};

// Chat API
export const chatAPI = {
  sendMessage: (message) => axios.post(`${API_BASE}/chat/message`, { message }),
};

// Comment API
export const commentAPI = {
  getByCardId: (cardId) => axios.get(`${API_BASE}/comments/card/${cardId}`),
  create: (data) => axios.post(`${API_BASE}/comments`, data),
  update: (id, data) => axios.put(`${API_BASE}/comments/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/comments/${id}`),
};

// Attachment API
export const attachmentAPI = {
  getByCardId: (cardId) => axios.get(`${API_BASE}/attachments/card/${cardId}`),
  create: (data) => axios.post(`${API_BASE}/attachments`, data),
  delete: (id) => axios.delete(`${API_BASE}/attachments/${id}`),
  getById: (id) => axios.get(`${API_BASE}/attachments/${id}`),
};
