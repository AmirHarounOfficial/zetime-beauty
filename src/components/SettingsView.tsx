import React, { useState } from 'react';
import { SubscriptionPlan, ProviderRole, Branch, Professional } from '../types/zetime';
import { hasPermission } from '../utils/permissions';
import { TabType } from './Navigation';
import {
  ShieldCheck,
  Crown,
  Users,
  BarChart3,
  UserCheck,
  ChevronLeft,
  ToggleLeft,
  ToggleRight,
  Building2,
  Lock,
  Check,
  Scissors,
  Car,
  Shield,
  Building,
  AlertCircle,
  Clock,
  Truck
} from 'lucide-react';

interface SettingsViewProps {
  subscription: SubscriptionPlan;
  currentRole: ProviderRole;
  onSelectRole: (role: ProviderRole) => void;
  selectedBranch: Branch;
  branches: Branch[];
  professionals?: Professional[];
  onSelectBranch: (branch: Branch) => void;
  onNavigateToSubTab: (tab: TabType) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  subscription,
  currentRole,
  onSelectRole,
  selectedBranch,
  branches,
  professionals = [],
  onSelectBranch,
  onNavigateToSubTab
}) => {
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [emergencyClose, setEmergencyClose] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [permissionAlert, setPermissionAlert] = useState<string | null>(null);

  const canManageSub = hasPermission(currentRole, 'MANAGE_SUBSCRIPTION');
  const canViewAnalytics = hasPermission(currentRole, 'VIEW_ANALYTICS');
  const canManageStaff = hasPermission(currentRole, 'MANAGE_STAFF');
  const canSwitchBranches = hasPermission(currentRole, 'SWITCH_BRANCHES');

  const availableRoles: {
    role: ProviderRole;
    title: string;
    icon: React.ReactNode;
    desc: string;
    permissionsSummary: string;
  }[] = [
    {
      role: 'BUSINESS_OWNER',
      title: 'مالك المنشأة',
      icon: <Crown size={18} color="var(--gold-primary)" />,
      desc: 'إدارة شاملة للمنشأة، صلاحيات كافة الفروع، التقارير المالية، ونقل الموظفين',
      permissionsSummary: 'صلاحيات كاملة • وصول غير مقيد'
    },
    {
      role: 'BRANCH_MANAGER',
      title: 'مدير الفرع',
      icon: <Building size={18} color="#2563eb" />,
      desc: 'إدارة عمليات الفرع المسند، مناوبات الطاقم اليومية، وإحصائيات أداء الفرع',
      permissionsSummary: 'عمليات الفرع والمناوبات'
    },
    {
      role: 'BRANCH_STAFF',
      title: 'موظف الاستقبال (الكاونتر)',
      icon: <Users size={18} color="#7c3aed" />,
      desc: 'تسجيل وصول الضيوف، إدارة قائمة الانتظار الحية. محجوب عن البيانات المالية والتسعير',
      permissionsSummary: 'حضور وانتظار فقط'
    },
    {
      role: 'PROFESSIONAL',
      title: 'أخصائية التجميل والتصفيف',
      icon: <Scissors size={18} color="#d97706" />,
      desc: 'محطة الخدمة الخاصة، العميلات المسندات، جدول الجلسات، والعمولات والإكراميات',
      permissionsSummary: 'الكرسي والعميلات المسندات'
    },
    {
      role: 'FREELANCER',
      title: 'أخصائية مستقلة (خدمات خارجية)',
      icon: <Car size={18} color="#16a34a" />,
      desc: 'مقدمة خدمة مستقلة: مواعيد تجميل منزلية، ملاحة GPS، وتسوية أرباح مباشرة',
      permissionsSummary: 'خدمة منزلية مستقلة و GPS'
    }
  ];

  const handleToolClick = (tool: 'crm' | 'analytics' | 'professionals' | 'operating-hours' | 'delivery-fees' | 'business-branches') => {
    if (tool === 'business-branches') {
      if (!canManageStaff && !canManageSub) {
        setPermissionAlert(
          'تنبيه الصلاحية: إدارة شبكة الفروع وتعيين المدراء تتطلب صلاحيات مالك المنشأة أو مدير الفرع.'
        );
        return;
      }
      onNavigateToSubTab('business-branches');
    } else if (tool === 'analytics') {
      if (!canViewAnalytics) {
        setPermissionAlert(
          'تنبيه الصلاحية: التقارير المالية وحجم الإيرادات مقتصرة على مالك النشاط والمدراء فقط.'
        );
        return;
      }
      onNavigateToSubTab('analytics');
    } else if (tool === 'professionals') {
      if (!canManageStaff) {
        setPermissionAlert(
          'تنبيه الصلاحية: إدارة طاقم العمل ومناوبات الدوام مقتصرة على الإدارة والمدراء.'
        );
        return;
      }
      onNavigateToSubTab('professionals');
    } else if (tool === 'operating-hours') {
      onNavigateToSubTab('operating-hours');
    } else if (tool === 'delivery-fees') {
      onNavigateToSubTab('delivery-fees');
    } else {
      onNavigateToSubTab('crm');
    }
  };

  return (
    <div style={{ padding: '13px' }}>
      {/* قسم تبديل الدور الإداري */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            تبديل الدور والملف التعريفي
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-gold)', fontWeight: 800 }}>
            مصفوفة الصلاحيات الفعالة
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {availableRoles.map((r) => {
            const isSelected = r.role === currentRole;
            return (
              <div
                key={r.role}
                onClick={() => {
                  onSelectRole(r.role);
                  setPermissionAlert(null);
                }}
                className={`role-option-card ${isSelected ? 'selected' : ''}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ marginTop: '2px' }}>{r.icon}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{r.title}</span>
                        {isSelected && (
                          <span
                            style={{
                              background: 'var(--gold-gradient)',
                              color: '#000',
                              fontSize: '9px',
                              fontWeight: 800,
                              padding: '2px 6px',
                              borderRadius: '4px'
                            }}
                          >
                            نشط
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.35 }}>
                        {r.desc}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-gold)', fontWeight: 700, marginTop: '4px' }}>
                        ⚡ {r.permissionsSummary}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check size={18} color="var(--gold-dark)" style={{ flexShrink: 0 }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* موقع الفرع النشط */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
          موقع الصالون / الفرع المسند
        </div>

        {currentRole === 'FREELANCER' ? (
          <div className="gold-card" style={{ padding: '12px', background: '#f0fdf4', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a' }}>
              <Car size={16} />
              <span style={{ fontWeight: 800, fontSize: '13px' }}>أخصائية تجميل منزلية مستقلة</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              خدمات تجميل وعناية منزلية متنقلة في مدينة الرياض. لا يتطلب التواجد في فرع محدد.
            </div>
          </div>
        ) : (
          <div
            onClick={() => canSwitchBranches && setIsBranchModalOpen(true)}
            className="gold-card"
            style={{
              padding: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: canSwitchBranches ? 'pointer' : 'default',
              marginBottom: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={16} color="var(--text-gold)" />
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)' }}>
                  {selectedBranch.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {selectedBranch.address}
                </div>
              </div>
            </div>
            {canSwitchBranches ? (
              <span style={{ fontSize: '11px', color: 'var(--text-gold)', fontWeight: 800 }}>
                تبديل ▾
              </span>
            ) : (
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                مسند
              </span>
            )}
          </div>
        )}
      </div>

      {/* صندوق تنبيه حظر الصلاحيات */}
      {permissionAlert && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '10px',
            padding: '12px',
            marginBottom: '14px',
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start'
          }}
        >
          <AlertCircle size={16} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: 800 }}>تم تقييد الوصول</div>
            <div style={{ fontSize: '11px', color: '#991b1b', marginTop: '2px', lineHeight: 1.35 }}>
              {permissionAlert}
            </div>
          </div>
          <button
            onClick={() => setPermissionAlert(null)}
            style={{ background: 'none', border: 'none', color: '#991b1b', cursor: 'pointer', fontWeight: 800, fontSize: '12px' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* أدوات الإدارة والتشغيل */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
          أدوات إدارة المنشأة
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* الملف التجاري وفروع المنشأة */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleToolClick('business-branches')}
            className="gold-card settings-tool-card"
            style={{ border: '1.5px solid var(--border-gold)', background: 'linear-gradient(180deg, #ffffff 0%, #fdfcf7 100%)' }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                className="icon-avatar-badge"
                style={{
                  background: 'rgba(212, 175, 55, 0.2)',
                  color: 'var(--text-gold)'
                }}
              >
                <Building2 size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>الملف التجاري وفروع المنشأة</span>
                  <span
                    style={{
                      background: 'var(--gold-gradient)',
                      color: '#000',
                      fontSize: '8px',
                      fontWeight: 800,
                      padding: '1px 5px',
                      borderRadius: '4px'
                    }}
                  >
                    شامل
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {branches.length} فروع • تعيين المدراء • السجل التجاري والضريبة
                </div>
              </div>
            </div>
            <ChevronLeft size={16} color="var(--text-gold)" />
          </div>

          {/* إدارة العملاء CRM */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleToolClick('crm')}
            className="gold-card settings-tool-card"
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                className="icon-avatar-badge"
                style={{
                  background: 'rgba(212, 175, 55, 0.15)',
                  color: 'var(--text-gold)'
                }}
              >
                <UserCheck size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)' }}>
                  إدارة علاقات العملاء CRM
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  سجل الحساسيات، التفضيلات التجميلية، والإنفاق
                </div>
              </div>
            </div>
            <ChevronLeft size={16} color="var(--text-muted)" />
          </div>

          {/* التقارير والتحليلات */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleToolClick('analytics')}
            className="gold-card settings-tool-card"
            style={{ opacity: canViewAnalytics ? 1 : 0.8 }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                className="icon-avatar-badge"
                style={{
                  background: canViewAnalytics ? 'rgba(37, 99, 235, 0.12)' : '#f1f5f9',
                  color: canViewAnalytics ? '#2563eb' : 'var(--text-muted)'
                }}
              >
                <BarChart3 size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>التقارير والأداء المالي</span>
                  {!canViewAnalytics && (
                    <span className="permission-locked-badge">
                      <Lock size={10} /> مقفل
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {canViewAnalytics
                    ? 'إحصائيات الإيرادات، الأكثر طلباً، ومعدلات الإنجاز'
                    : 'يتطلب صلاحيات مالك المنشأة أو مدير الفرع'}
                </div>
              </div>
            </div>
            {canViewAnalytics ? (
              <ChevronLeft size={16} color="var(--text-muted)" />
            ) : (
              <Lock size={14} color="#dc2626" />
            )}
          </div>

          {/* طاقم العمل والمناوبات */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleToolClick('professionals')}
            className="gold-card settings-tool-card"
            style={{ opacity: canManageStaff ? 1 : 0.8 }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                className="icon-avatar-badge"
                style={{
                  background: canManageStaff ? 'rgba(124, 58, 237, 0.12)' : '#f1f5f9',
                  color: canManageStaff ? '#7c3aed' : 'var(--text-muted)'
                }}
              >
                <Users size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>طاقم العمل وجداول المناوبات</span>
                  {!canManageStaff && (
                    <span className="permission-locked-badge">
                      <Lock size={10} /> مقفل
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {canManageStaff
                    ? 'المناوبات الصباحية والمسائية، أيام العمل، والأهلية الخارجية'
                    : 'يتطلب صلاحيات مالك المنشأة أو مدير الفرع'}
                </div>
              </div>
            </div>
            {canManageStaff ? (
              <ChevronLeft size={16} color="var(--text-muted)" />
            ) : (
              <Lock size={14} color="#dc2626" />
            )}
          </div>

          {/* أوقات العمل وساعات الصالون والمنزل */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleToolClick('operating-hours')}
            className="gold-card settings-tool-card"
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                className="icon-avatar-badge"
                style={{
                  background: 'rgba(212, 175, 55, 0.15)',
                  color: 'var(--text-gold)'
                }}
              >
                <Clock size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)' }}>
                  أوقات العمل (الصالون والخدمة المنزلية)
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  جدول الافتتاح الأسبوعي وفترات إتاحة الخدمات الخارجية
                </div>
              </div>
            </div>
            <ChevronLeft size={16} color="var(--text-muted)" />
          </div>

          {/* رسوم التوصيل ونطاق التغطية */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleToolClick('delivery-fees')}
            className="gold-card settings-tool-card"
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                className="icon-avatar-badge"
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  color: '#059669'
                }}
              >
                <Truck size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)' }}>
                  رسوم التوصيل المنزلي والتغطية
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  الرسوم الأساسية، تسعير الكيلومتر، وسياسة التوصيل المجاني
                </div>
              </div>
            </div>
            <ChevronLeft size={16} color="var(--text-muted)" />
          </div>
        </div>
      </div>

      {/* بطاقة الاشتراك في باقة الأعمال */}
      <div className="gold-card highlight" style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crown size={18} color="var(--text-gold)" />
            <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-gold)' }}>
              باقة الأعمال الذهبية
            </span>
          </div>
          <span
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#059669',
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '10px'
            }}
          >
            نشطة
          </span>
        </div>

        <div style={{ marginTop: '10px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}>
            <span>استهلاك الفروع:</span>
            <span style={{ fontWeight: 800, color: 'var(--text-gold)' }}>
              {subscription.currentBranchCount} من {subscription.branchLimit} فروع
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}>
            <span>سعة طاقم العمل:</span>
            <span style={{ fontWeight: 800, color: 'var(--text-gold)' }}>
              {subscription.currentProfessionalCount} من {subscription.professionalLimit} موظفين
            </span>
          </div>

          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
            تتجدد بتاريخ {subscription.expiryDate} {!canManageSub && '• خاضعة لإدارة مالك المنشأة'}
          </div>
        </div>
      </div>

      {/* خيارات وضوابط التشغيل الفوري */}
      <div className="gold-card" style={{ marginBottom: '14px' }}>
        <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', marginBottom: '10px' }}>
          قواعد وضوابط التشغيل الفوري
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-dark)' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-main)', fontWeight: 700 }}>التأكيد التلقائي للحجوزات</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>قبول فوري ومباشر دون انتظار التأكيد اليدوي</div>
          </div>
          <button
            onClick={() => canManageSub && setAutoConfirm(!autoConfirm)}
            disabled={!canManageSub}
            style={{ background: 'none', border: 'none', cursor: canManageSub ? 'pointer' : 'not-allowed', color: autoConfirm ? 'var(--gold-primary)' : 'var(--text-muted)', opacity: canManageSub ? 1 : 0.4 }}
          >
            {autoConfirm ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: 700 }}>الإغلاق الطارئ المؤقت للفرع</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>إيقاف استقبال طلبات الحجز الجديدة مؤقتاً</div>
          </div>
          <button
            onClick={() => canManageSub && setEmergencyClose(!emergencyClose)}
            disabled={!canManageSub}
            style={{ background: 'none', border: 'none', cursor: canManageSub ? 'pointer' : 'not-allowed', color: emergencyClose ? '#dc2626' : 'var(--text-muted)', opacity: canManageSub ? 1 : 0.4 }}
          >
            {emergencyClose ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
          </button>
        </div>
      </div>

      {/* نافذة تبديل الفرع */}
      {isBranchModalOpen && (
        <div className="modal-overlay" onClick={() => setIsBranchModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-drag-handle" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={18} color="var(--text-gold)" />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-main)', margin: 0, fontWeight: 800 }}>
                  اختيار فرع العمل النشط
                </h3>
              </div>
              <button
                onClick={() => setIsBranchModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 800 }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {branches.map((b) => {
                const isSelected = b.id === selectedBranch.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => {
                      onSelectBranch(b);
                      setIsBranchModalOpen(false);
                    }}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: isSelected ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-dark)',
                      background: isSelected ? 'rgba(212, 175, 55, 0.08)' : '#ffffff',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)' }}>{b.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.address}</div>
                    </div>
                    {isSelected && <Check size={16} color="var(--gold-dark)" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
