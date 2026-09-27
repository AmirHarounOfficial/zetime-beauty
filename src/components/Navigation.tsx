import React from 'react';
import { LayoutDashboard, CalendarDays, Users2, Scissors, Settings, LucideIcon } from 'lucide-react';

export type TabType = 'dashboard' | 'bookings' | 'queue' | 'services' | 'professionals' | 'crm' | 'analytics' | 'settings' | 'operating-hours' | 'delivery-fees';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  pendingCount: number;
  queueCount: number;
}

interface NavTabItem {
  id: TabType;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
  queueCount
}) => {
  // Exactly 5 elements for the bottom navigation bar
  const tabs: NavTabItem[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarDays, badge: pendingCount },
    { id: 'queue', label: 'Queue', icon: Users2, badge: queueCount },
    { id: 'services', label: 'Services', icon: Scissors },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        // If an activeTab is a sub-view housed under settings, highlight Settings tab
        const isSettingsSubView = ['settings', 'crm', 'analytics', 'professionals', 'operating-hours', 'delivery-fees'].includes(activeTab);
        const isActive = tab.id === 'settings' ? isSettingsSubView : activeTab === tab.id;
        const badgeValue = tab.badge || 0;

        return (
          <button
            key={tab.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="nav-icon-box">
              <Icon size={18} />
              {badgeValue > 0 && (
                <span className="nav-badge">{badgeValue}</span>
              )}
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
