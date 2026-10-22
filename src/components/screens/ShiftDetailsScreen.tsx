/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shift } from '../../types.ts';
import { Button } from '../common/Button.tsx';
import { Badge } from '../common/Badge.tsx';
import { VenueMap } from '../common/VenueMap.tsx';
import { NoticeBlock } from '../common/NoticeBlock.tsx';
import { 
  ArrowLeft, 
  Share2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Navigation,
  Check
} from 'lucide-react';

interface ShiftDetailsScreenProps {
  shift: Shift;
  onBack: () => void;
  onTakeShift: (shift: Shift) => Promise<void> | void;
  onOpenRoute: (shift: Shift) => void;
  isBooked?: boolean;
}

export const ShiftDetailsScreen: React.FC<ShiftDetailsScreenProps> = ({
  shift,
  onBack,
  onTakeShift,
  onOpenRoute,
  isBooked = false,
}) => {
  const [isTaking, setIsTaking] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleTake = async () => {
    setIsTaking(true);
    try {
      await onTakeShift(shift);
    } finally {
      setIsTaking(false);
    }
  };

  const isClosed = shift.status === 'closed';

  return (
    <div className="w-full flex flex-col flex-1 bg-[#F3F4F6] pb-28">
      {/* Top Header Navigation (S3/Header: 390x56) */}
      <div className="h-14 px-4 bg-white/95 backdrop-blur-xs sticky top-0 z-30 border-b border-[#DFE2E5] flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Назад"
          className="w-11 h-11 -ml-1 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] text-[#202326] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <h2 className="text-[17px] font-bold text-[#202326]">
          Детали смены
        </h2>

        <button
          type="button"
          onClick={handleShare}
          aria-label="Поделиться"
          className="w-11 h-11 -mr-1 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] text-[#202326] transition-colors relative"
        >
          {copiedLink ? (
            <Check className="w-5 h-5 text-[#19734C]" />
          ) : (
            <Share2 className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Scrollable Content Container */}
      <div className="px-5 pt-4 space-y-4">
        {/* Restaurant Banner Photo (S3/VenuePhoto: 350x140) */}
        <div className="relative w-full h-[140px] rounded-2xl overflow-hidden shadow-xs border border-[#DFE2E5] bg-[#202326]">
          {shift.imageUrl ? (
            <img
              src={shift.imageUrl}
              alt={shift.restaurant}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2D3748] to-[#1A202C] flex items-center justify-center text-white p-4">
              <span className="text-2xl font-bold tracking-wider">{shift.monogram}</span>
            </div>
          )}

          {/* Demo Restaurant Badge */}
          <div className="absolute top-2.5 left-2.5">
            <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
              ДЕМОВЫЙ РЕСТОРАН
            </span>
          </div>
        </div>

        {/* Role, Distance & Status Row */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[15px] font-medium text-[#626970]">
            {shift.role} · {shift.distance}
          </span>
          {isBooked ? (
            <Badge variant="success" dot>Вы записаны</Badge>
          ) : isClosed ? (
            <Badge variant="neutral" dot>Набор закрыт</Badge>
          ) : (
            <Badge variant="success">1 место свободно</Badge>
          )}
        </div>

        {/* Restaurant Title */}
        <h1 className="text-[26px] font-bold text-[#202326] -mt-1 tracking-tight">
          {shift.restaurant}
        </h1>

        {/* Pay Highlight Card (Figma S3 Highlight) */}
        <div className="bg-[#FFF8E7] rounded-2xl p-4 border border-[#FFE399] space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-[#202326] tracking-tight">
              ${shift.totalPay}
            </span>
            <span className="text-[14px] text-[#737980] font-medium">
              базовая оплата, оценка
            </span>
          </div>
          <p className="text-[13px] text-[#737980]">
            ${shift.hourlyRate}/ч × {shift.duration} ч · чаевые не включены
          </p>
        </div>

        {/* Schedule Row */}
        <div className="bg-white rounded-2xl p-4 border border-[#DFE2E5] space-y-2">
          <div className="flex items-center gap-2 text-[15px] font-bold text-[#202326]">
            <Calendar className="w-4 h-4 text-[#737980] shrink-0" />
            <span>{shift.dateDisplay}, {shift.date.split(' ')[0]} окт</span>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-[#626970] pl-6 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#737980] shrink-0 -ml-5 mr-1.5" />
            <span>{shift.startTime} – {shift.endTime} (PDT) · {shift.durationLabel}</span>
          </div>
        </div>

        {/* Section: "Что вам понадобится" */}
        <div className="bg-white rounded-2xl p-4 border border-[#DFE2E5] space-y-3.5">
          <h3 className="text-[17px] font-bold text-[#202326]">
            Что вам понадобится
          </h3>

          <div className="space-y-3">
            {shift.requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#19734C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-bold text-[#202326] leading-snug">
                    {req}
                  </h4>
                  {shift.requirementDetails && shift.requirementDetails[idx] && (
                    <p className="text-[13px] text-[#626970] mt-0.5 leading-relaxed">
                      {shift.requirementDetails[idx]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: "Место работы" */}
        <div className="bg-white rounded-2xl p-4 border border-[#DFE2E5] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[17px] font-bold text-[#202326]">
              Место работы
            </h3>
            <button
              type="button"
              onClick={() => onOpenRoute(shift)}
              className="text-[13px] font-bold text-[#202326] underline underline-offset-2 hover:text-[#986300] transition-colors flex items-center gap-1"
            >
              <span>Открыть маршрут</span>
              <Navigation className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[14px] text-[#626970]">
            <MapPin className="w-4 h-4 text-[#737980] shrink-0" />
            <span>{shift.address}</span>
          </div>

          {/* Interactive Map Diagram */}
          <VenueMap
            venueName={shift.restaurant}
            onClick={() => onOpenRoute(shift)}
          />

          <p className="text-[13px] text-[#626970] leading-relaxed pt-1">
            {shift.entranceNote || shift.instructions}
          </p>
        </div>

        {/* Payment notice info box */}
        <NoticeBlock
          variant="info"
          title="Как рассчитывается выплата"
          description="Базовая оплата до вычета налогов. Выплата после того, как ресторан подтвердит отработанные часы."
        />
      </div>

      {/* Fixed Bottom Action Panel */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DFE2E5] p-4">
        <div className="max-w-[390px] mx-auto space-y-1.5">
          {isBooked ? (
            <div className="space-y-2">
              <Button
                variant="secondary"
                disabled={true}
                className="w-full text-[#19734C] border-[#C8E7D3] bg-[#E8F4ED]"
              >
                Вы уже записаны на эту смену
              </Button>
              <p className="text-[12px] text-[#737980] text-center">
                Проверьте детали выхода в разделе «Мои смены».
              </p>
            </div>
          ) : isClosed ? (
            <div className="space-y-2">
              <Button
                variant="primary"
                disabled={true}
                disabledReason="Набор закрыт: смена уже занята"
                className="w-full"
              >
                Взять смену
              </Button>
              <p className="text-[12px] text-[#737980] text-center">
                Эту смену больше нельзя взять. Выберите другую из доступных карточек.
              </p>
            </div>
          ) : (
            <>
              <Button
                variant="primary"
                onClick={handleTake}
                isLoading={isTaking}
                loadingText="Запись..."
                className="w-full"
              >
                Взять смену
              </Button>
              <p className="text-[11px] text-[#737980] text-center font-normal">
                Принимая смену, вы подтверждаете своё участие.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
