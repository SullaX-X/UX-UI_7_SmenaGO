/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Toggle } from '../common/Toggle.tsx';
import { X, Bell, Calendar, CheckCircle2 } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#DFE2E5] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DFE2E5]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#202326]" />
            <div>
              <h3 className="text-[18px] font-bold text-[#202326]">
                Уведомления
              </h3>
              <p className="text-[12px] text-[#626970]">
                Подсказки и события графика
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

        {/* Settings */}
        <div className="mt-4 space-y-3.5">
          <div className="bg-[#F9FAFB] rounded-xl p-3 border border-[#DFE2E5] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[14px] font-bold text-[#202326] block">
                  Push-уведомления
                </span>
                <span className="text-[12px] text-[#626970]">
                  {pushEnabled ? 'Разрешены' : 'Отключены'}
                </span>
              </div>
              <Toggle checked={pushEnabled} onChange={setPushEnabled} />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#DFE2E5]/60">
              <div>
                <span className="text-[14px] font-bold text-[#202326] block">
                  Напоминания до смены
                </span>
                <span className="text-[12px] text-[#626970]">
                  За 2 часа и за 30 минут
                </span>
              </div>
              <Toggle checked={remindersEnabled} onChange={setRemindersEnabled} />
            </div>
          </div>

          {/* Recent Notifications list */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold text-[#737980] uppercase tracking-wider block px-1">
              НЕДАВНИЕ УВЕДОМЛЕНИЯ
            </span>

            <div className="p-3 bg-[#FFF8E7] rounded-xl border border-[#FFE399] space-y-1">
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#986300]">
                <Calendar className="w-4 h-4" />
                <span>Проверьте условия перед выходом</span>
              </div>
              <p className="text-[12px] text-[#4A5157] leading-relaxed">
                17 октября 2026, 16:00 · Olive & Ember. Возьмите California Food Handler и нескользящую обувь.
              </p>
              <span className="text-[11px] text-[#986300] font-medium block pt-0.5">
                Сегодня в 13:45
              </span>
            </div>

            <div className="p-3 bg-[#E8F4ED] rounded-xl border border-[#C8E7D3] space-y-1">
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#19734C]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Смена подтверждена рестораном</span>
              </div>
              <p className="text-[12px] text-[#4A5157] leading-relaxed">
                Olive & Ember подтвердили вашу запись на позицию официанта.
              </p>
              <span className="text-[11px] text-[#19734C] font-medium block pt-0.5">
                Сегодня в 11:20
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
