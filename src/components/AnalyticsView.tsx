import React from 'react';
import { Booking, ProviderRole } from '../types/zetime';
import { hasPermission } from '../utils/permissions';
import { TrendingUp, ArrowRight, AlertCircle, Lock } from 'lucide-react';

interface AnalyticsViewProps {
  bookings: Booking[];
  currentRole: ProviderRole;
  onBackToSettings?: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ bookings, currentRole, onBackToSettings }) => {
  const canViewAnalytics = hasPermission(currentRole, 'VIEW_ANALYTICS');

  const completed = bookings.filter((b) => b.status === 'COMPLETED').length;
  const inService = bookings.filter((b) => b.status === 'IN_SERVICE').length;

  const totalRevenue = bookings
    .filter((b) => b.status === 'COMPLETED' || b.status === 'IN_SERVICE')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const formatRoleName = (role: ProviderRole) => {
    switch (role) {
      case 'BUSINESS_OWNER': return 'مالك النشاط';
      case 'BRANCH_MANAGER': return 'مدير الفرع';
      case 'BRANCH_STAFF': return 'موظف الاستقبال';
      case 'PROFESSIONAL': return 'أخصائية التجميل';
      case 'FREELANCER': return 'المقدمة المستقلة';
      default: return role;
    }
  };

  return (
    <div style={{ padding: '13px' }}>
      {onBackToSettings && (
        <button
          onClick={onBackToSettings}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-gold)',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '8px',
            fontFamily: 'var(--font-body)'
          }}
        >
          <ArrowRight size={14} /> الرجوع لمركز الإعدادات
        </button>
      )}

      <div style={{ marginBottom: '12px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-gold)', margin: 0 }}>
          التقارير والأداء المالي
        </h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          المؤشرات التشغيلية وإحصائيات إيرادات الفرع
        </span>
      </div>

      {!canViewAnalytics ? (
        <div className="gold-card" style={{ padding: '28px 14px', textAlign: 'center' }}>
          <Lock size={32} color="#dc2626" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-main)' }}>
            تم حجب البيانات المالية
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
            الدور الحالي ({formatRoleName(currentRole)}) لا يملك صلاحية الاطلاع على إيرادات المتجر الشاملة. يرجى التبديل لمالك النشاط أو مدير الفرع.
          </div>
        </div>
      ) : (
        <>
          {/* بطاقة إجمالي الإيرادات */}
          <div className="gold-card highlight" style={{ marginBottom: '12px', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              إجمالي دخل اليوم
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-gold)', marginTop: '4px' }}>
              {totalRevenue} <span style={{ fontSize: '14px', fontWeight: 600 }}>ر.س</span>
            </div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800 }}>
              <TrendingUp size={14} /> +18.4% نمو مقارنة بيوم أمس
            </div>
          </div>

          {/* شبكة المقاييس */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            <div className="gold-card" style={{ padding: '10px' }}>
              <div style={{ color: '#10b981', fontSize: '11px', fontWeight: 800 }}>الحجوزات المكتملة</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>{completed}</div>
            </div>

            <div className="gold-card" style={{ padding: '10px' }}>
              <div style={{ color: '#059669', fontSize: '11px', fontWeight: 800 }}>قيد الخدمة حالياً</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>{inService}</div>
            </div>
          </div>

          {/* رسم بياني للخدمات الأكثر طلباً */}
          <div className="gold-card">
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-gold)', marginBottom: '10px' }}>
              الخدمات الأكثر طلباً وإقبالاً
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-main)', marginBottom: '4px' }}>
                  <span>جلسة نضارة الوجه بذهب عيار 24</span>
                  <span style={{ fontWeight: 800 }}>42%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '42%', height: '100%', background: 'var(--gold-gradient)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-main)', marginBottom: '4px' }}>
                  <span>قص وسشوار ملكي فاخر</span>
                  <span style={{ fontWeight: 800 }}>35%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '35%', height: '100%', background: 'var(--gold-gradient)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-main)', marginBottom: '4px' }}>
                  <span>مناكير سبا وأظافر جل متكاملة</span>
                  <span style={{ fontWeight: 800 }}>23%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '23%', height: '100%', background: 'var(--gold-gradient)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
