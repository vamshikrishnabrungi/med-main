import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './Header.css';
import LoginModal from './LoginModal';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whoWeServeMenu = [
    { label: 'Oncology', path: '/specialties/oncology' },
  ];

  const handleLoginSuccess = () => {
    setShowLogin(false);
    navigate('/owner-dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="announcement-bar">
        <div className="announcement-content">
          <span>DeepScribe Wins Three Awards at 2025 KLAS Emerging Solutions Top 20 Event | Read More →</span>
        </div>
      </div>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <Link to="/" className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 12C2 12 4 8 7 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 6C7 6 10 4 12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 4C12 4 14 4 17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M17 6C17 6 20 8 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 12C22 12 20 16 17 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M17 18C17 18 14 20 12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 20C12 20 10 20 7 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 18C7 18 4 16 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="logo-text">DeepScribe</span>
          </Link>

          <nav className="nav-menu">
            <Link to="/solutions" className={`nav-link ${location.pathname === '/solutions' ? 'active' : ''}`}>
              SOLUTIONS
            </Link>

            <div 
              className="nav-item dropdown"
              onMouseEnter={() => setOpenDropdown('who-we-serve')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="nav-link">
                WHO WE SERVE <ChevronDown size={16} />
              </button>
              {openDropdown === 'who-we-serve' && (
                <div className="dropdown-menu">
                  {whoWeServeMenu.map((item) => (
                    <Link key={item.path} to={item.path} className="dropdown-item">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/customer-stories" className="nav-link">CUSTOMER STORIES</Link>
            <Link to="/resources" className="nav-link">RESOURCES</Link>
            <Link to="/about" className="nav-link">ABOUT</Link>
          </nav>

          <div className="header-actions">
            {user ? (
              <>
                <Link to="/owner-dashboard" className="btn-link">Dashboard</Link>
                <button className="btn-primary btn-logout" onClick={handleLogout}>Sign Out</button>
              </>
            ) : (
              <>
                <button className="btn-link" onClick={() => setShowLogin(true)}>SIGN IN</button>
                <Link to="/contact" className="btn-primary">GET STARTED</Link>
              </>
            )}
          </div>
        </div>
      </header>
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default Header;
