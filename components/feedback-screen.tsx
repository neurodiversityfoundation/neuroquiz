"use client";

import { TOTAL_ROUNDS } from "@/lib/quiz-data";
import { PrizeLadder } from "@/components/prize-ladder";
import type { QuizQuestion } from "@/lib/quiz-data";
import { useEffect, useRef } from "react";

interface FeedbackScreenProps {
  question: QuizQuestion;
  roundIndex: number;
  selectedIndex: number;
  isCorrect: boolean;
  onNext: () => void;
}

const OPTION_LABELS = ["A", "B", "C", "D"] as const;
const P  = "oklch(0.55 0.22 295)";  // NDF purple
const C  = "oklch(0.76 0.13 193)";  // NDF cyan

export function FeedbackScreen({
  question, roundIndex, selectedIndex, isCorrect, onNext,
}: FeedbackScreenProps) {
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const isLastRound = roundIndex + 1 >= TOTAL_ROUNDS;

  useEffect(() => {
    const timer = setTimeout(() => nextButtonRef.current?.focus(), 150);
    return () => clearTimeout(timer);
  }, []);

  const resultColor = isCorrect ? "oklch(0.72 0.20 142)" : "oklch(0.62 0.22 27)";

  return (
    <div className="flex min-h-screen">
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

          {/* Result banner */}
          <div
            className="w-full flex items-center gap-4 px-6 py-4 mb-7 justify-center text-center"
            role="alert"
            aria-live="polite"
            style={{
              background: `linear-gradient(90deg, ${resultColor}18 0%, ${resultColor}2E 50%, ${resultColor}18 100%)`,
              border: `1px solid ${resultColor}55`,
              borderRadius: "4px",
              boxShadow: `0 0 24px ${resultColor}1A`,
            }}
          >
            <div>
              <p className="text-xl font-bold uppercase tracking-wider" style={{ color: resultColor }}>
                {isCorrect ? "Correct!" : "Wrong Answer"}
              </p>
              {!isCorrect && (
                <p className="text-sm text-muted-foreground mt-0.5">Review the explanation below</p>
              )}
            </div>
          </div>

          {/* Question text */}
          <p className="text-base md:text-lg font-medium text-center text-pretty leading-relaxed mb-6 text-foreground">
            {question.question}
          </p>

          {/* Answer outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-6" role="list">
            {question.options.map((option, idx) => {
              const isSelected = idx === selectedIndex;
              const isCorrectOption = idx === question.correctIndex;

              let bg        = "oklch(0.11 0.04 272)";
              let border    = "oklch(0.22 0.04 272)";
              let textColor = "oklch(0.45 0.02 268)";
              let labelBg   = "oklch(0.18 0.04 272)";
              let labelCol  = "oklch(0.45 0.02 268)";

              if (isCorrectOption) {
                bg = "oklch(0.72 0.20 142 / 0.13)"; border = "oklch(0.72 0.20 142 / 0.55)";
                textColor = "oklch(0.82 0.14 142)";  labelBg = "oklch(0.72 0.20 142 / 0.28)"; labelCol = "oklch(0.82 0.14 142)";
              } else if (isSelected) {
                bg = "oklch(0.62 0.22 27 / 0.13)"; border = "oklch(0.62 0.22 27 / 0.55)";
                textColor = "oklch(0.75 0.15 27)";  labelBg = "oklch(0.62 0.22 27 / 0.28)"; labelCol = "oklch(0.75 0.15 27)";
              }

              return (
                <div
                  key={idx}
                  role="listitem"
                  className="flex items-center gap-3 px-5 py-3.5"
                  style={{
                    background: bg,
                    border: `1px solid ${border}`,
                    borderRadius: "4px",
                    opacity: !isCorrectOption && !isSelected ? 0.40 : 1,
                  }}
                >
                  <span
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full"
                    style={{ background: labelBg, color: labelCol }}
                  >
                    {OPTION_LABELS[idx]}
                  </span>
                  <span className="text-sm leading-snug" style={{ color: textColor }}>{option}</span>
                </div>
              );
            })}
          </div>

          {/* Clinical insight */}
          <div
            className="w-full px-5 py-4 mb-8"
            style={{
              background: "oklch(0.13 0.05 272)",
              border: `1px solid ${P}30`,
              borderRadius: "4px",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C }}>
              Language Insight
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {question.explanation}
            </p>
          </div>

          {/* Next button */}
          <div className="flex justify-center">
            <button
              ref={nextButtonRef}
              onClick={onNext}
              className="px-14 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{
                background: `linear-gradient(135deg, ${P} 0%, oklch(0.40 0.22 295) 100%)`,
                color: "oklch(0.97 0.006 265)",
                borderRadius: "3px",
                boxShadow: `0 0 20px ${P}40`,
              }}
            >
              {isLastRound ? "See Final Results" : "Next Question"}
            </button>
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
