import React, { useState } from 'react';
import { BranchService, MasterService } from '../../types/zetime';
import { Scissors, Home, Sparkles, X, Check, Clock, Tag } from 'lucide-react';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newService: BranchService) => void;
  masterCatalog: MasterService[];
  existingServices: BranchService[];
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  masterCatalog,
  existingServices
}) => {
  // Available master services that can be added
  const [selectedMasterId, setSelectedMasterId] = useState<string>(
    masterCatalog.length > 0 ? masterCatalog[0].id : ''
  );
  const [price, setPrice] = useState<number>(250);
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [isHomeServiceAvailable, setIsHomeServiceAvailable] = useState<boolean>(false);
  const [homeServicePrice, setHomeServicePrice] = useState<number>(320);

  if (!isOpen) return null;

  const currentMaster = masterCatalog.find((m) => m.id === selectedMasterId) || masterCatalog[0];

  const handleMasterChange = (id: string) => {
    setSelectedMasterId(id);
    const chosen = masterCatalog.find((m) => m.id === id);
    if (chosen) {
      setDurationMinutes(chosen.defaultDurationMinutes);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMaster) return;

    const newService: BranchService = {
      id: `bs-${Date.now()}`,
      masterServiceId: currentMaster.id,
      name: currentMaster.name,
      category: currentMaster.category,
      price: Number(price) || 100,
      durationMinutes: Number(durationMinutes) || 30,
      isEnabled: true,
      isHomeServiceAvailable,
      homeServicePrice: isHomeServiceAvailable ? Number(homeServicePrice) || price + 70 : undefined
    };

    onAdd(newService);
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
              <Scissors size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: 'var(--text-main)', margin: 0 }}>
                Add New Service
              </h3>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Select verified service from ZeTime Master Catalog
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
          {/* Master Service Dropdown Selection (Strict Requirement: Provider does not type name, selects from dropdown) */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '5px' }}>
              Service Name <span style={{ color: 'var(--text-gold)' }}>* (Select from Master Catalog)</span>
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
              {masterCatalog.map((master) => {
                const alreadyAdded = existingServices.some((s) => s.name === master.name);
                return (
                  <option key={master.id} value={master.id}>
                    [{master.category}] {master.name} {alreadyAdded ? '(Already in catalog)' : ''}
                  </option>
                );
              })}
            </select>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '3px', display: 'block' }}>
              ℹ️ Standardized beauty treatment name recognized across the ZeTime platform.
            </span>
          </div>

          {/* Master Service Preview Card */}
          {currentMaster && (
            <div
              style={{
                padding: '10px 12px',
                borderRadius: '10px',
                background: '#faf8f3',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--text-gold)',
                    background: 'rgba(212, 175, 55, 0.15)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  Category: {currentMaster.category}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Sparkles size={11} color="var(--gold-primary)" /> Target: {currentMaster.genderAudience}
                </span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-main)', margin: '4px 0 0', lineHeight: 1.3 }}>
                {currentMaster.description}
              </p>
            </div>
          )}

          {/* Branch Pricing & Duration Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                Branch Price (SAR) *
              </label>
              <input
                type="number"
                min="10"
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
                placeholder="e.g. 250"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                Duration (Minutes) *
              </label>
              <input
                type="number"
                min="10"
                step="5"
                required
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                style={{ width: '100%' }}
                placeholder="e.g. 45"
              />
            </div>
          </div>

          {/* Home Service Delivery Toggle & Price */}
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
                    Enable Home Service Visit
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    Allow customers to book this service for home dispatch
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
                  placeholder="e.g. 320"
                />
                <span style={{ fontSize: '10px', color: 'var(--text-gold)', marginTop: '3px', display: 'block' }}>
                  Premium delta: +{homeServicePrice - price} SAR for home equipment & visit setup
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
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
              <Check size={16} /> Add to Branch Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
