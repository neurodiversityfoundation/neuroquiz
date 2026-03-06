"use client";

import { useState, useCallback } from "react";
import { QUIZ_QUESTIONS, TOTAL_ROUNDS } from "@/lib/quiz-data";

export type GameScreen = "welcome" | "question" | "feedback" | "results";

export interface GameState {
  screen: GameScreen;
  currentRoundIndex: number;
  selectedOptionIndex: number | null;
  correctCount: number;
}

const INITIAL_STATE: GameState = {
  screen: "welcome",
  currentRoundIndex: 0,
  selectedOptionIndex: null,
  correctCount: 0,
};

export function useQuizGame() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

  const startGame = useCallback(() => {
    setState({ ...INITIAL_STATE, screen: "question" });
  }, []);

  const selectAnswer = useCallback((optionIndex: number) => {
    setState((prev) => {
      if (prev.screen !== "question") return prev;
      const question = QUIZ_QUESTIONS[prev.currentRoundIndex];
      const correct = optionIndex === question.correctIndex;
      return {
        ...prev,
        screen: "feedback",
        selectedOptionIndex: optionIndex,
        correctCount: prev.correctCount + (correct ? 1 : 0),
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentRoundIndex + 1;
      if (nextIndex >= TOTAL_ROUNDS) {
        return { ...prev, screen: "results" };
      }
      return {
        ...prev,
        screen: "question",
        currentRoundIndex: nextIndex,
        selectedOptionIndex: null,
      };
    });
  }, []);

  const restartGame = useCallback(() => {
    setState({ ...INITIAL_STATE, screen: "welcome" });
  }, []);

  const currentQuestion = QUIZ_QUESTIONS[state.currentRoundIndex];
  const isCorrect =
    state.selectedOptionIndex !== null &&
    currentQuestion != null &&
    state.selectedOptionIndex === currentQuestion.correctIndex;

  return {
    state,
    currentQuestion,
    isCorrect,
    startGame,
    selectAnswer,
    nextQuestion,
    restartGame,
  };
}
