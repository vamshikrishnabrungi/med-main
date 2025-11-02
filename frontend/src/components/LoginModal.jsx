import React, { useEffect, useState } from 'react';
import { X, Building2, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import './LoginModal.css';

const defaultForm = {
  email: '',
  password: '',
  organization: '',
  fullName: '',
  accountType: 'multi-location',
};

const LoginModal = ({ onClose, onSuccess }) => {
  const { login } = useAuth();
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, organization, fullName, accountType } = form;

    if (!email || !password || !organization) {
      setError('Please complete your email, password, and organization details to continue.');
      return;
    }

    login({
      email,
      organization,
      name: fullName || 'Clinic Owner',
      accountType,
    });

    setForm(defaultForm);
    onClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="login-overlay" role="dialog" aria-modal="true">
      <div className="login-modal">
        <button className="close-button" onClick={onClose} aria-label="Close login">
          <X size={18} />
        </button>
        <div className="login-header">
          <div className="badge">
            <ShieldCheck size={18} /> Secure Tenant Access
          </div>
          <h2>Sign in to your ClinicOS workspace</h2>
          <p>Owners can onboard their teams, configure departments, and monitor activity in one place.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@clinic.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="form-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </label>

          <label className="form-field">
            <span>Hospital / Clinic name</span>
            <div className="input-with-icon">
              <Building2 size={18} />
              <input
                type="text"
                name="organization"
                value={form.organization}
                onChange={handleChange}
                placeholder="Aurora Care Network"
                autoComplete="organization"
                required
              />
            </div>
          </label>

          <label className="form-field">
            <span>Primary contact name (optional)</span>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Dr. Maya Srinivasan"
              autoComplete="name"
            />
          </label>

          <div className="practice-type">
            <span>Practice setup</span>
            <div className="toggle-group">
              <button
                type="button"
                className={form.accountType === 'multi-location' ? 'active' : ''}
                onClick={() => setForm((prev) => ({ ...prev, accountType: 'multi-location' }))}
              >
                Multi-location network
              </button>
              <button
                type="button"
                className={form.accountType === 'single-doctor' ? 'active' : ''}
                onClick={() => setForm((prev) => ({ ...prev, accountType: 'single-doctor' }))}
              >
                Independent doctor
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">
            Sign in &amp; Continue
          </button>
        </form>

        <div className="login-footer">
          <p>Need an account? <a href="#contact">Talk to our team →</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
