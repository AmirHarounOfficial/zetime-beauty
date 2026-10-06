export type ProviderRole = 
  | 'BUSINESS_OWNER'
  | 'BRANCH_MANAGER'
  | 'BRANCH_STAFF'
  | 'PROFESSIONAL'
  | 'FREELANCER';

export type BusinessType = 
  | 'Salon'
  | 'Barber Shop'
  | 'Spa'
  | 'Beauty Center'
  | 'Nail & Lash Studio'
  | 'Independent Professional'
  | 'Home-Service Professional';

export type BusinessStatus = 
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Active'
  | 'Temporarily Closed'
  | 'Suspended';

export interface BusinessProfile {
  id: string;
  name: string;
  type: BusinessType;
  commercialRegistrationNumber: string;
  taxNumber: string;
  phone: string;
  email: string;
  description: string;
  status: BusinessStatus;
  logoUrl?: string;
  city?: string;
  address?: string;
}

export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface DaySchedule {
  day: DayOfWeek;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface HomeServiceDaySchedule {
  day: DayOfWeek;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

export interface DeliveryFeeConfig {
  baseFee: number; // minimum charge in SAR, e.g. 50
  pricePerKm: number; // SAR per km, e.g. 3.5
  freeDeliveryThreshold: number; // e.g. 500 SAR
  maxServiceRadiusKm: number; // e.g. 35 km
  minimumBookingAmount: number; // e.g. 150 SAR
}

export type ShiftType = 'MORNING' | 'EVENING' | 'FULL_DAY' | 'SPLIT_SHIFT' | 'CUSTOM';

export interface EmployeeScheduleConfig {
  shiftType: ShiftType;
  shiftLabel: string;
  workingDays: DayOfWeek[];
  startTime: string;
  endTime: string;
  splitStartTime?: string;
  splitEndTime?: string;
  allowsHomeService: boolean;
  notes?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  workingHours: string;
  isActive: boolean;
  managerId: string;
  managerName: string;
  operatingSchedule?: DaySchedule[];
  homeServiceSchedule?: HomeServiceDaySchedule[];
  deliveryFeeConfig?: DeliveryFeeConfig;
}

export interface MasterService {
  id: string;
  name: string;
  category: 'Hair' | 'Nails' | 'Facial & Skincare' | 'Spa & Body' | 'Beard & Grooming' | 'Home Beauty';
  description: string;
  defaultDurationMinutes: number;
  genderAudience: 'All' | 'Women' | 'Men';
}

export interface BranchService {
  id: string;
  masterServiceId: string;
  name: string;
  category: string;
  price: number;
  durationMinutes: number;
  isEnabled: boolean;
  isHomeServiceAvailable: boolean;
  homeServicePrice?: number;
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  photoUrl: string;
  branchId: string;
  branchName: string;
  assignedServiceIds: string[];
  isHomeServiceEligible: boolean;
  rating: number;
  completedBookingsCount: number;
  isWorkingToday: boolean;
  workingSchedule: string;
  isDeactivated?: boolean;
  scheduleConfig?: EmployeeScheduleConfig;
}

export type BookingStatus = 
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'IN_SERVICE'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'NO_SHOW'
  | 'RESCHEDULED';

export interface BookingItem {
  serviceId: string;
  serviceName: string;
  professionalId: string;
  professionalName: string;
  price: number;
  durationMinutes: number;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerPhoto?: string;
  branchId: string;
  branchName: string;
  bookingItems: BookingItem[];
  totalPrice: number;
  totalDurationMinutes: number;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  status: BookingStatus;
  isHomeService: boolean;
  homeAddress?: string;
  paymentMethod: 'Card at Provider' | 'Online Payment' | 'Cash' | 'Apple Pay';
  paymentStatus: 'Pending' | 'Paid' | 'Refunded';
  createdAt: string;
  confirmationDeadline?: string; // ISO String calculated as 25% of window
  rejectionReason?: string;
  cancellationReason?: string;
  notes?: string;
  customerAllergies?: string[];
}

export type QueueStatus = 'WAITING' | 'CALLED' | 'CHECKED_IN' | 'IN_SERVICE' | 'COMPLETED' | 'CANCELLED';

export interface QueueEntry {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  professionalName?: string;
  professionalId?: string;
  position: number;
  estimatedWaitMinutes: number;
  status: QueueStatus;
  joinedAt: string;
  branchId: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  photoUrl: string;
  totalSpent: number;
  totalBookings: number;
  noShowCount: number;
  cancellationCount: number;
  allergies: string[];
  preferences: string[];
  hasBookingRestrictions: boolean;
  recentNotes: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'booking' | 'queue' | 'review' | 'system';
}

export interface SubscriptionPlan {
  name: 'Gold Business Tier' | 'Freelancer Pro';
  status: 'Active' | 'Trial' | 'Expiring' | 'Expired';
  branchLimit: number;
  currentBranchCount: number;
  professionalLimit: number;
  currentProfessionalCount: number;
  expiryDate: string;
}
