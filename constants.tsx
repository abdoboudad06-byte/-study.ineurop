
import React from 'react';
import { LayoutDashboard, UserPlus, Users } from 'lucide-react';

export const STUDY_FIELDS = [
  "الهندسة (Ingénierie)", 
  "الطب والصيدلة (Médecine)", 
  "التسيير والاقتصاد (Gestion)", 
  "المعلوميات (Informatique)", 
  "الهندسة المعمارية (Architecture)", 
  "الحقوق (Droit)", 
  "التصميم والفنون (Design)", 
  "اللغات والآداب (Langues)", 
  "السياحة والفندقة (Tourisme)"
];

export const GUARANTOR_OPTIONS = [
  'الأب', 'الأم', 'الأخ', 'الأخت', 'العم/الخال', 'العمة/الخالة', 'آخر'
];

export const DIPLOMA_TYPES = [
  "ثانية باك (2ème Bac)",
  "تقني متخصص (DTS/BTS)",
  "إجازة (Licence)",
  "ماستر (Master)",
  "مهندس (Ingénieur)",
  "آخر"
];

export const BAC_YEARS = [
  "2025 (مقبل)", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "قبل 2018"
];

export const LAST_STUDY_YEARS = [
  "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "قبل 2018"
];

export const GAP_YEARS_OPTIONS = [
  "بدون انقطاع (0 سنة)", "سنة واحدة", "سنتين", "3 سنوات", "أكثر من 3 سنوات"
];

export const OTHER_DIPLOMA_LIST = [
  "لا يوجد", "دبلوم تقني", "شهادة لغة (B1/B2)", "إجازة مهنية", "تكوين خاص", "أخرى"
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: <LayoutDashboard size={20} /> },
  { id: 'form', label: 'تسجيل جديد', icon: <UserPlus size={20} /> },
  { id: 'leads', label: 'الطلبات الواردة', icon: <Users size={20} /> },
];

// استبدل هذا الرقم برقم هاتفك بصيغة دولية بدون +
export const AGENCY_PHONE = "212600000000"; 
