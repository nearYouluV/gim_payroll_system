import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/FormPage.css';

export default function PayoutFormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_id: '',
    amount: '',
    reason: '',
  });

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to load employees');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        employee_id: parseInt(formData.employee_id),
        amount: parseFloat(formData.amount),
        reason: formData.reason,
        status: 'PENDING',
      };

      await api.post('/payout-requests', payload);
      navigate('/payouts');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create payout request');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>New Payout Request</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="employee_id">Employee *</label>
            <select
              id="employee_id"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              required
            >
              <option value="">Select an employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name} ({emp.employee_code})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason *</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              placeholder="Enter the reason for payout request"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Payout Request'}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/payouts')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
