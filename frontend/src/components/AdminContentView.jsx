import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Sparkles, Check, Edit2 } from 'lucide-react';
import { fetchHospitalContent, saveHospitalContent } from '../api';

export default function AdminContentView() {
  const [contents, setContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [bodyText, setBodyText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadContent = () => {
    fetchHospitalContent()
      .then((data) => {
        setContents(data);
        if (data.length > 0 && !selectedContent) {
          setSelectedContent(data[0]);
          setBodyText(data[0].body);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleSelect = (item) => {
    setSelectedContent(item);
    setBodyText(item.body);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    if (!selectedContent) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      await saveHospitalContent(selectedContent.id, {
        body: bodyText,
        approved: true
      });
      setSaveSuccess(true);
      loadContent();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save knowledge context');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Hospital Knowledge & AI Grounding
          </h1>
          <p className="text-xs text-slate-400">
            Maintain approved facts for Gemini API RAG grounding (FR-BOT-02, FR-BOT-08)
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Gemini Grounding Source</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Knowledge Item List */}
        <div className="lg:col-span-4 space-y-2">
          {contents.map((item) => {
            const isSelected = selectedContent?.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-100'
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 mb-1">
                  {item.category}
                </div>
                <div className="text-xs font-bold truncate">{item.title}</div>
                <div className={`text-[11px] mt-1 line-clamp-2 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {item.body}
                </div>
              </button>
            );
          })}
        </div>

        {/* Knowledge Editor */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          {selectedContent ? (
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                    {selectedContent.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedContent.title}</h3>
                </div>

                {saveSuccess && (
                  <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold animate-in fade-in">
                    <Check className="w-4 h-4" /> Grounding context updated!
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-6">
                <label className="block text-xs font-bold text-slate-700">
                  Approved Knowledge Body (Supplied directly to Gemini AI):
                </label>
                <textarea
                  rows={10}
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-800 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-200 transition-colors"
                >
                  {saving ? 'Updating Grounding...' : 'Save & Publish to Chatbot'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a knowledge topic on the left to review or edit grounding facts.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
