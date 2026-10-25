import React, { useState } from 'react';
import { Booking, BookingStatus, ProviderRole } from '../types/zetime';
import {
  CalendarDays,
  Clock,
  User,
  Check,
  X,
  Play,
  CheckCircle,
  Home,
  DollarSign,
  AlertTriangle,
  ChevronLeft,
  Filter,
  Scissors,
  Navigation as NavigationIcon
} from 'lucide-react';

interface BookingsViewProps {
  bookings: Booking[];
  currentRole?: ProviderRole;
  onUpdateStatus: (bookingId: string, newStatus: BookingStatus) => void;
  onOpenNewBookingModal: () => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  bookings,
  currentRole = 'BUSINESS_OWNER',
  onUpdateStatus,
  onOpenNewBookingModal
}) => {
  const [filter, setFilter] = useState<'ALL' | 'MY_CLIENTS' | 'PENDING' | 'CONFIRMED' | 'IN_SERVICE' | 'HOME'>('ALL');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'MY_CLIENTS') return b.bookingItems.some((item) => item.professionalName === 'سارة السيد');
    if (filter === 'PENDING') return b.status === 'PENDING_CONFIRMATION';
    if (filter === 'CONFIRMED') return b.status === 'CONFIRMED' || b.status === 'CHECKED_IN';
    if (filter === 'IN_SERVICE') return b.status === 'IN_SERVICE';
    if (filter === 'HOME') return b.isHomeService;
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'PENDING_CONFIRMATION':
        return { label: 'بانتظار التأكيد', bg: 'rgba(217, 119, 6, 0.15)', color: '#d97706' };
      case 'CONFIRMED':
        return { label: 'مؤكد', bg: 'rgba(37, 99, 235, 0.15)', color: '#2563eb' };
      case 'CHECKED_IN':
        return { label: 'تم الحضور', bg: 'rgba(124, 58, 237, 0.15)', color: '#7c3aed' };
      case 'IN_SERVICE':
        return { label: 'قيد التنفيذ', bg: 'rgba(5, 150, 105, 0.15)', color: '#059669' };
      case 'COMPLETED':
        return { label: 'مكتمل', bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' };
      case 'REJECTED':
      case 'CANCELLED':
        return { label: 'ملغي / مرفوض', bg: 'rgba(220, 38, 38, 0.15)', color: '#dc2626' };
      case 'NO_SHOW':
        return { label: 'لم يحضر', bg: 'rgba(239, 68, 68, 0.2)', color: '#dc2626' };
      default:
        return { label: status, bg: 'rgba(0, 0, 0, 0.06)', color: 'var(--text-main)' };
    }
  };

  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'Online Payment':
        return 'دفع إلكتروني';
      case 'Card at Provider':
        return 'بطاقة لدى المزود (شبكة)';
      case 'Cash':
        return 'نقداً';
      case 'Apple Pay':
        return 'أبل باي (Apple Pay)';
      default:
        return method;
    }
  };

  const formatPaymentStatus = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'مدفوع';
      case 'Pending':
        return 'معلق';
      case 'Refunded':
        return 'مسترد';
      default:
        return status;
    }
  };

  return (
    <div style={{ padding: '13px' }}>
      {/* فلاتر الحجوزات العلوية */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px' }}>
        <button
          onClick={() => setFilter('ALL')}
          style={{
            background: filter === 'ALL' ? 'var(--gold-gradient)' : '#ffffff',
            color: filter === 'ALL' ? '#000' : 'var(--text-main)',
            border: filter === 'ALL' ? 'none' : '1px solid var(--border-dark)',
            borderRadius: '16px',
            padding: '5px 12px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-body)'
          }}
        >
          الكل ({bookings.length})
        </button>
        {currentRole === 'PROFESSIONAL' && (
          <button
            onClick={() => setFilter('MY_CLIENTS')}
            style={{
              background: filter === 'MY_CLIENTS' ? 'var(--gold-gradient)' : '#ffffff',
              color: filter === 'MY_CLIENTS' ? '#000' : 'var(--text-gold)',
              border: filter === 'MY_CLIENTS' ? 'none' : '1px solid var(--border-gold)',
              borderRadius: '16px',
              padding: '5px 12px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-body)'
            }}
          >
            ✂️ عميلاتي
          </button>
        )}
        <button
          onClick={() => setFilter('PENDING')}
          style={{
            background: filter === 'PENDING' ? '#d97706' : '#ffffff',
            color: filter === 'PENDING' ? '#fff' : 'var(--text-main)',
            border: filter === 'PENDING' ? 'none' : '1px solid var(--border-dark)',
            borderRadius: '16px',
            padding: '5px 12px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-body)'
          }}
        >
          بانتظار التأكيد
        </button>
        <button
          onClick={() => setFilter('IN_SERVICE')}
          style={{
            background: filter === 'IN_SERVICE' ? '#059669' : '#ffffff',
            color: filter === 'IN_SERVICE' ? '#fff' : 'var(--text-main)',
            border: filter === 'IN_SERVICE' ? 'none' : '1px solid var(--border-dark)',
            borderRadius: '16px',
            padding: '5px 12px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-body)'
          }}
        >
          قيد التنفيذ
        </button>
        <button
          onClick={() => setFilter('HOME')}
          style={{
            background: filter === 'HOME' ? 'var(--gold-light)' : '#ffffff',
            color: filter === 'HOME' ? '#000' : 'var(--text-main)',
            border: filter === 'HOME' ? 'none' : '1px solid var(--border-dark)',
            borderRadius: '16px',
            padding: '5px 12px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-body)'
          }}
        >
          🏠 زيارات منزلية
        </button>
      </div>

      {/* قائمة بطاقات الحجوزات */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredBookings.length === 0 && (
          <div className="gold-card" style={{ textAlign: 'center', padding: '24px 14px' }}>
            <CalendarDays size={32} color="var(--text-muted)" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>لا توجد حجوزات في هذا التصنيف</div>
          </div>
        )}

        {filteredBookings.map((b) => {
          const badge = getStatusBadge(b.status);
          const item = b.bookingItems[0];
          return (
            <div key={b.id} className="gold-card" style={{ padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--text-main)' }}>{b.customerName}</span>
                    {b.isHomeService && (
                      <span
                        style={{
                          background: 'rgba(212, 175, 55, 0.2)',
                          color: 'var(--text-gold)',
                          fontSize: '9.5px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        🏠 زيارة منزلية
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {item?.serviceName} • {item?.professionalName}
                  </div>
                </div>

                <span
                  style={{
                    background: badge.bg,
                    color: badge.color,
                    fontSize: '10.5px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {badge.label}
                </span>
              </div>

              {/* صف الوقت والقيمة */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '10px',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-dark)',
                  fontSize: '11px',
                  color: 'var(--text-muted)'
                }}
              >
                <span>
                  ⏰ {b.scheduledTime} ({b.totalDurationMinutes} دقيقة)
                </span>
                <span style={{ fontWeight: 800, color: 'var(--text-gold)', fontSize: '12px' }}>{b.totalPrice} ر.س</span>
              </div>

              {/* أزرار الإجراءات التفاعلية */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                {b.status === 'PENDING_CONFIRMATION' && (
                  <>
                    <button
                      onClick={() => onUpdateStatus(b.id, 'CONFIRMED')}
                      style={{ flex: 1, background: 'var(--gold-gradient)', color: '#000', border: 'none', padding: '7px', borderRadius: '6px', fontWeight: 800, fontSize: '11.5px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                    >
                      قبول الحجز
                    </button>
                    <button
                      onClick={() => onUpdateStatus(b.id, 'REJECTED')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '7px 12px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                    >
                      رفض
                    </button>
                  </>
                )}

                {b.status === 'CONFIRMED' && (
                  <button
                    onClick={() => onUpdateStatus(b.id, 'CHECKED_IN')}
                    style={{ flex: 1, background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed', border: '1px solid rgba(124, 58, 237, 0.3)', padding: '7px', borderRadius: '6px', fontWeight: 800, fontSize: '11.5px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                  >
                    تسجيل الحضور
                  </button>
                )}

                {b.status === 'CHECKED_IN' && (
                  <button
                    onClick={() => onUpdateStatus(b.id, 'IN_SERVICE')}
                    style={{ flex: 1, background: 'rgba(5, 150, 105, 0.12)', color: '#059669', border: '1px solid rgba(5, 150, 105, 0.3)', padding: '7px', borderRadius: '6px', fontWeight: 800, fontSize: '11.5px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                  >
                    ▶ بدء الخدمة
                  </button>
                )}

                {b.status === 'IN_SERVICE' && (
                  <button
                    onClick={() => onUpdateStatus(b.id, 'COMPLETED')}
                    style={{ flex: 1, background: 'var(--gold-gradient)', color: '#000', border: 'none', padding: '7px', borderRadius: '6px', fontWeight: 800, fontSize: '11.5px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                  >
                    ✓ إتمام الخدمة
                  </button>
                )}

                <button
                  onClick={() => setSelectedBooking(b)}
                  style={{ background: '#f1f5f9', color: 'var(--text-main)', border: '1px solid var(--border-dark)', padding: '7px 11px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                >
                  التفاصيل
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* نافذة تفاصيل الحجز السفلية */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-drag-handle" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ color: 'var(--text-gold)', fontSize: '15px', fontWeight: 800 }}>
                تفاصيل الحجز #{selectedBooking.id}
              </h3>
              <button
                onClick={() => setSelectedBooking(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '9px', color: 'var(--text-main)' }}>
              <div><strong>العميل:</strong> {selectedBooking.customerName} ({selectedBooking.customerPhone})</div>
              <div><strong>الفرع:</strong> {selectedBooking.branchName}</div>
              <div><strong>الموعد المحدد:</strong> {selectedBooking.scheduledDate} في تمام {selectedBooking.scheduledTime}</div>
              <div><strong>طريقة الدفع:</strong> {formatPaymentMethod(selectedBooking.paymentMethod)} ({formatPaymentStatus(selectedBooking.paymentStatus)})</div>

              {selectedBooking.isHomeService && (
                <div style={{ background: '#f8fafc', padding: '9px', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                  <strong>🏠 عنوان الخدمة المنزلية:</strong> {selectedBooking.homeAddress}
                </div>
              )}

              {selectedBooking.notes && (
                <div style={{ background: '#f8fafc', padding: '9px', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                  <strong>ملاحظات العميل:</strong> {selectedBooking.notes}
                </div>
              )}

              {selectedBooking.customerAllergies && selectedBooking.customerAllergies.length > 0 && (
                <div style={{ color: '#dc2626', background: '#fef2f2', border: '1px solid #fca5a5', padding: '9px', borderRadius: '8px', fontWeight: 700 }}>
                  <strong>⚠️ تنبيه الحساسية:</strong> {selectedBooking.customerAllergies.join('، ')}
                </div>
              )}

              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    onUpdateStatus(selectedBooking.id, 'NO_SHOW');
                    setSelectedBooking(null);
                  }}
                  style={{
                    flex: 1,
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fca5a5',
                    padding: '9px',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  تسجيل كـ (لم يحضر)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
