import React, { useState } from 'react';
import { Professional, Branch, ProviderRole, EmployeeScheduleConfig, ShiftType } from '../types/zetime';
import { hasPermission } from '../utils/permissions';
import {
  Star,
  Home,
  ArrowRightLeft,
  ArrowLeft,
  Lock,
  AlertCircle,
  Clock,
  Sun,
  Moon,
  Split,
  Calendar,
  Sparkles
} from 'lucide-react';
import { EditShiftModal } from './Modals/EditShiftModal';

interface ProfessionalsViewProps {
  professionals: Professional[];
  branches: Branch[];
  currentRole: ProviderRole;
  onTransferBranch: (profId: string, targetBranchId: string, targetBranchName: string) => void;
  onToggleHomeEligibility: (profId: string) => void;
  onUpdateSchedule?: (profId: string, updatedConfig: EmployeeScheduleConfig) => void;
  onBackToSettings?: () => void;
}

export const ProfessionalsView: React.FC<ProfessionalsViewProps> = ({
  professionals,
  branches,
  currentRole,
  onTransferBranch,
  onToggleHomeEligibility,
  onUpdateSchedule,
  onBackToSettings
}) => {
  const [selectedProfForTransfer, setSelectedProfForTransfer] = useState<Professional | null>(null);
  const [selectedProfForShift, setSelectedProfForShift] = useState<Professional | null>(null);
  const [shiftFilter, setShiftFilter] = useState<'ALL' | ShiftType>('ALL');

  const canTransfer = hasPermission(currentRole, 'TRANSFER_PROFESSIONAL');
  const canManageStaff = hasPermission(currentRole, 'MANAGE_STAFF');

  const filteredProfessionals = professionals.filter((p) => {
    if (shiftFilter === 'ALL') return true;
    return p.scheduleConfig?.shiftType === shiftFilter;
  });

  const getShiftBadge = (config?: EmployeeScheduleConfig) => {
    if (!config) return null;
    switch (config.shiftType) {
      case 'MORNING':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#fef3c7', color: '#b45309', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
            <Sun size={10} /> Morning ({config.startTime}-{config.endTime})
          </span>
        );
      case 'EVENING':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#e0e7ff', color: '#4338ca', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
            <Moon size={10} /> Evening ({config.startTime}-{config.endTime})
          </span>
        );
      case 'SPLIT_SHIFT':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#f3e8ff', color: '#7e22ce', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
            <Split size={10} /> Split ({config.startTime}-{config.endTime} & {config.splitStartTime}-{config.splitEndTime})
          </span>
        );
      case 'FULL_DAY':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--text-gold)', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
            <Clock size={10} /> Full Day ({config.startTime}-{config.endTime})
          </span>
        );
      default:
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#ecfdf5', color: '#047857', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
            <Sparkles size={10} /> Custom ({config.startTime}-{config.endTime})
          </span>
        );
    }
  };

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
          Branch Staff & Shift Rosters
        </h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Working hours, shift rotations, and mobile home-service dispatch
        </span>
      </div>

      {!canTransfer && (
        <div className="permission-denied-box" style={{ marginBottom: '10px' }}>
          <AlertCircle size={16} color="#dc2626" />
          <span>Role Notice: Only Business Owners can transfer staff across branch locations.</span>
        </div>
      )}

      {/* Shift Filter Chips */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '10px' }}>
        {(['ALL', 'MORNING', 'EVENING', 'SPLIT_SHIFT', 'FULL_DAY'] as const).map((filter) => {
          const isSelected = shiftFilter === filter;
          const labelMap: Record<string, string> = {
            ALL: 'All Staff',
            MORNING: 'Morning',
            EVENING: 'Evening',
            SPLIT_SHIFT: 'Split Shift',
            FULL_DAY: 'Full Day'
          };
          return (
            <button
              key={filter}
              onClick={() => setShiftFilter(filter)}
              style={{
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '10px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-dark)',
                background: isSelected ? 'var(--gold-gradient)' : '#ffffff',
                color: isSelected ? '#000000' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              {labelMap[filter]}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredProfessionals.map((p) => (
          <div key={p.id} className="gold-card" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <img
                src={p.photoUrl}
                alt={p.name}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-primary)' }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-gold)', fontWeight: 600 }}>{p.title}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#d97706', fontSize: '11px', fontWeight: 700 }}>
                    <Star size={12} fill="#d97706" /> {p.rating}
                  </div>
                </div>

                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  📍 {p.branchName}
                </div>

                {/* Shift badge & Hours */}
                <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  {getShiftBadge(p.scheduleConfig)}
                </div>

                {/* Working Days Pill Row */}
                {p.scheduleConfig?.workingDays && p.scheduleConfig.workingDays.length > 0 && (
                  <div style={{ display: 'flex', gap: '3px', marginTop: '6px', flexWrap: 'wrap' }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => {
                      const fullDayName = {
                        Sun: 'Sunday',
                        Mon: 'Monday',
                        Tue: 'Tuesday',
                        Wed: 'Wednesday',
                        Thu: 'Thursday',
                        Fri: 'Friday',
                        Sat: 'Saturday'
                      }[d];
                      const isWorking = p.scheduleConfig?.workingDays.includes(fullDayName as any);
                      return (
                        <span
                          key={d}
                          style={{
                            fontSize: '8px',
                            fontWeight: 700,
                            padding: '1px 4px',
                            borderRadius: '3px',
                            background: isWorking ? 'rgba(212, 175, 55, 0.15)' : '#f1f5f9',
                            color: isWorking ? 'var(--text-gold)' : '#94a3b8'
                          }}
                        >
                          {d}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '10px',
                paddingTop: '8px',
                borderTop: '1px solid var(--border-dark)',
                fontSize: '11px',
                flexWrap: 'wrap',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
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
                  <Home size={10} /> {p.isHomeServiceEligible ? 'Home Dispatch' : 'In-Salon Only'}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                {/* Edit Shifts Button */}
                <button
                  onClick={() => setSelectedProfForShift(p)}
                  style={{
                    background: '#f8fafc',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-dark)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <Clock size={10} color="var(--text-gold)" /> Edit Shift & Hours
                </button>

                {canTransfer ? (
                  <button
                    onClick={() => setSelectedProfForTransfer(p)}
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
                    <ArrowRightLeft size={10} /> Transfer
                  </button>
                ) : (
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Lock size={9} /> Owner Only
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transfer Modal */}
      {selectedProfForTransfer && canTransfer && (
        <div className="modal-overlay" onClick={() => setSelectedProfForTransfer(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontSize: '15px', marginBottom: '8px' }}>
              Transfer {selectedProfForTransfer.name}
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Select target branch location:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {branches.map((b) => (
                <button
                  key={b.id}
                  disabled={b.id === selectedProfForTransfer.branchId}
                  onClick={() => {
                    onTransferBranch(selectedProfForTransfer.id, b.id, b.name);
                    setSelectedProfForTransfer(null);
                  }}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-dark)',
                    background: b.id === selectedProfForTransfer.branchId ? '#f1f5f9' : '#ffffff',
                    cursor: b.id === selectedProfForTransfer.branchId ? 'not-allowed' : 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-main)' }}>{b.name}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{b.address}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedProfForTransfer(null)}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '12px',
                borderRadius: '6px',
                border: 'none',
                background: '#f1f5f9',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '11px'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Shift Editor Modal */}
      {selectedProfForShift && (
        <EditShiftModal
          isOpen={true}
          onClose={() => setSelectedProfForShift(null)}
          professional={selectedProfForShift}
          onSaveSchedule={(profId, updatedConfig) => {
            if (onUpdateSchedule) {
              onUpdateSchedule(profId, updatedConfig);
            }
            setSelectedProfForShift(null);
          }}
        />
      )}
    </div>
  );
};
