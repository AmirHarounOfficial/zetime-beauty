import React, { useState } from 'react';
import { CustomerProfile } from '../types/zetime';
import { Search, AlertTriangle, ArrowRight } from 'lucide-react';

interface CrmViewProps {
  customers: CustomerProfile[];
  onBackToSettings?: () => void;
}

export const CrmView: React.FC<CrmViewProps> = ({ customers, onBackToSettings }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

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

      <div style={{ marginBottom: '12px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-gold)', margin: 0 }}>
          إدارة علاقات العملاء والملفات التجميلية
        </h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          تفضيلات العميلات، سجل الحساسية الطبية، ومجموع الإنفاق
        </span>
      </div>

      {/* حقل البحث */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <Search
          size={14}
          color="var(--text-muted)"
          style={{ position: 'absolute', right: '11px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder="البحث باسم العميلة أو رقم الجوال..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            background: '#ffffff',
            color: 'var(--text-main)',
            border: '1px solid var(--border-dark)',
            padding: '9px 34px 9px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            outline: 'none',
            fontFamily: 'var(--font-body)'
          }}
        />
      </div>

      {/* بطاقات قائمة العملاء */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredCustomers.length === 0 && (
          <div className="gold-card" style={{ textAlign: 'center', padding: '24px 14px' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>لم يتم العثور على نتائج للبحث</div>
          </div>
        )}

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
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--text-main)' }}>{c.name}</div>
                  <span style={{ fontWeight: 800, fontSize: '12.5px', color: 'var(--text-gold)' }}>
                    {c.totalSpent} ر.س
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  📞 {c.phone}
                </div>
              </div>
            </div>

            {/* وسوم الحساسية */}
            {c.allergies.length > 0 && (
              <div style={{ display: 'flex', gap: '4px', marginTop: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10px', color: '#dc2626', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <AlertTriangle size={10} /> تنبيه الحساسية:
                </span>
                {c.allergies.map((a) => (
                  <span
                    key={a}
                    style={{
                      background: 'rgba(220, 38, 38, 0.12)',
                      color: '#dc2626',
                      fontSize: '9.5px',
                      fontWeight: 700,
                      padding: '1px 6px',
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

      {/* نافذة الملف التجميلي التفصيلي */}
      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-drag-handle" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ color: 'var(--text-gold)', fontSize: '15px', fontWeight: 800 }}>
                الملف التجميلي — {selectedCustomer.name}
              </h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
              <img
                src={selectedCustomer.photoUrl}
                alt={selectedCustomer.name}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-primary)', flexShrink: 0 }}
              />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)' }}>{selectedCustomer.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{selectedCustomer.email}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-gold)', fontWeight: 800, marginTop: '2px' }}>
                  عميلة VIP • {selectedCustomer.totalBookings} حجوزات مكتملة
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', marginBottom: '10px', fontSize: '12px', border: '1px solid var(--border-dark)' }}>
              <div style={{ color: 'var(--text-gold)', fontWeight: 800, marginBottom: '4px' }}>💖 التفضيلات والخيارات المفضلة:</div>
              {selectedCustomer.preferences.map((p, i) => (
                <div key={i} style={{ color: 'var(--text-main)', fontSize: '11px', marginTop: '2px' }}>• {p}</div>
              ))}
            </div>

            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '12px', border: '1px solid var(--border-dark)' }}>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>الملاحظات التجميلية والتشغيلية:</div>
              <div style={{ color: 'var(--text-main)', fontSize: '11px' }}>{selectedCustomer.recentNotes}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
