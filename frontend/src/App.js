import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AIMedicalScribe from './pages/AIMedicalScribe';
import AIPreCharting from './pages/AIPreCharting';
import AICoding from './pages/AICoding';
import CustomizationStudio from './pages/CustomizationStudio';
import DeepScribeAssist from './pages/DeepScribeAssist';
import Oncology from './pages/Oncology';
import Contact from './pages/Contact';
import EHRIntegrations from './pages/EHRIntegrations';
import KLASReport from './pages/KLASReport';
import Solutions from './pages/Solutions';
import OwnerDashboard from './pages/OwnerDashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/ai-medical-scribe" element={<AIMedicalScribe />} />
            <Route path="/solutions/ai-medical-scribe/pre-charting" element={<AIPreCharting />} />
            <Route path="/solutions/ai-coding" element={<AICoding />} />
            <Route path="/solutions/customization-studio" element={<CustomizationStudio />} />
            <Route path="/solutions/deepscribe-assist" element={<DeepScribeAssist />} />
            <Route path="/specialties/oncology" element={<Oncology />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ehr-integrations" element={<EHRIntegrations />} />
            <Route path="/klas" element={<KLASReport />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
