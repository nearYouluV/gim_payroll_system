export default function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="card">
          <h2>Employees</h2>
          <p>Manage employee information</p>
        </div>
        <div className="card">
          <h2>Payout Requests</h2>
          <p>View and process payout requests</p>
        </div>
      </div>
    </div>
  )
}
