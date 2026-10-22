/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shift } from '../../types.ts';
import { Badge } from '../common/Badge.tsx';
import { Button } from '../common/Button.tsx';
import { Clock, MapPin, Navigation, FileText } from 'lucide-react';

interface ConfirmedShiftCardProps {
  shift: Shift;
  onOpenDetails: (shift: Shift) => void;
  onOpenRoute: (shift: Shift) => void;
  onRequestCancel?: (shift: Shift) => void;
}

export const ConfirmedShiftCard: React.FC<ConfirmedShiftCardProps> = ({
  shift,
  onOpenDetails,
  onOpenRoute,
  onRequestCancel,
}) => {
  const isConfirmed = shift.status === 'booked';
  const isCancelled = shift.status === 'cancelled';
  const isCompleted = shift.status === 'completed';
  const isNoShow = shift.status === 'no_show';

  return (
    <article className="w-full bg-white rounded-2xl p-4 border border-[#DFE2E5] shadow-xs flex flex-col gap-3.5">
      {/* Status Badge & Title */}
      <div className="flex items-start justify-between gap-2">
        <div>
          {isConfirmed && <Badge variant="success" dot>Подтверждена</Badge>}
          {isCancelled && <Badge variant="neutral" dot>Отменена</Badge>}
          {isCompleted && <Badge variant="info" dot>Завершена</Badge>}
          {isNoShow && <Badge variant="error" dot>Не состоялась</Badge>}

          <h3 className="text-[18px] font-bold text-[#202326] mt-2 leading-snug">
            {shift.restaurant}
          </h3>
          <p className="text-[14px] text-[#626970] font-medium">
            {shift.role} · {shift.city}
          </p>
        </div>

        <div className="text-right">
          <span className="text-[20px] font-bold text-[#202326] block">
            ${shift.totalPay}
          </span>
          <span className="text-[12px] text-[#737980]">
            ${shift.hourlyRate}/ч · до налогов
          </span>
        </div>
      </div>

      {/* Date & Time */}
      <div className="bg-[#F9FAFB] rounded-xl p-3 border border-[#DFE2E5]/50 space-y-1.5 text-[13px]">
        <div className="flex items-center gap-2 text-[#202326] font-medium">
          <Clock className="w-4 h-4 text-[#737980] shrink-0" />
          <span>{shift.date} · {shift.timeRange}</span>
        </div>
        <div className="flex items-center gap-2 text-[#626970]">
          <MapPin className="w-4 h-4 text-[#737980] shrink-0" />
          <span className="truncate">{shift.address}</span>
        </div>
      </div>

      {/* Before Leaving Instructions (only for confirmed upcoming shifts) */}
      {isConfirmed && (
        <div className="bg-[#FFF8E7] rounded-xl p-3 border border-[#FFE399] space-y-1.5">
          <h4 className="text-[13px] font-bold text-[#202326]">
            Перед выходом
          </h4>
          <p className="text-[12px] text-[#4A5157] leading-relaxed">
            Приходите к 15:45. Главный вход с Валенсия-стрит; спросите Маю.
          </p>
          <p className="text-[12px] text-[#4A5157] leading-relaxed">
            Возьмите California Food Handler и документ с фото. Чёрная форма и нескользящая обувь обязательны.
          </p>
        </div>
      )}

      {/* History notes if any */}
      {shift.historyNote && (
        <p className="text-[12px] text-[#626970] italic bg-[#F3F4F6] p-2.5 rounded-lg border border-[#DFE2E5]/50">
          {shift.historyNote}
        </p>
      )}

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        {isConfirmed ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                size="small"
                onClick={() => onOpenRoute(shift)}
                className="flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Маршрут ↗</span>
              </Button>
              <Button
                variant="secondary"
                size="small"
                onClick={() => onOpenDetails(shift)}
                className="flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Детали</span>
              </Button>
            </div>
            {onRequestCancel && (
              <Button
                variant="outline"
                size="small"
                onClick={() => onRequestCancel(shift)}
                className="text-[#BF3636] hover:bg-[#FDEDED]/50 border-[#DFE2E5]"
              >
                Отменить смену
              </Button>
            )}
          </>
        ) : (
          <Button
            variant="secondary"
            size="small"
            onClick={() => onOpenDetails(shift)}
          >
            Посмотреть детали
          </Button>
        )}
      </div>
    </article>
  );
};
