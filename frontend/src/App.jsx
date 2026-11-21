import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Dashboard from './components/Dashboard';
import DoctorsView from './components/DoctorsView';
import PatientsView from './components/PatientsView';
import AppointmentsView from './components/AppointmentsView';
import DepartmentsView from './components/DepartmentsView';
import BillingView from './components/BillingView';
import AdminContentView from './components/AdminContentView';
import BookAppointmentModal from './components/BookAppointmentModal';
import NewPatientModal from './components/NewPatientModal';
import ExportReportModal from './components/ExportReportModal';
import ChatbotWidget from './components/ChatbotWidget';
import { fetchDashboardStats } from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState('admin');
  const [stats, setStats] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [exportModalType, setExportModalType] = useState(null); // 'csv' | 'report' | null

  const loadStats = () => {
    fetchDashboardStats()
      .then(setStats)
      .catch((err) => console.error('Failed to load dashboard stats:', err));
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleBookDoctor = (doc) => {
    setIsBookModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f3f5f9] text-slate-800 flex flex-row">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader currentRole={currentRole} />

        <main className="flex-1 p-8 max-w-[1400px] w-full mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              stats={stats}
              onOpenBookModal={() => setIsBookModalOpen(true)}
              onExportCSV={() => setExportModalType('csv')}
              onGenerateReport={() => setExportModalType('report')}
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorsView onBookDoctor={handleBookDoctor} />
          )}

          {activeTab === 'patients' && (
            <PatientsView onOpenNewPatientModal={() => setIsNewPatientModalOpen(true)} />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsView onOpenBookModal={() => setIsBookModalOpen(true)} />
          )}

          {activeTab === 'departments' && (
            <DepartmentsView />
          )}

          {activeTab === 'analytics' && (
            <Dashboard
              stats={stats}
              onOpenBookModal={() => setIsBookModalOpen(true)}
              onExportCSV={() => setExportModalType('csv')}
              onGenerateReport={() => setExportModalType('report')}
            />
          )}

          {activeTab === 'billing' && (
            <BillingView />
          )}

          {activeTab === 'payment' && (
            <BillingView />
          )}

          {(activeTab === 'admin' || activeTab === 'settings') && (
            <AdminContentView />
          )}

          {(activeTab === 'staff' || activeTab === 'pharmacy' || activeTab === 'emergency') && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl font-bold">
                🏥
              </div>
              <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab} Operational Portal</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Integrated front-office management for {activeTab}. Connected with Medcare's centralized hospital relational database and role-based permissions.
              </p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onSuccess={() => {
          loadStats();
        }}
      />

      <NewPatientModal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
        onSuccess={() => {
          loadStats();
        }}
      />

      <ExportReportModal
        isOpen={!!exportModalType}
        type={exportModalType}
        onClose={() => setExportModalType(null)}
      />

      {/* Floating Gemini-Powered Hospital Chatbot Widget */}
      <ChatbotWidget currentRole={currentRole} />
    </div>
  );
}
