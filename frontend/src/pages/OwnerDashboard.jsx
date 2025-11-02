import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  LogOut,
  Pill,
  Plus,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [practiceMode, setPracticeMode] = useState(user?.accountType || 'multi-location');
  const [selectedRole, setSelectedRole] = useState('receptionists');
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '' });
  const [team, setTeam] = useState({
    receptionists: [],
    doctors: [],
    pharmacy: [],
  });

  const roleConfig = useMemo(
    () => ({
      receptionists: {
        title: 'Reception & Intake',
        description: 'Perfect for front-desk staff handling patient onboarding, scheduling, and billing follow-ups.',
        icon: Users,
        gradient: 'role-card reception',
        onboarding: [
          'Collect patient intake forms digitally',
          'Manage queues and waiting room updates',
          'Coordinate follow-up reminders with WhatsApp',
        ],
      },
      doctors: {
        title: 'Doctor Workspace',
        description: 'Full clinical context with patient histories, notes, analytics, and prescription workflows.',
        icon: Stethoscope,
        gradient: 'role-card doctor',
        onboarding: [
          'Review complete visit timelines and media',
          'Capture SOAP notes with AI assistance',
          'Issue digital prescriptions instantly',
        ],
      },
      pharmacy: {
        title: 'Pharmacy & Inventory',
        description: 'Track prescription fulfilment, batch inventory, and verify dispensing compliance.',
        icon: Pill,
        gradient: 'role-card pharmacy',
        onboarding: [
          'Sync prescriptions from doctors in real-time',
          'Manage stock thresholds and expiries',
          'Issue WhatsApp-ready medication receipts',
        ],
      },
    }),
    []
  );

  const handleAddMember = (event) => {
    event.preventDefault();
    const trimmedName = newMember.name.trim();
    const trimmedEmail = newMember.email.trim();

    if (!trimmedName || !trimmedEmail) {
      return;
    }

    setTeam((prev) => ({
      ...prev,
      [selectedRole]: [
        ...prev[selectedRole],
        {
          id: `${selectedRole}-${Date.now()}`,
          name: trimmedName,
          email: trimmedEmail,
          phone: newMember.phone.trim(),
        },
      ],
    }));

    setNewMember({ name: '', email: '', phone: '' });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <section className="owner-dashboard guest-state">
        <div className="guest-card">
          <ShieldCheck size={36} />
          <h1>Sign in to manage your clinic</h1>
          <p>Access secure tools to configure teams, monitor visits, and coordinate care seamlessly.</p>
          <Link to="/" className="guest-button">
            Return to homepage
          </Link>
        </div>
      </section>
    );
  }

  const SelectedIcon = roleConfig[selectedRole].icon;

  return (
    <div className="owner-dashboard">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Tenant Owner Workspace</div>
          <h1>
            Welcome back, <span>{user.name || 'Clinic Owner'}</span>
          </h1>
          <p>
            You are managing {user.organization || 'your clinic'} as a {practiceMode === 'single-doctor' ? 'solo practitioner' : 'multi-location network'}.
            Build your care team, monitor activity, and keep every patient journey connected.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => setPracticeMode('multi-location')}>
              Configure multi-location setup
              <ArrowRight size={16} />
            </button>
            <button className="secondary" onClick={() => setPracticeMode('single-doctor')}>
              Streamline independent practice
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <div className="hero-metric-card">
          <div className="metric-header">
            <Building2 size={24} />
            <span>{user.organization || 'ClinicOS Tenant'}</span>
          </div>
          <div className="metric-body">
            <div>
              <p>Active locations</p>
              <strong>{practiceMode === 'single-doctor' ? '1' : '3'}</strong>
            </div>
            <div>
              <p>Team members onboarded</p>
              <strong>
                {team.receptionists.length + team.doctors.length + team.pharmacy.length || 0}
              </strong>
            </div>
            <div>
              <p>Care pathways configured</p>
              <strong>{practiceMode === 'single-doctor' ? 'Solo Flow' : 'Reception → Doctor → Pharmacy'}</strong>
            </div>
          </div>
          <button className="logout" onClick={handleLogout}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </section>

      <section className="setup-grid">
        <article className={`setup-card ${practiceMode === 'multi-location' ? 'active' : ''}`}>
          <header>
            <Users size={24} />
            <div>
              <h2>Multi-location network</h2>
              <p>Distribute roles across branches, sync appointments, and oversee billing across cities.</p>
            </div>
          </header>
          <ul>
            <li>Role-based access controls mapped to departments</li>
            <li>Shared patient profiles &amp; audit-ready visit logs</li>
            <li>Central analytics for volume, revenue, and follow-ups</li>
          </ul>
        </article>

        <article className={`setup-card ${practiceMode === 'single-doctor' ? 'active' : ''}`}>
          <header>
            <Stethoscope size={24} />
            <div>
              <h2>Independent practice</h2>
              <p>Use receptionist-lite flows, single doctor console, and lightweight pharmacy handoff.</p>
            </div>
          </header>
          <ul>
            <li>Quick patient intake with digital signatures</li>
            <li>AI-assisted note templates tailored to your specialty</li>
            <li>WhatsApp-based prescription fulfilment for nearby pharmacies</li>
          </ul>
        </article>

        <article className="setup-card">
          <header>
            <ClipboardCheck size={24} />
            <div>
              <h2>Owner checklist</h2>
              <p>Track onboarding progress to keep your teams ready for launch.</p>
            </div>
          </header>
          <ul className="checklist">
            <li className={team.receptionists.length > 0 ? 'done' : ''}>Invite reception lead</li>
            <li className={team.doctors.length > 0 ? 'done' : ''}>Connect doctor workspace</li>
            <li className={team.pharmacy.length > 0 ? 'done' : ''}>Enable pharmacy fulfilment</li>
            <li>Configure WhatsApp messaging templates</li>
            <li>Review audit log retention policies</li>
          </ul>
        </article>
      </section>

      <section className="role-section">
        <div className="role-sidebar">
          {Object.entries(roleConfig).map(([key, config]) => (
            <button
              key={key}
              className={`role-toggle ${selectedRole === key ? 'active' : ''}`}
              onClick={() => setSelectedRole(key)}
            >
              <config.icon size={20} />
              {config.title}
            </button>
          ))}
        </div>

        <div className="role-content">
          <div className={`role-hero ${roleConfig[selectedRole].gradient}`}>
            <div className="role-hero-text">
              <h3>{roleConfig[selectedRole].title}</h3>
              <p>{roleConfig[selectedRole].description}</p>
              <ul>
                {roleConfig[selectedRole].onboarding.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="role-hero-icon">
              <SelectedIcon size={48} />
            </div>
          </div>

          <form className="member-form" onSubmit={handleAddMember}>
            <h4>Add a team member</h4>
            <div className="form-grid">
              <label>
                <span>Full name</span>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(event) => setNewMember((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="e.g. Priya Kapoor"
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(event) => setNewMember((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="name@clinic.com"
                />
              </label>
              <label>
                <span>Phone (optional)</span>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(event) => setNewMember((prev) => ({ ...prev, phone: event.target.value }))}
                  placeholder="+1 555 012 3456"
                />
              </label>
            </div>
            <button type="submit" className="add-button">
              <Plus size={18} /> Invite to {roleConfig[selectedRole].title}
            </button>
          </form>

          <div className="team-list">
            <div className="team-list-header">
              <h4>Team roster</h4>
              <span>{team[selectedRole].length} member(s)</span>
            </div>
            {team[selectedRole].length === 0 ? (
              <div className="empty-state">
                <p>No team members added yet.</p>
                <span>Add your first colleague to unlock collaborative workflows.</span>
              </div>
            ) : (
              <ul>
                {team[selectedRole].map((member) => (
                  <li key={member.id}>
                    <div>
                      <strong>{member.name}</strong>
                      <span>{member.email}</span>
                    </div>
                    {member.phone && <span className="phone">{member.phone}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div>
          <h3>Need help configuring integrations?</h3>
          <p>Our specialists can connect EHRs, labs, and pharmacy partners tailored to your clinic footprint.</p>
        </div>
        <Link to="/contact" className="cta-button">
          Talk to an implementation expert
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
};

export default OwnerDashboard;
