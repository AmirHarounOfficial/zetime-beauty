import React, { useState } from 'react';
import { MobileContainer } from './components/MobileContainer';
import { TabType } from './components/Navigation';

import { Dashboard } from './components/Dashboard';
import { BookingsView } from './components/BookingsView';
import { QueueView } from './components/QueueView';
import { ServicesView } from './components/ServicesView';
import { ProfessionalsView } from './components/ProfessionalsView';
import { CrmView } from './components/CrmView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { OperatingHoursView } from './components/OperatingHoursView';
import { DeliveryFeeView } from './components/DeliveryFeeView';

import { NewBookingModal } from './components/Modals/NewBookingModal';
import { AddWalkinModal } from './components/Modals/AddWalkinModal';

import {
  mockBranches,
  mockMasterCatalog,
  mockBranchServices,
  mockProfessionals,
  mockBookings,
  mockQueueEntries,
  mockCustomers,
  mockNotifications,
  mockSubscriptionPlan
} from './mock/data';

import {
  ProviderRole,
  Branch,
  Booking,
  BookingStatus,
  QueueEntry,
  QueueStatus,
  BranchService,
  Professional,
  DaySchedule,
  HomeServiceDaySchedule,
  DeliveryFeeConfig,
  EmployeeScheduleConfig
} from './types/zetime';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [currentRole, setCurrentRole] = useState<ProviderRole>('BUSINESS_OWNER');
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [selectedBranch, setSelectedBranch] = useState<Branch>(mockBranches[0]);

  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [queue, setQueue] = useState<QueueEntry[]>(mockQueueEntries);
  const [branchServices, setBranchServices] = useState<BranchService[]>(mockBranchServices);
  const [professionals, setProfessionals] = useState<Professional[]>(mockProfessionals);
  const [customers] = useState(mockCustomers);
  const [notifications] = useState(mockNotifications);

  // Modals
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [isAddWalkinOpen, setIsAddWalkinOpen] = useState(false);

  // Handlers for Booking State Lifecycle
  const handleUpdateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const handleSaveProviderBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Handlers for Walk-In Queue
  const handleAddWalkin = (newQueueEntry: QueueEntry) => {
    setQueue((prev) => [...prev, newQueueEntry]);
  };

  const handleUpdateQueueStatus = (queueId: string, status: QueueStatus) => {
    setQueue((prev) =>
      prev.map((q) => (q.id === queueId ? { ...q, status } : q))
    );
  };

  const handleShiftQueuePosition = (queueId: string, direction: 'up' | 'down') => {
    setQueue((prev) => {
      const active = prev.filter((q) => q.status === 'WAITING' || q.status === 'CALLED');
      const idx = active.findIndex((q) => q.id === queueId);
      if (idx === -1) return prev;
      if (direction === 'up' && idx === 0) return prev;
      if (direction === 'down' && idx === active.length - 1) return prev;

      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      const newActive = [...active];
      const temp = newActive[idx];
      newActive[idx] = newActive[targetIdx];
      newActive[targetIdx] = temp;

      return newActive;
    });
  };

  // Service Pricing Updates
  const handleUpdateServicePrice = (serviceId: string, newPrice: number) => {
    setBranchServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, price: newPrice } : s))
    );
  };

  const handleToggleHomeService = (serviceId: string) => {
    setBranchServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? {
              ...s,
              isHomeServiceAvailable: !s.isHomeServiceAvailable,
              homeServicePrice: !s.isHomeServiceAvailable ? s.price + 70 : undefined
            }
          : s
      )
    );
  };

  // Staff Transfers, Shifts & Eligibility
  const handleTransferBranch = (profId: string, targetBranchId: string, targetBranchName: string) => {
    setProfessionals((prev) =>
      prev.map((p) =>
        p.id === profId
          ? { ...p, branchId: targetBranchId, branchName: targetBranchName }
          : p
      )
    );
  };

  const handleToggleHomeEligibility = (profId: string) => {
    setProfessionals((prev) =>
      prev.map((p) =>
        p.id === profId ? { ...p, isHomeServiceEligible: !p.isHomeServiceEligible } : p
      )
    );
  };

  const handleUpdateProfessionalSchedule = (
    profId: string,
    scheduleConfig: EmployeeScheduleConfig
  ) => {
    setProfessionals((prev) =>
      prev.map((p) =>
        p.id === profId
          ? {
              ...p,
              scheduleConfig,
              workingSchedule: `${scheduleConfig.startTime} - ${scheduleConfig.endTime} (${scheduleConfig.shiftLabel})`,
              isHomeServiceEligible: scheduleConfig.allowsHomeService
            }
          : p
      )
    );
  };

  // Branch Operating Hours & Delivery Fees Handlers
  const handleUpdateBranchSchedule = (
    branchId: string,
    operatingSchedule: DaySchedule[],
    homeServiceSchedule: HomeServiceDaySchedule[]
  ) => {
    setBranches((prev) =>
      prev.map((b) =>
        b.id === branchId
          ? { ...b, operatingSchedule, homeServiceSchedule }
          : b
      )
    );
    if (selectedBranch.id === branchId) {
      setSelectedBranch((prev) => ({
        ...prev,
        operatingSchedule,
        homeServiceSchedule
      }));
    }
  };

  const handleUpdateDeliveryConfig = (
    branchId: string,
    deliveryFeeConfig: DeliveryFeeConfig
  ) => {
    setBranches((prev) =>
      prev.map((b) =>
        b.id === branchId
          ? { ...b, deliveryFeeConfig }
          : b
      )
    );
    if (selectedBranch.id === branchId) {
      setSelectedBranch((prev) => ({
        ...prev,
        deliveryFeeConfig
      }));
    }
  };

  const pendingCount = bookings.filter((b) => b.status === 'PENDING_CONFIRMATION').length;
  const queueCount = queue.filter((q) => q.status === 'WAITING').length;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <MobileContainer
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      selectedBranch={selectedBranch}
      currentRole={currentRole}
      pendingCount={pendingCount}
      queueCount={queueCount}
      unreadNotificationCount={unreadCount}
    >
      {activeTab === 'dashboard' && (
        <Dashboard
          bookings={bookings}
          queue={queue}
          notifications={notifications}
          selectedBranch={selectedBranch}
          currentRole={currentRole}
          onOpenNewBookingModal={() => setIsNewBookingOpen(true)}
          onOpenAddWalkinModal={() => setIsAddWalkinOpen(true)}
          onAcceptBooking={(id) => handleUpdateBookingStatus(id, 'CONFIRMED')}
          onRejectBooking={(id) => handleUpdateBookingStatus(id, 'REJECTED')}
          onNavigateToTab={setActiveTab}
        />
      )}

      {activeTab === 'bookings' && (
        <BookingsView
          bookings={bookings}
          currentRole={currentRole}
          onUpdateStatus={handleUpdateBookingStatus}
          onOpenNewBookingModal={() => setIsNewBookingOpen(true)}
        />
      )}

      {activeTab === 'queue' && (
        <QueueView
          queue={queue}
          onOpenAddWalkinModal={() => setIsAddWalkinOpen(true)}
          onUpdateQueueStatus={handleUpdateQueueStatus}
          onShiftPosition={handleShiftQueuePosition}
        />
      )}

      {activeTab === 'services' && (
        <ServicesView
          branchServices={branchServices}
          masterCatalog={mockMasterCatalog}
          currentRole={currentRole}
          onUpdateServicePrice={handleUpdateServicePrice}
          onToggleHomeService={handleToggleHomeService}
        />
      )}

      {activeTab === 'professionals' && (
        <ProfessionalsView
          professionals={professionals}
          branches={branches}
          currentRole={currentRole}
          onTransferBranch={handleTransferBranch}
          onToggleHomeEligibility={handleToggleHomeEligibility}
          onUpdateSchedule={handleUpdateProfessionalSchedule}
          onBackToSettings={() => setActiveTab('settings')}
        />
      )}

      {activeTab === 'crm' && (
        <CrmView
          customers={customers}
          onBackToSettings={() => setActiveTab('settings')}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsView
          bookings={bookings}
          currentRole={currentRole}
          onBackToSettings={() => setActiveTab('settings')}
        />
      )}

      {activeTab === 'operating-hours' && (
        <OperatingHoursView
          selectedBranch={selectedBranch}
          onUpdateBranchSchedule={handleUpdateBranchSchedule}
          onBackToSettings={() => setActiveTab('settings')}
        />
      )}

      {activeTab === 'delivery-fees' && (
        <DeliveryFeeView
          selectedBranch={selectedBranch}
          onUpdateDeliveryConfig={handleUpdateDeliveryConfig}
          onBackToSettings={() => setActiveTab('settings')}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsView
          subscription={mockSubscriptionPlan}
          currentRole={currentRole}
          onSelectRole={setCurrentRole}
          selectedBranch={selectedBranch}
          branches={branches}
          onSelectBranch={setSelectedBranch}
          onNavigateToSubTab={setActiveTab}
        />
      )}

      {/* Modals */}
      <NewBookingModal
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        onSave={handleSaveProviderBooking}
        services={branchServices}
        professionals={professionals}
        customers={customers}
        branchId={selectedBranch.id}
        branchName={selectedBranch.name}
        deliveryFeeConfig={selectedBranch.deliveryFeeConfig}
      />

      <AddWalkinModal
        isOpen={isAddWalkinOpen}
        onClose={() => setIsAddWalkinOpen(false)}
        onAdd={handleAddWalkin}
        services={branchServices}
        professionals={professionals}
        branchId={selectedBranch.id}
        currentQueueLength={queueCount}
      />
    </MobileContainer>
  );
}
