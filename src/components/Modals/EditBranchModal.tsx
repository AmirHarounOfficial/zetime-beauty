import React, { useState, useEffect } from 'react';
import { Branch, Professional } from '../../types/zetime';
import { Building2, X, Check, Trash2, UserCheck, Phone, MapPin } from 'lucide-react';

interface EditBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  branch: Branch | null;
  professionals: Professional[];
  canDelete: boolean;
  onSave: (updatedBranch: Branch) => void;
  onDelete?: (branchId: string) => void;
}

export const EditBranchModal: React.FC<EditBranchModalProps> = ({
  isOpen,
  onClose,
  branch,
  professionals,
  canDelete,
  onSave,
  onDelete
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [selectedManagerId, setSelectedManagerId] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (branch) {
      setName(branch.name);
      setAddress(branch.address);
      setPhone(branch.phone);
      setWorkingHours(branch.workingHours);
      setSelectedManagerId(branch.managerId || (professionals[0]?.id ?? ''));
      setIsActive(branch.isActive);
    }
  }, [branch, professionals]);

  if (!isOpen || !branch) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const manager = professionals.find((p) => p.id === selectedManagerId);

    const updated: Branch = {
      ...branch,
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      workingHours: workingHours.trim(),
      isActive,
      managerId: manager?.id || branch.managerId,
      managerName: manager?.name || branch.managerName
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
              <Building2 size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: 'var(--text-main)', margin: 0 }}>
                تعديل بيانات الفرع
              </h3>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                تحديث معلومات موقع الفرع وتعيين مدير للفرع
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
          {/* Branch Name */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              اسم الفرع *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Address */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              العنوان والمدينة *
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Phone & Working Hours */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                رقم التواصل *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', direction: 'ltr', textAlign: 'right' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                ساعات العمل اليومية *
              </label>
              <input
                type="text"
                required
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                style={{ width: '100%', direction: 'ltr', textAlign: 'right' }}
              />
            </div>
          </div>

          {/* Select Staff to be the Manager (Crucial User Requirement!) */}
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1.5px solid var(--border-gold)',
              background: '#faf8f3'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <UserCheck size={16} color="var(--text-gold)" />
              <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                تعيين موظف كمدير للفرع *
              </label>
            </div>
            <select
              value={selectedManagerId}
              onChange={(e) => setSelectedManagerId(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-dark)',
                background: '#fff',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              {professionals.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.name} — {prof.title} ({prof.branchName})
                </option>
              ))}
            </select>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              المدير الحالي: <strong>{branch.managerName || 'غير محدد'}</strong>
            </span>
          </div>

          {/* Active Status Toggle */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid var(--border-dark)'
            }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>
                حالة تشغيل الفرع
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                الفروع النشطة تستقبل حجوزات العملاء إلكترونياً
              </div>
            </div>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            {canDelete && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`هل أنت متأكد من رغبتك في حذف فرع "${branch.name}"؟`)) {
                    onDelete(branch.id);
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
