import React from 'react';
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Calendar,
  Building2,
  TrendingUp,
  Receipt,
  UserCog,
  BriefcaseMedical,
  Siren,
  CreditCard,
  Settings,
  ShieldCheck,
  ChevronRight,
  Search,
  LogIn,
  HeartPulse
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentRole, setCurrentRole }) {
  const mainMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'patients', label: 'Patient', icon: Users },
    { id: 'appointments', label: 'Appointment', icon: Calendar },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'analytics', label: 'Analytics & Reports', icon: TrendingUp },
    { id: 'billing', label: 'Billing & Insurance', icon: Receipt },
  ];

  const otherMenu = [
    { id: 'staff', label: 'Staff', icon: UserCog },
    { id: 'pharmacy', label: 'Pharmacy Management', icon: BriefcaseMedical },
    { id: 'emergency', label: 'Emergency & Admission', icon: Siren },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'settings', label: 'Setting', icon: Settings },
    { id: 'admin', label: 'Admin Panel', icon: ShieldCheck },
  ];

  const roles = [
    { id: 'admin', label: 'Administrator' },
    { id: 'staff', label: 'Reception / Staff' },
    { id: 'doctor', label: 'Doctor (Dr. Robert)' },
    { id: 'patient', label: 'Patient (Jane Cooper)' },
    { id: 'visitor', label: 'Public Visitor' },
  ];

  return (
    <aside className="w-64 bg-white min-h-screen border-r border-slate-100 flex flex-col justify-between py-6 px-4 shrink-0 shadow-sm">
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
            <HeartPulse className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Medcare</span>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-12 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white border border-slate-200 text-[10px] text-slate-400 px-1.5 py-0.5 rounded shadow-xs font-mono">
            ⌘ K
          </kbd>
        </div>

        {/* Menu Section */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
            Menu
          </div>
          <nav className="space-y-1">
            {mainMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 stroke-[2.2]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Other Menu Section */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
            Other Menu
          </div>
          <nav className="space-y-1">
            {otherMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Role / Auth Switcher (FR-AUTH-01 & RBAC) */}
      <div className="pt-4 border-t border-slate-100">
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
          Simulate User Role
        </label>
        <div className="relative">
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            ▼
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 text-slate-600">
            <LogIn className="w-3.5 h-3.5 text-slate-400" />
            <span>Active Session</span>
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">
            Online
          </span>
        </div>
      </div>
    </aside>
  );
}
