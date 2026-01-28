
export type CountryPreference = 'Espagne' | 'Portugal';

export type GuarantorType = 'الأب' | 'الأم' | 'الأخ' | 'الأخت' | 'العم/الخال' | 'العمة/الخالة' | 'آخر';

export interface StudentApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  diplomaType: string;
  bacYear: string;
  otherDiplomas: string;
  lastDiplomaYear: string;
  gapYears: string; // تم التغيير من boolean إلى string لاستيعاب الخيارات
  destination: CountryPreference;
  hasGuarantor: boolean;
  guarantorType: GuarantorType;
  canBlockFunds: boolean; // Over 70,000 MAD
  studyFields: string[];
  submissionDate: string;
  status: 'Pending' | 'Contacted' | 'In Progress' | 'Completed';
}

export type FilterCategory = 'All' | 'Spain' | 'Portugal' | 'BlockageReady' | 'HasGuarantor' | 'Recent';
