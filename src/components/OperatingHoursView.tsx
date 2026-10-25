import React, { useState } from 'react';
import { Branch, DayOfWeek, DaySchedule, HomeServiceDaySchedule } from '../types/zetime';
import {
  ArrowRight,
  Clock,
  Home,
  Building2,
  Check,
  Calendar,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface OperatingHoursViewProps {
  selectedBranch: Branch;
  onUpdateBranchSchedule: (
    branchId: string,
    operatingSchedule: DaySchedule[],
    homeServiceSchedule: HomeServiceDaySchedule[]
  ) => void;
  onBackToSettings: () => void;
}

const DAYS_OF_WEEK: DayOfWeek[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const ARABIC_DAYS: Record<DayOfWeek, string> = {
  Sunday: 'الأحد',
  Monday: 'الإثنين',
  Tuesday: 'الثلاثاء',
  Wednesday: 'الأربعاء',
  Thursday: 'الخميس',
  Friday: 'الجمعة',
  Saturday: 'السبت'
};

export const OperatingHoursView: React.FC<OperatingHoursViewProps> = ({
  selectedBranch,
  onUpdateBranchSchedule,
  onBackToSettings
}) => {
  const [activeTab, setActiveTab] = useState<'salon' | 'home'>('salon');
  const [savedNotification, setSavedNotification] = useState(false);

  // التهيئة أو استخدام الجداول الافتراضية
  const [salonSchedule, setSalonSchedule] = useState<DaySchedule[]>(() => {
    if (selectedBranch.operatingSchedule && selectedBranch.operatingSchedule.length > 0) {
      return selectedBranch.operatingSchedule;
    }
    return DAYS_OF_WEEK.map((day) => ({
      day,
      isOpen: true,
      openTime: day === 'Friday' ? '13:30' : '10:00',
      closeTime: day === 'Thursday' || day === 'Friday' ? '23:00' : '22:00'
    }));
  });

  const [homeSchedule, setHomeSchedule] = useState<HomeServiceDaySchedule[]>(() => {
    if (selectedBranch.homeServiceSchedule && selectedBranch.homeServiceSchedule.length > 0) {
      return selectedBranch.homeServiceSchedule;
    }
    return DAYS_OF_WEEK.map((day) => ({
      day,
      isAvailable: day !== 'Sunday' && day !== 'Monday',
      startTime: day === 'Friday' ? '14:00' : '11:00',
      endTime: day === 'Thursday' || day === 'Friday' ? '22:00' : '21:00'
    }));
  });

  // دوام الصالون
  const handleToggleSalonDay = (day: DayOfWeek) => {
    setSalonSchedule((prev) =>
      prev.map((item) => (item.day === day ? { ...item, isOpen: !item.isOpen } : item))
    );
  };

  const handleUpdateSalonTimes = (day: DayOfWeek, field: 'openTime' | 'closeTime', value: string) => {
    setSalonSchedule((prev) =>
      prev.map((item) => (item.day === day ? { ...item, [field]: value } : item))
    );
  };

  // دوام الخدمة المنزلية
  const handleToggleHomeDay = (day: DayOfWeek) => {
    setHomeSchedule((prev) =>
      prev.map((item) => (item.day === day ? { ...item, isAvailable: !item.isAvailable } : item))
    );
  };

  const handleUpdateHomeTimes = (day: DayOfWeek, field: 'startTime' | 'endTime', value: string) => {
    setHomeSchedule((prev) =>
      prev.map((item) => (item.day === day ? { ...item, [field]: value } : item))
    );
  };

  // اختصارات التوقيت
  const handleApplyWeekdayPreset = () => {
    setSalonSchedule((prev) =>
      prev.map((item) =>
        item.day === 'Friday'
          ? { ...item, isOpen: true, openTime: '13:30', closeTime: '23:00' }
          : { ...item, isOpen: true, openTime: '10:00', closeTime: '22:00' }
      )
    );
  };

  const handleCopySalonToHome = () => {
    setHomeSchedule(
      salonSchedule.map((s) => ({
        day: s.day,
        isAvailable: s.isOpen,
        startTime: s.openTime,
        endTime: s.closeTime
      }))
    );
  };

  const handleSave = () => {
    onUpdateBranchSchedule(selectedBranch.id, salonSchedule, homeSchedule);
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
    }, 2800);
  };

  const openSalonDays = salonSchedule.filter((d) => d.isOpen).length;
  const activeHomeDays = homeSchedule.filter((d) => d.isAvailable).length;

  return (
    <div style={{ padding: '13px' }}>
      {/* زر الرجوع */}
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
          marginBottom: '10px',
          fontFamily: 'var(--font-body)'
        }}
      >
        <ArrowRight size={14} /> الرجوع لمركز الإعدادات
      </button>

      {/* الترويسة */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={20} color="var(--gold-dark)" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-main)', margin: 0 }}>
            أوقات العمل وجداول الدوام
          </h2>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
          إعداد جدول أوقات العمل لـ <strong>{selectedBranch.name}</strong>
        </div>
      </div>

      {/* إشعار نجاح الحفظ */}
      {savedNotification && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #6ee7b7',
            color: '#065f46',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '12px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <Check size={16} color="#059669" />
          <span>تم حفظ وتحديث أوقات العمل وجدول الخدمة المنزلية بنجاح!</span>
        </div>
      )}

      {/* التبديل بين دوام الصالون والخدمة المنزلية */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: '#e2e8f0',
          padding: '3px',
          borderRadius: '10px',
          marginBottom: '14px'
        }}
      >
        <button
          onClick={() => setActiveTab('salon')}
          style={{
            padding: '8px 10px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '11.5px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            background: activeTab === 'salon' ? '#ffffff' : 'transparent',
            color: activeTab === 'salon' ? 'var(--text-main)' : 'var(--text-muted)',
            boxShadow: activeTab === 'salon' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
            fontFamily: 'var(--font-body)'
          }}
        >
          <Building2 size={14} color={activeTab === 'salon' ? 'var(--text-gold)' : 'currentColor'} />
          <span>دوام الصالون ({openSalonDays}/7)</span>
        </button>

        <button
          onClick={() => setActiveTab('home')}
          style={{
            padding: '8px 10px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '11.5px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            background: activeTab === 'home' ? '#ffffff' : 'transparent',
            color: activeTab === 'home' ? 'var(--text-main)' : 'var(--text-muted)',
            boxShadow: activeTab === 'home' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
            fontFamily: 'var(--font-body)'
          }}
        >
          <Home size={14} color={activeTab === 'home' ? 'var(--text-gold)' : 'currentColor'} />
          <span>الخدمة المنزلية ({activeHomeDays}/7)</span>
        </button>
      </div>

      {/* اختصارات القوالب الجاهزة */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        {activeTab === 'salon' ? (
          <button
            onClick={handleApplyWeekdayPreset}
            style={{
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              color: 'var(--text-gold)',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-body)'
            }}
          >
            <Sparkles size={12} /> التوقيت المعتاد (10:00 - 22:00، الجمعة 13:30)
          </button>
        ) : (
          <button
            onClick={handleCopySalonToHome}
            style={{
              background: 'rgba(37, 99, 235, 0.1)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              color: '#2563eb',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-body)'
            }}
          >
            <Sparkles size={12} /> مطابقة أيام الخدمة المنزلية مع دوام الصالون
          </button>
        )}
      </div>

      {/* صفوف جدول الأيام */}
      {activeTab === 'salon' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {salonSchedule.map((item) => (
            <div
              key={item.day}
              className="gold-card"
              style={{
                padding: '12px',
                marginBottom: 0,
                borderRight: item.isOpen ? '3px solid var(--gold-primary)' : '3px solid #cbd5e1',
                background: item.isOpen ? '#ffffff' : '#f8fafc'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: item.isOpen ? '#10b981' : '#94a3b8'
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '13.5px', color: item.isOpen ? 'var(--text-main)' : 'var(--text-muted)' }}>
                      {ARABIC_DAYS[item.day]}
                    </div>
                    {item.day === 'Friday' && (
                      <div style={{ fontSize: '10px', color: '#d97706', fontWeight: 700 }}>
                        يبدأ العمل بعد صلاة الجمعة
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => handleToggleSalonDay(item.day)}
                    style={{
                      padding: '4px 11px',
                      borderRadius: '20px',
                      border: 'none',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      background: item.isOpen ? 'rgba(16, 185, 129, 0.15)' : '#e2e8f0',
                      color: item.isOpen ? '#059669' : '#64748b',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {item.isOpen ? 'مفتوح' : 'مغلق'}
                  </button>
                </div>
              </div>

              {item.isOpen ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    marginTop: '10px',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--border-dark)'
                  }}
                >
                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px', fontWeight: 700 }}>
                      يفتح الساعة
                    </label>
                    <input
                      type="time"
                      value={item.openTime}
                      onChange={(e) => handleUpdateSalonTimes(item.day, 'openTime', e.target.value)}
                      style={{ width: '100%', fontSize: '12px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px', fontWeight: 700 }}>
                      يغلق الساعة
                    </label>
                    <input
                      type="time"
                      value={item.closeTime}
                      onChange={(e) => handleUpdateSalonTimes(item.day, 'closeTime', e.target.value)}
                      style={{ width: '100%', fontSize: '12px' }}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  الفرع مغلق ولا يستقبل حجوزات في هذا اليوم.
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div
            style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              padding: '10px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              marginBottom: '4px'
            }}
          >
            <AlertCircle size={16} color="#2563eb" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '11px', color: '#1e40af', lineHeight: 1.4 }}>
              طلبات الخدمة المنزلية متاحة للعملاء فقط خلال الأيام المفعلة وضمن فترات التوصيل المحددة أدناه.
            </div>
          </div>

          {homeSchedule.map((item) => (
            <div
              key={item.day}
              className="gold-card"
              style={{
                padding: '12px',
                marginBottom: 0,
                borderRight: item.isAvailable ? '3px solid #2563eb' : '3px solid #cbd5e1',
                background: item.isAvailable ? '#ffffff' : '#f8fafc'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: item.isAvailable ? '#2563eb' : '#94a3b8'
                    }}
                  />
                  <div style={{ fontWeight: 800, fontSize: '13.5px', color: item.isAvailable ? 'var(--text-main)' : 'var(--text-muted)' }}>
                    {ARABIC_DAYS[item.day]}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => handleToggleHomeDay(item.day)}
                    style={{
                      padding: '4px 11px',
                      borderRadius: '20px',
                      border: 'none',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      background: item.isAvailable ? 'rgba(37, 99, 235, 0.15)' : '#e2e8f0',
                      color: item.isAvailable ? '#2563eb' : '#64748b',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {item.isAvailable ? 'متاح للتوصيل' : 'معطل'}
                  </button>
                </div>
              </div>

              {item.isAvailable ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    marginTop: '10px',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--border-dark)'
                  }}
                >
                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px', fontWeight: 700 }}>
                      بداية فترة التوصيل
                    </label>
                    <input
                      type="time"
                      value={item.startTime}
                      onChange={(e) => handleUpdateHomeTimes(item.day, 'startTime', e.target.value)}
                      style={{ width: '100%', fontSize: '12px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px', fontWeight: 700 }}>
                      نهاية فترة التوصيل
                    </label>
                    <input
                      type="time"
                      value={item.endTime}
                      onChange={(e) => handleUpdateHomeTimes(item.day, 'endTime', e.target.value)}
                      style={{ width: '100%', fontSize: '12px' }}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  الخدمة المنزلية متوقفة في هذا اليوم.
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* زر الحفظ النهائي */}
      <div style={{ marginTop: '16px', paddingBottom: '20px' }}>
        <button
          onClick={handleSave}
          className="gold-button"
          style={{
            width: '100%',
            padding: '11px',
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Check size={16} /> حفظ أوقات العمل وجداول الدوام
        </button>
      </div>
    </div>
  );
};
