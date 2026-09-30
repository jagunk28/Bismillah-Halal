import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  AlertCircle,
  Plus,
  CheckCircle,
  PieChart,
  FileSpreadsheet,
  ArrowUpRight,
} from 'lucide-react';
import { BudgetItem } from '../types/wedding';

interface BudgetViewProps {
  budgetItems: BudgetItem[];
  totalBudgetLimit: number;
  onAddNewBudgetItem: () => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({
  budgetItems,
  totalBudgetLimit,
  onAddNewBudgetItem,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const totalAllocated = budgetItems.reduce((acc, b) => acc + b.allocated, 0);
  const totalSpent = budgetItems.reduce((acc, b) => acc + b.spent, 0);
  const remainingBudget = totalBudgetLimit - totalSpent;
  const percentageSpent = Math.round((totalSpent / totalBudgetLimit) * 100);

  const filteredItems = budgetItems.filter((item) => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-600 block mb-1">
            Pagu Maksimal Anggaran
          </span>
          <div className="text-2xl font-bold font-mono text-stone-900">
            Rp {(totalBudgetLimit / 1000000).toFixed(0)} Juta
          </div>
          <span className="text-xs text-stone-600 mt-1 block">Batas pagu disepakati keluarga</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-600 block mb-1">
            Realisasi Pengeluaran
          </span>
          <div className="text-2xl font-bold font-mono text-amber-700">
            Rp {(totalSpent / 1000000).toFixed(1)} Juta
          </div>
          <span className="text-xs text-stone-600 mt-1 block">
            {percentageSpent}% dari total pagu
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-600 block mb-1">
            Sisa Saldo Cadangan
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-700">
            Rp {(remainingBudget / 1000000).toFixed(1)} Juta
          </div>
          <span className="text-xs text-emerald-800 mt-1 block font-medium">
            Saldo likuid keluarga aman
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Pelunasan Berkas
            </span>
            <span className="text-xs font-mono font-bold text-stone-900">
              {budgetItems.filter((b) => b.status === 'lunas').length} / {budgetItems.length} Pos Lunas
            </span>
          </div>
          <button
            onClick={onAddNewBudgetItem}
            className="w-full mt-3 bg-[#D9A74A] hover:bg-[#C29235] text-stone-950 text-xs font-bold py-2 rounded-xl flex items-center justify-center space-x-1.5 transition cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pos Anggaran</span>
          </button>
        </div>
      </div>

      {/* Progress Bar of Overall Budget */}
      <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 shadow-2xs">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <PieChart className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif-luxury text-base font-bold text-stone-900">
              Rasio Realisasi Pagu Pernikahan
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold text-stone-700">
            {percentageSpent}% Terpakai
          </span>
        </div>
        <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-amber-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(percentageSpent, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-xs text-stone-600 mt-2">
          <span>Rp 0</span>
          <span>Target Pagu: Rp {(totalBudgetLimit / 1000000).toFixed(0)} Juta</span>
        </div>
      </div>

      {/* Items Breakdown Table */}
      <div className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-[#E8E1D5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
            Rincian Alokasi Per Kategori
          </h3>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-stone-600 font-medium">Filter Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-stone-700 cursor-pointer focus:outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="lunas">Lunas</option>
              <option value="sebagian">Sebagian / DP</option>
              <option value="belum">Belum Dibayar</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-stone-600 uppercase font-semibold border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4">Pos Pengeluaran &amp; Kategori</th>
                <th className="py-3 px-3 text-right">Alokasi Pagu</th>
                <th className="py-3 px-3 text-right">Realisasi / Terbayar</th>
                <th className="py-3 px-3 text-right">Sisa Kewajiban</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4">Catatan Finansial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredItems.map((item) => {
                const sisa = item.allocated - item.spent;
                return (
                  <tr key={item.id} className="hover:bg-amber-50/20 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900 text-sm">{item.name}</div>
                      <span className="text-[11px] text-[#9B6D3B] font-medium uppercase tracking-wide">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-stone-800">
                      Rp {item.allocated.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-700">
                      Rp {item.spent.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-semibold text-rose-700">
                      {sisa > 0 ? `Rp ${sisa.toLocaleString('id-ID')}` : 'Rp 0'}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'lunas'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status === 'lunas' ? 'LUNAS' : 'DP / SEBAGIAN'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 text-[11px]">
                      {item.notes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
