import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import '../styles/FormPage.css';

export default function EmployeeFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    employee_code: '',
    full_name: '',
    email: '',
    position: '',
    salary: '',
    is_active: true,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingEmployee, setLoadingEmployee] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await api.get(`/employees/${id}`);
      const employee = response.data;
      setFormData({
        employee_code: employee.employee_code,
        full_name: employee.full_name,
        email: employee.email,
        position: employee.position,
        salary: employee.salary.toString(),
        is_active: employee.is_active,
      });
    } catch (err) {
      setError('Failed to load employee data');
      console.error(err);
    } finally {
      setLoadingEmployee(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        salary: parseFloat(formData.salary),
      };

      if (isEdit) {
        await api.put(`/employees/${id}`, payload);
      } else {
        await api.post('/employees', payload);
      }

      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save employee');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>{isEdit ? 'Edit Employee' : 'Add New Employee'}</h1>

        {error && <div className="error-message">{error}</div>}

        {loadingEmployee ? (
          <div className="loading">Loading employee data...</div>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="employee_code">Employee Code *</label>
              <input
                type="text"
                id="employee_code"
                name="employee_code"
                value={formData.employee_code}
                onChange={handleChange}
                required
                placeholder="e.g., EMP001"
                readOnly={isEdit}
                disabled={isEdit}
              />
              {isEdit && <small style={{ color: '#999', marginTop: '5px' }}>Cannot be changed</small>}
            </div>

            <div className="form-group">
              <label htmlFor="full_name">Full Name *</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="Employee full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="employee@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position *</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                placeholder="e.g., Developer"
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary *</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              <label htmlFor="is_active">Active</label>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? 'Saving...' : isEdit ? 'Update' : 'Add Employee'}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate('/employees')}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
