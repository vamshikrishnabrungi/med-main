import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const AIMedicalScribe = () => {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">AI Medical Scribe</h1>
          <p className="page-subtitle">The most advanced speech recognition models document the natural conversation between clinician and patient.</p>
          <Link to="/contact" className="btn-primary">Request a demo</Link>
        </div>
      </section>
      
      <section className="page-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Transform patient conversations into clinical notes</h2>
              <p>DeepScribe's AI medical scribe uses advanced speech recognition and natural language processing to capture every detail of your patient encounters.</p>
              <ul className="feature-list">
                <li>Real-time transcription</li>
                <li>HIPAA compliant</li>
                <li>Works with any specialty</li>
                <li>Integrates with major EHRs</li>
              </ul>
            </div>
            <div className="content-image">
              <img src="https://cdn.prod.website-files.com/65d79b481b4c5692f91141de/686ed447781aea4a20672b3e_Img.webp" alt="AI Medical Scribe" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIMedicalScribe;
