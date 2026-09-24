import React from 'react';

interface SilphorLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'iconOnly' | 'monochromeWhite';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const SilphorLogo: React.FC<SilphorLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  showTagline = true,
}) => {
  // Brand Colors matching the official logo
  const navyColor = variant === 'monochromeWhite' ? '#FFFFFF' : '#0B2545';
  const tealColor = variant === 'monochromeWhite' ? '#38BDF8' : '#00828A';
  const slateColor = variant === 'monochromeWhite' ? '#E2E8F0' : '#334155';

  // Vector Emblem representing the SP monogram with circuit traces and IC microchip
  const Emblem = () => (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-xs"
      aria-label="Silphor Technologies Logo Emblem"
    >
      {/* LEFT CIRCUIT TRACES (Leading into 'S' - Deep Navy) */}
      <g stroke={navyColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Trace 1 */}
        <path d="M 40 100 L 90 100 L 130 135 L 175 135" />
        <circle cx="40" cy="100" r="8" fill={navyColor} />

        {/* Trace 2 */}
        <path d="M 38 135 L 140 135 L 160 155 L 180 155" />
        <circle cx="38" cy="135" r="8" fill={navyColor} />

        {/* Trace 3 */}
        <path d="M 68 170 L 145 170 L 165 170" />
        <circle cx="68" cy="170" r="8" fill={navyColor} />
      </g>

      {/* RIGHT CIRCUIT TRACES (Leading out of 'P' - Teal) */}
      <g stroke={tealColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Trace 1 */}
        <path d="M 270 190 L 330 190 L 370 145 L 400 145" />
        <circle cx="400" cy="145" r="8" fill={tealColor} />

        {/* Trace 2 */}
        <path d="M 270 205 L 340 205 L 365 175 L 390 175" />
        <circle cx="390" cy="175" r="8" fill={tealColor} />

        {/* Trace 3 */}
        <path d="M 270 220 L 350 220 L 375 220" />
        <circle cx="375" cy="220" r="8" fill={tealColor} />
      </g>

      {/* 'S' LETTERFORM - DEEP NAVY */}
      <path
        d="M 245 45 L 155 45 C 125 45 110 65 110 95 C 110 120 128 140 160 148 L 220 160 C 235 163 245 170 245 185 C 245 200 230 215 195 215 L 120 215 L 105 180 L 160 180 C 175 180 185 175 185 168 C 185 160 175 152 150 148 L 120 140 C 85 130 75 105 75 80 C 75 40 108 12 165 12 L 255 12 Z"
        fill={navyColor}
      />

      {/* 'P' LETTERFORM - TEAL */}
      <path
        d="M 215 45 L 305 45 C 345 45 370 70 370 105 C 370 140 345 165 305 165 L 255 165 L 255 245 L 215 265 Z M 255 78 L 255 132 L 298 132 C 320 132 332 122 332 105 C 332 88 320 78 298 78 Z"
        fill={tealColor}
      />

      {/* SILICON IC CHIP (Under the center intersection) */}
      <g stroke={tealColor} strokeWidth="3" fill="none">
        {/* Chip Body */}
        <rect x="195" y="225" width="30" height="30" rx="3" stroke={tealColor} strokeWidth="3" fill={navyColor} />
        {/* Inner chip core */}
        <rect x="202" y="232" width="16" height="16" rx="2" fill={tealColor} fillOpacity="0.4" />

        {/* Top Pins */}
        <line x1="202" y1="225" x2="202" y2="219" />
        <line x1="210" y1="225" x2="210" y2="219" />
        <line x1="218" y1="225" x2="218" y2="219" />

        {/* Bottom Pins */}
        <line x1="202" y1="255" x2="202" y2="261" />
        <line x1="210" y1="255" x2="210" y2="261" />
        <line x1="218" y1="255" x2="218" y2="261" />

        {/* Left Pins */}
        <line x1="195" y1="232" x2="189" y2="232" />
        <line x1="195" y1="240" x2="189" y2="240" />
        <line x1="195" y1="248" x2="189" y2="248" />

        {/* Right Pins */}
        <line x1="225" y1="232" x2="231" y2="232" />
        <line x1="225" y1="240" x2="231" y2="240" />
        <line x1="225" y1="248" x2="231" y2="248" />
      </g>
    </svg>
  );

  if (variant === 'iconOnly') {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20',
    }[size];

    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}>
        <Emblem />
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        {/* Emblem */}
        <div className="w-10 h-10 shrink-0">
          <Emblem />
        </div>

        {/* Text Lockup */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <span
              className="text-lg font-black tracking-[0.2em] leading-none uppercase"
              style={{ color: navyColor, fontFamily: 'Cabinet Grotesk, sans-serif' }}
            >
              SILPHOR
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2.5 h-[1.5px]" style={{ backgroundColor: tealColor }} />
            <span
              className="text-[9px] font-bold tracking-[0.3em] uppercase leading-none"
              style={{ color: tealColor }}
            >
              TECHNOLOGIES
            </span>
            <span className="w-2.5 h-[1.5px]" style={{ backgroundColor: tealColor }} />
          </div>
        </div>
      </div>
    );
  }

  // Full / Stacked Emblem (As in the original logo file)
  const containerClasses = {
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80',
    xl: 'w-96',
  }[size];

  return (
    <div className={`flex flex-col items-center text-center select-none ${containerClasses} ${className}`}>
      {/* Big SP Vector Emblem */}
      <div className="w-full aspect-[4/3] max-w-[280px]">
        <Emblem />
      </div>

      {/* Main Brand Title: SILPHOR */}
      <div className="w-full mt-1">
        <h1
          className="text-3xl md:text-4xl font-black tracking-[0.22em] uppercase leading-tight"
          style={{ color: navyColor, fontFamily: 'Cabinet Grotesk, sans-serif' }}
        >
          SILPHOR
        </h1>
      </div>

      {/* Sub-Brand: — TECHNOLOGIES — */}
      <div className="flex items-center justify-center w-full gap-3 mt-1.5 px-4">
        <div className="flex-1 h-[2px]" style={{ backgroundColor: tealColor }} />
        <span
          className="text-xs md:text-sm font-extrabold tracking-[0.35em] uppercase whitespace-nowrap"
          style={{ color: tealColor }}
        >
          TECHNOLOGIES
        </span>
        <div className="flex-1 h-[2px]" style={{ backgroundColor: tealColor }} />
      </div>

      {/* Tagline: DESIGN • INNOVATE • VERIFY • DELIVER */}
      {showTagline && (
        <div className="mt-2.5">
          <p
            className="text-[10px] md:text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: slateColor }}
          >
            DESIGN &bull; INNOVATE &bull; VERIFY &bull; DELIVER
          </p>
        </div>
      )}
    </div>
  );
};
