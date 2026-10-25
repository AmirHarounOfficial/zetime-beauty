import React from 'react';
import { TabType, Navigation } from './Navigation';
import { Branch, ProviderRole } from '../types/zetime';
import { Bell, ArrowRight, Shield, Sparkles, Building, Scissors, Users, Car, Wifi, Battery } from 'lucide-react';

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
  // تفاصيل الترويسة حسب الدور الإداري باللغة العربية
  const getRoleHeaderInfo = () => {
    switch (currentRole) {
      case 'BUSINESS_OWNER':
        return {
          initials: 'مالك',
          icon: <Building size={16} />,
          title: selectedBranch.name,
          subtitle: 'إشراف عام • كافة الأنظمة نشطة'
        };
      case 'BRANCH_MANAGER':
        return {
          initials: 'مدير',
          icon: <Shield size={16} />,
          title: selectedBranch.name,
          subtitle: 'إدارة العمليات اليومية للفرع'
        };
      case 'BRANCH_STAFF':
        return {
          initials: 'استقبال',
          icon: <Users size={16} />,
          title: 'الاستقبال وقائمة الانتظار',
          subtitle: `${selectedBranch.name} • صالة الاستقبال`
        };
      case 'PROFESSIONAL':
        return {
          initials: 'سارة',
          icon: <Scissors size={16} />,
          title: 'سارة السيد',
          subtitle: 'كبيرة مصففي الشعر • محطة #2'
        };
      case 'FREELANCER':
        return {
          initials: 'سارة',
          icon: <Car size={16} />,
          title: 'سارة الرشيد',
          subtitle: 'أخصائية خدمات تجميل منزلية متنقلة'
        };
      default:
        return {
          initials: 'زيتيم',
          icon: <Sparkles size={16} />,
          title: selectedBranch.name,
          subtitle: 'الفرع النشط'
        };
    }
  };

  const roleInfo = getRoleHeaderInfo();
  const isSubView = [
    'professionals',
    'crm',
    'analytics',
    'operating-hours',
    'delivery-fees',
    'business-branches'
  ].includes(activeTab);

  const getSubViewTitle = () => {
    switch (activeTab) {
      case 'professionals':
        return { title: 'طاقم العمل والمناوبات', subtitle: 'المناوبات، الفروع، والخدمة المنزلية' };
      case 'crm':
        return { title: 'إدارة علاقات العملاء CRM', subtitle: 'الملفات التجميلية، الحساسية، والإنفاق' };
      case 'analytics':
        return { title: 'التقارير والأداء المالي', subtitle: 'إحصائيات الإيرادات والمؤشرات التشغيلية' };
      case 'operating-hours':
        return { title: 'أوقات العمل والدوام', subtitle: 'ساعات الصالون والخدمة المنزلية' };
      case 'delivery-fees':
        return { title: 'رسوم التوصيل المنزلي', subtitle: 'حاسبة وتكلفة الخدمة الخارجية' };
      case 'business-branches':
        return { title: 'الملف التجاري وفروع المنشأة', subtitle: 'بيانات السجل التجاري وإدارة الفروع' };
      default:
        return { title: '', subtitle: '' };
    }
  };

  return (
    <div className="app-viewport">
      {/* Mobile Top Status Bar for Authentic Mobile Experience */}
      <div className="mobile-status-bar">
        <span>09:41</span>
        <div className="status-bar-notch" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Wifi size={12} />
          <Battery size={13} />
        </div>
      </div>

      {/* Refined Native Top App Header */}
      <div className="app-header">
        {isSubView ? (
          <>
            <div className="top-bar-left">
              <button
                onClick={() => setActiveTab('settings')}
                className="header-back-btn"
                title="الرجوع للإعدادات"
              >
                <ArrowRight size={15} />
                <span>رجوع</span>
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
                title="الإعدادات"
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
                    <div className="top-bar-title">جدول المواعيد والحجوزات</div>
                    <div className="top-bar-subtitle">مواعيد اليوم وطلبات الحجز الجديدة</div>
                  </>
                )}
                {activeTab === 'queue' && (
                  <>
                    <div className="top-bar-title">قائمة الانتظار الفورية</div>
                    <div className="top-bar-subtitle">{queueCount} عملاء بانتظار الخدمة حالياً</div>
                  </>
                )}
                {activeTab === 'services' && (
                  <>
                    <div className="top-bar-title">دليل خدمات الفرع</div>
                    <div className="top-bar-subtitle">الباقات، الأسعار، ومدد الجلسات</div>
                  </>
                )}
                {activeTab === 'settings' && (
                  <>
                    <div className="top-bar-title">الإعدادات والملف التعريفي</div>
                    <div className="top-bar-subtitle">الأدوار، الفروع، والخيارات التشغيلية</div>
                  </>
                )}
              </div>
            </div>

            <div className="top-bar-actions">
              <button
                onClick={() => setActiveTab('settings')}
                className="icon-action-btn"
                title="الإشعارات"
              >
                <Bell size={16} />
                {unreadNotificationCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      width: '7px',
                      height: '7px',
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
