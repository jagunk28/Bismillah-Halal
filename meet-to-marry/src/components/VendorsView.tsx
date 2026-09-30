import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  Instagram,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Wallet,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { VendorItem } from '../types/wedding';

interface VendorsViewProps {
  vendors: VendorItem[];
  onAddNewVendor: () => void;
  onUpdateVendorStatus: (id: string, status: VendorItem['status']) => void;
}

export const VendorsView: React.FC<VendorsViewProps> = ({
  vendors,
  onAddNewVendor,
  onUpdateVendorStatus,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'venue', label: 'Venue' },
    { id: 'catering', label: 'Katering' },
    { id: 'decor', label: 'Dekorasi' },
    { id: 'mua', label: 'Rias & MUA' },
    { id: 'photo', label: 'Foto & Video' },
    { id: 'attire', label: 'Busana Pengantin' },
    { id: 'mc', label: 'MC & Musik' },
    { id: 'invitation', label: 'Undangan' },
  ];

  const filteredVendors = vendors.filter((v) => {
    const matchesCategory =
      selectedCategory === 'all' || v.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' || v.status === selectedStatus;
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.instagram.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const totalContract = vendors.reduce((acc, v) => acc + v.totalAmount, 0);
  const totalPaid = vendors.reduce((acc, v) => acc + v.paidAmount, 0);

  return (
    <div className="space-y-6 pb-16">
      {/* Header Summary Banner */}
      <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 md:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9B6D3B] bg-[#F7EBDD] px-2 py-0.5 rounded">
              Direktori Vendor Terikat
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Total {vendors.length} Vendor Resmi
            </span>
          </div>
          <h2 className="text-2xl font-serif-luxury font-bold text-stone-900 mt-1">
            Manajemen Kontrak &amp; Pembayaran Vendor
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Pantau status kontrak, uang muka (DP), sisa pelunasan dan hasil technical meeting
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-stone-500 block">Total Nilai Kontrak</span>
            <span className="text-lg font-bold font-mono text-stone-900">
              Rp {(totalContract / 1000000).toFixed(1)} jt
            </span>
            <span className="text-[11px] text-emerald-700 block">
              Terbayar: Rp {(totalPaid / 1000000).toFixed(1)} jt (
              {Math.round((totalPaid / totalContract) * 100)}%)
            </span>
          </div>

          <button
            onClick={onAddNewVendor}
            className="bg-[#D9A74A] hover:bg-[#C29235] text-stone-950 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Vendor</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E8E1D5] p-4 shadow-2xs space-y-3">
        {/* Category Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama vendor, PIC, atau Instagram..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs text-stone-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-700 cursor-pointer focus:outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="lunas">Lunas</option>
              <option value="dp_paid">DP Terbayar</option>
              <option value="pending">Menunggu Kontrak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVendors.map((vendor) => {
          const sisaPelunasan = vendor.totalAmount - vendor.paidAmount;
          const isLunas = vendor.status === 'lunas';

          return (
            <div
              key={vendor.id}
              className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-2xs hover:shadow-xs transition flex flex-col justify-between"
            >
              <div>
                {/* Vendor Cover Image */}
                <div className="relative h-44 w-full bg-stone-200 overflow-hidden">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-stone-900/80 backdrop-blur-xs text-amber-200 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md">
                      {vendor.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md shadow-2xs ${
                        isLunas
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 text-stone-950'
                      }`}
                    >
                      {isLunas ? '✓ LUNAS' : 'DP TERBAYAR'}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-3 flex items-center space-x-1 text-white text-xs drop-shadow-md">
                    <span className="text-amber-300">★</span>
                    <span className="font-bold">{vendor.rating}</span>
                    <span className="text-stone-300 text-[10px]">/ 5.0</span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                      {vendor.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-stone-500 mt-0.5">
                      <span>PIC: {vendor.contactPerson}</span>
                      <span>·</span>
                      <span className="text-stone-700 font-mono">{vendor.instagram}</span>
                    </div>
                  </div>

                  {/* Payment Financial Box */}
                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE9DF] text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">Nilai Kontrak:</span>
                      <span className="font-mono font-bold text-stone-900">
                        Rp {vendor.totalAmount.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-700">
                      <span>Sudah Terbayar:</span>
                      <span className="font-mono font-semibold">
                        Rp {vendor.paidAmount.toLocaleString('id-ID')}
                      </span>
                    </div>
                    {!isLunas && (
                      <div className="flex justify-between items-center pt-1 border-t border-stone-200 text-rose-700 font-medium">
                        <span>Sisa Pelunasan:</span>
                        <span className="font-mono font-bold">
                          Rp {sisaPelunasan.toLocaleString('id-ID')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Deliverables items */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-1">
                      Ruang Lingkup / Deliverables:
                    </span>
                    <ul className="text-xs text-stone-600 space-y-1">
                      {vendor.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Meeting Notes */}
                  {vendor.meetingNotes && (
                    <div className="text-[11px] text-stone-600 bg-amber-50/70 border border-amber-200 p-2 rounded-lg">
                      <strong className="text-amber-900 block font-semibold">Catatan TM:</strong>
                      {vendor.meetingNotes}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Actions */}
              <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between gap-2 mt-2">
                <a
                  href={`tel:${vendor.phone}`}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium flex items-center justify-center space-x-1 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-600" />
                  <span>Telepon</span>
                </a>

                <a
                  href={`https://wa.me/${vendor.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(
                    vendor.contactPerson
                  )}%20dari%20Meet%20to%20Marry%20Wedding%20Organizer`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center space-x-1 transition shadow-2xs"
                >
                  <span>Chat WA</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
