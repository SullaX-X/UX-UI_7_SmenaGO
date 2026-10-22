/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shift } from '../../types.ts';
import { Button } from '../common/Button.tsx';
import { AlertTriangle, X } from 'lucide-react';

interface CancelShiftModalProps {
  shift: Shift;
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: () => void;
}

export const CancelShiftModal: React.FC<CancelShiftModalProps> = ({
  shift,
  isOpen,
  onClose,
  onConfirmCancel,
}) => {
  const [isCancelling, setIsCancelling] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsCancelling(true);
    setTimeout(() => {
      setIsCancelling(false);
      onConfirmCancel();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#DFE2E5] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DFE2E5]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#BF3636]" />
            <h3 className="text-[18px] font-bold text-[#202326]">
              Отменить смену?
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isCancelling}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] text-[#626970] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-3.5">
          <div className="bg-[#FDEDED] rounded-2xl p-4 border border-[#F8C8C8]">
            <h4 className="text-[15px] font-bold text-[#202326]">
              {shift.restaurant}
            </h4>
            <p className="text-[13px] text-[#626970] mt-0.5 font-medium">
              {shift.role} · {shift.date}
            </p>
            <p className="text-[12px] text-[#737980] mt-1">
              {shift.timeRange} · {shift.address}
            </p>
            <div className="mt-2 pt-2 border-t border-[#F8C8C8] flex justify-between items-center text-[13px]">
              <span className="font-bold text-[#202326]">${shift.totalPay}</span>
              <span className="text-[#626970]">${shift.hourlyRate}/ч × {shift.duration} ч</span>
            </div>
          </div>

          <div className="text-[13px] text-[#4A5157] bg-[#F3F4F6] rounded-xl p-3">
            <p className="font-semibold text-[#BF3636]">
              Смена исчезнет из предстоящих и будет показана в истории со статусом «Отменена».
            </p>
            <p className="mt-1 text-[#626970] text-[12px]">
              Проверьте дату и заведение перед отменой. Ресторан получит уведомление об освобождении места.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 space-y-2.5">
          <Button
            variant="danger"
            onClick={handleConfirm}
            isLoading={isCancelling}
            loadingText="Отмена..."
          >
            Подтвердить отмену
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isCancelling}
          >
            Оставить смену
          </Button>
        </div>
      </div>
    </div>
  );
};
