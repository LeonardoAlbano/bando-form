"use client";

import { BaseStepLayout } from "./base-step-layout";
import { Button } from "@/components/ui/button";

type ContentPillarsStepProps = {
  onContinue: () => void;
};

const PILLARS = [
  {
    title: "Networking Estratégico",
    description:
      "No Bando, você não está sozinho tentando resolver bloqueios. Aqui, cada membro compartilha testes, insights e estruturas que mantêm campanhas vivas — é uma comunidade de operadores que vivem a contingência na prática.",
  },
  {
    title: "Suporte Direto",
    description:
      "Tenha acesso ao Camaleão dentro da plataforma com insights de quem já domina o jogo. Além disso, outros membros experientes estão sempre presentes pra te ajudar a destravar o que estiver travando sua operação.",
  },
  {
    title: "Conteúdos Gravados",
    description:
      "Tenha acesso ao Módulo Avançado de Contingência, além de aulas sobre fundamentos, pesquisa, YouTube Ads e atualizações constantes no Media Buyers Club, nossa central de inteligência e experimentação. São aulas práticas, diretas e validadas no campo.",
  },
  {
    title: "Calls ao Vivo",
    description:
      "Participe de dois Hotseats mensais com o Camaleão, para revisar sua operação, corrigir gargalos e ajustar sua estrutura de contingência ao mais alto nível.",
  },
  {
    title: "Calls com Convidados",
    description:
      "Tenha acesso a aulas e conversas com especialistas convidados, profissionais que dominam estratégias complementares e ampliam sua visão sobre YouTube, contingência e tráfego avançado.",
  },
];

export function ContentPillarsStep({ onContinue }: ContentPillarsStepProps) {
  return (
    <BaseStepLayout>
      <section className="space-y-8 max-w-3xl">
        <p className="text-5xl leading-none text-white">“</p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          NO BANDO VOCÊ ENCONTRA OS PILARES QUE VÃO MANTER SUA OPERAÇÃO
          BLINDADA!
        </h1>

        <div className="space-y-4 text-sm sm:text-base md:text-lg text-gray-200">
          {PILLARS.map((pillar) => (
            <p key={pillar.title}>
              <span className="font-semibold">{pillar.title}:</span>{" "}
              {pillar.description}
            </p>
          ))}
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
