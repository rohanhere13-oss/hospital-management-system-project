import React, { useState, useEffect } from 'react';
import { Building2, Heart, Brain, Baby, Bone, ShieldAlert, Clock, MapPin, User } from 'lucide-react';
import { fetchDepartments } from '../api';

export default function DepartmentsView() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments()
      .then(setDepartments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const iconMap = {
    Heart: Heart,
    Brain: Brain,
    Baby: Baby,
    Bone: Bone,
    ShieldAlert: ShieldAlert,
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Hospital Departments</h1>
        <p className="text-xs text-slate-400">Directory of specialized clinical units, locations, and operating hours (FR-DOC-03, FR-WEB-01)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept) => {
          const Icon = iconMap[dept.icon] || Building2;
          return (
            <div
              key={dept.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-inner">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">{dept.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{dept.description}</p>
              </div>

              <div className="space-y-2 text-xs text-slate-500 bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700">{dept.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{dept.hours}</span>
                </div>
                {dept.head && (
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Head: <strong className="text-slate-700">{dept.head}</strong></span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
