import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Phone, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ExternalLink, 
  ChevronRight, 
  MapPin, 
  CheckCircle2, 
  Copy, 
  HelpCircle,
  Clock,
  ShieldCheck,
  Award
} from 'lucide-react';
import { SilphorLogo } from './SilphorLogo';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    action: () => void;
    icon?: string;
  }[];
}

interface FloatingSupportWidgetsProps {
  onNavigate?: (tab: any) => void;
  onOpenCertificateModal?: () => void;
  onStartRegistration?: (courseId?: string) => void;
}

export const FloatingSupportWidgets: React.FC<FloatingSupportWidgetsProps> = ({
  onNavigate,
  onOpenCertificateModal,
  onStartRegistration,
}) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [callPopoverOpen, setCallPopoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const directPhone = '+91 9876543210';
  const cleanPhone = '9876543210';
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=Hello%20Silphor%20Technologies,%20I%20would%20like%20to%20enquire%20about%20your%20services`;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialBotMessage: ChatMessage = {
    id: 'welcome',
    sender: 'bot',
    text: `Hello! Welcome to Silphor Technologies. I am your Academic & Industrial Advisory Assistant. How can we support your semiconductor journey today?`,
    timestamp: 'Just now',
    quickActions: [
      {
        label: 'VLSI & Physical Design Courses',
        action: () => handleSendPrompt('Tell me about VLSI & Physical Design course details and tools'),
      },
      {
        label: 'Fees & Next Batch Schedule',
        action: () => handleSendPrompt('What are the upcoming batch dates and fees?'),
      },
      {
        label: 'Malleswaram, Bangalore Office',
        action: () => handleSendPrompt('Where is your Bangalore office located?'),
      },
      {
        label: 'Chat on WhatsApp (+91 9876543210)',
        action: () => window.open(whatsappUrl, '_blank'),
      },
      {
        label: 'Verify Certificate',
        action: () => {
          if (onOpenCertificateModal) onOpenCertificateModal();
          else if (onNavigate) onNavigate('students');
        },
      },
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (chatOpen) {
      scrollToBottom();
    }
  }, [messages, chatOpen]);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(directPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendPrompt = (promptText: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Intelligent response generator tailored to Silphor Technologies
    setTimeout(() => {
      let replyText = '';
      let actions: ChatMessage['quickActions'] = undefined;

      const lower = promptText.toLowerCase();

      if (lower.includes('vlsi') || lower.includes('physical design') || lower.includes('rtl')) {
        replyText = `Our flagship program is the **Advanced VLSI Design & Physical Implementation** (24 Weeks, Hybrid/Offline/Online). 
You get hands-on access to industry-grade EDA tools including **Synopsys Design Compiler, Cadence Innovus, Siemens Calibre**, and realistic 7nm/14nm PDK constraints.
Fee: ₹45,000 (scholarships available).`;
        actions = [
          {
            label: 'Register for VLSI Course',
            action: () => {
              if (onStartRegistration) onStartRegistration('crs-vlsi-01');
              setChatOpen(false);
            },
          },
          {
            label: 'Speak with VLSI Advisor (+91 9876543210)',
            action: () => window.open(`tel:+91${cleanPhone}`),
          },
        ];
      } else if (lower.includes('fee') || lower.includes('batch') || lower.includes('date') || lower.includes('cost')) {
        replyText = `Upcoming cohort admissions are currently open:
• **VLSI Physical Design:** Starts Oct 15, 2026 (Fee: ₹45,000)
• **RTL & UVM Verification:** Starts Oct 20, 2026 (Fee: ₹38,000)
• **High-Speed PCB Design:** Starts Nov 01, 2026 (Fee: ₹28,000)
EMI options and multi-gateway payments (Razorpay/Cashfree/UPI) are supported with zero-interest installments.`;
        actions = [
          {
            label: 'Open Admission Portal',
            action: () => {
              if (onStartRegistration) onStartRegistration();
              setChatOpen(false);
            },
          },
          {
            label: 'Chat on WhatsApp (+91 9876543210)',
            action: () => window.open(whatsappUrl, '_blank'),
          },
        ];
      } else if (lower.includes('office') || lower.includes('address') || lower.includes('bangalore') || lower.includes('location') || lower.includes('malleswaram')) {
        replyText = `📍 **Silphor Technologies Corporate Headquarters & Labs:**
#45 East Road, Malleswaram, Bangalore, Karnataka - 560003, India.
**Landmark:** Near 8th Cross Cultural Hub & Malleswaram Ground.
**Phone / WhatsApp:** +91 9876543210
**Operational Hours:**
• Monday - Friday: 9:00 AM - 7:00 PM IST
• Saturday: 9:30 AM - 5:30 PM IST`;
        actions = [
          {
            label: 'Open Contact & Maps Page',
            action: () => {
              if (onNavigate) onNavigate('contact');
              setChatOpen(false);
            },
          },
          {
            label: 'Direct Call (+91 9876543210)',
            action: () => window.open(`tel:+91${cleanPhone}`),
          },
        ];
      } else if (lower.includes('certificate') || lower.includes('verify')) {
        replyText = `Every Silphor Technologies certificate features a cryptographically signed 64-bit verification payload and QR code tamper-evident seals verified on our global directory.`;
        actions = [
          {
            label: 'Verify Certificate Now',
            action: () => {
              if (onOpenCertificateModal) onOpenCertificateModal();
              setChatOpen(false);
            },
          },
        ];
      } else if (lower.includes('staffing') || lower.includes('industry') || lower.includes('eda') || lower.includes('vendor')) {
        replyText = `Silphor Technologies bridges global hardware & EDA tool vendors with industry. We provide skilled engineer deputation (Physical Design, RTL, FAEs) and authorized EDA tool distribution across semiconductor hubs.`;
        actions = [
          {
            label: 'Explore Industry Solutions',
            action: () => {
              if (onNavigate) onNavigate('industry');
              setChatOpen(false);
            },
          },
          {
            label: 'Engineering Staffing Services',
            action: () => {
              if (onNavigate) onNavigate('engineering-services');
              setChatOpen(false);
            },
          },
        ];
      } else {
        replyText = `Thank you for your enquiry! Our semiconductor advisors are available right now to assist you directly with admissions, corporate EDA licensing, or engineering staffing.
You can call or WhatsApp our official direct helpline at **+91 9876543210** or email **contact@silphortechnologies.com**.`;
        actions = [
          {
            label: 'Direct Call (+91 9876543210)',
            action: () => window.open(`tel:+91${cleanPhone}`),
          },
          {
            label: 'Chat on WhatsApp',
            action: () => window.open(whatsappUrl, '_blank'),
          },
        ];
      }

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: actions,
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const msg = inputMessage.trim();
    setInputMessage('');
    handleSendPrompt(msg);
  };

  return (
    <>
      {/* FLOATING ACTION DOCK (Bottom-Right of the entire website) */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* BUTTON 1: DIRECT CALL & WHATSAPP FLOATING BUTTON (Redirect to +91 9876543210) */}
        <div className="relative">
          {/* Popover Card on Click */}
          {callPopoverOpen && (
            <div className="absolute bottom-16 right-0 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3 animate-in fade-in zoom-in-95 duration-200 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#0B2545] font-display">
                    Official Direct Line
                  </span>
                </div>
                <button
                  onClick={() => setCallPopoverOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                  aria-label="Close call dialer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Number display with quick copy */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Direct Telephone & WhatsApp
                  </div>
                  <div className="text-sm font-extrabold text-[#0B2545] font-mono mt-0.5">
                    {directPhone}
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 text-slate-500 hover:text-[#00828A] hover:bg-slate-200 rounded-lg transition-colors"
                  title="Copy Phone Number"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* 2 Primary CTA Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {/* Direct Phone Call */}
                <a
                  href={`tel:+91${cleanPhone}`}
                  className="py-2.5 px-3 rounded-xl bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                {/* WhatsApp Direct Chat */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
                >
                  <span className="text-sm">💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Address / Landmark reference */}
              <div className="text-[11px] text-slate-500 flex items-start gap-1.5 pt-1 border-t border-slate-100">
                <MapPin className="w-3.5 h-3.5 text-[#00828A] shrink-0 mt-0.5" />
                <span>
                  #45 East Road, Malleswaram, Bangalore - 560003
                </span>
              </div>
            </div>
          )}

          {/* Floating Pill / Circle for Call & WhatsApp */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCallPopoverOpen(!callPopoverOpen)}
              className="flex items-center gap-2 py-2.5 px-3.5 sm:px-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
              title="Click to Call or WhatsApp +91 9876543210"
              aria-label="Direct Phone & WhatsApp +91 9876543210"
            >
              <div className="relative">
                <Phone className="w-4 h-4 animate-bounce" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-300 ring-2 ring-emerald-600" />
              </div>
              <span className="font-mono tracking-tight hidden sm:inline">{directPhone}</span>
              <span className="font-sans text-[11px] bg-white/20 px-1.5 py-0.5 rounded-full hidden md:inline">
                Call / WhatsApp
              </span>
            </button>
          </div>
        </div>

        {/* BUTTON 2: INTERACTIVE SILPHOR CHATBOT FLOATING ICON */}
        <div className="relative">
          <button
            onClick={() => {
              setChatOpen(!chatOpen);
              if (!chatOpen) setCallPopoverOpen(false);
            }}
            className="flex items-center gap-2 py-3 px-4 rounded-full bg-[#0B2545] hover:bg-[#081B33] text-white text-xs font-bold shadow-xl shadow-slate-900/30 border border-[#00828A]/50 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
            aria-label="Open Silphor Virtual Advisor Chatbot"
          >
            <div className="relative">
              <Bot className="w-4 h-4 text-[#38BDF8]" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00828A] animate-ping" />
            </div>
            <span className="font-display tracking-tight">Chat with Advisor</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </button>
        </div>

      </div>

      {/* CHATBOT EXPANDED WINDOW (Bottom Right Corner) */}
      {chatOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-32px)] sm:w-[390px] h-[540px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#0B2545] text-white p-4 sm:p-4.5 flex items-center justify-between border-b border-[#00828A]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center p-1.5 border border-white/15">
                <Bot className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <div>
                <div className="text-xs font-bold font-display flex items-center gap-1.5">
                  <span>Silphor Virtual Advisor</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-mono border border-emerald-500/30">
                    ONLINE
                  </span>
                </div>
                <div className="text-[10px] text-slate-300">
                  Direct Helpline: {directPhone}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setChatOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Helpline Strip */}
          <div className="bg-slate-50 px-3.5 py-1.5 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-emerald-600" />
              <a href={`tel:+91${cleanPhone}`} className="font-bold text-[#0B2545] hover:underline">
                {directPhone}
              </a>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              <span>WhatsApp Chat</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-[#0B2545] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4 text-[#38BDF8]" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#00828A] text-white rounded-tr-xs shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                  </div>

                  {/* Optional Quick Action Buttons inside message */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.quickActions.map((btn, bi) => (
                        <button
                          key={bi}
                          onClick={btn.action}
                          className="px-2.5 py-1 rounded-lg bg-white border border-teal-200 hover:border-[#00828A] hover:bg-teal-50 text-[11px] font-semibold text-[#00828A] transition-all flex items-center gap-1 shadow-2xs text-left"
                        >
                          <span>{btn.label}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`text-[9px] text-slate-400 font-mono px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px]">Silphor Advisor is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about VLSI, batches, fees, address..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00828A] focus:border-transparent placeholder:text-slate-400 text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-[#00828A] hover:bg-[#007077] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
