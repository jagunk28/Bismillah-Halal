export interface CoupleInfo {
  brideName: string;
  groomName: string;
  brideFullName: string;
  groomFullName: string;
  weddingDate: string; // ISO date string e.g. "2025-12-14T08:00:00"
  venueName: string;
  venueAddress: string;
  city: string;
  hashtag: string;
  coverImage: string;
  coupleAvatar?: string;
  coupleAvatarRina: string;
  coupleAvatarDimas: string;
  totalGuestsTarget: number;
  totalBudgetLimit: number;
  currentSavings: number;
}

export interface PartnerSyncSettings {
  isSynced: boolean;
  lastSyncTimestamp: string;
  pairCode: string;
  allowPartnerBudgetEdit: boolean;
  allowPartnerGuestEdit: boolean;
  allowPartnerVendorEdit: boolean;
  allowPartnerChecklistEdit: boolean;
  permissions: {
    manageBudget: boolean;
    editChecklist: boolean;
    manageGuests: boolean;
    realTimeAlerts: boolean;
  };
  notifications: {
    vendorReminders: boolean;
    savingsAlerts: boolean;
    dailyTaskDigest: boolean;
    sundayDigest: boolean;
    vendorPromo: boolean;
  };
  display: {
    currency: 'IDR' | 'USD' | 'SGD';
    calendarFormat: 'Masehi & Kalender Hijriah / Adat' | 'Kalender Masehi Standar' | 'Masehi & Weton Jawa';
    themeMode: 'Botanical Natural' | 'Champagne Luxe';
  };
  rinaProfile: {
    name: string;
    nickname: string;
    role: string;
    email: string;
    phone: string;
    birthDate: string;
    sizeKebayaAkad: string;
    sizeBusanaResepsi: string;
    avatar: string;
  };
  dimasProfile: {
    name: string;
    nickname: string;
    role: string;
    email: string;
    phone: string;
    avatar: string;
    appClient: string;
  };
}

export interface GuestItem {
  id: string;
  name: string;
  relationOrRole: string;
  side: 'rina' | 'dimas' | 'both';
  category: 'VIP • Keluarga' | 'Keluarga' | 'Sahabat' | 'Rekan Kerja' | 'VIP' | string;
  pax: number;
  phone: string;
  invitationStatus: 'Terbaca di Web' | 'Link Terkirim' | 'QR Siap' | 'Belum Kirim' | 'Terbaca' | string;
  rsvpStatus: 'hadir' | 'menunggu' | 'berhalangan' | 'belum_kirim' | 'belum_konfirmasi' | 'tidak_hadir';
  session: 'Sesi 1 (Akad & Syukuran)' | 'Sesi 2 (Resepsi Sore)' | string;
  tableNumber: string;
  dietaryOrSpecialNotes?: string;
  dietary?: string;
  notes?: string;
  checkedIn: boolean;
  checkedInTime?: string;
  souvenirClaimed: boolean;
}

export interface ExpenseItem {
  id: string;
  amount: number;
  title: string;
  category: string;
  paymentStatus: 'lunas' | 'dp' | 'unpaid';
  sourceAccount: 'joint' | 'dimas' | 'rina';
  paidBy: '50:50' | 'dimas' | 'rina' | 'custom';
  notes: string;
  receiptName?: string;
  date: string;
  recordedBy: 'Rina Astuti' | 'Dimas Prasetyo';
}

export interface NoteItem {
  id: string;
  title: string;
  priority: 'mendesak' | 'penting' | 'ide';
  category: string;
  mentionedPartners: string[];
  content: string;
  convertedToTask: boolean;
  createdAt: string;
  author: 'Rina Astuti' | 'Dimas Prasetyo';
  relatedTasksCount?: number;
}

export interface RundownItem {
  id: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  category: 'persiapan' | 'sakral' | 'kirab' | 'resepsi' | 'foto' | 'afterparty';
  isSakral: boolean;
  location: string;
  picName: string;
  picRole: string;
  picPhone: string;
  bufferMinutes: number;
  musicCue: string;
  dresscode: string;
  props: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'delayed';
  notes: string;
}

export interface VendorItem {
  id: string;
  name: string;
  category: 'venue' | 'catering' | 'decor' | 'attire' | 'mua' | 'photo' | 'mc' | 'entertainment' | 'invitation';
  contactPerson: string;
  phone: string;
  instagram: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: 'lunas' | 'dp_paid' | 'pending' | 'review';
  rating: number;
  deliverables: string[];
  image: string;
  meetingNotes?: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  name: string;
  allocated: number;
  spent: number;
  status: 'lunas' | 'sebagian' | 'belum';
  notes: string;
}

export interface ChecklistItem {
  id: string;
  task?: string;
  title?: string;
  dueDate?: string;
  timeframe?: string;
  category: string;
  priority: 'kritis' | 'tinggi' | 'sedang' | 'rendah' | 'urgent' | 'high' | 'medium' | 'low';
  completed: boolean;
  assignee?: string;
  pic?: string;
}

export interface EmergencyContact {
  id: string;
  role: string;
  name: string;
  phone: string;
  agencyOrCompany: string;
  isPriority: boolean;
}

export interface ContingencyRisk {
  id: string;
  risk: string;
  mitigation: string;
  pic: string;
  status: 'aman' | 'pantau' | 'kritis';
}

export interface SeserahanItem {
  id: string;
  from: 'CPP ke CPW' | 'CPW ke CPP';
  boxNumber: number;
  title: string;
  items: string[];
  pic: string;
  status: 'siap' | 'dalam_hias' | 'belum_lengkap';
}
