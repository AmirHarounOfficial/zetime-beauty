import { ProviderRole } from '../types/zetime';

export type PermissionAction =
  | 'VIEW_FINANCIAL_REVENUE'
  | 'VIEW_ANALYTICS'
  | 'EDIT_PRICING'
  | 'MANAGE_STAFF'
  | 'TRANSFER_PROFESSIONAL'
  | 'MANAGE_SUBSCRIPTION'
  | 'CREATE_PROVIDER_BOOKING'
  | 'MANAGE_WALKIN_QUEUE'
  | 'TOGGLE_HOME_ELIGIBILITY'
  | 'VIEW_ALL_BRANCH_DATA'
  | 'SWITCH_BRANCHES';

export function hasPermission(role: ProviderRole, action: PermissionAction): boolean {
  switch (role) {
    case 'BUSINESS_OWNER':
      return true; // Full access across the entire business

    case 'BRANCH_MANAGER':
      // Branch Manager can manage branch bookings, pricing, queue, staff shifts, and branch revenue
      // Cannot transfer staff across branches, change company subscription, or view unassigned branches
      return (
        action !== 'TRANSFER_PROFESSIONAL' &&
        action !== 'MANAGE_SUBSCRIPTION' &&
        action !== 'VIEW_ALL_BRANCH_DATA'
      );

    case 'BRANCH_STAFF':
      // Receptionist/Front Desk: handles appointments and walk-in queue
      // Strictly NO access to financial revenue, analytics, price editing, or staff transfers
      return (
        action === 'CREATE_PROVIDER_BOOKING' ||
        action === 'MANAGE_WALKIN_QUEUE'
      );

    case 'PROFESSIONAL':
      // Stylist/Technician: manages assigned appointments and queue clients
      // Strictly NO access to store revenue, store analytics, or master price editing
      return (
        action === 'CREATE_PROVIDER_BOOKING' ||
        action === 'MANAGE_WALKIN_QUEUE'
      );

    case 'FREELANCER':
      // Independent Solo Provider: sets their own prices, views their own revenue, handles mobile/home bookings
      return (
        action === 'VIEW_FINANCIAL_REVENUE' ||
        action === 'VIEW_ANALYTICS' ||
        action === 'EDIT_PRICING' ||
        action === 'MANAGE_SUBSCRIPTION' ||
        action === 'CREATE_PROVIDER_BOOKING' ||
        action === 'MANAGE_WALKIN_QUEUE' ||
        action === 'TOGGLE_HOME_ELIGIBILITY'
      );

    default:
      return false;
  }
}
