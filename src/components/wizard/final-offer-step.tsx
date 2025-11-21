"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { BaseStepLayout } from "./base-step-layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const OPTIONS = [
  { value: "yes", letter: "A", label: "Faz sentido!" },
  { value: "no", letter: "B", label: "No momento não!" },
] as const;

type FinalFit = (typeof OPTIONS)[number]["value"];

const finalFitSchema = z.object({
  fit: z.enum(OPTIONS.map((o) => o.value) as [FinalFit, ...FinalFit[]], {
    message: "Selecione uma opção.",
  }),
});

type FinalFitValues = z.infer<typeof finalFitSchema>;

type FinalOfferStepProps = {
  stepNumber: number;
  onSubmit: (fit: "yes" | "no") => void;
};

export function FinalOfferStep({ stepNumber, onSubmit }: FinalOfferStepProps) {
  const form = useForm<FinalFitValues>({
    resolver: zodResolver(finalFitSchema),
    defaultValues: {
      fit: undefined,
    },
  });

  const handleSubmit = (values: FinalFitValues) => {
    onSubmit(values.fit);
  };

  return (
    <BaseStepLayout>
      <div className="space-y-8 w-full max-w-3xl">
        <header className="space-y-3">
          <p className="text-xs sm:text-sm text-gray-300">{stepNumber} →</p>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight">
            Se você chegou até aqui, já percebeu que o Bando não é apenas mais
            uma comunidade sobre tráfego.*
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-emerald-200 font-semibold">
            É onde gestores aprendem a dominar a contingência, controlar o
            imprevisível e escalar suas operações com segurança total.
          </p>
        </header>

        <section className="space-y-4 text-sm sm:text-base md:text-lg text-gray-200">
          <p>
            Dentro do Bando, você vai ter acesso ao{" "}
            <span className="font-semibold">
              Módulo Avançado de Contingência
            </span>
            , com o sistema completo pra construir estruturas blindadas, criar
            contas por menos de R$100 e resolver bloqueios em minutos, sem
            depender de terceiros ou fórmulas frágeis.
          </p>

          <p>Além disso, você entra num ecossistema vivo:</p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Media Buyers Club com atualizações constantes,</li>
            <li>Hotseats mensais com o Camaleão,</li>
            <li>Networking ativo com operadores de alto nível,</li>
            <li>e o suporte contínuo da comunidade e da equipe.</li>
          </ul>

          <p>
            O acesso completo ao Bando está disponível por R$2.497 (podendo ser
            parcelado em até 6x no cartão) ou à vista via Pix.
          </p>

          <p>
            Após o período inicial de 6 meses, você pode renovar sua permanência
            por R$997 a cada semestre, garantindo acesso contínuo aos novos
            módulos, conteúdos e suporte interno.
          </p>

          <p>
            O verdadeiro custo não está em entrar pro Bando, está em continuar
            operando vulnerável, torcendo pra não ser bloqueado.
          </p>
        </section>

        <section className="space-y-3 text-sm sm:text-base md:text-lg text-gray-200">
          <h2 className="font-semibold uppercase text-white">
            BÔNUS DE MEMBRO ATIVO:
          </h2>

          <p>
            <span className="font-semibold">GhostFarm:</span> agente inteligente
            que auxilia na criação de contas seguras e de alta qualidade por
            menos de R$100.
          </p>

          <p>
            <span className="font-semibold">Sistema de níveis Skool:</span>{" "}
            conquiste prêmios e desbloqueie vantagens conforme evolui.
          </p>

          <p>
            <span className="font-semibold">
              Acesso gratuito a qualquer produto do Camaleão
            </span>{" "}
            de até R$1.000.
          </p>
        </section>

        <section className="space-y-4">
          <p className="text-sm sm:text-base md:text-lg text-gray-200">
            <span className="font-semibold">Agora me diz:</span>
            <br />
            faz sentido dar esse passo e assumir o controle total da sua
            contingência?
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="fit"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="space-y-3"
                      >
                        {OPTIONS.map((option) => (
                          <div key={option.value}>
                            <RadioGroupItem
                              id={option.value}
                              value={option.value}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={option.value}
                              className="
                                flex items-center gap-3
                                rounded-md border border-white/40 bg-black/30
                                px-3 py-3 cursor-pointer
                                text-white text-sm sm:text-base md:text-lg
                                transition
                                peer-data-[state=checked]:bg-white
                                peer-data-[state=checked]:text-black
                                peer-data-[state=checked]:border-white
                              "
                            >
                              <span
                                className="
                                  flex h-7 w-7 items-center justify-center
                                  rounded-md border border-current
                                  text-xs font-semibold
                                "
                              >
                                {option.letter}
                              </span>
                              <span>{option.label}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm text-red-300" />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" size="lg">
                  OK
                </Button>
                <span className="text-xs sm:text-sm text-gray-300">
                  press Enter ↵
                </span>
              </div>
            </form>
          </Form>
        </section>
      </div>
    </BaseStepLayout>
  );
}
