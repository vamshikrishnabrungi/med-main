import React from 'react';
import './PageStyles.css';

const EHRIntegrations = () => {
  const ehrSystems = [
    { name: 'athenahealth', logo: 'https://cdn.prod.website-files.com/65d79b481b4c5692f91141de/686ecc0af9070ad3528ef112_athenahealth.svg' },
    { name: 'eClinicalWorks', logo: 'https://cdn.prod.website-files.com/65d79b481b4c5692f91141de/686ecc0a19929a771cecdd22_eClinicalWorks.svg' },
    { name: 'Epic', logo: 'https://cdn.prod.website-files.com/65d79b481b4c5692f91141de/686ecc0acb3bd43cb6997928_Epic.svg' },
    { name: 'Flatiron', logo: 'https://cdn.prod.website-files.com/65d79b481b4c5692f91141de/686ecc0a780bf6c94d43a47a_flatiron.svg' },
    { name: 'Ontada', logo: 'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/6895c9989f4c7608054657a7_ontada.png' },
    { name: 'ModMed', logo: 'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68c7f293775ddc6d8c59bea2_MM20-logo.svg' },
    { name: 'OMS', logo: 'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68c48d639dc8bee2a1854d40_oms%20logo.webp' },
  ];

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">EHR Integrations</h1>
          <p className="page-subtitle">DeepScribe seamlessly integrates with the most widely used electronic health record systems.</p>
        </div>
      </section>
      
      <section className="page-content">
        <div className="container">
          <div className="integrations-grid">
            {ehrSystems.map((ehr) => (
              <div key={ehr.name} className="integration-card">
                <img src={ehr.logo} alt={ehr.name} />
              </div>
            ))}
          </div>
          <div className="integration-info">
            <h2>Seamless, bidirectional integration</h2>
            <p>DeepScribe pulls patient data from your EHR and pushes completed notes back automatically, maintaining workflow efficiency.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EHRIntegrations;
