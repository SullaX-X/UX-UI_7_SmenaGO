/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Wifi } from 'lucide-react';

interface StatusBarProps {
  time?: string;
  dark?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ time = '9:41', dark = true }) => {
  return (
    <div className={`w-full h-11 px-6 flex items-center justify-between text-xs font-semibold select-none z-30 transition-colors ${
      dark ? 'text-[#202326]' : 'text-white'
    }`}>
      {/* Time */}
      <span className="tracking-tight text-[15px] font-bold">{time}</span>

      {/* Dynamic island / notch aesthetic space in center if needed */}
      <div className="w-20 h-4 rounded-full bg-transparent" />

      {/* System Icons (Cellular, Wifi, Battery) */}
      <div className="flex items-center gap-1.5">
        {/* Cellular 4 bars */}
        <div className="flex items-end gap-0.5 h-3">
          <div className={`w-[3px] h-1 rounded-xs ${dark ? 'bg-[#202326]' : 'bg-white'}`} />
          <div className={`w-[3px] h-1.5 rounded-xs ${dark ? 'bg-[#202326]' : 'bg-white'}`} />
          <div className={`w-[3px] h-2 rounded-xs ${dark ? 'bg-[#202326]' : 'bg-white'}`} />
          <div className={`w-[3px] h-3 rounded-xs ${dark ? 'bg-[#202326]' : 'bg-white'}`} />
        </div>

        {/* Wifi */}
        <Wifi className="w-3.5 h-3.5" strokeWidth={2.5} />

        {/* Battery with outline and fill */}
        <div className="flex items-center">
          <div className={`w-5 h-2.5 rounded-[3px] border ${dark ? 'border-[#202326]' : 'border-white'} p-[1px] flex items-center`}>
            <div className={`w-full h-full rounded-[1px] ${dark ? 'bg-[#202326]' : 'bg-white'}`} />
          </div>
          <div className={`w-[1.5px] h-1 rounded-r-[1px] ${dark ? 'bg-[#202326]' : 'bg-white'}`} />
        </div>
      </div>
    </div>
  );
};
