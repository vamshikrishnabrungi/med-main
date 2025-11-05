import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Building2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import workspacePreview from '@/images/Gemini_Generated_Image_ef9fx5ef9fx5ef9f.png';
import './LoginModal.css';

const defaultForm = {
  email: '',
  password: '',
  clinicId: '',
};

const LoginModal = ({ onClose, onSuccess }) => {
  const { login } = useAuth();
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const { email, password, clinicId } = form;

    if (!email || !password || !clinicId) {
      setIsSubmitting(false);
      setError('Please complete your email, password, and clinic ID to continue.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    window.setTimeout(() => {
      login({
        email,
        clinicId,
      });

      setForm(defaultForm);
      setShowPassword(false);
      setIsSubmitting(false);
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    }, 500);
  };

  return (
    <div className="login-overlay" role="dialog" aria-modal="true">
      <div className="login-modal">
        <button className="close-button" onClick={onClose} aria-label="Close login">
          <X size={18} />
        </button>
        <div className="login-content">
          <div className="login-form-panel">
            <div className="login-top-bar">
              <div className="login-logo">MedTrust ClinicOS</div>
            </div>
            <div className="login-header">
              <h2>Welcome back</h2>
              <p>Sign in to your MedTrust workspace.</p>
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
                <div className="input-with-action">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <label className="form-field">
                <span>Clinic ID</span>
                <div className="input-with-icon">
                  <Building2 size={18} />
                  <input
                    type="text"
                    name="clinicId"
                    value={form.clinicId}
                    onChange={handleChange}
                    placeholder="medtrust-hq"
                    autoComplete="organization"
                    required
                  />
                </div>
              </label>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in… 🔄' : 'Sign In to Workspace'}
              </button>

              <button type="button" className="link-button forgot-link">Forgot password?</button>
              <div className="trust-text">🔒 Secure login for medical practices</div>
            </form>

            <div className="login-divider" role="presentation" />
            <div className="new-practice">
              New practice? <Link to="/contact" className="link-inline">Create an account →</Link>
            </div>

            <div className="login-footer">
              <div className="compliance-text">SOC 2 • HIPAA • End-to-End Encryption</div>
              <div className="footer-links">
                <a href="#security" className="footer-link">Security</a>
                <a href="#privacy" className="footer-link">Privacy Policy</a>
                <a href="#terms" className="footer-link">Terms</a>
              </div>
            </div>
          </div>

          <div className="login-visual-panel" aria-hidden="true">
            <div className="visual-wordmark">MedTrust ClinicOS</div>
            <div className="visual-image">
              <img src={workspacePreview} alt="ClinicOS dashboard preview" />
            </div>
            <p className="visual-caption">Designed for clinicians who expect secure, seamless care coordination.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
