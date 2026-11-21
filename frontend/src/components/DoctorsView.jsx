import React, { useState, useEffect } from 'react';
import { Search, Stethoscope, Phone, Mail, Clock, Calendar, CheckCircle, ShieldAlert } from 'lucide-react';
import { fetchDoctors } from '../api';

export default function DoctorsView({ onBookDoctor }) {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors({ search })
      .then(setDoctors)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Doctors & Specialists</h1>
          <p className="text-xs text-slate-400">Approved clinician profiles, specialties, and active schedules (FR-DOC-01/02)</p>
        </div>

        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialty..."
            className="w-full bg-white border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {doctors.map((doc) => {
          const isAvailable = doc.status === 'Available';
          const isOnDuty = doc.status === 'On duty';

          return (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={doc.image_url || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200"}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] mb-1">
                      {doc.specialty}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm truncate">{doc.name}</h3>
                    <p className="text-slate-400 text-[11px]">{doc.qualification}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-500 bg-slate-50/70 rounded-2xl p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.availability}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.contact}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                    isAvailable
                      ? 'bg-emerald-50 text-emerald-600'
                      : isOnDuty
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isAvailable ? 'bg-emerald-500' : isOnDuty ? 'bg-blue-500' : 'bg-slate-400'
                    }`}
                  ></span>
                  {doc.status}
                </span>

                <button
                  onClick={() => onBookDoctor(doc)}
                  className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Book Slot
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
