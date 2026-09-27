import React, { useState } from 'react';
import { Professional, ShiftType, DayOfWeek, EmployeeScheduleConfig } from '../../types/zetime';
import { X, Clock, Sun, Moon, Sparkles, Check, Home, Split, Calendar } from 'lucide-react';

interface EditShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  professional: Professional;
  onSaveSchedule: (profId: string, updatedConfig: EmployeeScheduleConfig) => void;
}

const ALL_DAYS: DayOfWeek[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const EditShiftModal: React.FC<EditShiftModalProps> = ({
  isOpen,
  onClose,
  professional,
  onSaveSchedule
}) => {
  const currentConfig: EmployeeScheduleConfig = professional.scheduleConfig || {
    shiftType: 'FULL_DAY',
    shiftLabel: 'Full Day Shift',
    workingDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    startTime: '10:00',
    endTime: '19:00',
    allowsHomeService: professional.isHomeServiceEligible,
    notes: ''
  };

  const [shiftType, setShiftType] = useState<ShiftType>(currentConfig.shiftType);
  const [startTime, setStartTime] = useState(currentConfig.startTime || '09:00');
  const [endTime, setEndTime] = useState(currentConfig.endTime || '17:00');
  const [splitStartTime, setSplitStartTime] = useState(currentConfig.splitStartTime || '17:00');
  const [splitEndTime, setSplitEndTime] = useState(currentConfig.splitEndTime || '21:00');
  const [workingDays, setWorkingDays] = useState<DayOfWeek[]>(currentConfig.workingDays || []);
  const [allowsHomeService, setAllowsHomeService] = useState(currentConfig.allowsHomeService);
  const [notes, setNotes] = useState(currentConfig.notes || '');

  if (!isOpen) return null;

  const handleSelectShiftType = (type: ShiftType) => {
    setShiftType(type);
    if (type === 'MORNING') {
      setStartTime('09:00');
      setEndTime('15:30');
    } else if (type === 'EVENING') {
      setStartTime('15:00');
      setEndTime('22:30');
    } else if (type === 'FULL_DAY') {
      setStartTime('10:00');
      setEndTime('18:30');
    } else if (type === 'SPLIT_SHIFT') {
      setStartTime('10:00');
      setEndTime('14:00');
      setSplitStartTime('17:00');
      setSplitEndTime('21:00');
    }
  };

  const handleToggleDay = (day: DayOfWeek) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const shiftLabels: Record<ShiftType, string> = {
      MORNING: 'Morning Shift',
      EVENING: 'Evening Shift',
      FULL_DAY: 'Full Day Shift',
      SPLIT_SHIFT: 'Split Shift',
      CUSTOM: 'Custom Hours'
    };

    const newConfig: EmployeeScheduleConfig = {
      shiftType,
      shiftLabel: shiftLabels[shiftType],
      workingDays,
      startTime,
      endTime,
      splitStartTime: shiftType === 'SPLIT_SHIFT' ? splitStartTime : undefined,
      splitEndTime: shiftType === 'SPLIT_SHIFT' ? splitEndTime : undefined,
      allowsHomeService,
      notes
    };

    onSaveSchedule(professional.id, newConfig);
    onClose();
  };

  const shiftOptions: { type: ShiftType; label: string; icon: React.ReactNode; defaultHours: string }[] = [
    { type: 'MORNING', label: 'Morning Shift', icon: <Sun size={14} color="#d97706" />, defaultHours: '09:00 - 15:30' },
    { type: 'EVENING', label: 'Evening Shift', icon: <Moon size={14} color="#4338ca" />, defaultHours: '15:00 - 22:30' },
    { type: 'FULL_DAY', label: 'Full Day', icon: <Clock size={14} color="var(--gold-dark)" />, defaultHours: '10:00 - 18:30' },
    { type: 'SPLIT_SHIFT', label: 'Split Shift', icon: <Split size={14} color="#7c3aed" />, defaultHours: '10-14 & 17-21' },
    { type: 'CUSTOM', label: 'Custom Hours', icon: <Sparkles size={14} color="#059669" />, defaultHours: 'Flexible' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src={professional.photoUrl}
              alt={professional.name}
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-primary)' }}
            />
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: 'var(--text-main)', margin: 0 }}>
                {professional.name}
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-gold)', fontWeight: 600 }}>
                {professional.title} • Working Hours & Shifts
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Shift Type Selection */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Select Working Shift Model
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
              {shiftOptions.map((opt) => {
                const isSelected = shiftType === opt.type;
                return (
                  <button
                    type="button"
                    key={opt.type}
                    onClick={() => handleSelectShiftType(opt.type)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: isSelected ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-dark)',
                      background: isSelected ? 'rgba(212, 175, 55, 0.12)' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div>{opt.icon}</div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: isSelected ? 'var(--text-gold)' : 'var(--text-main)' }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{opt.defaultHours}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Pickers */}
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-dark)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
              Shift Working Hours
            </div>

            {shiftType === 'SPLIT_SHIFT' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                      First Session Start
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                      First Session End
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                      Second Session Start
                    </label>
                    <input
                      type="time"
                      value={splitStartTime}
                      onChange={(e) => setSplitStartTime(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                      Second Session End
                    </label>
                    <input
                      type="time"
                      value={splitEndTime}
                      onChange={(e) => setSplitEndTime(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                    Shift Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                    Shift End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Working Days of the Week */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Assigned Working Days ({workingDays.length}/7)
              </label>
              <button
                type="button"
                onClick={() => setWorkingDays(workingDays.length === 7 ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'] : ALL_DAYS)}
                style={{ background: 'none', border: 'none', fontSize: '10px', color: 'var(--text-gold)', fontWeight: 700, cursor: 'pointer' }}
              >
                {workingDays.length === 7 ? 'Standard Weekdays' : 'Select All Days'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {ALL_DAYS.map((day) => {
                const isActive = workingDays.includes(day);
                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => handleToggleDay(day)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '16px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isActive ? '1px solid var(--gold-primary)' : '1px solid var(--border-dark)',
                      background: isActive ? 'var(--gold-gradient)' : '#ffffff',
                      color: isActive ? '#000000' : 'var(--text-muted)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {day.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Home Service Toggle */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderRadius: '8px',
              background: allowsHomeService ? 'rgba(212, 175, 55, 0.08)' : '#f8fafc',
              border: allowsHomeService ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid var(--border-dark)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Home size={16} color={allowsHomeService ? 'var(--text-gold)' : 'var(--text-muted)'} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>
                  Home Service Eligible on Shift
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  Allow dispatch for home & mobile appointments
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAllowsHomeService(!allowsHomeService)}
              style={{
                padding: '4px 10px',
                borderRadius: '14px',
                border: 'none',
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
                background: allowsHomeService ? '#10b981' : '#cbd5e1',
                color: '#ffffff'
              }}
            >
              {allowsHomeService ? 'ENABLED' : 'SALON ONLY'}
            </button>
          </div>

          {/* Special Notes / Instructions */}
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Special Notes / Station Assignment
            </label>
            <input
              type="text"
              placeholder="e.g. Chair 3, VIP mobile kit, Sunday off"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border-dark)',
                background: '#f1f5f9',
                color: 'var(--text-main)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gold-btn"
              style={{
                flex: 2,
                padding: '10px',
                fontSize: '12px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Check size={14} /> Save Shift & Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
