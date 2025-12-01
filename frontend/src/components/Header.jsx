import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import '../styles/Header.css';

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <img src="/company_logo.png" alt="Beetroot" className="logo" />
          <h1 className="site-title">Payroll System</h1>
        </div>

        <nav className="navbar">
          <ul className="nav-links">
            {isAuthenticated && (
              <>
                <li><a onClick={() => navigate('/dashboard')} className="nav-link">Dashboard</a></li>
                <li><a onClick={() => navigate('/employees')} className="nav-link">Employees</a></li>
                <li><a onClick={() => navigate('/payouts')} className="nav-link">Payouts</a></li>
                <li><a onClick={() => navigate('/about')} className="nav-link">About Me</a></li>
                <li><a onClick={handleLogout} className="nav-link logout">Logout</a></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
