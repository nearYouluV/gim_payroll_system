import { useNavigate } from 'react-router-dom';
import '../styles/AboutPage.css';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="page-title">About Me</h1>
          <p className="subtitle">Middle Python Developer | Backend & Data Scraping</p>
        </section>

        {/* Profile Section */}
        <section className="profile-section">
          <div className="profile-grid">
            <div className="profile-image-container">
              <img src="/ava.jpg" alt="near_you_luv" className="profile-image" />
              <div className="profile-badge">
                <span className="badge-label">Middle Developer</span>
              </div>
            </div>

            <div className="profile-info">
              <h2>Near You Luv</h2>
              <div className="info-item">
                <span className="label">Nickname:</span>
                <span className="value">near_you_luv</span>
              </div>
              <div className="info-item">
                <span className="label">Age:</span>
                <span className="value">20 years</span>
              </div>
              <div className="info-item">
                <span className="label">Experience:</span>
                <span className="value">3 years commercial</span>
              </div>
              <div className="info-item">
                <span className="label">Current Position:</span>
                <span className="value">Middle Python Developer at Beetroot</span>
              </div>
              <div className="info-item">
                <span className="label">Specialization:</span>
                <span className="value">Backend Development & Data Scraping</span>
              </div>

              <div className="social-section">
                <h3>Connect with me</h3>
                <div className="social-buttons">
                  <a href="https://github.com/nearYouluV" target="_blank" rel="noopener noreferrer" className="social-btn github">
                    <span className="icon">🐙</span> GitHub
                  </a>
                  <a href="https://beetroot.co/" target="_blank" rel="noopener noreferrer" className="social-btn beetroot">
                    <span className="icon">🎓</span> Beetroot
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <h2>About My Work</h2>
          <div className="about-content">
            <p>
              I'm a passionate Python developer with 3 years of commercial experience in backend development 
              and data scraping. Currently working at Beetroot Scraping Team as a Middle Python Developer, where I 
              continuously expand my skills and knowledge.
            </p>
            <p>
              My expertise includes building robust backend systems, web scraping solutions, and developing 
              RESTful APIs using modern frameworks like FastAPI and Django. I'm dedicated to writing clean, 
              maintainable code and solving complex problems efficiently.
            </p>
            <p>
              This Payroll System project demonstrates my full-stack development capabilities, combining 
              Python FastAPI backend with modern React frontend, showcasing both backend and frontend expertise.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section">
          <h2>Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Backend</h3>
              <ul>
                <li>Python 🐍</li>
                <li>FastAPI</li>
                <li>Django</li>
                <li>SQLAlchemy</li>
                <li>PostgreSQL</li>
              </ul>
            </div>
            <div className="skill-card">
              <h3>Data & Scraping</h3>
              <ul>
                <li>BeautifulSoup</li>
                <li>Scrapy</li>
                <li>Selenium</li>
                <li>Pandas</li>
                <li>Data Analysis</li>
              </ul>
            </div>
            <div className="skill-card">
              <h3>Frontend</h3>
              <ul>
                <li>React</li>
                <li>JavaScript</li>
                <li>CSS/SCSS</li>
                <li>Vite</li>
                <li>HTML5</li>
              </ul>
            </div>
            <div className="skill-card">
              <h3>DevOps & Tools</h3>
              <ul>
                <li>Docker</li>
                <li>Git</li>
                <li>Linux</li>
                <li>REST APIs</li>
                <li>CI/CD</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="video-section">
          <h2>Meet Beetroot Team</h2>
          <div className="video-container">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="video-description">
            Beetroot is a leading IT education platform where I'm constantly learning and growing. 
            They provide world-class training in web development, Python programming, and modern technologies.
          </p>
        </section>

        {/* Accordion Section */}
        <section className="accordion-section">
          <h2>Frequently Asked Questions</h2>
          <div className="accordion">
            <details className="accordion-item">
              <summary>What technologies do you primarily work with?</summary>
              <div className="accordion-content">
                <p>
                  I primarily work with Python for backend development, especially FastAPI and Django frameworks. 
                  For data scraping, I use BeautifulSoup and Scrapy. I also have frontend experience with React and JavaScript.
                </p>
              </div>
            </details>

            <details className="accordion-item">
              <summary>How many years of commercial experience do you have?</summary>
              <div className="accordion-content">
                <p>
                  I have 3 years of commercial experience in Python development, backend systems, and data scraping. 
                  I started when I was 17 and have been continuously improving my skills.
                </p>
              </div>
            </details>

            <details className="accordion-item">
              <summary>What is this Payroll System project?</summary>
              <div className="accordion-content">
                <p>
                  This is a full-stack payroll management system built with FastAPI (Python backend) and React (frontend). 
                  It demonstrates modern development practices including async database operations, Docker containerization, 
                  and responsive UI design.
                </p>
              </div>
            </details>

            <details className="accordion-item">
              <summary>How can I contact you?</summary>
              <div className="accordion-content">
                <p>
                  You can reach me through GitHub (github.com/nearYouluV) or find more information about me at Beetroot. 
                  I'm always open to discussing new projects and opportunities!
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* Back Button */}
        <div className="back-button-container">
          <button onClick={() => navigate('/dashboard')} className="btn-back">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
