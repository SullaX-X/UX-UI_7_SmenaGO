/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  ariaLabel = 'Переключатель',
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex items-center shrink-0 cursor-pointer transition-colors duration-200 ease-in-out select-none
        w-[48px] h-[28px] rounded-[14px] p-[3px] outline-none focus-visible:ring-2 focus-visible:ring-[#FFBE24]
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${checked ? 'bg-[#FFBE24]' : 'bg-[#DFE2E5]'}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block w-[22px] h-[22px] rounded-[11px] bg-white shadow-sm transform transition-transform duration-200 ease-in-out flex items-center justify-center
          ${checked ? 'translate-x-[20px]' : 'translate-x-0'}
        `}
      >
        {checked && (
          <span className="w-2 h-2 rounded-full bg-[#FFBE24]" />
        )}
      </span>
    </button>
  );
};
