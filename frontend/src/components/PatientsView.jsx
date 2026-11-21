import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Users, Calendar, Phone, MapPin, Activity } from 'lucide-react';
import { fetchPatients } from '../api';

export default function PatientsView({ onOpenNewPatientModal }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadPatients = () => {
    fetchPatients(search)
      .then(setPatients)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPatients();
  }, [search]);

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Patient Management</h1>
          <p className="text-xs text-slate-400">Patient registration, unique identifier lookup, and profiles (FR-PAT-01 to 06)</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or ID..."
              className="w-full bg-white border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <button
            onClick={onOpenNewPatientModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm shadow-blue-200 transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Patient</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-3">Patient ID</th>
                <th className="pb-3">Patient Name</th>
                <th className="pb-3">Age / Gender</th>
                <th className="pb-3">Blood Group</th>
                <th className="pb-3">Contact</th>
                <th className="pb-3">Address</th>
                <th className="pb-3 text-right">Appointments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {patients.map((pat) => (
                <tr key={pat.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 font-bold text-blue-600">{pat.patient_id}</td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={pat.avatar_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"}
                        alt={pat.name}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <span className="font-bold text-slate-800">{pat.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-600">{pat.age} yrs • {pat.gender}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold text-[10px]">
                      {pat.blood_group}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-600">{pat.contact}</td>
                  <td className="py-3.5 text-slate-500 max-w-xs truncate">{pat.address || 'Central City'}</td>
                  <td className="py-3.5 text-right font-semibold text-slate-700">
                    {pat.appointments_count || 1} visits
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
