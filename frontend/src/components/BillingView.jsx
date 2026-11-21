import React, { useState, useEffect } from 'react';
import { Receipt, DollarSign, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { fetchInvoices } from '../api';

export default function BillingView() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices()
      .then(setInvoices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalBilled = invoices.reduce((acc, curr) => acc + parseFloat(curr.total || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Billing & Payment Tracking</h1>
          <p className="text-xs text-slate-400">Patient invoices, visit fees, and settlement status (FR-BILL-01 to 05)</p>
        </div>

        <div className="bg-white rounded-2xl px-5 py-2.5 border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Billed</div>
            <div className="text-lg font-extrabold text-slate-900">${totalBilled.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-3">Invoice ID</th>
                <th className="pb-3">Patient</th>
                <th className="pb-3">Items / Services</th>
                <th className="pb-3">Due Date</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 font-bold text-slate-800">{inv.invoice_id}</td>
                  <td className="py-3.5 font-semibold text-slate-800">{inv.patient_name}</td>
                  <td className="py-3.5 text-slate-600 max-w-xs">{inv.items_summary}</td>
                  <td className="py-3.5 text-slate-500">{inv.due_date || '2025-12-25'}</td>
                  <td className="py-3.5 font-extrabold text-slate-900">${inv.total}</td>
                  <td className="py-3.5 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          inv.status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      ></span>
                      {inv.status}
                    </span>
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
