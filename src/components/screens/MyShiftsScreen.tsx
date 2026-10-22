/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shift } from '../../types.ts';
import { ConfirmedShiftCard } from '../cards/ConfirmedShiftCard.tsx';
import { NoticeBlock } from '../common/NoticeBlock.tsx';
import { Button } from '../common/Button.tsx';
import { Calendar, History } from 'lucide-react';

interface MyShiftsScreenProps {
  upcomingShifts: Shift[];
  historyShifts: Shift[];
  onOpenDetails: (shift: Shift) => void;
  onOpenRoute: (shift: Shift) => void;
  onRequestCancel: (shift: Shift) => void;
  onNavigateToSearch: () => void;
  justConfirmedShiftId?: string | null;
  justCancelledShiftId?: string | null;
}

export const MyShiftsScreen: React.FC<MyShiftsScreenProps> = ({
  upcomingShifts,
  historyShifts,
  onOpenDetails,
  onOpenRoute,
  onRequestCancel,
  onNavigateToSearch,
  justConfirmedShiftId,
  justCancelledShiftId,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');

  return (
    <div className="w-full flex flex-col flex-1 pb-6">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-[28px] font-bold text-[#202326] tracking-tight">
          Мои смены
        </h1>
        <p className="text-[15px] text-[#626970] mt-1">
          Ваш график и подтверждения.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="px-5 pb-4">
        <div className="flex bg-[#E5E7EB] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 text-[14px] font-bold rounded-lg transition-all ${
              activeTab === 'upcoming'
                ? 'bg-white text-[#202326] shadow-xs'
                : 'text-[#626970] hover:text-[#202326]'
            }`}
          >
            Предстоящие · {upcomingShifts.length}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-[14px] font-bold rounded-lg transition-all ${
              activeTab === 'history'
                ? 'bg-white text-[#202326] shadow-xs'
                : 'text-[#626970] hover:text-[#202326]'
            }`}
          >
            История
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="px-5 space-y-3.5 flex-1 flex flex-col">
        {activeTab === 'upcoming' ? (
          <>
            {/* Success Notice if recently confirmed */}
            {justConfirmedShiftId && (
              <NoticeBlock
                variant="success"
                title="Смена подтверждена"
                description="Вы записаны на смену. Проверьте время и адрес перед выходом."
              />
            )}

            {justCancelledShiftId && (
              <NoticeBlock
                variant="warning"
                title="Смена отменена"
                description="Смена перенесена в историю со статусом «Отменена»."
              />
            )}

            {upcomingShifts.length > 0 ? (
              <div className="space-y-3">
                {upcomingShifts.map((shift) => (
                  <ConfirmedShiftCard
                    key={shift.id}
                    shift={shift}
                    onOpenDetails={onOpenDetails}
                    onOpenRoute={onOpenRoute}
                    onRequestCancel={onRequestCancel}
                  />
                ))}

                <p className="text-[12px] text-[#737980] text-center pt-2">
                  Время смены указано по местному часовому поясу · PDT.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 border border-[#DFE2E5] text-center space-y-4 my-auto">
                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] text-[#737980] mx-auto flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#202326]">
                    Пока нет предстоящих смен
                  </h3>
                  <p className="text-[14px] text-[#626970] mt-1.5 leading-relaxed">
                    Найдите работу по роли, дате и оплате в каталоге смен.
                  </p>
                </div>
                <Button variant="primary" onClick={onNavigateToSearch}>
                  Найти смену
                </Button>
              </div>
            )}
          </>
        ) : (
          /* History Tab */
          <div className="space-y-3">
            <NoticeBlock
              variant="info"
              title="История смен"
              description="Завершённые и отменённые смены собраны здесь."
            />

            {historyShifts.map((shift) => (
              <ConfirmedShiftCard
                key={shift.id}
                shift={shift}
                onOpenDetails={onOpenDetails}
                onOpenRoute={onOpenRoute}
              />
            ))}

            <p className="text-[12px] text-[#737980] text-center pt-2">
              Время смены указано по местному часовому поясу · PDT.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
