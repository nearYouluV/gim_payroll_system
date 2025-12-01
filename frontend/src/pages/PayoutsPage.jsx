import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/PayoutsPage.css';

export default function PayoutsPage() {
  const navigate = useNavigate();
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/employees');
      // Extract payout requests from employees (if available)
      setPayouts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load payout requests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      // TODO: Implement approve endpoint
      console.log('Approve payout:', id);
    } catch (err) {
      setError('Failed to approve payout');
    }
  };

  const handleReject = async (id) => {
    try {
      // TODO: Implement reject endpoint
      console.log('Reject payout:', id);
    } catch (err) {
      setError('Failed to reject payout');
    }
  };

  return (
    <div className="payouts-page">
      <div className="page-header">
        <h1>Payout Requests</h1>
        <button className="btn-primary" onClick={() => navigate('/payouts/new')}>
          New Payout Request
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : payouts.length === 0 ? (
        <div className="empty-state">No payout requests found</div>
      ) : (
        <table className="payouts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map(payout => (
              <tr key={payout.id}>
                <td>{payout.id}</td>
                <td>{payout.full_name}</td>
                <td>${payout.salary.toFixed(2)}</td>
                <td>
                  <span className={`status status-${payout.is_active ? 'active' : 'inactive'}`}>
                    {payout.is_active ? 'Pending' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(payout.created_at).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn-small btn-approve" 
                    onClick={() => handleApprove(payout.id)}
                  >
                    Approve
                  </button>
                  <button 
                    className="btn-small btn-reject" 
                    onClick={() => handleReject(payout.id)}
                  >
                    Reject
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
