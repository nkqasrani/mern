import api from './api';

// Authentication
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getMe = () => api.get('/auth/me');
export const updateDetails = (data) => api.put('/auth/updatedetails', data);
export const updatePassword = (data) => api.put('/auth/updatepassword', data);

// Projects
export const getProjects = (params) => api.get('/projects', { params });
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const addTeamMember = (id, data) => api.post(`/projects/${id}/members`, data);
export const removeTeamMember = (id, userId) => api.delete(`/projects/${id}/members/${userId}`);

// Tasks
export const getTasks = (params) => api.get('/tasks', { params });
export const getTask = (id) => api.get(`/tasks/${id}`);
export const createTask = (data) => api.post('/tasks', data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const addComment = (id, data) => api.post(`/tasks/${id}/comments`, data);
export const getTaskStats = () => api.get('/tasks/stats/overview');

// Users
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
