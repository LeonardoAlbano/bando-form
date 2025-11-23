"use client";

import { useEffect, useState } from "react";
import { useWizardState } from "@/features/application/wizard/use-wizard-state";
import type { Answers } from "@/features/application/wizard/types";

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
import { submitApplication } from "@/lib/application-client";

export default function HomePage() {
  const { stepIndex, answers, goToStep, goBack, updateAnswers, reset } =
    useWizardState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const canGoBack = stepIndex > 0 && stepIndex < 11;

  async function handleFinishWizard(currentAnswers: Answers) {
    if (hasSubmitted) return;

    if (
      !currentAnswers.name ||
      !currentAnswers.whatsapp ||
      !currentAnswers.challenge ||
      !currentAnswers.blockedBehavior ||
      currentAnswers.controlLevel === undefined ||
      !currentAnswers.finalFit
    ) {
      console.error("Respostas incompletas:", currentAnswers);
      return;
    }

    const payload = {
      name: currentAnswers.name,
      whatsapp: currentAnswers.whatsapp,
      mainChallenge: currentAnswers.challenge,
      reactionToBlock: currentAnswers.blockedBehavior,
      controlLevel: currentAnswers.controlLevel,
      finalFit: currentAnswers.finalFit === "yes" ? "YES" : "NO",
      notJoinReason:
        currentAnswers.finalFit === "no"
          ? currentAnswers.finalReason ?? null
          : null,
    } as const;

    try {
      setIsSubmitting(true);
      const saved = await submitApplication(payload);
      console.log("Salvo com sucesso:", saved);
      setHasSubmitted(true);
      reset();
    } catch (err) {
      console.error("Erro ao enviar aplicação:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (stepIndex === 11 && !hasSubmitted) {
      void handleFinishWizard(answers);
    }
  }, [stepIndex, answers, hasSubmitted]);

  const handleIntroContinue = () => {
    goToStep(1);
  };

  const handleNameSubmit = (name: string) => {
    updateAnswers({ name });
    goToStep(2);
  };

  const handleWhatsappSubmit = (whatsapp: string) => {
    updateAnswers({ whatsapp });
    goToStep(3);
  };

  const handleStoryContinue = () => {
    goToStep(4);
  };

  const handleStructureIntroContinue = () => {
    goToStep(5);
  };

  const handleChallengeSubmit = (challenge: string) => {
    updateAnswers({ challenge });
    goToStep(6);
  };

  const handleBlockedBehaviorSubmit = (behavior: string) => {
    updateAnswers({ blockedBehavior: behavior });
    goToStep(7);
  };

  const handleControlLevelSubmit = (level: number) => {
    updateAnswers({ controlLevel: level });
    goToStep(8);
  };

  const handleContentPillarsContinue = () => {
    goToStep(9);
  };

  const handleFinalFitSubmit = (fit: "yes" | "no") => {
    updateAnswers({ finalFit: fit });

    if (fit === "no") {
      goToStep(10);
    } else {
      goToStep(11);
    }
  };

  const handleFeedbackNoSubmit = (reason: string) => {
    updateAnswers({ finalReason: reason });
    goToStep(11);
  };

  return (
    <main className="min-h-screen flex items-center">
      {stepIndex === 0 && <IntroStep onContinue={handleIntroContinue} />}

      {stepIndex === 1 && (
        <NameStep
          stepNumber={1}
          onSubmit={handleNameSubmit}
          defaultValue={answers.name}
          onBack={goBack}
          canGoBack={canGoBack}
        />
      )}

      {stepIndex === 2 && (
        <WhatsappStep
          stepNumber={2}
          onSubmit={handleWhatsappSubmit}
          // já já a gente adiciona esses props no componente
          onBack={goBack}
          canGoBack={canGoBack}
        />
      )}

      {stepIndex === 3 && (
        <StoryStep
          onContinue={handleStoryContinue}
          onBack={goBack}
          canGoBack={canGoBack}
        />
      )}

      {stepIndex === 4 && (
        <StructureIntroStep
          onContinue={handleStructureIntroContinue}
          onBack={goBack}
          canGoBack={canGoBack}
        />
      )}

      {stepIndex === 5 && (
        <ChallengeStep
          stepNumber={3}
          onSubmit={handleChallengeSubmit}
          onBack={goBack}
          canGoBack={canGoBack}
        />
      )}

      {stepIndex === 6 && (
        <BlockedActionStep
          stepNumber={4}
          onSubmit={handleBlockedBehaviorSubmit}
          onBack={goBack}
          canGoBack={canGoBack}
        />
      )}

      {stepIndex === 7 && (
        <ControlLevelStep
          stepNumber={5}
          onSubmit={handleControlLevelSubmit}
          onBack={goBack}
          canGoBack={canGoBack}
        />
      )}

      {stepIndex === 8 && (
        <ContentPillarsStep
          onContinue={handleContentPillarsContinue}
          onBack={goBack}
          canGoBack={canGoBack}
        />
      )}

      {stepIndex === 9 && (
        <FinalOfferStep
          stepNumber={6}
          onSubmit={handleFinalFitSubmit}
          onBack={goBack}
          canGoBack={canGoBack}
        />
      )}

      {stepIndex === 10 && (
        <FeedbackNoStep
          stepNumber={7}
          onSubmit={handleFeedbackNoSubmit}
          onBack={goBack}
          canGoBack={canGoBack}
        />
      )}

      {stepIndex === 11 && <ThankYouStep name={answers.name} />}
    </main>
  );
}
