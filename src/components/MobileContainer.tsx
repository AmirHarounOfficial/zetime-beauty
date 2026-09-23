import React from 'react';
import { TabType, Navigation } from './Navigation';
import { Branch, ProviderRole } from '../types/zetime';
import { Bell, ArrowLeft, Shield, Sparkles, Building, Scissors, Users, Car } from 'lucide-react';

interface MobileContainerProps {
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedBranch: Branch;
  currentRole: ProviderRole;
  pendingCount: number;
  queueCount: number;
  unreadNotificationCount: number;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({
  children,
  activeTab,
  setActiveTab,
  selectedBranch,
  currentRole,
  pendingCount,
  queueCount,
  unreadNotificationCount
}) => {
  // Compute role-based presentation details for the top bar
  const getRoleHeaderInfo = () => {
    switch (currentRole) {
      case 'BUSINESS_OWNER':
        return {
          initials: 'DF',
          icon: <Building size={16} />,
          title: selectedBranch.name,
          subtitle: 'Salon Hub • All Systems Active'
        };
      case 'BRANCH_MANAGER':
        return {
          initials: 'BM',
          icon: <Shield size={16} />,
          title: selectedBranch.name,
          subtitle: 'Branch Floor • Manager View'
        };
      case 'BRANCH_STAFF':
        return {
          initials: 'FD',
          icon: <Users size={16} />,
          title: 'Front Desk & Queue',
          subtitle: `${selectedBranch.name} • Reception`
        };
      case 'PROFESSIONAL':
        return {
          initials: 'LA',
          icon: <Scissors size={16} />,
          title: 'Lina Al-Harthi',
          subtitle: 'Senior Stylist • Station #2'
        };
      case 'FREELANCER':
        return {
          initials: 'SA',
          icon: <Car size={16} />,
          title: 'Sarah Al-Rashid',
          subtitle: 'Mobile & Home Beauty Specialist'
        };
      default:
        return {
          initials: 'ZT',
          icon: <Sparkles size={16} />,
          title: selectedBranch.name,
          subtitle: 'Active Hub'
        };
    }
  };

  const roleInfo = getRoleHeaderInfo();
  const isSubView = ['professionals', 'crm', 'analytics'].includes(activeTab);

  const getSubViewTitle = () => {
    switch (activeTab) {
      case 'professionals':
        return { title: 'Staff & Team Roster', subtitle: 'Shifts, branch assignments & home service' };
      case 'crm':
        return { title: 'Customer CRM', subtitle: 'Beauty profiles, allergies & histories' };
      case 'analytics':
        return { title: 'Business Analytics', subtitle: 'Performance & revenue insights' };
      default:
        return { title: '', subtitle: '' };
    }
  };

  return (
    <div className="app-viewport">
      {/* Refined Native Top App Header */}
      <div className="app-header">
        {isSubView ? (
          <>
            <div className="top-bar-left">
              <button
                onClick={() => setActiveTab('settings')}
                className="header-back-btn"
                title="Back to Settings"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <div className="top-bar-titles">
                <div className="top-bar-title">{getSubViewTitle().title}</div>
                <div className="top-bar-subtitle">{getSubViewTitle().subtitle}</div>
              </div>
            </div>
            <div className="top-bar-actions">
              <button
                onClick={() => setActiveTab('settings')}
                className="icon-action-btn"
                title="Settings"
              >
                <Bell size={16} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="top-bar-left">
              <div className="top-bar-avatar">
                {roleInfo.initials}
                <span className="online-dot" />
              </div>
              <div className="top-bar-titles">
                {activeTab === 'dashboard' && (
                  <>
                    <div className="top-bar-title">{roleInfo.title}</div>
                    <div className="top-bar-subtitle">{roleInfo.subtitle}</div>
                  </>
                )}
                {activeTab === 'bookings' && (
                  <>
                    <div className="top-bar-title">Appointments</div>
                    <div className="top-bar-subtitle">Today's schedule & booking requests</div>
                  </>
                )}
                {activeTab === 'queue' && (
                  <>
                    <div className="top-bar-title">Live Walk-In Queue</div>
                    <div className="top-bar-subtitle">{queueCount} clients currently waiting</div>
                  </>
                )}
                {activeTab === 'services' && (
                  <>
                    <div className="top-bar-title">Service Catalog</div>
                    <div className="top-bar-subtitle">Treatments, durations & offerings</div>
                  </>
                )}
                {activeTab === 'settings' && (
                  <>
                    <div className="top-bar-title">Settings & Profile</div>
                    <div className="top-bar-subtitle">Roles, branches & operational tools</div>
                  </>
                )}
              </div>
            </div>

            <div className="top-bar-actions">
              <button
                onClick={() => setActiveTab('settings')}
                className="icon-action-btn"
                title="Notifications"
              >
                <Bell size={16} />
                {unreadNotificationCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '6px',
                      height: '6px',
                      background: 'var(--gold-primary)',
                      borderRadius: '50%'
                    }}
                  />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Scrollable Main Screen Content */}
      <div className="app-content">{children}</div>

      {/* Sticky Bottom Navigation (5 Core Tabs) */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingCount}
        queueCount={queueCount}
      />
    </div>
  );
};
