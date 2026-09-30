import React, { useState } from 'react';
import {
  X,
  QrCode,
  CheckCircle2,
  Camera,
  Search,
  Sparkles,
  MapPin,
  Users,
  Volume2,
} from 'lucide-react';
import { GuestItem } from '../../types/wedding';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  guests: GuestItem[];
  onCheckInGuest: (guestId: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  guests,
  onCheckInGuest,
}) => {
  const [selectedGuestId, setSelectedGuestId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scannedResult, setScannedResult] = useState<GuestItem | null>(null);

  if (!isOpen) return null;

  // Sound chime using Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      // Audio fallback
    }
  };

  const handleSimulateScan = (guest: GuestItem) => {
    playChime();
    setScannedResult(guest);
    onCheckInGuest(guest.id);
  };

  const filteredGuests = guests.filter(
    (g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tableNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-luxury font-bold text-lg text-white">
              Simulasi Check-In Meja Resepsi QR
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Simulated Camera Viewfinder */}
          <div className="relative h-48 bg-stone-950 rounded-2xl overflow-hidden flex flex-col items-center justify-center border-2 border-stone-800">
            <div className="absolute inset-4 border border-dashed border-amber-400/60 rounded-xl flex items-center justify-center">
              {/* Animated scanning laser line */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-pulse shadow-sm"></div>
            </div>

            <div className="relative z-10 text-center space-y-1">
              <Camera className="w-8 h-8 text-amber-300 mx-auto opacity-70 animate-bounce" />
              <p className="text-xs text-stone-300 font-mono">
                Arahkan QR Undangan Tamu ke Kamera
              </p>
              <span className="text-[10px] text-stone-500 block">
                (Kamera Simulasi Aktif · Siap Scan Kartu Digital)
              </span>
            </div>
          </div>

          {/* Scanned Success Alert Banner */}
          {scannedResult && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-400 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">
                      CHECK-IN BERHASIL!
                    </span>
                    <span className="text-xs text-emerald-700 font-mono">
                      {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                    </span>
                  </div>

                  <h4 className="text-lg font-serif-luxury font-bold text-stone-900 mt-1">
                    Selamat Datang, {scannedResult.name}!
                  </h4>

                  <div className="mt-2 p-2.5 rounded-xl bg-white border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 font-bold block">
                        Alokasi Kursi &amp; Meja
                      </span>
                      <span className="text-sm font-bold text-stone-900 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-rose-500" />
                        {scannedResult.tableNumber}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase text-stone-400 font-bold block">
                        Jumlah Pax
                      </span>
                      <span className="text-sm font-bold text-stone-900 font-mono">
                        {scannedResult.pax} Orang
                      </span>
                    </div>
                  </div>

                  {scannedResult.dietary && (
                    <p className="text-[11px] text-stone-600 mt-2 font-medium">
                      ⚠️ Catatan Makanan: {scannedResult.dietary}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick Select Tamu to Simulate Scan */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Pilih Tamu untuk Simulasi Scan Masuk:
            </label>

            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama tamu yang hadir..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1.5 pt-1">
              {filteredGuests.slice(0, 6).map((guest) => (
                <div
                  key={guest.id}
                  onClick={() => handleSimulateScan(guest)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition ${
                    guest.checkedIn
                      ? 'bg-emerald-50/50 border-emerald-200 text-stone-800'
                      : 'bg-white border-stone-200 hover:border-amber-400 hover:bg-amber-50/30'
                  }`}
                >
                  <div>
                    <span className="font-bold text-stone-900 block">{guest.name}</span>
                    <span className="text-[10px] text-stone-500">
                      {guest.tableNumber} · {guest.pax} Pax · {guest.category}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      guest.checkedIn
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {guest.checkedIn ? 'Sudah Masuk' : 'Scan Masuk'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-stone-50 p-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition cursor-pointer"
          >
            Tutup Scanner
          </button>
        </div>
      </div>
    </div>
  );
};
