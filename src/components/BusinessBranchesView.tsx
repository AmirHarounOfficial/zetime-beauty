import React, { useState } from 'react';
import { Branch, BusinessProfile, Professional, ProviderRole, SubscriptionPlan, BusinessType } from '../types/zetime';
import { hasPermission } from '../utils/permissions';
import { TabType } from './Navigation';
import {
  Building2,
  Crown,
  UserCheck,
  Plus,
  Edit3,
  ArrowRight,
  MapPin,
  Phone,
  Clock,
  Check,
  AlertCircle,
  Briefcase,
  FileText,
  Mail,
  ShieldCheck,
  ExternalLink,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { AddBranchModal } from './Modals/AddBranchModal';
import { EditBranchModal } from './Modals/EditBranchModal';

interface BusinessBranchesViewProps {
  businessProfile: BusinessProfile;
  branches: Branch[];
  professionals: Professional[];
  subscription: SubscriptionPlan;
  currentRole: ProviderRole;
  selectedBranch: Branch;
  onSelectBranch: (branch: Branch) => void;
  onUpdateBusinessProfile: (updated: BusinessProfile) => void;
  onAddBranch: (newBranch: Branch) => void;
  onUpdateBranch: (updatedBranch: Branch) => void;
  onSetBranchManager: (branchId: string, managerId: string, managerName: string) => void;
  onDeleteBranch?: (branchId: string) => void;
  onBackToSettings: () => void;
  onNavigateToSubTab: (tab: TabType) => void;
}

export const BusinessBranchesView: React.FC<BusinessBranchesViewProps> = ({
  businessProfile,
  branches,
  professionals,
  subscription,
  currentRole,
  selectedBranch,
  onSelectBranch,
  onUpdateBusinessProfile,
  onAddBranch,
  onUpdateBranch,
  onSetBranchManager,
  onDeleteBranch,
  onBackToSettings,
  onNavigateToSubTab
}) => {
  const [activeSection, setActiveSection] = useState<'branches' | 'business'>('branches');
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Business profile editable state
  const [bizName, setBizName] = useState(businessProfile.name);
  const [bizType, setBizType] = useState<BusinessType>(businessProfile.type);
  const [bizCr, setBizCr] = useState(businessProfile.commercialRegistrationNumber);
  const [bizTax, setBizTax] = useState(businessProfile.taxNumber);
  const [bizPhone, setBizPhone] = useState(businessProfile.phone);
  const [bizEmail, setBizEmail] = useState(businessProfile.email);
  const [bizCity, setBizCity] = useState(businessProfile.city || 'الرياض');
  const [bizAddress, setBizAddress] = useState(businessProfile.address || 'طريق الملك فهد، حي الصحافة');
  const [bizDescription, setBizDescription] = useState(businessProfile.description);

  const canManageBusiness = hasPermission(currentRole, 'MANAGE_SUBSCRIPTION') || currentRole === 'BUSINESS_OWNER';

  const businessTypes: { type: BusinessType; label: string }[] = [
    { type: 'Salon', label: 'صالون نسائي / رجالي' },
    { type: 'Barber Shop', label: 'صالون حلاقة رجالي' },
    { type: 'Spa', label: 'سبا واستجمام' },
    { type: 'Beauty Center', label: 'مركز تجميل وعناية شامل' },
    { type: 'Nail & Lash Studio', label: 'استوديو أظافر ورموش' },
    { type: 'Independent Professional', label: 'أخصائية تجميل مستقلة' },
    { type: 'Home-Service Professional', label: 'خدمات تجميل منزلية متنقلة' }
  ];

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BusinessProfile = {
      ...businessProfile,
      name: bizName,
      type: bizType,
      commercialRegistrationNumber: bizCr,
      taxNumber: bizTax,
      phone: bizPhone,
      email: bizEmail,
      city: bizCity,
      address: bizAddress,
      description: bizDescription
    };
    onUpdateBusinessProfile(updated);
    setSaveSuccessMsg('تم حفظ وتحديث بيانات الملف التجاري بنجاح!');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const handleBranchManagerSelect = (branchId: string, staffId: string) => {
    const staff = professionals.find((p) => p.id === staffId);
    if (staff) {
      onSetBranchManager(branchId, staff.id, staff.name);
      setSaveSuccessMsg(`تم تعيين ${staff.name} مديراً للفرع بنجاح!`);
      setTimeout(() => setSaveSuccessMsg(null), 3000);
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
          marginBottom: '8px',
          fontFamily: 'var(--font-body)'
        }}
      >
        <ArrowRight size={14} /> الرجوع لمركز الإعدادات
      </button>

      {/* الترويسة */}
      <div style={{ marginBottom: '12px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-gold)', margin: 0 }}>
          إدارة المنشأة وفروع العمل
        </h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          إعداد وتعديل الملف التجاري، الفروع، وتعيين المدراء
        </span>
      </div>

      {/* إشعار نجاح الحفظ */}
      {saveSuccessMsg && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '10px',
            padding: '10px 12px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#047857',
            fontSize: '11px',
            fontWeight: 800
          }}
        >
          <Check size={16} color="#059669" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* التبديل بين الفروع والملف التجاري */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px',
          background: '#f1ede4',
          padding: '4px',
          borderRadius: '10px',
          marginBottom: '14px'
        }}
      >
        <button
          onClick={() => setActiveSection('branches')}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            background: activeSection === 'branches' ? 'var(--gold-gradient)' : 'transparent',
            color: activeSection === 'branches' ? '#000000' : 'var(--text-muted)',
            boxShadow: activeSection === 'branches' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontFamily: 'var(--font-body)'
          }}
        >
          <Building2 size={14} /> فروع المنشأة ({branches.length})
        </button>

        <button
          onClick={() => setActiveSection('business')}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            background: activeSection === 'business' ? 'var(--gold-gradient)' : 'transparent',
            color: activeSection === 'business' ? '#000000' : 'var(--text-muted)',
            boxShadow: activeSection === 'business' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontFamily: 'var(--font-body)'
          }}
        >
          <Briefcase size={14} /> الملف التجاري
        </button>
      </div>

      {/* القسم 1: إدارة الفروع */}
      {activeSection === 'branches' && (
        <div>
          {/* الإجراءات وحدود الباقة */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-main)' }}>
                الفروع النشطة
              </span>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                {branches.length} من أصل {subscription.branchLimit} فروع مسموحة بالباقة
              </div>
            </div>

            {canManageBusiness && (
              <button
                onClick={() => {
                  if (branches.length >= subscription.branchLimit) {
                    alert(`تم الوصول للحد الأقصى للفروع (${subscription.branchLimit} فروع). يرجى ترقية الباقة لإضافة فروع جديدة.`);
                    return;
                  }
                  setIsAddBranchOpen(true);
                }}
                style={{
                  background: 'var(--gold-gradient)',
                  color: '#0d0d10',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 8px var(--gold-glow)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                <Plus size={14} /> إضافة فرع جديد
              </button>
            )}
          </div>

          {/* قائمة الفروع */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {branches.map((b) => {
              const isSelected = b.id === selectedBranch.id;

              return (
                <div
                  key={b.id}
                  className="gold-card"
                  style={{
                    padding: '14px',
                    border: isSelected ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-dark)',
                    position: 'relative'
                  }}
                >
                  {/* السطر الأول: الاسم والحالة */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
                          color: 'var(--text-gold)',
                          flexShrink: 0
                        }}
                      >
                        <Building2 size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{b.name}</span>
                          {isSelected && (
                            <span
                              style={{
                                background: 'var(--gold-gradient)',
                                color: '#000',
                                fontSize: '8.5px',
                                fontWeight: 800,
                                padding: '1px 5px',
                                borderRadius: '4px'
                              }}
                            >
                              الفرع النشط
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                          <MapPin size={11} color="var(--text-gold)" /> {b.address}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        background: b.isActive ? 'rgba(16, 185, 129, 0.15)' : '#f1f5f9',
                        color: b.isActive ? '#059669' : '#64748b',
                        fontSize: '9.5px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '10px'
                      }}
                    >
                      {b.isActive ? 'يعمل' : 'غير نشط'}
                    </span>
                  </div>

                  {/* تفاصيل الفرع */}
                  <div
                    style={{
                      marginTop: '10px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      fontSize: '11px',
                      color: 'var(--text-main)',
                      background: '#faf8f3',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(212, 175, 55, 0.2)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Phone size={12} color="var(--text-gold)" />
                      <span>{b.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={12} color="var(--text-gold)" />
                      <span>{b.workingHours}</span>
                    </div>
                  </div>

                  {/* اختيار وتعيين مدير الفرع */}
                  <div
                    style={{
                      marginTop: '10px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: '#ffffff',
                      border: '1.5px solid var(--border-gold)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <UserCheck size={14} color="var(--text-gold)" />
                        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-main)' }}>
                          المدير المسؤول عن الفرع:
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '9.5px',
                          color: 'var(--text-gold)',
                          fontWeight: 800,
                          background: 'rgba(212, 175, 55, 0.12)',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        ⭐ {b.managerName || 'غير محدد'}
                      </span>
                    </div>

                    {/* قائمة الموظفين لاختيار المدير */}
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <select
                        value={b.managerId}
                        onChange={(e) => handleBranchManagerSelect(b.id, e.target.value)}
                        disabled={!canManageBusiness}
                        style={{
                          flex: 1,
                          padding: '7px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-dark)',
                          background: '#fff',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          color: 'var(--text-main)',
                          cursor: canManageBusiness ? 'pointer' : 'not-allowed',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        {professionals.map((prof) => (
                          <option key={prof.id} value={prof.id}>
                            {prof.name} ({prof.title})
                          </option>
                        ))}
                      </select>
                    </div>
                    <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                      يمتلك مدير الفرع صلاحية تنظيم المناوبات، إدارة قائمة الانتظار، والإشراف اليومي الكامل.
                    </span>
                  </div>

                  {/* أزرار الإجراءات للفرع */}
                  <div
                    style={{
                      marginTop: '10px',
                      paddingTop: '8px',
                      borderTop: '1px solid var(--border-dark)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {!isSelected && (
                        <button
                          onClick={() => onSelectBranch(b)}
                          style={{
                            background: '#f1f5f9',
                            color: 'var(--text-main)',
                            border: '1px solid var(--border-dark)',
                            borderRadius: '6px',
                            padding: '5px 9px',
                            fontSize: '10.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontFamily: 'var(--font-body)'
                          }}
                        >
                          تعيين كنشط
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onSelectBranch(b);
                          onNavigateToSubTab('operating-hours');
                        }}
                        style={{
                          background: '#faf8f3',
                          color: 'var(--text-gold)',
                          border: '1px solid var(--border-gold)',
                          borderRadius: '6px',
                          padding: '5px 9px',
                          fontSize: '10.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        <Clock size={10} /> الدوام
                      </button>

                      <button
                        onClick={() => {
                          onSelectBranch(b);
                          onNavigateToSubTab('delivery-fees');
                        }}
                        style={{
                          background: '#faf8f3',
                          color: '#059669',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: '6px',
                          padding: '5px 9px',
                          fontSize: '10.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        رسوم التوصيل
                      </button>
                    </div>

                    {canManageBusiness && (
                      <button
                        onClick={() => setEditingBranch(b)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-gold)',
                          fontSize: '11px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        <Edit3 size={11} /> تعديل الفرع
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* القسم 2: الملف التجاري للمنشأة */}
      {activeSection === 'business' && (
        <div>
          <div className="gold-card" style={{ padding: '14px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Crown size={18} color="var(--text-gold)" />
                <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)' }}>
                  بيانات السجل التجاري والتوثيق
                </span>
              </div>
              <span
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#059669',
                  fontSize: '9.5px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}
              >
                موثق ومعتمد
              </span>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.4 }}>
              بيانات السجل التجاري والرقم الضريبي المسجلة رسمياً ومتوافقة مع متطلبات وزارة التجارة وهيئة الزكاة والضريبة والجمارك.
            </p>

            <form onSubmit={handleSaveBusiness} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* الاسم التجاري */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                  الاسم التجاري للمنشأة *
                </label>
                <input
                  type="text"
                  required
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              {/* تصنيف المنشأة */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                  تصنيف ونوع النشاط *
                </label>
                <select
                  value={bizType}
                  onChange={(e) => setBizType(e.target.value as BusinessType)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border-gold)',
                    background: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  {businessTypes.map((item) => (
                    <option key={item.type} value={item.type}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* السجل التجاري والرقم الضريبي */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                    رقم السجل التجاري *
                  </label>
                  <input
                    type="text"
                    required
                    value={bizCr}
                    onChange={(e) => setBizCr(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                    الرقم الضريبي (VAT) *
                  </label>
                  <input
                    type="text"
                    required
                    value={bizTax}
                    onChange={(e) => setBizTax(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* الهاتف والبريد */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                    هاتف المنشأة *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bizPhone}
                    onChange={(e) => setBizPhone(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                    البريد الإلكتروني الرسمي *
                  </label>
                  <input
                    type="email"
                    required
                    value={bizEmail}
                    onChange={(e) => setBizEmail(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* العنوان والمدينة */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                    المدينة
                  </label>
                  <input
                    type="text"
                    value={bizCity}
                    onChange={(e) => setBizCity(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                    العنوان والشارع
                  </label>
                  <input
                    type="text"
                    value={bizAddress}
                    onChange={(e) => setBizAddress(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* نبذة عن المنشأة */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                  نبذة تعريفية عامة عن المنشأة
                </label>
                <textarea
                  rows={3}
                  value={bizDescription}
                  onChange={(e) => setBizDescription(e.target.value)}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              {canManageBusiness && (
                <button
                  type="submit"
                  className="gold-button"
                  style={{ marginTop: '8px' }}
                >
                  <Check size={16} /> حفظ بيانات الملف التجاري
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* نافذة إضافة فرع جديد */}
      {isAddBranchOpen && (
        <AddBranchModal
          isOpen={isAddBranchOpen}
          onClose={() => setIsAddBranchOpen(false)}
          professionals={professionals}
          onAdd={(newBranch) => {
            onAddBranch(newBranch);
            setSaveSuccessMsg(`تم إنشاء الفرع الجديد "${newBranch.name}" بنجاح!`);
            setTimeout(() => setSaveSuccessMsg(null), 3500);
          }}
        />
      )}

      {/* نافذة تعديل بيانات الفرع */}
      {editingBranch && (
        <EditBranchModal
          isOpen={Boolean(editingBranch)}
          onClose={() => setEditingBranch(null)}
          branch={editingBranch}
          professionals={professionals}
          canDelete={branches.length > 1}
          onSave={(updated) => {
            onUpdateBranch(updated);
            setEditingBranch(null);
            setSaveSuccessMsg(`تم تحديث بيانات الفرع "${updated.name}" بنجاح!`);
            setTimeout(() => setSaveSuccessMsg(null), 3500);
          }}
          onDelete={(id) => {
            if (onDeleteBranch) {
              onDeleteBranch(id);
            }
            setEditingBranch(null);
          }}
        />
      )}
    </div>
  );
};
