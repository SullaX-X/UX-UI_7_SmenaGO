/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Button } from '../common/Button.tsx';
import { Search, MapPin, Check, X } from 'lucide-react';

interface CitySelectorModalProps {
  currentCity: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: string) => void;
}

const AVAILABLE_CITIES = [
  { name: 'Сан-Франциско', note: 'Город из исходного поиска', shiftsCount: 3 },
  { name: 'Окленд', note: 'Залив Сан-Франциско', shiftsCount: 0 },
  { name: 'Сан-Хосе', note: 'Силиконовая долина', shiftsCount: 0 },
  { name: 'Беркли', note: 'Восточный залив', shiftsCount: 0 },
];

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  currentCity,
  isOpen,
  onClose,
  onSelectCity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(currentCity);

  if (!isOpen) return null;

  const filteredCities = AVAILABLE_CITIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = () => {
    onSelectCity(selectedCity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#DFE2E5] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DFE2E5]">
          <div>
            <h3 className="text-[18px] font-bold text-[#202326]">
              Выбор города
            </h3>
            <p className="text-[12px] text-[#626970]">
              Поиск по названию
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] text-[#626970] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="mt-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#737980] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Введите название города"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DFE2E5] text-[15px] text-[#202326] placeholder-[#737980] focus:border-[#FFBE24] focus:ring-1 focus:ring-[#FFBE24] outline-none"
            />
          </div>
        </div>

        {/* Cities list */}
        <div className="mt-4 space-y-2 max-h-[220px] overflow-y-auto no-scrollbar">
          <span className="text-[11px] font-bold text-[#737980] uppercase tracking-wider block px-1">
            ТЕКУЩИЙ ГОРОД
          </span>
          {filteredCities.map((city) => {
            const isSelected = selectedCity === city.name;
            return (
              <button
                key={city.name}
                type="button"
                onClick={() => setSelectedCity(city.name)}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition-colors border text-left ${
                  isSelected
                    ? 'border-[#FFBE24] bg-[#FFF8E7]'
                    : 'border-[#DFE2E5] bg-white hover:bg-[#F9FAFB]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#202326]' : 'text-[#737980]'}`} />
                  <div>
                    <span className="text-[15px] font-semibold text-[#202326] block">
                      {city.name}
                    </span>
                    <span className="text-[12px] text-[#626970]">
                      {city.note}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#FFBE24] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#202326]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-[12px] text-[#626970] mt-3">
          Выберите город, чтобы увидеть доступные смены поблизости.
        </p>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          <Button
            variant="primary"
            onClick={handleApply}
          >
            Выбрать город
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};
