import React, { useState } from 'react';
import {
  Users,
  Calendar,
  FileText,
  DollarSign,
  MoreVertical,
  Download,
  FileSpreadsheet,
  ChevronDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit2,
  Trash2,
  Phone,
  CheckCircle2,
  Clock,
  Activity
} from 'lucide-react';

export default function Dashboard({ stats, onOpenBookModal, onExportCSV, onGenerateReport }) {
  const [selectedDay, setSelectedDay] = useState(13);
  const [timeFilter, setTimeFilter] = useState('This week');
  const [monthFilter, setMonthFilter] = useState('This Months');

  const days = Array.from({ length: 23 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Welcome back, Dr, Robert!
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span>Export to CSV</span>
            <Download className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={onGenerateReport}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span>Generate Report</span>
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => setTimeFilter(timeFilter === 'This week' ? 'This month' : 'This week')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm shadow-blue-200 transition-colors"
          >
            <span>{timeFilter}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Row of 4 Metric Cards matching UI screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Card 1: Total Patients */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span>Total Patients</span>
              </div>
              <button className="text-slate-300 hover:text-slate-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">148</span>
              <span className="text-[11px] text-slate-400 font-medium">vs last week</span>
            </div>
          </div>

          {/* Sparkline with +24% tag and Days */}
          <div className="mt-4 pt-2">
            <div className="relative h-14">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                <path
                  d="M 10 45 Q 40 40, 70 30 T 115 15 T 150 35 T 190 25"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Highlight Point */}
                <circle cx="115" cy="15" r="3.5" fill="#2563eb" className="animate-pulse" />
              </svg>

              {/* Floating +24% pill */}
              <div className="absolute left-[52%] top-0 -translate-x-1/2 -translate-y-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5">
                <span>+24%</span>
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1 mt-1">
              <span>Sat</span>
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
            </div>
          </div>
        </div>

        {/* Card 2: Appointments Today */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span>Appointments Today</span>
              </div>
              <button className="text-slate-300 hover:text-slate-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">96</span>
              <span className="text-[11px] text-slate-400 font-medium">vs last week</span>
            </div>
          </div>

          {/* Bar Chart with solid blue active bar +14% */}
          <div className="mt-4 pt-2">
            <div className="relative h-14 flex items-end justify-between gap-1.5 px-2">
              <div className="w-2.5 h-5 bg-slate-100 rounded-t-sm"></div>
              <div className="w-2.5 h-8 bg-slate-100 rounded-t-sm"></div>
              <div className="w-2.5 h-6 bg-slate-100 rounded-t-sm"></div>
              <div className="w-2.5 h-10 bg-slate-100 rounded-t-sm"></div>
              
              {/* Highlighted active bar with tag */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-6 bg-blue-50 text-blue-600 border border-blue-200 text-[9px] font-bold px-1.5 py-0.2 rounded shadow-xs whitespace-nowrap">
                  +14%
                </div>
                <div className="w-3.5 h-13 bg-blue-600 rounded-t-md"></div>
              </div>

              <div className="w-2.5 h-9 bg-slate-100 rounded-t-sm"></div>
              <div className="w-2.5 h-7 bg-slate-100 rounded-t-sm"></div>
              <div className="w-2.5 h-11 bg-slate-100 rounded-t-sm"></div>
              <div className="w-2.5 h-6 bg-slate-100 rounded-t-sm"></div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-2 mt-2">
              <span className="bg-slate-800 text-white text-[9px] px-1.5 py-0.2 rounded font-semibold">Avg</span>
              <span>12 Today</span>
            </div>
          </div>
        </div>

        {/* Card 3: Pending Reports */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span>Pending Reports</span>
              </div>
              <button className="text-slate-300 hover:text-slate-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">96</span>
              <span className="text-[11px] text-slate-400 font-medium">vs last week</span>
            </div>
          </div>

          {/* Breakdown progress bar */}
          <div className="mt-4 pt-1">
            <div className="flex justify-between items-center text-[11px] font-medium text-slate-500 mb-2">
              <span>Total Pending</span>
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Lab Reports <span className="text-[10px] text-blue-600 bg-blue-50 px-1 rounded font-bold">+48%</span>
              </span>
              <span className="text-[10px] text-slate-400">X-ray / MRI</span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
              <div className="h-full bg-blue-600 rounded-l-full" style={{ width: '68%' }}></div>
              <div className="h-full bg-sky-300 rounded-r-full" style={{ width: '32%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 4: Total Revenue */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
                <span>Total Revenue</span>
              </div>
              <button className="text-slate-300 hover:text-slate-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">$54,24.05</span>
              <span className="text-[11px] text-slate-400 font-medium">vs last week</span>
            </div>
          </div>

          {/* Wavy line chart with tooltip pill +$32k */}
          <div className="mt-4 pt-2">
            <div className="relative h-14">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                <path
                  d="M 10 50 Q 50 35, 80 40 T 130 18 T 170 35 T 195 20"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="130" cy="18" r="3.5" fill="#2563eb" />
              </svg>

              {/* +$32k pill */}
              <div className="absolute left-[64%] top-0 -translate-x-1/2 -translate-y-2 bg-blue-100/90 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5">
                <span>+$32k</span>
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1 mt-1">
              <span>Sat</span>
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle & Lower Grid: Left 2 large panels, Right Specialist Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Arrival Statistics + Appointments Table */}
        <div className="lg:col-span-8 space-y-6">
          {/* Panel: Patient Arrival Statistics */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <span>Patient Arrival Statistics</span>
              </div>

              <button
                onClick={() => setMonthFilter(monthFilter === 'This Months' ? 'Last Quarter' : 'This Months')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <span>{monthFilter}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">$54,24.05</span>
              <span className="text-xs text-slate-400 font-medium">vs last week</span>
            </div>

            {/* Area Chart matching screenshot with hatched background & Top pill */}
            <div className="relative h-64 w-full">
              {/* Y Axis Guide labels */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-400 font-medium">
                <span>$40k</span>
                <span>$30k</span>
                <span>$25k</span>
                <span>$20k</span>
                <span>$15k</span>
                <span>$10k</span>
              </div>

              {/* Chart SVG Canvas */}
              <div className="ml-10 h-full relative">
                <svg className="w-full h-52 overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                  <defs>
                    <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="8" stroke="#e0edff" strokeWidth="1.5" />
                    </pattern>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="0" y1="20" x2="600" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="600" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="0" y1="180" x2="600" y2="180" stroke="#f1f5f9" strokeDasharray="3 3" />

                  {/* Shaded Area Under Spline */}
                  <path
                    d="M 10 140 Q 60 110, 110 130 T 210 90 T 255 35 T 320 80 T 400 60 T 490 120 T 580 100 L 580 190 L 10 190 Z"
                    fill="url(#diagonalHatch)"
                    opacity="0.9"
                  />

                  {/* Spline curve stroke */}
                  <path
                    d="M 10 140 Q 60 110, 110 130 T 210 90 T 255 35 T 320 80 T 400 60 T 490 120 T 580 100"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  {/* Highlighted vertical bar at December/Top */}
                  <rect x="245" y="35" width="18" height="155" rx="8" fill="#2563eb" />
                </svg>

                {/* Floating "Top" pill & Tooltip exactly like the image */}
                <div className="absolute left-[41%] top-2 -translate-x-1/2 flex flex-col items-center">
                  <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm mb-1">
                    Top
                  </span>
                  
                  {/* Floating card with In/Out data */}
                  <div className="bg-white/95 backdrop-blur-xs border border-slate-100 shadow-xl rounded-xl p-3 min-w-[130px] text-left">
                    <div className="text-[11px] font-bold text-slate-800 pb-1 mb-1 border-b border-slate-100">
                      December-2025
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 py-0.5">
                      <span>Patients: In</span>
                      <span className="font-bold text-emerald-600">350</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 py-0.5">
                      <span>Patients: Out</span>
                      <span className="font-bold text-rose-500">211</span>
                    </div>
                  </div>
                </div>

                {/* X Axis Months */}
                <div className="flex justify-between text-[11px] text-slate-400 font-medium pt-3">
                  {['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Panel: Appointments Strip & Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span>Appointments</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span> Available Slots
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span> Selected
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-200"></span> Unavailable Slots
                  </span>
                </div>

                <button
                  onClick={onOpenBookModal}
                  className="w-7 h-7 rounded-full bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-xs"
                  title="Book New Appointment"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Horizontal Calendar Date Strip */}
            <div className="flex items-center gap-1.5 py-3 border-y border-slate-100 overflow-x-auto no-scrollbar mb-5">
              <button className="w-6 h-6 rounded-full text-slate-400 hover:text-slate-700 flex items-center justify-center shrink-0">
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {days.map((day) => {
                  const isSelected = day === 13 || day === 14 || day === selectedDay;
                  const isUnavailable = day === 5 || day === 8 || day === 20;

                  return (
                    <button
                      key={day}
                      onClick={() => !isUnavailable && setSelectedDay(day)}
                      disabled={isUnavailable}
                      className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : isUnavailable
                          ? 'text-slate-300 cursor-not-allowed line-through'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <button className="w-6 h-6 rounded-full text-slate-400 hover:text-slate-700 flex items-center justify-center shrink-0">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Appointments Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="pb-3 font-semibold">Patients</th>
                    <th className="pb-3 font-semibold">Assigned Doctor</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Diseases</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {/* Row matching UI image: Jane Cooper */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
                          alt="Jane Cooper"
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <div className="font-bold text-slate-800">Jane Cooper</div>
                          <div className="text-[11px] text-slate-400">Age: 28</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-slate-800">Dr. Eleanor Pena</div>
                      <div className="text-[11px] text-slate-400">Cardiology</div>
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-slate-800">11:30 AM</div>
                      <div className="text-[11px] text-slate-400">25/12/2025</div>
                    </td>
                    <td className="py-3">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-[11px]">
                        Fever
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="w-7 h-7 rounded-full bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Second Row: Wade Warren */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                          alt="Wade Warren"
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <div className="font-bold text-slate-800">Wade Warren</div>
                          <div className="text-[11px] text-slate-400">Age: 42</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-slate-800">Dr. Salman Hossain</div>
                      <div className="text-[11px] text-slate-400">Cardiology</div>
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-slate-800">05:30 PM</div>
                      <div className="text-[11px] text-slate-400">25/12/2025</div>
                    </td>
                    <td className="py-3">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-[11px]">
                        Cardio Check
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="w-7 h-7 rounded-full bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Our Specialist */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span>Our Specialist</span>
                </div>

                <button
                  onClick={onOpenBookModal}
                  className="w-7 h-7 rounded-full bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-xs"
                  title="View All Specialists"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Featured Doctor: Dr. Salman Hossain */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 mb-6 group">
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
                    alt="Dr. Salman Hossain"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge: Cardiologist */}
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    Cardiologist
                  </div>
                </div>

                {/* Doctor Info Footer */}
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-slate-900">Dr. Salman Hossain</h3>
                    <button
                      onClick={onOpenBookModal}
                      className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-200 transition-colors"
                      title="Call or Book"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1 text-xs text-slate-500">
                    <div>
                      <span className="font-semibold text-slate-700">Qualification:</span> MBBS, MD (Cardiology)
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Availability:</span> Sat - Thu | 5:00 PM - 9:00 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctors List Below */}
              <div className="space-y-3.5 pt-1">
                {/* 1. Dr. Eleanor Pena */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1594824813583-a4c3f5e55e5b?auto=format&fit=crop&q=80&w=120"
                      alt="Dr. Eleanor Pena"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Dr. Eleanor Pena</div>
                      <div className="text-[11px] text-slate-400">MBBS, MD (Cardiology)</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Available
                  </span>
                </div>

                {/* 2. Dr. Esther Howard */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120"
                      alt="Dr. Esther Howard"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Dr. Esther Howard</div>
                      <div className="text-[11px] text-slate-400">MBBS, MD (Cardiology)</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> On duty
                  </span>
                </div>

                {/* 3. Dr. Theresa Webb */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=120"
                      alt="Dr. Theresa Webb"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Dr. Theresa Webb</div>
                      <div className="text-[11px] text-slate-400">MBBS, MD (Cardiology)</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Available
                  </span>
                </div>

                {/* 4. Dr. Jacob Alex */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=120"
                      alt="Dr. Jacob Alex"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Dr. Jacob Alex</div>
                      <div className="text-[11px] text-slate-400">MBBS, MD (Cardiology)</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
