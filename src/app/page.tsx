"use client";

import { useState } from "react";
import { IntroStep } from "@/components/wizard/intro-step";
import { NameStep } from "@/components/wizard/name-step";
import { WhatsappStep } from "@/components/wizard/whatsapp-step";
import type { Answers } from "@/types/steps";

export default function HomePage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);

  const handleIntroContinue = () => {
    setStepIndex(1);
  };

  const handleNameSubmit = (name: string) => {
    setAnswers((prev) => ({ ...prev, name }));
    setStepIndex(2);
  };

  const handleWhatsappSubmit = (whatsapp: string) => {
    setAnswers((prev) => ({ ...prev, whatsapp }));
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
    </main>
  );
}
