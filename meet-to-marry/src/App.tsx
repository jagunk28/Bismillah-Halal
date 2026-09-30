import React, { useState } from 'react';
import {
  initialCoupleInfo,
  initialPartnerSyncSettings,
  initialRundownItems,
  initialVendors,
  initialBudget,
  initialGuests,
  initialChecklist,
  initialEmergencyContacts,
  initialRisks,
  initialExpenses,
  initialNotes,
} from './data/mockWeddingData';
import {
  CoupleInfo,
  PartnerSyncSettings,
  RundownItem,
  VendorItem,
  BudgetItem,
  GuestItem,
  ChecklistItem,
  ExpenseItem,
  NoteItem,
} from './types/wedding';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { SettingsSyncView } from './components/SettingsSyncView';
import { DashboardView } from './components/DashboardView';
import { RundownView } from './components/RundownView';
import { VendorsView } from './components/VendorsView';
import { GuestsView } from './components/GuestsView';
import { BudgetView } from './components/BudgetView';
import { ChecklistView } from './components/ChecklistView';
import { EmergencyHubView } from './components/EmergencyHubView';
import { QuickEntryModal } from './components/QuickEntryModal';
import { QRScannerModal } from './components/modals/QRScannerModal';
import { BroadcastWAModal } from './components/modals/BroadcastWAModal';
import { PrintRundownModal } from './components/modals/PrintRundownModal';
import { AddRundownModal } from './components/modals/AddRundownModal';
import { AddVendorModal } from './components/modals/AddVendorModal';
import { AddGuestModal } from './components/modals/AddGuestModal';
import { AddChecklistModal } from './components/modals/AddChecklistModal';
import { AddBudgetModal } from './components/modals/AddBudgetModal';

export default function App() {
  const [coupleInfo, setCoupleInfo] = useState<CoupleInfo>(initialCoupleInfo);
  const [syncSettings, setSyncSettings] = useState<PartnerSyncSettings>(initialPartnerSyncSettings);
  const [rundownItems, setRundownItems] = useState<RundownItem[]>(initialRundownItems);
  const [vendors, setVendors] = useState<VendorItem[]>(initialVendors);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(initialBudget);
  const [guests, setGuests] = useState<GuestItem[]>(initialGuests);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses || []);
  const [notes, setNotes] = useState<NoteItem[]>(initialNotes || []);
  const [emergencyContacts] = useState(initialEmergencyContacts);
  const [risks] = useState(initialRisks);

  // Path navigasi aktif - default ke 'pengaturan-sync'
  const [activePath, setActivePath] = useState<string>('pengaturan-sync');
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Modals state
  const [isQuickEntryOpen, setIsQuickEntryOpen] = useState<boolean>(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState<boolean>(false);
  const [broadcastPrefilledItem, setBroadcastPrefilledItem] = useState<RundownItem | null>(null);

  const [isAddRundownOpen, setIsAddRundownOpen] = useState<boolean>(false);
  const [isAddVendorOpen, setIsAddVendorOpen] = useState<boolean>(false);
  const [isAddGuestOpen, setIsAddGuestOpen] = useState<boolean>(false);
  const [isAddChecklistOpen, setIsAddChecklistOpen] = useState<boolean>(false);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState<boolean>(false);

  // Days remaining calculation
  const weddingDate = new Date(coupleInfo.weddingDate);
  const today = new Date();
  const diffTime = weddingDate.getTime() - today.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Handlers
  const handleUpdateRundownStatus = (id: string, status: RundownItem['status']) => {
    setRundownItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleAddRundownItem = (item: RundownItem) => {
    setRundownItems((prev) => [...prev, item]);
  };

  const handleShareItemWA = (item: RundownItem) => {
    setBroadcastPrefilledItem(item);
    setIsBroadcastModalOpen(true);
  };

  const handleUpdateVendorStatus = (id: string, status: VendorItem['status']) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
  };

  const handleAddVendor = (vendor: VendorItem) => {
    setVendors((prev) => [vendor, ...prev]);
  };

  const handleToggleCheckIn = (id: string) => {
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const newChecked = !g.checkedIn;
          return {
            ...g,
            checkedIn: newChecked,
            checkedInTime: newChecked
              ? new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
              : undefined,
          };
        }
        return g;
      })
    );
  };

  const handleCheckInGuestById = (id: string) => {
    setGuests((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              checkedIn: true,
              checkedInTime: new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              }),
            }
          : g
      )
    );
  };

  const handleAddGuest = (guest: GuestItem) => {
    setGuests((prev) => [guest, ...prev]);
  };

  const handleToggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const handleAddChecklist = (item: ChecklistItem) => {
    setChecklist((prev) => [item, ...prev]);
  };

  const handleAddBudgetItem = (item: BudgetItem) => {
    setBudgetItems((prev) => [...prev, item]);
  };

  const handleAddExpense = (expense: ExpenseItem) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleAddNote = (note: NoteItem) => {
    setNotes((prev) => [note, ...prev]);
  };

  const handleExportExcel = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Nama Tamu,Pax,Kategori,Status RSVP,Meja,No HP', ...guests.map((g) => `"${g.name}",${g.pax},"${g.category}","${g.rsvpStatus}","${g.tableNumber}","${g.phone}"`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Tamu_${coupleInfo.brideName}_${coupleInfo.groomName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-[#1a1c1b] font-body flex">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <Sidebar
          activePath={activePath}
          setActivePath={(path) => {
            setActivePath(path);
            setMobileMenuOpen(false);
          }}
          coupleInfo={coupleInfo}
          daysRemaining={daysRemaining}
        />
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader
          activePath={activePath}
          coupleInfo={coupleInfo}
          onOpenQuickEntry={() => setIsQuickEntryOpen(true)}
          onNavigate={setActivePath}
        />

        {/* Mobile Header Bar with Hamburger */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#f4f4f2] border-b border-[#c2c8c2]/50 sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl text-[#042217] hover:bg-[#e8e8e6] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold font-display text-[#042217]">Meet to Marry</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#bbeed2] text-[#002114] font-semibold">Sinkron</span>
          </div>

          <button
            onClick={() => setIsQuickEntryOpen(true)}
            className="w-8 h-8 rounded-full bg-[#042217] text-white flex items-center justify-center shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>

        {/* Content Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* 1. Pengaturan & Sinkronisasi Pernikahan */}
          {(activePath === 'pengaturan-sync' || activePath === 'pengaturan-pasangan') && (
            <SettingsSyncView
              coupleInfo={coupleInfo}
              onUpdateCoupleInfo={setCoupleInfo}
              syncSettings={syncSettings}
              onUpdateSyncSettings={setSyncSettings}
              onExportPDF={() => setIsPrintModalOpen(true)}
              onExportExcel={handleExportExcel}
            />
          )}

          {/* 2. Ringkasan */}
          {activePath === 'ringkasan-overview' && (
            <DashboardView
              coupleInfo={coupleInfo}
              rundownItems={rundownItems}
              vendors={vendors}
              budgetItems={budgetItems}
              guests={guests}
              checklist={checklist}
              emergencyContacts={emergencyContacts}
              onNavigateTab={(tab) => {
                const map: Record<string, string> = {
                  rundown: 'rundown-hari-h',
                  vendors: 'vendor-kontrak',
                  guests: 'daftar-tamu-rsvp',
                  budget: 'tabungan-budgeting',
                  emergency: 'kontak-darurat',
                };
                setActivePath(map[tab] || 'ringkasan-overview');
              }}
              onToggleChecklist={handleToggleChecklist}
              onOpenChecklistModal={() => setIsAddChecklistOpen(true)}
            />
          )}

          {/* 3. Tabungan & Budgeting */}
          {activePath === 'tabungan-budgeting' && (
            <BudgetView
              budgetItems={budgetItems}
              totalBudgetLimit={coupleInfo.totalBudgetLimit}
              onAddNewBudgetItem={() => setIsAddBudgetOpen(true)}
            />
          )}

          {/* 4. Checklist Tugas */}
          {activePath === 'checklist-tugas' && (
            <ChecklistView
              checklist={checklist}
              onToggleChecklist={handleToggleChecklist}
              onAddChecklist={handleAddChecklist}
            />
          )}

          {/* 5. Daftar Tamu & RSVP */}
          {(activePath === 'daftar-tamu-rsvp' || activePath === 'daftar-tamu') && (
            <GuestsView
              guests={guests}
              onToggleCheckIn={handleToggleCheckIn}
              onAddNewGuest={() => setIsAddGuestOpen(true)}
              onOpenQRScanner={() => setIsQRScannerOpen(true)}
            />
          )}

          {/* 6. Susunan Acara / Rundown Hari-H */}
          {activePath === 'rundown-hari-h' && (
            <RundownView
              rundownItems={rundownItems}
              isLiveMode={isLiveMode}
              onUpdateStatus={handleUpdateRundownStatus}
              onAddNewItem={() => setIsAddRundownOpen(true)}
              onShareItemWA={handleShareItemWA}
            />
          )}

          {/* 7. Vendor & Kontrak */}
          {activePath === 'vendor-kontrak' && (
            <VendorsView
              vendors={vendors}
              onAddNewVendor={() => setIsAddVendorOpen(true)}
              onUpdateVendorStatus={handleUpdateVendorStatus}
            />
          )}

          {/* 8. Kontak Darurat & PIC */}
          {activePath === 'kontak-darurat' && (
            <EmergencyHubView
              emergencyContacts={emergencyContacts}
              risks={risks}
              onOpenBroadcastModal={() => {
                setBroadcastPrefilledItem(null);
                setIsBroadcastModalOpen(true);
              }}
            />
          )}
        </main>
      </div>

      {/* Quick Entry Modal (+ Catatan / Pengeluaran) */}
      <QuickEntryModal
        isOpen={isQuickEntryOpen}
        onClose={() => setIsQuickEntryOpen(false)}
        onAddExpense={handleAddExpense}
        onAddNote={handleAddNote}
        budgetItems={budgetItems}
        totalBudgetLimit={coupleInfo.totalBudgetLimit}
      />

      {/* Day-Of Reception QR Scanner Modal */}
      <QRScannerModal
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        guests={guests}
        onCheckInGuest={handleCheckInGuestById}
      />

      {/* WhatsApp Broadcast Rundown Generator Modal */}
      <BroadcastWAModal
        isOpen={isBroadcastModalOpen}
        onClose={() => {
          setIsBroadcastModalOpen(false);
          setBroadcastPrefilledItem(null);
        }}
        coupleInfo={coupleInfo}
        rundownItems={rundownItems}
        prefilledItem={broadcastPrefilledItem}
      />

      {/* A4 Printable Official Rundown Modal */}
      <PrintRundownModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        coupleInfo={coupleInfo}
        rundownItems={rundownItems}
        emergencyContacts={emergencyContacts}
      />

      {/* Add Item Modals */}
      <AddRundownModal
        isOpen={isAddRundownOpen}
        onClose={() => setIsAddRundownOpen(false)}
        onAdd={handleAddRundownItem}
      />

      <AddVendorModal
        isOpen={isAddVendorOpen}
        onClose={() => setIsAddVendorOpen(false)}
        onAdd={handleAddVendor}
      />

      <AddGuestModal
        isOpen={isAddGuestOpen}
        onClose={() => setIsAddGuestOpen(false)}
        onAdd={handleAddGuest}
      />

      <AddChecklistModal
        isOpen={isAddChecklistOpen}
        onClose={() => setIsAddChecklistOpen(false)}
        onAdd={handleAddChecklist}
      />

      <AddBudgetModal
        isOpen={isAddBudgetOpen}
        onClose={() => setIsAddBudgetOpen(false)}
        onAdd={handleAddBudgetItem}
      />
    </div>
  );
}
