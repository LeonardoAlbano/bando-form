"use client";

import { BaseStepLayout } from "./base-step-layout";
import { Button } from "@/components/ui/button";

type IntroStepProps = {
  onContinue: () => void;
};

export function IntroStep({ onContinue }: IntroStepProps) {
  return (
    <BaseStepLayout>
      <section className="space-y-6 max-w-3xl">
        <p className="text-5xl leading-none text-white">“</p>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
            Você está a um passo de blindar sua operação...
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200">
            Entrando em uma comunidade exclusiva com players que se antecipam
            dos bloqueios e escalam sem medo no direct response!
          </p>
        </div>

        <div className="pt-4 flex items-center gap-3">
          <Button type="button" size="lg" onClick={onContinue}>
            Continue
          </Button>
          <span className="text-xs sm:text-sm text-gray-300">
            press <b>Enter</b> ↵
          </span>
        </div>
      </section>
    </BaseStepLayout>
  );
}
