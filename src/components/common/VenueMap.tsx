/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Utensils } from 'lucide-react';

interface VenueMapProps {
  venueName?: string;
  address?: string;
  onClick?: () => void;
  className?: string;
}

export const VenueMap: React.FC<VenueMapProps> = ({
  venueName = 'Olive & Ember',
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative w-full h-[140px] rounded-2xl bg-[#EBEFEA] overflow-hidden border border-[#DFE2E5] select-none cursor-pointer group transition-transform active:scale-[0.99] ${className}`}
    >
      {/* Map Background with streets */}
      <svg className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
        {/* City blocks */}
        <rect x="15" y="12" width="130" height="42" rx="6" fill="#DEE4DC" />
        <rect x="165" y="12" width="170" height="42" rx="6" fill="#DEE4DC" />
        
        <rect x="15" y="70" width="130" height="58" rx="6" fill="#DEE4DC" />
        <rect x="165" y="70" width="170" height="58" rx="6" fill="#DEE4DC" />

        {/* Street labels */}
        <text x="35" y="38" fill="#717D75" fontSize="10" fontWeight="600" letterSpacing="0.05em">
          УЛ. 16-Я
        </text>
        <text x="210" y="98" fill="#717D75" fontSize="10" fontWeight="600" letterSpacing="0.05em">
          УЛ. 17-Я
        </text>
        <text x="70" y="108" fill="#717D75" fontSize="10" fontWeight="700" letterSpacing="0.08em">
          ВАЛЕНСИЯ
        </text>
      </svg>

      {/* Restaurant Marker Pin */}
      <div className="absolute top-[48px] left-[135px] flex items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-8 h-8 rounded-full bg-[#FFBE24] shadow-md border-2 border-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Utensils className="w-4 h-4 text-[#202326]" />
        </div>
        <div className="bg-[#202326] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md whitespace-nowrap">
          {venueName}
        </div>
      </div>

      {/* Map Schematic Tag */}
      <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#626970] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs border border-[#DFE2E5]">
        СХЕМА МЕСТНОСТИ
      </div>
    </div>
  );
};
