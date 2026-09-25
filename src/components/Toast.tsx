import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  type?: 'success' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'info',
  title,
  message,
  duration = 3500,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const typeConfig = {
    success: {
      border: 'border-emerald-500/40 bg-emerald-950/95 text-emerald-100',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    },
    info: {
      border: 'border-cyan-500/40 bg-[#0B2545]/95 text-cyan-100',
      icon: <Info className="w-4 h-4 text-[#38BDF8] shrink-0" />,
    },
    warning: {
      border: 'border-amber-500/40 bg-amber-950/95 text-amber-100',
      icon: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />,
    },
  }[type];

  return (
    <div
      role="status"
      className={`flex items-start gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md text-xs transition-all animate-in slide-in-from-top-2 duration-300 max-w-sm w-full ${typeConfig.border}`}
    >
      {typeConfig.icon}
      <div className="flex-1">
        {title && <div className="font-bold text-white mb-0.5">{title}</div>}
        <div className="text-[11px] leading-relaxed text-slate-200">{message}</div>
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
