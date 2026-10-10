'use client';

import React from 'react';

interface FenixyLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  withGlow?: boolean;
  className?: string;
}

export function FenixyLogo({
  size = 'md',
  withText = false,
  withGlow = false,
  className = '',
}: FenixyLogoProps) {
  const sizeMap = {
    xs: { icon: 'w-4 h-4', text: 'text-xs' },
    sm: { icon: 'w-6 h-6', text: 'text-sm' },
    md: { icon: 'w-8 h-8', text: 'text-base font-bold' },
    lg: { icon: 'w-12 h-12', text: 'text-xl font-bold' },
    xl: { icon: 'w-20 h-20', text: 'text-3xl font-extrabold' },
  };

  const { icon: iconClass, text: textClass } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className={`relative ${iconClass} flex-shrink-0 flex items-center justify-center ${
          withGlow ? 'animate-glow-fenix' : ''
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(239,68,68,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="fxWingL" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="40%" stopColor="#DC2626" />
              <stop offset="85%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
            <linearGradient id="fxWingR" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="40%" stopColor="#DC2626" />
              <stop offset="85%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
            <linearGradient id="fxCenter" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#7F1D1D" />
              <stop offset="40%" stopColor="#EF4444" />
              <stop offset="75%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>
          </defs>

          {/* Symmetrical Phoenix Wings in Fire Red and Bright Radiant Yellow */}
          <path
            d="M50 56 C38 48 24 38 12 18 C17 35 28 48 38 54 C25 47 15 37 9 27 C13 43 23 55 35 62 C25 58 17 50 13 44 C19 58 31 68 44 70 C34 68 26 62 22 56 C28 66 38 72 48 72 Z"
            fill="url(#fxWingL)"
          />
          <path
            d="M50 56 C62 48 76 38 88 18 C83 35 72 48 62 54 C75 47 85 37 91 27 C87 43 77 55 65 62 C75 58 83 50 87 44 C81 58 69 68 56 70 C66 68 74 62 78 56 C72 66 62 72 52 72 Z"
            fill="url(#fxWingR)"
          />

          {/* Tail Plumes */}
          <path d="M50 70 C46 76 42 87 50 97 C58 87 54 76 50 70 Z" fill="#DC2626" />
          <path d="M48 72 C41 78 35 87 42 93 C46 87 48 80 48 72 Z" fill="#F59E0B" />
          <path d="M52 72 C59 78 65 87 58 93 C54 87 52 80 52 72 Z" fill="#F59E0B" />
          <path d="M50 75 C48 81 47 88 50 92 C53 88 52 81 50 75 Z" fill="#FEF08A" />

          {/* Central Body & Breast Feather Flames */}
          <path d="M50 36 C44 44 42 54 44 68 C47 70 53 70 56 68 C58 54 56 44 50 36 Z" fill="url(#fxCenter)" />
          <path d="M50 42 C47 48 46 54 47 62 C49 64 51 64 53 62 C54 54 53 48 50 42 Z" fill="#FDE047" />

          {/* Head & Crown Feathers */}
          <path
            d="M50 38 C47 34 46 28 49 22 C51 18 48 14 46 10 C50 13 52 18 54 18 C56 18 57 15 58 12 C58 16 57 20 54 23 C58 20 62 17 64 14 C63 18 61 22 56 26 C57 27 58 29 57 32 C58 32 63 32 66 31 C63 33 60 35 56 36 C55 38 52 38 50 38 Z"
            fill="url(#fxWingR)"
          />
          {/* Beak & Eye */}
          <path d="M57 28 L65 31 L58 33 Z" fill="#FEF08A" />
          <circle cx="53" cy="28" r="1.5" fill="#7F1D1D" />
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-black tracking-tight bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text text-transparent ${textClass}`}
          >
            Fenixy
          </span>
          <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-500/80">
            Quantum-Lite
          </span>
        </div>
      )}
    </div>
  );
}
