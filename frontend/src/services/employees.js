import api from './api'

export const employeeService = {
  getAll: (skip = 0, limit = 100) =>
    api.get('/employees', { params: { skip, limit } }),

  getById: (id) =>
    api.get(`/employees/${id}`),

  create: (data) =>
    api.post('/employees', data),

  update: (id, data) =>
    api.put(`/employees/${id}`, data),

  delete: (id) =>
    api.delete(`/employees/${id}`),
}
