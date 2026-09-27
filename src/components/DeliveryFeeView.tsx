import React, { useState } from 'react';
import { Branch, DeliveryFeeConfig } from '../types/zetime';
import {
  ArrowLeft,
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
    <div style={{ padding: '14px' }}>
      {/* Back button */}
      <button
        onClick={onBackToSettings}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-gold)',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '10px'
        }}
      >
        <ArrowLeft size={14} /> Back to Settings Hub
      </button>

      {/* Header */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Truck size={20} color="var(--gold-dark)" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', color: 'var(--text-main)', margin: 0 }}>
            Home Delivery Fee & Radius
          </h2>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
          Call-out fee structure and travel calculation for <strong>{selectedBranch.name}</strong>
        </div>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #6ee7b7',
            color: '#065f46',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px'
          }}
        >
          <Check size={16} color="#059669" />
          <span>Delivery fees and radius rules successfully saved!</span>
        </div>
      )}

      {/* Quick Presets */}
      <div style={{ marginBottom: '14px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Rate Presets
        </span>
        <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleApplyPreset('standard')}
            style={{
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: 'var(--text-gold)',
              padding: '5px 8px',
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Standard Riyadh (50 SAR + 3.5/km)
          </button>
          <button
            onClick={() => handleApplyPreset('metro')}
            style={{
              background: '#f1f5f9',
              border: '1px solid var(--border-dark)',
              color: 'var(--text-main)',
              padding: '5px 8px',
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Compact Metro (35 SAR + 3.0/km)
          </button>
          <button
            onClick={() => handleApplyPreset('luxury')}
            style={{
              background: '#f1f5f9',
              border: '1px solid var(--border-dark)',
              color: 'var(--text-main)',
              padding: '5px 8px',
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            VIP Luxury (80 SAR + 5.0/km)
          </button>
        </div>
      </div>

      {/* Config Inputs Card */}
      <div className="gold-card" style={{ padding: '14px', marginBottom: '14px' }}>
        <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <DollarSign size={16} color="var(--text-gold)" />
          <span>Pricing Formula Parameters</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Base Fee */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-main)' }}>
                Minimum Call-out Charge (Base Fee)
              </label>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-gold)' }}>
                {config.baseFee} SAR
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
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>SAR</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Charged automatically as the base fee for dispatching staff and equipment.
            </div>
          </div>

          {/* Cost per Km */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-main)' }}>
                Cost per Kilometer
              </label>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-gold)' }}>
                {config.pricePerKm} SAR / km
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
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>SAR/km</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Calculated via Google Maps driving distance from branch to client doorstep.
            </div>
          </div>

          {/* Free Delivery Threshold */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Gift size={13} color="#059669" /> Free Delivery Order Value
              </label>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669' }}>
                {config.freeDeliveryThreshold} SAR
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
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>SAR</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Orders at or above this amount receive 100% free delivery.
            </div>
          </div>

          {/* Max Radius & Min Booking Amount */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                Max Travel Radius
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
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>km</span>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                Min Booking Value
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
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>SAR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulator / Live Fee Estimator */}
      <div className="gold-card highlight" style={{ padding: '14px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calculator size={16} color="var(--text-gold)" />
            <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)' }}>
              Live Fee Estimator & Simulator
            </span>
          </div>
          <span style={{ fontSize: '10px', background: 'rgba(212, 175, 55, 0.2)', color: 'var(--text-gold)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
            TEST CALCULATION
          </span>
        </div>

        {/* Distance Slider */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Simulated Distance:</span>
            <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{testDistanceKm} km</span>
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

        {/* Order Value Slider */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Simulated Order Services Value:</span>
            <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{testOrderValue} SAR</span>
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

        {/* Calculation Result Breakdown Box */}
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
              <AlertTriangle size={18} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '12px' }}>Exceeds Service Radius</div>
                <div style={{ fontSize: '10px', color: '#b91c1c' }}>
                  {testDistanceKm} km exceeds maximum branch radius ({config.maxServiceRadiusKm} km). Home booking will be blocked for this location.
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: 'var(--text-muted)' }}>
                <span>Base Charge:</span>
                <span>{config.baseFee} SAR</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: 'var(--text-muted)' }}>
                <span>Distance Rate ({testDistanceKm} km × {config.pricePerKm} SAR):</span>
                <span>+{distanceCost} SAR</span>
              </div>

              {isFreeDelivery && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: '#059669', fontWeight: 700 }}>
                  <span>Free Delivery Discount (Order ≥ {config.freeDeliveryThreshold} SAR):</span>
                  <span>- {Math.round(config.baseFee + distanceCost)} SAR</span>
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
                <span style={{ fontSize: '12px', color: 'var(--text-main)' }}>Final Delivery Charge:</span>
                <span style={{ fontSize: '14px', color: isFreeDelivery ? '#059669' : 'var(--text-gold)' }}>
                  {isFreeDelivery ? 'FREE (0 SAR)' : `${calculatedFee} SAR`}
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
                <span>Estimated Customer Total:</span>
                <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>
                  {totalCustomerCost} SAR
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div style={{ paddingBottom: '24px' }}>
        <button
          onClick={handleSave}
          className="gold-btn"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Check size={16} /> Save Delivery Settings
        </button>
      </div>
    </div>
  );
};
