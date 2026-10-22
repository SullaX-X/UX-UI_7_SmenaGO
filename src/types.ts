/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RoleMode = 'worker' | 'business';

export type WorkerTab = 'search' | 'my-shifts' | 'profile';
export type BusinessTab = 'business-shifts' | 'new-shift' | 'profile';

export type ShiftStatus = 
  | 'available' 
  | 'booked' 
  | 'completed' 
  | 'cancelled' 
  | 'no_show' 
  | 'closed';

export interface Shift {
  id: string;
  restaurant: string;
  monogram: string;
  role: string;
  address: string;
  city: string;
  date: string;          // e.g. "17 октября 2026"
  dateDisplay: string;   // e.g. "Сегодня, 17 окт"
  dateISO: string;       // e.g. "2026-10-17"
  dayOfWeek: string;     // e.g. "суббота"
  startTime: string;     // "16:00"
  endTime: string;       // "22:00"
  timeRange: string;     // "16:00 – 22:00 PDT"
  duration: number;      // 6 or 8
  durationLabel: string; // "6 часов" or "8 ч"
  hourlyRate: number;    // 25
  totalPay: number;      // 150
  distance: string;      // "0,8 мили"
  distanceMiles: number; // 0.8
  status: ShiftStatus;
  spotsAvailable: number; // 1 or 0
  imageUrl?: string;
  requirements: string[];
  requirementDetails: string[];
  instructions: string;
  entranceNote: string;
  isDemoRestaurant?: boolean;
  historyNote?: string;
  bookedAt?: string;
  cancelledAt?: string;
}

export interface FilterState {
  city: string;
  dateFilter: 'all' | 'today' | 'tomorrow';
  role: string;
  minHourlyRate: number;
  maxDistance: number;
  duration: number | null;
}

export interface PublishShiftForm {
  id?: string;
  restaurant: string;
  role: string;
  date: string;
  timeRange: string;
  startTime: string;
  endTime: string;
  duration: number;
  hourlyRate: number;
  city: string;
  address: string;
  requirements: string;
  instructions: string;
}
