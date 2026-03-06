"use client";

import { TOTAL_ROUNDS } from "@/lib/quiz-data";
import { PrizeLadder } from "@/components/prize-ladder";
import type { QuizQuestion } from "@/lib/quiz-data";

interface QuestionScreenProps {
  question: QuizQuestion;
  roundIndex: number;
  onSelect: (index: number) => void;
}

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

const P = "oklch(0.55 0.22 295)";   // NDF purple
const PL = "oklch(0.68 0.20 295)";  // NDF purple light
const C = "oklch(0.76 0.13 193)";   // NDF cyan

export function QuestionScreen({ question, roundIndex, onSelect }: QuestionScreenProps) {
  return (
    <div className="flex min-h-screen">
      {/* Main area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 md:px-10">
        <div className="w-full max-w-2xl">

          {/* Top bar */}
          <header className="flex items-center justify-between mb-8">
            <div
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{ border: `1px solid ${P}55`, color: C, background: "oklch(0.13 0.05 272 / 0.85)", borderRadius: "3px" }}
            >
              Question {roundIndex + 1} of {TOTAL_ROUNDS}
            </div>
          </header>

          {/* Progress bar */}
          <div
            className="flex gap-1 mb-8"
            role="progressbar"
            aria-valuenow={roundIndex + 1}
            aria-valuemin={1}
            aria-valuemax={TOTAL_ROUNDS}
            aria-label={`Question ${roundIndex + 1} of ${TOTAL_ROUNDS}`}
          >
            {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-all duration-300"
                style={{
                  background:
                    i < roundIndex ? P
                    : i === roundIndex ? C
                    : "oklch(0.22 0.04 272)",
                }}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Category badge */}
          <div className="flex items-center gap-3 mb-6 justify-center flex-wrap">
            <span
              className="px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ border: `1px solid ${P}44`, color: PL, background: "oklch(0.14 0.06 272 / 0.9)", borderRadius: "3px" }}
            >
              {question.category}
            </span>
          </div>

          {/* Question box */}
          <div
            className="w-full mb-10 px-8 py-7 text-center"
            style={{
              background: `linear-gradient(160deg, oklch(0.15 0.06 272) 0%, oklch(0.11 0.04 272) 100%)`,
              border: `1px solid ${P}40`,
              borderRadius: "5px",
              boxShadow: `0 0 32px ${P}0A, inset 0 1px 0 ${P}12`,
            }}
          >
            <p className="text-lg md:text-xl font-medium leading-relaxed text-pretty text-foreground">
              {question.question}
            </p>
          </div>

          {/* 2x2 answer grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="list" aria-label="Answer choices">
            {question.options.map((option, idx) => (
              <AnswerButton
                key={idx}
                label={OPTION_LABELS[idx]}
                text={option}
                onClick={() => onSelect(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Prize ladder sidebar */}
      <div className="hidden lg:flex items-center pr-8">
        <PrizeLadder currentRoundIndex={roundIndex} />
      </div>
    </div>
  );
}

function AnswerButton({ label, text, onClick }: { label: string; text: string; onClick: () => void }) {
  const P = "oklch(0.55 0.22 295)";
  const PL = "oklch(0.68 0.20 295)";

  return (
    <button
      role="listitem"
      onClick={onClick}
      className="group flex items-center gap-3 w-full px-5 py-3.5 text-left transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        background: `linear-gradient(90deg, oklch(0.15 0.07 272) 0%, oklch(0.12 0.05 272) 100%)`,
        border: `1px solid ${P}55`,
        borderRadius: "4px",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "linear-gradient(90deg, oklch(0.21 0.09 272) 0%, oklch(0.17 0.07 272) 100%)";
        el.style.borderColor = PL;
        el.style.boxShadow = `0 0 20px ${P}35`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "linear-gradient(90deg, oklch(0.15 0.07 272) 0%, oklch(0.12 0.05 272) 100%)";
        el.style.borderColor = `${P}55`;
        el.style.boxShadow = "none";
      }}
    >
      {/* A/B/C/D badge — NDF purple */}
      <span
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-xs font-bold rounded-full"
        style={{
          background: `linear-gradient(135deg, ${P}, oklch(0.40 0.22 295))`,
          color: "oklch(0.97 0.006 265)",
        }}
      >
        {label}
      </span>
      <span className="text-sm md:text-base text-foreground leading-snug">{text}</span>
    </button>
  );
}
