/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shift } from '../../types.ts';
import { Button } from '../common/Button.tsx';
import { X, Calendar, Clock, MapPin, DollarSign, AlertCircle } from 'lucide-react';

interface ConfirmTakeShiftModalProps {
  shift: Shift;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
}

export const ConfirmTakeShiftModal: React.FC<ConfirmTakeShiftModalProps> = ({
  shift,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      await onConfirm();
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#DFE2E5] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DFE2E5]">
          <h3 className="text-[18px] font-bold text-[#202326]">
            {hasError ? 'Не удалось отправить заявку' : 'Взять смену?'}
          </h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] text-[#626970] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {hasError ? (
          <div className="mt-4 space-y-4">
            <div className="bg-[#FDEDED] rounded-2xl p-4 border border-[#F8C8C8] flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#BF3636] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[14px] font-bold text-[#BF3636]">
                  Не удалось отправить заявку
                </h4>
                <p className="text-[13px] text-[#4A5157] mt-1">
                  Проверьте подключение и попробуйте ещё раз. Условия смены сохранены.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <Button
                variant="primary"
                onClick={handleConfirm}
                isLoading={isLoading}
                loadingText="Отправка..."
              >
                Повторить отправку
              </Button>
              <Button
                variant="secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Назад к смене
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Shift summary card */}
            <div className="bg-[#F9FAFB] rounded-2xl p-4 border border-[#DFE2E5] space-y-3">
              <div>
                <h4 className="text-[16px] font-bold text-[#202326]">
                  {shift.restaurant}
                </h4>
                <p className="text-[14px] text-[#626970] font-medium">
                  {shift.role} · {shift.distance}
                </p>
              </div>

              <div className="space-y-1.5 text-[13px] text-[#4A5157] pt-2 border-t border-[#DFE2E5]/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#737980]" />
                  <span>{shift.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#737980]" />
                  <span>{shift.timeRange} · {shift.durationLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#737980]" />
                  <span className="truncate">{shift.address}</span>
                </div>
              </div>

              {/* Pay breakdown */}
              <div className="bg-[#FFF4D6] rounded-xl p-3 border border-[#FFE399] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#986300]" />
                  <div>
                    <span className="text-[18px] font-bold text-[#202326]">${shift.totalPay}</span>
                    <span className="text-[12px] text-[#986300] ml-1.5 font-medium">
                      ${shift.hourlyRate}/ч × {shift.duration} ч
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-[#986300] font-medium">до налогов</span>
              </div>
            </div>

            {/* Confirmation Note */}
            <div className="text-[13px] text-[#626970] bg-[#F3F4F6] rounded-xl p-3">
              <span className="font-semibold text-[#202326]">Проверьте условия:</span>
              <p className="mt-0.5">
                Подтвердите запись, если дата, время и условия вам подходят. После нажатия смена закрепится за вами.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <Button
                variant="primary"
                onClick={handleConfirm}
                isLoading={isLoading}
                loadingText="Подтверждение..."
              >
                Подтвердить
              </Button>
              <Button
                variant="secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Назад
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
