import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ChecklistItem } from '../../types/wedding';

interface AddChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: ChecklistItem) => void;
}

export const AddChecklistModal: React.FC<AddChecklistModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState<ChecklistItem['category']>('Logistik');
  const [priority, setPriority] = useState<ChecklistItem['priority']>('tinggi');
  const [dueDate, setDueDate] = useState('2026-10-18');
  const [assignee, setAssignee] = useState('Tim WO Meet to Marry');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    const newItem: ChecklistItem = {
      id: `c-${Date.now()}`,
      task,
      category,
      priority,
      dueDate,
      assignee,
      completed: false,
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        <div className="bg-[#1C1917] text-white p-5 flex justify-between items-center">
          <h3 className="font-serif-luxury font-bold text-lg text-white">
            Tambah Checklist Tugas Pernikahan
          </h3>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">Rincian Tugas / Checklist *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Konfirmasi final rundown dengan MC Bobby &amp; Nadia"
              value={task}
              onChange={(e) => setTask(e.target.value)}
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
                <option value="Legal/KUA">Legal / KUA</option>
                <option value="Vendor">Vendor</option>
                <option value="Busana">Busana &amp; Rias</option>
                <option value="Logistik">Logistik</option>
                <option value="Tamu">Tamu &amp; Undangan</option>
                <option value="Acara">Acara &amp; Sakral</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Tingkat Urgensi</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
              >
                <option value="kritis">Kritis (H-30/H-7)</option>
                <option value="tinggi">Tinggi</option>
                <option value="sedang">Sedang</option>
                <option value="rendah">Rendah</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Tenggat Waktu</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Penanggung Jawab (Assignee)</label>
              <input
                type="text"
                placeholder="Rian / Natasha / Tim WO"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
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
              Simpan Tugas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
