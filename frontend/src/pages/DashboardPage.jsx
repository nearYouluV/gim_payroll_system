import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="card" onClick={() => navigate('/employees')} style={{ cursor: 'pointer' }}>
          <h2>Employees</h2>
          <p>Manage employee information</p>
        </div>
        <div className="card" onClick={() => navigate('/payouts')} style={{ cursor: 'pointer' }}>
          <h2>Payout Requests</h2>
          <p>View and process payout requests</p>
        </div>
      </div>
    </div>
  )
}
