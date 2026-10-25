import React, { useState } from 'react';
import { BranchService, Professional, Booking, CustomerProfile, DeliveryFeeConfig } from '../../types/zetime';
import { X, Home, Truck, MapPin, Gift } from 'lucide-react';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: Booking) => void;
  services: BranchService[];
  professionals: Professional[];
  customers: CustomerProfile[];
  branchId: string;
  branchName: string;
  deliveryFeeConfig?: DeliveryFeeConfig;
}

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  services,
  professionals,
  customers,
  branchId,
  branchName,
  deliveryFeeConfig
}) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || 'c-1');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || 'bs-1');
  const [selectedProfId, setSelectedProfId] = useState(professionals[0]?.id || 'p-1');
  const [date, setDate] = useState('2026-09-22');
  const [time, setTime] = useState('15:00');
  const [isHomeService, setIsHomeService] = useState(false);
  const [homeAddress, setHomeAddress] = useState('حي النخيل، فيلا 12، الرياض');
  const [travelDistanceKm, setTravelDistanceKm] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState<'Card at Provider' | 'Online Payment' | 'Cash' | 'Apple Pay'>('Online Payment');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];
  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const selectedProf = professionals.find((p) => p.id === selectedProfId) || professionals[0];

  const servicePrice = isHomeService && selectedService.homeServicePrice ? selectedService.homeServicePrice : selectedService.price;

  // Delivery fee calculation
  const freeThreshold = deliveryFeeConfig?.freeDeliveryThreshold ?? 500;
  const isFreeDelivery = isHomeService && servicePrice >= freeThreshold;
  const baseFee = deliveryFeeConfig?.baseFee ?? 50;
  const ratePerKm = deliveryFeeConfig?.pricePerKm ?? 3.5;
  const deliveryFee = isHomeService
    ? (isFreeDelivery ? 0 : Math.round(baseFee + travelDistanceKm * ratePerKm))
    : 0;

  const grandTotal = servicePrice + deliveryFee;

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
          price: servicePrice,
          durationMinutes: selectedService.durationMinutes
        }
      ],
      totalPrice: grandTotal,
      totalDurationMinutes: selectedService.durationMinutes,
      scheduledDate: date,
      scheduledTime: time,
      status: 'CONFIRMED',
      isHomeService,
      homeAddress: isHomeService ? homeAddress : undefined,
      paymentMethod,
      paymentStatus: 'Pending',
      createdAt: new Date().toISOString(),
      notes: isHomeService
        ? `${notes ? notes + ' • ' : ''}خدمة منزلية: ${travelDistanceKm} كم (${deliveryFee === 0 ? 'توصيل مجاني' : deliveryFee + ' ر.س رسوم توصيل'})`
        : notes,
      customerAllergies: selectedCustomer.allergies
    };

    onSave(newBooking);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-drag-handle" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontSize: '16px', margin: 0, fontWeight: 800 }}>
            + إنشاء حجز جديد
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '18px', fontWeight: 800, cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* اختيار العميل */}
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
              اختيار العميلة *
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              style={{ width: '100%', fontFamily: 'var(--font-body)' }}
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.phone})
                </option>
              ))}
            </select>
          </div>

          {/* اختيار الخدمة */}
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
              اختيار الخدمة المطلوبة *
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              style={{ width: '100%', fontFamily: 'var(--font-body)' }}
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {s.price} ر.س ({s.durationMinutes} دقيقة)
                </option>
              ))}
            </select>
          </div>

          {/* تعيين الأخصائية */}
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
              تعيين الأخصائية / المصففة *
            </label>
            <select
              value={selectedProfId}
              onChange={(e) => setSelectedProfId(e.target.value)}
              style={{ width: '100%', fontFamily: 'var(--font-body)' }}
            >
              {professionals.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.title}) {p.scheduleConfig ? `• ${p.scheduleConfig.shiftLabel}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* التاريخ والوقت */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
                تاريخ الموعد
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
                الوقت
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* تفعيل الخدمة المنزلية */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isHomeService ? 'rgba(212, 175, 55, 0.12)' : '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: isHomeService ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid var(--border-dark)' }}>
            <input
              type="checkbox"
              id="homeSvc"
              checked={isHomeService}
              onChange={(e) => setIsHomeService(e.target.checked)}
              style={{ accentColor: 'var(--gold-primary)', width: '16px', height: '16px' }}
            />
            <label htmlFor="homeSvc" style={{ fontSize: '12px', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}>
              <Home size={15} color="var(--text-gold)" /> تفعيل الزيارة والتوصيل المنزلي
            </label>
          </div>

          {/* تفاصيل العنوان ومسافة الانتقال */}
          {isHomeService && (
            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-dark)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                  <MapPin size={12} color="var(--text-gold)" /> عنوان منزل العميلة
                </label>
                <input
                  type="text"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  style={{ width: '100%', fontSize: '11.5px' }}
                  placeholder="الشارع، الحي، رقم الفيلا/الشقة"
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', fontWeight: 700, marginBottom: '2px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Truck size={12} color="#2563eb" /> مسافة الانتقال من الفرع:
                  </span>
                  <span style={{ color: 'var(--text-main)' }}>{travelDistanceKm} كم</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  value={travelDistanceKm}
                  onChange={(e) => setTravelDistanceKm(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold-primary)' }}
                />
              </div>

              <div style={{ background: '#ffffff', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-dark)', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '3px' }}>
                  <span>سعر الخدمة:</span>
                  <span>{servicePrice} ر.س</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: isFreeDelivery ? '#059669' : 'var(--text-muted)', fontWeight: isFreeDelivery ? 800 : 600 }}>
                  <span>رسوم التوصيل ({baseFee} ر.س أساسي + {travelDistanceKm} كم × {ratePerKm}/كم):</span>
                  <span>{isFreeDelivery ? 'مجاناً (طلب أكثر من 500 ر.س)' : `+${deliveryFee} ر.س`}</span>
                </div>
              </div>
            </div>
          )}

          {/* طريقة الدفع */}
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
              طريقة الدفع
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
              style={{ width: '100%', fontFamily: 'var(--font-body)' }}
            >
              <option value="Online Payment">دفع إلكتروني (Online Payment)</option>
              <option value="Apple Pay">أبل باي (Apple Pay)</option>
              <option value="Card at Provider">بطاقة لدى المزود (مدى/شبكة)</option>
              <option value="Cash">نقداً (كاش)</option>
            </select>
          </div>

          {/* ملاحظات */}
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
              ملاحظات وتعليمات خاصة
            </label>
            <input
              type="text"
              placeholder="مثال: تعليمات موقف السيارة أو حساسية معينة"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ background: 'rgba(212, 175, 55, 0.15)', border: '1px solid var(--border-gold)', padding: '10px', borderRadius: '8px', fontSize: '11px', color: 'var(--text-gold)', fontWeight: 700 }}>
            ⚡ <b>حجز المزود:</b> يتم تثبيت وتأكيد الحجز فوراً في النظام.
          </div>

          <button type="submit" className="gold-button" style={{ marginTop: '4px', padding: '11px', fontSize: '13px' }}>
            تأكيد وتثبيت الحجز ({grandTotal} ر.س)
          </button>
        </form>
      </div>
    </div>
  );
};
