import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { fetchDoctors, fetchAvailableSlots, createAppointment } from '../api';

export default function BookAppointmentModal({ isOpen, onClose, onSuccess }) {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [slotsData, setSlotsData] = useState({ all_slots: [], booked: [], available: [] });
  const [selectedSlot, setSelectedSlot] = useState('');
  const [diseaseReason, setDiseaseReason] = useState('Routine Checkup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchDoctors().then((docs) => {
        setDoctors(docs);
        if (docs.length > 0 && !doctorId) {
          setDoctorId(docs[0].id.toString());
        }
      }).catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    if (doctorId && date) {
      fetchAvailableSlots(doctorId, date).then((data) => {
        setSlotsData(data);
        if (data.available.length > 0) {
          setSelectedSlot(data.available[0]);
        } else {
          setSelectedSlot('');
        }
      }).catch(console.error);
    }
  }, [doctorId, date]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      setError('Please select an available time slot.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await createAppointment({
        patient: 1, // Jane Cooper
        doctor: parseInt(doctorId),
        slot_date: date,
        slot_time: selectedSlot,
        disease_reason: diseaseReason,
        status: 'Confirmed'
      });
      setSuccessData(res);
      if (onSuccess) onSuccess(res);
    } catch (err) {
      setError(err.message || 'Slot conflict or failed to schedule.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {successData ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Appointment Confirmed!</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Appointment ID <span className="font-bold text-slate-800">{successData.appointment_id}</span> has been confirmed for {successData.slot_date} at {successData.slot_time}.
            </p>
            <button
              onClick={() => {
                setSuccessData(null);
                onClose();
              }}
              className="mt-4 px-6 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-2">
              <h2 className="text-lg font-bold text-slate-900">Book New Appointment</h2>
              <p className="text-xs text-slate-400">Conflict-free slot booking with authorized doctors (FR-APT-01/02)</p>
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Select Doctor</label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} ({doc.specialty})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Appointment Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Reason / Symptoms</label>
                <input
                  type="text"
                  value={diseaseReason}
                  onChange={(e) => setDiseaseReason(e.target.value)}
                  placeholder="e.g. Fever, Arrhythmia, Checkup"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Available Time Slots
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1">
                {slotsData.all_slots.map((slot) => {
                  const isBooked = slotsData.booked.includes(slot);
                  const isSelected = selectedSlot === slot;

                  return (
                    <button
                      type="button"
                      key={slot}
                      disabled={isBooked}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : isBooked
                          ? 'bg-slate-100 text-slate-300 cursor-not-allowed line-through'
                          : 'bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-700 border border-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {slotsData.available.length === 0 && (
                <p className="text-[11px] text-amber-600 mt-1">No remaining slots for this doctor on selected date.</p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !selectedSlot}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold shadow-md shadow-blue-200 transition-colors"
              >
                {loading ? 'Confirming...' : 'Confirm Appointment'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
