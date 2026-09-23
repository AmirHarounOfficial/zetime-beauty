import React, { useState } from 'react';
import { SubscriptionPlan, ProviderRole, Branch } from '../types/zetime';
import { hasPermission } from '../utils/permissions';
import { TabType } from './Navigation';
import {
  ShieldCheck,
  Crown,
  Users,
  BarChart3,
  UserCheck,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Building2,
  Lock,
  Check,
  Scissors,
  Car,
  Shield,
  Building,
  AlertCircle
} from 'lucide-react';

interface SettingsViewProps {
  subscription: SubscriptionPlan;
  currentRole: ProviderRole;
  onSelectRole: (role: ProviderRole) => void;
  selectedBranch: Branch;
  branches: Branch[];
  onSelectBranch: (branch: Branch) => void;
  onNavigateToSubTab: (tab: TabType) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  subscription,
  currentRole,
  onSelectRole,
  selectedBranch,
  branches,
  onSelectBranch,
  onNavigateToSubTab
}) => {
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [emergencyClose, setEmergencyClose] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [permissionAlert, setPermissionAlert] = useState<string | null>(null);

  const canManageSub = hasPermission(currentRole, 'MANAGE_SUBSCRIPTION');
  const canViewAnalytics = hasPermission(currentRole, 'VIEW_ANALYTICS');
  const canManageStaff = hasPermission(currentRole, 'MANAGE_STAFF');
  const canSwitchBranches = hasPermission(currentRole, 'SWITCH_BRANCHES');

  const availableRoles: {
    role: ProviderRole;
    title: string;
    icon: React.ReactNode;
    desc: string;
    permissionsSummary: string;
  }[] = [
    {
      role: 'BUSINESS_OWNER',
      title: 'Business Owner',
      icon: <Crown size={18} color="var(--gold-primary)" />,
      desc: 'Full business management, multi-branch access, financial reports & staff transfers',
      permissionsSummary: 'Full Access • All Privileges'
    },
    {
      role: 'BRANCH_MANAGER',
      title: 'Branch Manager',
      icon: <Building size={18} color="#2563eb" />,
      desc: 'Assigned branch operations, daily staff shifts & branch performance analytics',
      permissionsSummary: 'Branch Operations & Shifts'
    },
    {
      role: 'BRANCH_STAFF',
      title: 'Branch Staff (Reception)',
      icon: <Users size={18} color="#7c3aed" />,
      desc: 'Front desk check-ins, guest arrivals & live queue. No financial data or pricing edits',
      permissionsSummary: 'Check-ins & Queue Only'
    },
    {
      role: 'PROFESSIONAL',
      title: 'Professional Stylist',
      icon: <Scissors size={18} color="#d97706" />,
      desc: 'Personal station chair, assigned clients, treatment schedules & personal commission/tips',
      permissionsSummary: 'Personal Chair & Assigned Clients'
    },
    {
      role: 'FREELANCER',
      title: 'Independent Freelancer',
      icon: <Car size={18} color="#16a34a" />,
      desc: 'Solo mobile provider: Home beauty appointments, GPS dispatch & direct payouts',
      permissionsSummary: 'Solo Mobile Provider & GPS'
    }
  ];

  const handleToolClick = (tool: 'crm' | 'analytics' | 'professionals') => {
    if (tool === 'analytics') {
      if (!canViewAnalytics) {
        setPermissionAlert(
          `Permission Denied: Financial revenue and analytics reports are restricted to Business Owners and Managers. Active role "${currentRole.replace('_', ' ')}" has no financial clearance.`
        );
        return;
      }
      onNavigateToSubTab('analytics');
    } else if (tool === 'professionals') {
      if (!canManageStaff) {
        setPermissionAlert(
          `Permission Denied: Team shift rosters and branch transfers are restricted to Business Owners and Branch Managers.`
        );
        return;
      }
      onNavigateToSubTab('professionals');
    } else {
      onNavigateToSubTab('crm');
    }
  };

  return (
    <div style={{ padding: '14px' }}>
      {/* Active Session & Switch Role Section */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Switch Role & Profile
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-gold)', fontWeight: 700 }}>
            Live Permission Matrix
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {availableRoles.map((r) => {
            const isSelected = r.role === currentRole;
            return (
              <div
                key={r.role}
                onClick={() => {
                  onSelectRole(r.role);
                  setPermissionAlert(null);
                }}
                className={`role-option-card ${isSelected ? 'selected' : ''}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ marginTop: '2px' }}>{r.icon}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{r.title}</span>
                        {isSelected && (
                          <span
                            style={{
                              background: 'var(--gold-gradient)',
                              color: '#000',
                              fontSize: '9px',
                              fontWeight: 800,
                              padding: '2px 6px',
                              borderRadius: '4px'
                            }}
                          >
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.3 }}>
                        {r.desc}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-gold)', fontWeight: 700, marginTop: '4px' }}>
                        ⚡ {r.permissionsSummary}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check size={18} color="var(--gold-dark)" style={{ flexShrink: 0 }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Branch Location Section */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
          Assigned Salon Location
        </div>

        {currentRole === 'FREELANCER' ? (
          <div className="gold-card" style={{ padding: '12px', background: '#f0fdf4', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a' }}>
              <Car size={16} />
              <span style={{ fontWeight: 700, fontSize: '13px' }}>Independent Solo Provider</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Mobile beauty & on-demand home visits in Riyadh. No physical branch assignment required.
            </div>
          </div>
        ) : (
          <div
            onClick={() => canSwitchBranches && setIsBranchModalOpen(true)}
            className="gold-card"
            style={{
              padding: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: canSwitchBranches ? 'pointer' : 'default',
              marginBottom: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={16} color="var(--text-gold)" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>
                  {selectedBranch.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {selectedBranch.address}
                </div>
              </div>
            </div>
            {canSwitchBranches ? (
              <span style={{ fontSize: '11px', color: 'var(--text-gold)', fontWeight: 700 }}>
                Switch ▾
              </span>
            ) : (
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                Assigned
              </span>
            )}
          </div>
        )}
      </div>

      {/* Permission Restriction Alert Box (if triggered) */}
      {permissionAlert && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '10px',
            padding: '12px',
            marginBottom: '14px',
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start'
          }}
        >
          <AlertCircle size={16} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: 700 }}>Access Restricted</div>
            <div style={{ fontSize: '11px', color: '#991b1b', marginTop: '2px', lineHeight: 1.3 }}>
              {permissionAlert}
            </div>
          </div>
          <button
            onClick={() => setPermissionAlert(null)}
            style={{ background: 'none', border: 'none', color: '#991b1b', cursor: 'pointer', fontWeight: 800, fontSize: '12px' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Provider Operational Tools Grid */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
          Provider Management Tools
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* CRM */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleToolClick('crm')}
            className="gold-card settings-tool-card"
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                className="icon-avatar-badge"
                style={{
                  background: 'rgba(212, 175, 55, 0.15)',
                  color: 'var(--text-gold)'
                }}
              >
                <UserCheck size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>
                  Customer CRM & Beauty Profiles
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Allergies, preferences & spending history
                </div>
              </div>
            </div>
            <ChevronRight size={16} color="var(--text-muted)" />
          </div>

          {/* Analytics */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleToolClick('analytics')}
            className="gold-card settings-tool-card"
            style={{ opacity: canViewAnalytics ? 1 : 0.8 }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                className="icon-avatar-badge"
                style={{
                  background: canViewAnalytics ? 'rgba(37, 99, 235, 0.12)' : '#f1f5f9',
                  color: canViewAnalytics ? '#2563eb' : 'var(--text-muted)'
                }}
              >
                <BarChart3 size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Business & Branch Analytics</span>
                  {!canViewAnalytics && (
                    <span className="permission-locked-badge">
                      <Lock size={10} /> Locked
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {canViewAnalytics
                    ? 'Revenue trends, top services & completion rates'
                    : 'Requires Business Owner / Manager permissions'}
                </div>
              </div>
            </div>
            {canViewAnalytics ? (
              <ChevronRight size={16} color="var(--text-muted)" />
            ) : (
              <Lock size={14} color="#dc2626" />
            )}
          </div>

          {/* Staff Roster */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleToolClick('professionals')}
            className="gold-card settings-tool-card"
            style={{ opacity: canManageStaff ? 1 : 0.8 }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                className="icon-avatar-badge"
                style={{
                  background: canManageStaff ? 'rgba(124, 58, 237, 0.12)' : '#f1f5f9',
                  color: canManageStaff ? '#7c3aed' : 'var(--text-muted)'
                }}
              >
                <Users size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Staff & Team Roster</span>
                  {!canManageStaff && (
                    <span className="permission-locked-badge">
                      <Lock size={10} /> Locked
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {canManageStaff
                    ? 'Branch transfers, hours & home-service eligibility'
                    : 'Requires Business Owner / Manager permissions'}
                </div>
              </div>
            </div>
            {canManageStaff ? (
              <ChevronRight size={16} color="var(--text-muted)" />
            ) : (
              <Lock size={14} color="#dc2626" />
            )}
          </div>
        </div>
      </div>

      {/* Subscription Status Card */}
      <div className="gold-card highlight" style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crown size={18} color="var(--text-gold)" />
            <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-gold)' }}>
              {subscription.name}
            </span>
          </div>
          <span
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#059669',
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '10px'
            }}
          >
            ACTIVE
          </span>
        </div>

        <div style={{ marginTop: '10px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}>
            <span>Branches Usage:</span>
            <span style={{ fontWeight: 700, color: 'var(--text-gold)' }}>
              {subscription.currentBranchCount} / {subscription.branchLimit} Branches
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}>
            <span>Professionals Limit:</span>
            <span style={{ fontWeight: 700, color: 'var(--text-gold)' }}>
              {subscription.currentProfessionalCount} / {subscription.professionalLimit} Staff
            </span>
          </div>

          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Renews on {subscription.expiryDate} {!canManageSub && '• Managed by Business Owner'}
          </div>
        </div>
      </div>

      {/* Operational Toggles */}
      <div className="gold-card" style={{ marginBottom: '14px' }}>
        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)', marginBottom: '10px' }}>
          Operational Rules & Control
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-dark)' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-main)', fontWeight: 600 }}>Auto-Confirm Bookings</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Skip manual confirmation for standard services</div>
          </div>
          <button
            onClick={() => canManageSub && setAutoConfirm(!autoConfirm)}
            disabled={!canManageSub}
            style={{ background: 'none', border: 'none', cursor: canManageSub ? 'pointer' : 'not-allowed', color: autoConfirm ? 'var(--gold-primary)' : 'var(--text-muted)', opacity: canManageSub ? 1 : 0.4 }}
          >
            {autoConfirm ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: 600 }}>Emergency Branch Closure</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Temporarily pause new customer bookings</div>
          </div>
          <button
            onClick={() => canManageSub && setEmergencyClose(!emergencyClose)}
            disabled={!canManageSub}
            style={{ background: 'none', border: 'none', cursor: canManageSub ? 'pointer' : 'not-allowed', color: emergencyClose ? '#dc2626' : 'var(--text-muted)', opacity: canManageSub ? 1 : 0.4 }}
          >
            {emergencyClose ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
          </button>
        </div>
      </div>

      {/* Branch Switcher Modal Sheet */}
      {isBranchModalOpen && (
        <div className="modal-overlay" onClick={() => setIsBranchModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={18} color="var(--text-gold)" />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-main)', margin: 0 }}>
                  Select Operating Branch
                </h3>
              </div>
              <button
                onClick={() => setIsBranchModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 700 }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {branches.map((b) => {
                const isSelected = b.id === selectedBranch.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => {
                      onSelectBranch(b);
                      setIsBranchModalOpen(false);
                    }}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: isSelected ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-dark)',
                      background: isSelected ? 'rgba(212, 175, 55, 0.08)' : '#ffffff',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>{b.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.address}</div>
                    </div>
                    {isSelected && <Check size={16} color="var(--gold-dark)" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
