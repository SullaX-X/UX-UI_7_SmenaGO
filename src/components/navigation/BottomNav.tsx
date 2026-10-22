/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RoleMode, WorkerTab, BusinessTab } from '../../types.ts';
import { Search, Calendar, User, Briefcase, PlusCircle } from 'lucide-react';

interface BottomNavProps {
  roleMode: RoleMode;
  workerTab: WorkerTab;
  businessTab: BusinessTab;
  onSelectWorkerTab: (tab: WorkerTab) => void;
  onSelectBusinessTab: (tab: BusinessTab) => void;
  upcomingCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  roleMode,
  workerTab,
  businessTab,
  onSelectWorkerTab,
  onSelectBusinessTab,
  upcomingCount = 0,
}) => {
  return (
    <nav className="w-full bg-white border-t border-[#DFE2E5] select-none shrink-0 z-40">
      <div className="max-w-[390px] mx-auto h-[68px] px-6 flex items-center justify-around">
        {roleMode === 'worker' ? (
          <>
            {/* Worker: Search */}
            <button
              type="button"
              onClick={() => onSelectWorkerTab('search')}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] transition-colors relative ${
                workerTab === 'search' ? 'text-[#202326]' : 'text-[#737980] hover:text-[#202326]'
              }`}
            >
              <div className="relative">
                <Search className={`w-5 h-5 ${workerTab === 'search' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {workerTab === 'search' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFBE24]" />
                )}
              </div>
              <span className={`text-[12px] mt-1.5 ${workerTab === 'search' ? 'font-bold' : 'font-medium'}`}>
                Поиск
              </span>
            </button>

            {/* Worker: My Shifts */}
            <button
              type="button"
              onClick={() => onSelectWorkerTab('my-shifts')}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] transition-colors relative ${
                workerTab === 'my-shifts' ? 'text-[#202326]' : 'text-[#737980] hover:text-[#202326]'
              }`}
            >
              <div className="relative">
                <Calendar className={`w-5 h-5 ${workerTab === 'my-shifts' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {upcomingCount > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#FFBE24] text-[#202326] text-[10px] font-bold flex items-center justify-center">
                    {upcomingCount}
                  </span>
                )}
                {workerTab === 'my-shifts' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFBE24]" />
                )}
              </div>
              <span className={`text-[12px] mt-1.5 ${workerTab === 'my-shifts' ? 'font-bold' : 'font-medium'}`}>
                Мои смены
              </span>
            </button>

            {/* Worker: Profile */}
            <button
              type="button"
              onClick={() => onSelectWorkerTab('profile')}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] transition-colors relative ${
                workerTab === 'profile' ? 'text-[#202326]' : 'text-[#737980] hover:text-[#202326]'
              }`}
            >
              <div className="relative">
                <User className={`w-5 h-5 ${workerTab === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {workerTab === 'profile' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFBE24]" />
                )}
              </div>
              <span className={`text-[12px] mt-1.5 ${workerTab === 'profile' ? 'font-bold' : 'font-medium'}`}>
                Профиль
              </span>
            </button>
          </>
        ) : (
          <>
            {/* Business: Shifts */}
            <button
              type="button"
              onClick={() => onSelectBusinessTab('business-shifts')}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] transition-colors relative ${
                businessTab === 'business-shifts' ? 'text-[#202326]' : 'text-[#737980] hover:text-[#202326]'
              }`}
            >
              <div className="relative">
                <Briefcase className={`w-5 h-5 ${businessTab === 'business-shifts' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {businessTab === 'business-shifts' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFBE24]" />
                )}
              </div>
              <span className={`text-[12px] mt-1.5 ${businessTab === 'business-shifts' ? 'font-bold' : 'font-medium'}`}>
                Смены
              </span>
            </button>

            {/* Business: New Shift */}
            <button
              type="button"
              onClick={() => onSelectBusinessTab('new-shift')}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] transition-colors relative ${
                businessTab === 'new-shift' ? 'text-[#202326]' : 'text-[#737980] hover:text-[#202326]'
              }`}
            >
              <div className="relative">
                <PlusCircle className={`w-5 h-5 ${businessTab === 'new-shift' ? 'stroke-[2.5] text-[#202326]' : 'stroke-[1.8]'}`} />
                {businessTab === 'new-shift' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFBE24]" />
                )}
              </div>
              <span className={`text-[12px] mt-1.5 ${businessTab === 'new-shift' ? 'font-bold' : 'font-medium'}`}>
                Новая смена
              </span>
            </button>

            {/* Business: Profile */}
            <button
              type="button"
              onClick={() => onSelectBusinessTab('profile')}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] transition-colors relative ${
                businessTab === 'profile' ? 'text-[#202326]' : 'text-[#737980] hover:text-[#202326]'
              }`}
            >
              <div className="relative">
                <User className={`w-5 h-5 ${businessTab === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {businessTab === 'profile' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFBE24]" />
                )}
              </div>
              <span className={`text-[12px] mt-1.5 ${businessTab === 'profile' ? 'font-bold' : 'font-medium'}`}>
                Профиль
              </span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
