"use client";

import { useQuizGame } from "@/hooks/use-quiz-game";
import { WelcomeScreen } from "@/components/welcome-screen";
import { QuestionScreen } from "@/components/question-screen";
import { FeedbackScreen } from "@/components/feedback-screen";
import { ResultsScreen } from "@/components/results-screen";

export default function Page() {
  const {
    state,
    currentQuestion,
    isCorrect,
    startGame,
    selectAnswer,
    nextQuestion,
    restartGame,
  } = useQuizGame();

  const { screen, currentRoundIndex, selectedOptionIndex, correctCount } = state;

  return (
    <main className="relative isolate overflow-hidden min-h-screen bg-background text-foreground font-sans">
      {/* Spotlight radial from top-center — the Millionaire studio look */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.22 0.10 272 / 0.55) 0%, transparent 70%)",
        }}
      />
      {/* Subtle gold rim light at bottom */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 20% at 50% 110%, oklch(0.55 0.22 295 / 0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {screen === "welcome" && <WelcomeScreen onStart={startGame} />}

        {screen === "question" && currentQuestion && (
          <QuestionScreen
            key={`question-${currentRoundIndex}`}
            question={currentQuestion}
            roundIndex={currentRoundIndex}
            onSelect={selectAnswer}
          />
        )}

        {screen === "feedback" && currentQuestion && selectedOptionIndex !== null && (
          <FeedbackScreen
            key={`feedback-${currentRoundIndex}`}
            question={currentQuestion}
            roundIndex={currentRoundIndex}
            selectedIndex={selectedOptionIndex}
            isCorrect={isCorrect}
            onNext={nextQuestion}
          />
        )}

        {screen === "results" && (
          <ResultsScreen
            correctCount={correctCount}
            onRestart={restartGame}
          />
        )}
      </div>
    </main>
  );
}
