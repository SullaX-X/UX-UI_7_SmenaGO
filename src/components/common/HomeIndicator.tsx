/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface HomeIndicatorProps {
  dark?: boolean;
}

export const HomeIndicator: React.FC<HomeIndicatorProps> = ({ dark = true }) => {
  return (
    <div className="w-full flex justify-center py-2 select-none pointer-events-none">
      <div 
        className={`w-32 h-[4px] rounded-full transition-colors ${
          dark ? 'bg-[#202326]/80' : 'bg-white/80'
        }`} 
      />
    </div>
  );
};
