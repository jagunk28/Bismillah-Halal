import React from 'react';
import { CoupleInfo } from '../types/wedding';

interface SidebarProps {
  activePath: string;
  setActivePath: (path: string) => void;
  coupleInfo: CoupleInfo;
  daysRemaining: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePath,
  setActivePath,
  coupleInfo,
  daysRemaining,
}) => {
  const navItems = [
    {
      id: 'ringkasan-overview',
      label: 'Ringkasan',
      icon: 'space_dashboard',
    },
    {
      id: 'tabungan-budgeting',
      label: 'Tabungan & Budgeting',
      icon: 'account_balance_wallet',
    },
    {
      id: 'checklist-tugas',
      label: 'Checklist & Tugas',
      icon: 'checklist',
    },
    {
      id: 'daftar-tamu-rsvp',
      label: 'Daftar Tamu & RSVP',
      icon: 'group',
      badge: '250',
    },
    {
      id: 'rundown-hari-h',
      label: 'Susunan Acara / Rundown',
      icon: 'schedule',
      badge: 'Hari-H',
    },
    {
      id: 'vendor-kontrak',
      label: 'Vendor & Kontrak',
      icon: 'handshake',
    },
    {
      id: 'kontak-darurat',
      label: 'Kontak Darurat & PIC',
      icon: 'emergency',
    },
    {
      id: 'pengaturan-sync',
      label: 'Pengaturan & Sinkronisasi Pernikahan',
      icon: 'sync_alt',
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#f4f4f2] border-r border-[#c2c8c2]/30 z-40 flex flex-col justify-between p-4 shadow-[0_1px_8px_rgba(20,40,30,0.04)]">
      <div className="flex flex-col gap-4">
        {/* Header App Brand */}
        <div className="flex items-center gap-3 px-2 py-1 cursor-pointer" onClick={() => setActivePath('ringkasan-overview')}>
          <div className="w-10 h-10 rounded-xl bg-[#042217] flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[22px]">all_inclusive</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-[#042217] tracking-tight leading-none">
              Meet to Marry
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#396752] mt-1">
              Wedding Planner
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 mt-1">
          {navItems.map((item) => {
            const isActive = activePath === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePath(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#1b382b] text-white font-semibold shadow-sm'
                    : 'text-[#424844] hover:bg-[#e8e8e6] hover:text-[#1a1c1b]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-[#bbeed2] text-[#042217]'
                        : 'bg-[#e2e3e1] text-[#424844]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Dual-Partner Sync Bottom Card */}
      <div
        onClick={() => setActivePath('pengaturan-sync')}
        className="bg-white rounded-xl p-3.5 border border-[#c2c8c2]/40 shadow-sm flex flex-col gap-2 cursor-pointer hover:border-[#396752]/50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#396752] uppercase tracking-wider">
            Dual-Partner Sync
          </span>
          <span
            className="w-2.5 h-2.5 rounded-full bg-[#396752] ring-2 ring-[#bbeed2] animate-pulse"
            title="Tersinkron"
          ></span>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#042217] flex items-center justify-center text-white ring-2 ring-white text-xs font-bold shadow-xs">
              R
            </div>
            <div className="w-8 h-8 rounded-full bg-[#396752] flex items-center justify-center text-white ring-2 ring-white text-xs font-bold shadow-xs">
              D
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold text-[#042217]">
              {coupleInfo.brideName} &amp; {coupleInfo.groomName}
            </span>
            <span className="text-xs text-[#424844]">14 Des 2025</span>
          </div>
        </div>

        <div className="mt-1 pt-2 border-t border-[#eeeeec] flex items-center justify-between text-xs text-[#424844]">
          <span>Hari H Menuju</span>
          <span className="font-semibold text-[#396752] px-2 py-0.5 rounded-md bg-[#bbeed2]/50">
            {daysRemaining} hari lagi
          </span>
        </div>
      </div>
    </aside>
  );
};
