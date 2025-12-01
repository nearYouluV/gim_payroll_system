import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/EmployeesPage.css';

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await api.get('/employees');
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/employees/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/employees/${id}`);
        setEmployees(employees.filter(e => e.id !== id));
      } catch (err) {
        setError('Failed to delete employee');
      }
    }
  };

  return (
    <div className="employees-page">
      <div className="page-header">
        <h1>Employees</h1>
        <button className="btn-primary" onClick={() => navigate('/employees/new')}>
          Add Employee
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : employees.length === 0 ? (
        <div className="empty-state">No employees found</div>
      ) : (
        <table className="employees-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.employee_code}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>${emp.salary.toFixed(2)}</td>
                <td>{emp.is_active ? 'Active' : 'Inactive'}</td>
                <td>
                  <button 
                    className="btn-small btn-edit" 
                    onClick={() => handleEdit(emp.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-small btn-delete" 
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
}
