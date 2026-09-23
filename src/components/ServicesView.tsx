import React, { useState } from 'react';
import { BranchService, MasterService, ProviderRole } from '../types/zetime';
import { hasPermission } from '../utils/permissions';
import { Home, Edit3, Lock, AlertCircle } from 'lucide-react';

interface ServicesViewProps {
  branchServices: BranchService[];
  masterCatalog: MasterService[];
  currentRole: ProviderRole;
  onUpdateServicePrice: (serviceId: string, newPrice: number) => void;
  onToggleHomeService: (serviceId: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  branchServices,
  masterCatalog,
  currentRole,
  onUpdateServicePrice,
  onToggleHomeService
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPriceInput, setEditPriceInput] = useState<number>(0);

  const canEditPricing = hasPermission(currentRole, 'EDIT_PRICING');

  const categories = ['All', 'Hair', 'Facial & Skincare', 'Nails', 'Spa & Body', 'Beard & Grooming', 'Home Beauty'];

  const filteredServices = branchServices.filter((s) => {
    if (activeCategory === 'All') return true;
    return s.category === activeCategory;
  });

  return (
    <div style={{ padding: '14px' }}>
      <div style={{ marginBottom: '12px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-gold)' }}>
          Branch Service Catalog
        </h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Powered by ZeTime Master Catalog
        </span>
      </div>

      {/* Permission Restriction Alert if Staff/Professional */}
      {!canEditPricing && (
        <div className="permission-denied-box">
          <AlertCircle size={16} color="#dc2626" />
          <span>Role Permission: {currentRole.replace('_', ' ')} cannot modify service pricing.</span>
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
              <div>
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
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)', marginTop: '4px' }}>
                  {svc.name}
                </div>
              </div>

              {/* Price & Edit Button (Permission Controlled) */}
              {editingId === svc.id ? (
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <input
                    type="number"
                    value={editPriceInput}
                    onChange={(e) => setEditPriceInput(Number(e.target.value))}
                    style={{ width: '65px' }}
                  />
                  <button
                    onClick={() => {
                      onUpdateServicePrice(svc.id, editPriceInput);
                      setEditingId(null);
                    }}
                    style={{ background: 'var(--gold-gradient)', color: '#000', border: 'none', padding: '4px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-gold)' }}>
                    {svc.price} SAR
                  </div>
                  {canEditPricing ? (
                    <button
                      onClick={() => {
                        setEditingId(svc.id);
                        setEditPriceInput(svc.price);
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}
                    >
                      <Edit3 size={10} /> Edit Price
                    </button>
                  ) : (
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Lock size={9} /> Fixed Price
                    </span>
                  )}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-dark)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>⏱ Duration: {svc.durationMinutes} minutes</span>

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
                <Home size={10} /> {svc.isHomeServiceAvailable ? `Home Visit (+${(svc.homeServicePrice || svc.price + 70) - svc.price} SAR)` : 'Enable Home Visit'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
