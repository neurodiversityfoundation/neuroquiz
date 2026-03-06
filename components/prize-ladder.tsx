"use client";

import { cn } from "@/lib/utils";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";

interface PrizeLadderProps {
  currentRoundIndex: number;
  className?: string;
}

const P = "oklch(0.55 0.22 295)";  // NDF purple
const C = "oklch(0.76 0.13 193)";  // NDF cyan

export function PrizeLadder({ currentRoundIndex, className }: PrizeLadderProps) {
  const rows = QUIZ_QUESTIONS.map((q, i) => ({
    round: i,
    category: q.category,
  })).reverse();

  return (
    <aside
      className={cn("flex flex-col gap-0.5 w-44 flex-shrink-0", className)}
      aria-label="Question progress"
    >
      <p
        className="text-xs font-bold uppercase tracking-widest mb-2 text-center"
        style={{ color: C }}
      >
        Progress
      </p>

      {rows.map(({ round, category }) => {
        const isActive = round === currentRoundIndex;
        const isPast   = round < currentRoundIndex;

        return (
          <div
            key={round}
            aria-current={isActive ? "step" : undefined}
            className="flex items-center gap-2 px-3 py-1 text-xs font-medium transition-all duration-150 border-l-2"
            style={{
              borderLeftColor: isActive ? P : "transparent",
              background: isActive
                ? `linear-gradient(90deg, ${P}30, ${P}08)`
                : isPast
                ? "oklch(0.12 0.04 272 / 0.5)"
                : "transparent",
              color: isActive
                ? "oklch(0.97 0.006 265)"
                : isPast
                ? "oklch(0.42 0.02 268)"
                : "oklch(0.68 0.015 265)",
            }}
          >
            {/* Dot indicator */}
            <span
              className="flex-shrink-0 w-2 h-2 rounded-full"
              style={{
                background: isActive ? P : isPast ? "oklch(0.42 0.02 268)" : "oklch(0.28 0.04 272)",
              }}
              aria-hidden="true"
            />
            <span className={cn("tabular-nums font-bold flex-shrink-0", !isActive && "font-normal")}>
              {round + 1}
            </span>
            <span className="truncate opacity-80">{category}</span>
          </div>
        );
      })}
    </aside>
  );
}
