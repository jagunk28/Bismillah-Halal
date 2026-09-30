import React from 'react';
import {
  Wallet,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import {
  CoupleInfo,
  RundownItem,
  VendorItem,
  BudgetItem,
  GuestItem,
  ChecklistItem,
  EmergencyContact,
} from '../types/wedding';

interface DashboardViewProps {
  coupleInfo: CoupleInfo;
  rundownItems: RundownItem[];
  vendors: VendorItem[];
  budgetItems: BudgetItem[];
  guests: GuestItem[];
  checklist: ChecklistItem[];
  emergencyContacts: EmergencyContact[];
  onNavigateTab: (tab: string) => void;
  onToggleChecklist: (id: string) => void;
  onOpenChecklistModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  coupleInfo,
  rundownItems,
  vendors,
  budgetItems,
  guests,
  checklist,
  emergencyContacts,
  onNavigateTab,
  onToggleChecklist,
  onOpenChecklistModal,
}) => {
  // Perhitungan 4 metrik utama
  const totalAllocated = budgetItems.reduce((acc, b) => acc + b.allocated, 0);
  const totalSpent = budgetItems.reduce((acc, b) => acc + b.spent, 0);
  const budgetPercentage = Math.round((totalSpent / totalAllocated) * 100);

  const totalGuests = guests.reduce((acc, g) => acc + g.pax, 0);
  const confirmedGuests = guests
    .filter((g) => g.rsvpStatus === 'hadir')
    .reduce((acc, g) => acc + g.pax, 0);
  const rsvpPercentage = Math.round((confirmedGuests / (totalGuests || 1)) * 100);

  const completedVendors = vendors.filter((v) => v.status === 'lunas').length;
  const completedTasks = checklist.filter((c) => c.completed).length;
  const criticalPendingTasks = checklist.filter(
    (c) => !c.completed && c.priority === 'kritis'
  ).length;

  // Active / next rundown milestone
  const ongoingEvent = rundownItems.find((r) => r.status === 'ongoing') || rundownItems[1];
  const nextSakralEvent = rundownItems.find((r) => r.isSakral && r.status === 'upcoming') || rundownItems[3];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white p-6 md:p-8 shadow-sm">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 hidden md:block">
          <img
            src={coupleInfo.coverImage}
            alt="Foto sampul pernikahan"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Pusat Kendali Resepsi &amp; Hari-H</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif-luxury font-bold text-white mb-2 leading-tight">
            Selamat Datang di Portal Pernikahan {coupleInfo.brideName} &amp; {coupleInfo.groomName}
          </h2>
          <p className="text-stone-300 text-sm md:text-base leading-relaxed">
            Semua persiapan akad, kirab adat, kelengkapan vendor, dan alokasi meja tamu terpantau dalam satu dasbor presisi dengan protokol buffer waktu ramah pengantin.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('rundown')}
              className="bg-[#D9A74A] hover:bg-[#C29235] text-stone-950 font-semibold px-4 py-2 rounded-xl text-xs md:text-sm flex items-center space-x-2 transition cursor-pointer shadow-xs"
            >
              <span>Buka Rundown Sakral Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('emergency')}
              className="bg-stone-800/80 hover:bg-stone-700/80 border border-stone-600 text-stone-200 font-medium px-4 py-2 rounded-xl text-xs md:text-sm flex items-center space-x-2 transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>Kontak Darurat &amp; PIC</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 KEY METRICS (Layar Utama) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Budget Realization */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Anggaran &amp; Terbayar
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-stone-900 font-mono">
              Rp {(totalSpent / 1000000).toFixed(1)} jt
            </div>
            <div className="text-xs text-stone-600">
              dari pagu Rp {(totalAllocated / 1000000).toFixed(0)} jt ({budgetPercentage}% realisasi)
            </div>
          </div>
          <div className="mt-3 w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex justify-between items-center text-xs">
            <span className="text-stone-600 font-medium">Sisa Pelunasan:</span>
            <span className="font-semibold text-stone-800 font-mono">
              Rp {((totalAllocated - totalSpent) / 1000000).toFixed(1)} jt
            </span>
          </div>
        </div>

        {/* Metric 2: Guest & RSVP Status */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Konfirmasi Tamu RSVP
            </span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-stone-900 font-mono">
              {confirmedGuests} <span className="text-sm font-normal text-stone-600">Pax Hadir</span>
            </div>
            <div className="text-xs text-stone-600">
              Target 500 pax ({rsvpPercentage}% respon hadir)
            </div>
          </div>
          <div className="mt-3 w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-rose-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(rsvpPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex justify-between items-center text-xs">
            <span className="text-stone-600 font-medium">Tamu VIP Terdaftar:</span>
            <span className="font-semibold text-stone-800">
              {guests.filter((g) => g.category === 'VIP').length} Undangan
            </span>
          </div>
        </div>

        {/* Metric 3: Vendor Readiness */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Kesiapan Vendor
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-stone-900 font-mono">
              {vendors.length} <span className="text-sm font-normal text-stone-600">Vendor Siaga</span>
            </div>
            <div className="text-xs text-emerald-700 font-medium">
              {completedVendors} Lunas · {vendors.length - completedVendors} Menunggu Sisa DP
            </div>
          </div>
          <div className="mt-3 w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedVendors / vendors.length) * 100}%` }}
            ></div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex justify-between items-center text-xs">
            <span className="text-stone-600 font-medium">Technical Meeting:</span>
            <span className="font-semibold text-stone-800">17 Okt (H-7)</span>
          </div>
        </div>

        {/* Metric 4: Priority Checklist */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Checklist &amp; Progres
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-stone-900 font-mono">
              {completedTasks}/{checklist.length}{' '}
              <span className="text-sm font-normal text-stone-600">Selesai</span>
            </div>
            <div className="text-xs text-stone-600">
              {criticalPendingTasks > 0 ? (
                <span className="text-amber-800 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 inline text-amber-700" />
                  {criticalPendingTasks} Tugas Prioritas Kritis Menanti
                </span>
              ) : (
                <span className="text-emerald-700 font-medium">Semua tugas aman terkendali</span>
              )}
            </div>
          </div>
          <div className="mt-3 w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedTasks / checklist.length) * 100}%` }}
            ></div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex justify-between items-center text-xs">
            <span className="text-stone-600 font-medium">Tugas Terdekat:</span>
            <span className="font-semibold text-rose-700 truncate max-w-[130px]">
              Final Fitting Busana
            </span>
          </div>
        </div>
      </div>

      {/* RUNDOWN SNAPSHOT & SAKRAL HIGHLIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Hari-H Orchestration Snapshot (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E1D5] p-5 md:p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                  Visual Timeline Hari-H &amp; Buffer Time
                </h3>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Pemantauan sesi sakral dengan cadangan waktu keamanan (+15 menit buffer)
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('rundown')}
              className="text-xs text-[#9B6D3B] hover:text-[#7A522A] font-semibold flex items-center space-x-1 self-start sm:self-auto cursor-pointer"
            >
              <span>Lihat 11 Rangkaian Acara</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Current Ongoing Event Card */}
          {ongoingEvent && (
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                  <span>Sedang Berlangsung Sekarang</span>
                </span>
                <span className="text-xs font-mono font-bold text-stone-800 bg-white px-2 py-0.5 rounded-md border border-amber-200">
                  {ongoingEvent.timeStart} - {ongoingEvent.timeEnd} WIB
                </span>
              </div>
              <h4 className="text-lg font-bold text-stone-900 mb-1">{ongoingEvent.title}</h4>
              <p className="text-xs text-stone-600 mb-3">{ongoingEvent.notes}</p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-2 border-t border-amber-200/70">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  {ongoingEvent.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  Buffer: +{ongoingEvent.bufferMinutes} menit
                </span>
                <span>•</span>
                <span className="font-semibold text-stone-800">
                  PIC: {ongoingEvent.picName} ({ongoingEvent.picPhone})
                </span>
              </div>
            </div>
          )}

          {/* Next Sakral Milestone Banner */}
          {nextSakralEvent && (
            <div className="mt-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#9B6D3B] text-white flex items-center justify-center font-serif-luxury font-bold text-lg shrink-0 shadow-2xs">
                  🕊️
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#9B6D3B] bg-[#F4E8D7] px-2 py-0.5 rounded">
                      Momen Sakral Paling Dekat
                    </span>
                    <span className="text-xs font-mono text-stone-600">
                      Pukul {nextSakralEvent.timeStart} WIB
                    </span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm md:text-base mt-0.5">
                    {nextSakralEvent.title}
                  </h4>
                  <p className="text-xs text-stone-600">
                    Lokasi: {nextSakralEvent.location} · Dilengkapi panduan mikrofon &amp; doa nikah
                  </p>
                </div>
              </div>
              <div className="sm:self-center shrink-0">
                <a
                  href={`tel:${nextSakralEvent.picPhone}`}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition"
                >
                  <Phone className="w-3 h-3 text-amber-300" />
                  <span>Hubungi PIC ({nextSakralEvent.picName.split(' ')[0]})</span>
                </a>
              </div>
            </div>
          )}

          {/* Timeline Mini Bar Preview */}
          <div className="mt-5 pt-4 border-t border-stone-100">
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
              Alur Waktu Hari-H (Progress Alur Acara)
            </h5>
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-200 -translate-y-1/2 z-0"></div>
              <div className="relative z-10 grid grid-cols-4 gap-2 text-center">
                <div className="bg-white border-2 border-emerald-500 rounded-xl p-2 shadow-2xs">
                  <span className="text-[10px] font-bold text-emerald-800 block">05:00 - 07:00</span>
                  <span className="text-xs font-semibold text-stone-800 truncate block">Makeup &amp; Hairdo</span>
                  <span className="text-[9px] text-emerald-800 font-bold block mt-0.5">✓ SELESAI</span>
                </div>
                <div className="bg-amber-100 border-2 border-amber-600 rounded-xl p-2 shadow-2xs">
                  <span className="text-[10px] font-bold text-amber-900 block">07:00 - 07:45</span>
                  <span className="text-xs font-semibold text-stone-900 truncate block">First Look</span>
                  <span className="text-[9px] text-amber-900 font-bold block mt-0.5 animate-pulse">BERJALAN</span>
                </div>
                <div className="bg-white border border-[#D9C4A6] rounded-xl p-2 shadow-2xs">
                  <span className="text-[10px] font-bold text-stone-600 block">08:00 - 09:00</span>
                  <span className="text-xs font-semibold text-stone-800 truncate block">Akad Sakral</span>
                  <span className="text-[9px] text-[#9B6D3B] font-bold block mt-0.5">SAKRAL</span>
                </div>
                <div className="bg-white border border-stone-200 rounded-xl p-2 shadow-2xs opacity-80">
                  <span className="text-[10px] font-bold text-stone-500 block">11:45 - 14:30</span>
                  <span className="text-xs font-semibold text-stone-700 truncate block">Kirab &amp; Resepsi</span>
                  <span className="text-[9px] text-stone-500 block mt-0.5">500 Pax</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Priority Checklist & Emergency Dial (1 col) */}
        <div className="space-y-6">
          {/* Priority Checklist */}
          <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                  Tugas Prioritas Pernikahan
                </h3>
                <span className="text-[11px] text-stone-600">
                  {completedTasks} dari {checklist.length} checklist tuntas
                </span>
              </div>
              <button
                onClick={onOpenChecklistModal}
                className="text-xs text-[#9B6D3B] hover:text-[#7A522A] font-semibold cursor-pointer"
              >
                + Tambah
              </button>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {checklist.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onToggleChecklist(item.id)}
                  className={`p-2.5 rounded-xl border text-xs flex items-start space-x-2.5 cursor-pointer transition ${
                    item.completed
                      ? 'bg-stone-50 border-stone-200 text-stone-600 line-through opacity-70'
                      : item.priority === 'kritis'
                      ? 'bg-rose-50/50 border-rose-200 text-stone-800'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-amber-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {}}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="font-medium leading-snug">{item.task}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-600">
                      <span className="font-medium text-stone-600">{item.assignee}</span>
                      <span>·</span>
                      <span
                        className={
                          item.priority === 'kritis'
                            ? 'text-rose-700 font-bold uppercase'
                            : 'text-stone-600'
                        }
                      >
                        {item.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('emergency')}
              className="w-full mt-3 text-center text-xs font-semibold text-[#9B6D3B] hover:underline"
            >
              Kelola Seluruh Checklist &amp; PIC →
            </button>
          </div>

          {/* Quick Emergency Contacts Hub Mini */}
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8E1D5] p-5 shadow-2xs">
            <div className="flex items-center space-x-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <h4 className="font-serif-luxury font-bold text-stone-900 text-base">
                Kontak Cepat Saat Darurat
              </h4>
            </div>
            <p className="text-xs text-stone-600 mb-3">
              Tim siap siaga dalam radius &lt; 5 menit dari Plataran Dharmawangsa:
            </p>

            <div className="space-y-2">
              {emergencyContacts.slice(0, 3).map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white p-2.5 rounded-xl border border-stone-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-stone-900 block truncate max-w-[140px]">
                      {contact.name}
                    </span>
                    <span className="text-[10px] text-stone-600 block">{contact.role}</span>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 flex items-center gap-1 shadow-2xs"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Hubungi</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VENDOR HIGHLIGHT GALLERY & BUDGET FLOW ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Showcase Carousel/Grid */}
        <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                Vendor Inti &amp; Portofolio
              </h3>
              <p className="text-xs text-stone-600">Dokumentasi hasil karya vendor pilihan pengantin</p>
            </div>
            <button
              onClick={() => onNavigateTab('vendors')}
              className="text-xs text-[#9B6D3B] hover:text-[#7A522A] font-semibold cursor-pointer"
            >
              Semua Vendor ({vendors.length}) →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {vendors.slice(0, 4).map((vendor) => (
              <div
                key={vendor.id}
                onClick={() => onNavigateTab('vendors')}
                className="group relative rounded-xl overflow-hidden border border-stone-200 bg-stone-100 cursor-pointer shadow-2xs"
              >
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-24 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2 text-white">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-amber-300">
                    {vendor.category}
                  </span>
                  <span className="text-xs font-bold truncate">{vendor.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Realization Breakdown */}
        <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                Alokasi Pagu Anggaran
              </h3>
              <p className="text-xs text-stone-600">Distribusi biaya per kategori utama</p>
            </div>
            <button
              onClick={() => onNavigateTab('budget')}
              className="text-xs text-[#9B6D3B] hover:text-[#7A522A] font-semibold cursor-pointer"
            >
              Rincian Biaya →
            </button>
          </div>

          <div className="space-y-3">
            {budgetItems.slice(0, 4).map((item) => {
              const pct = Math.round((item.spent / item.allocated) * 100);
              return (
                <div key={item.id} className="text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-stone-800">{item.category}</span>
                    <span className="font-mono font-semibold text-stone-900">
                      Rp {(item.spent / 1000000).toFixed(1)} jt / {(item.allocated / 1000000).toFixed(0)} jt ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        pct >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
