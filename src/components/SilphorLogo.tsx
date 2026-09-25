import React, { useState } from 'react';

interface SilphorLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'iconOnly' | 'monochromeWhite' | 'imageOnly';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  transparentBg?: boolean;
}

export const SilphorLogo: React.FC<SilphorLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  showTagline = true,
  transparentBg = true,
}) => {
  const [imgError, setImgError] = useState(false);

  // Exact Brand Colors matching the official logo
  const isDark = variant === 'monochromeWhite';
  const navyColor = isDark ? '#FFFFFF' : '#0B2545';
  const tealColor = isDark ? '#38BDF8' : '#00828A';
  const slateColor = isDark ? '#94A3B8' : '#475569';

  // Precision vector emblem of the SP monogram & circuit traces & IC chip
  const EmblemSvg = ({ customSize }: { customSize?: string }) => (
    <svg
      viewBox="0 0 540 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={customSize || 'w-full h-full drop-shadow-xs'}
      aria-label="Silphor Technologies SP Circuit Emblem"
    >
      {/* LEFT CIRCUIT TRACES (Leading into 'S' - Deep Navy / White) */}
      <g stroke={navyColor} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 60 120 L 120 120 L 160 160 L 210 160" />
        <circle cx="60" cy="120" r="9" fill={navyColor} />

        <path d="M 50 160 L 150 160 L 175 185 L 215 185" />
        <circle cx="50" cy="160" r="9" fill={navyColor} />

        <path d="M 90 200 L 160 200 L 190 200" />
        <circle cx="90" cy="200" r="9" fill={navyColor} />
      </g>

      {/* RIGHT CIRCUIT TRACES (Leading out of 'P' - Teal / Cyan) */}
      <g stroke={tealColor} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 330 220 L 390 220 L 440 170 L 480 170" />
        <circle cx="480" cy="170" r="9" fill={tealColor} />

        <path d="M 330 240 L 400 240 L 430 205 L 465 205" />
        <circle cx="465" cy="205" r="9" fill={tealColor} />

        <path d="M 330 260 L 415 260 L 445 260" />
        <circle cx="445" cy="260" r="9" fill={tealColor} />
      </g>

      {/* 'S' LETTERFORM - DEEP NAVY / WHITE */}
      <path
        d="M 285 55 L 180 55 C 145 55 125 78 125 112 C 125 142 145 165 185 174 L 255 188 C 275 192 285 200 285 218 C 285 235 268 252 230 252 L 140 252 L 125 212 L 190 212 C 208 212 218 206 218 198 C 218 188 206 179 178 174 L 142 165 C 102 153 90 124 90 95 C 90 48 128 15 192 15 L 295 15 Z"
        fill={navyColor}
      />

      {/* 'P' LETTERFORM - TEAL / CYAN */}
      <path
        d="M 250 55 L 350 55 C 395 55 425 84 425 124 C 425 164 395 194 350 194 L 295 194 L 295 285 L 250 310 Z M 295 93 L 295 156 L 344 156 C 368 156 382 144 382 124 C 382 104 368 93 344 93 Z"
        fill={tealColor}
      />

      {/* SILICON IC CHIP (Center intersection below SP) */}
      <g stroke={tealColor} strokeWidth="3.5" fill="none">
        <rect x="232" y="260" width="36" height="36" rx="4" stroke={tealColor} strokeWidth="3.5" fill={isDark ? '#081B33' : '#0B2545'} />
        <rect x="240" y="268" width="20" height="20" rx="2" fill={tealColor} fillOpacity="0.5" />
        <line x1="240" y1="260" x2="240" y2="252" />
        <line x1="250" y1="260" x2="250" y2="252" />
        <line x1="260" y1="260" x2="260" y2="252" />
        <line x1="240" y1="296" x2="240" y2="304" />
        <line x1="250" y1="296" x2="250" y2="304" />
        <line x1="260" y1="296" x2="260" y2="304" />
        <line x1="232" y1="268" x2="224" y2="268" />
        <line x1="232" y1="278" x2="224" y2="278" />
        <line x1="232" y1="288" x2="224" y2="288" />
        <line x1="268" y1="268" x2="276" y2="268" />
        <line x1="268" y1="278" x2="276" y2="278" />
        <line x1="268" y1="288" x2="276" y2="288" />
      </g>
    </svg>
  );

  // Exact image only
  if (variant === 'imageOnly') {
    const sizeClasses = {
      xs: 'w-24',
      sm: 'w-32',
      md: 'w-48',
      lg: 'w-64',
      xl: 'w-80',
    }[size];

    return (
      <div className={`relative ${sizeClasses} aspect-square ${className}`}>
        <img
          src="/logo.jpg"
          alt="Silphor Technologies Official Logo"
          className="w-full h-full object-contain rounded-2xl"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Icon Only
  if (variant === 'iconOnly') {
    const sizeClasses = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20',
    }[size];

    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}>
        <EmblemSvg />
      </div>
    );
  }

  // Dedicated Monochrome / White Variant for Dark Footers and Dark Backgrounds (Completely transparent, NO background color, compact & sleek)
  if (variant === 'monochromeWhite') {
    const emblemSizes = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-9 h-9',
      lg: 'w-11 h-11',
      xl: 'w-14 h-14',
    }[size];

    const fontStyles = {
      xs: { main: 'text-xs tracking-[0.16em]', sub: 'text-[7.5px] tracking-[0.24em]' },
      sm: { main: 'text-sm sm:text-base tracking-[0.18em]', sub: 'text-[8.5px] sm:text-[9px] tracking-[0.26em]' },
      md: { main: 'text-base sm:text-lg tracking-[0.2em]', sub: 'text-[9.5px] sm:text-[10px] tracking-[0.28em]' },
      lg: { main: 'text-lg sm:text-xl tracking-[0.22em]', sub: 'text-[11px] tracking-[0.3em]' },
      xl: { main: 'text-2xl tracking-[0.24em]', sub: 'text-xs tracking-[0.32em]' },
    }[size];

    return (
      <div className={`inline-flex items-center gap-2.5 select-none bg-transparent ${className}`}>
        {/* Crisp vector emblem without any background box */}
        <div className={`${emblemSizes} shrink-0 flex items-center justify-center bg-transparent`}>
          <EmblemSvg />
        </div>

        {/* Crisp White & Teal Brand Typography */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <span
              className={`${fontStyles.main} font-black leading-none uppercase font-sans text-white`}
            >
              SILPHOR
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2.5 h-[1.5px] bg-[#38BDF8]" />
            <span
              className={`${fontStyles.sub} font-extrabold tracking-[0.28em] uppercase leading-none text-[#38BDF8]`}
            >
              TECHNOLOGIES
            </span>
            <span className="w-2.5 h-[1.5px] bg-[#38BDF8]" />
          </div>
        </div>
      </div>
    );
  }

  // Horizontal Navigation Bar Lockup (Ideal for responsive Navbar & Mobile Headers)
  if (variant === 'horizontal') {
    const emblemSizes = {
      xs: 'w-6 h-6 sm:w-7 sm:h-7',
      sm: 'w-7 h-7 sm:w-8 sm:h-8',
      md: 'w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9',
      lg: 'w-9 h-9 sm:w-11 sm:h-11',
      xl: 'w-12 h-12 sm:w-14 sm:h-14',
    }[size];

    const fontStyles = {
      xs: { main: 'text-xs sm:text-sm tracking-[0.14em]', sub: 'text-[7px] sm:text-[7.5px] tracking-[0.22em]' },
      sm: { main: 'text-sm sm:text-base tracking-[0.16em]', sub: 'text-[7.5px] sm:text-[8px] tracking-[0.24em]' },
      md: { main: 'text-sm sm:text-base xl:text-lg tracking-[0.16em] xl:tracking-[0.18em]', sub: 'text-[7.5px] sm:text-[8px] xl:text-[9px] tracking-[0.24em] xl:tracking-[0.26em]' },
      lg: { main: 'text-lg sm:text-xl tracking-[0.2em]', sub: 'text-[9.5px] sm:text-[10px] tracking-[0.28em]' },
      xl: { main: 'text-xl sm:text-2xl tracking-[0.22em]', sub: 'text-xs tracking-[0.3em]' },
    }[size];

    return (
      <div className={`inline-flex items-center gap-2 sm:gap-2.5 xl:gap-3 select-none bg-transparent ${className}`}>
        {/* Vector circuit emblem */}
        <div className={`${emblemSizes} shrink-0 flex items-center justify-center bg-transparent`}>
          <EmblemSvg />
        </div>

        {/* Text Lockup */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <span
              className={`${fontStyles.main} font-black leading-none uppercase font-sans`}
              style={{ color: navyColor }}
            >
              SILPHOR
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
            <span className="w-2 sm:w-2.5 h-[1.5px]" style={{ backgroundColor: tealColor }} />
            <span
              className={`${fontStyles.sub} font-extrabold uppercase leading-none`}
              style={{ color: tealColor }}
            >
              TECHNOLOGIES
            </span>
            <span className="w-2 sm:w-2.5 h-[1.5px]" style={{ backgroundColor: tealColor }} />
          </div>
        </div>
      </div>
    );
  }

  // Full Stacked Official Logo (Exact replica of user's uploaded logo card)
  const containerClasses = {
    xs: 'max-w-[140px]',
    sm: 'max-w-[180px]',
    md: 'max-w-[240px]',
    lg: 'max-w-[300px]',
    xl: 'max-w-[360px]',
  }[size];

  return (
    <div className={`flex flex-col items-center text-center select-none w-full bg-transparent ${containerClasses} ${className}`}>
      {/* Top Image or Vector Emblem - NO background color if isDark or transparentBg */}
      {!imgError && !isDark ? (
        <div className={`w-full aspect-square max-w-[180px] rounded-xl overflow-hidden p-1.5 ${transparentBg ? 'bg-transparent' : 'bg-white shadow-xs'}`}>
          <img
            src="/logo.jpg"
            alt="Silphor Technologies Official Logo"
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="w-full max-w-[160px] aspect-[4/3] flex items-center justify-center p-2 bg-transparent">
          <EmblemSvg />
        </div>
      )}

      {/* Fallback typography in case image is missing or vector mode */}
      {(imgError || isDark) && (
        <>
          <div className="w-full mt-2">
            <span
              className="text-xl sm:text-2xl font-black tracking-[0.22em] uppercase leading-tight block"
              style={{ color: navyColor }}
            >
              SILPHOR
            </span>
          </div>

          <div className="flex items-center justify-center w-full gap-2 mt-1 px-4">
            <div className="flex-1 h-[1.5px]" style={{ backgroundColor: tealColor }} />
            <span
              className="text-[10px] sm:text-xs font-extrabold tracking-[0.3em] uppercase whitespace-nowrap"
              style={{ color: tealColor }}
            >
              TECHNOLOGIES
            </span>
            <div className="flex-1 h-[1.5px]" style={{ backgroundColor: tealColor }} />
          </div>

          {showTagline && (
            <div className="mt-2">
              <p
                className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: slateColor }}
              >
                DESIGN &bull; INNOVATE &bull; VERIFY &bull; DELIVER
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
