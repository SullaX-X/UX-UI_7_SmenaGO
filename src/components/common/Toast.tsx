/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
}) => {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[360px] animate-slide-down">
      <div className={`p-4 rounded-2xl shadow-xl border flex items-center justify-between gap-3 ${
        type === 'success' 
          ? 'bg-[#E8F4ED] border-[#C8E7D3] text-[#19734C]' 
          : 'bg-[#FDEDED] border-[#F8C8C8] text-[#BF3636]'
      }`}>
        <div className="flex items-center gap-2.5">
          {type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span className="text-[14px] font-bold leading-snug text-[#202326]">
            {message}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/5 text-[#737980]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
