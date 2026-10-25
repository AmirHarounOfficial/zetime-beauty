import React, { useState } from 'react';
import { Branch, DeliveryFeeConfig } from '../types/zetime';
import {
  ArrowRight,
  Truck,
  DollarSign,
  MapPin,
  Check,
  Sparkles,
  AlertTriangle,
  Gift,
  Calculator,
  Navigation
} from 'lucide-react';

interface DeliveryFeeViewProps {
  selectedBranch: Branch;
  onUpdateDeliveryConfig: (branchId: string, config: DeliveryFeeConfig) => void;
  onBackToSettings: () => void;
}

export const DeliveryFeeView: React.FC<DeliveryFeeViewProps> = ({
  selectedBranch,
  onUpdateDeliveryConfig,
  onBackToSettings
}) => {
  const [config, setConfig] = useState<DeliveryFeeConfig>(() => {
    return (
      selectedBranch.deliveryFeeConfig || {
        baseFee: 50,
        pricePerKm: 3.5,
        freeDeliveryThreshold: 500,
        maxServiceRadiusKm: 35,
        minimumBookingAmount: 150
      }
    );
  });

  // Simulator state
  const [testDistanceKm, setTestDistanceKm] = useState<number>(12);
  const [testOrderValue, setTestOrderValue] = useState<number>(350);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Fee calculation logic
  const isOverRadius = testDistanceKm > config.maxServiceRadiusKm;
  const isFreeDelivery = testOrderValue >= config.freeDeliveryThreshold;
  const distanceCost = +(testDistanceKm * config.pricePerKm).toFixed(1);
  const calculatedFee = isFreeDelivery ? 0 : Math.round(config.baseFee + distanceCost);
  const totalCustomerCost = testOrderValue + calculatedFee;

  const handleSave = () => {
    onUpdateDeliveryConfig(selectedBranch.id, config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2800);
  };

  const handleApplyPreset = (preset: 'standard' | 'metro' | 'luxury') => {
    if (preset === 'standard') {
      setConfig({
        baseFee: 50,
        pricePerKm: 3.5,
        freeDeliveryThreshold: 500,
        maxServiceRadiusKm: 35,
        minimumBookingAmount: 150
      });
    } else if (preset === 'metro') {
      setConfig({
        baseFee: 35,
        pricePerKm: 3.0,
        freeDeliveryThreshold: 400,
        maxServiceRadiusKm: 25,
        minimumBookingAmount: 100
      });
    } else if (preset === 'luxury') {
      setConfig({
        baseFee: 80,
        pricePerKm: 5.0,
        freeDeliveryThreshold: 800,
        maxServiceRadiusKm: 50,
        minimumBookingAmount: 250
      });
    }
  };

  return (
    <div style={{ padding: '13px' }}>
      {/* زر الرجوع */}
      <button
        onClick={onBackToSettings}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-gold)',
          fontSize: '12px',
          fontWeight: 800,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '10px',
          fontFamily: 'var(--font-body)'
        }}
      >
        <ArrowRight size={14} /> الرجوع لمركز الإعدادات
      </button>

      {/* الترويسة */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Truck size={20} color="var(--gold-dark)" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-main)', margin: 0 }}>
            رسوم التوصيل المنزلي ونطاق التغطية
          </h2>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
          هيكلية تسعير الخدمات الخارجية واحتساب المسافات لـ <strong>{selectedBranch.name}</strong>
        </div>
      </div>

      {/* إشعار نجاح الحفظ */}
      {savedSuccess && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #6ee7b7',
            color: '#065f46',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '12px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <Check size={16} color="#059669" />
          <span>تم حفظ قواعد ورسوم التوصيل والمسافات بنجاح!</span>
        </div>
      )}

      {/* القوالب الجاهزة */}
      <div style={{ marginBottom: '14px' }}>
        <span style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          القوالب والتسعيرات الجاهزة
        </span>
        <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleApplyPreset('standard')}
            style={{
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: 'var(--text-gold)',
              padding: '5px 9px',
              borderRadius: '6px',
              fontSize: '10.5px',
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)'
            }}
          >
            الرياض القياسي (50 ر.س + 3.5/كم)
          </button>
          <button
            onClick={() => handleApplyPreset('metro')}
            style={{
              background: '#f1f5f9',
              border: '1px solid var(--border-dark)',
              color: 'var(--text-main)',
              padding: '5px 9px',
              borderRadius: '6px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)'
            }}
          >
            داخل المدينة (35 ر.س + 3.0/كم)
          </button>
          <button
            onClick={() => handleApplyPreset('luxury')}
            style={{
              background: '#f1f5f9',
              border: '1px solid var(--border-dark)',
              color: 'var(--text-main)',
              padding: '5px 9px',
              borderRadius: '6px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)'
            }}
          >
            فاخر VIP (80 ر.س + 5.0/كم)
          </button>
        </div>
      </div>

      {/* مدخلات معادلة التسعير */}
      <div className="gold-card" style={{ padding: '14px', marginBottom: '14px' }}>
        <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <DollarSign size={16} color="var(--text-gold)" />
          <span>معايير وضوابط احتساب رسوم الخدمة المنزلية</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* الرسوم الأساسية */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-main)' }}>
                الرسوم الأساسية لانتقال الطاقم
              </label>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-gold)' }}>
                {config.baseFee} ر.س
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="number"
                min="0"
                step="5"
                value={config.baseFee}
                onChange={(e) => setConfig({ ...config, baseFee: Number(e.target.value) })}
                style={{ flex: 1 }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>ر.س</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
              تحسب تلقائياً كرسوم فتح خدمة لانتقال الكادر وتجهيز حقائب العمل.
            </div>
          </div>

          {/* سعر الكيلومتر */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-main)' }}>
                سعر الكيلومتر الواحد
              </label>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-gold)' }}>
                {config.pricePerKm} ر.س / كم
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="number"
                min="0"
                step="0.5"
                value={config.pricePerKm}
                onChange={(e) => setConfig({ ...config, pricePerKm: Number(e.target.value) })}
                style={{ flex: 1 }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>ر.س/كم</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
              تحسب تلقائياً بناءً على مسافة القيادة من موقع الفرع حتى باب العميل.
            </div>
          </div>

          {/* حد التوصيل المجاني */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Gift size={13} color="#059669" /> حد التوصيل المجاني (قيمة الطلب)
              </label>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669' }}>
                {config.freeDeliveryThreshold} ر.س
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="number"
                min="0"
                step="25"
                value={config.freeDeliveryThreshold}
                onChange={(e) => setConfig({ ...config, freeDeliveryThreshold: Number(e.target.value) })}
                style={{ flex: 1 }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>ر.س</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
              الطلبات التي تبلغ هذا المبلغ أو أكثر تحصل على خدمة توصيل مجانية بنسبة 100%.
            </div>
          </div>

          {/* أقصى مسافة والحد الأدنى للطلب */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                أقصى مسافة تغطية
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={config.maxServiceRadiusKm}
                  onChange={(e) => setConfig({ ...config, maxServiceRadiusKm: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>كم</span>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                الحد الأدنى للطلب
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={config.minimumBookingAmount}
                  onChange={(e) => setConfig({ ...config, minimumBookingAmount: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>ر.س</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* حاسبة ومحاكي الرسوم المباشر */}
      <div className="gold-card highlight" style={{ padding: '14px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calculator size={16} color="var(--text-gold)" />
            <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)' }}>
              حاسبة ومحاكي الرسوم الفورية
            </span>
          </div>
          <span style={{ fontSize: '9.5px', background: 'rgba(212, 175, 55, 0.2)', color: 'var(--text-gold)', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
            تجربة احتساب
          </span>
        </div>

        {/* منزلق المسافة */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>المسافة المقدرة:</span>
            <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{testDistanceKm} كم</span>
          </div>
          <input
            type="range"
            min="1"
            max="45"
            value={testDistanceKm}
            onChange={(e) => setTestDistanceKm(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--gold-primary)' }}
          />
        </div>

        {/* منزلق قيمة الطلب */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>قيمة خدمات الطلب:</span>
            <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{testOrderValue} ر.س</span>
          </div>
          <input
            type="range"
            min="100"
            max="800"
            step="25"
            value={testOrderValue}
            onChange={(e) => setTestOrderValue(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--gold-primary)' }}
          />
        </div>

        {/* صندوق تفاصيل النتيجة */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '10px',
            padding: '12px',
            border: '1px solid var(--border-dark)'
          }}
        >
          {isOverRadius ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626' }}>
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '12px' }}>تجاوز الحد الأقصى للمسافة</div>
                <div style={{ fontSize: '10.5px', color: '#b91c1c' }}>
                  المسافة ({testDistanceKm} كم) تتجاوز أقصى نطاق تغطية للفرع ({config.maxServiceRadiusKm} كم). سيتم حظر الحجز لهذا العنوان.
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: 'var(--text-muted)' }}>
                <span>الرسوم الأساسية:</span>
                <span>{config.baseFee} ر.س</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: 'var(--text-muted)' }}>
                <span>تكلفة المسافة ({testDistanceKm} كم × {config.pricePerKm} ر.س):</span>
                <span>+{distanceCost} ر.س</span>
              </div>

              {isFreeDelivery && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: '#059669', fontWeight: 800 }}>
                  <span>خصم التوصيل المجاني (قيمة الطلب ≥ {config.freeDeliveryThreshold} ر.س):</span>
                  <span>- {Math.round(config.baseFee + distanceCost)} ر.س</span>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '8px',
                  marginTop: '8px',
                  borderTop: '1px dashed var(--border-dark)',
                  fontWeight: 800
                }}
              >
                <span style={{ fontSize: '12px', color: 'var(--text-main)' }}>رسوم التوصيل النهائية:</span>
                <span style={{ fontSize: '14px', color: isFreeDelivery ? '#059669' : 'var(--text-gold)' }}>
                  {isFreeDelivery ? 'مجاناً (0 ر.س)' : `${calculatedFee} ر.س`}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '6px',
                  fontSize: '11px',
                  color: 'var(--text-muted)'
                }}
              >
                <span>إجمالي الفاتورة المقدر على العميل:</span>
                <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>
                  {totalCustomerCost} ر.س
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* زر الحفظ */}
      <div style={{ paddingBottom: '20px' }}>
        <button
          onClick={handleSave}
          className="gold-button"
          style={{
            width: '100%',
            padding: '11px',
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Check size={16} /> حفظ إعدادات ورسوم التوصيل
        </button>
      </div>
    </div>
  );
};
