"use client";

import { BaseStepLayout } from "./base-step-layout";
import { Button } from "@/components/ui/button";

type StructureIntroStepProps = {
  onContinue: () => void;
  onBack?: () => void;
  canGoBack?: boolean;
};

export function StructureIntroStep({
  onContinue,
  onBack,
  canGoBack,
}: StructureIntroStepProps) {
  return (
    <BaseStepLayout onBack={onBack} canGoBack={canGoBack}>
      <section className="space-y-6 max-w-3xl">
        <p className="text-5xl leading-none text-white">“</p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Agora vamos conhecer um pouco mais da sua estrutura e entender o nível
          de blindagem…
        </h1>

        <div className="pt-4 flex items-center gap-3">
          <Button
            type="button"
            size="lg"
            onClick={onContinue}
            className="cursor-pointer"
          >
            Continue
          </Button>
          <span className="text-xs sm:text-sm text-gray-300">
            press Enter ↵
          </span>
        </div>
      </section>
    </BaseStepLayout>
  );
}
