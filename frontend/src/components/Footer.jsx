import { useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Payroll System. All rights reserved.</p>
        <p>
          © <a onClick={() => navigate('/about')} className="author-link">near_you_luv</a>
        </p>
        <div className="social-links">
          <a href="https://github.com/nearYouluV" target="_blank" rel="noopener noreferrer" className="social-icon">
            GitHub
          </a>
          <a href="https://beetroot.co/" target="_blank" rel="noopener noreferrer" className="social-icon">
            Beetroot
          </a>
        </div>
      </div>
    </footer>
  );
}
