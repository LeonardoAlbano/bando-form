"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import type { Answers } from "@/features/application/wizard/types";

const STORAGE_KEY = "bando-form-wizard";

type WizardState = {
  stepIndex: number;
  answers: Answers;
};

export function useWizardState(initialStep = 0) {
  const [state, setState] = useState<WizardState>({
    stepIndex: initialStep,
    answers: {},
  });

  const { stepIndex, answers } = state;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Partial<WizardState>;

      setState((prev) => ({
        stepIndex:
          typeof parsed.stepIndex === "number"
            ? parsed.stepIndex
            : prev.stepIndex,
        answers:
          parsed.answers && typeof parsed.answers === "object"
            ? parsed.answers
            : prev.answers,
      }));
    } catch {
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (stepIndex >= 11) return;

    const payload: WizardState = { stepIndex, answers };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [stepIndex, answers]);

  function goToStep(index: number) {
    setState((prev) => ({
      ...prev,
      stepIndex: index,
    }));
  }

  function goBack() {
    setState((prev) => {
      const PREVIOUS_STEP: Record<number, number | null> = {
        0: null,
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 5,
        7: 6,
        8: 7,
        9: 8,
        10: 9,
        11: 9,
      };

      const prevIndex = PREVIOUS_STEP[prev.stepIndex];
      if (prevIndex === null || prevIndex === undefined) {
        return prev;
      }

      return {
        ...prev,
        stepIndex: prevIndex,
      };
    });
  }

  function updateAnswers(partial: Partial<Answers>) {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        ...partial,
      },
    }));
  }

  function reset() {
    setState({
      stepIndex: initialStep,
      answers: {},
    });

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  return {
    stepIndex,
    answers,
    goToStep,
    goBack,
    updateAnswers,
    reset,
  };
}
