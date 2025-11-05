import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  EyeOff,
  LogOut,
  MoreVertical,
  Pill,
  Plus,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import './OwnerDashboard.css';

const createDefaultBranch = () => ({
  id: Date.now() + Math.random(),
  name: 'Default Branch',
  city: '',
  contact: '',
  timezone: 'GMT',
});

const ROLE_OPTIONS = [
  { value: 'reception', label: 'Reception', loginPath: '/reception-login', icon: Users },
  { value: 'doctor', label: 'Doctor', loginPath: '/doctor-login', icon: Stethoscope },
  { value: 'pharmacy', label: 'Pharmacy', loginPath: '/pharmacy-login', icon: Pill },
];

const TIMEZONE_OPTIONS = ['GMT', 'GMT+5:30', 'GMT+1', 'GMT-5'];

const CLINIC_TYPE_LABELS = {
  multi: 'Multi-Clinic Network',
  independent: 'Independent Practice',
  'doctor-only': 'Doctor-Managed Clinic (Compact Mode)',
};

const GO_LIVE_CONFIG = {
  multi: {
    label: 'Go live — enter owner dashboard',
    route: '/dashboard',
    note: 'You can always add more branches or staff members later from Settings.',
  },
  independent: {
    label: 'Go live — enter clinic dashboard',
    route: '/clinic-dashboard',
    note: 'You can update staff access or add modules later from Settings.',
  },
  'doctor-only': {
    label: 'Go live — enter doctor workspace',
    route: '/doctor-dashboard',
    note: 'You can add a receptionist or pharmacy later from Settings → Staff Management.',
  },
};

const OwnerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [clinicType, setClinicType] = useState(null);
  const [modeNotice, setModeNotice] = useState('');

  const [soloClinic, setSoloClinic] = useState({
    name: '',
    location: '',
    contact: '',
    timezone: 'GMT',
  });
  const [soloErrors, setSoloErrors] = useState({});

  const [branches, setBranches] = useState([createDefaultBranch()]);
  const [branchErrors, setBranchErrors] = useState({});

  const [profiles, setProfiles] = useState([]);
  const [profileFeedback, setProfileFeedback] = useState('');
  const [profileError, setProfileError] = useState('');
  const [showLoginGuide, setShowLoginGuide] = useState(false);
  const [profileFilter, setProfileFilter] = useState('all');
  const [activeRowMenu, setActiveRowMenu] = useState(null);
  const [primaryBranchId, setPrimaryBranchId] = useState(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchToast, setLaunchToast] = useState(null);

  const [profileForm, setProfileForm] = useState({
    role: 'reception',
    fullName: '',
    username: '',
    password: '',
    showPassword: false,
    branch: 'Default Branch',
  });

  const requiredRoles = useMemo(
    () => (clinicType === 'doctor-only' ? [] : ['reception', 'doctor', 'pharmacy']),
    [clinicType],
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('default', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    [],
  );

  const totalBranches = clinicType === 'multi' ? branches.length : clinicType ? 1 : 0;

  const primaryBranchName = useMemo(() => {
    if (clinicType === 'multi') {
      if (!branches.length) return '—';
      const primary = branches.find((branch) => branch.id === primaryBranchId) || branches[0];
      if (!primary) return '—';
      return primary.name?.trim() ? primary.name : 'Unnamed Branch';
    }
    if (!clinicType) return '—';
    return soloClinic.name?.trim() ? soloClinic.name : 'Default Branch';
  }, [clinicType, branches, primaryBranchId, soloClinic.name]);

  const branchNames = useMemo(() => {
    if (clinicType === 'multi') {
      return branches.map((branch) => branch.name || 'Unnamed Branch');
    }
    const fallback = soloClinic.name?.trim() ? soloClinic.name : 'Default Branch';
    return [fallback];
  }, [clinicType, branches, soloClinic.name]);

  useEffect(() => {
    if (!clinicType) return;
    if (clinicType === 'multi') {
      if (branchNames.length > 0 && !branchNames.includes(profileForm.branch)) {
        const fallbackBranch = branchNames[0];
        setProfileForm((prev) => ({ ...prev, branch: fallbackBranch }));
      }
    } else if (clinicType === 'independent') {
      const soloBranch = soloClinic.name || 'Default Branch';
      if (profileForm.branch !== soloBranch) {
        setProfileForm((prev) => ({ ...prev, branch: soloBranch }));
      }
    }
  }, [clinicType, branchNames, soloClinic.name, profileForm.branch]);

  useEffect(() => {
    if (clinicType !== 'multi') {
      setPrimaryBranchId(null);
      return;
    }
    if (branches.length === 0) {
      setPrimaryBranchId(null);
      return;
    }
    const exists = primaryBranchId && branches.some((branch) => branch.id === primaryBranchId);
    if (!exists) {
      setPrimaryBranchId(branches[0].id);
    }
  }, [clinicType, branches, primaryBranchId]);

  useEffect(() => {
    if (!activeRowMenu) return;
    const handleClickAway = (event) => {
      if (
        !(event.target.closest && (event.target.closest('.profile-menu-button') || event.target.closest('.profile-menu')))
      ) {
        setActiveRowMenu(null);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveRowMenu(null);
      }
    };

    document.addEventListener('click', handleClickAway);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickAway);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeRowMenu]);

  const profilesByRole = useMemo(() => {
    const counts = Object.fromEntries(requiredRoles.map((role) => [role, 0]));
    profiles.forEach((profile) => {
      if (counts[profile.role] !== undefined) {
        counts[profile.role] += 1;
      }
    });
    return counts;
  }, [profiles, requiredRoles]);

  const clinicConfigured = useMemo(() => {
    if (!clinicType) return false;
    if (clinicType === 'multi') {
      return branches.every((branch) => branch.name && branch.city && branch.contact);
    }
    const hasName = Boolean(soloClinic.name.trim());
    const hasLocation = Boolean(soloClinic.location.trim());
    const hasContact = clinicType === 'doctor-only' ? true : Boolean(soloClinic.contact.trim());
    return hasName && hasLocation && hasContact;
  }, [clinicType, branches, soloClinic.name, soloClinic.location, soloClinic.contact]);

  const profilesComplete =
    requiredRoles.length === 0 ? true : requiredRoles.every((role) => profilesByRole[role] > 0);

  const launchReady = Boolean(clinicType && clinicConfigured && profilesComplete);
  const isDoctorManaged = clinicType === 'doctor-only';
  const totalSteps = clinicType === 'doctor-only' ? 2 : 3;
  const clinicTypeLabel = clinicType ? CLINIC_TYPE_LABELS[clinicType] ?? clinicType : '—';
  const goLiveConfig =
    clinicType && GO_LIVE_CONFIG[clinicType] ? GO_LIVE_CONFIG[clinicType] : GO_LIVE_CONFIG.multi;
  const showTeamSetup = Boolean(clinicType && clinicType !== 'doctor-only');
  const summaryItems = useMemo(() => {
    if (!clinicType) {
      return [
        { label: 'Clinic type', value: '—' },
        { label: 'Branches', value: '—' },
        { label: 'Team accounts', value: '—' },
      ];
    }

    const items = [{ label: 'Clinic type', value: clinicTypeLabel }];

    if (clinicType === 'multi') {
      const branchCountLabel = `${totalBranches} ${totalBranches === 1 ? 'branch' : 'branches'}`;
      items.push({ label: 'Branches', value: branchCountLabel });
      if (primaryBranchName && primaryBranchName !== '—') {
        items.push({ label: 'Primary branch', value: primaryBranchName });
      }
    } else {
      items.push({ label: 'Branch', value: primaryBranchName });
    }

    if (showTeamSetup) {
      const teamLabel =
        profiles.length > 0
          ? `${profiles.length} ${profiles.length === 1 ? 'account' : 'accounts'}`
          : 'Add reception, doctor, and pharmacy';
      items.push({ label: 'Team accounts', value: teamLabel });
    } else if (clinicType === 'doctor-only') {
      items.push({ label: 'Team accounts', value: 'None required' });
    }

    return items;
  }, [clinicType, clinicTypeLabel, totalBranches, primaryBranchName, showTeamSetup, profiles.length]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleClinicTypeSelection = (type) => {
    setClinicType(type);
    setCurrentStep(2);
    setLaunchToast(null);
    setIsLaunching(false);
    setProfileFeedback('');
    setProfileError('');
    setActiveRowMenu(null);
    setProfiles([]);
    setProfileFilter('all');
    setPrimaryBranchId(null);
    setSoloErrors({});
    setBranchErrors({});
    setProfileForm((prev) => ({
      ...prev,
      role: 'reception',
      fullName: '',
      username: '',
      password: '',
      showPassword: false,
    }));

    if (type === 'multi') {
      setModeNotice('You’ve selected Multi-Clinic Network. You can add branches in the next step.');
    } else if (type === 'independent') {
      setModeNotice('You’ve selected Independent Practice. Clinic details come next.');
    } else if (type === 'doctor-only') {
      setModeNotice(
        'You’ve selected Doctor-Managed Clinic (Compact Mode). You’ll configure a single workspace with no staff accounts.',
      );
    } else {
      setModeNotice('');
    }
  };

  const updateSoloField = (field, value) => {
    setSoloClinic((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddBranch = () => {
    setBranches((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: '',
        city: '',
        contact: '',
        timezone: 'GMT',
      },
    ]);
  };

  const handleBranchField = (id, field, value) => {
    setBranches((prev) => prev.map((branch) => (branch.id === id ? { ...branch, [field]: value } : branch)));
  };

  const handleRemoveBranch = (id) => {
    setBranches((prev) => {
      const next = prev.filter((branch) => branch.id !== id);
      if (primaryBranchId === id) {
        setPrimaryBranchId(next.length ? next[0].id : null);
      }
      return next;
    });
  };

  const validatePrimaryClinic = () => {
    const errors = {};
    if (!soloClinic.name.trim()) errors.name = 'Clinic name is required.';
    if (!soloClinic.location.trim()) errors.location = 'Location is required.';
    if (clinicType !== 'doctor-only' && !soloClinic.contact.trim()) errors.contact = 'Contact number is required.';
    setSoloErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateBranches = () => {
    const errors = {};
    branches.forEach((branch) => {
      const branchErrors = {};
      if (!branch.name.trim()) branchErrors.name = 'Branch name is required.';
      if (!branch.city.trim()) branchErrors.city = 'Location is required.';
      if (!branch.contact.trim()) branchErrors.contact = 'Contact number is required.';
      if (Object.keys(branchErrors).length) {
        errors[branch.id] = branchErrors;
      }
    });
    setBranchErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveClinicDetails = () => {
    if (clinicType === 'multi') {
      if (validateBranches()) {
        setCurrentStep(3);
      }
      return;
    }

    if (clinicType === 'independent' || clinicType === 'doctor-only') {
      if (validatePrimaryClinic()) {
        setCurrentStep(3);
      }
    }
  };

  const handleProfileInput = (field, value) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateProfile = (event) => {
    event.preventDefault();
    const trimmedName = profileForm.fullName.trim();
    const trimmedUsername = profileForm.username.trim().toLowerCase();
    const trimmedPassword = profileForm.password.trim();

    if (!trimmedName || !trimmedUsername || !trimmedPassword) {
      setProfileError('Full name, username, and password are required.');
      return;
    }

    if (profiles.some((profile) => profile.username.toLowerCase() === trimmedUsername)) {
      setProfileError('That username is already registered.');
      return;
    }

    const roleMeta = ROLE_OPTIONS.find((option) => option.value === profileForm.role) || ROLE_OPTIONS[0];

    const newProfile = {
      id: `${profileForm.role}-${Date.now()}`,
      fullName: trimmedName,
      username: trimmedUsername,
      password: trimmedPassword,
      branch: profileForm.branch,
      role: profileForm.role,
      loginPath: roleMeta.loginPath,
      status: 'Active',
      createdAt: new Date().toISOString(),
    };

    setProfiles((prev) => [...prev, newProfile]);
    setProfileFeedback(
      `Profile created for ${trimmedName} (${roleMeta.label}). They can log in at medtrust.app${roleMeta.loginPath}`,
    );
    setProfileError('');
    setProfileForm((prev) => ({
      ...prev,
      fullName: '',
      username: '',
      password: '',
      showPassword: false,
    }));
  };

  const filteredProfiles = useMemo(() => {
    if (profileFilter === 'all') {
      return profiles;
    }
    return profiles.filter((profile) => profile.role === profileFilter);
  }, [profiles, profileFilter]);

  const handleToggleProfileStatus = (id) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === id
          ? {
              ...profile,
              status: profile.status === 'Active' ? 'Deactivated' : 'Active',
            }
          : profile,
      ),
    );
  };

  const handleResetPassword = (id) => {
    const target = profiles.find((profile) => profile.id === id);
    if (target) {
      setProfileFeedback(`Password reset link sent to ${target.fullName} (${target.username}).`);
    }
    setActiveRowMenu(null);
  };

  const handleDownloadCredentials = () => {
    console.info('Download credentials requested', profiles);
  };

  const handleRowMenuToggle = (id) => {
    setActiveRowMenu((prev) => (prev === id ? null : id));
  };

  const handleLaunch = async () => {
    if (!launchReady || isLaunching) return;

    try {
      setIsLaunching(true);
      setLaunchToast({ message: 'Finalising your clinic workspace…', variant: 'info' });

      const doctorOwnerProfile = !showTeamSetup
        ? {
            id: user?.email ? `owner-${user.email}` : 'owner-doctor',
            fullName: user?.name || 'Clinic Owner',
            username: user?.email || 'owner',
            role: 'doctor',
            branch: primaryBranchName,
            status: 'Active',
          }
        : null;

      const payload = {
        clinicType,
        ownerId: user?.id || user?.email || null,
        clinicData:
          clinicType === 'multi'
            ? {
                branches: branches.map((branch) => ({
                  id: branch.id,
                  name: branch.name,
                  city: branch.city,
                  contact: branch.contact,
                  timezone: branch.timezone,
                  isPrimary: branch.id === primaryBranchId,
                })),
              }
            : {
                name: soloClinic.name,
                location: soloClinic.location,
                contact: soloClinic.contact,
                timezone: soloClinic.timezone,
              },
        teamProfiles:
          showTeamSetup && profiles.length
            ? profiles
            : doctorOwnerProfile
            ? [doctorOwnerProfile]
            : [],
      };

      let redirectPath = goLiveConfig.route || '/dashboard';
      let workspaceId = null;
      let clinicId = user?.clinicId || null;

      try {
        const response = await fetch('/api/setup/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Setup completion failed: ${response.status}`);
        }

        const data = await response.json();
        redirectPath = data?.redirect || redirectPath;
        workspaceId = data?.workspaceId || null;
        clinicId = data?.clinicId || clinicId;
      } catch (error) {
        console.error('Failed to finalise setup via API', error);
        setLaunchToast({
          message: 'Could not reach the setup service. Launching with local data…',
          variant: 'warning',
        });
      }

      if (typeof window !== 'undefined') {
        const workspacePayload = {
          workspaceId: workspaceId || `workspace-${Date.now()}`,
          clinicType,
          clinicId,
          role: 'owner',
        };
        window.localStorage.setItem('medtrust-workspace', JSON.stringify(workspacePayload));
        window.sessionStorage.setItem('medtrust-current-mode', clinicType);
        window.sessionStorage.setItem('medtrust-setup-complete', 'true');
      }

      setLaunchToast({
        message: '✅ Setup complete. Redirecting you to your dashboard…',
        variant: 'success',
      });

      window.setTimeout(() => {
        setIsLaunching(false);
        navigate(redirectPath);
      }, 1200);
    } catch (error) {
      console.error('Error while launching workspace', error);
      setLaunchToast({
        message: '⚠️ Something went wrong while launching. Please try again.',
        variant: 'error',
      });
      setIsLaunching(false);
    }
  };

  const handleResetSetup = () => {
    const confirmReset = window.confirm(
      'Reset setup and remove team profiles? Your clinic type and branch information will be cleared.',
    );
    if (!confirmReset) return;

    setClinicType(null);
    setModeNotice('');
    setCurrentStep(1);
    setSoloClinic({
      name: '',
      location: '',
      contact: '',
      timezone: 'GMT',
    });
    setSoloErrors({});
    setBranches([createDefaultBranch()]);
    setBranchErrors({});
    setProfiles([]);
    setProfileFeedback('');
    setProfileError('');
    setProfileFilter('all');
    setPrimaryBranchId(null);
    setLaunchToast(null);
    setIsLaunching(false);
    setProfileForm({
      role: 'reception',
      fullName: '',
      username: '',
      password: '',
      showPassword: false,
      branch: 'Default Branch',
    });
    setActiveRowMenu(null);
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

  return (
    <div className="owner-dashboard">
      <header className="wizard-header">
        <div className="wizard-logo">
          <Link to="/">MedTrust ClinicOS</Link>
          <nav aria-label="Breadcrumb">
            <span>Setup Wizard</span>
            <ArrowRight size={14} />
            <span>Clinic Configuration</span>
          </nav>
        </div>
        <div className="wizard-meta">
          <span className="step-tag">
            Step {Math.min(currentStep, totalSteps)} of {totalSteps}
          </span>
          <button className="header-logout" onClick={handleLogout}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <section className="setup-summary">
        <div>
          <h2>{clinicType ? 'You’re almost ready to launch' : 'Welcome to your clinic setup'}</h2>
          <p>
            Follow the steps below — it only takes a few minutes. You can return anytime to make updates.
          </p>
          {clinicType && <span className="mode-badge">Mode: {clinicTypeLabel}</span>}
        </div>
        <div className="summary-stats">
          <article>
            <span>Clinic type</span>
            <strong>{clinicTypeLabel}</strong>
          </article>
          <article>
            <span>Branches</span>
            <strong>{clinicType ? totalBranches : '—'}</strong>
          </article>
          <article>
            <span>Team profiles</span>
            <strong>{clinicType ? (showTeamSetup ? profiles.length : 'None required') : '—'}</strong>
          </article>
        </div>
      </section>

      <hr className="step-divider" aria-hidden="true" />

      <section className={`step-card ${currentStep === 1 ? 'active' : clinicType ? 'completed' : ''}`}>
        <header>
          <div>
            <h3>Step 1 · Choose your clinic type</h3>
            <p>Let’s start with how your clinic operates.</p>
          </div>
          {clinicType && (
            <button type="button" className="link-button" onClick={() => setCurrentStep(1)}>
              Edit selection
            </button>
          )}
        </header>
        {currentStep === 1 && (
          <div className="mode-grid">
            <article
              className={`mode-card ${clinicType === 'multi' ? 'selected' : ''}`}
              onClick={() => handleClinicTypeSelection('multi')}
            >
              <div className="mode-icon">🏥</div>
              <div className="mode-copy">
                <h4>Multi-Clinic Network</h4>
                <p>Manage multiple branches, each with its own reception, doctor, and pharmacy modules.</p>
                <p className="mode-benefit">✅ Best for hospitals or groups with dedicated staff per branch.</p>
              </div>
              <button type="button">Continue as Multi-Clinic</button>
            </article>

            <article
              className={`mode-card ${clinicType === 'independent' ? 'selected' : ''}`}
              onClick={() => handleClinicTypeSelection('independent')}
            >
              <div className="mode-icon">👩‍⚕️</div>
              <div className="mode-copy">
                <h4>Independent Practice</h4>
                <p>Run a single-clinic operation with simplified workflows and unified reporting.</p>
                <p className="mode-benefit">✅ Best for stand-alone practices with a receptionist and in-house pharmacy.</p>
              </div>
              <button type="button">Continue as Solo Practice</button>
            </article>

            <article
              className={`mode-card ${clinicType === 'doctor-only' ? 'selected' : ''}`}
              onClick={() => handleClinicTypeSelection('doctor-only')}
            >
              <div className="mode-icon">💼</div>
              <div className="mode-copy">
                <h4>Doctor-Managed Clinic (Compact Mode)</h4>
                <p>
                  Operate independently without a receptionist or pharmacy module. Handle registration, notes,
                  and prescriptions from one streamlined dashboard.
                </p>
                <p className="mode-benefit">✅ Best for small or visiting practices where the doctor manages end-to-end care.</p>
              </div>
              <button type="button">Continue as Doctor-Only Clinic</button>
            </article>
          </div>
        )}
        {modeNotice && <div className="inline-notice">✅ {modeNotice}</div>}
      </section>

      <hr className="step-divider" aria-hidden="true" />

      {clinicType && (
        <section className={`step-card ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
          <header>
            <div>
              <h3>
                {clinicType === 'multi'
                  ? 'Step 2 · Configure your branches'
                  : clinicType === 'doctor-only'
                  ? 'Step 2 · Set up your doctor-managed workspace'
                  : 'Step 2 · Set up your clinic details'}
              </h3>
              <p>
                {clinicType === 'multi'
                  ? 'List each branch so staff can be assigned to the correct locations.'
                  : clinicType === 'doctor-only'
                  ? 'You’ll run everything from a single workspace. Provide the essentials below to personalise it.'
                  : 'Tell us about your clinic so team members see accurate information.'}
              </p>
            </div>
            {clinicConfigured && (
              <button type="button" className="link-button" onClick={() => setCurrentStep(2)}>
                Edit details
              </button>
            )}
          </header>

          {currentStep === 2 && (
            <div className="details-body">
              {clinicType === 'multi' ? (
                <div className="branches-panel">
                  <table>
                    <thead>
                      <tr>
                        <th>Primary</th>
                        <th>Branch name</th>
                        <th>Location</th>
                        <th>Contact</th>
                        <th>Timezone</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {branches.map((branch) => {
                        const errors = branchErrors[branch.id] || {};
                        return (
                          <tr key={branch.id}>
                            <td className="primary-radio">
                              <input
                                type="radio"
                                name="primary-branch"
                                checked={primaryBranchId === branch.id}
                                onChange={() => setPrimaryBranchId(branch.id)}
                                aria-label={`Set ${branch.name || 'this branch'} as primary`}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={branch.name}
                                onChange={(event) => handleBranchField(branch.id, 'name', event.target.value)}
                              />
                              {errors.name && <small>{errors.name}</small>}
                            </td>
                            <td>
                              <input
                                type="text"
                                value={branch.city}
                                onChange={(event) => handleBranchField(branch.id, 'city', event.target.value)}
                              />
                              {errors.city && <small>{errors.city}</small>}
                            </td>
                            <td>
                              <input
                                type="tel"
                                value={branch.contact}
                                onChange={(event) => handleBranchField(branch.id, 'contact', event.target.value)}
                              />
                              {errors.contact && <small>{errors.contact}</small>}
                            </td>
                            <td>
                              <select
                                value={branch.timezone}
                                onChange={(event) => handleBranchField(branch.id, 'timezone', event.target.value)}
                              >
                                {TIMEZONE_OPTIONS.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              {branches.length > 1 && (
                                <button
                                  type="button"
                                  className="link-button"
                                  onClick={() => handleRemoveBranch(branch.id)}
                                >
                                  Remove
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <button type="button" className="link-button" onClick={handleAddBranch}>
                    + Add branch
                  </button>
                  <div className="step-actions">
                    <button type="button" className="primary" onClick={handleSaveClinicDetails}>
                      Save and continue
                    </button>
                    <button type="button" className="secondary" onClick={handleSaveClinicDetails}>
                      Continue → Team setup
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className="solo-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSaveClinicDetails();
                  }}
                >
                  <label>
                    <span>Clinic name</span>
                    <input
                      type="text"
                      value={soloClinic.name}
                      onChange={(event) => updateSoloField('name', event.target.value)}
                    />
                    {soloErrors.name && <small>{soloErrors.name}</small>}
                  </label>
                  <label>
                    <span>City / Location</span>
                    <input
                      type="text"
                      value={soloClinic.location}
                      onChange={(event) => updateSoloField('location', event.target.value)}
                    />
                    {soloErrors.location && <small>{soloErrors.location}</small>}
                  </label>
                  <label>
                    <span>{isDoctorManaged ? 'Contact number (optional)' : 'Contact number'}</span>
                    <input
                      type="tel"
                      value={soloClinic.contact}
                      onChange={(event) => updateSoloField('contact', event.target.value)}
                      placeholder={isDoctorManaged ? 'Add a number for patient follow-ups (optional)' : ''}
                    />
                    {!isDoctorManaged && soloErrors.contact && <small>{soloErrors.contact}</small>}
                  </label>
                  <label>
                    <span>Timezone</span>
                    <select
                      value={soloClinic.timezone}
                      onChange={(event) => updateSoloField('timezone', event.target.value)}
                    >
                      {TIMEZONE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="step-actions">
                    <button type="submit" className="primary">
                      Save and continue
                    </button>
                  </div>
                  {isDoctorManaged && (
                    <p className="mode-note">
                      You’re setting up a Doctor-Managed Clinic. You’ll handle appointments, notes, and prescriptions
                      directly — no receptionist or pharmacy modules.
                    </p>
                  )}
                </form>
              )}
            </div>
          )}
        </section>
      )}

      {showTeamSetup && <hr className="step-divider" aria-hidden="true" />}

      {showTeamSetup && (
        <section className={`step-card ${currentStep === 3 ? 'active' : ''}`}>
          <header>
            <div>
              <h3>Step 3 · Add your staff and assign their roles</h3>
              <p>Create reception, doctor, and pharmacy accounts so each member can log into their module.</p>
            </div>
          </header>

          <div className="profile-card">
            <form className="profile-form" onSubmit={handleCreateProfile}>
              <div className="form-grid">
                <label>
                  <span>Role</span>
                  <select
                    value={profileForm.role}
                    onChange={(event) => handleProfileInput('role', event.target.value)}
                  >
                    {ROLE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Full name</span>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(event) => handleProfileInput('fullName', event.target.value)}
                    placeholder="e.g. Dr. Neha Kapoor"
                  />
                </label>
                <label>
                  <span>Username</span>
                  <input
                    type="text"
                    value={profileForm.username}
                    onChange={(event) => handleProfileInput('username', event.target.value)}
                    placeholder="e.g. r.mehta or dr.kapoor"
                  />
                </label>
                <label className="password-field">
                  <span>Password</span>
                  <div className="password-input">
                    <input
                      type={profileForm.showPassword ? 'text' : 'password'}
                      value={profileForm.password}
                      onChange={(event) => handleProfileInput('password', event.target.value)}
                      placeholder="Temporary password — staff reset on first login"
                    />
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => handleProfileInput('showPassword', !profileForm.showPassword)}
                      aria-label={profileForm.showPassword ? 'Hide password' : 'Show password'}
                    >
                      {profileForm.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </label>
                {clinicType === 'multi' && (
                  <label>
                    <span>Branch / Location</span>
                    <select
                      value={profileForm.branch}
                      onChange={(event) => handleProfileInput('branch', event.target.value)}
                    >
                      {branchNames.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                {clinicType === 'independent' && (
                  <label>
                    <span>Branch / Location</span>
                    <input type="text" value={soloClinic.name || 'Default Branch'} disabled />
                  </label>
                )}
              </div>

              <div className="profile-actions">
                <button type="submit" className="primary">
                  <Plus size={18} /> Create profile
                </button>
                <button type="button" className="outline" onClick={handleDownloadCredentials}>
                  Download logins (PDF)
                </button>
                <button type="button" className="link-button" onClick={() => setShowLoginGuide(true)}>
                  Help / Login guide →
                </button>
              </div>

              <p className="profile-microcopy">
                Each staff member gets their own login. Reception → medtrust.app/reception-login · Doctor →
                medtrust.app/doctor-login · Pharmacy → medtrust.app/pharmacy-login.
              </p>
            </form>

            {profileFeedback && (
              <div className="profile-feedback">
                <p>{profileFeedback}</p>
                <div className="profile-feedback-actions">
                  <button type="button" className="primary" onClick={() => setProfileFeedback('')}>
                    Create another profile
                  </button>
                  <button
                    type="button"
                    className="outline"
                    onClick={() =>
                      document.getElementById('profiles-table')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  >
                    Go to team list
                  </button>
                </div>
              </div>
            )}

            {profileError && <div className="profile-error">⚠️ {profileError}</div>}

            <div className="profiles-table" id="profiles-table">
              <div className="profiles-table-header">
                <h4>Team accounts</h4>
                <span>{profiles.length} profile(s)</span>
              </div>
              <div className="profiles-toolbar">
                <label>
                  <span>Filter by role</span>
                  <select value={profileFilter} onChange={(event) => setProfileFilter(event.target.value)}>
                    <option value="all">All roles</option>
                    {requiredRoles.map((role) => (
                      <option key={role} value={role}>
                        {ROLE_OPTIONS.find((option) => option.value === role)?.label || role}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {profiles.length === 0 ? (
                <div className="empty-state">
                  <p>No profiles yet 👋</p>
                  <span>Start by adding your first staff member above.</span>
                </div>
              ) : filteredProfiles.length === 0 ? (
                <div className="empty-state">
                  <p>No profiles for this filter</p>
                  <span>Switch back to “All roles” to see every account.</span>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Branch</th>
                      <th>Status</th>
                      <th>Login page</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProfiles.map((profile) => {
                      const roleMeta = ROLE_OPTIONS.find((option) => option.value === profile.role);
                      const createdDisplay = profile.createdAt
                        ? dateFormatter.format(new Date(profile.createdAt))
                        : '—';
                      return (
                        <tr key={profile.id}>
                          <td>
                            <strong>{profile.fullName}</strong>
                            <span>{profile.username}</span>
                          </td>
                          <td>{roleMeta?.label || profile.role}</td>
                          <td>{profile.branch}</td>
                          <td className={`status ${profile.status === 'Active' ? 'active' : 'inactive'}`}>
                            {profile.status}
                          </td>
                          <td>
                            <a href={`https://medtrust.app${profile.loginPath}`} target="_blank" rel="noreferrer">
                              {profile.loginPath}
                            </a>
                          </td>
                          <td>{createdDisplay}</td>
                          <td className="profile-actions-cell">
                            <button
                              type="button"
                              className="profile-menu-button"
                              onClick={() => handleRowMenuToggle(profile.id)}
                              aria-haspopup="menu"
                              aria-expanded={activeRowMenu === profile.id}
                              aria-label="Open profile actions"
                            >
                              <MoreVertical size={16} />
                            </button>
                            {activeRowMenu === profile.id && (
                              <div className="profile-menu" role="menu">
                                <button type="button" onClick={() => handleResetPassword(profile.id)} role="menuitem">
                                  Reset password
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleToggleProfileStatus(profile.id);
                                    setActiveRowMenu(null);
                                  }}
                                  role="menuitem"
                                >
                                  {profile.status === 'Active' ? 'Deactivate profile' : 'Activate profile'}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      )}

      {launchToast && (
        <div className={`launch-toast ${launchToast.variant || 'info'}`} role="status">
          {launchToast.message}
        </div>
      )}

      <section className="completion-summary">
        <div className="summary-card">
          <div>
            <h4>Setup summary</h4>
            <p>Confirm these details before going live. You can adjust any section above if needed.</p>
          </div>
          <ul>
            {summaryItems.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
          {isDoctorManaged && (
            <p className="summary-note">
              You’re setting up a Doctor-Managed Clinic. No additional staff accounts are required.
            </p>
          )}
        </div>
        <div className="completion-actions">
          <button
            type="button"
            className="primary"
            disabled={!launchReady || isLaunching}
            onClick={handleLaunch}
          >
            {isLaunching ? 'Launching…' : goLiveConfig.label}
          </button>
          <button type="button" className="outline" onClick={handleResetSetup}>
            Reset setup
          </button>
        </div>
        {!launchReady && (
          <p className="launch-note">
            {showTeamSetup
              ? 'Complete the steps above — including creating reception, doctor, and pharmacy accounts — to launch your workspace.'
              : 'Complete the steps above to launch your workspace.'}
          </p>
        )}
        {launchReady && (
          <p className="launch-note success">{goLiveConfig.note}</p>
        )}
      </section>

      <aside className="support-card" aria-label="Onboarding assistance">
        <div>
          <h3>Need help with onboarding?</h3>
          <p>Talk to an implementation expert and get set up faster.</p>
        </div>
        <Link to="/contact" className="support-link">
          Talk to an implementation expert
          <ArrowRight size={16} />
        </Link>
      </aside>

      <footer className="dashboard-footer">
        © 2025 MedTrust ClinicOS · SOC 2 · HIPAA · End-to-End Encryption
      </footer>

      {showLoginGuide && (
        <div className="wizard-modal" role="dialog" aria-modal="true">
          <div className="wizard-modal-card details">
            <h3>Team login guide</h3>
            <p>Share these URLs with your staff along with their username.</p>
            <ul className="login-guide-list">
              <li>
                <strong>Reception:</strong> medtrust.app/reception-login
              </li>
              <li>
                <strong>Doctor:</strong> medtrust.app/doctor-login
              </li>
              <li>
                <strong>Pharmacy:</strong> medtrust.app/pharmacy-login
              </li>
            </ul>
            <p className="login-guide-note">
              Password policy: 10+ characters, one uppercase letter, one number, and one special character. Staff reset it on first login.
            </p>
            <div className="modal-actions">
              <button type="button" className="primary" onClick={() => setShowLoginGuide(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
