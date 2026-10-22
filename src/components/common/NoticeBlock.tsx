/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

export type NoticeVariant = 'success' | 'warning' | 'info' | 'error';

interface NoticeBlockProps {
  variant: NoticeVariant;
  title: string;
  description: string;
  className?: string;
  actionText?: string;
  onAction?: () => void;
}

export const NoticeBlock: React.FC<NoticeBlockProps> = ({
  variant,
  title,
  description,
  className = '',
  actionText,
  onAction,
}) => {
  const styles = {
    success: {
      bg: 'bg-[#E8F4ED]',
      border: 'border-[#C8E7D3]',
      text: 'text-[#19734C]',
      icon: CheckCircle2,
    },
    warning: {
      bg: 'bg-[#FFF4D6]',
      border: 'border-[#FFE399]',
      text: 'text-[#986300]',
      icon: AlertCircle,
    },
    info: {
      bg: 'bg-[#EAF1FB]',
      border: 'border-[#C9DEFA]',
      text: 'text-[#2864AC]',
      icon: Info,
    },
    error: {
      bg: 'bg-[#FDEDED]',
      border: 'border-[#F8C8C8]',
      text: 'text-[#BF3636]',
      icon: XCircle,
    },
  }[variant];

  const IconComponent = styles.icon;

  return (
    <div
      className={`w-full rounded-2xl p-4 border transition-all ${styles.bg} ${styles.border} ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${styles.text}`} />
        <div className="flex-1">
          <h4 className={`text-[15px] font-bold leading-snug ${styles.text}`}>
            {title}
          </h4>
          <p className="text-[13px] leading-relaxed text-[#4A5157] mt-1">
            {description}
          </p>
          {actionText && onAction && (
            <button
              onClick={onAction}
              className={`mt-2 text-xs font-semibold underline underline-offset-2 ${styles.text} hover:opacity-80 transition-opacity`}
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
