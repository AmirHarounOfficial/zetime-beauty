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
  ChevronRight,
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
    if (filter === 'MY_CLIENTS') return b.bookingItems.some((item) => item.professionalName === 'Lina Al-Harthi');
    if (filter === 'PENDING') return b.status === 'PENDING_CONFIRMATION';
    if (filter === 'CONFIRMED') return b.status === 'CONFIRMED' || b.status === 'CHECKED_IN';
    if (filter === 'IN_SERVICE') return b.status === 'IN_SERVICE';
    if (filter === 'HOME') return b.isHomeService;
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'PENDING_CONFIRMATION':
        return { label: 'Pending Confirmation', bg: 'rgba(217, 119, 6, 0.15)', color: '#d97706' };
      case 'CONFIRMED':
        return { label: 'Confirmed', bg: 'rgba(37, 99, 235, 0.15)', color: '#2563eb' };
      case 'CHECKED_IN':
        return { label: 'Checked In', bg: 'rgba(124, 58, 237, 0.15)', color: '#7c3aed' };
      case 'IN_SERVICE':
        return { label: 'In Service', bg: 'rgba(5, 150, 105, 0.15)', color: '#059669' };
      case 'COMPLETED':
        return { label: 'Completed', bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' };
      case 'REJECTED':
      case 'CANCELLED':
        return { label: 'Cancelled/Rejected', bg: 'rgba(220, 38, 38, 0.15)', color: '#dc2626' };
      case 'NO_SHOW':
        return { label: 'No Show', bg: 'rgba(239, 68, 68, 0.2)', color: '#dc2626' };
      default:
        return { label: status, bg: 'rgba(0, 0, 0, 0.06)', color: 'var(--text-main)' };
    }
  };

  return (
    <div style={{ padding: '14px' }}>
      {/* Top Filter Chips */}
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
            whiteSpace: 'nowrap'
          }}
        >
          All ({bookings.length})
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
              whiteSpace: 'nowrap'
            }}
          >
            ✂️ My Clients
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
            whiteSpace: 'nowrap'
          }}
        >
          Pending
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
            whiteSpace: 'nowrap'
          }}
        >
          In Service
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
            whiteSpace: 'nowrap'
          }}
        >
          🏠 Home Visits
        </button>
      </div>

      {/* Bookings List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredBookings.map((b) => {
          const badge = getStatusBadge(b.status);
          const item = b.bookingItems[0];
          return (
            <div key={b.id} className="gold-card" style={{ padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>{b.customerName}</span>
                    {b.isHomeService && (
                      <span
                        style={{
                          background: 'rgba(212, 175, 55, 0.2)',
                          color: 'var(--text-gold)',
                          fontSize: '9px',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: '4px'
                        }}
                      >
                        🏠 Home Visit
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
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {badge.label}
                </span>
              </div>

              {/* Time & Price Row */}
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
                  ⏰ {b.scheduledTime} ({b.totalDurationMinutes}m)
                </span>
                <span style={{ fontWeight: 800, color: 'var(--text-gold)' }}>{b.totalPrice} SAR</span>
              </div>

              {/* Dynamic Action Buttons depending on Booking Lifecycle state */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                {b.status === 'PENDING_CONFIRMATION' && (
                  <>
                    <button
                      onClick={() => onUpdateStatus(b.id, 'CONFIRMED')}
                      style={{ flex: 1, background: 'var(--gold-gradient)', color: '#000', border: 'none', padding: '6px', borderRadius: '6px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => onUpdateStatus(b.id, 'REJECTED')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Reject
                    </button>
                  </>
                )}

                {b.status === 'CONFIRMED' && (
                  <button
                    onClick={() => onUpdateStatus(b.id, 'CHECKED_IN')}
                    style={{ flex: 1, background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed', border: '1px solid rgba(124, 58, 237, 0.3)', padding: '6px', borderRadius: '6px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}
                  >
                    Mark Checked-In
                  </button>
                )}

                {b.status === 'CHECKED_IN' && (
                  <button
                    onClick={() => onUpdateStatus(b.id, 'IN_SERVICE')}
                    style={{ flex: 1, background: 'rgba(5, 150, 105, 0.12)', color: '#059669', border: '1px solid rgba(5, 150, 105, 0.3)', padding: '6px', borderRadius: '6px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}
                  >
                    ▶ Start Service
                  </button>
                )}

                {b.status === 'IN_SERVICE' && (
                  <button
                    onClick={() => onUpdateStatus(b.id, 'COMPLETED')}
                    style={{ flex: 1, background: 'var(--gold-gradient)', color: '#000', border: 'none', padding: '6px', borderRadius: '6px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}
                  >
                    ✓ Complete Service
                  </button>
                )}

                <button
                  onClick={() => setSelectedBooking(b)}
                  style={{ background: '#f1f5f9', color: 'var(--text-main)', border: '1px solid var(--border-dark)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ color: 'var(--text-gold)', fontSize: '15px' }}>Booking Details #{selectedBooking.id}</h3>
              <button onClick={() => setSelectedBooking(null)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '16px', fontWeight: 700 }}>✕</button>
            </div>

            <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-main)' }}>
              <div><strong>Customer:</strong> {selectedBooking.customerName} ({selectedBooking.customerPhone})</div>
              <div><strong>Branch:</strong> {selectedBooking.branchName}</div>
              <div><strong>Scheduled:</strong> {selectedBooking.scheduledDate} at {selectedBooking.scheduledTime}</div>
              <div><strong>Payment Method:</strong> {selectedBooking.paymentMethod} ({selectedBooking.paymentStatus})</div>

              {selectedBooking.isHomeService && (
                <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-dark)' }}>
                  <strong>🏠 Home Address:</strong> {selectedBooking.homeAddress}
                </div>
              )}

              {selectedBooking.notes && (
                <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-dark)' }}>
                  <strong>Note:</strong> {selectedBooking.notes}
                </div>
              )}

              {selectedBooking.customerAllergies && selectedBooking.customerAllergies.length > 0 && (
                <div style={{ color: '#dc2626', background: '#fef2f2', border: '1px solid #fca5a5', padding: '8px', borderRadius: '6px' }}>
                  <strong>⚠️ Allergy Alert:</strong> {selectedBooking.customerAllergies.join(', ')}
                </div>
              )}

              <div style={{ marginTop: '10px', display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => {
                    onUpdateStatus(selectedBooking.id, 'NO_SHOW');
                    setSelectedBooking(null);
                  }}
                  style={{ flex: 1, background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Mark No-Show
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
