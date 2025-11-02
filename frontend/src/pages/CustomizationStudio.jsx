import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const CustomizationStudio = () => {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Customization Studio</h1>
          <p className="page-subtitle">DeepScribe intuitively learns your style and voice, evolves as you go, and gives you nearly limitless options to fine tune every detail.</p>
          <Link to="/contact" className="btn-primary">Request a demo</Link>
        </div>
      </section>
      
      <section className="page-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Your notes, your way</h2>
              <p>Customize every aspect of your clinical notes to match your unique practice style and specialty requirements.</p>
              <ul className="feature-list">
                <li>Custom note templates</li>
                <li>Specialty-specific vocabularies</li>
                <li>Personalized abbreviations</li>
                <li>Style preferences</li>
              </ul>
            </div>
            <div className="content-image">
              <img src="https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68faaaccb72b57662eb9bd54_home%20page.webp" alt="Customization" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomizationStudio;
