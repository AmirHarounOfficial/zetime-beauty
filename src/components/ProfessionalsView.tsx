import React, { useState } from 'react';
import { Professional, Branch, ProviderRole } from '../types/zetime';
import { hasPermission } from '../utils/permissions';
import { Star, Home, ArrowRightLeft, ArrowLeft, Lock, AlertCircle } from 'lucide-react';

interface ProfessionalsViewProps {
  professionals: Professional[];
  branches: Branch[];
  currentRole: ProviderRole;
  onTransferBranch: (profId: string, targetBranchId: string, targetBranchName: string) => void;
  onToggleHomeEligibility: (profId: string) => void;
  onBackToSettings?: () => void;
}

export const ProfessionalsView: React.FC<ProfessionalsViewProps> = ({
  professionals,
  branches,
  currentRole,
  onTransferBranch,
  onToggleHomeEligibility,
  onBackToSettings
}) => {
  const [selectedProf, setSelectedProf] = useState<Professional | null>(null);
  const canTransfer = hasPermission(currentRole, 'TRANSFER_PROFESSIONAL');

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
          Branch Staff & Professionals
        </h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Role-based assignments & home-service eligibility
        </span>
      </div>

      {!canTransfer && (
        <div className="permission-denied-box">
          <AlertCircle size={16} color="#dc2626" />
          <span>Role Restriction: Professional branch transfers are restricted to Business Owners.</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {professionals.map((p) => (
          <div key={p.id} className="gold-card" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <img
                src={p.photoUrl}
                alt={p.name}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-primary)' }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#d97706', fontSize: '11px', fontWeight: 700 }}>
                    <Star size={12} fill="#d97706" /> {p.rating}
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-gold)', fontWeight: 600, marginTop: '1px' }}>{p.title}</div>

                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  📍 {p.branchName}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '10px',
                paddingTop: '8px',
                borderTop: '1px solid var(--border-dark)',
                fontSize: '11px'
              }}
            >
              <button
                onClick={() => onToggleHomeEligibility(p.id)}
                style={{
                  background: p.isHomeServiceEligible ? 'rgba(212, 175, 55, 0.15)' : '#f1f5f9',
                  color: p.isHomeServiceEligible ? 'var(--text-gold)' : 'var(--text-muted)',
                  border: p.isHomeServiceEligible ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid var(--border-dark)',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Home size={10} /> {p.isHomeServiceEligible ? 'Home Service Eligible' : 'In-Salon Only'}
              </button>

              {canTransfer ? (
                <button
                  onClick={() => setSelectedProf(p)}
                  style={{
                    background: '#f1f5f9',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-dark)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <ArrowRightLeft size={10} /> Transfer Branch
                </button>
              ) : (
                <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <Lock size={9} /> Owner Only
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Transfer Modal */}
      {selectedProf && canTransfer && (
        <div className="modal-overlay" onClick={() => setSelectedProf(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ color: 'var(--text-gold)', fontSize: '15px' }}>Transfer Professional Branch</h3>
              <button onClick={() => setSelectedProf(null)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '16px', fontWeight: 700 }}>✕</button>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-main)', marginBottom: '12px' }}>
              Transfer <strong>{selectedProf.name}</strong> to a different branch. Future availability will use the destination branch.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {branches.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    onTransferBranch(selectedProf.id, b.id, b.name);
                    setSelectedProf(null);
                  }}
                  style={{
                    background: b.name === selectedProf.branchName ? 'rgba(212, 175, 55, 0.15)' : '#f8fafc',
                    color: 'var(--text-main)',
                    border: b.name === selectedProf.branchName ? '1px solid var(--border-gold)' : '1px solid var(--border-dark)',
                    padding: '10px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    fontWeight: b.name === selectedProf.branchName ? 700 : 400,
                    cursor: 'pointer'
                  }}
                >
                  🏢 {b.name} {b.name === selectedProf.branchName ? '(Current)' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
