import React, { useState, useEffect } from 'react';
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Printer,
  QrCode,
  Radio,
  Share2,
} from 'lucide-react';
import { CoupleInfo } from '../types/wedding';

interface HeaderNavProps {
  coupleInfo: CoupleInfo;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLiveMode: boolean;
  setIsLiveMode: (live: boolean) => void;
  onOpenQRScanner: () => void;
  onOpenPrintModal: () => void;
  onOpenBroadcastModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  coupleInfo,
  activeTab,
  setActiveTab,
  isLiveMode,
  setIsLiveMode,
  onOpenQRScanner,
  onOpenPrintModal,
  onOpenBroadcastModal,
}) => {
  // Real-time live countdown
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date(coupleInfo.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [coupleInfo.weddingDate]);

  const navItems = [
    { id: 'dashboard', label: 'Dasbor', icon: '📊' },
    { id: 'rundown', label: 'Rundown Sakral', icon: '🕊️', badge: 'Hari-H' },
    { id: 'vendors', label: 'Vendor & Kontrak', icon: '💍', count: '8' },
    { id: 'guests', label: 'Tamu & Meja RSVP', icon: '✉️' },
    { id: 'budget', label: 'Anggaran', icon: '💰' },
    { id: 'emergency', label: 'Kontak Darurat & PIC', icon: '🚨' },
  ];

  return (
    <header className="bg-white border-b border-[#E8E1D5] shadow-xs sticky top-0 z-30">
      {/* Top Bar Branding & Quick Bar */}
      <div className="bg-[#1C1917] text-[#FAF7F2] text-xs py-1.5 px-4 md:px-8 flex justify-between items-center tracking-wide">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E5B887] animate-pulse"></span>
          <span className="font-medium text-[#FAF7F2]/90">
            Meet to Marry · Platform Manajemen Pernikahan & Rundown Presisi
          </span>
          <span className="hidden sm:inline text-stone-500">|</span>
          <span className="hidden sm:inline text-stone-300 font-mono">
            {coupleInfo.hashtag}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLiveMode(!isLiveMode)}
            className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full font-medium transition cursor-pointer ${
              isLiveMode
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
            title="Aktifkan Mode Siaga Hari-H untuk kru WO"
          >
            <Radio className="w-3 h-3" />
            <span>{isLiveMode ? 'LIVE HARI-H ON' : 'Mode Siaga Hari-H'}</span>
          </button>

          <button
            onClick={onOpenBroadcastModal}
            className="hidden md:flex items-center space-x-1 text-stone-300 hover:text-[#E5B887] transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#E5B887]" />
            <span>Siarkan WA</span>
          </button>

          <button
            onClick={onOpenPrintModal}
            className="flex items-center space-x-1 text-stone-300 hover:text-[#E5B887] transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak Rundown</span>
          </button>
        </div>
      </div>

      {/* Main Wedding Banner & Countdown */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Brand & Couple Identity */}
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <img
              src={coupleInfo.coupleAvatar}
              alt="Mempelai"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#C5A880] ring-offset-2 shadow-xs"
            />
            <div className="absolute -bottom-1 -right-1 bg-rose-600 text-white p-1 rounded-full shadow-xs">
              <Heart className="w-3 h-3 fill-current" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B3804D] bg-[#F7F2EB] px-2 py-0.5 rounded">
                The Wedding Of
              </span>
              <span className="text-xs text-stone-600 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#B3804D]" />
                {coupleInfo.venueName}, {coupleInfo.city}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif-luxury font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <span>{coupleInfo.brideName}</span>
              <span className="text-rose-500 font-serif-luxury italic text-xl">&amp;</span>
              <span>{coupleInfo.groomName}</span>
            </h1>
            <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              <span>Sabtu, 24 Oktober 2026</span>
              <span className="text-stone-300">·</span>
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>Akad 08:00 WIB | Resepsi 11:45 WIB</span>
            </p>
          </div>
        </div>

        {/* Live Countdown & Quick Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Countdown Clock Display */}
          <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-4 py-2 flex items-center space-x-3 shadow-2xs">
            <div className="text-center">
              <span className="block text-lg font-bold text-stone-900 font-mono leading-none">
                {timeLeft.days}
              </span>
              <span className="text-[10px] text-stone-600 uppercase font-medium">Hari</span>
            </div>
            <span className="text-stone-300 font-bold">:</span>
            <div className="text-center">
              <span className="block text-lg font-bold text-stone-900 font-mono leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-stone-600 uppercase font-medium">Jam</span>
            </div>
            <span className="text-stone-300 font-bold">:</span>
            <div className="text-center">
              <span className="block text-lg font-bold text-stone-900 font-mono leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-stone-600 uppercase font-medium">Mnt</span>
            </div>
            <span className="text-stone-300 font-bold">:</span>
            <div className="text-center">
              <span className="block text-lg font-bold text-rose-600 font-mono leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-stone-600 uppercase font-medium">Dtk</span>
            </div>
          </div>

          {/* QR Scanner Trigger */}
          <button
            onClick={onOpenQRScanner}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-stone-900 text-amber-100 hover:bg-stone-800 transition shadow-xs text-xs font-semibold cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-amber-300" />
            <span>Check-in Tamu</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-[#EFE9DF]">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#F2ECE1] text-stone-900 font-bold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/60'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {item.count && (
                  <span className="text-[10px] bg-stone-200 text-stone-700 font-semibold px-1.5 py-0.2 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
