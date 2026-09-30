import React, { useState } from 'react';
import { X } from 'lucide-react';
import { BudgetItem } from '../../types/wedding';

interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: BudgetItem) => void;
}

export const AddBudgetModal: React.FC<AddBudgetModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Logistik & Perlengkapan');
  const [allocated, setAllocated] = useState<number>(10000000);
  const [spent, setSpent] = useState<number>(5000000);
  const [status, setStatus] = useState<BudgetItem['status']>('sebagian');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: BudgetItem = {
      id: `b-${Date.now()}`,
      name,
      category,
      allocated: Number(allocated) || 0,
      spent: Number(spent) || 0,
      status: Number(spent) >= Number(allocated) ? 'lunas' : status,
      notes: notes || 'Pos anggaran teralokasi Meet to Marry.',
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        <div className="bg-[#1C1917] text-white p-5 flex justify-between items-center">
          <h3 className="font-serif-luxury font-bold text-lg text-white">
            Tambah Pos Anggaran Pernikahan
          </h3>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">Nama Pos Pengeluaran *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Souvenir Custom Reed Diffuser 500 pcs"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Kategori Biaya</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
              >
                <option value="Venue & Fasilitas">Venue &amp; Fasilitas</option>
                <option value="Katering & Minuman">Katering &amp; Minuman</option>
                <option value="Dekorasi & Pencahayaan">Dekorasi &amp; Pencahayaan</option>
                <option value="Dokumentasi">Dokumentasi</option>
                <option value="Busana & Rias Pengantin">Busana &amp; Rias Pengantin</option>
                <option value="MC, Musik & Entertainment">MC &amp; Musik</option>
                <option value="Undangan & Souvenir">Undangan &amp; Souvenir</option>
                <option value="KUA, Mahar & Legalitas">KUA &amp; Legalitas</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Status Pembayaran</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
              >
                <option value="sebagian">DP / Sebagian</option>
                <option value="lunas">Lunas</option>
                <option value="belum">Belum Dibayar</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Alokasi Pagu (Rp)</label>
              <input
                type="number"
                value={allocated}
                onChange={(e) => setAllocated(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Realisasi Terbayar (Rp)</label>
              <input
                type="number"
                value={spent}
                onChange={(e) => setSpent(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Catatan Termin &amp; Rekening</label>
            <textarea
              rows={2}
              placeholder="Contoh: Sisa pelunasan H-7 transfer BCA"
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
              Simpan Pos Anggaran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
