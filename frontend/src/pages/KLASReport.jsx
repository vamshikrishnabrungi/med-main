import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const KLASReport = () => {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">KLAS Research Report</h1>
          <p className="page-subtitle">DeepScribe achieves top scores in KLAS Spotlight Report on Ambient Clinical Intelligence</p>
        </div>
      </section>
      
      <section className="page-content">
        <div className="container">
          <div className="klas-report-content">
            <div className="klas-score-large">
              <div className="score-display">
                <span className="score-number">98.8</span>
                <span className="score-label">out of 100</span>
              </div>
              <p className="score-desc">Overall Performance Score</p>
            </div>
            
            <div className="klas-highlights">
              <h2>Key Highlights</h2>
              <ul className="feature-list">
                <li>Highest overall performance score in ambient clinical intelligence</li>
                <li>98% of providers would recommend DeepScribe</li>
                <li>Superior accuracy and context awareness</li>
                <li>Exceptional customer support ratings</li>
                <li>Fastest time to value</li>
              </ul>
            </div>

            <div className="klas-badges-large">
              <img src="https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/6855b43acb32fc16734be210_soc2.webp" alt="SOC2" />
              <img src="https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/6855b50c1342de325aca6f7b_hipaa.svg" alt="HIPAA" />
            </div>

            <div className="klas-cta">
              <Link to="/contact" className="btn-primary">Request the full report</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KLASReport;
