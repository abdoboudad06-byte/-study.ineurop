
import React, { useState, useMemo, useEffect } from 'react';
// Added missing 'Users' icon to the lucide-react import list
import { Search, Filter, Phone, Mail, GraduationCap, MapPin, CheckCircle, Clock, Trash2, BrainCircuit, Users, History } from 'lucide-react';
import { StudentApplication, FilterCategory } from '../types';
import { analyzeProfile } from '../services/geminiService';

interface AgencyDashboardProps {
  leads: StudentApplication[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: StudentApplication['status']) => void;
}

const AgencyDashboard: React.FC<AgencyDashboardProps> = ({ leads, onDelete, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterCategory>('All');
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || l.phone.includes(searchTerm);
      if (!matchesSearch) return false;

      if (filter === 'Spain') return l.destination === 'Espagne';
      if (filter === 'Portugal') return l.destination === 'Portugal';
      if (filter === 'BlockageReady') return l.canBlockFunds === true;
      if (filter === 'HasGuarantor') return l.hasGuarantor === true || l.guarantorType !== 'آخر';
      return true;
    });
  }, [leads, searchTerm, filter]);

  const handleAnalyze = async (lead: StudentApplication) => {
    setAnalyzingId(lead.id);
    const result = await analyzeProfile(lead);
    setAiAnalysis(prev => ({ ...prev, [lead.id]: result || '' }));
    setAnalyzingId(null);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">إدارة الطلبات ({filteredLeads.length})</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="البحث عن اسم أو هاتف..."
              className="pr-10 pl-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 w-64 text-right"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="bg-white border border-slate-200 rounded-lg px-4 py-2 outline-none text-right font-bold"
            value={filter}
            onChange={e => setFilter(e.target.value as FilterCategory)}
          >
            <option value="All">جميع الملفات</option>
            <option value="Spain">إسبانيا 🇪🇸</option>
            <option value="Portugal">البرتغال 🇵🇹</option>
            <option value="BlockageReady">مع بلوكاج ✅</option>
            <option value="HasGuarantor">مع ضامن ✅</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredLeads.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-300">
            <Users className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500">لا يوجد طلبات مطابقة للبحث.</p>
          </div>
        ) : (
          filteredLeads.map(lead => (
            <div key={lead.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{lead.fullName}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${lead.destination === 'Espagne' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {lead.destination === 'Espagne' ? 'إسبانيا' : 'البرتغال'}
                        </span>
                        {lead.canBlockFunds && (
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                            بلوكاج OK
                          </span>
                        )}
                        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                          <History size={12} /> {lead.gapYears}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAnalyze(lead)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="تحليل الملف بالذكاء الاصطناعي"
                        disabled={analyzingId === lead.id}
                      >
                        <BrainCircuit className={analyzingId === lead.id ? 'animate-pulse' : ''} size={20} />
                      </button>
                      <button 
                        onClick={() => onDelete(lead.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <GraduationCap size={16} className="text-indigo-500" /> Bac {lead.bacYear}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone size={16} className="text-emerald-500" /> {lead.phone}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users size={16} className="text-amber-500" /> الضامن: {lead.guarantorType}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock size={16} className="text-slate-400" /> {new Date(lead.submissionDate).toLocaleDateString('ar-MA')}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {lead.studyFields.map(f => (
                      <span key={f} className="bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-200 text-[10px] uppercase font-bold">
                        {f}
                      </span>
                    ))}
                  </div>

                  {aiAnalysis[lead.id] && (
                    <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 text-sm text-indigo-900 flex gap-3">
                      <BrainCircuit className="shrink-0 text-indigo-500 mt-1" size={18} />
                      <p>{aiAnalysis[lead.id]}</p>
                    </div>
                  )}
                </div>

                <div className="lg:w-48 flex flex-col justify-between border-t lg:border-t-0 lg:border-r border-slate-100 pt-4 lg:pt-0 lg:pr-6 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">حالة الطلب</label>
                    <select 
                      className="w-full text-sm bg-slate-50 border border-slate-200 rounded px-2 py-1 font-bold"
                      value={lead.status}
                      onChange={e => onUpdateStatus(lead.id, e.target.value as any)}
                    >
                      <option value="Pending">جديد</option>
                      <option value="Contacted">تم التواصل</option>
                      <option value="In Progress">قيد المعالجة</option>
                      <option value="Completed">مكتمل</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-2">
                    <a 
                      href={`tel:${lead.phone}`}
                      className="flex-1 flex items-center justify-center bg-slate-100 text-slate-700 py-2 rounded hover:bg-slate-200 transition-colors"
                    >
                      <Phone size={16} />
                    </a>
                    <a 
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgencyDashboard;
