import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const DeepScribeAssist = () => {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">DeepScribe Assist</h1>
          <p className="page-subtitle">Key insights surface at the point of care, helping health systems achieve their most important quality and value-based goals.</p>
          <Link to="/contact" className="btn-primary">Request a demo</Link>
        </div>
      </section>
      
      <section className="page-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Intelligence at the point of care</h2>
              <p>Surface critical patient information and quality metrics during patient encounters to improve outcomes and capture value.</p>
              <ul className="feature-list">
                <li>Quality measure alerts</li>
                <li>Care gap identification</li>
                <li>HCC code suggestions</li>
                <li>Evidence-based recommendations</li>
              </ul>
            </div>
            <div className="content-image">
              <img src="https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/6895c899c7ac39d4fa305c58_Img-3.webp" alt="DeepScribe Assist" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeepScribeAssist;
