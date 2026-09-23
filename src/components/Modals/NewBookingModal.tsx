import React, { useState } from 'react';
import { BranchService, Professional, Booking, CustomerProfile } from '../../types/zetime';
import { X, Home } from 'lucide-react';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: Booking) => void;
  services: BranchService[];
  professionals: Professional[];
  customers: CustomerProfile[];
  branchId: string;
  branchName: string;
}

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  services,
  professionals,
  customers,
  branchId,
  branchName
}) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || 'c-1');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || 'bs-1');
  const [selectedProfId, setSelectedProfId] = useState(professionals[0]?.id || 'p-1');
  const [date, setDate] = useState('2026-09-22');
  const [time, setTime] = useState('15:00');
  const [isHomeService, setIsHomeService] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Card at Provider' | 'Online Payment' | 'Cash' | 'Apple Pay'>('Card at Provider');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];
  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];
  const selectedProf = professionals.find(p => p.id === selectedProfId) || professionals[0];

  const price = isHomeService && selectedService.homeServicePrice ? selectedService.homeServicePrice : selectedService.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      id: `bk-${Date.now().toString().slice(-4)}`,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      customerPhoto: selectedCustomer.photoUrl,
      branchId,
      branchName,
      bookingItems: [
        {
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          professionalId: selectedProf.id,
          professionalName: selectedProf.name,
          price: price,
          durationMinutes: selectedService.durationMinutes
        }
      ],
      totalPrice: price,
      totalDurationMinutes: selectedService.durationMinutes,
      scheduledDate: date,
      scheduledTime: time,
      status: 'CONFIRMED',
      isHomeService,
      paymentMethod,
      paymentStatus: 'Pending',
      createdAt: new Date().toISOString(),
      notes,
      customerAllergies: selectedCustomer.allergies
    };

    onSave(newBooking);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontSize: '16px' }}>
            + Create Provider Booking
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Select Customer
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              style={{ width: '100%' }}
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.phone})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Select Service
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              style={{ width: '100%' }}
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} - {s.price} SAR ({s.durationMinutes}m)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Assigned Professional
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

          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
            <input
              type="checkbox"
              id="homeSvc"
              checked={isHomeService}
              onChange={(e) => setIsHomeService(e.target.checked)}
            />
            <label htmlFor="homeSvc" style={{ fontSize: '12px', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <Home size={14} color="var(--text-gold)" /> Enable Home-Service Visit
            </label>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
              style={{ width: '100%' }}
            >
              <option value="Card at Provider">Card at Provider</option>
              <option value="Cash">Cash</option>
              <option value="Online Payment">Online Payment</option>
              <option value="Apple Pay">Apple Pay</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Notes / Special Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Requested quiet room"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ background: 'rgba(212, 175, 55, 0.15)', border: '1px solid var(--border-gold)', padding: '10px', borderRadius: '8px', fontSize: '11px', color: 'var(--text-gold)', fontWeight: 600 }}>
            ⚡ <b>Provider Booking:</b> Automatically confirmed upon creation.
          </div>

          <button type="submit" className="gold-button" style={{ marginTop: '8px' }}>
            Confirm & Reserve Appointment ({price} SAR)
          </button>
        </form>
      </div>
    </div>
  );
};
