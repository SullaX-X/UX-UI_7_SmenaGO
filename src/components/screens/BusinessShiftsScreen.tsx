/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shift } from '../../types.ts';
import { Badge } from '../common/Badge.tsx';
import { Button } from '../common/Button.tsx';
import { NoticeBlock } from '../common/NoticeBlock.tsx';
import { Clock, MapPin, Plus, Edit3, Eye } from 'lucide-react';

interface BusinessShiftsScreenProps {
  businessShifts: Shift[];
  onOpenDetails: (shift: Shift) => void;
  onEditShift: (shift: Shift) => void;
  onNavigateToNewShift: () => void;
}

export const BusinessShiftsScreen: React.FC<BusinessShiftsScreenProps> = ({
  businessShifts,
  onOpenDetails,
  onEditShift,
  onNavigateToNewShift,
}) => {
  const [activeTab, setActiveTab] = useState<'published' | 'archive'>('published');

  return (
    <div className="w-full flex flex-col flex-1 pb-8">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-[28px] font-bold text-[#202326] tracking-tight">
          Смены бизнеса
        </h1>
        <p className="text-[15px] text-[#626970] mt-1">
          Ваши публикации и условия работы.
        </p>
      </div>

      {/* Tabs */}
      <div className="px-5 pb-4">
        <div className="flex bg-[#E5E7EB] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('published')}
            className={`flex-1 py-2 text-[14px] font-bold rounded-lg transition-all ${
              activeTab === 'published'
                ? 'bg-white text-[#202326] shadow-xs'
                : 'text-[#626970] hover:text-[#202326]'
            }`}
          >
            Опубликованные · {businessShifts.length}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('archive')}
            className={`flex-1 py-2 text-[14px] font-bold rounded-lg transition-all ${
              activeTab === 'archive'
                ? 'bg-white text-[#202326] shadow-xs'
                : 'text-[#626970] hover:text-[#202326]'
            }`}
          >
            Архив
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 space-y-3.5 flex-1 flex flex-col">
        {activeTab === 'published' ? (
          <>
            <NoticeBlock
              variant="info"
              title="Публикация"
              description="Опубликованные смены и управление условиями."
            />

            {businessShifts.map((shift) => (
              <article
                key={shift.id}
                className="w-full bg-white rounded-2xl p-4 border border-[#DFE2E5] shadow-xs space-y-3.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="info" dot>Опубликована</Badge>
                    <h3 className="text-[18px] font-bold text-[#202326] mt-2">
                      {shift.restaurant}
                    </h3>
                    <p className="text-[14px] text-[#626970] font-medium">
                      {shift.role} · 1 исполнитель
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

                <div className="bg-[#F9FAFB] rounded-xl p-3 border border-[#DFE2E5]/50 space-y-1.5 text-[13px]">
                  <div className="flex items-center gap-2 text-[#202326] font-medium">
                    <Clock className="w-4 h-4 text-[#737980]" />
                    <span>{shift.date} · {shift.timeRange}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#626970]">
                    <MapPin className="w-4 h-4 text-[#737980]" />
                    <span className="truncate">{shift.address}</span>
                  </div>
                </div>

                <p className="text-[12px] text-[#626970] bg-[#FFF8E7] p-2.5 rounded-lg border border-[#FFE399]">
                  Отклики появятся здесь после записи исполнителей.
                </p>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => onOpenDetails(shift)}
                    className="flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Посмотреть смену</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => onEditShift(shift)}
                    className="flex items-center gap-1.5"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Редактировать</span>
                  </Button>
                </div>
              </article>
            ))}

            <div className="pt-2">
              <Button
                variant="primary"
                onClick={onNavigateToNewShift}
                className="flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>Новая смена</span>
              </Button>
            </div>

            <p className="text-[12px] text-[#737980] text-center pt-1">
              Выберите смену, чтобы проверить или изменить условия.
            </p>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-[#DFE2E5] text-center space-y-3 my-auto">
            <h3 className="text-[17px] font-bold text-[#202326]">
              Архив пуст
            </h3>
            <p className="text-[13px] text-[#626970]">
              Смены попадают в архив после окончания срока действия или ручного завершения.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
