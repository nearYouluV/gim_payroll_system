import api from './api'

export const authService = {
  register: (email, fullName, password) =>
    api.post('/auth/register', { email, full_name: fullName, password }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  logout: () => {
    localStorage.removeItem('access_token')
  },

  getToken: () => localStorage.getItem('access_token'),

  setToken: (token) => localStorage.setItem('access_token', token),
}
