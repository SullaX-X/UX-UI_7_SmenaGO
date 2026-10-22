/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RoleMode } from '../../types.ts';
import { Toggle } from '../common/Toggle.tsx';
import { NoticeBlock } from '../common/NoticeBlock.tsx';
import { Badge } from '../common/Badge.tsx';
import { 
  User, 
  Phone, 
  Award, 
  MapPin, 
  Bell, 
  Briefcase, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface ProfileScreenProps {
  roleMode: RoleMode;
  onChangeRoleMode: (mode: RoleMode) => void;
  gpsEnabled: boolean;
  onToggleGps: () => void;
  onOpenNotifications: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  roleMode,
  onChangeRoleMode,
  gpsEnabled,
  onToggleGps,
  onOpenNotifications,
}) => {
  return (
    <div className="w-full flex flex-col flex-1 pb-8">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-[28px] font-bold text-[#202326] tracking-tight">
          Профиль
        </h1>
        <p className="text-[15px] text-[#626970] mt-1">
          Ваш профиль и настройки приложения.
        </p>
      </div>

      <div className="px-5 space-y-4">
        {/* Notice from Figma Spec */}
        <NoticeBlock
          variant="info"
          title="Личные данные не заполнены"
          description="Добавьте сведения о себе в рабочем приложении. В макете имя, контакты и документы приведены для демонстрации."
        />

        {/* Role Switcher Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#DFE2E5] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF4D6] text-[#986300] flex items-center justify-center font-bold">
                {roleMode === 'worker' ? <User className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#202326]">
                  {roleMode === 'worker' ? 'Режим исполнителя' : 'Режим бизнеса'}
                </h4>
                <p className="text-[12px] text-[#626970]">
                  {roleMode === 'worker' 
                    ? 'Поиск и бронирование смен' 
                    : 'Публикация и управление сменами'}
                </p>
              </div>
            </div>

            {/* Figma Toggle switch */}
            <Toggle
              checked={roleMode === 'business'}
              onChange={(checked) => onChangeRoleMode(checked ? 'business' : 'worker')}
              ariaLabel="Переключить режим работы"
            />
          </div>

          <div className="text-[12px] text-[#737980] pt-2 border-t border-[#DFE2E5]/50 flex justify-between items-center">
            <span>Переключить на: <strong>{roleMode === 'worker' ? 'Бизнес' : 'Исполнитель'}</strong></span>
            <span className="text-[11px] bg-[#F3F4F6] px-2 py-0.5 rounded font-medium">Спринт 3</span>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#DFE2E5] space-y-3">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-[#FFBE24] text-[#202326] font-bold text-[18px] flex items-center justify-center border-2 border-white shadow-xs">
              АИ
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#202326]">
                Алексей Иванов
              </h3>
              <p className="text-[13px] text-[#626970] flex items-center gap-1 mt-0.5">
                <Phone className="w-3.5 h-3.5" />
                <span>+1 (415) 555-0192</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#DFE2E5]/60 text-[13px]">
            <Award className="w-4 h-4 text-[#986300]" />
            <span className="font-semibold text-[#202326]">Рейтинг 4.9</span>
            <span className="text-[#DFE2E5]">·</span>
            <span className="text-[#626970]">28 смен выполнено</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-[11px]">
              <ShieldCheck className="w-3 h-3 inline mr-1" />
              California Food Handler
            </Badge>
          </div>
        </div>

        {/* Device Permissions & Settings */}
        <div className="bg-white rounded-2xl p-4 border border-[#DFE2E5] space-y-4">
          <h4 className="text-[14px] font-bold text-[#202326] uppercase tracking-wider text-[11px] text-[#737980]">
            Системные настройки (Демо)
          </h4>

          {/* GPS Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#202326]" />
              <div>
                <span className="text-[14px] font-bold text-[#202326] block">
                  Геолокация (GPS)
                </span>
                <span className="text-[12px] text-[#626970]">
                  {gpsEnabled ? 'Геопозиция активна' : 'Геопозиция выключена (Empty State)'}
                </span>
              </div>
            </div>
            <Toggle
              checked={gpsEnabled}
              onChange={onToggleGps}
              ariaLabel="Переключить геолокацию"
            />
          </div>

          {/* Notifications Button */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="w-full flex items-center justify-between pt-3 border-t border-[#DFE2E5]/60 text-left hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#202326]" />
              <div>
                <span className="text-[14px] font-bold text-[#202326] block">
                  Уведомления
                </span>
                <span className="text-[12px] text-[#626970]">
                  Подсказки и напоминания о сменах
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#737980]" />
          </button>
        </div>

        <p className="text-[11px] text-[#737980] text-center">
          SmenaGo UI-Kit v1.0 · Октябрь 2026 · Демонстрационная среда
        </p>
      </div>
    </div>
  );
};
