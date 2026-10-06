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
import { BusinessBranchesView } from './components/BusinessBranchesView';

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
  mockSubscriptionPlan,
  mockBusinessProfile
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
  EmployeeScheduleConfig,
  BusinessProfile
} from './types/zetime';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [currentRole, setCurrentRole] = useState<ProviderRole>('BUSINESS_OWNER');
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(mockBusinessProfile);
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

  // Service Catalog Updates & Management
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

  const handleAddService = (newService: BranchService) => {
    setBranchServices((prev) => [newService, ...prev]);
  };

  const handleUpdateService = (updatedService: BranchService) => {
    setBranchServices((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
  };

  const handleDeleteService = (serviceId: string) => {
    setBranchServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  // Staff Management (Add, Edit, Shifts, Eligibility, Delete)
  const handleAddProfessional = (newProf: Professional) => {
    setProfessionals((prev) => [newProf, ...prev]);
  };

  const handleUpdateProfessional = (updatedProf: Professional) => {
    setProfessionals((prev) =>
      prev.map((p) => (p.id === updatedProf.id ? updatedProf : p))
    );
  };

  const handleDeleteProfessional = (profId: string) => {
    setProfessionals((prev) => prev.filter((p) => p.id !== profId));
  };

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

  // Business & Branch Management Handlers
  const handleUpdateBusinessProfile = (updated: BusinessProfile) => {
    setBusinessProfile(updated);
  };

  const handleAddBranch = (newBranch: Branch) => {
    setBranches((prev) => [...prev, newBranch]);
  };

  const handleUpdateBranch = (updatedBranch: Branch) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === updatedBranch.id ? updatedBranch : b))
    );
    if (selectedBranch.id === updatedBranch.id) {
      setSelectedBranch(updatedBranch);
    }
  };

  const handleSetBranchManager = (branchId: string, managerId: string, managerName: string) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === branchId ? { ...b, managerId, managerName } : b))
    );
    if (selectedBranch.id === branchId) {
      setSelectedBranch((prev) => ({ ...prev, managerId, managerName }));
    }
  };

  const handleDeleteBranch = (branchId: string) => {
    setBranches((prev) => {
      const remaining = prev.filter((b) => b.id !== branchId);
      if (selectedBranch.id === branchId && remaining.length > 0) {
        setSelectedBranch(remaining[0]);
      }
      return remaining;
    });
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
          onAddService={handleAddService}
          onUpdateService={handleUpdateService}
          onDeleteService={handleDeleteService}
        />
      )}

      {activeTab === 'professionals' && (
        <ProfessionalsView
          professionals={professionals}
          branches={branches}
          currentRole={currentRole}
          services={branchServices}
          onTransferBranch={handleTransferBranch}
          onToggleHomeEligibility={handleToggleHomeEligibility}
          onUpdateSchedule={handleUpdateProfessionalSchedule}
          onAddProfessional={handleAddProfessional}
          onUpdateProfessional={handleUpdateProfessional}
          onDeleteProfessional={handleDeleteProfessional}
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

      {activeTab === 'business-branches' && (
        <BusinessBranchesView
          businessProfile={businessProfile}
          branches={branches}
          professionals={professionals}
          subscription={mockSubscriptionPlan}
          currentRole={currentRole}
          selectedBranch={selectedBranch}
          onSelectBranch={setSelectedBranch}
          onUpdateBusinessProfile={handleUpdateBusinessProfile}
          onAddBranch={handleAddBranch}
          onUpdateBranch={handleUpdateBranch}
          onSetBranchManager={handleSetBranchManager}
          onDeleteBranch={handleDeleteBranch}
          onBackToSettings={() => setActiveTab('settings')}
          onNavigateToSubTab={setActiveTab}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsView
          subscription={mockSubscriptionPlan}
          currentRole={currentRole}
          onSelectRole={setCurrentRole}
          selectedBranch={selectedBranch}
          branches={branches}
          professionals={professionals}
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
