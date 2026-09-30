import React, { useState } from 'react';
import { ChecklistItem } from '../types/wedding';

interface ChecklistViewProps {
  checklist: ChecklistItem[];
  onToggleChecklist: (id: string) => void;
  onAddChecklist: (item: ChecklistItem) => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  checklist,
  onToggleChecklist,
  onAddChecklist,
}) => {
  const [filterPhase, setFilterPhase] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'Venue & Decor',
    timeframe: 'H-30 (1 Bulan Sebelum)',
    pic: 'Rina & Dimas',
    priority: 'high' as const,
  });

  const phases = [
    { id: 'all', label: 'Semua Fase' },
    { id: 'H-90 (3 Bulan Sebelum)', label: 'H-90 (3 Bulan)' },
    { id: 'H-60 (2 Bulan Sebelum)', label: 'H-60 (2 Bulan)' },
    { id: 'H-30 (1 Bulan Sebelum)', label: 'H-30 (1 Bulan)' },
    { id: 'H-14 (2 Minggu Sebelum)', label: 'H-14 (2 Minggu)' },
    { id: 'H-7 (1 Minggu Sebelum)', label: 'H-7 (1 Minggu)' },
    { id: 'H-1 & Hari-H', label: 'H-1 & Hari-H' },
  ];

  const filteredTasks = checklist.filter((item) => {
    if (filterPhase !== 'all' && item.timeframe !== filterPhase) return false;
    if (filterStatus === 'completed' && !item.completed) return false;
    if (filterStatus === 'pending' && item.completed) return false;
    return true;
  });

  const totalTasks = checklist.length;
  const completedTasks = checklist.filter((t) => t.completed).length;
  const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    onAddChecklist({
      id: `chk_${Date.now()}`,
      title: newTask.title,
      category: newTask.category,
      timeframe: newTask.timeframe,
      completed: false,
      priority: newTask.priority,
      pic: newTask.pic,
    });
    setNewTask({
      title: '',
      category: 'Venue & Decor',
      timeframe: 'H-30 (1 Bulan Sebelum)',
      pic: 'Rina & Dimas',
      priority: 'high',
    });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#c2c8c2]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bbeed2]/40 text-[#204f3b] text-xs font-semibold mb-2">
            <span className="material-symbols-outlined text-[16px]">task_alt</span>
            <span>Daftar Periksa Utama Pernikahan</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold font-display text-[#042217] tracking-tight">
            Checklist & Timeline Tugas
          </h1>
          <p className="text-sm text-[#424844] mt-1">
            Pantau seluruh persiapan pernikahan dari H-90 hari hingga briefing hari-H bersama WO.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#042217] text-white text-xs font-semibold hover:bg-[#1b382b] transition-all shadow-sm active:scale-95 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Tambah Tugas Baru</span>
        </button>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#c2c8c2]/50 shadow-sm">
          <p className="text-xs font-medium text-[#424844]">Progres Keseluruhan</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-[#042217] font-display">{progressPct}%</span>
            <span className="text-xs text-[#396752]">selesai</span>
          </div>
          <div className="w-full bg-[#eeeeec] h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#396752] h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c2c8c2]/50 shadow-sm">
          <p className="text-xs font-medium text-[#424844]">Tugas Selesai</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-emerald-700 font-display">{completedTasks}</span>
            <span className="text-xs text-[#424844]">dari {totalTasks} tugas</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">done_all</span>
            <span>Terkonfirmasi siap</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c2c8c2]/50 shadow-sm">
          <p className="text-xs font-medium text-[#424844]">Tugas Menunggu</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-amber-600 font-display">{totalTasks - completedTasks}</span>
            <span className="text-xs text-[#424844]">dalam proses</span>
          </div>
          <p className="text-[11px] text-amber-700 mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>Prioritas tinggi: 4 tugas</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c2c8c2]/50 shadow-sm">
          <p className="text-xs font-medium text-[#424844]">PIC Kolaborasi</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-[#042217] font-display">4</span>
            <span className="text-xs text-[#424844]">penanggung jawab</span>
          </div>
          <div className="flex -space-x-2 mt-2">
            <span className="w-6 h-6 rounded-full bg-[#bbeed2] text-[#002114] text-[10px] font-bold flex items-center justify-center border border-white">R</span>
            <span className="w-6 h-6 rounded-full bg-[#a0d1b7] text-[#002114] text-[10px] font-bold flex items-center justify-center border border-white">D</span>
            <span className="w-6 h-6 rounded-full bg-[#396752] text-white text-[10px] font-bold flex items-center justify-center border border-white">WO</span>
            <span className="w-6 h-6 rounded-full bg-[#042217] text-white text-[10px] font-bold flex items-center justify-center border border-white">KL</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#c2c8c2]/50">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {phases.map((p) => (
            <button
              key={p.id}
              onClick={() => setFilterPhase(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                filterPhase === p.id
                  ? 'bg-[#042217] text-white font-semibold shadow-sm'
                  : 'text-[#424844] hover:bg-[#f4f4f2]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#eeeeec]">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2.5 py-1 text-xs rounded-lg ${filterStatus === 'all' ? 'bg-[#eeeeec] font-semibold text-[#042217]' : 'text-[#424844]'}`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-2.5 py-1 text-xs rounded-lg ${filterStatus === 'pending' ? 'bg-[#eeeeec] font-semibold text-amber-700' : 'text-[#424844]'}`}
          >
            Belum
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-2.5 py-1 text-xs rounded-lg ${filterStatus === 'completed' ? 'bg-[#eeeeec] font-semibold text-emerald-700' : 'text-[#424844]'}`}
          >
            Selesai
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl border border-[#c2c8c2]/50 overflow-hidden shadow-sm">
        <div className="divide-y divide-[#eeeeec]">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center text-[#424844]">
              <span className="material-symbols-outlined text-4xl text-[#c2c8c2] mb-2">task</span>
              <p className="text-sm font-semibold">Tidak ada tugas pada filter ini.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onToggleChecklist(task.id)}
                className={`p-4 sm:p-5 flex items-start gap-4 transition-all hover:bg-[#f9f9f7] cursor-pointer ${
                  task.completed ? 'bg-[#fcfdfc] opacity-80' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}} // handled by parent onClick
                  className="w-5 h-5 rounded mt-0.5 text-[#042217] accent-[#042217] cursor-pointer"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-sm font-semibold ${
                        task.completed ? 'line-through text-[#727974]' : 'text-[#042217]'
                      }`}
                    >
                      {task.title}
                    </span>
                    {task.priority === 'urgent' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                        Urgent
                      </span>
                    )}
                    {task.priority === 'high' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Tinggi
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#424844]">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#396752]">category</span>
                      {task.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#396752]">schedule</span>
                      {task.timeframe}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#396752]">person</span>
                      PIC: {task.pic}
                    </span>
                    {task.dueDate && (
                      <span className="text-[11px] text-[#727974]">Target: {task.dueDate}</span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      task.completed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#eeeeec] text-[#424844]'
                    }`}
                  >
                    {task.completed ? 'Selesai' : 'Tertunda'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#c2c8c2] animate-scale-up">
            <div className="flex items-center justify-between pb-4 border-b border-[#eeeeec]">
              <h3 className="text-lg font-bold font-display text-[#042217]">Tambah Tugas Persiapan</h3>
              <button onClick={() => setIsAdding(false)} className="text-[#424844] hover:text-black">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#424844] block mb-1">Judul Tugas</label>
                <input
                  type="text"
                  placeholder="Contoh: Fitting Terakhir Busana Akad Mempelai"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#c2c8c2] focus:outline-none focus:ring-2 focus:ring-[#396752]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Kategori</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c2c8c2] bg-white focus:outline-none focus:ring-1 focus:ring-[#396752]"
                  >
                    <option value="Administrasi & KUA">Administrasi & KUA</option>
                    <option value="Venue & Decor">Venue & Decor</option>
                    <option value="Busana & MUA">Busana & MUA</option>
                    <option value="Catering & F&B">Catering & F&B</option>
                    <option value="Undangan & Souvenir">Undangan & Souvenir</option>
                    <option value="Foto & Video">Foto & Video</option>
                    <option value="Rundown & Tim WO">Rundown & Tim WO</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Fase Waktu</label>
                  <select
                    value={newTask.timeframe}
                    onChange={(e) => setNewTask({ ...newTask, timeframe: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c2c8c2] bg-white focus:outline-none focus:ring-1 focus:ring-[#396752]"
                  >
                    <option value="H-90 (3 Bulan Sebelum)">H-90 (3 Bulan)</option>
                    <option value="H-60 (2 Bulan Sebelum)">H-60 (2 Bulan)</option>
                    <option value="H-30 (1 Bulan Sebelum)">H-30 (1 Bulan)</option>
                    <option value="H-14 (2 Minggu Sebelum)">H-14 (2 Minggu)</option>
                    <option value="H-7 (1 Minggu Sebelum)">H-7 (1 Minggu)</option>
                    <option value="H-1 & Hari-H">H-1 & Hari-H</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Penanggung Jawab (PIC)</label>
                  <input
                    type="text"
                    value={newTask.pic}
                    onChange={(e) => setNewTask({ ...newTask, pic: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c2c8c2] focus:outline-none focus:ring-1 focus:ring-[#396752]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#424844] block mb-1">Prioritas</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c2c8c2] bg-white focus:outline-none focus:ring-1 focus:ring-[#396752]"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">Tinggi</option>
                    <option value="medium">Sedang</option>
                    <option value="low">Rendah</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#eeeeec]">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#424844] hover:bg-[#f4f4f2] rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-[#042217] text-white hover:bg-[#1b382b] rounded-xl shadow-sm"
                >
                  Simpan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
