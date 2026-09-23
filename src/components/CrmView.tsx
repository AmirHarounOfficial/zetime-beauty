import React, { useState } from 'react';
import { CustomerProfile } from '../types/zetime';
import { TabType } from './Navigation';
import { Search, AlertTriangle, ArrowLeft } from 'lucide-react';

interface CrmViewProps {
  customers: CustomerProfile[];
  onBackToSettings?: () => void;
}

export const CrmView: React.FC<CrmViewProps> = ({ customers, onBackToSettings }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(customers[0] || null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

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
          Customer CRM & Beauty Profiles
        </h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Preferences, allergy tracking & spending history
        </span>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Search by customer name or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            background: '#ffffff',
            color: 'var(--text-main)',
            border: '1px solid var(--border-dark)',
            padding: '8px 10px 8px 30px',
            borderRadius: '8px',
            fontSize: '12px',
            outline: 'none'
          }}
        />
      </div>

      {/* Customer List Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredCustomers.map((c) => (
          <div
            key={c.id}
            className="gold-card"
            style={{
              padding: '12px',
              borderColor: selectedCustomer?.id === c.id ? 'var(--border-gold)' : 'var(--border-dark)',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedCustomer(c)}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <img
                src={c.photoUrl}
                alt={c.name}
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>{c.name}</div>
                  <span style={{ fontWeight: 800, fontSize: '12px', color: 'var(--text-gold)' }}>
                    {c.totalSpent} SAR
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  📞 {c.phone}
                </div>
              </div>
            </div>

            {/* Allergy Tags */}
            {c.allergies.length > 0 && (
              <div style={{ display: 'flex', gap: '4px', marginTop: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10px', color: '#dc2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <AlertTriangle size={10} /> Allergy:
                </span>
                {c.allergies.map((a) => (
                  <span
                    key={a}
                    style={{
                      background: 'rgba(220, 38, 38, 0.12)',
                      color: '#dc2626',
                      fontSize: '9px',
                      fontWeight: 700,
                      padding: '1px 5px',
                      borderRadius: '4px'
                    }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detailed Customer Profile Modal */}
      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ color: 'var(--text-gold)', fontSize: '15px' }}>Beauty Profile — {selectedCustomer.name}</h3>
              <button onClick={() => setSelectedCustomer(null)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '16px', fontWeight: 700 }}>✕</button>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
              <img
                src={selectedCustomer.photoUrl}
                alt={selectedCustomer.name}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-primary)' }}
              />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>{selectedCustomer.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{selectedCustomer.email}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-gold)', fontWeight: 700, marginTop: '2px' }}>
                  VIP Client • {selectedCustomer.totalBookings} Completed Bookings
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', marginBottom: '10px', fontSize: '12px', border: '1px solid var(--border-dark)' }}>
              <div style={{ color: 'var(--text-gold)', fontWeight: 700, marginBottom: '4px' }}>💖 Service Preferences:</div>
              {selectedCustomer.preferences.map((p, i) => (
                <div key={i} style={{ color: 'var(--text-main)', fontSize: '11px' }}>• {p}</div>
              ))}
            </div>

            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '12px', border: '1px solid var(--border-dark)' }}>
              <div style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>Operational Notes:</div>
              <div style={{ color: 'var(--text-main)', fontSize: '11px' }}>{selectedCustomer.recentNotes}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
