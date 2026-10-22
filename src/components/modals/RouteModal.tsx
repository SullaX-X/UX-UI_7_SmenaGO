/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shift } from '../../types.ts';
import { VenueMap } from '../common/VenueMap.tsx';
import { Button } from '../common/Button.tsx';
import { X, Navigation, MapPin } from 'lucide-react';

interface RouteModalProps {
  shift: Shift;
  isOpen: boolean;
  onClose: () => void;
}

export const RouteModal: React.FC<RouteModalProps> = ({
  shift,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleOpenExternalMaps = () => {
    const query = encodeURIComponent(`${shift.address}, ${shift.city}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
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
            <Navigation className="w-5 h-5 text-[#202326]" />
            <h3 className="text-[18px] font-bold text-[#202326]">
              Маршрут
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] text-[#626970] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-3.5">
          <div>
            <h4 className="text-[16px] font-bold text-[#202326]">
              {shift.restaurant}
            </h4>
            <div className="flex items-center gap-1.5 text-[14px] text-[#626970] mt-0.5">
              <MapPin className="w-4 h-4 shrink-0 text-[#737980]" />
              <span>{shift.address}</span>
            </div>
          </div>

          {/* Map Preview */}
          <VenueMap venueName={shift.restaurant} />

          {/* Info note */}
          <div className="bg-[#F3F4F6] rounded-xl p-3 border border-[#DFE2E5]">
            <p className="text-[13px] font-medium text-[#202326]">
              {shift.instructions || 'Главный вход с Валенсия-стрит. Отметьтесь у стойки администратора.'}
            </p>
            <p className="text-[12px] text-[#626970] mt-1.5">
              Точная карта и время в пути не рассчитаны. Адрес можно использовать в приложении карт.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 space-y-2.5">
          <Button
            variant="primary"
            onClick={handleOpenExternalMaps}
          >
            Открыть в картах ↗
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Назад к смене
          </Button>
        </div>
      </div>
    </div>
  );
};
