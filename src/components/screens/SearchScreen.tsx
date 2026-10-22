/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shift, FilterState } from '../../types.ts';
import { ShiftCard } from '../cards/ShiftCard.tsx';
import { Button } from '../common/Button.tsx';
import { MapPin, ChevronDown, Bell, SlidersHorizontal, CheckCircle2, NavigationOff } from 'lucide-react';

interface SearchScreenProps {
  shifts: Shift[];
  filters: FilterState;
  onUpdateFilters: (newFilters: FilterState) => void;
  onOpenFilterDrawer: () => void;
  onOpenCityModal: () => void;
  onOpenNotifications: () => void;
  onOpenDetails: (shift: Shift) => void;
  onTakeShift: (shift: Shift) => void;
  gpsEnabled: boolean;
  onToggleGps: () => void;
  isTakingShiftId?: string | null;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  shifts,
  filters,
  onUpdateFilters,
  onOpenFilterDrawer,
  onOpenCityModal,
  onOpenNotifications,
  onOpenDetails,
  onTakeShift,
  gpsEnabled,
  onToggleGps,
  isTakingShiftId,
}) => {
  // Active filter count
  const activeFiltersCount = 
    (filters.dateFilter !== 'all' ? 1 : 0) +
    (filters.role !== 'all' ? 1 : 0) +
    (filters.minHourlyRate > 0 ? 1 : 0) +
    (filters.duration !== null ? 1 : 0);

  // Filter the shifts
  const filteredShifts = shifts.filter((shift) => {
    if (!gpsEnabled) return false;
    if (filters.city && shift.city !== filters.city) return false;
    if (filters.dateFilter === 'today' && shift.dateDisplay !== 'Сегодня, 17 окт') return false;
    if (filters.dateFilter === 'tomorrow' && !shift.date.includes('18 октября')) return false;
    if (filters.role && filters.role !== 'all' && shift.role !== filters.role) return false;
    if (filters.minHourlyRate > 0 && shift.hourlyRate < filters.minHourlyRate) return false;
    if (filters.duration && shift.duration !== filters.duration) return false;
    return true;
  });

  return (
    <div className="w-full flex flex-col flex-1 pb-4">
      {/* Top Location and Notifications Bar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onOpenCityModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 -ml-2 rounded-xl text-[#202326] hover:bg-[#E5E7EB] transition-colors"
        >
          <MapPin className="w-4 h-4 text-[#202326]" />
          <span className="text-[15px] font-bold">{filters.city}</span>
          <ChevronDown className="w-4 h-4 text-[#626970]" />
        </button>

        <button
          type="button"
          onClick={onOpenNotifications}
          aria-label="Уведомления"
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#E5E7EB] text-[#202326] transition-colors relative"
        >
          <Bell className="w-5 h-5 stroke-[2]" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FFBE24] ring-2 ring-white" />
        </button>
      </div>

      {/* Main Heading */}
      <div className="px-5 pt-2 pb-4">
        <h1 className="text-[28px] sm:text-[32px] font-bold text-[#202326] leading-[1.15] tracking-tight">
          Найдите свою<br />следующую смену.
        </h1>
        <p className="text-[15px] text-[#626970] mt-1.5">
          Хорошая работа в вашем графике.
        </p>
      </div>

      {/* Filter Chips Bar (S3/Chip/Selected · Default · Filters) */}
      <div className="px-5 pb-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {/* "Все смены" Chip */}
        <button
          type="button"
          onClick={() => onUpdateFilters({ ...filters, dateFilter: 'all' })}
          className={`h-10 px-4 rounded-full text-[14px] font-bold shrink-0 transition-all ${
            filters.dateFilter === 'all'
              ? 'bg-[#FFBE24] text-[#202326] shadow-xs'
              : 'bg-white text-[#202326] border border-[#DFE2E5] hover:bg-[#F9FAFB]'
          }`}
        >
          Все смены
        </button>

        {/* "Сегодня" Chip */}
        <button
          type="button"
          onClick={() => onUpdateFilters({
            ...filters,
            dateFilter: filters.dateFilter === 'today' ? 'all' : 'today'
          })}
          className={`h-10 px-4 rounded-full text-[14px] font-bold shrink-0 transition-all ${
            filters.dateFilter === 'today'
              ? 'bg-[#FFBE24] text-[#202326] shadow-xs'
              : 'bg-white text-[#202326] border border-[#DFE2E5] hover:bg-[#F9FAFB]'
          }`}
        >
          Сегодня
        </button>

        {/* "Фильтры" Chip */}
        <button
          type="button"
          onClick={onOpenFilterDrawer}
          className={`h-10 px-4 rounded-full text-[14px] font-bold shrink-0 flex items-center gap-2 border transition-all ${
            activeFiltersCount > 0
              ? 'bg-[#FFF4D6] text-[#986300] border-[#FFBE24]'
              : 'bg-white text-[#202326] border-[#DFE2E5] hover:bg-[#F9FAFB]'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Фильтры</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#FFBE24] text-[#202326] text-[11px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Shifts Section Header */}
      {gpsEnabled && (
        <div className="px-5 pb-3 flex items-center justify-between">
          <span className="text-[14px] font-bold text-[#202326]">
            {filteredShifts.length === 1 
              ? '1 смена рядом' 
              : filteredShifts.length > 1 && filteredShifts.length < 5
              ? `${filteredShifts.length} смены рядом`
              : `${filteredShifts.length} смен рядом`}
          </span>
          <span className="text-[11px] font-semibold text-[#737980] uppercase tracking-wider bg-[#E5E7EB] px-2 py-0.5 rounded">
            ДЕМОВЫЕ ДАННЫЕ
          </span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="px-5 space-y-3 flex-1 flex flex-col">
        {/* GPS Disabled State */}
        {!gpsEnabled ? (
          <div className="bg-white rounded-2xl p-6 border border-[#DFE2E5] text-center space-y-4 my-auto">
            <div className="w-12 h-12 rounded-full bg-[#FDEDED] text-[#BF3636] mx-auto flex items-center justify-center">
              <NavigationOff className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#202326]">
                Не видим ваше местоположение
              </h3>
              <p className="text-[14px] text-[#626970] mt-1.5 leading-relaxed">
                Выберите город вручную или разрешите доступ к геолокации в настройках устройства.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <Button variant="primary" onClick={onToggleGps}>
                Включить в настройках
              </Button>
              <Button variant="secondary" onClick={onOpenCityModal}>
                Выбрать город вручную
              </Button>
            </div>
          </div>
        ) : filteredShifts.length === 0 ? (
          /* Empty Search Results State */
          <div className="bg-white rounded-2xl p-6 border border-[#DFE2E5] text-center space-y-4 my-6">
            <div className="w-12 h-12 rounded-full bg-[#FFF4D6] text-[#986300] mx-auto flex items-center justify-center">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#202326]">
                Подходящих смен пока нет
              </h3>
              <p className="text-[14px] text-[#626970] mt-1.5 leading-relaxed">
                Попробуйте другую роль, дату или ставку. Либо сбросьте фильтры, чтобы увидеть все смены.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => onUpdateFilters({
                city: 'Сан-Франциско',
                dateFilter: 'all',
                role: 'all',
                minHourlyRate: 0,
                maxDistance: 10,
                duration: null,
              })}
            >
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          /* Shifts Cards List */
          <div className="space-y-3">
            {filteredShifts.map((shift) => (
              <ShiftCard
                key={shift.id}
                shift={shift}
                onOpenDetails={onOpenDetails}
                onTakeShift={onTakeShift}
                isTaking={isTakingShiftId === shift.id}
              />
            ))}

            {/* List Footer */}
            <div className="pt-4 pb-2 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#737980]">
                <CheckCircle2 className="w-4 h-4 text-[#19734C]" />
                <span>Рядом больше ничего нет</span>
              </div>
              <p className="text-[11px] text-[#737980]">
                Все смены показаны. Даты и расстояния условные; реальное бронирование недоступно.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
