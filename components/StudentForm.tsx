
import React, { useState } from 'react';
import { Send, CheckCircle2, ChevronRight, ChevronLeft, School, Globe, Wallet, Users, LayoutGrid, Clock, AlertCircle } from 'lucide-react';
import { StudentApplication, CountryPreference, GuarantorType } from '../types';
import { STUDY_FIELDS, GUARANTOR_OPTIONS, AGENCY_PHONE, DIPLOMA_TYPES, BAC_YEARS, LAST_STUDY_YEARS, OTHER_DIPLOMA_LIST, GAP_YEARS_OPTIONS } from '../constants';

interface StudentFormProps {
  onComplete: (app: StudentApplication) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    
    // Validate Full Name
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل)';
    }

    // Validate Phone (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'يرجى إدخال رقم هاتف صحيح مكون من 10 أرقام (مثال: 0600000000)';
    }

    // Validate Email
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
        setStep(s => Math.min(s + 1, 4));
      }
    } else {
      setStep(s => Math.min(s + 1, 4));
    }
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleFieldToggle = (field: string) => {
    const current = formData.studyFields || [];
    if (current.includes(field)) {
      setFormData({ ...formData, studyFields: current.filter(f => f !== field) });
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
🏫 *المستوى الدراسي:* ${finalData.diplomaType}
🗓️ *آخر سنة دراسية:* ${finalData.lastDiplomaYear}
⏳ *السنوات البيضاء:* ${finalData.gapYears}
🛠️ *شواهد أخرى:* ${finalData.otherDiplomas}
🌍 *الوجهة:* ${finalData.destination === 'Espagne' ? 'إسبانيا 🇪🇸' : 'البرتغال 🇵🇹'}
🛡️ *الضامن:* ${finalData.guarantorType}
💰 *البلوكاج (+70k DH):* ${finalData.canBlockFunds ? 'نعم ✅' : 'لا ❌'}
📚 *المجالات:* ${finalData.studyFields.join(', ')}`;
    
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${AGENCY_PHONE}?text=${encoded}`, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto bg-white p-12 rounded-3xl shadow-xl text-center border border-slate-100 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-noto">تم إرسال طلبك بنجاح!</h3>
        <p className="text-slate-600 mb-8 font-noto">لقد تم فتح الواتساب للتواصل مع وكالة study.ineurop مباشرة. سنقوم بمراجعة ملفك والرد عليك في أقرب وقت.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-indigo-600 font-bold hover:underline font-noto"
        >
          إرسال طلب آخر
        </button>
      </div>
    );
  }

  const OptionGrid = ({ options, value, onChange, columns = 2 }: { options: string[], value?: string, onChange: (v: string) => void, columns?: number }) => (
    <div className={`grid grid-cols-1 sm:grid-cols-${columns} gap-2`}>
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all text-right flex items-center justify-between ${value === opt ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-100' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}
        >
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

      <form onSubmit={handleSubmit} className="p-6 md:p-10 font-noto" dir="rtl">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center gap-3 mb-6 text-indigo-600 font-bold text-xl">
              <Users size={28} />
              <h3>المعلومات الشخصية</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">الاسم والنسب الكامل</label>
                <input 
                  required 
                  type="text" 
                  className={`w-full px-5 py-3 rounded-xl border ${errors.fullName ? 'border-rose-500 bg-rose-50' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-right font-bold`}
                  value={formData.fullName} 
                  onChange={e => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }} 
                  placeholder="مثال: محمد العلوي" 
                />
                {errors.fullName && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.fullName}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">رقم الواتساب (10 أرقام)</label>
                  <input 
                    required 
                    type="tel" 
                    maxLength={10}
                    className={`w-full px-5 py-3 rounded-xl border ${errors.phone ? 'border-rose-500 bg-rose-50' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500 outline-none text-right font-bold`}
                    value={formData.phone} 
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, ''); // Only allow numbers
                      setFormData({ ...formData, phone: val });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }} 
                    placeholder="0612345678" 
                  />
                  {errors.phone && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
                  <input 
                    required 
                    type="email" 
                    className={`w-full px-5 py-3 rounded-xl border ${errors.email ? 'border-rose-500 bg-rose-50' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500 outline-none text-right font-bold`}
                    value={formData.email} 
                    onChange={e => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }} 
                    placeholder="name@email.com" 
                  />
                  {errors.email && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center gap-3 mb-6 text-indigo-600 font-bold text-xl">
              <School size={28} />
              <h3>المسار الدراسي</h3>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">الشهادة المدرسية / المستوى الحالي</label>
              <OptionGrid options={DIPLOMA_TYPES} value={formData.diplomaType} onChange={v => setFormData({ ...formData, diplomaType: v })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">سنة الحصول على البكالوريا</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-right font-bold"
                  value={formData.bacYear} onChange={e => setFormData({ ...formData, bacYear: e.target.value })}>
                  {BAC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">آخر سنة دراسية كاملة</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-right font-bold"
                  value={formData.lastDiplomaYear} onChange={e => setFormData({ ...formData, lastDiplomaYear: e.target.value })}>
                  {LAST_STUDY_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Clock size={18} className="text-indigo-600" /> عدد السنوات البيضاء (انقطاع عن الدراسة)
              </label>
              <OptionGrid options={GAP_YEARS_OPTIONS} value={formData.gapYears} onChange={v => setFormData({ ...formData, gapYears: v })} />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">هل حصلت على شواهد أو دبلومات أخرى؟</label>
              <OptionGrid options={OTHER_DIPLOMA_LIST} value={formData.otherDiplomas} onChange={v => setFormData({ ...formData, otherDiplomas: v })} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center gap-3 mb-6 text-indigo-600 font-bold text-xl">
              <Globe size={28} />
              <h3>الوجهة والتمويل</h3>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-4 text-center">أين تريد متابعة دراستك؟</label>
              <div className="grid grid-cols-2 gap-4">
                {['Espagne', 'Portugal'].map(country => (
                  <button key={country} type="button" onClick={() => setFormData({ ...formData, destination: country as CountryPreference })}
                    className={`py-8 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${formData.destination === country ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-xl' : 'border-slate-100 hover:border-slate-200 bg-white'}`}>
                    <span className="text-4xl">{country === 'Espagne' ? '🇪🇸' : '🇵🇹'}</span>
                    <span className="font-bold text-lg">{country === 'Espagne' ? 'إسبانيا' : 'البرتغال'}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 opacity-50"></div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-lg flex items-center gap-2"><Wallet size={22} className="text-indigo-400" /> البلوكاج البنكي</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={formData.canBlockFunds} onChange={e => setFormData({ ...formData, canBlockFunds: e.target.checked })} />
                  <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"></div>
                </label>
              </div>
              <p className="text-indigo-200 text-sm leading-relaxed font-medium">هل تتوفر على مبلغ مالي (+70,000 درهم) لوضعه في حساب بنكي مغلق؟</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">من هو الضامن المتاح لملفك؟</label>
              <OptionGrid options={GUARANTOR_OPTIONS} value={formData.guarantorType} onChange={v => setFormData({ ...formData, guarantorType: v as any })} columns={3} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center gap-3 mb-6 text-indigo-600 font-bold text-xl">
              <LayoutGrid size={28} />
              <h3>المجالات الدراسية</h3>
            </div>
            <p className="text-slate-600 font-bold mb-4">اختر التخصصات التي تهمك (يمكنك اختيار أكثر من واحد):</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STUDY_FIELDS.map(field => (
                <button key={field} type="button" onClick={() => handleFieldToggle(field)}
                  className={`px-4 py-4 rounded-2xl border text-sm font-bold transition-all text-right flex items-center justify-between ${formData.studyFields?.includes(field) ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-[1.02]' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
                  <span>{field}</span>
                  {formData.studyFields?.includes(field) && <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button type="button" onClick={prevStep} className="px-8 py-4 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 transition-all flex items-center gap-2 font-bold">
              <ChevronRight size={20} /> السابق
            </button>
          ) : <div />}
          
          {step < 4 ? (
            <button 
              type="button" 
              onClick={nextStep} 
              className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 mr-auto font-bold"
            >
              التالي <ChevronLeft size={20} />
            </button>
          ) : (
            <button 
              type="submit" 
              className="bg-emerald-600 text-white px-12 py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-2xl shadow-emerald-100 transition-all flex items-center gap-2 mr-auto font-bold"
            >
              إرسال عبر الواتساب <Send size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
