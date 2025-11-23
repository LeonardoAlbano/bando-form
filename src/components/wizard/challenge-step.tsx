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
import { Textarea } from "@/components/ui/textarea";

const challengeSchema = z.object({
  challenge: z.string().min(10, "Conte um pouco mais sobre o seu desafio."),
});

type ChallengeFormValues = z.infer<typeof challengeSchema>;

type ChallengeStepProps = {
  stepNumber: number;
  onSubmit: (challenge: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
};

export function ChallengeStep({
  stepNumber,
  onSubmit,
  onBack,
  canGoBack,
}: ChallengeStepProps) {
  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      challenge: "",
    },
  });

  const handleSubmit = (values: ChallengeFormValues) => {
    onSubmit(values.challenge.trim());
  };

  return (
    <BaseStepLayout onBack={onBack} canGoBack={canGoBack}>
      {" "}
      <div className="space-y-8 w-full max-w-3xl">
        <header className="space-y-3">
          <p className="text-xs sm:text-sm text-gray-300">{stepNumber} →</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Qual é o maior desafio que você enfrenta hoje com bloqueios ou
            estrutura de contingência?*
          </h1>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="challenge"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      autoFocus
                      rows={3}
                      placeholder="Type your answer here..."
                      className="bg-transparent border-0 border-b border-white/60 rounded-none px-0
                                 text-base sm:text-lg md:text-2xl
                                 text-white placeholder:text-gray-400
                                 focus-visible:ring-0 focus-visible:border-white
                                 resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm text-red-300" />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" size="lg" className="cursor-pointer">
                OK
              </Button>
              <span className="text-xs sm:text-sm text-gray-300">
                press <b>Enter</b> ↵
              </span>
            </div>
          </form>
        </Form>
      </div>
    </BaseStepLayout>
  );
}
