"use client";

import { BaseStepLayout } from "./base-step-layout";

type ThankYouStepProps = {
  name?: string;
};

export function ThankYouStep({ name }: ThankYouStepProps) {
  return (
    <BaseStepLayout>
      <section className="space-y-6 max-w-3xl">
        <p className="text-5xl leading-none text-white">“</p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Obrigado{name ? `, ${name}` : ""}! Seu formulário foi enviado com
          sucesso.
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-200">
          Em breve o time do Bando vai analisar suas respostas e, se fizer
          sentido, entrar em contato com você.
        </p>
      </section>
    </BaseStepLayout>
  );
}
