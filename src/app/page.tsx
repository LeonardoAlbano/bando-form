"use client";

import { useState } from "react";

import { IntroStep } from "@/components/wizard/intro-step";
import { NameStep } from "@/components/wizard/name-step";
import { WhatsappStep } from "@/components/wizard/whatsapp-step";
import { StoryStep } from "@/components/wizard/story-step";

type Answers = {
  name?: string;
  whatsapp?: string;
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
    </main>
  );
}
