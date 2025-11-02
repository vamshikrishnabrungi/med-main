import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const AICoding = () => {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">AI Coding</h1>
          <p className="page-subtitle">Automate complete and compliant coding with real-time insights and audit-ready documentation.</p>
          <Link to="/contact" className="btn-primary">Request a demo</Link>
        </div>
      </section>
      
      <section className="page-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Intelligent coding automation</h2>
              <p>Ensure proper reimbursement with AI-powered coding that captures the full complexity of each encounter.</p>
              <ul className="feature-list">
                <li>Automated ICD-10 and CPT coding</li>
                <li>HCC capture and optimization</li>
                <li>Real-time coding suggestions</li>
                <li>Audit-ready documentation</li>
              </ul>
            </div>
            <div className="content-image">
              <img src="https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/6895c7d2d08df7791bad18be_Img-1.webp" alt="AI Coding" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AICoding;
