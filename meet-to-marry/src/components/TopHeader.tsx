import React, { useState } from 'react';
import { CoupleInfo } from '../types/wedding';

interface TopHeaderProps {
  activePath: string;
  coupleInfo: CoupleInfo;
  onOpenQuickEntry: () => void;
  onNavigate: (path: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activePath,
  coupleInfo,
  onOpenQuickEntry,
  onNavigate,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const pathTitles: Record<string, string> = {
    'ringkasan-overview': 'Ringkasan',
    'tabungan-budgeting': 'Tabungan & Budgeting',
    'checklist-tugas': 'Checklist & Tugas',
    'daftar-tamu-rsvp': 'Daftar Tamu & RSVP',
    'rundown-hari-h': 'Susunan Acara / Rundown Hari-H',
    'vendor-kontrak': 'Vendor & Kontrak',
    'kontak-darurat': 'Kontak Darurat & PIC',
    'pengaturan-sync': 'Pengaturan & Sinkronisasi Pernikahan',
    'pengaturan-pasangan': 'Pengaturan & Sinkronisasi Pernikahan',
  };

  const notifications = [
    {
      id: '1',
      title: 'Dimas menambahkan catatan KUA',
      time: '15 menit lalu',
      desc: 'Pemberkasan Berkas Nikah KUA Setiabudi & Rekomendasi RT/RW',
      icon: 'edit_note',
      read: false,
    },
    {
      id: '2',
      title: 'Pelunasan DP 2 Dekorasi Pelaminan',
      time: '1 jam lalu',
      desc: 'Rina mencatat pengeluaran Rp 15.000.000 (Stupa Casavandeva)',
      icon: 'payments',
      read: false,
    },
    {
      id: '3',
      title: 'Konfirmasi RSVP Tamu VIP',
      time: '3 jam lalu',
      desc: 'Dr. Budi Santoso & Pendamping mengonfirmasi Hadir (2 Pax)',
      icon: 'how_to_reg',
      read: true,
    },
  ];

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-[#f9f9f7]/90 backdrop-blur-md border-b border-[#c2c8c2]/30 z-30 flex items-center justify-between px-8 shadow-[0_1px_8px_rgba(20,40,30,0.04)]">
      {/* Breadcrumb & Global Search */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-[#424844] font-medium">
          <span
            className="hover:text-[#1a1c1b] cursor-pointer"
            onClick={() => onNavigate('ringkasan-overview')}
          >
            Meet to Marry
          </span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#042217] font-semibold">
            {pathTitles[activePath] || 'Dasbor Perencana'}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-[#f4f4f2] px-3 py-1.5 rounded-xl text-[#424844] w-72 border border-[#c2c8c2]/30 focus-within:border-[#396752]/50 focus-within:bg-white transition-all">
          <span className="material-symbols-outlined text-[18px]">search</span>
          <input
            className="bg-transparent border-none outline-none text-xs text-[#1a1c1b] w-full placeholder:text-[#727974]"
            placeholder="Cari tugas, vendor, atau tamu..."
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Action Buttons & Partner Info */}
      <div className="flex items-center gap-3">
        {/* + Catatan / Pengeluaran CTA Button */}
        <button
          onClick={onOpenQuickEntry}
          className="flex items-center gap-1.5 bg-[#042217] text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-[#1b382b] transition-all shadow-sm cursor-pointer hover:shadow-md"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Catatan / Pengeluaran</span>
        </button>

        {/* Live Partner Sync Pill */}
        <div
          onClick={() => onNavigate('pengaturan-pasangan')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bbeed2]/40 text-[#204f3b] text-xs font-semibold cursor-pointer hover:bg-[#bbeed2]/60 transition-colors"
          title="Sinkronisasi Berdua Aktif"
        >
          <span className="w-2 h-2 rounded-full bg-[#396752] animate-ping"></span>
          <span>Sinkron Langsung</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifikasi Pasangan"
            className="relative p-2 rounded-xl text-[#424844] hover:bg-[#e8e8e6] hover:text-[#1a1c1b] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#ba1a1a] ring-2 ring-[#f9f9f7]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#c2c8c2]/50 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#eeeeec] mb-2">
                <span className="text-xs font-bold text-[#042217]">Aktivitas Pasangan &amp; Update</span>
                <span className="text-[10px] bg-[#bbeed2] text-[#204f3b] px-2 py-0.5 rounded-full font-bold">
                  2 Baru
                </span>
              </div>
              <div className="flex flex-col gap-2.5 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl flex items-start gap-2.5 text-xs transition-colors ${
                      n.read ? 'bg-white' : 'bg-[#f4f4f2]'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#bbeed2]/60 text-[#396752] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">{n.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1a1c1b]">{n.title}</span>
                        <span className="text-[10px] text-[#727974]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#424844] mt-0.5 leading-snug">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-full mt-2 pt-2 border-t border-[#eeeeec] text-center text-xs font-medium text-[#396752] hover:underline cursor-pointer"
              >
                Tutup Notifikasi
              </button>
            </div>
          )}
        </div>

        {/* Dual Partner Profile Pill */}
        <div className="relative pl-1 border-l border-[#c2c8c2]/40">
          <div
            onClick={() => onNavigate('pengaturan-pasangan')}
            className="flex items-center gap-2 bg-[#f4f4f2] px-2.5 py-1 rounded-xl border border-[#c2c8c2]/30 cursor-pointer hover:bg-[#e8e8e6] transition-colors"
          >
            <div className="flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-[#042217] flex items-center justify-center text-white text-[10px] font-bold ring-1 ring-white">
                R
              </div>
              <div className="w-6 h-6 rounded-full bg-[#396752] flex items-center justify-center text-white text-[10px] font-bold ring-1 ring-white">
                D
              </div>
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#042217] leading-tight">
                {coupleInfo.brideName} &amp; {coupleInfo.groomName}
              </span>
              <span className="text-[10px] text-[#396752] flex items-center gap-1 leading-tight font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#396752]"></span>
                Tersambung
              </span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#424844] hidden lg:inline">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
