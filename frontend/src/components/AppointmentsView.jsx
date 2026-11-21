import React, { useState, useEffect } from 'react';
import { Calendar, Plus, CheckCircle2, Clock, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchAppointments, updateAppointmentStatus } from '../api';

export default function AppointmentsView({ onOpenBookModal }) {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  const loadAppointments = () => {
    fetchAppointments()
      .then(setAppointments)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus);
      loadAppointments();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filtered = filterStatus === 'All'
    ? appointments
    : appointments.filter((a) => a.status === filterStatus);

  const statusColors = {
    Confirmed: 'bg-emerald-50 text-emerald-600',
    Requested: 'bg-amber-50 text-amber-600',
    Completed: 'bg-blue-50 text-blue-600',
    Cancelled: 'bg-rose-50 text-rose-600',
    Rescheduled: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Appointments Management</h1>
          <p className="text-xs text-slate-400">Scheduling, conflict prevention, and status tracking (FR-APT-01 to 07)</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-slate-200 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Requested">Requested</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            onClick={onOpenBookModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm shadow-blue-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-3">Appt ID</th>
                <th className="pb-3">Patient</th>
                <th className="pb-3">Doctor</th>
                <th className="pb-3">Date & Time</th>
                <th className="pb-3">Reason</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {filtered.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 font-bold text-slate-700">{apt.appointment_id}</td>
                  <td className="py-3.5">
                    <div className="font-bold text-slate-900">{apt.patient_name}</div>
                    <div className="text-[11px] text-slate-400">Age: {apt.patient_age}</div>
                  </td>
                  <td className="py-3.5">
                    <div className="font-semibold text-slate-800">{apt.doctor_name}</div>
                    <div className="text-[11px] text-slate-400">{apt.doctor_specialty}</div>
                  </td>
                  <td className="py-3.5">
                    <div className="font-semibold text-slate-800">{apt.slot_time}</div>
                    <div className="text-[11px] text-slate-400">{apt.slot_date}</div>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {apt.disease_reason}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${statusColors[apt.status] || 'bg-slate-100 text-slate-600'}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {apt.status !== 'Completed' && (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'Completed')}
                          title="Mark Completed"
                          className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-semibold text-[10px]"
                        >
                          Complete
                        </button>
                      )}
                      {apt.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                          title="Cancel Slot"
                          className="px-2 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold text-[10px]"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
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
