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

const feedbackSchema = z.object({
  reason: z.string().min(5, "Conta um pouco mais pra mim, por favor 🙂"),
});

type FeedbackValues = z.infer<typeof feedbackSchema>;

type FeedbackNoStepProps = {
  stepNumber: number;
  onSubmit: (reason: string) => void;
};

export function FeedbackNoStep({ stepNumber, onSubmit }: FeedbackNoStepProps) {
  const form = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      reason: "",
    },
  });

  const handleSubmit = (values: FeedbackValues) => {
    onSubmit(values.reason.trim());
  };

  return (
    <BaseStepLayout>
      <div className="w-full max-w-3xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs sm:text-sm text-gray-300">{stepNumber} →</p>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight">
            Sem problema se agora não é o momento.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-200">
            Mas me conta: o que exatamente fez você sentir que o Bando não era
            pra você ainda?*
          </p>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      autoFocus
                      rows={4}
                      placeholder="Type your answer here..."
                      className="bg-transparent border-0 border-b border-white/60 rounded-none px-0
                                 text-base sm:text-lg md:text-2xl
                                 text-white placeholder:text-gray-400
                                 focus-visible:ring-0 focus-visible:border-white resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm text-red-300" />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" size="lg">
                Submit
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
