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
import { Input } from "@/components/ui/input";

const controlLevelSchema = z.object({
  controlLevel: z.string().regex(/^[1-5]$/, "Digite um número de 1 a 5."),
});

type ControlLevelFormValues = z.infer<typeof controlLevelSchema>;

type ControlLevelStepProps = {
  stepNumber: number;
  onSubmit: (level: number) => void;
  onBack?: () => void;
  canGoBack?: boolean;
};

export function ControlLevelStep({
  stepNumber,
  onSubmit,
  onBack,
  canGoBack,
}: ControlLevelStepProps) {
  const form = useForm<ControlLevelFormValues>({
    resolver: zodResolver(controlLevelSchema),
    defaultValues: {
      controlLevel: "",
    },
  });

  const handleSubmit = (values: ControlLevelFormValues) => {
    const level = Number(values.controlLevel);
    onSubmit(level);
  };

  return (
    <BaseStepLayout onBack={onBack} canGoBack={canGoBack}>
      <div className="space-y-8 w-full max-w-3xl">
        <header className="space-y-3">
          <p className="text-xs sm:text-sm text-gray-300">{stepNumber} →</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Sinceramente... Em uma escala de 1 a 5, quanto você sente que tem
            controle sobre os bloqueios das suas campanhas?*
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300">
            (Escala de 1 = zero controle, 5 = total controle)
          </p>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="controlLevel"
              render={({ field }) => (
                <FormItem className="max-w-xs">
                  <FormControl>
                    <Input
                      {...field}
                      autoFocus
                      inputMode="numeric"
                      maxLength={1}
                      placeholder="Type your answer here..."
                      className="bg-transparent border-0 border-b border-white/60 rounded-none px-0
                                 text-base sm:text-lg md:text-2xl
                                 text-white placeholder:text-gray-400
                                 focus-visible:ring-0 focus-visible:border-white"
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
