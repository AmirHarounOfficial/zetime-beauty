import React from 'react';
import { Booking, ProviderRole } from '../types/zetime';
import { hasPermission } from '../utils/permissions';
import { TrendingUp, ArrowLeft, AlertCircle, Lock } from 'lucide-react';

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

  return (
    <div style={{ padding: '14px' }}>
      {onBackToSettings && (
        <button
          onClick={onBackToSettings}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-gold)',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '8px'
          }}
        >
          <ArrowLeft size={14} /> Back to Settings Hub
        </button>
      )}

      <div style={{ marginBottom: '12px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-gold)' }}>
          Business Analytics
        </h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Operational metrics & branch performance
        </span>
      </div>

      {!canViewAnalytics ? (
        <div className="gold-card" style={{ padding: '24px', textAlign: 'center' }}>
          <Lock size={32} color="#dc2626" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)' }}>
            Financial Data Restricted
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            The <strong>{currentRole.replace('_', ' ')}</strong> role does not have permission to view store-wide revenue analytics. Please log in as Business Owner or Branch Manager.
          </div>
        </div>
      ) : (
        <>
          {/* Revenue Card */}
          <div className="gold-card highlight" style={{ marginBottom: '12px', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Gross Revenue Today
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-gold)', marginTop: '4px' }}>
              {totalRevenue} <span style={{ fontSize: '14px', fontWeight: 400 }}>SAR</span>
            </div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
              <TrendingUp size={14} /> +18.4% compared to yesterday
            </div>
          </div>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            <div className="gold-card" style={{ padding: '10px' }}>
              <div style={{ color: '#10b981', fontSize: '11px', fontWeight: 700 }}>Completed</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>{completed}</div>
            </div>

            <div className="gold-card" style={{ padding: '10px' }}>
              <div style={{ color: '#059669', fontSize: '11px', fontWeight: 700 }}>In Service</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>{inService}</div>
            </div>
          </div>

          {/* Popular Services Chart */}
          <div className="gold-card">
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-gold)', marginBottom: '10px' }}>
              Top Booked Services
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-main)', marginBottom: '4px' }}>
                  <span>24K Gold Facial Treatment</span>
                  <span style={{ fontWeight: 700 }}>42%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '42%', height: '100%', background: 'var(--gold-gradient)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-main)', marginBottom: '4px' }}>
                  <span>Luxury Haircut & Blowdry</span>
                  <span style={{ fontWeight: 700 }}>35%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '35%', height: '100%', background: 'var(--gold-gradient)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-main)', marginBottom: '4px' }}>
                  <span>Gel Nails & Spa Manicure</span>
                  <span style={{ fontWeight: 700 }}>23%</span>
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
