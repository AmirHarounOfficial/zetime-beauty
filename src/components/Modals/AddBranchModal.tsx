import React, { useState } from 'react';
import { Branch, Professional } from '../../types/zetime';
import { Building2, X, Check, UserCheck, Phone, MapPin, Clock } from 'lucide-react';

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  professionals: Professional[];
  onAdd: (newBranch: Branch) => void;
}

export const AddBranchModal: React.FC<AddBranchModalProps> = ({
  isOpen,
  onClose,
  professionals,
  onAdd
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('+966 50 ');
  const [workingHours, setWorkingHours] = useState('10:00 - 22:00');
  const [selectedManagerId, setSelectedManagerId] = useState<string>(
    professionals.length > 0 ? professionals[0].id : ''
  );
  const [isActive, setIsActive] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const assignedManager = professionals.find((p) => p.id === selectedManagerId);

    const newBranch: Branch = {
      id: `b-${Date.now()}`,
      name: name.trim(),
      address: address.trim() || 'Riyadh, Saudi Arabia',
      phone: phone.trim() || '+966 50 000 0000',
      workingHours: workingHours.trim() || '10:00 - 22:00',
      isActive,
      managerId: assignedManager?.id || 'm-new',
      managerName: assignedManager?.name || 'Unassigned Manager',
      operatingSchedule: [
        { day: 'Sunday', isOpen: true, openTime: '10:00', closeTime: '22:00' },
        { day: 'Monday', isOpen: true, openTime: '10:00', closeTime: '22:00' },
        { day: 'Tuesday', isOpen: true, openTime: '10:00', closeTime: '22:00' },
        { day: 'Wednesday', isOpen: true, openTime: '10:00', closeTime: '22:00' },
        { day: 'Thursday', isOpen: true, openTime: '10:00', closeTime: '23:00' },
        { day: 'Friday', isOpen: true, openTime: '13:30', closeTime: '23:00' },
        { day: 'Saturday', isOpen: true, openTime: '10:00', closeTime: '22:00' }
      ],
      homeServiceSchedule: [
        { day: 'Sunday', isAvailable: true, startTime: '11:00', endTime: '21:00' },
        { day: 'Monday', isAvailable: true, startTime: '11:00', endTime: '21:00' },
        { day: 'Tuesday', isAvailable: true, startTime: '11:00', endTime: '21:00' },
        { day: 'Wednesday', isAvailable: true, startTime: '11:00', endTime: '21:00' },
        { day: 'Thursday', isAvailable: true, startTime: '11:00', endTime: '22:00' },
        { day: 'Friday', isAvailable: true, startTime: '14:00', endTime: '22:00' },
        { day: 'Saturday', isAvailable: true, startTime: '11:00', endTime: '21:00' }
      ],
      deliveryFeeConfig: {
        baseFee: 50,
        pricePerKm: 3.5,
        freeDeliveryThreshold: 500,
        maxServiceRadiusKm: 35,
        minimumBookingAmount: 150
      }
    };

    onAdd(newBranch);
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
                Add New Salon Branch
              </h3>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Register new operational branch location & assign manager
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
              Branch Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Al-Nakheel Boulevard Branch"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Address */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              Street Address & City *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Northern Ring Rd, Exit 4, Al-Nakheel, Riyadh"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Phone & Working Hours */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                Contact Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="+966 50 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                Working Hours *
              </label>
              <input
                type="text"
                required
                placeholder="10:00 - 22:00"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Select Staff to be the Branch Manager (Crucial User Requirement!) */}
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
                Select Staff to be Branch Manager *
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
              Selected team member will lead shift rotations, queue & operational controls for this branch.
            </span>
          </div>

          {/* Active Status */}
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
                Branch Operating Status
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Active branches appear in customer booking & search
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
              <Check size={16} /> Create Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
