"use client";

import { useEffect, useState } from "react";
import { TOTAL_ROUNDS, getTitleForScore } from "@/lib/quiz-data";

interface ResultsScreenProps {
  correctCount: number;
  onRestart: () => void;
}

const P  = "oklch(0.55 0.22 295)";
const PL = "oklch(0.68 0.20 295)";
const C  = "oklch(0.76 0.13 193)";

function Confetti() {
  const pieces = Array.from({ length: 32 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((_, i) => {
        const left  = `${(i * 3.1 + 7) % 100}%`;
        const delay = `${(i * 0.11) % 1.4}s`;
        const dur   = `${1.8 + (i % 5) * 0.3}s`;
        const color = i % 3 === 0 ? C : i % 3 === 1 ? PL : "oklch(0.85 0.08 265)";
        const size  = 6 + (i % 4) * 3;
        return (
          <span
            key={i}
            className="absolute top-0 rounded-sm opacity-0"
            style={{
              left,
              width: size,
              height: size,
              background: color,
              animation: `confetti-fall ${dur} ease-in ${delay} forwards`,
              transform: `rotate(${i * 17}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

export function ResultsScreen({ correctCount, onRestart }: ResultsScreenProps) {
  const [revealed, setRevealed] = useState(false);
  const tier = getTitleForScore(correctCount);
  const accuracyPct = Math.round((correctCount / TOTAL_ROUNDS) * 100);
  const incorrectCount = TOTAL_ROUNDS - correctCount;

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-14 text-center max-w-2xl mx-auto w-full overflow-hidden">

      {/* Confetti burst once revealed */}
      {revealed && <Confetti />}

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 30%, ${P}22 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full">

        {/* NDF brain logo */}
        <div className="relative mb-6" aria-hidden="true">
          <div
            className="absolute -inset-8 rounded-full blur-2xl opacity-30"
            style={{ background: `radial-gradient(circle, ${P} 0%, transparent 70%)` }}
          />
          <svg viewBox="0 0 80 80" className="relative w-16 h-16">
            <path
              d="M30 68 C21 64 18 54 21 46 C22 38 27 34 31 35 C31 29 36 24 41 26 C43 22 48 20 52 23 C55 20 61 21 63 25 C69 24 74 30 73 38 C77 41 78 49 75 55 C78 60 76 68 71 70 C69 75 63 77 59 75 C55 79 47 80 43 78 C39 81 31 78 30 72 Z"
              fill="none" stroke={P} strokeWidth="2" opacity="0.75"
            />
            <path
              d="M47 54 C47 54 40 48 40 43 C40 40 43 38 45.5 40 C46.5 41 47 42 47 42 C47 42 47.5 41 48.5 40 C51 38 54 40 54 43 C54 48 47 54 47 54Z"
              fill={C} opacity="0.90"
            />
          </svg>
        </div>

        {/* "You have earned the title of" */}
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: C }}
        >
          You have earned the title of
        </p>

        {/* Title reveal — large, dramatic */}
        <div
          className="w-full px-8 py-8 mb-6"
          style={{
            background: `linear-gradient(145deg, ${P}22 0%, oklch(0.11 0.04 272) 60%, ${C}10 100%)`,
            border: `2px solid ${P}`,
            borderRadius: "6px",
            boxShadow: `0 0 48px ${P}30, inset 0 1px 0 ${P}25`,
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h1
            className="text-3xl md:text-4xl font-bold font-serif text-balance leading-tight mb-2"
            style={{
              background: `linear-gradient(140deg, ${C} 0%, ${PL} 55%, oklch(0.90 0.06 265) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {tier.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-0">{tier.subtitle}</p>
        </div>

        {/* Thank-you message */}
        <div
          className="w-full px-6 py-5 mb-6 text-left"
          style={{
            background: "oklch(0.12 0.04 272)",
            border: `1px solid ${P}28`,
            borderRadius: "4px",
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          <p className="text-sm leading-relaxed text-foreground mb-3">
            {tier.description}
          </p>
          <p
            className="text-sm font-medium leading-relaxed"
            style={{ color: C }}
          >
            Thank you for caring about using language correctly. Precise, respectful language
            matters — it shapes how neurodivergent people feel seen, understood, and included.
          </p>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-3 gap-3 w-full mb-8"
          style={{
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          {[
            { label: "Correct",   value: correctCount,      color: "oklch(0.72 0.20 142)" },
            { label: "Incorrect", value: incorrectCount,    color: "oklch(0.62 0.22 27)"  },
            { label: "Accuracy",  value: `${accuracyPct}%`, color: C                      },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 px-3 py-4"
              style={{
                background: "oklch(0.12 0.04 272)",
                border: "1px solid oklch(0.22 0.04 272)",
                borderRadius: "4px",
              }}
            >
              <span className="text-2xl font-bold tabular-nums" style={{ color }}>{value}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>

        {/* Play again */}
        <button
          onClick={onRestart}
          className="px-14 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{
            background: `linear-gradient(135deg, ${P} 0%, oklch(0.40 0.22 295) 100%)`,
            color: "oklch(0.97 0.006 265)",
            borderRadius: "3px",
            boxShadow: `0 0 20px ${P}40`,
          }}
          aria-label="Play again"
        >
          Play Again
        </button>

        <p
          className="text-[11px] font-medium mt-8 tracking-wide"
          style={{ color: "oklch(0.38 0.07 272)" }}
        >
          "The Brain with the Heart in Mind" — Neurodiversity Foundation
        </p>
      </div>

      {/* Confetti keyframe */}
      <style>{`
        @keyframes confetti-fall {
          0%   { opacity: 1; transform: translateY(-10px) rotate(0deg); }
          100% { opacity: 0; transform: translateY(420px) rotate(540deg); }
        }
      `}</style>
    </div>
  );
}
