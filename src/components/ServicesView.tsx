import React, { useState } from 'react';
import { BranchService, MasterService, ProviderRole } from '../types/zetime';
import { hasPermission } from '../utils/permissions';
import { Home, Edit3, Lock, AlertCircle, Plus, Sparkles, Clock, Check } from 'lucide-react';
import { AddServiceModal } from './Modals/AddServiceModal';
import { EditServiceModal } from './Modals/EditServiceModal';

interface ServicesViewProps {
  branchServices: BranchService[];
  masterCatalog: MasterService[];
  currentRole: ProviderRole;
  onUpdateServicePrice: (serviceId: string, newPrice: number) => void;
  onToggleHomeService: (serviceId: string) => void;
  onAddService?: (newService: BranchService) => void;
  onUpdateService?: (updatedService: BranchService) => void;
  onDeleteService?: (serviceId: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  branchServices,
  masterCatalog,
  currentRole,
  onUpdateServicePrice,
  onToggleHomeService,
  onAddService,
  onUpdateService,
  onDeleteService
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<BranchService | null>(null);

  const canEditPricing = hasPermission(currentRole, 'EDIT_PRICING');

  const categories = [
    { id: 'All', label: 'الكل' },
    { id: 'Hair', label: 'الشعر' },
    { id: 'Facial & Skincare', label: 'العناية بالبشرة' },
    { id: 'Nails', label: 'الأظافر' },
    { id: 'Spa & Body', label: 'السبا والمساج' },
    { id: 'Beard & Grooming', label: 'العناية باللحية' },
    { id: 'Home Beauty', label: 'التجميل المنزلي' }
  ];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'Hair': return 'الشعر';
      case 'Facial & Skincare': return 'العناية بالبشرة';
      case 'Nails': return 'الأظافر';
      case 'Spa & Body': return 'السبا والمساج';
      case 'Beard & Grooming': return 'العناية باللحية';
      case 'Home Beauty': return 'التجميل المنزلي';
      default: return cat;
    }
  };

  const formatRoleName = (role: ProviderRole) => {
    switch (role) {
      case 'BUSINESS_OWNER': return 'مالك المنشأة';
      case 'BRANCH_MANAGER': return 'مدير الفرع';
      case 'BRANCH_STAFF': return 'موظف الاستقبال';
      case 'PROFESSIONAL': return 'أخصائية التجميل';
      case 'FREELANCER': return 'المقدمة المستقلة';
      default: return role;
    }
  };

  const filteredServices = branchServices.filter((s) => {
    if (activeCategoryId === 'All') return true;
    return s.category === activeCategoryId;
  });

  return (
    <div style={{ padding: '13px' }}>
      {/* ترويسة الصفحة وزر إضافة خدمة */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-gold)', margin: 0 }}>
            دليل خدمات الفرع
          </h2>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            مرتبط بكتالوج خدمات زيتيم المعتمد ({branchServices.length} خدمة نشطة)
          </span>
        </div>

        {canEditPricing && (
          <button
            onClick={() => setIsAddModalOpen(true)}
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
            <Plus size={14} /> إضافة خدمة
          </button>
        )}
      </div>

      {/* تنبيه الصلاحيات إذا لم يكن للمستخدم صلاحية التعديل */}
      {!canEditPricing && (
        <div className="permission-denied-box">
          <AlertCircle size={16} color="#dc2626" />
          <span>تنبيه الصلاحية: دور ({formatRoleName(currentRole)}) لا يملك صلاحية تعديل باقات الخدمات أو التسعير.</span>
        </div>
      )}

      {/* تصنيفات الخدمات (Category Pills) */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
            style={{
              background: activeCategoryId === cat.id ? 'var(--gold-gradient)' : '#ffffff',
              color: activeCategoryId === cat.id ? '#000' : 'var(--text-main)',
              border: activeCategoryId === cat.id ? 'none' : '1px solid var(--border-dark)',
              borderRadius: '16px',
              padding: '5px 12px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-body)'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* قائمة الخدمات */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredServices.map((svc) => (
          <div key={svc.id} className="gold-card" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, paddingLeft: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '9.5px',
                      color: 'var(--text-gold)',
                      background: 'rgba(212, 175, 55, 0.15)',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontWeight: 800
                    }}
                  >
                    {getCategoryLabel(svc.category)}
                  </span>
                  {svc.isEnabled === false && (
                    <span
                      style={{
                        fontSize: '9.5px',
                        color: '#64748b',
                        background: '#f1f5f9',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        fontWeight: 700
                      }}
                    >
                      معطلة
                    </span>
                  )}
                </div>

                <div style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--text-main)', marginTop: '4px' }}>
                  {svc.name}
                </div>
              </div>

              {/* السعر وزر التعديل */}
              <div style={{ textAlign: 'left', flexShrink: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-gold)' }}>
                  {svc.price} ر.س
                </div>

                {canEditPricing ? (
                  <button
                    onClick={() => setEditingService(svc)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-gold)',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontWeight: 700,
                      marginTop: '2px',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    <Edit3 size={11} /> تعديل الخدمة
                  </button>
                ) : (
                  <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                    <Lock size={9} /> ثابت
                  </span>
                )}
              </div>
            </div>

            {/* تفاصيل المدة وزر الخدمة المنزلية */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-dark)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>⏱ {svc.durationMinutes} دقيقة</span>

              <button
                onClick={() => canEditPricing && onToggleHomeService(svc.id)}
                disabled={!canEditPricing}
                style={{
                  background: svc.isHomeServiceAvailable ? 'rgba(212, 175, 55, 0.15)' : '#f1f5f9',
                  color: svc.isHomeServiceAvailable ? 'var(--text-gold)' : 'var(--text-muted)',
                  border: svc.isHomeServiceAvailable ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid var(--border-dark)',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 700,
                  cursor: canEditPricing ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  opacity: canEditPricing ? 1 : 0.6,
                  fontFamily: 'var(--font-body)'
                }}
              >
                <Home size={10} />{' '}
                {svc.isHomeServiceAvailable
                  ? `زيارة منزلية (+${(svc.homeServicePrice || svc.price + 70) - svc.price} ر.س)`
                  : 'تفعيل الزيارة المنزلية'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* نافذة إضافة خدمة */}
      {isAddModalOpen && (
        <AddServiceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          masterCatalog={masterCatalog}
          existingServices={branchServices}
          onAdd={(newSvc) => {
            if (onAddService) {
              onAddService(newSvc);
            }
          }}
        />
      )}

      {/* نافذة تعديل الخدمة */}
      {editingService && (
        <EditServiceModal
          isOpen={Boolean(editingService)}
          onClose={() => setEditingService(null)}
          service={editingService}
          masterCatalog={masterCatalog}
          onSave={(updated) => {
            if (onUpdateService) {
              onUpdateService(updated);
            } else {
              onUpdateServicePrice(updated.id, updated.price);
            }
            setEditingService(null);
          }}
          onDelete={(id) => {
            if (onDeleteService) {
              onDeleteService(id);
            }
            setEditingService(null);
          }}
        />
      )}
    </div>
  );
};
