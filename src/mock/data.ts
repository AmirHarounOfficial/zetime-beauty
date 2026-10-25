import {
  Branch,
  MasterService,
  BranchService,
  Professional,
  Booking,
  QueueEntry,
  CustomerProfile,
  NotificationItem,
  SubscriptionPlan,
  BusinessProfile
} from '../types/zetime';

export const mockBusinessProfile: BusinessProfile = {
  id: 'biz-1',
  name: 'مركز زيتيم بريستيج للتجميل والرفاهية',
  type: 'Beauty Center',
  commercialRegistrationNumber: '1010928374',
  taxNumber: '310294857200003',
  phone: '+966 11 482 9900',
  email: 'concierge@zetimebeauty.com',
  description: 'المركز الفاخر الرائد في المملكة لخدمات التجميل الشاملة، طقوس العناية الملكية بالبشرة، والزيارات المنزلية VIP.',
  status: 'Active',
  city: 'الرياض',
  address: 'طريق الملك فهد، حي الصحافة الراقي، الرياض'
};

export const mockBranches: Branch[] = [
  {
    id: 'b-1',
    name: 'فرع برج المملكة الرئيسي',
    address: 'طريق الملك فهد، برج 4، الرياض',
    phone: '+966 50 123 4567',
    workingHours: '10:00 - 22:00',
    isActive: true,
    managerId: 'm-1',
    managerName: 'نورة العتيبي',
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
      { day: 'Sunday', isAvailable: false, startTime: '11:00', endTime: '20:00' },
      { day: 'Monday', isAvailable: false, startTime: '11:00', endTime: '20:00' },
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
  },
  {
    id: 'b-2',
    name: 'فرع غاليريا مول الفاخر',
    address: 'شارع العليا، غاليريا مول بوابة 2، الرياض',
    phone: '+966 50 987 6543',
    workingHours: '10:00 - 23:00',
    isActive: true,
    managerId: 'm-2',
    managerName: 'فهد الزهراني',
    operatingSchedule: [
      { day: 'Sunday', isOpen: true, openTime: '10:00', closeTime: '23:00' },
      { day: 'Monday', isOpen: true, openTime: '10:00', closeTime: '23:00' },
      { day: 'Tuesday', isOpen: true, openTime: '10:00', closeTime: '23:00' },
      { day: 'Wednesday', isOpen: true, openTime: '10:00', closeTime: '23:00' },
      { day: 'Thursday', isOpen: true, openTime: '10:00', closeTime: '23:30' },
      { day: 'Friday', isOpen: true, openTime: '13:00', closeTime: '23:30' },
      { day: 'Saturday', isOpen: true, openTime: '10:00', closeTime: '23:00' }
    ],
    homeServiceSchedule: [
      { day: 'Sunday', isAvailable: true, startTime: '12:00', endTime: '21:00' },
      { day: 'Monday', isAvailable: true, startTime: '12:00', endTime: '21:00' },
      { day: 'Tuesday', isAvailable: true, startTime: '12:00', endTime: '21:00' },
      { day: 'Wednesday', isAvailable: true, startTime: '12:00', endTime: '21:00' },
      { day: 'Thursday', isAvailable: true, startTime: '12:00', endTime: '22:00' },
      { day: 'Friday', isAvailable: true, startTime: '14:00', endTime: '22:00' },
      { day: 'Saturday', isAvailable: true, startTime: '12:00', endTime: '21:00' }
    ],
    deliveryFeeConfig: {
      baseFee: 45,
      pricePerKm: 3.0,
      freeDeliveryThreshold: 450,
      maxServiceRadiusKm: 30,
      minimumBookingAmount: 120
    }
  }
];

export const mockMasterCatalog: MasterService[] = [
  {
    id: 'ms-1',
    name: 'قص وسشوار ملكي فاخر',
    category: 'Hair',
    description: 'قص دقيق احترافي مع غسيل شامبو عضوي وسشوار لمسة الذهب اللامع.',
    defaultDurationMinutes: 45,
    genderAudience: 'Women'
  },
  {
    id: 'ms-2',
    name: 'جلسة نضارة الوجه بذهب عيار 24',
    category: 'Facial & Skincare',
    description: 'ترطيب عميق وتغذية للبشرة برقائق الذهب الخالص عيار 24 ومحفز الكولاجين.',
    defaultDurationMinutes: 60,
    genderAudience: 'All'
  },
  {
    id: 'ms-3',
    name: 'مناكير سبا وأظافر جل متكاملة',
    category: 'Nails',
    description: 'عناية كاملة بالأظافر وتقشير اليدين بالأعشاب الطبيعية مع طبقة جل متينة.',
    defaultDurationMinutes: 50,
    genderAudience: 'Women'
  },
  {
    id: 'ms-4',
    name: 'حمام مغربي ملكي ومساج مهدئ',
    category: 'Spa & Body',
    description: 'تقشير بالصابون الأسود المغربي والبخار المعطر مع جلسة مساج لمدة 30 دقيقة.',
    defaultDurationMinutes: 90,
    genderAudience: 'All'
  },
  {
    id: 'ms-5',
    name: 'تهذيب وتحديد اللحية بالفوطة الساخنة',
    category: 'Beard & Grooming',
    description: 'رسم وتحديد احترافي بالموس مع زيوت التغذية وتكميد بالفوطة الساخنة المنعشة.',
    defaultDurationMinutes: 30,
    genderAudience: 'Men'
  },
  {
    id: 'ms-6',
    name: 'مكياج وتسريحة العروس VIP (منزلي)',
    category: 'Home Beauty',
    description: 'فريق تجميل منزلي متنقل بكامل التجهيزات لتقديم أرقى تسريحات ومكياج المناسبات.',
    defaultDurationMinutes: 120,
    genderAudience: 'Women'
  },
  {
    id: 'ms-7',
    name: 'معالجة الكيراتين الحريري والبروتين',
    category: 'Hair',
    description: 'كيراتين طبيعي خالٍ من الفورمالديهايد لتنعيم وتغذية الشعر وإضفاء بريق فوري.',
    defaultDurationMinutes: 105,
    genderAudience: 'Women'
  },
  {
    id: 'ms-8',
    name: 'تنظيف عميق وتقشير هيدرافيشل',
    category: 'Facial & Skincare',
    description: 'تقنية التنقية بالشفط الهوائي مع تغلغل أمصال الببتيدات والعلاج الضوئي LED.',
    defaultDurationMinutes: 50,
    genderAudience: 'All'
  },
  {
    id: 'ms-9',
    name: 'تركيب أظافر أكريليك مع رسم فرنسي',
    category: 'Nails',
    description: 'تركيب أطراف أكريليك يدوية متقنة مع فرنش كلاسيكي وزيت تغذية البشرة.',
    defaultDurationMinutes: 75,
    genderAudience: 'Women'
  },
  {
    id: 'ms-10',
    name: 'مساج استرخائي كامل بالزيوت العطرية',
    category: 'Spa & Body',
    description: 'مساج سويدي علاجي بزيت اللافندر الطبيعي الدافئ لإزالة الإجهاد العضلي.',
    defaultDurationMinutes: 60,
    genderAudience: 'All'
  },
  {
    id: 'ms-11',
    name: 'جلسة حمام زيت للشعر وفروة الرأس',
    category: 'Beard & Grooming',
    description: 'تغذية عميقة بالبخار لتقوية بصيلات الشعر وتنشيط الدورة الدموية.',
    defaultDurationMinutes: 40,
    genderAudience: 'Men'
  },
  {
    id: 'ms-12',
    name: 'مكياج سهرة وتسريحة هوليوود (منزلي)',
    category: 'Home Beauty',
    description: 'كونتور احترافي مناسب للتصوير مع رموش خفيفة وتسريحة ويڤي راقية.',
    defaultDurationMinutes: 90,
    genderAudience: 'Women'
  }
];

export const mockBranchServices: BranchService[] = [
  {
    id: 'bs-1',
    masterServiceId: 'ms-1',
    name: 'قص وسشوار ملكي فاخر',
    category: 'Hair',
    price: 280,
    durationMinutes: 45,
    isEnabled: true,
    isHomeServiceAvailable: true,
    homeServicePrice: 350
  },
  {
    id: 'bs-2',
    masterServiceId: 'ms-2',
    name: 'جلسة نضارة الوجه بذهب عيار 24',
    category: 'Facial & Skincare',
    price: 450,
    durationMinutes: 60,
    isEnabled: true,
    isHomeServiceAvailable: true,
    homeServicePrice: 550
  },
  {
    id: 'bs-3',
    masterServiceId: 'ms-3',
    name: 'مناكير سبا وأظافر جل متكاملة',
    category: 'Nails',
    price: 220,
    durationMinutes: 50,
    isEnabled: true,
    isHomeServiceAvailable: false
  },
  {
    id: 'bs-4',
    masterServiceId: 'ms-4',
    name: 'حمام مغربي ملكي ومساج مهدئ',
    category: 'Spa & Body',
    price: 600,
    durationMinutes: 90,
    isEnabled: true,
    isHomeServiceAvailable: false
  },
  {
    id: 'bs-5',
    masterServiceId: 'ms-5',
    name: 'تهذيب وتحديد اللحية بالفوطة الساخنة',
    category: 'Beard & Grooming',
    price: 150,
    durationMinutes: 30,
    isEnabled: true,
    isHomeServiceAvailable: false
  }
];

export const mockProfessionals: Professional[] = [
  {
    id: 'p-1',
    name: 'سارة السيد',
    title: 'كبيرة مصففي الشعر',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'فرع برج المملكة الرئيسي',
    assignedServiceIds: ['bs-1', 'bs-3'],
    isHomeServiceEligible: true,
    rating: 4.9,
    completedBookingsCount: 342,
    isWorkingToday: true,
    workingSchedule: '09:00 - 15:30 (مناوبة صباحية)',
    scheduleConfig: {
      shiftType: 'MORNING',
      shiftLabel: 'مناوبة صباحية',
      workingDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      startTime: '09:00',
      endTime: '15:30',
      allowsHomeService: true,
      notes: 'متخصصة بتسريحات العرائس والسشوار الذهبي الفاخر'
    }
  },
  {
    id: 'p-2',
    name: 'د. منى زكي',
    title: 'أخصائية العناية بالبشرة والفيشل',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'فرع برج المملكة الرئيسي',
    assignedServiceIds: ['bs-2', 'bs-4'],
    isHomeServiceEligible: true,
    rating: 4.95,
    completedBookingsCount: 512,
    isWorkingToday: true,
    workingSchedule: '10:00 - 18:00 (دوام كامل)',
    scheduleConfig: {
      shiftType: 'FULL_DAY',
      shiftLabel: 'دوام كامل',
      workingDays: ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Saturday'],
      startTime: '10:00',
      endTime: '18:00',
      allowsHomeService: true,
      notes: 'حقائب العناية المنزلية وجلسات ذهب 24 المتنقلة'
    }
  },
  {
    id: 'p-3',
    name: 'أحمد حسن',
    title: 'أخصائي حلاقة وتصفيف رجالي',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'فرع برج المملكة الرئيسي',
    assignedServiceIds: ['bs-5'],
    isHomeServiceEligible: false,
    rating: 4.85,
    completedBookingsCount: 280,
    isWorkingToday: true,
    workingSchedule: '15:00 - 22:30 (مناوبة مسائية)',
    scheduleConfig: {
      shiftType: 'EVENING',
      shiftLabel: 'مناوبة مسائية',
      workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      startTime: '15:00',
      endTime: '22:30',
      allowsHomeService: false,
      notes: 'خدمات الصالون فقط - خبير الفوط الساخنة والعناية باللحية'
    }
  },
  {
    id: 'p-4',
    name: 'كريم فانس',
    title: 'أخصائي ورسام أظافر',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-2',
    branchName: 'فرع غاليريا مول الفاخر',
    assignedServiceIds: ['bs-3'],
    isHomeServiceEligible: false,
    rating: 4.78,
    completedBookingsCount: 195,
    isWorkingToday: false,
    workingSchedule: 'فترتين: 10:00-14:00 و 17:00-21:00',
    scheduleConfig: {
      shiftType: 'SPLIT_SHIFT',
      shiftLabel: 'دوام مجزأ (فترتين)',
      workingDays: ['Sunday', 'Monday', 'Wednesday', 'Thursday', 'Saturday'],
      startTime: '10:00',
      endTime: '14:00',
      splitStartTime: '17:00',
      splitEndTime: '21:00',
      allowsHomeService: false,
      notes: 'متاح لأوقات الذروة المسائية وجلسات الأظافر السريعة'
    }
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'bk-101',
    customerId: 'c-1',
    customerName: 'لينا الحارثي',
    customerPhone: '+966 55 111 2233',
    customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'فرع برج المملكة الرئيسي',
    bookingItems: [
      {
        serviceId: 'bs-2',
        serviceName: 'جلسة نضارة الوجه بذهب عيار 24',
        professionalId: 'p-2',
        professionalName: 'د. منى زكي',
        price: 450,
        durationMinutes: 60
      }
    ],
    totalPrice: 450,
    totalDurationMinutes: 60,
    scheduledDate: '2026-09-22',
    scheduledTime: '14:30',
    status: 'PENDING_CONFIRMATION',
    isHomeService: false,
    paymentMethod: 'Online Payment',
    paymentStatus: 'Paid',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    confirmationDeadline: new Date(Date.now() + 35 * 60 * 1000).toISOString(),
    notes: 'يرجى مراجعة كريمات البشرة الحساسة الخالية من العطور.',
    customerAllergies: ['حساسية اللاتكس (المطاط)', 'العطور الصناعية المركزة']
  },
  {
    id: 'bk-102',
    customerId: 'c-2',
    customerName: 'ريم القحطاني',
    customerPhone: '+966 50 333 4455',
    customerPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'فرع برج المملكة الرئيسي',
    bookingItems: [
      {
        serviceId: 'bs-1',
        serviceName: 'قص وسشوار ملكي فاخر',
        professionalId: 'p-1',
        professionalName: 'سارة السيد',
        price: 280,
        durationMinutes: 45
      }
    ],
    totalPrice: 280,
    totalDurationMinutes: 45,
    scheduledDate: '2026-09-22',
    scheduledTime: '11:00',
    status: 'IN_SERVICE',
    isHomeService: false,
    paymentMethod: 'Card at Provider',
    paymentStatus: 'Pending',
    createdAt: '2026-09-22T08:00:00Z',
    notes: 'تفضل سيروم اللمعان الذهبي النهائي.'
  },
  {
    id: 'bk-103',
    customerId: 'c-3',
    customerName: 'الأميرة ياسمين',
    customerPhone: '+966 54 888 9900',
    customerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'فرع برج المملكة الرئيسي',
    bookingItems: [
      {
        serviceId: 'bs-2',
        serviceName: 'جلسة نضارة الوجه بذهب عيار 24 (منزلي VIP)',
        professionalId: 'p-2',
        professionalName: 'د. منى زكي',
        price: 550,
        durationMinutes: 60
      }
    ],
    totalPrice: 550,
    totalDurationMinutes: 60,
    scheduledDate: '2026-09-22',
    scheduledTime: '16:00',
    status: 'CONFIRMED',
    isHomeService: true,
    homeAddress: 'فيلا 14، الحي الدبلوماسي، الرياض',
    paymentMethod: 'Apple Pay',
    paymentStatus: 'Paid',
    createdAt: '2026-09-22T07:30:00Z',
    notes: 'المساعدة المنزلية متواجدة لتسهيل إدخال وتجهيز الأجهزة.'
  },
  {
    id: 'bk-104',
    customerId: 'c-4',
    customerName: 'طارق الدوسري',
    customerPhone: '+966 56 777 1122',
    branchId: 'b-1',
    branchName: 'فرع برج المملكة الرئيسي',
    bookingItems: [
      {
        serviceId: 'bs-5',
        serviceName: 'تهذيب وتحديد اللحية بالفوطة الساخنة',
        professionalId: 'p-3',
        professionalName: 'أحمد حسن',
        price: 150,
        durationMinutes: 30
      }
    ],
    totalPrice: 150,
    totalDurationMinutes: 30,
    scheduledDate: '2026-09-22',
    scheduledTime: '10:00',
    status: 'COMPLETED',
    isHomeService: false,
    paymentMethod: 'Cash',
    paymentStatus: 'Paid',
    createdAt: '2026-09-21T18:00:00Z'
  }
];

export const mockQueueEntries: QueueEntry[] = [
  {
    id: 'q-1',
    customerName: 'فاطمة المنصور',
    customerPhone: '+966 59 123 7788',
    serviceName: 'مناكير سبا وأظافر جل متكاملة',
    professionalId: 'p-1',
    professionalName: 'سارة السيد',
    position: 1,
    estimatedWaitMinutes: 12,
    status: 'WAITING',
    joinedAt: '11:15',
    branchId: 'b-1'
  },
  {
    id: 'q-2',
    customerName: 'خالد السبيعي',
    customerPhone: '+966 53 444 5566',
    serviceName: 'تهذيب وتحديد اللحية بالفوطة الساخنة',
    professionalId: 'p-3',
    professionalName: 'أحمد حسن',
    position: 2,
    estimatedWaitMinutes: 25,
    status: 'WAITING',
    joinedAt: '11:22',
    branchId: 'b-1'
  }
];

export const mockCustomers: CustomerProfile[] = [
  {
    id: 'c-1',
    name: 'لينا الحارثي',
    phone: '+966 55 111 2233',
    email: 'lina.harthi@example.com',
    gender: 'Female',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    totalSpent: 3450,
    totalBookings: 8,
    noShowCount: 0,
    cancellationCount: 1,
    allergies: ['حساسية اللاتكس (المطاط)', 'العطور الصناعية المركزة'],
    preferences: ['تفضل رذاذ الذهب المرطب', 'مقشرات عضوية طبيعية فقط'],
    hasBookingRestrictions: false,
    recentNotes: 'عميلة VIP دائمة. تفضل أجواء هادئة بدون ضوضاء أثناء جلسة البشرة.'
  },
  {
    id: 'c-2',
    name: 'ريم القحطاني',
    phone: '+966 50 333 4455',
    email: 'reem.q@example.com',
    gender: 'Female',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    totalSpent: 1820,
    totalBookings: 5,
    noShowCount: 0,
    cancellationCount: 0,
    allergies: [],
    preferences: ['تفضل سارة السيد لتصفيف الشعر'],
    hasBookingRestrictions: false,
    recentNotes: 'زيارة شهرية منتظمة.'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'طلب حجز جديد من عميل',
    message: 'طلبت لينا الحارثي جلسة نضارة الوجه بذهب عيار 24 الساعة 14:30. مهلة تأكيد الحجز نشطة الآن.',
    time: 'منذ 15 دقيقة',
    isRead: false,
    type: 'booking'
  },
  {
    id: 'n-2',
    title: 'انضمام عميلة لقائمة الانتظار',
    message: 'انضمت فاطمة المنصور لقائمة الانتظار الفورية لخدمة أظافر جل (الترتيب #1).',
    time: 'منذ 28 دقيقة',
    isRead: false,
    type: 'queue'
  },
  {
    id: 'n-3',
    title: 'تقييم 5 نجوم جديد!',
    message: 'ترك طارق الدوسري تقييماً بـ 5 نجوم للمصفف أحمد حسن: "أفضل تحديد لحية في الرياض بلا منازع!"',
    time: 'منذ ساعة',
    isRead: true,
    type: 'review'
  }
];

export const mockSubscriptionPlan: SubscriptionPlan = {
  name: 'Gold Business Tier',
  status: 'Active',
  branchLimit: 5,
  currentBranchCount: 2,
  professionalLimit: 10,
  currentProfessionalCount: 4,
  expiryDate: '2027-01-01'
};
