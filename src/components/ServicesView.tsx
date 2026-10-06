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
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<BranchService | null>(null);

  const canEditPricing = hasPermission(currentRole, 'EDIT_PRICING');

  const categories = ['All', 'Hair', 'Facial & Skincare', 'Nails', 'Spa & Body', 'Beard & Grooming', 'Home Beauty'];

  const filteredServices = branchServices.filter((s) => {
    if (activeCategory === 'All') return true;
    return s.category === activeCategory;
  });

  return (
    <div style={{ padding: '14px' }}>
      {/* Header with Title and Add Service Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-gold)', margin: 0 }}>
            Branch Service Catalog
          </h2>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Powered by ZeTime Master Catalog ({branchServices.length} active)
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
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 8px var(--gold-glow)'
            }}
          >
            <Plus size={14} /> Add Service
          </button>
        )}
      </div>

      {/* Permission Restriction Alert if Staff/Professional */}
      {!canEditPricing && (
        <div className="permission-denied-box">
          <AlertCircle size={16} color="#dc2626" />
          <span>Role Permission: {currentRole.replace('_', ' ')} cannot modify service catalog or pricing.</span>
        </div>
      )}

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? 'var(--gold-gradient)' : '#ffffff',
              color: activeCategory === cat ? '#000' : 'var(--text-main)',
              border: activeCategory === cat ? 'none' : '1px solid var(--border-dark)',
              borderRadius: '16px',
              padding: '5px 12px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredServices.map((svc) => (
          <div key={svc.id} className="gold-card" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, paddingRight: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '9px',
                      color: 'var(--text-gold)',
                      background: 'rgba(212, 175, 55, 0.15)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 700
                    }}
                  >
                    {svc.category}
                  </span>
                  {svc.isEnabled === false && (
                    <span
                      style={{
                        fontSize: '9px',
                        color: '#64748b',
                        background: '#f1f5f9',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: 700
                      }}
                    >
                      Disabled
                    </span>
                  )}
                </div>

                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)', marginTop: '4px' }}>
                  {svc.name}
                </div>
              </div>

              {/* Price & Edit Button */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-gold)' }}>
                  {svc.price} SAR
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
                      marginTop: '2px'
                    }}
                  >
                    <Edit3 size={11} /> Edit Service
                  </button>
                ) : (
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                    <Lock size={9} /> Fixed
                  </span>
                )}
              </div>
            </div>

            {/* Bottom info & home service button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-dark)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>⏱ {svc.durationMinutes} mins</span>

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
                  opacity: canEditPricing ? 1 : 0.6
                }}
              >
                <Home size={10} />{' '}
                {svc.isHomeServiceAvailable
                  ? `Home Visit (+${(svc.homeServicePrice || svc.price + 70) - svc.price} SAR)`
                  : 'Enable Home Visit'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Modal */}
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

      {/* Edit Service Modal */}
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
