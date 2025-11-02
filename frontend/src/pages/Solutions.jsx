import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const Solutions = () => {
  const modules = [
    {
      id: 'patient-management',
      title: '1. Patient Management',
      description:
        'Centralize all patient information — demographics, contact details, medical records, photos, and visit summaries. Search, filter, and access instantly from any device.',
    },
    {
      id: 'clinical-notes',
      title: '2. Clinical Notes & Treatment Plans',
      description:
        'Write structured notes faster. Customize templates for each specialty, record vitals, attach images, and maintain consistent, shareable care plans.',
    },
    {
      id: 'prescriptions-tracking',
      title: '3. Prescriptions & Medicine Tracking',
      description:
        'Create digital prescriptions in one click. Automatically notify pharmacies and patients, and track refill status to ensure continuity of care.',
    },
    {
      id: 'treatment-progress',
      title: '4. Treatment Progress & Image Tracking',
      description:
        'Upload progress images, tag them by date or treatment stage, and compare side-by-side results. Ideal for dermatology, dental, ortho, and physiotherapy workflows.',
    },
    {
      id: 'scheduling-reminders',
      title: '5. Scheduling & Reminders',
      description:
        'Integrated scheduling with automatic WhatsApp or SMS notifications for appointments, follow-ups, and long-term treatment reminders.',
    },
    {
      id: 'reports-analytics',
      title: '6. Reports & Analytics',
      description:
        'View insights into active patients, returning visits, and treatment outcomes. Monitor practice efficiency and patient adherence over time.',
    },
    {
      id: 'team-management',
      title: '7. Team Management (Optional)',
      description:
        'Invite staff or assistants with role-based access. Doctors focus on patients while receptionists manage bookings and communications — securely and collaboratively.',
    },
    {
      id: 'integrations',
      title: '8. Integrations',
      description:
        'Plug into your existing tools: WhatsApp, Razorpay, or EHR systems. Keep all workflows connected with zero disruption.',
    },
  ];

  return (
    <div className="page solutions-page">
      <section className="page-hero solutions-hero">
        <div className="container">
          <h1 className="page-title">Solutions for every stage of care.</h1>
          <p className="page-subtitle">
            Our modular system fits the unique needs of every healthcare setup — from solo practitioners to multi-specialty hospitals. Choose the modules you need and scale effortlessly.
          </p>
          <div className="page-hero-actions">
            <Link to="/contact" className="btn-primary">Request a Demo</Link>
            <Link to="/contact" className="btn-secondary-outline">Book a Free Consultation</Link>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="solutions-list">
            {modules.map((module) => (
              <article key={module.id} id={module.id} className="solution-block">
                <h2>{module.title}</h2>
                <p>{module.description}</p>
              </article>
            ))}
          </div>

          <div className="solutions-cta">
            <h2>Experience the new era of connected patient care.</h2>
            <div className="solutions-cta-actions">
              <Link to="/contact" className="btn-primary">Request a Demo</Link>
              <Link to="/contact" className="btn-secondary-outline">Book a Free Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
