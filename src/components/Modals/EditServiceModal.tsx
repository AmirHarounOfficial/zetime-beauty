import React, { useState, useEffect } from 'react';
import { BranchService, MasterService } from '../../types/zetime';
import { Edit3, Home, Check, X, Trash2, Clock, DollarSign } from 'lucide-react';

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: BranchService | null;
  masterCatalog: MasterService[];
  onSave: (updatedService: BranchService) => void;
  onDelete?: (serviceId: string) => void;
}

export const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  onClose,
  service,
  masterCatalog,
  onSave,
  onDelete
}) => {
  const [selectedMasterId, setSelectedMasterId] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isHomeServiceAvailable, setIsHomeServiceAvailable] = useState<boolean>(false);
  const [homeServicePrice, setHomeServicePrice] = useState<number>(0);

  useEffect(() => {
    if (service) {
      setSelectedMasterId(service.masterServiceId || '');
      setPrice(service.price);
      setDurationMinutes(service.durationMinutes);
      setIsEnabled(service.isEnabled !== false);
      setIsHomeServiceAvailable(service.isHomeServiceAvailable || false);
      setHomeServicePrice(service.homeServicePrice || service.price + 70);
    }
  }, [service]);

  if (!isOpen || !service) return null;

  const currentMaster = masterCatalog.find((m) => m.id === selectedMasterId) || {
    id: service.masterServiceId,
    name: service.name,
    category: service.category,
    description: '',
    defaultDurationMinutes: service.durationMinutes,
    genderAudience: 'All'
  };

  const handleMasterChange = (id: string) => {
    setSelectedMasterId(id);
    const chosen = masterCatalog.find((m) => m.id === id);
    if (chosen) {
      setDurationMinutes(chosen.defaultDurationMinutes);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: BranchService = {
      ...service,
      masterServiceId: selectedMasterId || service.masterServiceId,
      name: currentMaster.name || service.name,
      category: currentMaster.category || service.category,
      price: Number(price) || 0,
      durationMinutes: Number(durationMinutes) || 30,
      isEnabled,
      isHomeServiceAvailable,
      homeServicePrice: isHomeServiceAvailable ? Number(homeServicePrice) || price + 70 : undefined
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
                Edit Service Details
              </h3>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Configure branch pricing, duration & home visits
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
          {/* Master Catalog Service Select (Dropdown) */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              Master Service Name
            </label>
            <select
              value={selectedMasterId}
              onChange={(e) => handleMasterChange(e.target.value)}
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
              {masterCatalog.map((master) => (
                <option key={master.id} value={master.id}>
                  [{master.category}] {master.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing & Duration */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                Branch Price (SAR) *
              </label>
              <input
                type="number"
                min="0"
                step="5"
                required
                value={price}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setPrice(val);
                  if (homeServicePrice <= val) {
                    setHomeServicePrice(val + 70);
                  }
                }}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                Duration (Minutes) *
              </label>
              <input
                type="number"
                min="5"
                step="5"
                required
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Service Availability / Active Status Toggle */}
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
                Active in Branch Booking
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Visible to customers and staff in booking flow
              </div>
            </div>
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
            />
          </div>

          {/* Home Service Delivery Configuration */}
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              border: isHomeServiceAvailable ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-dark)',
              background: isHomeServiceAvailable ? 'rgba(212, 175, 55, 0.06)' : '#ffffff',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Home size={16} color={isHomeServiceAvailable ? 'var(--text-gold)' : 'var(--text-muted)'} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>
                    Home Service Visit Availability
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    Enable mobile beauty appointments at customer residence
                  </div>
                </div>
              </div>

              <input
                type="checkbox"
                checked={isHomeServiceAvailable}
                onChange={(e) => setIsHomeServiceAvailable(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
              />
            </div>

            {isHomeServiceAvailable && (
              <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed var(--border-gold)' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                  Home Service Price (SAR)
                </label>
                <input
                  type="number"
                  min={price}
                  step="5"
                  value={homeServicePrice}
                  onChange={(e) => setHomeServicePrice(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '10px', color: 'var(--text-gold)', marginTop: '3px', display: 'block' }}>
                  Home surcharge: +{homeServicePrice - price} SAR above salon chair price
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Remove "${service.name}" from this branch catalog?`)) {
                    onDelete(service.id);
                    onClose();
                  }
                }}
                className="secondary-button"
                style={{ color: '#dc2626', borderColor: '#fecaca', background: '#fef2f2' }}
              >
                <Trash2 size={14} /> Remove
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="secondary-button"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="gold-button"
              style={{ flex: 2 }}
            >
              <Check size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
