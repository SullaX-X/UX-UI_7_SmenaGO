/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'dark';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  className = '',
  dot = false,
}) => {
  const variantStyles = {
    success: 'bg-[#E8F4ED] text-[#19734C]',
    warning: 'bg-[#FFF4D6] text-[#986300]',
    error: 'bg-[#FDEDED] text-[#BF3636]',
    info: 'bg-[#EAF1FB] text-[#2864AC]',
    neutral: 'bg-[#E3E5E8] text-[#737980]',
    dark: 'bg-[#202326] text-white',
  }[variant];

  const dotStyles = {
    success: 'bg-[#19734C]',
    warning: 'bg-[#986300]',
    error: 'bg-[#BF3636]',
    info: 'bg-[#2864AC]',
    neutral: 'bg-[#737980]',
    dark: 'bg-white',
  }[variant];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-semibold tracking-wide uppercase select-none
        ${variantStyles}
        ${className}
      `}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotStyles}`} />}
      {children}
    </span>
  );
};
