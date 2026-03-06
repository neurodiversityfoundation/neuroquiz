"use client";

import { TOTAL_ROUNDS } from "@/lib/quiz-data";

interface WelcomeScreenProps {
  onStart: () => void;
}

/* NDF "Brain with the Heart in Mind" logo — inline SVG recreation */
function NdfLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-label="Neurodiversity Foundation logo — a brain with a heart"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow ring */}
      <circle cx="60" cy="60" r="56" stroke="oklch(0.55 0.22 295)" strokeWidth="1" opacity="0.25" />
      <circle cx="60" cy="60" r="50" stroke="oklch(0.76 0.13 193)" strokeWidth="0.75" opacity="0.15" />

      {/* Brain outline — stylised left & right hemisphere */}
      <path
        d="M38 76
           C28 72 24 60 27 50
           C29 41 35 36 40 37
           C40 31 46 26 52 28
           C54 24 60 22 65 25
           C68 22 75 22 79 27
           C85 25 92 32 91 41
           C96 44 98 53 95 60
           C99 66 97 75 91 78
           C89 84 82 87 76 85
           C72 90 64 92 58 89
           C52 93 42 90 38 84
           Z"
        stroke="oklch(0.55 0.22 295)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="oklch(0.55 0.22 295 / 0.08)"
      />

      {/* Brain centre divide */}
      <path
        d="M60 28 C58 40 58 56 60 72 C62 84 60 90 60 90"
        stroke="oklch(0.76 0.13 193)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Left hemisphere folds */}
      <path d="M40 48 C44 44 50 44 52 48" stroke="oklch(0.76 0.13 193)" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />
      <path d="M35 60 C39 56 46 57 48 62" stroke="oklch(0.76 0.13 193)" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />
      <path d="M38 72 C43 68 50 69 51 74" stroke="oklch(0.76 0.13 193)" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />

      {/* Right hemisphere folds */}
      <path d="M80 48 C76 44 70 44 68 48" stroke="oklch(0.76 0.13 193)" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />
      <path d="M85 60 C81 56 74 57 72 62" stroke="oklch(0.76 0.13 193)" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />
      <path d="M82 72 C77 68 70 69 69 74" stroke="oklch(0.76 0.13 193)" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />

      {/* Heart in the centre of the brain */}
      <path
        d="M60 68
           C60 68 50 61 50 55
           C50 51 54 49 57 51
           C58.5 52 59.5 53 60 54
           C60.5 53 61.5 52 63 51
           C66 49 70 51 70 55
           C70 61 60 68 60 68 Z"
        fill="oklch(0.76 0.13 193)"
        opacity="0.90"
      />
      {/* Heart highlight */}
      <path
        d="M55 53 C54 54 53 56 54 58"
        stroke="oklch(1 0 0)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center">

      {/* NDF Logo with glowing aura */}
      <div className="relative mb-8 flex items-center justify-center" aria-hidden="false">
        <div
          className="absolute w-56 h-56 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.22 295 / 0.30) 0%, oklch(0.76 0.13 193 / 0.10) 60%, transparent 100%)" }}
          aria-hidden="true"
        />
        <div
          className="relative w-36 h-36 flex items-center justify-center rounded-full animate-pulse-glow-cyan"
          style={{
            border: "1.5px solid oklch(0.55 0.22 295 / 0.45)",
            background: "oklch(0.12 0.05 272)",
          }}
        >
          <NdfLogo className="w-28 h-28" />
        </div>
      </div>

      {/* NDF wordmark */}
      <div className="flex flex-col items-center gap-1 mb-8">
        <div
          className="flex items-center gap-2 px-4 py-1.5 mb-3"
          style={{
            border: "1px solid oklch(0.76 0.13 193 / 0.35)",
            borderRadius: "3px",
            background: "oklch(0.13 0.05 272 / 0.9)",
          }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "oklch(0.76 0.13 193)" }}
          >
            Neurodiversity Foundation
          </span>
        </div>

        {/* Game title */}
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight text-balance font-serif"
          style={{
            background: "linear-gradient(150deg, oklch(0.86 0.10 193) 0%, oklch(0.55 0.22 295) 55%, oklch(0.40 0.22 295) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          NeuroQuiz
        </h1>
        <p
          className="text-sm font-semibold tracking-[0.18em] uppercase mt-1"
          style={{ color: "oklch(0.76 0.13 193)" }}
        >
          The Language Challenge
        </p>
        <p className="text-sm text-muted-foreground max-w-sm text-pretty leading-relaxed mt-3">
          Can you tell the difference between <em>neurodivergent</em>, <em>neurodiverse</em>, and <em>neurodiversity</em>? Test your clinical vocabulary in 20 rounds.
        </p>
      </div>

      {/* Stats bar */}
      <div
        className="flex items-center gap-8 mb-10 px-8 py-4"
        style={{
          border: "1px solid oklch(0.55 0.22 295 / 0.40)",
          background: "oklch(0.13 0.05 272 / 0.85)",
          borderRadius: "4px",
          boxShadow: "0 0 28px oklch(0.55 0.22 295 / 0.10)",
        }}
      >
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "oklch(0.76 0.13 193)" }}>
            Questions
          </p>
          <p className="text-3xl font-bold font-serif" style={{ color: "oklch(0.86 0.10 193)" }}>
            {TOTAL_ROUNDS}
          </p>
        </div>
        <div
          className="w-px h-10 self-stretch"
          style={{ background: "oklch(0.55 0.22 295 / 0.30)" }}
          aria-hidden="true"
        />
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "oklch(0.76 0.13 193)" }}>
            Top Title
          </p>
          <p className="text-xl font-bold font-serif" style={{ color: "oklch(0.86 0.10 193)" }}>
            Expert
          </p>
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        className="group relative px-16 py-4 text-base font-bold uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.55 0.22 295) 0%, oklch(0.40 0.22 295) 100%)",
          color: "oklch(0.97 0.006 265)",
          borderRadius: "3px",
          boxShadow: "0 0 24px oklch(0.55 0.22 295 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.12)",
        }}
        aria-label="Start the NeuroQuiz game"
      >
        <span className="relative z-10">Play Now</span>
        {/* Cyan shimmer on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background: "linear-gradient(135deg, oklch(0.62 0.22 295) 0%, oklch(0.48 0.22 295) 100%)",
            borderRadius: "3px",
          }}
          aria-hidden="true"
        />
      </button>

      {/* NDF tagline */}
      <p
        className="text-[11px] font-medium mt-10 tracking-wide"
        style={{ color: "oklch(0.45 0.10 272)" }}
      >
        "The Brain with the Heart in Mind" — Neurodiversity Foundation
      </p>
    </div>
  );
}
