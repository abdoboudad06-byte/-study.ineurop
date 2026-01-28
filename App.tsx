
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from './constants';
import { StudentApplication } from './types';
import StudentForm from './components/StudentForm';
import AgencyDashboard from './components/AgencyDashboard';
import { GraduationCap, Sparkles, LayoutDashboard, Send, Globe, ChevronRight, Instagram } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'form' | 'admin'>('home');
  const [leads, setLeads] = useState<StudentApplication[]>([]);

  useEffect(() => {
    const savedLeads = localStorage.getItem('study_ineurop_leads');
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('study_ineurop_leads', JSON.stringify(leads));
  }, [leads]);

  const handleNewApplication = (app: StudentApplication) => {
    setLeads(prev => [app, ...prev]);
    setView('home'); 
  };

  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const handleUpdateStatus = (id: string, status: StudentApplication['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">study.<span className="text-indigo-600">ineurop</span></h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => setView('home')} className={`text-sm font-semibold ${view === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}>الرئيسية</button>
            <button onClick={() => setView('form')} className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md hover:bg-indigo-700 transition-all font-noto">سجل الآن</button>
          </nav>

          <button 
            onClick={() => setView(view === 'admin' ? 'home' : 'admin')}
            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
            title="لوحة تحكم الوكالة"
          >
            <LayoutDashboard size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1">
        {view === 'home' && (
          <div className="animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
              <div className="max-w-7xl mx-auto text-center relative z-10">
                <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block border border-indigo-100 font-noto">مستقبلك يبدأ هنا</span>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight font-noto">
                  ادرس في <span className="text-indigo-600 underline decoration-indigo-200">إسبانيا أو البرتغال</span> <br />بكل سهولة واحترافية
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-noto">
                  نحن نساعد الطلبة المغاربة في تحقيق حلم الدراسة بالخارج عبر منصة <span className="font-bold text-indigo-600">study.ineurop</span>. من التسجيل الجامعي إلى الحصول على الفيزا.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center font-noto">
                  <button 
                    onClick={() => setView('form')}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    ابدأ تقييم ملفك الآن <ChevronRight size={20} />
                  </button>
                  <a 
                    href="#features"
                    className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    اكتشف خدماتنا
                  </a>
                </div>
              </div>
              
              {/* Background Accents */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl"></div>
              </div>
            </section>

            {/* Countries Section */}
            <section id="features" className="py-20 bg-white font-noto">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-indigo-50 transition-all cursor-pointer">
                    <div className="text-4xl mb-4">🇪🇸</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">الدراسة في إسبانيا</h3>
                    <p className="text-slate-600 mb-4">جامعات عالمية، تكاليف معقولة، وتجربة ثقافية فريدة من نوعها بالقرب من المغرب.</p>
                  </div>
                  <div className="group p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-emerald-50 transition-all cursor-pointer">
                    <div className="text-4xl mb-4">🇵🇹</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">الدراسة في البرتغال</h3>
                    <p className="text-slate-600 mb-4">جودة تعليم عالية، بيئة آمنة، وتسهيلات كبيرة للطلبة الأجانب في السنوات الأخيرة.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {view === 'form' && (
          <div className="py-12 px-4 animate-in slide-in-from-bottom-8 duration-500 font-noto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">استمارة التسجيل الأولي</h2>
              <p className="text-slate-500">املأ المعلومات التالية بدقة لمساعدتنا في تقييم ملفك</p>
            </div>
            <StudentForm onComplete={handleNewApplication} />
          </div>
        )}

        {view === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500 font-noto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                <LayoutDashboard size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">إدارة الطلبات (خاص بالوكالة)</h2>
                <p className="text-slate-500">متابعة وتصنيف طلبات منصة study.ineurop</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">إجمالي الطلاب</p>
                <p className="text-3xl font-bold text-slate-900">{leads.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm border-l-4 border-l-red-500">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">إسبانيا</p>
                <p className="text-3xl font-bold text-slate-900">{leads.filter(l => l.destination === 'Espagne').length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm border-l-4 border-l-green-500">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">البرتغال</p>
                <p className="text-3xl font-bold text-slate-900">{leads.filter(l => l.destination === 'Portugal').length}</p>
              </div>
              <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-100 text-white">
                <p className="text-indigo-100 text-xs font-bold uppercase mb-1">جاهزون للبلوكاج</p>
                <p className="text-3xl font-bold">{leads.filter(l => l.canBlockFunds).length}</p>
              </div>
            </div>

            <AgencyDashboard 
              leads={leads} 
              onDelete={handleDeleteLead}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-10 mt-20 font-noto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-indigo-600" size={24} />
              <span className="font-bold text-slate-900">study.ineurop © 2025</span>
            </div>
            <a 
              href="https://www.instagram.com/study.ineurop/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-600 hover:text-pink-600 transition-colors text-sm font-medium"
            >
              <Instagram size={18} />
              <span>@study.ineurop</span>
            </a>
          </div>
          <div className="flex gap-8 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-indigo-600">سياسة الخصوصية</a>
            <a href="#" className="hover:text-indigo-600">الشروط والأحكام</a>
            <button onClick={() => setView('admin')} className="hover:text-indigo-600">دخول الإدارة</button>
          </div>
        </div>
      </footer>
      
      <div className="fixed bottom-12 right-12 text-indigo-200 opacity-10 pointer-events-none -z-10">
        <Sparkles size={160} />
      </div>
    </div>
  );
};

export default App;
