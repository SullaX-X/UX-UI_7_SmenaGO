/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shift } from '../../types.ts';
import { Button } from '../common/Button.tsx';
import { Clock, MapPin } from 'lucide-react';

interface ShiftCardProps {
  shift: Shift;
  onOpenDetails: (shift: Shift) => void;
  onTakeShift: (shift: Shift) => void;
  isTaking?: boolean;
}

export const ShiftCard: React.FC<ShiftCardProps> = ({
  shift,
  onOpenDetails,
  onTakeShift,
  isTaking = false,
}) => {
  const isAvailable = shift.status === 'available';
  const isBooked = shift.status === 'booked';
  const isClosed = shift.status === 'closed';

  return (
    <article
      onClick={() => onOpenDetails(shift)}
      className="w-full bg-white rounded-2xl p-4 border border-[#DFE2E5] shadow-xs cursor-pointer hover:border-[#FFBE24] transition-all duration-150 flex flex-col gap-3 group"
    >
      {/* Identification Header */}
      <div className="flex items-start gap-3">
        {/* Monogram 40x40 */}
        <div className="w-10 h-10 rounded-xl bg-[#F3F4F6] border border-[#DFE2E5] flex items-center justify-center font-bold text-[14px] text-[#202326] shrink-0 group-hover:bg-[#FFF4D6] transition-colors">
          {shift.monogram}
        </div>

        {/* Name, Role & Distance */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-bold text-[#202326] leading-snug truncate">
            {shift.restaurant}
          </h3>
          <p className="text-[14px] text-[#626970] font-medium truncate mt-0.5">
            {shift.role} · {shift.distance}
          </p>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-center gap-1.5 text-[13px] text-[#626970]">
        <MapPin className="w-3.5 h-3.5 shrink-0 text-[#737980]" />
        <span className="truncate">{shift.address}</span>
      </div>

      {/* Date & Schedule */}
      <div className="flex items-center gap-2 text-[14px] text-[#202326] bg-[#F9FAFB] rounded-xl p-2.5 border border-[#DFE2E5]/50">
        <Clock className="w-4 h-4 text-[#737980] shrink-0" />
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-[#626970]">{shift.dateDisplay}</span>
          <span className="text-[#DFE2E5]">·</span>
          <span className="font-bold text-[#202326]">{shift.startTime} – {shift.endTime}</span>
        </div>
      </div>

      {/* Pay Details */}
      <div className="flex items-baseline justify-between pt-1">
        <div className="flex items-baseline gap-1">
          <span className="text-[24px] font-bold text-[#202326] tracking-tight">
            ${shift.totalPay}
          </span>
        </div>
        <div className="text-[14px] text-[#626970] font-medium">
          ${shift.hourlyRate}/ч · {shift.durationLabel}
        </div>
      </div>

      {/* Primary Action Button */}
      <div 
        className="pt-1" 
        onClick={(e) => {
          e.stopPropagation();
          if (isAvailable) {
            onTakeShift(shift);
          } else {
            onOpenDetails(shift);
          }
        }}
      >
        {isBooked ? (
          <Button
            variant="secondary"
            className="w-full text-[#19734C] border-[#C8E7D3] bg-[#E8F4ED]"
          >
            Вы записаны · Детали
          </Button>
        ) : isClosed ? (
          <Button
            variant="primary"
            disabled={true}
            disabledReason="Смена уже началась"
            className="w-full"
          >
            Взять смену
          </Button>
        ) : (
          <Button
            variant="primary"
            isLoading={isTaking}
            loadingText="Запись..."
            className="w-full"
          >
            Взять смену
          </Button>
        )}
      </div>

      {/* Subtext */}
      <p className="text-[12px] text-[#737980] text-center -mt-1 font-normal">
        Базовая оплата до налогов · без чаевых
      </p>
    </article>
  );
};
