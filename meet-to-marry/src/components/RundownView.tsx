import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  User,
  Music,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Search,
  Filter,
  Plus,
  Share2,
  Volume2,
  Calendar,
  ChevronDown,
  Layers,
  Phone,
  Radio,
} from 'lucide-react';
import { RundownItem } from '../types/wedding';

interface RundownViewProps {
  rundownItems: RundownItem[];
  isLiveMode: boolean;
  onUpdateStatus: (id: string, status: RundownItem['status']) => void;
  onAddNewItem: () => void;
  onShareItemWA: (item: RundownItem) => void;
}

export const RundownView: React.FC<RundownViewProps> = ({
  rundownItems,
  isLiveMode,
  onUpdateStatus,
  onAddNewItem,
  onShareItemWA,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSakralOnly, setFilterSakralOnly] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter items
  const filteredItems = rundownItems.filter((item) => {
    const matchesPhase =
      selectedPhase === 'all' || item.category === selectedPhase;
    const matchesSakral = !filterSakralOnly || item.isSakral;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.picName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPhase && matchesSakral && matchesSearch;
  });

  const activeItem = rundownItems.find((r) => r.status === 'ongoing') || rundownItems[1];

  const getStatusBadge = (status: RundownItem['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3 h-3" />
            <span>Selesai</span>
          </span>
        );
      case 'ongoing':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
            <Radio className="w-3 h-3 text-amber-600" />
            <span>Sedang Berjalan</span>
          </span>
        );
      case 'delayed':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            <AlertCircle className="w-3 h-3" />
            <span>Buffer Terpakai</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
            <Clock className="w-3 h-3 text-stone-400" />
            <span>Akan Datang</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Live Day-of Orchestrator Banner (when Live Mode is ON or Active) */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white rounded-2xl p-5 md:p-6 shadow-sm border border-amber-900/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 font-mono">
                {isLiveMode ? 'LIVE HARI-H: MODE ORCHESTRATION AKTIF' : 'TIMELINE SIMULASI HARI-H'}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif-luxury font-bold text-white">
              {activeItem ? activeItem.title : 'Persiapan Seluruh Rangkaian'}
            </h3>
            <p className="text-xs md:text-sm text-stone-300 flex flex-wrap items-center gap-2">
              <span>Waktu Sesi: {activeItem?.timeStart} - {activeItem?.timeEnd} WIB</span>
              <span>·</span>
              <span className="text-amber-200">Lokasi: {activeItem?.location}</span>
              <span>·</span>
              <span>PIC: {activeItem?.picName} ({activeItem?.picRole})</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => activeItem && onShareItemWA(activeItem)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Siarkan WA Sesi Ini</span>
            </button>
            <button
              onClick={onAddNewItem}
              className="bg-[#D9A74A] hover:bg-[#C29235] text-stone-950 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Acara</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E8E1D5] p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Phase Filter Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Semua Rangkaian' },
              { id: 'persiapan', label: 'Pagi & Rias' },
              { id: 'sakral', label: 'Sakral / Akad' },
              { id: 'kirab', label: 'Kirab Masuk' },
              { id: 'resepsi', label: 'Resepsi & Jamuan' },
              { id: 'foto', label: 'Sesi Foto' },
              { id: 'afterparty', label: 'After-Party' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedPhase(tab.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedPhase === tab.id
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sakral Only Toggle */}
          <button
            onClick={() => setFilterSakralOnly(!filterSakralOnly)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium border flex items-center space-x-1.5 transition cursor-pointer shrink-0 ${
              filterSakralOnly
                ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                : 'border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Khusus Momen Sakral</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari agenda, lokasi, penanggung jawab (PIC), atau catatan musik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
          />
        </div>
      </div>

      {/* Bespoke Vertical Timeline */}
      <div className="relative space-y-4">
        {/* Subtle timeline center spine on large screens */}
        <div className="hidden md:block absolute left-28 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#C5A880] via-[#E8E1D5] to-[#C5A880]"></div>

        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500 text-sm">
            Tidak ada agenda yang cocok dengan filter pencarian.
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-start gap-4 p-4 md:p-5 rounded-2xl border transition ${
                  item.isSakral
                    ? 'bg-gradient-to-r from-amber-50/70 via-white to-orange-50/40 border-amber-300 shadow-xs'
                    : item.status === 'ongoing'
                    ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                    : 'bg-white border-[#E8E1D5] hover:border-stone-300 shadow-2xs'
                }`}
              >
                {/* Left Column: Time & Duration Indicator */}
                <div className="w-full md:w-28 shrink-0 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-1">
                  <div className="font-mono font-bold text-base md:text-lg text-stone-900">
                    {item.timeStart}
                  </div>
                  <div className="text-[11px] font-mono text-stone-500 md:mt-0.5">
                    s/d {item.timeEnd} WIB
                  </div>
                  <div className="inline-flex items-center space-x-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-1">
                    <span>+{item.bufferMinutes}m buffer</span>
                  </div>
                </div>

                {/* Center Node Diamond for Timeline (Desktop) */}
                <div className="hidden md:flex items-center justify-center shrink-0 -ml-1 mt-1 z-10">
                  {item.isSakral ? (
                    <div className="w-7 h-7 rotate-45 bg-[#9B6D3B] text-white flex items-center justify-center rounded-sm shadow-xs border-2 border-white ring-2 ring-[#C5A880]">
                      <Sparkles className="w-3.5 h-3.5 -rotate-45 text-amber-200" />
                    </div>
                  ) : (
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-white ring-2 ${
                        item.status === 'completed'
                          ? 'bg-emerald-600 ring-emerald-300'
                          : item.status === 'ongoing'
                          ? 'bg-amber-500 ring-amber-300 animate-pulse'
                          : 'bg-stone-300 ring-stone-200'
                      }`}
                    ></div>
                  )}
                </div>

                {/* Right Card: Full Event Details */}
                <div className="flex-1 w-full space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      {item.isSakral && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#845625] bg-[#F7EBDD] px-2 py-0.5 rounded-md border border-[#DFC3A3]">
                          SAKRAL
                        </span>
                      )}
                      <h4 className="text-base md:text-lg font-serif-luxury font-bold text-stone-900">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getStatusBadge(item.status)}

                      {/* Status select changer */}
                      <select
                        value={item.status}
                        onChange={(e) =>
                          onUpdateStatus(item.id, e.target.value as RundownItem['status'])
                        }
                        className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-stone-700 cursor-pointer focus:outline-none"
                      >
                        <option value="upcoming">Akan Datang</option>
                        <option value="ongoing">Sedang Berjalan</option>
                        <option value="completed">Selesai</option>
                        <option value="delayed">Buffer Terpakai</option>
                      </select>
                    </div>
                  </div>

                  {/* Location & PIC quick line */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#9B6D3B] shrink-0" />
                      <span className="font-medium text-stone-800">{item.location}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>
                        PIC: <strong className="text-stone-900">{item.picName}</strong> (
                        {item.picRole})
                      </span>
                      <a
                        href={`tel:${item.picPhone}`}
                        className="text-emerald-700 hover:text-emerald-800 font-bold ml-1 inline-flex items-center"
                        title="Panggil PIC via Telepon"
                      >
                        <Phone className="w-3 h-3 inline mr-0.5" />
                        {item.picPhone}
                      </a>
                    </div>
                  </div>

                  {/* Notes & Description */}
                  <p className="text-xs text-stone-700 leading-relaxed bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EFE9DF]">
                    {item.notes}
                  </p>

                  {/* Music cue & Dresscode */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-600">
                    {item.musicCue && (
                      <span className="inline-flex items-center space-x-1 text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Music className="w-3 h-3 text-amber-700" />
                        <span>Cue: {item.musicCue}</span>
                      </span>
                    )}

                    {item.dresscode && (
                      <span className="inline-flex items-center space-x-1 text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                        <span>Busana: {item.dresscode}</span>
                      </span>
                    )}
                  </div>

                  {/* Props and Equipment Tags */}
                  {item.props && item.props.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                        Perlengkapan:
                      </span>
                      {item.props.map((prop, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-white border border-stone-200 text-stone-700 px-2 py-0.5 rounded-md shadow-2xs font-medium"
                        >
                          ✓ {prop}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Broadcast WA button per item */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onShareItemWA(item)}
                      className="inline-flex items-center space-x-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-semibold bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 px-2.5 py-1 rounded-lg transition cursor-pointer"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>Kirim Briefing WA ke PIC ({item.picName.split(' ')[0]})</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
