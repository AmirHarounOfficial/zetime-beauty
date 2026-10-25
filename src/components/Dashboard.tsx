import React from 'react';
import { Booking, QueueEntry, NotificationItem, Branch, ProviderRole } from '../types/zetime';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  DollarSign,
  PlusCircle,
  UserPlus,
  Zap,
  ChevronLeft,
  Scissors,
  Car,
  MapPin,
  Shield,
  Building,
  Navigation as NavigationIcon
} from 'lucide-react';

interface DashboardProps {
  bookings: Booking[];
  queue: QueueEntry[];
  notifications: NotificationItem[];
  selectedBranch: Branch;
  currentRole: ProviderRole;
  onOpenNewBookingModal: () => void;
  onOpenAddWalkinModal: () => void;
  onAcceptBooking: (bookingId: string) => void;
  onRejectBooking: (bookingId: string) => void;
  onNavigateToTab: (tab: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  bookings,
  queue,
  notifications,
  selectedBranch,
  currentRole,
  onOpenNewBookingModal,
  onOpenAddWalkinModal,
  onAcceptBooking,
  onRejectBooking,
  onNavigateToTab
}) => {
  const pendingBookings = bookings.filter((b) => b.status === 'PENDING_CONFIRMATION');
  const inServiceBookings = bookings.filter((b) => b.status === 'IN_SERVICE');
  const activeQueue = queue.filter((q) => q.status === 'WAITING');

  const todayRevenue = bookings
    .filter((b) => b.status === 'COMPLETED' || b.status === 'IN_SERVICE')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  // بيانات خاصة بالأخصائية
  const myStylistBookings = bookings.filter((b) =>
    b.bookingItems.some((item) => item.professionalName === 'سارة السيد')
  );
  const stylistTipsCommission = 120; // ر.س

  // بيانات خاصة بالمقدمة المستقلة
  const homeBookings = bookings.filter((b) => b.isHomeService);
  const freelancerDirectEarnings = 350; // ر.س

  return (
    <div style={{ padding: '13px' }}>
      {/* بطاقة وضع الدور التشغيلي النشط */}
      {currentRole === 'BUSINESS_OWNER' && (
        <div className="gold-card highlight" style={{ marginBottom: '11px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                👑 إشراف مالك المنشأة
              </div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-main)', marginTop: '2px' }}>
                {selectedBranch.name}
              </div>
            </div>
            <span
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#059669',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '12px',
                border: '1px solid rgba(5, 150, 105, 0.3)'
              }}
            >
              ● كافة المحطات نشطة
            </span>
          </div>
        </div>
      )}

      {currentRole === 'BRANCH_MANAGER' && (
        <div className="gold-card highlight" style={{ marginBottom: '11px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                🏢 إدارة عمليات الفرع
              </div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-main)', marginTop: '2px' }}>
                {selectedBranch.name}
              </div>
            </div>
            <span
              style={{
                background: 'rgba(37, 99, 235, 0.12)',
                color: '#2563eb',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '12px'
              }}
            >
              ● 3 موظفين على رأس العمل
            </span>
          </div>
        </div>
      )}

      {currentRole === 'BRANCH_STAFF' && (
        <div className="gold-card" style={{ marginBottom: '11px', background: '#f8fafc', borderRight: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#7c3aed', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                💼 وضع الاستقبال والحضور
              </div>
              <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', marginTop: '2px' }}>
                وصول الضيوف وقائمة الانتظار
              </div>
            </div>
            <span
              style={{
                background: 'rgba(124, 58, 237, 0.12)',
                color: '#7c3aed',
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px'
              }}
            >
              الاستقبال نشط
            </span>
          </div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
            إدارة تسجيل الحضور والانتظار الفوري. يتم حجب الإيرادات المالية الحساسة عن موظفي الاستقبال.
          </div>
        </div>
      )}

      {currentRole === 'PROFESSIONAL' && (
        <div className="gold-card" style={{ marginBottom: '11px', background: '#fefce8', borderRight: '4px solid var(--gold-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                ✂️ كرسي التصفيف والتجميل #2
              </div>
              <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', marginTop: '2px' }}>
                سارة السيد • كبيرة مصففي الشعر
              </div>
            </div>
            <span
              style={{
                background: 'rgba(212, 175, 55, 0.18)',
                color: 'var(--text-gold)',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '8px'
              }}
            >
              جاهزة لاستقبال العملاء
            </span>
          </div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
            وضع المحطة الشخصية: عرض عميلاتك المسندات، جدول جلسات اليوم، وأداءك الشخصي.
          </div>
        </div>
      )}

      {currentRole === 'FREELANCER' && (
        <div className="gold-card" style={{ marginBottom: '11px', background: '#f0fdf4', borderRight: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                🚗 أخصائية خدمات تجميل منزلية مستقلة
              </div>
              <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', marginTop: '2px' }}>
                سارة الرشيد • تجميل وعناية خارجية
              </div>
            </div>
            <span
              style={{
                background: 'rgba(22, 163, 74, 0.15)',
                color: '#16a34a',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '8px'
              }}
            >
              تتبع الملاحة GPS نشط
            </span>
          </div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
            الوضع المستقل: مواعيد الزيارات المنزلية، خط سير الانتقال، وإدارة العوائد المباشرة.
          </div>
        </div>
      )}

      {/* شبكة الإحصائيات التشغيلية الذكية (Role Stats Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '11px' }}>
        {/* المقياس 1 */}
        {currentRole === 'BUSINESS_OWNER' && (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-gold)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>إيرادات اليوم</span>
              <DollarSign size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-gold)', marginTop: '4px' }}>
              {todayRevenue} <span style={{ fontSize: '11px', fontWeight: 600 }}>ر.س</span>
            </div>
          </div>
        )}

        {currentRole === 'BRANCH_MANAGER' && (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-gold)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>إيرادات الفرع</span>
              <DollarSign size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-gold)', marginTop: '4px' }}>
              {todayRevenue} <span style={{ fontSize: '11px', fontWeight: 600 }}>ر.س</span>
            </div>
          </div>
        )}

        {currentRole === 'BRANCH_STAFF' && (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>حجوزات اليوم</span>
              <CalendarDays size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
              {bookings.length} <span style={{ fontSize: '11px', fontWeight: 600 }}>عملاء</span>
            </div>
          </div>
        )}

        {currentRole === 'PROFESSIONAL' && (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#7c3aed' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>عميلاتي اليوم</span>
              <Users size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#7c3aed', marginTop: '4px' }}>
              {myStylistBookings.length || 3} <span style={{ fontSize: '11px', fontWeight: 600 }}>معينات</span>
            </div>
          </div>
        )}

        {currentRole === 'FREELANCER' && (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>زيارات منزلية</span>
              <Car size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              {homeBookings.length || 2} <span style={{ fontSize: '11px', fontWeight: 600 }}>حجوزات</span>
            </div>
          </div>
        )}

        {/* المقياس 2 */}
        {currentRole === 'PROFESSIONAL' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>على الكرسي الآن</span>
              <Scissors size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
              1 <span style={{ fontSize: '11px', fontWeight: 600 }}>نشطة</span>
            </div>
          </div>
        ) : currentRole === 'FREELANCER' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-gold)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>أرباحي المباشرة</span>
              <DollarSign size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-gold)', marginTop: '4px' }}>
              {freelancerDirectEarnings} <span style={{ fontSize: '11px', fontWeight: 600 }}>ر.س</span>
            </div>
          </div>
        ) : (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>بانتظار التأكيد</span>
              <Clock size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>
              {pendingBookings.length} <span style={{ fontSize: '11px', fontWeight: 600 }}>حجوزات</span>
            </div>
          </div>
        )}

        {/* المقياس 3 */}
        {currentRole === 'PROFESSIONAL' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>الموعد التالي</span>
              <Clock size={14} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#2563eb', marginTop: '5px' }}>
              15:30 <span style={{ fontSize: '10px', fontWeight: 600 }}>سشوار</span>
            </div>
          </div>
        ) : currentRole === 'FREELANCER' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>نطاق الخدمة</span>
              <MapPin size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
              15 <span style={{ fontSize: '11px', fontWeight: 600 }}>كم</span>
            </div>
          </div>
        ) : (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>قيد الخدمة الآن</span>
              <Zap size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
              {inServiceBookings.length} <span style={{ fontSize: '11px', fontWeight: 600 }}>عملاء</span>
            </div>
          </div>
        )}

        {/* المقياس 4 */}
        {currentRole === 'PROFESSIONAL' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-gold)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>إكراميات متوقعة</span>
              <DollarSign size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-gold)', marginTop: '4px' }}>
              {stylistTipsCommission} <span style={{ fontSize: '11px', fontWeight: 600 }}>ر.س</span>
            </div>
          </div>
        ) : currentRole === 'FREELANCER' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>الوجهة التالية</span>
              <NavigationIcon size={14} />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#d97706', marginTop: '6px' }}>
              حي العليا (14:30)
            </div>
          </div>
        ) : (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>الانتظار الفوري</span>
              <Users size={14} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
              {activeQueue.length} <span style={{ fontSize: '11px', fontWeight: 600 }}>بالانتظار</span>
            </div>
          </div>
        )}
      </div>

      {/* بطاقات مخصصة حسب الدور (Widgets) */}

      {/* للمستقلة: بطاقة موعد الزيارة المنزلية القادم وتوجيه المسار */}
      {currentRole === 'FREELANCER' && (
        <div className="gold-card highlight" style={{ marginBottom: '13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: 800, textTransform: 'uppercase' }}>
                🚗 موعد الخدمة المنزلية القادم
              </div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-main)', marginTop: '2px' }}>
                لينا الحارثي
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-gold)', fontWeight: 700 }}>
                جلسة نضارة الوجه بذهب عيار 24 (14:30)
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} /> حي العليا، فيلا 14، الرياض (يبعد 4.8 كم)
              </div>
            </div>
            <span style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--text-gold)', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
              +70 ر.س رسوم انتقال
            </span>
          </div>
          <button
            onClick={() => alert('جاري تشغيل مسار الخرائط والملاحة نحو موقع العميل...')}
            className="gold-button"
            style={{ marginTop: '10px', padding: '9px', fontSize: '12px' }}
          >
            <NavigationIcon size={14} /> بدء الملاحة والمسار عبر GPS
          </button>
        </div>
      )}

      {/* للأخصائية: العميل الحالي في الكرسي */}
      {currentRole === 'PROFESSIONAL' && (
        <div className="gold-card highlight" style={{ marginBottom: '13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-gold)', fontWeight: 800, textTransform: 'uppercase' }}>
                ✂️ متواجدة حالياً على كرسي التصفيف
              </div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-main)', marginTop: '2px' }}>
                ريم القحطاني
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                قص وسشوار ملكي فاخر (45 دقيقة)
              </div>
            </div>
            <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#059669', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '8px' }}>
              ● قيد الخدمة (30 د)
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button
              onClick={() => alert('تم إنهاء الخدمة بنجاح! تم تسجيل إكرامية بقيمة 35 ر.س.')}
              className="gold-button"
              style={{ flex: 1, padding: '8px', fontSize: '11px' }}
            >
              <CheckCircle2 size={14} /> إنهاء الخدمة
            </button>
            <button
              onClick={() => onNavigateToTab('queue')}
              style={{
                background: '#f8fafc',
                border: '1px solid var(--border-dark)',
                color: 'var(--text-main)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontWeight: 700,
                fontSize: '11px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)'
              }}
            >
              مناداة التالي
            </button>
          </div>
        </div>
      )}

      {/* تنبيه تأكيد الحجوزات مع العد التنازلي للنافذة الزمنية */}
      {currentRole !== 'PROFESSIONAL' && currentRole !== 'FREELANCER' && pendingBookings.length > 0 && (
        <div style={{ marginBottom: '13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#d97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={14} /> طلبات حجز جديدة بانتظار التأكيد
            </span>
          </div>

          {pendingBookings.map((b) => (
            <div
              key={b.id}
              style={{
                background: '#fffbe6',
                border: '1px solid #fef08a',
                borderRadius: '12px',
                padding: '11px',
                marginBottom: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)' }}>{b.customerName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {b.bookingItems[0]?.serviceName} ({b.scheduledTime})
                  </div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '10px', color: '#d97706', fontWeight: 800, background: 'rgba(217, 119, 6, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                    ⏱ متبقي 35 دقيقة للقبول
                  </span>
                </div>
              </div>

              {b.customerAllergies && b.customerAllergies.length > 0 && (
                <div style={{ marginTop: '6px', fontSize: '10.5px', color: '#dc2626', fontWeight: 700 }}>
                  ⚠️ تنبيه الحساسية: {b.customerAllergies.join('، ')}
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  onClick={() => onAcceptBooking(b.id)}
                  style={{
                    flex: 1,
                    background: 'var(--gold-gradient)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '7px',
                    padding: '7px',
                    fontWeight: 800,
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  قبول الحجز
                </button>
                <button
                  onClick={() => onRejectBooking(b.id)}
                  style={{
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                    borderRadius: '7px',
                    padding: '7px 12px',
                    fontWeight: 700,
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  رفض الحجز
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* لوحة الإجراءات السريعة (Role Quick Actions) */}
      <div style={{ marginBottom: '13px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
          {currentRole === 'PROFESSIONAL'
            ? 'إجراءات محطة التصفيف'
            : currentRole === 'FREELANCER'
            ? 'إجراءات الخدمة المتنقلة'
            : 'الإجراءات التشغيلية السريعة'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={onOpenNewBookingModal}
            className="gold-button"
            style={{ padding: '9px', fontSize: '11.5px' }}
          >
            <PlusCircle size={15} />
            <span>+ حجز جديد</span>
          </button>

          {currentRole !== 'FREELANCER' && (
            <button
              onClick={onOpenAddWalkinModal}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-dark)',
                color: 'var(--text-main)',
                borderRadius: '8px',
                padding: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '11.5px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)'
              }}
            >
              <UserPlus size={15} color="var(--text-gold)" />
              <span>+ إضافة انتظار</span>
            </button>
          )}

          {currentRole === 'FREELANCER' && (
            <button
              onClick={() => onNavigateToTab('services')}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-dark)',
                color: 'var(--text-main)',
                borderRadius: '8px',
                padding: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '11.5px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)'
              }}
            >
              <Car size={15} color="var(--text-gold)" />
              <span>أسعار الانتقال</span>
            </button>
          )}

          {currentRole === 'BUSINESS_OWNER' && (
            <button
              onClick={() => onNavigateToTab('analytics')}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-dark)',
                color: 'var(--text-main)',
                borderRadius: '8px',
                padding: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '11.5px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)'
              }}
            >
              <DollarSign size={15} color="#2563eb" />
              <span>التقارير المالية</span>
            </button>
          )}

          {(currentRole === 'BUSINESS_OWNER' || currentRole === 'BRANCH_MANAGER') && (
            <button
              onClick={() => onNavigateToTab('professionals')}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-dark)',
                color: 'var(--text-main)',
                borderRadius: '8px',
                padding: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '11.5px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)'
              }}
            >
              <Users size={15} color="#7c3aed" />
              <span>سجل الطاقم</span>
            </button>
          )}
        </div>
      </div>

      {/* سجل الإشعارات والأنشطة الأخيرة */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            سجل الأنشطة والإشعارات
          </span>
          <button
            onClick={() => onNavigateToTab('settings')}
            style={{ background: 'none', border: 'none', fontSize: '11px', color: 'var(--text-gold)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
          >
            عرض الكل
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {notifications.slice(0, 3).map((n) => (
            <div
              key={n.id}
              className="gold-card"
              style={{
                padding: '10px 12px',
                marginBottom: 0,
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                background: n.isRead ? '#ffffff' : '#faf8f2'
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: n.isRead ? 'transparent' : 'var(--gold-primary)',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '12px', color: 'var(--text-main)' }}>{n.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.message}</div>
              </div>
              <ChevronLeft size={15} color="var(--text-muted)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
