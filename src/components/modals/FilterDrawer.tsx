/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FilterState, Shift } from '../../types.ts';
import { Button } from '../common/Button.tsx';
import { X, SlidersHorizontal } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (newFilters: FilterState) => void;
  onReset: () => void;
  allShifts: Shift[];
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onApply,
  onReset,
  allShifts,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  if (!isOpen) return null;

  // Calculate matching count with localFilters
  const matchingCount = allShifts.filter((shift) => {
    if (localFilters.city && shift.city !== localFilters.city) return false;
    if (localFilters.dateFilter === 'today' && shift.dateDisplay !== 'Сегодня, 17 окт') return false;
    if (localFilters.dateFilter === 'tomorrow' && !shift.date.includes('18 октября')) return false;
    if (localFilters.role && localFilters.role !== 'all' && shift.role !== localFilters.role) return false;
    if (localFilters.minHourlyRate > 0 && shift.hourlyRate < localFilters.minHourlyRate) return false;
    if (localFilters.duration && shift.duration !== localFilters.duration) return false;
    return true;
  }).length;

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const defaultFilters: FilterState = {
      city: 'Сан-Франциско',
      dateFilter: 'all',
      role: 'all',
      minHourlyRate: 0,
      maxDistance: 10,
      duration: null,
    };
    setLocalFilters(defaultFilters);
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-[390px] max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#DFE2E5] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DFE2E5] shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#202326]" />
            <div>
              <h3 className="text-[18px] font-bold text-[#202326]">
                Фильтры
              </h3>
              <p className="text-[12px] text-[#626970]">
                Условия поиска
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] text-[#626970] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filters Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 no-scrollbar pr-1">
          {/* City */}
          <div>
            <label className="text-[13px] font-bold text-[#202326] block mb-1">
              Город
            </label>
            <div className="p-3 bg-[#F3F4F6] rounded-xl border border-[#DFE2E5] text-[15px] font-medium text-[#202326]">
              {localFilters.city || 'Сан-Франциско'}
            </div>
            <p className="text-[11px] text-[#737980] mt-1">Текущий город поиска</p>
          </div>

          {/* Date */}
          <div>
            <label className="text-[13px] font-bold text-[#202326] block mb-2">
              Дата смены
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'Все даты' },
                { id: 'today', label: 'Сегодня' },
                { id: 'tomorrow', label: '18 октября' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, dateFilter: opt.id as any })}
                  className={`h-10 px-2 rounded-xl text-[13px] font-semibold border transition-all ${
                    localFilters.dateFilter === opt.id
                      ? 'bg-[#FFBE24] text-[#202326] border-[#FFBE24]'
                      : 'bg-white text-[#202326] border-[#DFE2E5] hover:bg-[#F9FAFB]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-[13px] font-bold text-[#202326] block mb-2">
              Роль
            </label>
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'all', label: 'Любая роль' },
                { id: 'Официант', label: 'Официант' },
                { id: 'Повар на линии', label: 'Повар на линии' },
                { id: 'Мойщик посуды', label: 'Мойщик посуды' },
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, role: role.id })}
                  className={`h-11 px-3.5 rounded-xl text-[14px] font-medium border flex items-center justify-between transition-all ${
                    localFilters.role === role.id
                      ? 'bg-[#FFF8E7] text-[#202326] border-[#FFBE24] font-semibold'
                      : 'bg-white text-[#202326] border-[#DFE2E5] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <span>{role.label}</span>
                  {localFilters.role === role.id && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBE24]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Min Rate */}
          <div>
            <label className="text-[13px] font-bold text-[#202326] block mb-1">
              Минимальная ставка, USD / час
            </label>
            <p className="text-[12px] text-[#737980] mb-2">Базовая оплата до налогов, без чаевых</p>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { val: 0, label: 'Любая' },
                { val: 22, label: '$22/ч' },
                { val: 25, label: '$25/ч' },
                { val: 28, label: '$28/ч' },
              ].map((rate) => (
                <button
                  key={rate.val}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, minHourlyRate: rate.val })}
                  className={`h-10 rounded-xl text-[13px] font-semibold border transition-all ${
                    localFilters.minHourlyRate === rate.val
                      ? 'bg-[#FFBE24] text-[#202326] border-[#FFBE24]'
                      : 'bg-white text-[#202326] border-[#DFE2E5]'
                  }`}
                >
                  {rate.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-[13px] font-bold text-[#202326] block mb-1">
              Длительность
            </label>
            <p className="text-[12px] text-[#737980] mb-2">В доступных карточках: 6 или 8 часов</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: null, label: 'Любая' },
                { val: 6, label: '6 часов' },
                { val: 8, label: '8 часов' },
              ].map((dur) => (
                <button
                  key={dur.label}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, duration: dur.val })}
                  className={`h-10 rounded-xl text-[13px] font-semibold border transition-all ${
                    localFilters.duration === dur.val
                      ? 'bg-[#FFBE24] text-[#202326] border-[#FFBE24]'
                      : 'bg-white text-[#202326] border-[#DFE2E5]'
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[12px] text-[#737980] pt-1">
            Проверьте роль, время и оплату перед записью на смену.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#DFE2E5] space-y-2 shrink-0">
          <Button
            variant="primary"
            onClick={handleApply}
          >
            {matchingCount > 0
              ? `Применить · ${matchingCount} ${matchingCount === 1 ? 'смена' : matchingCount < 5 ? 'смены' : 'смен'}`
              : 'Применить (0 смен)'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset}
          >
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  );
};
