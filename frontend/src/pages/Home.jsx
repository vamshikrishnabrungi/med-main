import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '@/images/Gemini_Generated_Image_ef9fx5ef9fx5ef9f.png';
import onboardingImage from '@/images/patientonboarding.jpg';
import workspaceImage from '@/images/Gemini_Generated_Image_ix9gkuix9gkuix9g.png';
import prescriptionsImage from '@/images/Gemini_Generated_Image_18tnpp18tnpp18tn.png';
import analyticsImage from '@/images/Gemini_Generated_Image_tek8tek8tek8tek8.png';
import followupsImage from '@/images/Gemini_Generated_Image_obbwb1obbwb1obbw.png';
import continuityImage from '@/images/Gemini_Generated_Image_s19ft2s19ft2s19f.png';
import './Home.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const partners = [
    'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68552e7306ae7b1e6721ffba_logo-privia%201.png',
    'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68552e7306ae7b1e6721ffbe_logo-priority%20(1).png',
    'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68552e7406ae7b1e6721ffc1_texas-oncology-colored.svg',
    'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68552e7406ae7b1e6721ffc2_ochsner-alt.png',
    'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68552e7406ae7b1e6721ffc0_Commons-clinic-dark.svg',
    'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68552e7306ae7b1e6721ffbc_logo-covenant.png',
    'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68552e7306ae7b1e6721ffb7_MedCura-Health-Logo-Horizontal_Lockup-Color.svg',
    'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/68552e7406ae7b1e6721ffc4_Pearl-Health-Logo_color.svg',
  ];

  const ehrLogos = [
    'https://cdn.prod.website-files.com/65d79b481b4c5692f91141de/686ecc0af9070ad3528ef112_athenahealth.svg',
    'https://cdn.prod.website-files.com/65d79b481b4c5692f91141de/686ecc0a19929a771cecdd22_eClinicalWorks.svg',
    'https://cdn.prod.website-files.com/65d79b481b4c5692f91141de/686ecc0acb3bd43cb6997928_Epic.svg',
    'https://cdn.prod.website-files.com/65d79b481b4c5692f91141de/686ecc0a780bf6c94d43a47a_flatiron.svg',
    'https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/6895c9989f4c7608054657a7_ontada.png',
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section" id="section-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              More than clinic software.<br />
              <span className="text-blue">Built for effortless patient care.</span>
            </h1>
            <p className="hero-subtitle">
              A unified platform for doctors to document, track, and follow up — from the first visit to full recovery.
            </p>
            <Link to="/contact" className="btn-hero">Request a Demo →</Link>
            <p className="hero-tagline">Trusted by doctors and clinics who value simplicity and continuity.</p>
          </div>
          <div className="hero-mockup-container" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
            <img src={heroImage} alt="ClinicOS platform overview" className="hero-visual" />
          </div>
        </div>
      </section>

      {/* Partners Logo Carousel */}
      <section className="partners-section" id="section-partners">
        <div className="container partners-copy">
          <h2>Trusted by Clinics & Doctors</h2>
          <p>Trusted by specialists, multi-site practices, and care teams who value simplicity and continuity.</p>
        </div>
        <div className="partners-carousel">
          <div className="carousel-track">
            {[...partners, ...partners, ...partners].map((logo, index) => (
              <div key={index} className="partner-logo">
                <img src={logo} alt="Partner" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Features */}
      <section className="discover-section" id="section-discover">
        <div className="container">
          <h2 className="section-title-center">Discover the power of connected care</h2>
          
          <div className="features-grid">
            <div
              id="onboarding"
              className={`feature-card ${isVisible['section-discover'] ? 'fade-in-up' : ''}`}
            >
              <img src={onboardingImage} alt="Patient onboarding workflow" />
              <h3>Patient Onboarding</h3>
              <p>
                Register patients in seconds, upload diagnostic images, and create complete medical profiles with contact info, notes, and medical history — all securely stored.
              </p>
              <a href="#onboarding" className="feature-link">Explore Onboarding →</a>
            </div>

            <div
              id="workspace"
              className={`feature-card ${isVisible['section-discover'] ? 'fade-in-up' : ''}`}
              style={{ animationDelay: '0.1s' }}
            >
              <img src={workspaceImage} alt="Doctor reviewing patient timeline" />
              <h3>Doctor Workspace</h3>
              <p>
                View a patient’s entire timeline — visits, photos, treatment updates, and progress charts. Add clinical notes, track recovery stages, and issue digital prescriptions effortlessly.
              </p>
              <a href="#workspace" className="feature-link">Explore Workspace →</a>
            </div>

            <div
              id="prescriptions"
              className={`feature-card ${isVisible['section-discover'] ? 'fade-in-up' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              <img src={prescriptionsImage} alt="Digital prescriptions and medication tracking" />
              <h3>Prescriptions & Medication</h3>
              <p>
                Generate e-prescriptions with one click, sync directly with pharmacies, and track medication dispensing, refills, and status updates seamlessly.
              </p>
              <a href="#prescriptions" className="feature-link">Explore Prescriptions →</a>
            </div>

            <div
              id="analytics"
              className={`feature-card ${isVisible['section-discover'] ? 'fade-in-up' : ''}`}
              style={{ animationDelay: '0.3s' }}
            >
              <img src={analyticsImage} alt="Treatment progress analytics" />
              <h3>Treatment Progress & Analytics</h3>
              <p>
                Upload before-and-after images, record follow-up notes, and analyse improvement trends over time for dermatology, dental, ortho, and physiotherapy care.
              </p>
              <a href="#analytics" className="feature-link">Explore Analytics →</a>
            </div>

            <div
              id="followups"
              className={`feature-card ${isVisible['section-discover'] ? 'fade-in-up' : ''}`}
              style={{ animationDelay: '0.4s' }}
            >
              <img src={followupsImage} alt="Automated follow-ups and reminders" />
              <h3>Follow-ups & Reminders</h3>
              <p>
                Send automatic reminders for check-ups, follow-ups, and medicine refills via WhatsApp or SMS so patients stay engaged even after their visit.
              </p>
              <a href="#followups" className="feature-link">Explore Follow-ups →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Oncology Section */}
      <section className="oncology-section" id="section-oncology">
        <div className="container">
          <div className="oncology-content">
            <div className={`oncology-text ${isVisible['section-oncology'] ? 'slide-in-left' : ''}`}>
              <h2>Built for every kind of practitioner</h2>
              <p>Whether you’re managing a single consultation room or multiple departments, our Clinic OS adapts to your workflow — connecting doctors, patients, and care teams seamlessly.</p>
              <ul className="oncology-features">
                <li><strong>Dermatology:</strong> Track treatment progress with photos and dosage history.</li>
                <li><strong>Dentistry:</strong> Upload X-rays, update procedures, and record visits.</li>
                <li><strong>Physiotherapy:</strong> Monitor mobility improvements across sessions.</li>
                <li><strong>General Practice:</strong> Manage prescriptions, lab results, and follow-up visits.</li>
              </ul>
              <div className="oncology-actions">
                <Link to="/contact" className="btn-secondary">Request a Demo →</Link>
                <a href="#section-workflow" className="btn-link-dark">Learn More →</a>
              </div>
            </div>
            <div className={`oncology-image ${isVisible['section-oncology'] ? 'slide-in-right' : ''}`}>
              <img src={analyticsImage} alt="ClinicOS adapting to different specialties" />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow-section" id="section-workflow">
        <div className="container">
          <h2 className="section-title-center">Less work. Better outcomes.</h2>
          <p className="section-subtitle-center">From first registration to recovery tracking — automate patient engagement and focus on care, not paperwork.</p>
          
          <div className="workflow-grid">
            <div className={`workflow-card ${isVisible['section-workflow'] ? 'fade-in-up' : ''}`}>
              <h3>Pre-visit</h3>
              <ul>
                <li>Patient onboarding</li>
                <li>Scheduling</li>
                <li>Pre-visit reminders</li>
              </ul>
              <img src={onboardingImage} alt="Pre-visit preparation" />
            </div>

            <div className={`workflow-card ${isVisible['section-workflow'] ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
              <h3>During visit</h3>
              <ul>
                <li>Clinical notes</li>
                <li>Treatment plans</li>
                <li>Progress photos</li>
              </ul>
              <img src={workspaceImage} alt="During visit workspace" />
            </div>

            <div className={`workflow-card ${isVisible['section-workflow'] ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.4s' }}>
              <h3>Post-visit</h3>
              <ul>
                <li>Follow-up reminders</li>
                <li>Analytics dashboards</li>
                <li>Long-term progress reports</li>
              </ul>
              <img src={followupsImage} alt="Post-visit engagement" />
            </div>
          </div>
        </div>
      </section>

      {/* KLAS Score Section */}
      <section className="klas-section" id="section-klas">
        <div className="container">
          <div className="klas-content">
            <div className={`klas-text ${isVisible['section-klas'] ? 'fade-in' : ''}`}>
              <h3>Reliable care continuity, by design</h3>
              <p>Every visit, prescription, and update stays connected and verified—ensuring a complete and transparent record of patient care.</p>
            </div>
            <div className={`klas-score ${isVisible['section-klas'] ? 'fade-in' : ''}`}>
              <ul className="klas-highlights">
                <li>
                  <span className="highlight-metric">100%</span>
                  <span className="highlight-label">Patient-to-visit mapping</span>
                </li>
                <li>
                  <span className="highlight-metric">Real-time</span>
                  <span className="highlight-label">Pharmacy synchronization</span>
                </li>
                <li>
                  <span className="highlight-metric">Automated</span>
                  <span className="highlight-label">Update alerts & record validation</span>
                </li>
              </ul>
              <p className="klas-subtext">Built to keep every workflow—from registration to prescription—accurate, consistent, and clinically accountable.</p>
            </div>
          </div>
          <div className="klas-badges">
            <img src="https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/6855b43acb32fc16734be210_soc2.webp" alt="SOC2" />
            <img src="https://cdn.prod.website-files.com/68529e1f6436d005a0ac2c80/6855b50c1342de325aca6f7b_hipaa.svg" alt="HIPAA" />
          </div>
        </div>
      </section>

      {/* Context Awareness */}
      <section className="context-section" id="section-context">
        <div className="container">
          <div className="context-content">
            <div className={`context-image ${isVisible['section-context'] ? 'slide-in-left' : ''}`}>
              <img src={continuityImage} alt="Unified patient timeline" />
            </div>
            <div className={`context-text ${isVisible['section-context'] ? 'slide-in-right' : ''}`}>
              <span className="context-label">Continuity of care</span>
              <h2>End-to-end continuity of care</h2>
              <p>Every patient’s journey — from first visit to latest update — is visible in one unified timeline so doctors, staff, and patients stay connected through one shared, secure workspace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EHR Integrations */}
      <section className="ehr-section" id="section-ehr">
        <div className="container">
          <h3 className="ehr-title">Works with your stack</h3>
          <p className="ehr-description">Integrate WhatsApp Cloud API, Razorpay, and your preferred storage or EHR systems seamlessly.</p>
          <ul className="integrations-list">
            <li>WhatsApp Cloud API for notifications and reminders</li>
            <li>Razorpay for optional payments</li>
            <li>Google Drive or local storage for medical images</li>
            <li>EHR and clinic software integrations</li>
          </ul>
          <Link to="/ehr-integrations" className="btn-link-dark">See Integrations →</Link>
          <div className="ehr-logos">
            <div className="ehr-track">
              {[...ehrLogos, ...ehrLogos, ...ehrLogos].map((logo, index) => (
                <div key={index} className="ehr-logo">
                  <img src={logo} alt="EHR" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" id="section-testimonials">
        <div className="container">
          <h2 className="section-title-center">Chosen by doctors who care deeply about their patients</h2>
          <div className="testimonials-grid">
            <div className={`testimonial-card ${isVisible['section-testimonials'] ? 'fade-in-up' : ''}`}>
              <p>“I can easily track my dermatology patients’ progress with before-and-after photos.”</p>
              <div className="testimonial-author">
                <div>
                  <div className="author-name">Dr. Neha Kapoor</div>
                  <div className="author-title">Dermatologist</div>
                </div>
              </div>
            </div>

            <div className={`testimonial-card ${isVisible['section-testimonials'] ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
              <p>“My dental team now manages visits, notes, and X-rays in one place — no more spreadsheets.”</p>
              <div className="testimonial-author">
                <div>
                  <div className="author-name">Dr. Ravi Mehta</div>
                  <div className="author-title">Dentist</div>
                </div>
              </div>
            </div>

            <div className={`testimonial-card ${isVisible['section-testimonials'] ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.4s' }}>
              <p>“Automated reminders help my physiotherapy patients stay consistent with sessions.”</p>
              <div className="testimonial-author">
                <div>
                  <div className="author-name">Dr. Kavya Rao</div>
                  <div className="author-title">Physiotherapist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section" id="section-cta">
        <div className="cta-container">
          <div className={`cta-content ${isVisible['section-cta'] ? 'fade-in' : ''}`}>
            <h2>Simplify your medical practice. Strengthen patient relationships.</h2>
            <p>Start managing every visit, prescription, and progress update in one intelligent platform designed for long-term care.</p>
            <Link to="/contact" className="btn-cta">Get in Touch →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
