import React, { useState } from 'react';
import { X } from 'lucide-react';
import { GuestItem } from '../../types/wedding';

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (guest: GuestItem) => void;
}

export const AddGuestModal: React.FC<AddGuestModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<GuestItem['category']>('Sahabat');
  const [pax, setPax] = useState<number>(2);
  const [tableNumber, setTableNumber] = useState('Table B3');
  const [phone, setPhone] = useState('0812-');
  const [rsvpStatus, setRsvpStatus] = useState<GuestItem['rsvpStatus']>('hadir');
  const [dietary, setDietary] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newGuest: GuestItem = {
      id: `g-${Date.now()}`,
      name,
      relationOrRole: 'Tamu Undangan',
      side: 'both',
      category,
      pax: Number(pax) || 1,
      tableNumber,
      phone,
      invitationStatus: 'QR Siap',
      rsvpStatus,
      session: 'Sesi 1 (Akad & Syukuran)',
      dietary,
      notes,
      checkedIn: false,
      souvenirClaimed: false,
    };

    onAdd(newGuest);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        <div className="bg-[#1C1917] text-white p-5 flex justify-between items-center">
          <h3 className="font-serif-luxury font-bold text-lg text-white">
            Tambah Undangan Tamu Baru
          </h3>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">Nama Lengkap Tamu *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Raditya Dika &amp; Anissa Aziza"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Kategori Tamu</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
              >
                <option value="VIP">VIP (Pejabat/Direksi)</option>
                <option value="Keluarga">Keluarga Besar</option>
                <option value="Sahabat">Sahabat Dekat / Alumni</option>
                <option value="Rekan Kerja">Rekan Kerja Kantor</option>
                <option value="Kolega">Kolega Bisnis / Rekanan</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Jumlah Pax</label>
              <input
                type="number"
                min="1"
                max="10"
                value={pax}
                onChange={(e) => setPax(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Alokasi Nomor Meja</label>
              <input
                type="text"
                placeholder="VIP 01 / Table B3"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">No. WhatsApp</label>
              <input
                type="text"
                placeholder="0812-xxxx-xxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Status RSVP</label>
              <select
                value={rsvpStatus}
                onChange={(e) => setRsvpStatus(e.target.value as any)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
              >
                <option value="hadir">Konfirmasi Hadir</option>
                <option value="belum_konfirmasi">Belum Konfirmasi</option>
                <option value="tidak_hadir">Berhalangan Hadir</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Preferensi Makanan</label>
              <input
                type="text"
                placeholder="Halal / Vegetarian / No Seafood"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Catatan Tambahan</label>
            <input
              type="text"
              placeholder="Contoh: Butuh kursi roda / Kursi bayi"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
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
              Simpan Tamu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
