"use client";

import { BaseStepLayout } from "./base-step-layout";
import { Button } from "@/components/ui/button";

type StoryStepProps = {
  onContinue: () => void;
};

const paragraphs = [
  "Eu sei como é. Aquele medo de acordar no final de semana, dia de bater escalar, e descobrir que sua operação de vendas parou por um bloqueio que você nem entende direito.",
  "Você sente que passa 80% do seu tempo em atividades de defesa, apagando incêndios, e só 20% no ataque, que é o que realmente faz seu negócio crescer.",
  "E eu e você sabemos... A culpa não é da plataforma, afinal enquanto você apanha, outras pessoas escalam.",
  "No BANDO, nós não oferecemos soluções mágicas ou hacks que falham na primeira tentativa de escala. Nós te entregamos o mapa para você se tornar um faixa-preta da contingência.",
  "Um sistema completo, que te permite criar contas a menos de R$ 100 de custo e resolver qualquer problema de bloqueio em alguns passos aplicados.",
  "Essa é sua chance de obter a arma secreta que a maioria dos players que escalam aplicam: o domínio completo sobre a contingência no Google Ads.",
  "Se você se vê nesse cenário e precisa blindar sua operação para sair do incêndio e poder focar no ataque, esse mapa é para você!",
];

export function StoryStep({ onContinue }: StoryStepProps) {
  return (
    <BaseStepLayout>
      <section className="space-y-6 max-w-3xl">
        <p className="text-5xl leading-none text-white">“</p>

        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
            Já teve seu resultado travado no Google, por causa de um bloqueio
            que você não sabe resolver?
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 italic">
            Essa é a história de muitos que chegam até aqui…
          </p>
        </header>

        <div className="space-y-4 text-sm sm:text-base md:text-lg text-gray-200">
          {paragraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        <div className="pt-6 flex items-center gap-3">
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
