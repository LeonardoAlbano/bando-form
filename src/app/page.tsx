"use client";

import { useState } from "react";
import { NameStep } from "@/components/wizard/name-step";
import { WhatsappStep } from "@/components/wizard/whatsapp-step";
import type { Answers } from "@/types/steps";

export default function HomePage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);

  const handleNameSubmit = (name: string) => {
    setAnswers((prev) => {
      const next = { ...prev, name };
      console.log("Depois da pergunta do nome:", next);
      return next;
    });

    setStepIndex(1);
  };

  const handleWhatsappSubmit = (whatsapp: string) => {
    setAnswers((prev) => {
      const next = { ...prev, whatsapp };
      console.log("Depois da pergunta do WhatsApp:", next);
      return next;
    });
  };

  return (
    <main className="min-h-screen flex items-center">
      {stepIndex === 0 && (
        <NameStep stepNumber={1} onSubmit={handleNameSubmit} />
      )}

      {stepIndex === 1 && (
        <WhatsappStep stepNumber={2} onSubmit={handleWhatsappSubmit} />
      )}
    </main>
  );
}
