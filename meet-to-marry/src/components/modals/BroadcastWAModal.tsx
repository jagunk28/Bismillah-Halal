import React, { useState } from 'react';
import { X, Share2, Copy, Check, Send, Sparkles, MessageCircle } from 'lucide-react';
import { CoupleInfo, RundownItem } from '../../types/wedding';

interface BroadcastWAModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupleInfo: CoupleInfo;
  rundownItems: RundownItem[];
  prefilledItem?: RundownItem | null;
}

export const BroadcastWAModal: React.FC<BroadcastWAModalProps> = ({
  isOpen,
  onClose,
  coupleInfo,
  rundownItems,
  prefilledItem,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    prefilledItem ? 'session' : 'full'
  );
  const [recipientCategory, setRecipientCategory] = useState<string>('all_vendors');

  if (!isOpen) return null;

  const sakralItem = rundownItems.find((r) => r.isSakral && r.title.includes('Ijab Qabul'));

  // Pre-built Indonesian WhatsApp Templates
  const generateMessage = () => {
    if (selectedTemplate === 'session' && prefilledItem) {
      return `*MEET TO MARRY - BRIEFING SESI HARI-H* 🕊️
*The Wedding of ${coupleInfo.brideName} & ${coupleInfo.groomName}*
------------------------------------------------
Kepada: *${prefilledItem.picName}* (${prefilledItem.picRole})

Mohon kesiapan untuk sesi berikut:
📌 *Agenda:* ${prefilledItem.title}
⏰ *Waktu:* ${prefilledItem.timeStart} - ${prefilledItem.timeEnd} WIB
📍 *Lokasi:* ${prefilledItem.location}
⏳ *Buffer Keamanan:* +${prefilledItem.bufferMinutes} menit
🎵 *Music/Lighting Cue:* ${prefilledItem.musicCue || '-'}
👗 *Dresscode:* ${prefilledItem.dresscode || '-'}
📦 *Perlengkapan:* ${prefilledItem.props.join(', ') || '-'}

Catatan Khusus:
_${prefilledItem.notes}_

Harap standby di spot 10 menit sebelum jam sesi. Terima kasih atas dedikasi dan kerja samanya! ✨

Salam,
*Tim Wedding Organizer Meet to Marry*`;
    }

    if (selectedTemplate === 'sakral') {
      return `*PENGINGAT KHIDMAT: PROSESI SAKRAL AKAD NIKAH* 💍
*${coupleInfo.brideName} & ${coupleInfo.groomName}*
------------------------------------------------
Bapak/Ibu Saksi, Keluarga Inti & Penghulu yang kami hormati,

Mengingatkan kembali prosesi sakral Ijab Qabul akan dilangsungkan pada:
📅 Hari/Tanggal: Sabtu, 24 Oktober 2026
⏰ Pukul: ${sakralItem?.timeStart || '08:00'} - ${sakralItem?.timeEnd || '09:00'} WIB
📍 Tempat: ${sakralItem?.location || coupleInfo.venueName}
👔 Busana: Adat Lengkap / Seragam Keluarga Mocca Gold

Mohon kehadiran di ruang tunggu pendopo paling lambat pukul 07:30 WIB untuk kelengkapan administrasi berkas nikah KUA.

Terima kasih atas doa dan restu yang tulus. 🙏
_${coupleInfo.hashtag}_`;
    }

    if (selectedTemplate === 'bridesmaids') {
      return `*SPECIAL BRIEFING: BRIDESMAIDS & GROOMSMEN SQUAD* 🌸✨
*Wedding of ${coupleInfo.brideName} & ${coupleInfo.groomName}*
------------------------------------------------
Dear Squad Kesayangan,

Berikut checklist penting hari-H besok:
⏰ *05:30 WIB:* Tim Bridesmaids kumpul di Bridal Suite untuk makeup & foto kimono robe
⏰ *06:30 WIB:* Tim Groomsmen standby di Lobby Pendopo (PIC Cincin: Kevin)
⏰ *07:45 WIB:* Kirab masuk mendampingi mempelai
⏰ *11:45 WIB:* Grand Entrance Ballroom & Sparklers siap dipegang!

Emergency Contact WO:
Mas Farhan Azhar (0818-0987-1234)

Let's make this day unforgettable! 💕
_${coupleInfo.hashtag}_`;
    }

    // Default: Full Rundown summary for all vendors
    return `*RUNDOWN RESMI HARI-H PERNIKAHAN* 🕊️
*The Wedding of ${coupleInfo.brideName} & ${coupleInfo.groomName}*
📍 ${coupleInfo.venueName}, ${coupleInfo.city}
📅 Sabtu, 24 Oktober 2026
------------------------------------------------
Ringkasan Jadwal:
${rundownItems
  .slice(0, 8)
  .map(
    (item) =>
      `• ${item.timeStart} - ${item.timeEnd} : ${item.isSakral ? '⭐ ' : ''}${item.title} (${item.location})`
  )
  .join('\n')}

Kontak Darurat Show Director:
Farhan Azhar (Kepala WO): 0818-0987-1234

Harap seluruh vendor mematuhi time buffer dan standar koordinasi Meet to Marry. Terima kasih! 🙏`;
  };

  const messageText = generateMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWA = () => {
    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="bg-[#1C1917] text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif-luxury font-bold text-lg text-white">
              Generator Pesan Siaran WhatsApp
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Template Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1.5">
              Pilih Jenis Pesan Siaran:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedTemplate('full')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                  selectedTemplate === 'full'
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                📋 Ringkasan Rundown Vendor
              </button>
              <button
                onClick={() => setSelectedTemplate('sakral')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                  selectedTemplate === 'sakral'
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                💍 Sakral Akad &amp; Keluarga
              </button>
              <button
                onClick={() => setSelectedTemplate('bridesmaids')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                  selectedTemplate === 'bridesmaids'
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                🌸 Bridesmaids &amp; Squad
              </button>
              {prefilledItem && (
                <button
                  onClick={() => setSelectedTemplate('session')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                    selectedTemplate === 'session'
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  ⚡ Sesi: {prefilledItem.picName.split(' ')[0]}
                </button>
              )}
            </div>
          </div>

          {/* Message Preview Box */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Pratinjau Teks WhatsApp:
              </label>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                Format WhatsApp (*Tebal*, _Miring_)
              </span>
            </div>
            <textarea
              readOnly
              rows={8}
              value={messageText}
              className="w-full bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl p-3 text-xs font-mono text-stone-800 leading-relaxed focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Teks</span>
              </>
            )}
          </button>

          <button
            onClick={handleOpenWA}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 transition shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Kirim via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
