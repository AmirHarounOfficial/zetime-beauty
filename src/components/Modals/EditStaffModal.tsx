import React, { useState, useEffect } from 'react';
import { Professional, Branch } from '../../types/zetime';
import { Edit3, X, Check, Trash2, Home, Building2 } from 'lucide-react';

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  professional: Professional | null;
  branches: Branch[];
  onSave: (updatedProf: Professional) => void;
  onDelete?: (profId: string) => void;
}

const PRESET_AVATARS = [
  { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', label: 'Sara' },
  { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', label: 'Mona' },
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', label: 'Lina' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', label: 'Ahmed' },
  { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', label: 'Karim' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', label: 'Yasmin' }
];

export const EditStaffModal: React.FC<EditStaffModalProps> = ({
  isOpen,
  onClose,
  professional,
  branches,
  onSave,
  onDelete
}) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [branchId, setBranchId] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isHomeServiceEligible, setIsHomeServiceEligible] = useState(false);

  useEffect(() => {
    if (professional) {
      setName(professional.name);
      setTitle(professional.title);
      setBranchId(professional.branchId);
      setPhotoUrl(professional.photoUrl);
      setIsHomeServiceEligible(professional.isHomeServiceEligible);
    }
  }, [professional]);

  if (!isOpen || !professional) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const branch = branches.find((b) => b.id === branchId) || branches[0];

    const updated: Professional = {
      ...professional,
      name: name.trim(),
      title: title.trim(),
      branchId: branch?.id || professional.branchId,
      branchName: branch?.name || professional.branchName,
      photoUrl,
      isHomeServiceEligible,
      scheduleConfig: professional.scheduleConfig
        ? {
            ...professional.scheduleConfig,
            allowsHomeService: isHomeServiceEligible
          }
        : undefined
    };

    onSave(updated);
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
              <Edit3 size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: 'var(--text-main)', margin: 0 }}>
                تعديل ملف الموظف
              </h3>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                تحديث المسمى الوظيفي، الفرع المخصص، وأهلية الخدمات المنزلية
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
              الصورة الشخصية
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
                      width: '42px',
                      height: '42px',
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

          {/* Name & Title */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                الاسم الكامل *
              </label>
              <input
                type="text"
                required
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Assigned Branch */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              الفرع المخصص
            </label>
            <select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
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

          {/* Home Service Toggle */}
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
                  مؤهل للخروج في مواعيد التجميل المنزلية للعملاء
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
            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`هل أنت متأكد من حذف الموظف "${professional.name}" من فريق العمل؟`)) {
                    onDelete(professional.id);
                    onClose();
                  }
                }}
                className="secondary-button"
                style={{ color: '#dc2626', borderColor: '#fecaca', background: '#fef2f2' }}
              >
                <Trash2 size={14} /> حذف
              </button>
            )}

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
              <Check size={16} /> حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
