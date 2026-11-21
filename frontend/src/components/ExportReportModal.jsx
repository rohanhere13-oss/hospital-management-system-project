import React from 'react';
import { X, Download, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export default function ExportReportModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  const isCSV = type === 'csv';

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Appointment ID,Patient Name,Doctor,Date,Time,Status,Disease\n" +
      "APT-2025-001,Jane Cooper,Dr. Eleanor Pena,2025-12-25,11:30 AM,Confirmed,Fever\n" +
      "APT-2025-002,Wade Warren,Dr. Salman Hossain,2025-12-25,05:30 PM,Confirmed,Cardio Check\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", isCSV ? "medcare_appointments.csv" : "medcare_weekly_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative text-center">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
          {isCSV ? <Download className="w-6 h-6" /> : <FileSpreadsheet className="w-6 h-6" />}
        </div>

        <h3 className="text-base font-bold text-slate-900">
          {isCSV ? 'Export Appointments to CSV' : 'Generate Weekly Hospital Report'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-5">
          {isCSV
            ? 'Download all confirmed appointments and patient encounter logs in standard CSV format.'
            : 'Compile patient arrival statistics, doctor workload, and billing metrics.'}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-200 transition-colors"
          >
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
}
