import React, { useState } from 'react';
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Plus,
  QrCode,
  MapPin,
  Utensils,
  Phone,
  Filter,
  Check,
} from 'lucide-react';
import { GuestItem } from '../types/wedding';

interface GuestsViewProps {
  guests: GuestItem[];
  onToggleCheckIn: (id: string) => void;
  onAddNewGuest: () => void;
  onOpenQRScanner: () => void;
}

export const GuestsView: React.FC<GuestsViewProps> = ({
  guests,
  onToggleCheckIn,
  onAddNewGuest,
  onOpenQRScanner,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Funnel calculations
  const totalPax = guests.reduce((acc, g) => acc + g.pax, 0);
  const hadirPax = guests
    .filter((g) => g.rsvpStatus === 'hadir')
    .reduce((acc, g) => acc + g.pax, 0);
  const belumPax = guests
    .filter((g) => g.rsvpStatus === 'belum_konfirmasi')
    .reduce((acc, g) => acc + g.pax, 0);
  const tidakHadirPax = guests
    .filter((g) => g.rsvpStatus === 'tidak_hadir')
    .reduce((acc, g) => acc + g.pax, 0);
  const checkedInPax = guests
    .filter((g) => g.checkedIn)
    .reduce((acc, g) => acc + g.pax, 0);

  const filteredGuests = guests.filter((g) => {
    const matchesCat =
      selectedCategory === 'all' || g.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' || g.rsvpStatus === selectedStatus;
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.phone.includes(searchQuery);

    return matchesCat && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* RSVP Conversion Funnel Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
            Total Tamu Terdata
          </span>
          <div className="text-xl md:text-2xl font-bold font-mono text-stone-900">
            {totalPax} <span className="text-xs font-normal text-stone-500">Pax</span>
          </div>
          <span className="text-[10px] text-stone-400 mt-1 block">
            {guests.length} Undangan Tercatat
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 block mb-1">
            Konfirmasi Hadir
          </span>
          <div className="text-xl md:text-2xl font-bold font-mono text-emerald-700">
            {hadirPax} <span className="text-xs font-normal text-stone-500">Pax</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-medium mt-1 block">
            {Math.round((hadirPax / (totalPax || 1)) * 100)}% Conversion Rate
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 block mb-1">
            Menunggu Respon
          </span>
          <div className="text-xl md:text-2xl font-bold font-mono text-amber-700">
            {belumPax} <span className="text-xs font-normal text-stone-500">Pax</span>
          </div>
          <span className="text-[10px] text-amber-800 mt-1 block">Perlu Follow Up WA</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
            Berhalangan Hadir
          </span>
          <div className="text-xl md:text-2xl font-bold font-mono text-stone-600">
            {tidakHadirPax} <span className="text-xs font-normal text-stone-500">Pax</span>
          </div>
          <span className="text-[10px] text-stone-400 mt-1 block">Kirim Ucapan / Bunga</span>
        </div>

        <div className="col-span-2 md:col-span-1 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-300 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900 block mb-1">
            Check-In di Lokasi
          </span>
          <div className="text-xl md:text-2xl font-bold font-mono text-amber-900">
            {checkedInPax} <span className="text-xs font-normal text-amber-800">Pax Masuk</span>
          </div>
          <span className="text-[10px] text-amber-900 font-bold mt-1 block">
            {Math.round((checkedInPax / (hadirPax || 1)) * 100)}% Hadir di Venue
          </span>
        </div>
      </div>

      {/* Control Action Bar */}
      <div className="bg-white rounded-2xl border border-[#E8E1D5] p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['all', 'VIP', 'Keluarga', 'Sahabat', 'Rekan Kerja', 'Kolega'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat === 'all' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenQRScanner}
              className="bg-stone-900 hover:bg-stone-800 text-amber-100 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-300" />
              <span>Scanner Resepsi</span>
            </button>
            <button
              onClick={onAddNewGuest}
              className="bg-[#D9A74A] hover:bg-[#C29235] text-stone-950 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tamu</span>
            </button>
          </div>
        </div>

        {/* Search and RSVP Status filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama tamu, nomor meja (e.g. VIP 01, Table A1), atau no telepon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs text-stone-500 font-medium">Status RSVP:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-700 cursor-pointer focus:outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="hadir">Hadir</option>
              <option value="belum_konfirmasi">Menunggu Konfirmasi</option>
              <option value="tidak_hadir">Tidak Hadir</option>
            </select>
          </div>
        </div>
      </div>

      {/* Guest Table / List */}
      <div className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-stone-600 uppercase font-semibold border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4">Nama Tamu &amp; Kategori</th>
                <th className="py-3 px-3 text-center">Pax</th>
                <th className="py-3 px-3">Status RSVP</th>
                <th className="py-3 px-3">Alokasi Nomor Meja</th>
                <th className="py-3 px-3">Dietary / Catatan</th>
                <th className="py-3 px-3 text-center">Check-In Hari-H</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredGuests.map((guest) => {
                return (
                  <tr
                    key={guest.id}
                    className={`hover:bg-amber-50/30 transition ${
                      guest.checkedIn ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    {/* Name & Category */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <div>
                          <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                            {guest.name}
                            {guest.category === 'VIP' && (
                              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded border border-amber-300">
                                VIP
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-stone-400 font-mono">
                            {guest.phone} · {guest.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Pax */}
                    <td className="py-3.5 px-3 text-center font-bold font-mono text-stone-800">
                      {guest.pax}
                    </td>

                    {/* RSVP Status */}
                    <td className="py-3.5 px-3">
                      {guest.rsvpStatus === 'hadir' ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-3 h-3" />
                          <span>Konfirmasi Hadir</span>
                        </span>
                      ) : guest.rsvpStatus === 'belum_konfirmasi' ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800">
                          <Clock className="w-3 h-3" />
                          <span>Belum Konfirmasi</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600">
                          <XCircle className="w-3 h-3" />
                          <span>Berhalangan</span>
                        </span>
                      )}
                    </td>

                    {/* Table Allocation */}
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center space-x-1 font-semibold text-stone-900 bg-stone-100 px-2 py-1 rounded-md border border-stone-200">
                        <MapPin className="w-3 h-3 text-[#9B6D3B]" />
                        <span>{guest.tableNumber}</span>
                      </span>
                    </td>

                    {/* Dietary / Notes */}
                    <td className="py-3.5 px-3 text-stone-600 max-w-xs">
                      {guest.dietary && (
                        <span className="inline-flex items-center space-x-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[10px] font-medium mr-1">
                          <Utensils className="w-3 h-3" />
                          <span>{guest.dietary}</span>
                        </span>
                      )}
                      <span className="truncate block text-[11px] text-stone-500">
                        {guest.notes || '-'}
                      </span>
                    </td>

                    {/* Check-In Status */}
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => onToggleCheckIn(guest.id)}
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                          guest.checkedIn
                            ? 'bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700'
                            : 'bg-stone-100 text-stone-600 hover:bg-amber-100 hover:text-amber-900 border border-stone-200'
                        }`}
                        title="Klik untuk check-in / batalkan check-in"
                      >
                        {guest.checkedIn ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Sudah ({guest.checkedInTime || 'Hadir'})</span>
                          </>
                        ) : (
                          <span>Belum Tiba</span>
                        )}
                      </button>
                    </td>

                    {/* Quick WhatsApp Action */}
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/${guest.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(
                          guest.name
                        )}%2C%20kami%20mengingatkan%20pernikahan%20Natasha%20%26%20Rian%20di%20Plataran%20Dharmawangsa%20Meja%20${encodeURIComponent(
                          guest.tableNumber
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-emerald-700 hover:text-emerald-800 font-semibold text-xs"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Kirim Undangan</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
