import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import EmployeesPage from './pages/EmployeesPage'
import EmployeeFormPage from './pages/EmployeeFormPage'
import PayoutsPage from './pages/PayoutsPage'
import PayoutFormPage from './pages/PayoutFormPage'
import AboutPage from './pages/AboutPage'
import Header from './components/Header'
import Footer from './components/Footer'
import { useAuthStore } from './store'
import './App.css'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <BrowserRouter>
      <div className="app-layout">
        {isAuthenticated && <Header />}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/employees"
              element={
                <PrivateRoute>
                  <EmployeesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/employees/new"
              element={
                <PrivateRoute>
                  <EmployeeFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/employees/:id/edit"
              element={
                <PrivateRoute>
                  <EmployeeFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/payouts"
              element={
                <PrivateRoute>
                  <PayoutsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/payouts/new"
              element={
                <PrivateRoute>
                  <PayoutFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <AboutPage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
        {isAuthenticated && <Footer />}
      </div>
    </BrowserRouter>
  )
}
