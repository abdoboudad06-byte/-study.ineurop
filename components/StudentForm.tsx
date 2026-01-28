import React, { useState } from 'react';
import { Send, CheckCircle2, ChevronRight, ChevronLeft, School, Globe, Wallet, Users, LayoutGrid, Clock, AlertCircle } from 'lucide-react';
import { StudentApplication, CountryPreference, GuarantorType } from '../types';
import { STUDY_FIELDS, GUARANTOR_OPTIONS, AGENCY_PHONE, DIPLOMA_TYPES, BAC_YEARS, LAST_STUDY_YEARS, OTHER_DIPLOMA_LIST, GAP_YEARS_OPTIONS } from '../constants';

interface StudentFormProps {
  onComplete: (app: StudentApplication) => void;
}

const StudentForm = ({ onComplete }: StudentFormProps) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; email?: string }>({});
  
  const [formData, setFormData] = useState<Partial<StudentApplication>>({
    fullName: '',
    phone: '',
    email: '',
    diplomaType: DIPLOMA_TYPES[0],
    bacYear: BAC_YEARS[1],
    otherDiplomas: OTHER_DIPLOMA_LIST[0],
    lastDiplomaYear: LAST_STUDY_YEARS[1],
    gapYears: GAP_YEARS_OPTIONS[0],
    destination: 'Espagne',
    hasGuarantor: true,
    guarantorType: 'الأب',
    canBlockFunds: false,
    studyFields: [],
  });

  const validateStep1 = () => {
    const newErrors: { fullName?: string; phone?: string; email?: string } = {};
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل)';
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'يرجى إدخال رقم هاتف صحيح مكون من 10 أرقام';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep((s: number) => Math.min(s + 1, 4));
      }
    } else {
      setStep((s: number) => Math.min(s + 1, 4));
    }
  };

  const prevStep = () => setStep((s: number) => Math.max(s - 1, 1));

  const handleFieldToggle = (field: string) => {
    const current = formData.studyFields || [];
    if (current.includes(field)) {
      setFormData({ ...formData, studyFields: current.filter((f: string) => f !== field) });
    } else {
      setFormData({ ...formData, studyFields: [...current, field] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && !validateStep1()) return;

    const finalData: StudentApplication = {
      ...formData as StudentApplication,
      id: Math.random().toString(36).substr(2, 9),
      submissionDate: new Date().toISOString(),
      status: 'Pending',
    };
    onComplete(finalData);
    setIsSubmitted(true);

    const msg = `📌 *طلب تسجيل جديد - study.ineurop*
👤 *الاسم:* ${finalData.fullName}
📱 *الهاتف:* ${finalData.phone}
🎓 *شهادة البكالوريا:* ${finalData.bacYear}
🌍 *الوجهة:* ${finalData.destination === 'Espagne' ? 'إسبانيا 🇪🇸' : 'البرتغال 🇵🇹'}`;
    
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${AGENCY_PHONE}?text=${encoded}`, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto bg-white p-12 rounded-3xl shadow-xl text-center border border-slate-100">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">تم إرسال طلبك بنجاح!</h3>
        <button onClick={() => window.location.reload()} className="text-indigo-600 font-bold hover:underline">إرسال طلب آخر</button>
      </div>
    );
  }

  const OptionGrid = ({ options, value, onChange, columns = 2 }: { options: string[], value?: string, onChange: (v: string) => void, columns?: number }) => (
    <div className={`grid grid-cols-1 sm:grid-cols-${columns} gap-2`}>
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onChange(opt)}
          className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all text-right flex items-center justify-between ${value === opt ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
          <span className="flex-1">{opt}</span>
          {value === opt && <CheckCircle2 size={16} className="text-white ml-2" />}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      <div className="h-2 bg-slate-100">
        <div className="h-full bg-indigo-600 transition-all duration-700 ease-out" style={{ width: `${(step / 4) * 100}%` }} />
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-10" dir="rtl">
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6 text-indigo-600 font-bold text-xl">
              <Users size={28} />
              <h3>المعلومات الشخصية</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">الاسم والنسب الكامل</label>
                <input required type="text" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-right font-bold"
                  value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} placeholder="مثال: محمد العلوي" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">رقم الواتساب</label>
                  <input required type="tel" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-right font-bold"
                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })} placeholder="0612345678" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
                  <input required type="email" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-right font-bold"
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="name@email.com" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6 text-indigo-600 font-bold text-xl">
              <School size={28} />
              <h3>المسار الدراسي</h3>
            </div>
            <OptionGrid options={DIPLOMA_TYPES} value={formData.diplomaType} onChange={v => setFormData({ ...formData, diplomaType: v })} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-white text-right font-bold"
                value={formData.bacYear} onChange={e => setFormData({ ...formData, bacYear: e.target.value })}>
                {BAC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-white text-right font-bold"
                value={formData.lastDiplomaYear} onChange={e => setFormData({ ...formData, lastDiplomaYear: e.target.value })}>
                {LAST_STUDY_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <OptionGrid options={GAP_YEARS_OPTIONS} value={formData.gapYears} onChange={v => setFormData({ ...formData, gapYears: v })} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6 text-indigo-600 font-bold text-xl">
              <Globe size={28} />
              <h3>الوجهة والتمويل</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Espagne', 'Portugal'].map(country => (
                <button key={country} type="button" onClick={() => setFormData({ ...formData, destination: country as CountryPreference })}
                  className={`py-8 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${formData.destination === country ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'}`}>
                  <span className="text-4xl">{country === 'Espagne' ? '🇪🇸' : '🇵🇹'}</span>
                  <span className="font-bold text-lg">{country === 'Espagne' ? 'إسبانيا' : 'البرتغال'}</span>
                </button>
              ))}
            </div>
            <div className="p-6 bg-slate-900 text-white rounded-3xl flex items-center justify-between">
              <h4 className="font-bold flex items-center gap-2"><Wallet size={22} className="text-indigo-400" /> البلوكاج البنكي (+70k)</h4>
              <input type="checkbox" className="w-6 h-6 rounded accent-indigo-500" checked={formData.canBlockFunds} onChange={e => setFormData({ ...formData, canBlockFunds: e.target.checked })} />
            </div>
            <OptionGrid options={GUARANTOR_OPTIONS} value={formData.guarantorType} onChange={v => setFormData({ ...formData, guarantorType: v as GuarantorType })} columns={3} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6 text-indigo-600 font-bold text-xl">
              <LayoutGrid size={28} />
              <h3>المجالات الدراسية</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STUDY_FIELDS.map(field => (
                <button key={field} type="button" onClick={() => handleFieldToggle(field)}
                  className={`px-4 py-4 rounded-2xl border text-sm font-bold transition-all text-right flex items-center justify-between ${formData.studyFields?.includes(field) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200'}`}>
                  <span>{field}</span>
                  {formData.studyFields?.includes(field) && <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between gap-4">
          {step > 1 && <button type="button" onClick={prevStep} className="px-8 py-4 rounded-2xl text-slate-500 font-bold">السابق</button>}
          {step < 4 ? (
            <button type="button" onClick={nextStep} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl mr-auto">التالي</button>
          ) : (
            <button type="submit" className="bg-emerald-600 text-white px-12 py-4 rounded-2xl font-bold shadow-2xl mr-auto flex items-center gap-2">إرسال <Send size={20} /></button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;