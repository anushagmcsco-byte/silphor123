import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  KeyRound, 
  UserCheck, 
  SendHorizontal,
  Clock,
  Inbox
} from 'lucide-react';
import { EmailDispatchPayload, subscribeToDispatchedEmails } from '../utils/emailService';

interface EmailNotificationModalProps {
  onGoToLogin?: (role: string, username?: string, password?: string) => void;
}

export const EmailNotificationModal: React.FC<EmailNotificationModalProps> = ({ onGoToLogin }) => {
  const [currentEmail, setCurrentEmail] = useState<EmailDispatchPayload | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToDispatchedEmails((payload) => {
      setCurrentEmail(payload);
      setIsOpen(true);
    });

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<EmailDispatchPayload>;
      if (customEvent.detail) {
        setCurrentEmail(customEvent.detail);
        setIsOpen(true);
      }
    };

    window.addEventListener('silphor-email-dispatched', handleCustomEvent);
    return () => {
      unsubscribe();
      window.removeEventListener('silphor-email-dispatched', handleCustomEvent);
    };
  }, []);

  if (!isOpen || !currentEmail) return null;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-teal-500/30 max-w-xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-dispatch-title"
      >
        {/* Header bar */}
        <div className="bg-[#0B2545] px-5 py-4 text-white flex items-center justify-between border-b border-[#00828A]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00828A]/30 border border-[#00828A] flex items-center justify-center text-[#38BDF8]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
                <SendHorizontal className="w-3 h-3 text-emerald-400" />
                <span>Automated Email Dispatched to Recipient</span>
              </div>
              <h3 id="email-dispatch-title" className="text-sm font-bold text-white tracking-tight">
                Silphor Dispatch Bureau: Inbox Delivery
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Envelope Metadata */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 text-xs space-y-1.5 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">To:</span>
            <span className="font-semibold text-slate-800 font-mono text-[11px] sm:text-xs">
              {currentEmail.recipientName} &lt;{currentEmail.recipientEmail}&gt;
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Subject:</span>
            <span className="font-bold text-[#0B2545] text-right truncate max-w-xs sm:max-w-md">
              {currentEmail.subject}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Timestamp:</span>
            </span>
            <span>{new Date(currentEmail.sentAt).toLocaleTimeString()} (Instant Delivery)</span>
          </div>
        </div>

        {/* Highlighted Credentials Box (If generated) */}
        {currentEmail.username && currentEmail.password && (
          <div className="mx-5 my-3 p-3.5 rounded-2xl bg-teal-50 border-2 border-[#00828A]/40 shadow-xs shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#00828A] uppercase tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Generated {currentEmail.role.toUpperCase()} Login Credentials:</span>
              </span>
              <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-semibold">
                Ready for Sign In
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {/* Username */}
              <div className="bg-white p-2.5 rounded-xl border border-teal-200 flex items-center justify-between">
                <div className="min-w-0 pr-1">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Username / Email</div>
                  <div className="font-mono font-bold text-slate-900 truncate text-[11px]">
                    {currentEmail.username}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(currentEmail.username, 'user')}
                  className="p-1 rounded text-slate-500 hover:text-[#00828A] hover:bg-teal-50 transition-colors shrink-0"
                  title="Copy Username"
                >
                  {copiedField === 'user' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Password */}
              <div className="bg-white p-2.5 rounded-xl border border-teal-200 flex items-center justify-between">
                <div className="min-w-0 pr-1">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Temporary Password</div>
                  <div className="font-mono font-bold text-[#00828A] truncate text-[11px]">
                    {currentEmail.password}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(currentEmail.password || '', 'pass')}
                  className="p-1 rounded text-slate-500 hover:text-[#00828A] hover:bg-teal-50 transition-colors shrink-0"
                  title="Copy Password"
                >
                  {copiedField === 'pass' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Body Content */}
        <div className="p-5 overflow-y-auto flex-1 text-slate-700 text-xs sm:text-sm bg-white">
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: currentEmail.bodyHtml }}
          />
        </div>

        {/* Bottom Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Inbox className="w-3.5 h-3.5 text-[#00828A]" />
            <span>Copy saved to your simulated mailbox & account directory</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
            {onGoToLogin && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onGoToLogin(currentEmail.role, currentEmail.username, currentEmail.password);
                }}
                className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-[#00828A] hover:bg-[#007077] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Log In with Credentials</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
