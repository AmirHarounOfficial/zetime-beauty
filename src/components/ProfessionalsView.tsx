import React, { useState } from 'react';
import { Professional, Branch, ProviderRole, EmployeeScheduleConfig, ShiftType, BranchService } from '../types/zetime';
import { hasPermission } from '../utils/permissions';
import {
  Star,
  Home,
  ArrowRightLeft,
  ArrowRight,
  Lock,
  AlertCircle,
  Clock,
  Sun,
  Moon,
  Split,
  Sparkles,
  UserPlus,
  Edit3
} from 'lucide-react';
import { EditShiftModal } from './Modals/EditShiftModal';
import { AddStaffModal } from './Modals/AddStaffModal';
import { EditStaffModal } from './Modals/EditStaffModal';

interface ProfessionalsViewProps {
  professionals: Professional[];
  branches: Branch[];
  currentRole: ProviderRole;
  services?: BranchService[];
  onTransferBranch: (profId: string, targetBranchId: string, targetBranchName: string) => void;
  onToggleHomeEligibility: (profId: string) => void;
  onUpdateSchedule?: (profId: string, updatedConfig: EmployeeScheduleConfig) => void;
  onAddProfessional?: (newProf: Professional) => void;
  onUpdateProfessional?: (updatedProf: Professional) => void;
  onDeleteProfessional?: (profId: string) => void;
  onBackToSettings?: () => void;
}

export const ProfessionalsView: React.FC<ProfessionalsViewProps> = ({
  professionals,
  branches,
  currentRole,
  services = [],
  onTransferBranch,
  onToggleHomeEligibility,
  onUpdateSchedule,
  onAddProfessional,
  onUpdateProfessional,
  onDeleteProfessional,
  onBackToSettings
}) => {
  const [selectedProfForTransfer, setSelectedProfForTransfer] = useState<Professional | null>(null);
  const [selectedProfForShift, setSelectedProfForShift] = useState<Professional | null>(null);
  const [selectedProfForEdit, setSelectedProfForEdit] = useState<Professional | null>(null);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
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
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#fef3c7', color: '#b45309', fontSize: '9.5px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px' }}>
            <Sun size={11} /> صباحي ({config.startTime} - {config.endTime})
          </span>
        );
      case 'EVENING':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#e0e7ff', color: '#4338ca', fontSize: '9.5px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px' }}>
            <Moon size={11} /> مسائي ({config.startTime} - {config.endTime})
          </span>
        );
      case 'SPLIT_SHIFT':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#f3e8ff', color: '#7e22ce', fontSize: '9.5px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px' }}>
            <Split size={11} /> مجزأ ({config.startTime}-{config.endTime} و {config.splitStartTime}-{config.splitEndTime})
          </span>
        );
      case 'FULL_DAY':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--text-gold)', fontSize: '9.5px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px' }}>
            <Clock size={11} /> دوام كامل ({config.startTime} - {config.endTime})
          </span>
        );
      default:
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#ecfdf5', color: '#047857', fontSize: '9.5px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px' }}>
            <Sparkles size={11} /> مخصص ({config.startTime} - {config.endTime})
          </span>
        );
    }
  };

  const daysArabicMap: Record<string, { label: string; full: string }> = {
    Sunday: { label: 'أحد', full: 'Sunday' },
    Monday: { label: 'إثنين', full: 'Monday' },
    Tuesday: { label: 'ثلاثاء', full: 'Tuesday' },
    Wednesday: { label: 'أربعاء', full: 'Wednesday' },
    Thursday: { label: 'خميس', full: 'Thursday' },
    Friday: { label: 'جمعة', full: 'Friday' },
    Saturday: { label: 'سبت', full: 'Saturday' }
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

      {/* Header and Add Staff Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-gold)', margin: 0 }}>
            طاقم العمل وجداول المناوبات
          </h2>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            ساعات الدوام، المناوبات، والخدمة الخارجية ({professionals.length} موظفين)
          </span>
        </div>

        {canManageStaff && (
          <button
            onClick={() => setIsAddStaffOpen(true)}
            style={{
              background: 'var(--gold-gradient)',
              color: '#0d0d10',
              border: 'none',
              borderRadius: '8px',
              padding: '7px 12px',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 8px var(--gold-glow)',
              fontFamily: 'var(--font-body)'
            }}
          >
            <UserPlus size={14} /> إضافة موظف
          </button>
        )}
      </div>

      {!canTransfer && (
        <div className="permission-denied-box" style={{ marginBottom: '10px' }}>
          <AlertCircle size={16} color="#dc2626" />
          <span>تنبيه: ميزة نقل الموظفين بين الفروع متاحة فقط لمالك المنشأة.</span>
        </div>
      )}

      {/* Shift Filter Chips */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '10px' }}>
        {(['ALL', 'MORNING', 'EVENING', 'SPLIT_SHIFT', 'FULL_DAY'] as const).map((filter) => {
          const isSelected = shiftFilter === filter;
          const labelMap: Record<string, string> = {
            ALL: 'كافة الطاقم',
            MORNING: 'صباحي',
            EVENING: 'مسائي',
            SPLIT_SHIFT: 'دوام مجزأ',
            FULL_DAY: 'دوام كامل'
          };
          return (
            <button
              key={filter}
              onClick={() => setShiftFilter(filter)}
              style={{
                padding: '4px 11px',
                borderRadius: '16px',
                fontSize: '10.5px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-dark)',
                background: isSelected ? 'var(--gold-gradient)' : '#ffffff',
                color: isSelected ? '#000000' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)'
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
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-primary)', flexShrink: 0 }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--text-main)' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-gold)', fontWeight: 700 }}>{p.title}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#d97706', fontSize: '11px', fontWeight: 800 }}>
                    <Star size={12} fill="#d97706" /> {p.rating}
                  </div>
                </div>

                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  📍 {p.branchName}
                </div>

                {/* Shift badge & Hours */}
                <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  {getShiftBadge(p.scheduleConfig)}
                </div>

                {/* Working Days Pill Row */}
                {p.scheduleConfig?.workingDays && p.scheduleConfig.workingDays.length > 0 && (
                  <div style={{ display: 'flex', gap: '3px', marginTop: '6px', flexWrap: 'wrap' }}>
                    {Object.entries(daysArabicMap).map(([dayKey, dayVal]) => {
                      const isWorking = p.scheduleConfig?.workingDays.includes(dayKey as any);
                      return (
                        <span
                          key={dayKey}
                          style={{
                            fontSize: '9px',
                            fontWeight: 700,
                            padding: '1px 5px',
                            borderRadius: '3px',
                            background: isWorking ? 'rgba(212, 175, 55, 0.15)' : '#f1f5f9',
                            color: isWorking ? 'var(--text-gold)' : '#94a3b8'
                          }}
                        >
                          {dayVal.label}
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
                    gap: '4px',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  <Home size={10} /> {p.isHomeServiceEligible ? 'مؤهلة لزيارات منزلية' : 'داخل الصالون فقط'}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {canManageStaff && (
                  <button
                    onClick={() => setSelectedProfForEdit(p)}
                    style={{
                      background: '#f8fafc',
                      color: 'var(--text-main)',
                      border: '1px solid var(--border-dark)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    <Edit3 size={10} color="var(--text-gold)" /> تعديل الملف
                  </button>
                )}

                <button
                  onClick={() => setSelectedProfForShift(p)}
                  style={{
                    background: '#f8fafc',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-dark)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  <Clock size={10} color="var(--text-gold)" /> المناوبة
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
                      fontSize: '10.5px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    <ArrowRightLeft size={10} /> نقل
                  </button>
                ) : (
                  <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Lock size={9} /> خاص بالمالك
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
            <div className="modal-drag-handle" />
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontSize: '15px', marginBottom: '8px' }}>
              نقل الموظف {selectedProfForTransfer.name}
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              اختر الفرع المطلوب للنقل إليه:
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
                    textAlign: 'right',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '12.5px', color: 'var(--text-main)' }}>{b.name}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{b.address}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedProfForTransfer(null)}
              style={{
                width: '100%',
                padding: '9px',
                marginTop: '12px',
                borderRadius: '8px',
                border: 'none',
                background: '#f1f5f9',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '11.5px',
                fontFamily: 'var(--font-body)'
              }}
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {isAddStaffOpen && (
        <AddStaffModal
          isOpen={isAddStaffOpen}
          onClose={() => setIsAddStaffOpen(false)}
          branches={branches}
          services={services}
          onAdd={(newProf) => {
            if (onAddProfessional) {
              onAddProfessional(newProf);
            }
          }}
        />
      )}

      {/* Edit Staff Profile Modal */}
      {selectedProfForEdit && (
        <EditStaffModal
          isOpen={Boolean(selectedProfForEdit)}
          onClose={() => setSelectedProfForEdit(null)}
          professional={selectedProfForEdit}
          branches={branches}
          onSave={(updated) => {
            if (onUpdateProfessional) {
              onUpdateProfessional(updated);
            }
            setSelectedProfForEdit(null);
          }}
          onDelete={(id) => {
            if (onDeleteProfessional) {
              onDeleteProfessional(id);
            }
            setSelectedProfForEdit(null);
          }}
        />
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
