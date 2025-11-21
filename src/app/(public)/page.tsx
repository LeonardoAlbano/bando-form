"use client";

import { useState } from "react";

import { IntroStep } from "@/components/wizard/intro-step";
import { NameStep } from "@/components/wizard/name-step";
import { WhatsappStep } from "@/components/wizard/whatsapp-step";
import { StoryStep } from "@/components/wizard/story-step";
import { StructureIntroStep } from "@/components/wizard/structure-intro-step";
import { ChallengeStep } from "@/components/wizard/challenge-step";
import { BlockedActionStep } from "@/components/wizard/blocked-action-step";
import { ControlLevelStep } from "@/components/wizard/control-level-step";
import { ContentPillarsStep } from "@/components/wizard/content-pillars-step";
import { FinalOfferStep } from "@/components/wizard/final-offer-step";
import { FeedbackNoStep } from "@/components/wizard/feedback-no-step";
import { ThankYouStep } from "@/components/wizard/thank-you-step";

type Answers = {
  name?: string;
  whatsapp?: string;
  challenge?: string;
  blockedBehavior?: string;
  controlLevel?: number;
  finalFit?: "yes" | "no";
  finalReason?: string;
};

export default function HomePage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const handleIntroContinue = () => {
    setStepIndex(1);
  };

  const handleNameSubmit = (name: string) => {
    setAnswers((prev) => ({ ...prev, name }));
    setStepIndex(2);
  };

  const handleWhatsappSubmit = (whatsapp: string) => {
    setAnswers((prev) => ({ ...prev, whatsapp }));
    setStepIndex(3);
  };

  const handleStoryContinue = () => {
    setStepIndex(4);
  };

  const handleStructureIntroContinue = () => {
    setStepIndex(5);
  };

  const handleChallengeSubmit = (challenge: string) => {
    setAnswers((prev) => ({ ...prev, challenge }));
    setStepIndex(6);
  };

  const handleBlockedBehaviorSubmit = (behavior: string) => {
    setAnswers((prev) => ({ ...prev, blockedBehavior: behavior }));
    setStepIndex(7);
  };

  const handleControlLevelSubmit = (level: number) => {
    setAnswers((prev) => ({ ...prev, controlLevel: level }));
    setStepIndex(8);
  };

  const handleContentPillarsContinue = () => {
    setStepIndex(9);
  };

  const handleFinalFitSubmit = (fit: "yes" | "no") => {
    setAnswers((prev) => ({ ...prev, finalFit: fit }));

    if (fit === "no") {
      setStepIndex(10);
    } else {
      setStepIndex(11);
    }
  };

  const handleFeedbackNoSubmit = (reason: string) => {
    setAnswers((prev) => ({ ...prev, finalReason: reason }));
    setStepIndex(11);
  };

  return (
    <main className="min-h-screen flex items-center">
      {stepIndex === 0 && <IntroStep onContinue={handleIntroContinue} />}

      {stepIndex === 1 && (
        <NameStep stepNumber={1} onSubmit={handleNameSubmit} />
      )}

      {stepIndex === 2 && (
        <WhatsappStep stepNumber={2} onSubmit={handleWhatsappSubmit} />
      )}

      {stepIndex === 3 && <StoryStep onContinue={handleStoryContinue} />}

      {stepIndex === 4 && (
        <StructureIntroStep onContinue={handleStructureIntroContinue} />
      )}

      {stepIndex === 5 && (
        <ChallengeStep stepNumber={3} onSubmit={handleChallengeSubmit} />
      )}

      {stepIndex === 6 && (
        <BlockedActionStep
          stepNumber={4}
          onSubmit={handleBlockedBehaviorSubmit}
        />
      )}

      {stepIndex === 7 && (
        <ControlLevelStep stepNumber={5} onSubmit={handleControlLevelSubmit} />
      )}

      {stepIndex === 8 && (
        <ContentPillarsStep onContinue={handleContentPillarsContinue} />
      )}

      {stepIndex === 9 && (
        <FinalOfferStep stepNumber={6} onSubmit={handleFinalFitSubmit} />
      )}

      {stepIndex === 10 && (
        <FeedbackNoStep stepNumber={7} onSubmit={handleFeedbackNoSubmit} />
      )}

      {stepIndex === 11 && <ThankYouStep name={answers.name} />}
    </main>
  );
}
