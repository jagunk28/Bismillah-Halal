import React, { useState } from 'react';
import { CoupleInfo, PartnerSyncSettings } from '../types/wedding';

interface SettingsSyncViewProps {
  coupleInfo: CoupleInfo;
  onUpdateCoupleInfo: (info: CoupleInfo) => void;
  syncSettings: PartnerSyncSettings;
  onUpdateSyncSettings: (settings: PartnerSyncSettings) => void;
  onExportPDF: () => void;
  onExportExcel: () => void;
}

export const SettingsSyncView: React.FC<SettingsSyncViewProps> = ({
  coupleInfo,
  onUpdateCoupleInfo,
  syncSettings,
  onUpdateSyncSettings,
  onExportPDF,
  onExportExcel,
}) => {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isEditingCouple, setIsEditingCouple] = useState(false);
  const [tempCouple, setTempCouple] = useState(coupleInfo);
  const [isAddingCollaborator, setIsAddingCollaborator] = useState(false);
  const [newCollab, setNewCollab] = useState({ name: '', role: 'WO Crew', email: '', phone: '' });
  const [collaborators, setCollaborators] = useState([
    {
      id: 'c1',
      name: 'Sarah Wijaya',
      agency: 'Nayla Wedding Planner',
      role: 'Kepala Wedding Organizer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      accessLevel: 'Full Access (Semua Modul)',
      status: 'Active',
      lastActive: 'Baru saja',
    },
    {
      id: 'c2',
      name: 'Bambang Sudiro',
      agency: 'Keluarga Pria (Ayah)',
      role: 'PIC Tamu & Transportasi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      accessLevel: 'Terbatas (Tamu & Rundown)',
      status: 'Active',
      lastActive: '2 jam lalu',
    },
    {
      id: 'c3',
      name: 'Ibu Ratna Dewi',
      agency: 'Keluarga Wanita (Ibu)',
      role: 'PIC Seragam & Souvenir',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      accessLevel: 'Terbatas (Checklist & Tamu)',
      status: 'Active',
      lastActive: 'Kemarin, 19:40',
    },
  ]);

  const [notifications, setNotifications] = useState({
    waRsvpBlast: true,
    waVendorDue: true,
    waDailyDigest: false,
    appSoundAlert: true,
    partnerLiveLocation: true,
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(syncSettings.pairCode);
    setCopyFeedback('Kode sinkronisasi berhasil disalin!');
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  const handleSaveCouple = () => {
    onUpdateCoupleInfo(tempCouple);
    setIsEditingCouple(false);
  };

  const handleAddCollaborator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollab.name) return;
    setCollaborators([
      ...collaborators,
      {
        id: `c_${Date.now()}`,
        name: newCollab.name,
        agency: newCollab.role,
        role: newCollab.role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        accessLevel: 'Editor Lapangan',
        status: 'Invited',
        lastActive: 'Menunggu konfirmasi',
      },
    ]);
    setNewCollab({ name: '', role: 'WO Crew', email: '', phone: '' });
    setIsAddingCollaborator(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#c2c8c2]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bbeed2]/40 text-[#204f3b] text-xs font-semibold mb-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-600 animate-pulse">cloud_sync</span>
            <span>Sinkronisasi Real-Time Multi-Perangkat</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold font-display text-[#042217] tracking-tight">
            Pengaturan & Sinkronisasi Pernikahan
          </h1>
          <p className="text-sm text-[#424844] mt-1">
            Sinkronisasi otomatis antara ponsel Rina, Dimas, dan kru Wedding Organizer Nayla Planner.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#042217] text-white text-xs font-semibold hover:bg-[#1b382b] transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">key</span>
            <span>Salin Kode Sync: {syncSettings.pairCode}</span>
          </button>
          <button
            onClick={() => setIsAddingCollaborator(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#c2c8c2] bg-white text-[#042217] text-xs font-semibold hover:bg-[#f4f4f2] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Undang Tim / Kru WO</span>
          </button>
        </div>
      </div>

      {copyFeedback && (
        <div className="bg-[#bbeed2] text-[#002114] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{copyFeedback}</span>
          </div>
          <button onClick={() => setCopyFeedback(null)} className="text-[#002114]/70 hover:text-[#002114]">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sync Status & Couple Profiles (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Status Koneksi Kedua Mempelai */}
          <div className="bg-white rounded-2xl border border-[#c2c8c2]/50 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#eeeeec]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#bbeed2]/50 text-[#002114] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">favorite</span>
                </div>
                <div>
                  <h2 className="text-base font-bold font-display text-[#042217]">Kemitraan Mempelai (Sinkron Dua Arah)</h2>
                  <p className="text-xs text-[#424844]">Tersambung langsung antara HP Rina & HP Dimas</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Terhubung Aktif</span>
              </span>
            </div>

            {/* Profile Cards Duo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {/* Rina */}
              <div className="p-4 rounded-xl bg-[#f9f9f7] border border-[#e2e3e1] relative overflow-hidden">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Rina Astuti"
                    className="w-13 h-13 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#042217]">{coupleInfo.brideName}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#bbeed2] text-[#002114] text-[10px] font-semibold">Anda</span>
                    </div>
                    <p className="text-xs text-[#424844]">Calon Mempelai Wanita</p>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Online sekarang (Device ini)</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e2e3e1] flex items-center justify-between text-xs text-[#424844]">
                  <span>Akses: <strong>Admin Utama</strong></span>
                  <span className="text-[#396752]">Perubahan terakhir: 1m lalu</span>
                </div>
              </div>

              {/* Dimas */}
              <div className="p-4 rounded-xl bg-[#f9f9f7] border border-[#e2e3e1] relative overflow-hidden">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
                    alt="Dimas Prasetyo"
                    className="w-13 h-13 rounded-full object-cover border-2 border-[#a0d1b7] shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#042217]">{coupleInfo.groomName}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#eeeeec] text-[#424844] text-[10px] font-semibold">Pasangan</span>
                    </div>
                    <p className="text-xs text-[#424844]">Calon Mempelai Pria</p>
                    <div className="flex items-center gap-1 text-[11px] text-[#424844] font-medium mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Aktif 12 menit yang lalu</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e2e3e1] flex items-center justify-between text-xs text-[#424844]">
                  <span>Akses: <strong>Admin Utama</strong></span>
                  <span className="text-[#396752]">Sinkron otomatis: Nyala</span>
                </div>
              </div>
            </div>

            {/* Hak Akses & Kolaborasi Pasangan */}
            <div className="mt-6 pt-5 border-t border-[#eeeeec]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#424844] mb-3">
                Hak Akses Sinkronisasi Pasangan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-[#eeeeec] hover:bg-[#f9f9f7] cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={syncSettings.allowPartnerBudgetEdit}
                    onChange={(e) => onUpdateSyncSettings({ ...syncSettings, allowPartnerBudgetEdit: e.target.checked })}
                    className="w-4 h-4 rounded text-[#042217] focus:ring-[#396752] accent-[#042217]"
                  />
                  <div>
                    <p className="font-semibold text-[#042217]">Izinkan Edit Anggaran</p>
                    <p className="text-[11px] text-[#424844]">Pasangan dapat mencatat & menyetujui pengeluaran</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-[#eeeeec] hover:bg-[#f9f9f7] cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={syncSettings.allowPartnerGuestEdit}
                    onChange={(e) => onUpdateSyncSettings({ ...syncSettings, allowPartnerGuestEdit: e.target.checked })}
                    className="w-4 h-4 rounded text-[#042217] focus:ring-[#396752] accent-[#042217]"
                  />
                  <div>
                    <p className="font-semibold text-[#042217]">Izinkan Edit Tamu</p>
                    <p className="text-[11px] text-[#424844]">Pasangan dapat menambah & assign nomor meja tamu</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-[#eeeeec] hover:bg-[#f9f9f7] cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={syncSettings.allowPartnerVendorEdit}
                    onChange={(e) => onUpdateSyncSettings({ ...syncSettings, allowPartnerVendorEdit: e.target.checked })}
                    className="w-4 h-4 rounded text-[#042217] focus:ring-[#396752] accent-[#042217]"
                  />
                  <div>
                    <p className="font-semibold text-[#042217]">Izinkan Kelola Vendor</p>
                    <p className="text-[11px] text-[#424844]">Ubah status kontrak dan bukti pelunasan vendor</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-[#eeeeec] hover:bg-[#f9f9f7] cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={syncSettings.allowPartnerChecklistEdit}
                    onChange={(e) => onUpdateSyncSettings({ ...syncSettings, allowPartnerChecklistEdit: e.target.checked })}
                    className="w-4 h-4 rounded text-[#042217] focus:ring-[#396752] accent-[#042217]"
                  />
                  <div>
                    <p className="font-semibold text-[#042217]">Izinkan Checklist & Rundown</p>
                    <p className="text-[11px] text-[#424844]">Centang tugas dan atur jadwal rundown hari-H</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Card: Detail Acara & Venue */}
          <div className="bg-white rounded-2xl border border-[#c2c8c2]/50 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#eeeeec]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#042217] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">event</span>
                </div>
                <div>
                  <h2 className="text-base font-bold font-display text-[#042217]">Detail & Informasi Acara</h2>
                  <p className="text-xs text-[#424844]">Tanggal, lokasi venue, dan hashtag resmi pernikahan</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (isEditingCouple) handleSaveCouple();
                  else setIsEditingCouple(true);
                }}
                className="px-3.5 py-1.5 rounded-xl border border-[#c2c8c2] text-xs font-semibold hover:bg-[#f4f4f2] text-[#042217] transition-all"
              >
                {isEditingCouple ? 'Simpan Perubahan' : 'Edit Informasi'}
              </button>
            </div>

            {isEditingCouple ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Nama Panggilan Pengantin Wanita</label>
                  <input
                    type="text"
                    value={tempCouple.brideName}
                    onChange={(e) => setTempCouple({ ...tempCouple, brideName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2c8c2] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#396752]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Nama Panggilan Pengantin Pria</label>
                  <input
                    type="text"
                    value={tempCouple.groomName}
                    onChange={(e) => setTempCouple({ ...tempCouple, groomName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2c8c2] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#396752]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Nama Lengkap Wanita (Akad/Undangan)</label>
                  <input
                    type="text"
                    value={tempCouple.brideFullName}
                    onChange={(e) => setTempCouple({ ...tempCouple, brideFullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2c8c2] text-sm focus:outline-none focus:ring-2 focus:ring-[#396752]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Nama Lengkap Pria (Akad/Undangan)</label>
                  <input
                    type="text"
                    value={tempCouple.groomFullName}
                    onChange={(e) => setTempCouple({ ...tempCouple, groomFullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2c8c2] text-sm focus:outline-none focus:ring-2 focus:ring-[#396752]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Tanggal Acara Utama</label>
                  <input
                    type="datetime-local"
                    value={tempCouple.weddingDate.slice(0, 16)}
                    onChange={(e) => setTempCouple({ ...tempCouple, weddingDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2c8c2] text-sm focus:outline-none focus:ring-2 focus:ring-[#396752]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Hashtag Resmi</label>
                  <input
                    type="text"
                    value={tempCouple.hashtag}
                    onChange={(e) => setTempCouple({ ...tempCouple, hashtag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2c8c2] text-sm focus:outline-none focus:ring-2 focus:ring-[#396752]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Nama Venue / Gedung</label>
                  <input
                    type="text"
                    value={tempCouple.venueName}
                    onChange={(e) => setTempCouple({ ...tempCouple, venueName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2c8c2] text-sm focus:outline-none focus:ring-2 focus:ring-[#396752]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Alamat Lengkap Venue</label>
                  <input
                    type="text"
                    value={tempCouple.venueAddress}
                    onChange={(e) => setTempCouple({ ...tempCouple, venueAddress: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2c8c2] text-sm focus:outline-none focus:ring-2 focus:ring-[#396752]"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <div className="p-3.5 rounded-xl bg-[#f9f9f7] border border-[#eeeeec]">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#424844]">Nama Mempelai</p>
                  <p className="text-sm font-bold text-[#042217] mt-0.5">{coupleInfo.brideFullName} & {coupleInfo.groomFullName}</p>
                  <p className="text-xs text-[#396752] mt-0.5 font-medium">{coupleInfo.hashtag}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f9f9f7] border border-[#eeeeec]">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#424844]">Hari & Tanggal</p>
                  <p className="text-sm font-bold text-[#042217] mt-0.5">Minggu, 14 Desember 2025</p>
                  <p className="text-xs text-[#424844] mt-0.5">Akad: 08:00 WIB • Resepsi: 11:00 WIB</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f9f9f7] border border-[#eeeeec] md:col-span-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#424844]">Lokasi Venue</p>
                  <p className="text-sm font-bold text-[#042217] mt-0.5">{coupleInfo.venueName}</p>
                  <p className="text-xs text-[#424844] mt-0.5">{coupleInfo.venueAddress}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Collaborators (WO & Family) & Data Operations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Tim WO & Keluarga Collaborators */}
          <div className="bg-white rounded-2xl border border-[#c2c8c2]/50 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#eeeeec]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#bbeed2]/50 text-[#002114] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">groups</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold font-display text-[#042217]">Akses Tim WO & Keluarga</h2>
                  <p className="text-[11px] text-[#424844]">{collaborators.length} akun terhubung</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddingCollaborator(true)}
                className="text-xs font-semibold text-[#396752] hover:text-[#042217] flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Tambah</span>
              </button>
            </div>

            {/* List Collaborators */}
            <div className="mt-4 space-y-3">
              {collaborators.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-[#f9f9f7] border border-[#eeeeec] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#c2c8c2]"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#042217] truncate">{c.name}</p>
                      <p className="text-[11px] text-[#424844] truncate">{c.role} • {c.agency}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#396752]">
                        <span className="bg-[#bbeed2]/50 px-1.5 py-0.5 rounded font-medium">{c.accessLevel}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold shrink-0">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>

            {isAddingCollaborator && (
              <form onSubmit={handleAddCollaborator} className="mt-4 p-4 rounded-xl bg-[#f4f4f2] border border-[#c2c8c2]/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#042217]">Undang Kolaborator Baru</span>
                  <button
                    type="button"
                    onClick={() => setIsAddingCollaborator(false)}
                    className="text-[#424844] hover:text-black"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Nama Lengkap (cth: Nadya Putri)"
                  value={newCollab.name}
                  onChange={(e) => setNewCollab({ ...newCollab, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#c2c8c2] bg-white focus:outline-none focus:ring-1 focus:ring-[#396752]"
                  required
                />
                <select
                  value={newCollab.role}
                  onChange={(e) => setNewCollab({ ...newCollab, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#c2c8c2] bg-white focus:outline-none focus:ring-1 focus:ring-[#396752]"
                >
                  <option value="Kepala WO (Nayla Planner)">Kepala WO (Akses Penuh)</option>
                  <option value="PIC Acara & Stage">PIC Acara & Stage (Rundown)</option>
                  <option value="PIC Tamu & Meja (Family)">PIC Tamu & Meja (Keluarga)</option>
                  <option value="PIC Konsumsi / F&B">PIC Konsumsi / F&B</option>
                  <option value="Liaison Officer VIP">Liaison Officer VIP</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-[#042217] text-white text-xs font-semibold hover:bg-[#1b382b] transition-all"
                >
                  Kirim Undangan Akses
                </button>
              </form>
            )}
          </div>

          {/* Card: Notifikasi & Integrasi WhatsApp */}
          <div className="bg-white rounded-2xl border border-[#c2c8c2]/50 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#eeeeec]">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </div>
              <div>
                <h2 className="text-sm font-bold font-display text-[#042217]">Notifikasi & Sinkron WhatsApp</h2>
                <p className="text-[11px] text-[#424844]">Pengingat otomatis untuk vendor & tamu</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <label className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f9f9f7] cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.waRsvpBlast}
                  onChange={(e) => setNotifications({ ...notifications, waRsvpBlast: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded text-[#042217] accent-[#042217]"
                />
                <div>
                  <p className="font-semibold text-[#042217]">Pengingat RSVP Otomatis (H-7 & H-3)</p>
                  <p className="text-[11px] text-[#424844]">Kirim notifikasi ramah bagi tamu yang belum konfirmasi</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f9f9f7] cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.waVendorDue}
                  onChange={(e) => setNotifications({ ...notifications, waVendorDue: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded text-[#042217] accent-[#042217]"
                />
                <div>
                  <p className="font-semibold text-[#042217]">Alarm Termin Pembayaran Vendor</p>
                  <p className="text-[11px] text-[#424844]">Kirim notif peringatan sebelum jatuh tempo pelunasan</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f9f9f7] cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.appSoundAlert}
                  onChange={(e) => setNotifications({ ...notifications, appSoundAlert: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded text-[#042217] accent-[#042217]"
                />
                <div>
                  <p className="font-semibold text-[#042217]">Audio Beep Scanner Meja Registrasi</p>
                  <p className="text-[11px] text-[#424844]">Bunyikan nada konfirmasi saat QR tamu discan berhasil</p>
                </div>
              </label>
            </div>
          </div>

          {/* Card: Export & Backup Data */}
          <div className="bg-white rounded-2xl border border-[#c2c8c2]/50 p-6 shadow-sm">
            <h2 className="text-sm font-bold font-display text-[#042217] mb-1">Ekspor Dokumen Hari-H</h2>
            <p className="text-xs text-[#424844] mb-4">Unduh cetakan fisik resmi untuk kru lapangan</p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onExportPDF}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-[#c2c8c2] bg-[#f9f9f7] hover:bg-[#f4f4f2] text-[#042217] transition-all group"
              >
                <span className="material-symbols-outlined text-[24px] text-[#396752] group-hover:scale-110 transition-transform">
                  print
                </span>
                <span className="text-xs font-bold mt-1.5">Cetak Rundown PDF</span>
                <span className="text-[10px] text-[#424844]">Format A4 WO</span>
              </button>

              <button
                onClick={onExportExcel}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-[#c2c8c2] bg-[#f9f9f7] hover:bg-[#f4f4f2] text-[#042217] transition-all group"
              >
                <span className="material-symbols-outlined text-[24px] text-emerald-600 group-hover:scale-110 transition-transform">
                  table_view
                </span>
                <span className="text-xs font-bold mt-1.5">Ekspor Tamu & Meja</span>
                <span className="text-[10px] text-[#424844]">Format Excel / CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
