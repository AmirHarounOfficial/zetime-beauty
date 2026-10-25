import React, { useState } from 'react';
import { Professional, Branch, DayOfWeek, ShiftType, BranchService } from '../../types/zetime';
import { UserPlus, X, Check, Clock, Home, Building2, Sparkles } from 'lucide-react';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  branches: Branch[];
  services: BranchService[];
  onAdd: (newProf: Professional) => void;
}

const PRESET_AVATARS = [
  { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', label: 'Sara' },
  { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', label: 'Mona' },
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', label: 'Lina' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', label: 'Ahmed' },
  { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', label: 'Karim' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', label: 'Yasmin' }
];

export const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isOpen,
  onClose,
  branches,
  services,
  onAdd
}) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('Senior Hair Stylist');
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id || '');
  const [photoUrl, setPhotoUrl] = useState(PRESET_AVATARS[0].url);
  const [isHomeServiceEligible, setIsHomeServiceEligible] = useState(true);
  const [shiftType, setShiftType] = useState<ShiftType>('MORNING');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [workingDays, setWorkingDays] = useState<DayOfWeek[]>([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Saturday'
  ]);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const allDays: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const toggleDay = (day: DayOfWeek) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleShiftTypeChange = (type: ShiftType) => {
    setShiftType(type);
    if (type === 'MORNING') {
      setStartTime('09:00');
      setEndTime('15:30');
    } else if (type === 'EVENING') {
      setStartTime('15:00');
      setEndTime('22:30');
    } else if (type === 'FULL_DAY') {
      setStartTime('10:00');
      setEndTime('19:00');
    } else if (type === 'SPLIT_SHIFT') {
      setStartTime('10:00');
      setEndTime('14:00');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const assignedBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];
    const shiftLabelMap: Record<ShiftType, string> = {
      MORNING: 'دوام صباحي',
      EVENING: 'دوام مسائي',
      FULL_DAY: 'دوام كامل',
      SPLIT_SHIFT: 'دوام مجزأ',
      CUSTOM: 'ساعات مخصصة'
    };

    const newProfessional: Professional = {
      id: `p-${Date.now()}`,
      name: name.trim(),
      title: title.trim(),
      photoUrl,
      branchId: assignedBranch?.id || 'b-1',
      branchName: assignedBranch?.name || 'Main Branch',
      assignedServiceIds: services.slice(0, 3).map((s) => s.id),
      isHomeServiceEligible,
      rating: 5.0,
      completedBookingsCount: 0,
      isWorkingToday: true,
      workingSchedule: `${startTime} - ${endTime} (${shiftLabelMap[shiftType]})`,
      scheduleConfig: {
        shiftType,
        shiftLabel: shiftLabelMap[shiftType],
        workingDays,
        startTime,
        endTime,
        allowsHomeService: isHomeServiceEligible,
        notes: notes || undefined
      }
    };

    onAdd(newProfessional);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(212, 175, 55, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-gold)'
              }}
            >
              <UserPlus size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: 'var(--text-main)', margin: 0 }}>
                إضافة عضو جديد للفريق
              </h3>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                تسجيل مصفف شعر، حلاق، أو أخصائية تجميل لصالونك
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '4px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Avatar Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              اختيار الصورة الشخصية
            </label>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {PRESET_AVATARS.map((av) => {
                const isSelected = photoUrl === av.url;
                return (
                  <img
                    key={av.url}
                    src={av.url}
                    alt={av.label}
                    onClick={() => setPhotoUrl(av.url)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: isSelected ? '2.5px solid var(--gold-primary)' : '1px solid var(--border-dark)',
                      boxShadow: isSelected ? '0 0 8px var(--gold-glow)' : 'none',
                      flexShrink: 0
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Full Name & Position */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                الاسم الكامل *
              </label>
              <input
                type="text"
                required
                placeholder="مثال: ليلى الغامدي"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                المسمى الوظيفي والتخصص *
              </label>
              <input
                type="text"
                required
                placeholder="مثال: أخصائية تصفيف شعر"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Assigned Branch Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              الفرع المخصص *
            </label>
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1.5px solid var(--border-gold)',
                background: '#fff',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.address})
                </option>
              ))}
            </select>
          </div>

          {/* Shift Schedule Type */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              نمط مناوبة العمل
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {(['MORNING', 'EVENING', 'FULL_DAY', 'SPLIT_SHIFT'] as ShiftType[]).map((st) => {
                const isSelected = shiftType === st;
                const labels: Record<string, string> = {
                  MORNING: 'صباحي',
                  EVENING: 'مسائي',
                  FULL_DAY: 'كامل',
                  SPLIT_SHIFT: 'مجزأ'
                };
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleShiftTypeChange(st)}
                    style={{
                      padding: '6px 4px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: 700,
                      border: isSelected ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-dark)',
                      background: isSelected ? 'var(--gold-gradient)' : '#ffffff',
                      color: isSelected ? '#000' : 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                  >
                    {labels[st]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start and End Times */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                بداية الوردية
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{ width: '100%', direction: 'ltr', textAlign: 'right' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                نهاية الوردية
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={{ width: '100%', direction: 'ltr', textAlign: 'right' }}
              />
            </div>
          </div>

          {/* Working Days Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '5px' }}>
              أيام العمل الأسبوعية
            </label>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {allDays.map((d) => {
                const isSelected = workingDays.includes(d);
                const dayLabelsArabic: Record<DayOfWeek, string> = {
                  Sunday: 'الأحد',
                  Monday: 'الإثنين',
                  Tuesday: 'الثلاثاء',
                  Wednesday: 'الأربعاء',
                  Thursday: 'الخميس',
                  Friday: 'الجمعة',
                  Saturday: 'السبت'
                };
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(d)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: 700,
                      border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-dark)',
                      background: isSelected ? 'rgba(212, 175, 55, 0.18)' : '#ffffff',
                      color: isSelected ? 'var(--text-gold)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    {dayLabelsArabic[d]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Home Service Eligibility Toggle */}
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              border: isHomeServiceEligible ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-dark)',
              background: isHomeServiceEligible ? 'rgba(212, 175, 55, 0.06)' : '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Home size={16} color={isHomeServiceEligible ? 'var(--text-gold)' : 'var(--text-muted)'} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>
                  إتاحة تقديم الخدمات المنزلية
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  مؤهل للخروج في مواعيد التجميل المنزلية VIP
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isHomeServiceEligible}
              onChange={(e) => setIsHomeServiceEligible(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={onClose}
              className="secondary-button"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="gold-button"
              style={{ flex: 2 }}
            >
              <Check size={16} /> تسجيل الموظف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
