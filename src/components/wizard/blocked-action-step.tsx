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
  {
    value: "wait_and_new_account",
    letter: "A",
    label: "Espero alguns dias e crio uma conta nova",
  },
  {
    value: "support_appeal",
    letter: "B",
    label: "Tento resolver com suporte / apelo",
  },
  {
    value: "ask_specialist",
    letter: "C",
    label: "Peço ajuda pra alguém que entende de contingência",
  },
  {
    value: "structured_process",
    letter: "D",
    label: "Tenho um processo estruturado pra contornar",
  },
  {
    value: "dont_know",
    letter: "E",
    label: "Não sei o que fazer",
  },
] as const;

const blockedSchema = z.object({
  behavior: z.enum(OPTIONS.map((o) => o.value) as [string, ...string[]], {
    message: "Selecione uma opção.",
  }),
});

type BlockedFormValues = z.infer<typeof blockedSchema>;

type BlockedActionStepProps = {
  stepNumber: number;
  onSubmit: (behavior: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
};
export function BlockedActionStep({
  stepNumber,
  onSubmit,
  onBack,
  canGoBack,
}: BlockedActionStepProps) {
  const form = useForm<BlockedFormValues>({
    resolver: zodResolver(blockedSchema),
    defaultValues: {
      behavior: undefined,
    },
  });

  const handleSubmit = (values: BlockedFormValues) => {
    onSubmit(values.behavior);
  };

  return (
    <BaseStepLayout onBack={onBack} canGoBack={canGoBack}>
      <div className="space-y-8 w-full max-w-3xl">
        <header className="space-y-3">
          <p className="text-xs sm:text-sm text-gray-300">{stepNumber} →</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Pra entender onde você está no jogo... Quando sua estrutura é
            bloqueada, o que você costuma fazer?*
          </h1>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="behavior"
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

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" size="lg" className="cursor-pointer">
                OK
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </BaseStepLayout>
  );
}
