import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const defaultClinic = {
  name: 'Sunrise Clinic',
  type: 'Doctor-Managed Clinic (Compact Mode)',
  branches: 1,
  owner: 'Dr. Arjun Mehta',
  createdOn: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
  workspaceId: 'MT-CLINIC-0425',
};

const defaultLinks = [
  { role: 'Reception', url: 'https://medtrust.app/reception-login', credentials: 'receptionist.username', notes: 'Use your created password' },
  { role: 'Doctor', url: 'https://medtrust.app/doctor-login', credentials: 'dr.neha', notes: 'Owner can reset anytime' },
  { role: 'Pharmacy', url: 'https://medtrust.app/pharmacy-login', credentials: 'pharma.sunrise', notes: 'Linked to Sunrise branch' },
];

export default function OwnerSummary() {
  const navigate = useNavigate();
  const query = useQuery();

  const clinicType = query.get('clinicType') || defaultClinic.type;
  const isDoctorManaged = /doctor-managed/i.test(clinicType);

  const clinic = {
    name: query.get('clinicName') || defaultClinic.name,
    type: clinicType,
    branches: Number(query.get('branches') || defaultClinic.branches),
    owner: query.get('owner') || defaultClinic.owner,
    createdOn: query.get('createdOn') || defaultClinic.createdOn,
    workspaceId: query.get('workspaceId') || defaultClinic.workspaceId,
  };

  const teamLinks = defaultLinks;

  const copyAllLinks = async () => {
    const text = teamLinks
      .map(l => `${l.role}: ${l.url} | ${l.credentials} | ${l.notes}`)
      .join('\n');
    try {
      await navigator.clipboard.writeText(text);
      alert('All login links copied to clipboard.');
    } catch (e) {
      alert('Copy failed. You can select and copy manually.');
    }
  };

  const downloadPdf = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-10 text-left">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">🎉 Setup Complete — Your Clinic Workspace Is Live!</h1>
        <p className="text-gray-700">You’ve successfully configured MedTrust ClinicOS for your practice. Here’s a summary of your workspace and quick links for your team.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="border rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4">🧱 Clinic Summary</h2>
          <div className="space-y-2 text-gray-800">
            <div className="flex justify-between"><span>Clinic Name</span><span className="font-medium">{clinic.name}</span></div>
            <div className="flex justify-between"><span>Clinic Type</span><span className="font-medium">{clinic.type}</span></div>
            <div className="flex justify-between"><span>Branches</span><span className="font-medium">{clinic.branches}</span></div>
            <div className="flex justify-between"><span>Owner</span><span className="font-medium">{clinic.owner}</span></div>
            <div className="flex justify-between"><span>Created On</span><span className="font-medium">{clinic.createdOn}</span></div>
            <div className="flex justify-between"><span>Workspace ID</span><span className="font-medium">{clinic.workspaceId}</span></div>
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4">✉️ Go-Live Confirmation</h2>
          <p className="text-gray-700 mb-4">A summary email can be sent to the owner with login links and a downloadable PDF sheet for onboarding.</p>
          <button onClick={downloadPdf} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">📎 Download Login Guide (PDF)</button>
        </div>
      </div>

      {!isDoctorManaged ? (
        <div className="border rounded-lg p-5 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">👥 Team Access Links</h2>
            <button onClick={copyAllLinks} className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-500">Copy All Links</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Role</th>
                  <th className="p-2">Login URL</th>
                  <th className="p-2">Credentials</th>
                  <th className="p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {teamLinks.map((l, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{l.role}</td>
                    <td className="p-2"><a href={l.url} className="text-blue-600 underline" target="_blank" rel="noreferrer">{l.url}</a></td>
                    <td className="p-2">{l.credentials}</td>
                    <td className="p-2">{l.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-5 mb-8">
          <h2 className="text-xl font-semibold mb-2">👩‍⚕️ Doctor Dashboard Activated</h2>
          <p className="text-gray-700 mb-4">You’re now managing your clinic directly from your Doctor Workspace.</p>
          <button onClick={() => navigate('/owner-dashboard')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Enter Doctor Dashboard →</button>
          <p className="text-gray-600 text-sm mt-3">You can add staff or pharmacy later in Settings → Team Management.</p>
        </div>
      )}

      <div className="border rounded-lg p-5 mb-8">
        <h2 className="text-xl font-semibold mb-4">🧭 Next Steps</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate('/owner-dashboard')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Enter Clinic Dashboard</button>
          {!isDoctorManaged && (
            <button onClick={() => navigate('/owner-dashboard?tab=team')} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">Invite Team Members →</button>
          )}
          <button onClick={() => navigate('/owner-dashboard?tab=notifications')} className="px-4 py-2 bg-gray-100 text-gray-900 rounded border hover:bg-gray-50">Configure WhatsApp & Notifications →</button>
        </div>
      </div>

      <div className="bg-gray-50 text-gray-800 border border-gray-200 rounded-lg p-5">
        <h3 className="font-semibold mb-2">🔐 Security Reminder</h3>
        <p className="text-sm">All team accounts are encrypted and role-based. For best security, ask each staff member to change their password at first login.</p>
      </div>
    </div>
  );
}


