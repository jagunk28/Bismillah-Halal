import React, { useState } from 'react';
import { X } from 'lucide-react';
import { VendorItem } from '../../types/wedding';

interface AddVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (vendor: VendorItem) => void;
}

export const AddVendorModal: React.FC<AddVendorModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<VendorItem['category']>('decor');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('0812-');
  const [instagram, setInstagram] = useState('@');
  const [totalAmount, setTotalAmount] = useState<number>(25000000);
  const [paidAmount, setPaidAmount] = useState<number>(10000000);
  const [deliverables, setDeliverables] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newVendor: VendorItem = {
      id: `v-${Date.now()}`,
      name,
      category,
      contactPerson: contactPerson || 'PIC Vendor',
      phone,
      instagram: instagram || '@vendor',
      totalAmount: Number(totalAmount) || 0,
      paidAmount: Number(paidAmount) || 0,
      dueDate: '2026-10-15',
      status: Number(paidAmount) >= Number(totalAmount) ? 'lunas' : 'dp_paid',
      rating: 5.0,
      deliverables: deliverables
        ? deliverables.split('\n').filter((d) => d.trim().length > 0)
        : ['Paket Layanan Pernikahan Standar'],
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    };

    onAdd(newVendor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        <div className="bg-[#1C1917] text-white p-5 flex justify-between items-center">
          <h3 className="font-serif-luxury font-bold text-lg text-white">
            Tambah Vendor Pernikahan
          </h3>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">Nama Vendor / Bisnis *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Lotus Decoration &amp; Lighting"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
              >
                <option value="venue">Venue</option>
                <option value="catering">Katering</option>
                <option value="decor">Dekorasi</option>
                <option value="mua">Rias &amp; MUA</option>
                <option value="photo">Foto &amp; Video</option>
                <option value="attire">Busana Pengantin</option>
                <option value="mc">MC &amp; Musik</option>
                <option value="invitation">Undangan &amp; Souvenir</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Akun Instagram</label>
              <input
                type="text"
                placeholder="@nama_vendor"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Narahubung (PIC)</label>
              <input
                type="text"
                placeholder="Ibu Sarah"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Nomor WhatsApp / Telp</label>
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
              <label className="font-bold text-stone-700 block mb-1">Total Nilai Kontrak (Rp)</label>
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Uang Muka / Terbayar (Rp)</label>
              <input
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">
              Deliverables / Cakupan Layanan (Pisahkan dengan baris baru)
            </label>
            <textarea
              rows={3}
              placeholder="Dekorasi pelaminan 10m&#10;Hand bouquet pengantin&#10;Lighting panggung 10.000 watt"
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
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
              Simpan Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
