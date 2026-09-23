import {
  Branch,
  MasterService,
  BranchService,
  Professional,
  Booking,
  QueueEntry,
  CustomerProfile,
  NotificationItem,
  SubscriptionPlan
} from '../types/zetime';

export const mockBranches: Branch[] = [
  {
    id: 'b-1',
    name: 'Downtown Flagship Branch',
    address: 'King Fahd Rd, Tower 4, Riyadh',
    phone: '+966 50 123 4567',
    workingHours: '09:00 - 22:00',
    isActive: true,
    managerId: 'm-1',
    managerName: 'Noura Al-Otaibi'
  },
  {
    id: 'b-2',
    name: 'Galleria Mall Branch',
    address: 'Olaya St, Galleria Mall Gate 2',
    phone: '+966 50 987 6543',
    workingHours: '10:00 - 23:00',
    isActive: true,
    managerId: 'm-2',
    managerName: 'Fahad Al-Zahrani'
  }
];

export const mockMasterCatalog: MasterService[] = [
  {
    id: 'ms-1',
    name: 'Luxury Haircut & Blowdry',
    category: 'Hair',
    description: 'Precision luxury haircut with signature shampoo & gold shine blowdry finish.',
    defaultDurationMinutes: 45,
    genderAudience: 'Women'
  },
  {
    id: 'ms-2',
    name: '24K Gold Facial Treatment',
    category: 'Facial & Skincare',
    description: 'Deep hydrating facial infused with 24K gold foil flakes and collagen boost.',
    defaultDurationMinutes: 60,
    genderAudience: 'All'
  },
  {
    id: 'ms-3',
    name: 'Gel Nails & Spa Manicure',
    category: 'Nails',
    description: 'Cuticle care, organic hand scrub, nail shaping, and long-lasting gel coating.',
    defaultDurationMinutes: 50,
    genderAudience: 'Women'
  },
  {
    id: 'ms-4',
    name: 'Royal Moroccan Bath & Massage',
    category: 'Spa & Body',
    description: 'Exfoliating black soap treatment, eucalyptus steam room, and 30-min massage.',
    defaultDurationMinutes: 90,
    genderAudience: 'All'
  },
  {
    id: 'ms-5',
    name: 'Beard Sculpting & Hot Towel',
    category: 'Beard & Grooming',
    description: 'Razor sharp line-up, beard oil treatment, and aromatic hot towel refresh.',
    defaultDurationMinutes: 30,
    genderAudience: 'Men'
  },
  {
    id: 'ms-6',
    name: 'VIP Home Bridal Makeup & Hair',
    category: 'Home Beauty',
    description: 'On-demand home beauty team for complete hair and glam makeup service.',
    defaultDurationMinutes: 120,
    genderAudience: 'Women'
  }
];

export const mockBranchServices: BranchService[] = [
  {
    id: 'bs-1',
    masterServiceId: 'ms-1',
    name: 'Luxury Haircut & Blowdry',
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
    name: '24K Gold Facial Treatment',
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
    name: 'Gel Nails & Spa Manicure',
    category: 'Nails',
    price: 220,
    durationMinutes: 50,
    isEnabled: true,
    isHomeServiceAvailable: false
  },
  {
    id: 'bs-4',
    masterServiceId: 'ms-4',
    name: 'Royal Moroccan Bath & Massage',
    category: 'Spa & Body',
    price: 600,
    durationMinutes: 90,
    isEnabled: true,
    isHomeServiceAvailable: false
  },
  {
    id: 'bs-5',
    masterServiceId: 'ms-5',
    name: 'Beard Sculpting & Hot Towel',
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
    name: 'Sara Al-Sayed',
    title: 'Senior Master Stylist',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'Downtown Flagship Branch',
    assignedServiceIds: ['bs-1', 'bs-3'],
    isHomeServiceEligible: true,
    rating: 4.9,
    completedBookingsCount: 342,
    isWorkingToday: true,
    workingSchedule: '10:00 - 19:00'
  },
  {
    id: 'p-2',
    name: 'Dr. Mona Zaki',
    title: 'Skin Specialist & Aesthetician',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'Downtown Flagship Branch',
    assignedServiceIds: ['bs-2', 'bs-4'],
    isHomeServiceEligible: true,
    rating: 4.95,
    completedBookingsCount: 512,
    isWorkingToday: true,
    workingSchedule: '09:00 - 17:00'
  },
  {
    id: 'p-3',
    name: 'Ahmed Hassan',
    title: 'Master Barber & Stylist',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'Downtown Flagship Branch',
    assignedServiceIds: ['bs-5'],
    isHomeServiceEligible: false,
    rating: 4.85,
    completedBookingsCount: 280,
    isWorkingToday: true,
    workingSchedule: '12:00 - 21:00'
  },
  {
    id: 'p-4',
    name: 'Karim Vance',
    title: 'Nail Artist & Technician',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-2',
    branchName: 'Galleria Mall Branch',
    assignedServiceIds: ['bs-3'],
    isHomeServiceEligible: false,
    rating: 4.78,
    completedBookingsCount: 195,
    isWorkingToday: false,
    workingSchedule: 'Day Off'
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'bk-101',
    customerId: 'c-1',
    customerName: 'Lina Al-Harthi',
    customerPhone: '+966 55 111 2233',
    customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'Downtown Flagship Branch',
    bookingItems: [
      {
        serviceId: 'bs-2',
        serviceName: '24K Gold Facial Treatment',
        professionalId: 'p-2',
        professionalName: 'Dr. Mona Zaki',
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
    confirmationDeadline: new Date(Date.now() + 35 * 60 * 1000).toISOString(), // 25% window countdown
    notes: 'Please double check sensitive skin cream options.',
    customerAllergies: ['Latex Rubber', 'Synthetic Perfumes']
  },
  {
    id: 'bk-102',
    customerId: 'c-2',
    customerName: 'Reem Al-Qahtani',
    customerPhone: '+966 50 333 4455',
    customerPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'Downtown Flagship Branch',
    bookingItems: [
      {
        serviceId: 'bs-1',
        serviceName: 'Luxury Haircut & Blowdry',
        professionalId: 'p-1',
        professionalName: 'Sara Al-Sayed',
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
    notes: 'Wants signature gold shine serum finish.'
  },
  {
    id: 'bk-103',
    customerId: 'c-3',
    customerName: 'Princess Yasmin',
    customerPhone: '+966 54 888 9900',
    customerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    branchId: 'b-1',
    branchName: 'Downtown Flagship Branch',
    bookingItems: [
      {
        serviceId: 'bs-2',
        serviceName: '24K Gold Facial Treatment (Home VIP)',
        professionalId: 'p-2',
        professionalName: 'Dr. Mona Zaki',
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
    homeAddress: 'Villa 14, Diplomatic Quarter, Riyadh',
    paymentMethod: 'Apple Pay',
    paymentStatus: 'Paid',
    createdAt: '2026-09-22T07:30:00Z',
    notes: 'Home assistant required for equipment setup.'
  },
  {
    id: 'bk-104',
    customerId: 'c-4',
    customerName: 'Tariq Al-Dosari',
    customerPhone: '+966 56 777 1122',
    branchId: 'b-1',
    branchName: 'Downtown Flagship Branch',
    bookingItems: [
      {
        serviceId: 'bs-5',
        serviceName: 'Beard Sculpting & Hot Towel',
        professionalId: 'p-3',
        professionalName: 'Ahmed Hassan',
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
    customerName: 'Fatima Al-Mansoor',
    customerPhone: '+966 59 123 7788',
    serviceName: 'Gel Nails & Spa Manicure',
    professionalId: 'p-1',
    professionalName: 'Sara Al-Sayed',
    position: 1,
    estimatedWaitMinutes: 12,
    status: 'WAITING',
    joinedAt: '11:15',
    branchId: 'b-1'
  },
  {
    id: 'q-2',
    customerName: 'Khaled Al-Subaie',
    customerPhone: '+966 53 444 5566',
    serviceName: 'Beard Sculpting & Hot Towel',
    professionalId: 'p-3',
    professionalName: 'Ahmed Hassan',
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
    name: 'Lina Al-Harthi',
    phone: '+966 55 111 2233',
    email: 'lina.harthi@example.com',
    gender: 'Female',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    totalSpent: 3450,
    totalBookings: 8,
    noShowCount: 0,
    cancellationCount: 1,
    allergies: ['Latex Rubber', 'Synthetic Perfumes'],
    preferences: ['Prefers Gold Hydrating Mist', 'Wants Organic Scrubs Only'],
    hasBookingRestrictions: false,
    recentNotes: 'VIP customer. Prefers quiet environment during facial treatments.'
  },
  {
    id: 'c-2',
    name: 'Reem Al-Qahtani',
    phone: '+966 50 333 4455',
    email: 'reem.q@example.com',
    gender: 'Female',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    totalSpent: 1820,
    totalBookings: 5,
    noShowCount: 0,
    cancellationCount: 0,
    allergies: [],
    preferences: ['Prefers Sara Al-Sayed for haircut styling'],
    hasBookingRestrictions: false,
    recentNotes: 'Regular monthly visitor.'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'New Customer Booking',
    message: 'Lina Al-Harthi requested 24K Gold Facial Treatment at 14:30. Confirmation deadline active.',
    time: '15m ago',
    isRead: false,
    type: 'booking'
  },
  {
    id: 'n-2',
    title: 'Walk-in Customer Joined',
    message: 'Fatima Al-Mansoor joined the walk-in queue for Gel Nails (Position #1).',
    time: '28m ago',
    isRead: false,
    type: 'queue'
  },
  {
    id: 'n-3',
    title: '5-Star Review Received!',
    message: 'Tariq Al-Dosari left a 5-star review for Ahmed Hassan: "Best beard sculpting in Riyadh!"',
    time: '1h ago',
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
