/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'normal' | 'small';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  disabledReason?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'normal',
  isLoading = false,
  loadingText,
  disabledReason,
  fullWidth = true,
  disabled,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const isActuallyDisabled = disabled || isLoading;

  const baseStyles = 'relative flex items-center justify-center font-bold transition-all duration-150 select-none active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#FFBE24]';

  const sizeStyles = size === 'small' 
    ? 'h-11 px-4 text-[14px] rounded-xl min-w-[140px]' 
    : 'h-[52px] px-5 text-[16px] leading-[24px] rounded-xl min-w-[160px]';

  const variantStyles = {
    primary: isActuallyDisabled
      ? 'bg-[#E3E5E8] text-[#737980] cursor-not-allowed shadow-none active:scale-100'
      : 'bg-[#FFBE24] text-[#202326] hover:bg-[#F5B51D] active:bg-[#E5A817] shadow-sm',
    secondary: isActuallyDisabled
      ? 'bg-[#F3F4F6] text-[#737980] border border-[#DFE2E5] cursor-not-allowed'
      : 'bg-[#FFFFFF] text-[#202326] border border-[#DFE2E5] hover:bg-[#F9FAFB] active:bg-[#F3F4F6]',
    outline: isActuallyDisabled
      ? 'bg-transparent text-[#737980] border border-[#DFE2E5] cursor-not-allowed'
      : 'bg-transparent text-[#202326] border border-[#DFE2E5] hover:bg-black/5 active:bg-black/10',
    danger: isActuallyDisabled
      ? 'bg-[#FDEDED] text-[#BF3636]/60 cursor-not-allowed'
      : 'bg-[#FDEDED] text-[#BF3636] border border-[#F8C8C8] hover:bg-[#FBDADA] active:bg-[#F8C8C8]',
  }[variant];

  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : 'w-auto'}`}>
      {disabledReason && (
        <span className="text-[12px] font-medium text-[#BF3636] text-center mb-1.5 animate-fade-in">
          {disabledReason}
        </span>
      )}
      <button
        type="button"
        disabled={isActuallyDisabled}
        onClick={isActuallyDisabled ? undefined : onClick}
        className={`
          ${baseStyles}
          ${sizeStyles}
          ${variantStyles}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-current" />
            <span>{loadingText || children}</span>
          </div>
        ) : (
          children
        )}
      </button>
    </div>
  );
};
