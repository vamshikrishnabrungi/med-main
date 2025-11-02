import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
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
              <span>DeepScribe</span>
            </div>
            <p className="footer-description">
              The Clinic OS that helps every practitioner document, track, and care better.
            </p>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <Link to="/#onboarding">Patient Onboarding</Link>
            <Link to="/#workspace">Doctor Workspace</Link>
            <Link to="/#prescriptions">Prescriptions</Link>
            <Link to="/#analytics">Treatment Analytics</Link>
            <Link to="/#followups">Follow-ups & Reminders</Link>
          </div>

          <div className="footer-col">
            <h4>Who We Serve</h4>
            <Link to="/#section-oncology">Single-Doctor Clinics</Link>
            <Link to="/#section-oncology">Multi-Clinics</Link>
            <Link to="/#section-oncology">Hospitals</Link>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="#">Careers</Link>
            <Link to="#">Press</Link>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <Link to="#">Blog</Link>
            <Link to="/klas">KLAS Report</Link>
            <Link to="#">Case Studies</Link>
            <Link to="/ehr-integrations">EHR Integrations</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>© 2025 DeepScribe. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
