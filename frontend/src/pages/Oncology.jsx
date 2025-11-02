import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const Oncology = () => {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Ambient AI for Oncology</h1>
          <p className="page-subtitle">With 1.3 million oncology visits captured per year, DeepScribe is the leading ambient system for cancer care.</p>
          <Link to="/contact" className="btn-primary">Request a demo</Link>
        </div>
      </section>
      
      <section className="page-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Purpose-built for oncology</h2>
              <p>Oncology-specific AI that understands the complexity of cancer care and longitudinal treatment.</p>
              <ul className="feature-list">
                <li>Comprehensive pre-charting for oncologists</li>
                <li>Context-aware documentation</li>
                <li>Automated interval history</li>
                <li>Treatment timeline tracking</li>
                <li>Chemotherapy protocol documentation</li>
              </ul>
            </div>
            <div className="content-image">
              <img src="https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68c49255b917eb3c98ddaa4a_oncology%20homepage.webp" alt="Oncology" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Oncology;
