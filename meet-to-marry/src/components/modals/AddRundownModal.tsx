import React, { useState } from 'react';
import { X, Clock, MapPin, User, Sparkles } from 'lucide-react';
import { RundownItem } from '../../types/wedding';

interface AddRundownModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: RundownItem) => void;
}

export const AddRundownModal: React.FC<AddRundownModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [timeStart, setTimeStart] = useState('10:00');
  const [timeEnd, setTimeEnd] = useState('10:30');
  const [category, setCategory] = useState<RundownItem['category']>('resepsi');
  const [isSakral, setIsSakral] = useState(false);
  const [location, setLocation] = useState('Main Ballroom');
  const [picName, setPicName] = useState('');
  const [picRole, setPicRole] = useState('Tim Wedding Organizer');
  const [picPhone, setPicPhone] = useState('0812-');
  const [bufferMinutes, setBufferMinutes] = useState(15);
  const [musicCue, setMusicCue] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: RundownItem = {
      id: `rd-${Date.now()}`,
      title,
      timeStart,
      timeEnd,
      category,
      isSakral,
      location,
      picName: picName || 'Tim WO',
      picRole,
      picPhone,
      bufferMinutes: Number(bufferMinutes) || 10,
      musicCue,
      dresscode: 'Formal',
      props: [],
      status: 'upcoming',
      notes: notes || 'Disiapkan sesuai standar Meet to Marry.',
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        <div className="bg-[#1C1917] text-white p-5 flex justify-between items-center">
          <h3 className="font-serif-luxury font-bold text-lg text-white">
            Tambah Rangkaian Acara Rundown
          </h3>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">Nama Sesi / Rangkaian Acara *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Sesi Pelemparan Bunga Tangan &amp; Doorprize"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Jam Mulai (WIB)</label>
              <input
                type="text"
                placeholder="09:00"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Jam Selesai (WIB)</label>
              <input
                type="text"
                placeholder="09:45"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Kategori Fase</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
              >
                <option value="persiapan">Pagi &amp; Persiapan</option>
                <option value="sakral">Sakral (Akad / Pemberkatan)</option>
                <option value="kirab">Kirab Pengantin</option>
                <option value="resepsi">Resepsi &amp; Jamuan</option>
                <option value="foto">Sesi Foto</option>
                <option value="afterparty">After-Party</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Buffer Keamanan (Menit)</label>
              <input
                type="number"
                min="0"
                max="60"
                value={bufferMinutes}
                onChange={(e) => setBufferMinutes(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="sakralCheck"
              checked={isSakral}
              onChange={(e) => setIsSakral(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 cursor-pointer w-4 h-4"
            />
            <label htmlFor="sakralCheck" className="font-semibold text-stone-800 cursor-pointer flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Tandai sebagai Momen SAKRAL Khidmat
            </label>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Lokasi / Spot Acara</label>
            <input
              type="text"
              placeholder="Contoh: Pendopo Utama / Selasar Barat"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Nama PIC *</label>
              <input
                type="text"
                placeholder="Contoh: Mas Dimas"
                value={picName}
                onChange={(e) => setPicName(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">No. Telp PIC</label>
              <input
                type="text"
                placeholder="0812-xxxx-xxxx"
                value={picPhone}
                onChange={(e) => setPicPhone(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Catatan Penting</label>
            <textarea
              rows={2}
              placeholder="Petunjuk khusus audio, alur panggung, dll."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-100 text-stone-700 rounded-xl hover:bg-stone-200 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#D9A74A] hover:bg-[#C29235] text-stone-950 rounded-xl font-bold shadow-xs"
            >
              Simpan Acara
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
