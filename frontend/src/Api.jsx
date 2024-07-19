// src/api.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor to add the Authorization header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Assume token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Auth endpoints
export const login = (data) => api.post('/admin/login', data);

// Company endpoints
export const getCompanies = () => api.get('/admin/allCompanies');
export const addCompany = (data) => api.post('/admin/addcompany', data);
export const updateCompany = (id, data) => api.put(`/admin/updatecompany/${id}`, data);
export const deleteCompany = (id) => api.delete(`/admin/deletecompany/${id}`);

// Job endpoints
export const getJobs = () => api.get('/admin/alljobs');
export const addJob = (data) => api.post('/admin/addjob', data);
export const updateJob = (id, data) => api.put(`/admin/updatejob/${id}`, data);
export const deleteJob = (id) => api.delete(`/admin/deletejobs/${id}`);

