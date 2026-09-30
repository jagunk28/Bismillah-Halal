import React, { useState } from 'react';
import { ExpenseItem, NoteItem } from '../types/wedding';

interface QuickEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (expense: ExpenseItem) => void;
  onAddNote: (note: NoteItem) => void;
  budgetItems?: any[];
  totalBudgetLimit?: number;
}

export const QuickEntryModal: React.FC<QuickEntryModalProps> = ({
  isOpen,
  onClose,
  onAddExpense,
  onAddNote,
}) => {
  const [activeTab, setActiveTab] = useState<'expense' | 'note'>('expense');

  // Expense form state
  const [nominalStr, setNominalStr] = useState('15.000.000');
  const [expenseTitle, setExpenseTitle] = useState('Pelunasan DP 2 Dekorasi Pelaminan & Florist Gedung Arsip');
  const [expenseCategory, setExpenseCategory] = useState('Venue & Dekorasi');
  const [paymentStatus, setPaymentStatus] = useState<'lunas' | 'dp' | 'unpaid'>('lunas');
  const [sourceAccount, setSourceAccount] = useState<'joint' | 'dimas' | 'rina'>('joint');
  const [paidBy, setPaidBy] = useState<'50:50' | 'dimas' | 'rina' | 'custom'>('50:50');
  const [expenseNotes, setExpenseNotes] = useState('Termasuk pelunasan dekor pelaminan 12 meter, lorong masuk pergola, dan 6 spot foto foyer gedung.');
  const [receiptFile, setReceiptFile] = useState<string | null>('kuitansi_dp2_dekor_stupa.pdf');

  // Note form state
  const [noteTitle, setNoteTitle] = useState('Pemberkasan Berkas Nikah KUA Setiabudi & Rekomendasi RT/RW');
  const [notePriority, setNotePriority] = useState<'mendesak' | 'penting' | 'ide'>('penting');
  const [noteCategory, setNoteCategory] = useState('📜 KUA & Administrasi Negara');
  const [mentionedPartners, setMentionedPartners] = useState<string[]>(['Dimas (CPP)', 'Rina (CPW)']);
  const [noteContent, setNoteContent] = useState(
    '1. Surat pengantar N1 - N4 dari kelurahan domisili Dimas sudah selesai dicetak.\n2. Dimas perlu minta surat rekomendasi numpang nikah karena akad diadakan di domisili Rina (Jakarta Selatan).\n3. Jadwal bimbingan pranikah (Suscatin) dijadwalkan Jumat pagi 2 minggu sebelum Hari-H.'
  );
  const [convertToTask, setConvertToTask] = useState(true);

  // Submission feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const parseNominal = (str: string) => {
    return Number(str.replace(/[^0-9]/g, '')) || 0;
  };

  const rawNominal = parseNominal(nominalStr);

  const handleExpenseSubmit = () => {
    setIsSubmitting(true);
    const newExpense: ExpenseItem = {
      id: `exp-${Date.now()}`,
      amount: rawNominal || 15000000,
      title: expenseTitle || 'Pengeluaran Pernikahan',
      category: expenseCategory,
      paymentStatus,
      sourceAccount,
      paidBy,
      notes: expenseNotes,
      receiptName: receiptFile || undefined,
      date: new Date().toISOString().split('T')[0],
      recordedBy: 'Rina Astuti',
    };

    setTimeout(() => {
      onAddExpense(newExpense);
      setIsSubmitting(false);
      setSuccessToast('Pengeluaran berhasil disimpan dan disinkronkan ke Dimas via WhatsApp!');
      setTimeout(() => {
        setSuccessToast(null);
        onClose();
      }, 1200);
    }, 500);
  };

  const handleNoteSubmit = () => {
    setIsSubmitting(true);
    const newNote: NoteItem = {
      id: `not-${Date.now()}`,
      title: noteTitle || 'Catatan Koordinasi Baru',
      priority: notePriority,
      category: noteCategory,
      mentionedPartners,
      content: noteContent,
      convertedToTask: convertToTask,
      createdAt: 'Baru saja',
      author: 'Rina Astuti',
      relatedTasksCount: convertToTask ? 2 : 0,
    };

    setTimeout(() => {
      onAddNote(newNote);
      setIsSubmitting(false);
      setSuccessToast('Catatan kolaborasi berhasil disimpan dan diteruskan ke Dimas!');
      setTimeout(() => {
        setSuccessToast(null);
        onClose();
      }, 1200);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#171f1c]/60 backdrop-blur-md transition-opacity duration-300 flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden my-auto border border-[#c2c8c2]/40">
        {/* Top Gradient Hairline Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#042217] via-[#396752] to-[#bbeed2]"></div>

        {/* Header Modal */}
        <div className="px-6 py-4 bg-white flex items-start justify-between gap-4 border-b border-[#eeeeec]">
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#bbeed2]/50 text-[#042217] font-semibold text-[11px] uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                Akses Cepat Berdua
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f4f4f2] text-[#396752] text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#396752] animate-pulse"></span>
                Sinkronisasi Cloud Aktif
              </span>
            </div>
            <h2 className="font-display font-bold text-xl md:text-2xl text-[#042217] tracking-tight">
              Entri Pengeluaran &amp; Catatan Pernikahan
            </h2>
            <p className="text-xs text-[#424844]">
              Simpan transaksi real-time atau catatan koordinasi instan. Pembaruan langsung tertampil di dasbor dan terkirim ke WhatsApp pasangan.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup dialog"
            className="w-9 h-9 rounded-full bg-[#f4f4f2] hover:bg-[#e8e8e6] text-[#424844] hover:text-[#1a1c1b] flex items-center justify-center transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="bg-[#bbeed2] text-[#204f3b] px-6 py-2.5 text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top duration-200">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              {successToast}
            </span>
          </div>
        )}

        {/* Segmented Tab Switcher */}
        <div className="px-6 py-2.5 bg-[#f4f4f2] flex items-center justify-between gap-4 border-b border-[#eeeeec]">
          <div className="inline-flex p-1 bg-[#eeeeec] rounded-xl gap-1 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('expense')}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'expense'
                  ? 'bg-[#1b382b] text-white shadow-sm'
                  : 'text-[#424844] hover:text-[#1a1c1b]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">credit_card</span>
              <span>Catat Pengeluaran</span>
              <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-[#396752] text-white font-medium">
                Kas Keluar
              </span>
            </button>

            <button
              onClick={() => setActiveTab('note')}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'note'
                  ? 'bg-[#1b382b] text-white shadow-sm'
                  : 'text-[#424844] hover:text-[#1a1c1b]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Catatan Baru &amp; Memo</span>
              <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-[#e8e8e6] text-[#424844] font-medium">
                Kolaborasi
              </span>
            </button>
          </div>

          {/* Dual Avatar Micro Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-xs border border-[#c2c8c2]/30">
            <div className="flex -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-[#042217] flex items-center justify-center text-white text-[9px] font-bold">
                R
              </div>
              <div className="w-5 h-5 rounded-full bg-[#396752] flex items-center justify-center text-white text-[9px] font-bold">
                D
              </div>
            </div>
            <span className="text-[11px] text-[#424844] font-medium">Rina Astuti &amp; Dimas</span>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto px-6 py-5 flex-1">
          {/* TAB 1: FORM PENGELUARAN */}
          {activeTab === 'expense' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Main Form (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Nominal Field with Quick Chips */}
                <div className="bg-[#f4f4f2] p-4 rounded-xl flex flex-col gap-2 border border-[#c2c8c2]/30">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-[#396752] uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">payments</span>
                      Jumlah Pengeluaran (IDR) *
                    </label>
                    <span className="text-[11px] text-[#727974]">Mata Uang: IDR (Rp)</span>
                  </div>

                  <div className="relative flex items-center">
                    <span className="absolute left-4 font-display font-bold text-2xl text-[#042217] pointer-events-none">
                      Rp
                    </span>
                    <input
                      className="w-full pl-14 pr-4 py-2.5 bg-white rounded-xl font-display font-bold text-2xl text-[#042217] outline-none border border-[#c2c8c2]/40 focus:ring-2 focus:ring-[#396752]/30 transition-all tracking-tight"
                      placeholder="0"
                      type="text"
                      value={nominalStr}
                      onChange={(e) => setNominalStr(e.target.value)}
                    />
                  </div>

                  {/* Quick Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-xs text-[#727974] mr-1">Cepat:</span>
                    {['500.000', '1.000.000', '5.000.000', '15.000.000', '25.000.000'].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setNominalStr(chip)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          nominalStr === chip
                            ? 'bg-[#bbeed2] text-[#204f3b] border border-[#396752]/40'
                            : 'bg-white hover:bg-[#e8e8e6] text-[#1a1c1b] border border-[#c2c8c2]/40'
                        }`}
                      >
                        Rp {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Judul Transaksi */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1a1c1b]">
                    Nama / Uraian Transaksi <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-[#f4f4f2] focus:bg-white rounded-xl text-xs text-[#1a1c1b] border border-[#c2c8c2]/40 outline-none focus:ring-2 focus:ring-[#396752]/30 transition-all"
                    placeholder="Misal: Uang Muka Catering Maharani 200 Porsi"
                    type="text"
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                  />
                </div>

                {/* 2-Col Field: Kategori Anggaran & Status Pembayaran */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#1a1c1b] flex items-center justify-between">
                      <span>Kategori Pos Anggaran</span>
                      <span className="text-[#396752] font-normal text-[11px]">8 Pos Pagu</span>
                    </label>
                    <div className="relative">
                      <select
                        value={expenseCategory}
                        onChange={(e) => setExpenseCategory(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 pr-8 bg-[#f4f4f2] focus:bg-white rounded-xl text-xs text-[#1a1c1b] border border-[#c2c8c2]/40 outline-none cursor-pointer"
                      >
                        <option value="Venue & Dekorasi">🏛️ Venue &amp; Dekorasi</option>
                        <option value="Catering Prasmanan & Stall">🍲 Catering Prasmanan &amp; Stall</option>
                        <option value="Dokumentasi Foto & Video">📸 Dokumentasi Foto &amp; Sinematografi</option>
                        <option value="Busana Pengantin, MUA & Adat">👗 Busana Pengantin, MUA &amp; Adat</option>
                        <option value="Undangan & Souvenir">💌 Undangan Fisik &amp; Souvenir</option>
                        <option value="Seserahan & Mahar">🎁 Seserahan &amp; Mahar Logam Mulia</option>
                        <option value="Musik Akustik & MC Resepsi">🎵 Musik Akustik &amp; MC Resepsi</option>
                        <option value="Dana Darurat & Operasional">🛡️ Dana Darurat &amp; Operasional</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#727974] text-[18px]">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#1a1c1b]">Tahap Status Pembayaran</label>
                    <div className="relative">
                      <select
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value as any)}
                        className="w-full appearance-none px-3.5 py-2.5 pr-8 bg-[#f4f4f2] focus:bg-white rounded-xl text-xs text-[#1a1c1b] border border-[#c2c8c2]/40 outline-none cursor-pointer"
                      >
                        <option value="lunas">Pelunasan Penuh (Lunas 100%)</option>
                        <option value="dp">Uang Muka (DP 1 / DP 2)</option>
                        <option value="unpaid">Tagihan Mendatang (Belum Lunas)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#727974] text-[18px]">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sumber Rekening Pembayaran */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1a1c1b]">Rekening Asal Pengeluaran</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label
                      onClick={() => setSourceAccount('joint')}
                      className={`cursor-pointer p-2.5 rounded-xl border flex flex-col gap-1 transition-all ${
                        sourceAccount === 'joint'
                          ? 'bg-[#bbeed2]/30 border-[#396752] ring-1 ring-[#396752]'
                          : 'bg-[#f4f4f2] border-[#c2c8c2]/40 hover:bg-[#e8e8e6]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#042217]">Pocket Bersama</span>
                        <input
                          type="radio"
                          name="sourceAccount"
                          checked={sourceAccount === 'joint'}
                          onChange={() => setSourceAccount('joint')}
                          className="accent-[#396752]"
                        />
                      </div>
                      <span className="text-[11px] text-[#424844]">BCA / Jago Berdua</span>
                      <span className="text-[11px] text-[#396752] font-semibold">Sisa: Rp 66.500.000</span>
                    </label>

                    <label
                      onClick={() => setSourceAccount('dimas')}
                      className={`cursor-pointer p-2.5 rounded-xl border flex flex-col gap-1 transition-all ${
                        sourceAccount === 'dimas'
                          ? 'bg-[#bbeed2]/30 border-[#396752] ring-1 ring-[#396752]'
                          : 'bg-[#f4f4f2] border-[#c2c8c2]/40 hover:bg-[#e8e8e6]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#042217]">Rek. Dimas (CPP)</span>
                        <input
                          type="radio"
                          name="sourceAccount"
                          checked={sourceAccount === 'dimas'}
                          onChange={() => setSourceAccount('dimas')}
                          className="accent-[#396752]"
                        />
                      </div>
                      <span className="text-[11px] text-[#424844]">Mandiri Prioritas</span>
                      <span className="text-[11px] text-[#727974]">Pribadi</span>
                    </label>

                    <label
                      onClick={() => setSourceAccount('rina')}
                      className={`cursor-pointer p-2.5 rounded-xl border flex flex-col gap-1 transition-all ${
                        sourceAccount === 'rina'
                          ? 'bg-[#bbeed2]/30 border-[#396752] ring-1 ring-[#396752]'
                          : 'bg-[#f4f4f2] border-[#c2c8c2]/40 hover:bg-[#e8e8e6]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#042217]">Rek. Rina (CPW)</span>
                        <input
                          type="radio"
                          name="sourceAccount"
                          checked={sourceAccount === 'rina'}
                          onChange={() => setSourceAccount('rina')}
                          className="accent-[#396752]"
                        />
                      </div>
                      <span className="text-[11px] text-[#424844]">BCA Platinum</span>
                      <span className="text-[11px] text-[#727974]">Pribadi</span>
                    </label>
                  </div>
                </div>

                {/* Dibayarkan Oleh Siapa */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1a1c1b]">Dibayarkan Oleh Siapa?</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { id: '50:50', label: 'Patungan Berdua (50:50)', badge: '½' },
                      { id: 'dimas', label: 'Dimas Prasetyo', badge: 'D' },
                      { id: 'rina', label: 'Rina Astuti', badge: 'R' },
                      { id: 'custom', label: 'Custom Split %', badge: '%' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPaidBy(opt.id as any)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          paidBy === opt.id
                            ? 'bg-[#042217] text-white shadow-xs'
                            : 'bg-[#f4f4f2] text-[#424844] hover:bg-[#e8e8e6]'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] ${
                            paidBy === opt.id
                              ? 'bg-[#bbeed2] text-[#042217]'
                              : 'bg-white text-[#424844]'
                          }`}
                        >
                          {opt.badge}
                        </span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Bukti Struk Transfer */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#1a1c1b] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#396752]">receipt_long</span>
                      Bukti Struk Transfer / Tagihan Vendor
                    </label>
                    <span className="text-[11px] text-[#727974]">JPG, PNG, PDF (Maks. 5 MB)</span>
                  </div>

                  <div
                    onClick={() => setReceiptFile('kuitansi_dp2_dekor_stupa.pdf')}
                    className="p-4 rounded-xl bg-[#f4f4f2] hover:bg-[#e8e8e6] border border-dashed border-[#c2c8c2] transition-colors flex flex-col items-center justify-center text-center cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#396752] group-hover:scale-105 transition-transform mb-1.5">
                      <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                    </div>
                    <p className="font-semibold text-xs text-[#042217]">
                      {receiptFile ? (
                        <span className="text-[#396752] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          {receiptFile} (Siap Terlampir)
                        </span>
                      ) : (
                        'Tarik & lepas struk transfer di sini atau Pilih Berkas'
                      )}
                    </p>
                    <p className="text-[11px] text-[#727974] mt-0.5">
                      Foto struk mutasi bank, invoice PDF vendor, atau screenshot m-banking.
                    </p>
                  </div>
                </div>

                {/* Catatan Tambahan */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1a1c1b]">
                    Catatan &amp; Instruksi Khusus Vendor
                  </label>
                  <textarea
                    rows={2}
                    value={expenseNotes}
                    onChange={(e) => setExpenseNotes(e.target.value)}
                    placeholder="Contoh: Termasuk tambahan standing flower & pergola photospot."
                    className="w-full px-3 py-2 bg-[#f4f4f2] focus:bg-white rounded-xl text-xs text-[#1a1c1b] border border-[#c2c8c2]/40 outline-none focus:ring-2 focus:ring-[#396752]/30 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Right Companion Panel (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Budget Impact Visualization Card */}
                <div className="bg-[#f4f4f2] rounded-xl p-4 flex flex-col gap-3 border border-[#c2c8c2]/40 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#396752] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">analytics</span>
                      Dampak Terhadap Anggaran
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#bbeed2] text-[#204f3b] text-[10px] font-bold">
                      Aman / Terkendali
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-display font-bold text-sm text-[#042217]">{expenseCategory}</span>
                    <span className="text-[11px] text-[#424844] mt-0.5">Pagu Alokasi: Rp 85.000.000</span>
                  </div>

                  {/* Before vs After Progress Bar */}
                  <div className="flex flex-col gap-1 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#424844]">Terpakai Sebelum: Rp 66.300.000</span>
                      <span className="font-semibold text-[#042217]">78%</span>
                    </div>

                    <div className="w-full h-3 bg-[#e8e8e6] rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#396752]" style={{ width: '78%' }}></div>
                      <div
                        className="h-full bg-[#042217] animate-pulse"
                        style={{ width: `${Math.min((rawNominal / 85000000) * 100, 22)}%` }}
                        title={`+Rp ${rawNominal.toLocaleString('id-ID')}`}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#396752] font-semibold">
                        Setelah transaksi ini: Rp {(66300000 + rawNominal).toLocaleString('id-ID')}
                      </span>
                      <span className="text-[#042217] font-bold">
                        {Math.round(((66300000 + rawNominal) / 85000000) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white flex items-center justify-between border border-[#c2c8c2]/30">
                    <span className="text-xs text-[#424844]">Sisa Kuota Pos Ini:</span>
                    <span className="font-display font-bold text-[#396752] text-sm">
                      Rp {Math.max(85000000 - 66300000 - rawNominal, 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Dual Partner Notification Preview */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c2c8c2]/40 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#396752] text-[18px]">
                        notifications_active
                      </span>
                      <span className="text-xs font-bold text-[#042217] uppercase tracking-wider">
                        Pratinjau Notifikasi Pasangan
                      </span>
                    </div>
                    <span className="text-[10px] text-[#396752] bg-[#bbeed2]/50 px-2 py-0.5 rounded-full font-bold">
                      WhatsApp &amp; App
                    </span>
                  </div>

                  {/* Mock Message Bubble */}
                  <div className="p-3 rounded-xl bg-[#f4f4f2] border border-[#c2c8c2]/30 flex flex-col gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#042217] flex items-center justify-center text-white font-bold text-[10px]">
                        M
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#042217]">Meet to Marry Bot</span>
                        <span className="text-[10px] text-[#727974]">Baru saja · Terkirim ke Dimas (CPP)</span>
                      </div>
                    </div>

                    <div className="text-[#1a1c1b] leading-relaxed pl-1">
                      🌿 <strong>Pengeluaran Baru Dicatat Rina</strong>
                      <br />
                      "{expenseTitle}"
                      <br />
                      <span className="font-semibold text-[#042217]">
                        Nominal: Rp {rawNominal.toLocaleString('id-ID')}
                      </span>
                      <br />
                      <span className="text-[#727974] text-[10px]">
                        Pocket Bersama · Sisa kas wedding: Rp 51.500.000
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1 border-t border-[#c2c8c2]/30 text-[10px] text-[#396752] font-semibold">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      <span>Otomatis masuk ke Rekap Buku Kas &amp; Unduh Laporan</span>
                    </div>
                  </div>
                </div>

                {/* Tip Box */}
                <div className="p-3 rounded-xl bg-[#f4f4f2] flex items-start gap-2 border border-[#c2c8c2]/30 text-xs text-[#424844]">
                  <span className="material-symbols-outlined text-[#396752] text-[18px] shrink-0 mt-0.5">
                    lightbulb
                  </span>
                  <p className="leading-snug">
                    Struk transfer yang diunggah akan diverifikasi otomatis untuk mencatat nomor referensi bank dan tanggal transaksi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FORM CATATAN BARU / MEMO */}
          {activeTab === 'note' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Note Form (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Judul Catatan */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1a1c1b]">
                    Judul Catatan / Topik Koordinasi <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-[#f4f4f2] focus:bg-white rounded-xl text-xs md:text-sm font-semibold text-[#042217] border border-[#c2c8c2]/40 outline-none focus:ring-2 focus:ring-[#396752]/30 transition-all"
                    placeholder="Misal: Review hasil test food catering menu gubukan..."
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                  />
                </div>

                {/* Prioritas & Kategori Tag */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#1a1c1b]">Tingkat Urgensi / Prioritas</label>
                    <div className="relative">
                      <select
                        value={notePriority}
                        onChange={(e) => setNotePriority(e.target.value as any)}
                        className="w-full appearance-none px-3.5 py-2.5 pr-8 bg-[#f4f4f2] focus:bg-white rounded-xl text-xs text-[#1a1c1b] border border-[#c2c8c2]/40 outline-none cursor-pointer"
                      >
                        <option value="mendesak">🔴 Mendesak (Butuh Putusan Segera)</option>
                        <option value="penting">🟡 Penting (Rapat Minggu Ini)</option>
                        <option value="ide">🟢 Ide / Eksplorasi Bersama</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#727974] text-[18px]">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#1a1c1b]">Label Topik Kolaborasi</label>
                    <div className="relative">
                      <select
                        value={noteCategory}
                        onChange={(e) => setNoteCategory(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 pr-8 bg-[#f4f4f2] focus:bg-white rounded-xl text-xs text-[#1a1c1b] border border-[#c2c8c2]/40 outline-none cursor-pointer"
                      >
                        <option value="📜 KUA & Administrasi Negara">📜 KUA &amp; Administrasi Negara</option>
                        <option value="🤝 Wedding Organizer & Rundown">🤝 Wedding Organizer (WO) &amp; Rundown</option>
                        <option value="👨‍👩‍👧‍👦 Diskusi Keluarga Besar">👨‍👩‍👧‍👦 Diskusi Keluarga Besar</option>
                        <option value="🏢 Negosiasi Vendor & Kontrak">🏢 Negosiasi Vendor &amp; Kontrak</option>
                        <option value="👗 Fitting & MUA">👗 Fitting &amp; MUA</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#727974] text-[18px]">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mention Pasangan Chips */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f4f4f2] border border-[#c2c8c2]/30 text-xs">
                  <span className="text-[#727974]">Mention Pasangan:</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#c2c8c2]/40 font-semibold text-[#042217] shadow-2xs">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#042217] text-white flex items-center justify-center text-[8px]">
                      D
                    </span>
                    @Dimas (CPP)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#c2c8c2]/40 font-semibold text-[#396752] shadow-2xs">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#396752] text-white flex items-center justify-center text-[8px]">
                      R
                    </span>
                    @Rina (CPW)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#eeeeec] text-[#424844] text-[11px] font-medium">
                    + WO Planner
                  </span>
                </div>

                {/* Isi Memo / Editor Sederhana */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1a1c1b]">Catatan / Risalah Pembahasan</label>
                  <div className="flex flex-col rounded-xl bg-[#f4f4f2] border border-[#c2c8c2]/40 overflow-hidden">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-[#e8e8e6]/60 border-b border-[#c2c8c2]/30 text-[#424844]">
                      <button type="button" className="p-1 rounded hover:bg-white text-xs">
                        <span className="material-symbols-outlined text-[15px]">format_bold</span>
                      </button>
                      <button type="button" className="p-1 rounded hover:bg-white text-xs">
                        <span className="material-symbols-outlined text-[15px]">format_italic</span>
                      </button>
                      <button type="button" className="p-1 rounded hover:bg-white text-xs">
                        <span className="material-symbols-outlined text-[15px]">format_list_bulleted</span>
                      </button>
                      <button type="button" className="p-1 rounded hover:bg-white text-xs">
                        <span className="material-symbols-outlined text-[15px]">check_box</span>
                      </button>
                    </div>

                    <textarea
                      rows={5}
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Tuliskan detail catatan, kesepakatan, atau hal yang harus dikonfirmasi..."
                      className="w-full px-3.5 py-2.5 bg-transparent text-xs text-[#1a1c1b] outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Konversi ke Checklist / Tugas Pasangan */}
                <div className="p-3 rounded-xl bg-[#f4f4f2] border border-[#c2c8c2]/40 flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    id="convert-task-checkbox"
                    checked={convertToTask}
                    onChange={(e) => setConvertToTask(e.target.checked)}
                    className="mt-0.5 accent-[#396752] w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="convert-task-checkbox" className="flex flex-col cursor-pointer text-xs">
                    <span className="font-semibold text-[#042217]">
                      Sekaligus buatkan 2 butir Tugas di Modul Checklist
                    </span>
                    <span className="text-[#424844] mt-0.5">
                      Otomatis memasukkan tugas berkas ke to-do list Dimas &amp; Rina dengan deadline 30 hari sebelum Hari-H.
                    </span>
                  </label>
                </div>
              </div>

              {/* Note Companion Preview (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="bg-[#f4f4f2] rounded-xl p-4 flex flex-col gap-2.5 border border-[#c2c8c2]/40">
                  <span className="text-[11px] font-bold text-[#396752] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">groups</span>
                    Alur Kerja Bersama Pasangan
                  </span>
                  <p className="text-xs text-[#424844] leading-relaxed">
                    Setiap catatan yang disimpan di sini akan disinkronkan ke feed ringkasan bersama dan dapat dikomentari oleh kedua belah pihak.
                  </p>

                  <div className="bg-white p-3 rounded-xl flex flex-col gap-1.5 shadow-2xs border border-[#c2c8c2]/30 mt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-[#dce4df] text-[#042217] font-bold text-[10px]">
                        KUA &amp; Berkas
                      </span>
                      <span className="text-[10px] text-amber-700 font-bold">🟡 Penting</span>
                    </div>
                    <span className="font-bold text-xs text-[#042217]">{noteTitle}</span>
                    <div className="flex items-center justify-between pt-1 border-t border-[#eeeeec] text-[11px] text-[#424844]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">person</span>
                        Dimas Prasetyo (PIC)
                      </span>
                      <span className="text-[#396752] font-semibold">2 Tugas Terkait</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Wedding Stationery Visual */}
                <div className="rounded-xl overflow-hidden relative shadow-sm h-48 bg-[#eeeeec]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Perlengkapan alat tulis pernikahan"
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#042217]/85 via-[#042217]/30 to-transparent flex items-end p-3.5">
                    <div className="flex flex-col text-white">
                      <span className="text-[10px] font-semibold text-[#bbeed2] uppercase tracking-wider">
                        Meet to Marry Planner
                      </span>
                      <span className="font-display font-bold text-xs md:text-sm">
                        Koordinasi Rapi Menuju Akad Khidmat
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-[#eeeeec] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2 text-[#424844] text-xs order-2 sm:order-1">
            <span className="material-symbols-outlined text-[16px] text-[#396752]">verified_user</span>
            <span>Tersinkronisasi Cloud · Notifikasi WhatsApp Pasangan Dikirim Otomatis</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#424844] hover:text-[#1a1c1b] hover:bg-[#f4f4f2] transition-colors cursor-pointer"
              type="button"
            >
              Batal
            </button>

            <button
              onClick={activeTab === 'expense' ? handleExpenseSubmit : handleNoteSubmit}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#042217] hover:bg-[#1b382b] text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isSubmitting ? 'sync' : 'send_and_archive'}
              </span>
              <span>
                {activeTab === 'expense'
                  ? 'Simpan & Sinkronkan Pengeluaran'
                  : 'Simpan & Bagikan Catatan'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
