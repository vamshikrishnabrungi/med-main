import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const AIPreCharting = () => {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">AI Pre-charting</h1>
          <p className="page-subtitle">Walk into visits prepared, connected to the full context of care, and focused on what matters most.</p>
          <Link to="/contact" className="btn-primary">Request a demo</Link>
        </div>
      </section>
      
      <section className="page-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Start every visit prepared</h2>
              <p>AI pre-charting pulls together patient history, medications, lab results, and more before each appointment.</p>
              <ul className="feature-list">
                <li>Comprehensive patient summaries</li>
                <li>Medication reconciliation</li>
                <li>Lab and imaging review</li>
                <li>Problem list updates</li>
              </ul>
            </div>
            <div className="content-image">
              <img src="https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68961904131669e4742b87e5_Img-1.webp" alt="AI Pre-charting" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIPreCharting;
