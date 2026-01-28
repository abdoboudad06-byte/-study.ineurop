import React, { useState, useEffect } from 'react';
import { StudentApplication } from './types';
import StudentForm from './components/StudentForm';
import AgencyDashboard from './components/AgencyDashboard';
import { GraduationCap, LayoutDashboard, ChevronRight, Instagram } from 'lucide-react';

const App = () => {
  const [view, setView] = useState<'home' | 'form' | 'admin'>('home');
  const [leads, setLeads] = useState<StudentApplication[]>([]);

  useEffect(() => {
    const savedLeads = localStorage.getItem('study_ineurop_leads');
    if (savedLeads) setLeads(JSON.parse(savedLeads));
  }, []);

  useEffect(() => {
    localStorage.setItem('study_ineurop_leads', JSON.stringify(leads));
  }, [leads]);

  const handleNewApplication = (app: StudentApplication) => {
    setLeads((prev: StudentApplication[]) => [app, ...prev]);
    setView('home'); 
  };

  const handleDeleteLead = (id: string) => {
    setLeads((prev: StudentApplication[]) => prev.filter((l: StudentApplication) => l.id !== id));
  };

  const handleUpdateStatus = (id: string, status: StudentApplication['status']) => {
    setLeads((prev: StudentApplication[]) => prev.map((l: StudentApplication) => l.id === id ? { ...l, status } : l));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg"><GraduationCap size={24} /></div>
            <h1 className="text-xl font-bold text-slate-900">study.<span className="text-indigo-600">ineurop</span></h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => setView('home')} className={`text-sm font-semibold ${view === 'home' ? 'text-indigo-600' : 'text-slate-600'}`}>الرئيسية</button>
            <button onClick={() => setView('form')} className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold">سجل الآن</button>
          </nav>
          <button onClick={() => setView(view === 'admin' ? 'home' : 'admin')} className="p-2 text-slate-400 hover:text-indigo-600"><LayoutDashboard size={20} /></button>
        </div>
      </header>

      <main className="flex-1">
        {view === 'home' && (
          <section className="py-20 px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">ادرس في إسبانيا أو البرتغال بكل احترافية</h2>
            <button onClick={() => setView('form')} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center mx-auto gap-2">ابدأ الآن <ChevronRight size={20} /></button>
          </section>
        )}
        {view === 'form' && <div className="py-12"><StudentForm onComplete={handleNewApplication} /></div>}
        {view === 'admin' && <div className="max-w-7xl mx-auto px-4 py-8"><AgencyDashboard leads={leads} onDelete={handleDeleteLead} onUpdateStatus={handleUpdateStatus} /></div>}
      </main>

      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2"><GraduationCap size={24} className="text-indigo-600" /><span className="font-bold">study.ineurop © 2025</span></div>
          <a href="https://instagram.com/study.ineurop" className="flex items-center gap-2 text-slate-600"><Instagram size={18} /> @study.ineurop</a>
        </div>
      </footer>
    </div>
  );
};

export default App;