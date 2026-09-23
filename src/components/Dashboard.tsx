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
  ChevronRight,
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

  // Stylist-specific data
  const myStylistBookings = bookings.filter((b) =>
    b.bookingItems.some((item) => item.professionalName === 'Lina Al-Harthi')
  );
  const stylistTipsCommission = 120; // SAR

  // Freelancer-specific data
  const homeBookings = bookings.filter((b) => b.isHomeService);
  const freelancerDirectEarnings = 350; // SAR

  return (
    <div style={{ padding: '14px' }}>
      {/* Role-Specific Operational Hub Banner */}
      {currentRole === 'BUSINESS_OWNER' && (
        <div className="gold-card highlight" style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                👑 Business Owner Oversight
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
              ● ALL STATIONS OPEN
            </span>
          </div>
        </div>
      )}

      {currentRole === 'BRANCH_MANAGER' && (
        <div className="gold-card highlight" style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🏢 Branch Operations Floor
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
              ● 3 STAFF ON DUTY
            </span>
          </div>
        </div>
      )}

      {currentRole === 'BRANCH_STAFF' && (
        <div className="gold-card" style={{ marginBottom: '12px', background: '#f8fafc', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#7c3aed', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                💼 Front Desk Reception Mode
              </div>
              <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', marginTop: '2px' }}>
                Guest Arrivals & Walk-In Queue
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
              STAFF ACTIVE
            </span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Managing check-ins and live queue. Sensitive financial revenue is hidden from front desk view.
          </div>
        </div>
      )}

      {currentRole === 'PROFESSIONAL' && (
        <div className="gold-card" style={{ marginBottom: '12px', background: '#fefce8', borderLeft: '4px solid var(--gold-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ✂️ Stylist Station #2
              </div>
              <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', marginTop: '2px' }}>
                Lina Al-Harthi • Senior Stylist
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
              READY FOR CLIENTS
            </span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Personal station mode: Showing your assigned clients, appointments, and personal performance.
          </div>
        </div>
      )}

      {currentRole === 'FREELANCER' && (
        <div className="gold-card" style={{ marginBottom: '12px', background: '#f0fdf4', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🚗 Independent Mobile Provider
              </div>
              <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', marginTop: '2px' }}>
                Sarah Al-Rashid • Home Beauty
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
              GPS DISPATCH ACTIVE
            </span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Solo mode: Home service appointments, direct travel route, and self-managed client earnings.
          </div>
        </div>
      )}

      {/* Role-Specific Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        {/* Metric 1 */}
        {currentRole === 'BUSINESS_OWNER' && (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-gold)' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Today Revenue</span>
              <DollarSign size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-gold)', marginTop: '4px' }}>
              {todayRevenue} <span style={{ fontSize: '11px', fontWeight: 400 }}>SAR</span>
            </div>
          </div>
        )}

        {currentRole === 'BRANCH_MANAGER' && (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-gold)' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Branch Revenue</span>
              <DollarSign size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-gold)', marginTop: '4px' }}>
              {todayRevenue} <span style={{ fontSize: '11px', fontWeight: 400 }}>SAR</span>
            </div>
          </div>
        )}

        {currentRole === 'BRANCH_STAFF' && (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Today Bookings</span>
              <CalendarDays size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
              {bookings.length} <span style={{ fontSize: '11px', fontWeight: 400 }}>Clients</span>
            </div>
          </div>
        )}

        {currentRole === 'PROFESSIONAL' && (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#7c3aed' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>My Clients Today</span>
              <Users size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#7c3aed', marginTop: '4px' }}>
              {myStylistBookings.length || 3} <span style={{ fontSize: '11px', fontWeight: 400 }}>Assigned</span>
            </div>
          </div>
        )}

        {currentRole === 'FREELANCER' && (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Home Visits</span>
              <Car size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              {homeBookings.length || 2} <span style={{ fontSize: '11px', fontWeight: 400 }}>Bookings</span>
            </div>
          </div>
        )}

        {/* Metric 2 */}
        {currentRole === 'PROFESSIONAL' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>In My Chair</span>
              <Scissors size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
              1 <span style={{ fontSize: '11px', fontWeight: 400 }}>Active</span>
            </div>
          </div>
        ) : currentRole === 'FREELANCER' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-gold)' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Direct Earnings</span>
              <DollarSign size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-gold)', marginTop: '4px' }}>
              {freelancerDirectEarnings} <span style={{ fontSize: '11px', fontWeight: 400 }}>SAR</span>
            </div>
          </div>
        ) : (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Pending Action</span>
              <Clock size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>
              {pendingBookings.length} <span style={{ fontSize: '11px', fontWeight: 400 }}>Bookings</span>
            </div>
          </div>
        )}

        {/* Metric 3 */}
        {currentRole === 'PROFESSIONAL' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Next Slot</span>
              <Clock size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
              15:30 <span style={{ fontSize: '11px', fontWeight: 400 }}>Blowout</span>
            </div>
          </div>
        ) : currentRole === 'FREELANCER' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Dispatch Radius</span>
              <MapPin size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
              15 <span style={{ fontSize: '11px', fontWeight: 400 }}>km</span>
            </div>
          </div>
        ) : (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>In Service Now</span>
              <Zap size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
              {inServiceBookings.length} <span style={{ fontSize: '11px', fontWeight: 400 }}>Clients</span>
            </div>
          </div>
        )}

        {/* Metric 4 */}
        {currentRole === 'PROFESSIONAL' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-gold)' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Est. Tips/Comm.</span>
              <DollarSign size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-gold)', marginTop: '4px' }}>
              {stylistTipsCommission} <span style={{ fontSize: '11px', fontWeight: 400 }}>SAR</span>
            </div>
          </div>
        ) : currentRole === 'FREELANCER' ? (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Next Destination</span>
              <NavigationIcon size={14} />
            </div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#d97706', marginTop: '6px' }}>
              Al Olaya (14:30)
            </div>
          </div>
        ) : (
          <div className="gold-card" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb' }}>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Live Walk-In Queue</span>
              <Users size={14} />
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
              {activeQueue.length} <span style={{ fontSize: '11px', fontWeight: 400 }}>Waiting</span>
            </div>
          </div>
        )}
      </div>

      {/* Role-Specific Featured Widgets */}

      {/* For FREELANCER: Next Home Visit Dispatch Card */}
      {currentRole === 'FREELANCER' && (
        <div className="gold-card highlight" style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: 800, textTransform: 'uppercase' }}>
                🚗 Next Home Service Appointment
              </div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-main)', marginTop: '2px' }}>
                Lina Al-Harthi
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-gold)', fontWeight: 600 }}>
                24K Gold Facial Treatment (14:30)
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} /> Al Olaya District, Villa 14, Riyadh (4.8 km away)
              </div>
            </div>
            <span style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--text-gold)', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
              +70 SAR Travel Fee
            </span>
          </div>
          <button
            onClick={() => alert('Launching GPS Navigation route to client location...')}
            className="gold-button"
            style={{ marginTop: '10px', padding: '8px', fontSize: '12px' }}
          >
            <NavigationIcon size={14} /> Start GPS Route to Client
          </button>
        </div>
      )}

      {/* For PROFESSIONAL: In-Chair Client Widget */}
      {currentRole === 'PROFESSIONAL' && (
        <div className="gold-card highlight" style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-gold)', fontWeight: 800, textTransform: 'uppercase' }}>
                ✂️ Currently In Your Chair
              </div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-main)', marginTop: '2px' }}>
                Sarah Jenkins
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Signature Hair Cut & Styling (45 min)
              </div>
            </div>
            <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#059669', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '8px' }}>
              ● IN CHAIR (30m)
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button
              onClick={() => alert('Service marked as completed! 35 SAR tip recorded.')}
              className="gold-button"
              style={{ flex: 1, padding: '8px', fontSize: '11px' }}
            >
              <CheckCircle2 size={14} /> Complete Service
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
                cursor: 'pointer'
              }}
            >
              Call Next
            </button>
          </div>
        </div>
      )}

      {/* Customer Confirmation Deadline Alert Widget (Owner, Manager, Staff) */}
      {currentRole !== 'PROFESSIONAL' && currentRole !== 'FREELANCER' && pendingBookings.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#d97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={14} /> Pending Customer Confirmations
            </span>
          </div>

          {pendingBookings.map((b) => (
            <div
              key={b.id}
              style={{
                background: '#fffbe6',
                border: '1px solid #fef08a',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>{b.customerName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {b.bookingItems[0]?.serviceName} ({b.scheduledTime})
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', color: '#d97706', fontWeight: 700, background: 'rgba(217, 119, 6, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                    ⏱ 35m left to accept
                  </span>
                </div>
              </div>

              {b.customerAllergies && b.customerAllergies.length > 0 && (
                <div style={{ marginTop: '6px', fontSize: '10px', color: '#dc2626', fontWeight: 700 }}>
                  ⚠️ Allergies: {b.customerAllergies.join(', ')}
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
                    borderRadius: '6px',
                    padding: '6px',
                    fontWeight: 700,
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  Accept Booking
                </button>
                <button
                  onClick={() => onRejectBooking(b.id)}
                  style={{
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontWeight: 600,
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Role-Specific Quick Actions Panel */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
          {currentRole === 'PROFESSIONAL' ? 'Stylist Station Actions' : currentRole === 'FREELANCER' ? 'Mobile Service Actions' : 'Operational Quick Actions'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={onOpenNewBookingModal}
            className="gold-button"
            style={{ padding: '10px', fontSize: '12px' }}
          >
            <PlusCircle size={15} />
            <span>+ New Booking</span>
          </button>

          {currentRole !== 'FREELANCER' && (
            <button
              onClick={onOpenAddWalkinModal}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-dark)',
                color: 'var(--text-main)',
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <UserPlus size={15} color="var(--text-gold)" />
              <span>+ Add Walk-In</span>
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
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <Car size={15} color="var(--text-gold)" />
              <span>Travel Rates</span>
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
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <DollarSign size={15} color="#2563eb" />
              <span>Financials</span>
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
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <Users size={15} color="#7c3aed" />
              <span>Team Roster</span>
            </button>
          )}
        </div>
      </div>

      {/* Recent Notifications / Activity Feed */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Recent Activity Feed
          </span>
          <button
            onClick={() => onNavigateToTab('settings')}
            style={{ background: 'none', border: 'none', fontSize: '11px', color: 'var(--text-gold)', fontWeight: 600, cursor: 'pointer' }}
          >
            View All
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {notifications.slice(0, 3).map((n) => (
            <div
              key={n.id}
              className="gold-card"
              style={{
                padding: '10px',
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
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-main)' }}>{n.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.message}</div>
              </div>
              <ChevronRight size={14} color="var(--text-muted)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
