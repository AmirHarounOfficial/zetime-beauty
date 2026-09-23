import React, { useState } from 'react';
import { QueueEntry, BranchService, Professional } from '../../types/zetime';
import { X, UserPlus } from 'lucide-react';

interface AddWalkinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (queueEntry: QueueEntry) => void;
  services: BranchService[];
  professionals: Professional[];
  branchId: string;
  currentQueueLength: number;
}

export const AddWalkinModal: React.FC<AddWalkinModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  services,
  professionals,
  branchId,
  currentQueueLength
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || 'bs-1');
  const [selectedProfId, setSelectedProfId] = useState(professionals[0]?.id || 'p-1');

  if (!isOpen) return null;

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];
  const selectedProf = professionals.find(p => p.id === selectedProfId) || professionals[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) return;

    const newPos = currentQueueLength + 1;
    const waitMinutes = (newPos - 1) * 20 + selectedService.durationMinutes;

    const newEntry: QueueEntry = {
      id: `q-${Date.now().toString().slice(-4)}`,
      customerName,
      customerPhone: customerPhone || '+966 50 000 0000',
      serviceName: selectedService.name,
      professionalId: selectedProf.id,
      professionalName: selectedProf.name,
      position: newPos,
      estimatedWaitMinutes: waitMinutes,
      status: 'WAITING',
      joinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      branchId
    };

    onAdd(newEntry);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontSize: '16px' }}>
            + Add Walk-In Customer
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '18px', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Customer Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Muna Al-Sulaimi"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+966 5X XXX XXXX"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Service Requested
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              style={{ width: '100%' }}
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.durationMinutes} min)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Preferred Professional
            </label>
            <select
              value={selectedProfId}
              onChange={(e) => setSelectedProfId(e.target.value)}
              style={{ width: '100%' }}
            >
              {professionals.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.title})
                </option>
              ))}
            </select>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid var(--border-dark)', padding: '10px', borderRadius: '8px', fontSize: '12px' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>Queue Preview:</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>Assigned Position: <span style={{ color: 'var(--text-gold)' }}>#{currentQueueLength + 1}</span></span>
              <span>Estimated Wait: <span style={{ color: '#2563eb' }}>~{(currentQueueLength) * 20 + selectedService.durationMinutes} mins</span></span>
            </div>
          </div>

          <button type="submit" className="gold-button" style={{ marginTop: '6px' }}>
            <UserPlus size={16} /> Enter Walk-In Queue
          </button>
        </form>
      </div>
    </div>
  );
};
