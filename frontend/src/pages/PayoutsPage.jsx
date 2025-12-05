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
      const response = await api.get('/payout-requests');
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
      await api.put(`/payout-requests/${id}`, { status: 'approved' });
      fetchPayouts();
    } catch (err) {
      setError('Failed to approve payout');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/payout-requests/${id}`, { status: 'rejected' });
      fetchPayouts();
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
              <th>Reason</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map(payout => (
              <tr key={payout.id}>
                <td>{payout.id}</td>
                <td>{payout.employee_name || `#${payout.employee_id}`}</td>
                <td>${Number(payout.amount).toFixed(2)}</td>
                <td>
                  <span className={`status status-${payout.status}`}>
                    {payout.status}
                  </span>
                </td>
                <td>{payout.reason || '—'}</td>
                <td>{payout.created_at ? new Date(payout.created_at).toLocaleString() : '—'}</td>
                <td>
                  <button 
                    className="btn-small btn-approve" 
                    onClick={() => handleApprove(payout.id)}
                    disabled={payout.status === 'approved'}
                  >
                    Approve
                  </button>
                  <button 
                    className="btn-small btn-reject" 
                    onClick={() => handleReject(payout.id)}
                    disabled={payout.status === 'rejected'}
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
