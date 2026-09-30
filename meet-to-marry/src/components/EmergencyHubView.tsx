import React, { useState } from 'react';
import {
  ShieldAlert,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  Send,
  UserCheck,
} from 'lucide-react';
import { EmergencyContact, ContingencyRisk } from '../types/wedding';

interface EmergencyHubViewProps {
  emergencyContacts: EmergencyContact[];
  risks: ContingencyRisk[];
  onOpenBroadcastModal: () => void;
}

export const EmergencyHubView: React.FC<EmergencyHubViewProps> = ({
  emergencyContacts,
  risks,
  onOpenBroadcastModal,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner Alert */}
      <div className="bg-gradient-to-r from-stone-900 to-amber-950 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
              Pusat Protokol Siaga
            </span>
            <span className="text-xs text-stone-300">Respons Cepat &lt; 3 Menit</span>
          </div>
          <h2 className="text-2xl font-serif-luxury font-bold text-white mt-1">
            Kontak Darurat, PIC &amp; Mitigasi Risiko Hari-H
          </h2>
          <p className="text-xs md:text-sm text-stone-300 mt-1 max-w-2xl">
            Semua nomor darurat penentu kelancaran sakral nikah, koordinasi ambulans, penghulu, hingga teknisi genset cadangan terintegrasi di sini.
          </p>
        </div>

        <button
          onClick={onOpenBroadcastModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-2 transition cursor-pointer shadow-xs shrink-0 self-start md:self-auto"
        >
          <Share2 className="w-4 h-4" />
          <span>Buka Generator Siaran WhatsApp</span>
        </button>
      </div>

      {/* Emergency Contacts Grid */}
      <div className="space-y-3">
        <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
          Jajaran Kontak Darurat &amp; PIC Utama
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-white rounded-2xl border p-4 shadow-2xs hover:shadow-xs transition flex flex-col justify-between ${
                contact.isPriority ? 'border-amber-300 ring-1 ring-amber-200' : 'border-[#E8E1D5]'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9B6D3B] bg-[#F7EBDD] px-2 py-0.5 rounded">
                    {contact.agencyOrCompany}
                  </span>
                  {contact.isPriority && (
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      PRIORITAS UTAMA
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-stone-900 text-base">{contact.name}</h4>
                <p className="text-xs text-stone-500 font-medium mb-3">{contact.role}</p>

                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 flex items-center justify-between font-mono text-xs text-stone-800">
                  <span className="font-semibold">{contact.phone}</span>
                  <button
                    onClick={() => handleCopy(contact.id, contact.phone)}
                    className="text-stone-500 hover:text-stone-900 cursor-pointer"
                    title="Salin Nomor"
                  >
                    {copiedId === contact.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-100">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>Panggil Darurat</span>
                </a>
                <a
                  href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(
                    contact.name
                  )}%20dari%20Meet%20to%20Marry`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat WA</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anticipating Potential Risks & Contingency Section */}
      <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 md:p-6 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
              Antisipasi Risiko &amp; Rencana Kontinjensi Hari-H
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Skenario tak terduga yang sudah disiapkan protokol mitigasi oleh tim Wedding Organizer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {risks.map((risk) => (
            <div
              key={risk.id}
              className="p-4 rounded-xl border border-stone-200 bg-[#FAF7F2] space-y-2"
            >
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-bold text-stone-900 text-sm">{risk.risk}</h4>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    risk.status === 'aman'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {risk.status === 'aman' ? '✓ MITIGASI SIAP' : '⚠ PANTAU'}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed bg-white p-2.5 rounded-lg border border-stone-200">
                <strong className="text-stone-800 block mb-0.5">Solusi / Mitigasi:</strong>
                {risk.mitigation}
              </p>
              <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1">
                <span>Penanggung Jawab:</span>
                <span className="font-semibold text-stone-800">{risk.pic}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
