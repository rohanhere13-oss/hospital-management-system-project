import React from 'react';
import { Search, Sun, Bell, Mail, Settings, ChevronDown } from 'lucide-react';

export default function TopHeader({ currentRole }) {
  const roleDisplay = {
    admin: { name: 'Sullivan', title: 'Owner' },
    staff: { name: 'Sarah Jenkins', title: 'Reception Head' },
    doctor: { name: 'Dr. Robert Sullivan', title: 'Chief Medical Officer' },
    patient: { name: 'Jane Cooper', title: 'Patient' },
    visitor: { name: 'Guest Visitor', title: 'Public User' },
  }[currentRole] || { name: 'Sullivan', title: 'Owner' };

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Search Bar matching screenshot */}
      <div className="relative w-96 max-w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-full pl-5 pr-12 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        />
        <button
          type="button"
          aria-label="Search"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-500 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Pill */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors"
        >
          <Sun className="w-4 h-4 text-amber-500" />
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {/* Messages */}
        <button
          type="button"
          aria-label="Messages"
          className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 flex items-center justify-center text-slate-600 relative transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-2 right-2 ring-2 ring-white"></span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 flex items-center justify-center text-slate-600 relative transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2 right-2 ring-2 ring-white"></span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-800 leading-tight">
              {roleDisplay.name}
            </div>
            <div className="text-[11px] text-slate-400 leading-tight">
              {roleDisplay.title}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
            />
          </div>
          <button
            type="button"
            aria-label="Settings"
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
