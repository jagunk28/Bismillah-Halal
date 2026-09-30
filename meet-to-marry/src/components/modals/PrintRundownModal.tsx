import React from 'react';
import { X, Printer, Download, Sparkles } from 'lucide-react';
import { CoupleInfo, RundownItem, EmergencyContact } from '../../types/wedding';

interface PrintRundownModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupleInfo: CoupleInfo;
  rundownItems: RundownItem[];
  emergencyContacts: EmergencyContact[];
}

export const PrintRundownModal: React.FC<PrintRundownModalProps> = ({
  isOpen,
  onClose,
  coupleInfo,
  rundownItems,
  emergencyContacts,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200">
        {/* Modal Top Header (Hidden in Print) */}
        <div className="p-4 bg-stone-900 text-white flex justify-between items-center print:hidden rounded-t-3xl">
          <div className="flex items-center space-x-2">
            <Printer className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif-luxury font-bold text-lg text-white">
              Cetak / Ekspor Rundown Resmi Hari-H (PDF Format)
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="bg-[#D9A74A] hover:bg-[#C29235] text-stone-950 text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-xs transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Sekarang (Ctrl+P)</span>
            </button>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet Body */}
        <div className="p-8 overflow-y-auto print:p-0 print:overflow-visible text-stone-900 font-sans space-y-6">
          {/* Printable Header */}
          <div className="border-b-2 border-stone-800 pb-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9B6D3B]">
              MEET TO MARRY · OFFICIAL WEDDING DAY ORCHESTRATION SHEET
            </span>
            <h1 className="text-3xl font-serif-luxury font-bold text-stone-900 mt-1">
              {coupleInfo.brideFullName} &amp; {coupleInfo.groomFullName}
            </h1>
            <p className="text-xs text-stone-600 mt-1 font-medium">
              Sabtu, 24 Oktober 2026 · {coupleInfo.venueName} · {coupleInfo.venueAddress}
            </p>
            <span className="text-[11px] font-mono text-stone-500 font-semibold block mt-0.5">
              Hashtag: {coupleInfo.hashtag} · Lead WO: Farhan Azhar (0818-0987-1234)
            </span>
          </div>

          {/* Rundown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-800 font-bold border-y border-stone-300">
                  <th className="py-2.5 px-2 border-b border-stone-300 w-24">Waktu (WIB)</th>
                  <th className="py-2.5 px-3 border-b border-stone-300">Rangkaian Acara</th>
                  <th className="py-2.5 px-3 border-b border-stone-300">Lokasi / Spot</th>
                  <th className="py-2.5 px-3 border-b border-stone-300">Penanggung Jawab (PIC)</th>
                  <th className="py-2.5 px-3 border-b border-stone-300">Perlengkapan &amp; Cue Musik</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {rundownItems.map((item) => (
                  <tr
                    key={item.id}
                    className={item.isSakral ? 'bg-amber-50/70 font-medium' : ''}
                  >
                    <td className="py-2.5 px-2 font-mono font-bold align-top">
                      <div>
                        {item.timeStart} - {item.timeEnd}
                      </div>
                      <div className="text-[10px] text-emerald-800 font-medium">
                        +{item.bufferMinutes}m buffer
                      </div>
                    </td>
                    <td className="py-2.5 px-3 align-top">
                      <div className="font-bold text-stone-900">
                        {item.isSakral && '⭐ '}
                        {item.title}
                      </div>
                      <div className="text-[11px] text-stone-600 mt-0.5">{item.notes}</div>
                    </td>
                    <td className="py-2.5 px-3 align-top text-stone-800 font-medium">
                      {item.location}
                    </td>
                    <td className="py-2.5 px-3 align-top">
                      <div className="font-bold text-stone-900">{item.picName}</div>
                      <div className="text-[10px] text-stone-600">{item.picRole}</div>
                      <div className="text-[10px] font-mono text-emerald-800 font-semibold">
                        {item.picPhone}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 align-top text-[11px] text-stone-600">
                      {item.musicCue && <div>🎵 {item.musicCue}</div>}
                      {item.props.length > 0 && (
                        <div className="mt-0.5">📦 {item.props.join(', ')}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Emergency Bottom Section in Printable */}
          <div className="border-t border-stone-300 pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {emergencyContacts.slice(0, 4).map((c) => (
              <div key={c.id} className="p-2 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-stone-900 block truncate">{c.name}</span>
                <span className="text-[10px] text-stone-600 block">{c.role}</span>
                <span className="text-[10px] font-mono font-bold text-emerald-800 block mt-0.5">
                  {c.phone}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end print:hidden rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
};
