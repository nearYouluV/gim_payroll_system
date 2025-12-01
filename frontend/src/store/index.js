import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('access_token'),
  isAuthenticated: !!localStorage.getItem('access_token'),

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('access_token', token)
    set({ token, isAuthenticated: !!token })
  },
  logout: () => {
    localStorage.removeItem('access_token')
    set({ user: null, token: null, isAuthenticated: false })
  },
}))

export const useEmployeeStore = create((set) => ({
  employees: [],
  loading: false,
  error: null,

  setEmployees: (employees) => set({ employees }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  addEmployee: (employee) =>
    set((state) => ({ employees: [...state.employees, employee] })),
  updateEmployee: (id, updated) =>
    set((state) => ({
      employees: state.employees.map((e) => (e.id === id ? updated : e)),
    })),
  removeEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((e) => e.id !== id),
    })),
}))
