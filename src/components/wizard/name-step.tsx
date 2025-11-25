"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BaseStepLayout } from "./base-step-layout";

const nameSchema = z.object({
  name: z.string().min(2, "Digite pelo menos 2 caracteres."),
});

type NameFormValues = z.infer<typeof nameSchema>;

type NameStepProps = {
  stepNumber: number;
  onSubmit: (name: string) => void;
  defaultValue?: string;
  onBack?: () => void;
  canGoBack?: boolean;
};

export function NameStep({
  stepNumber,
  onSubmit,
  defaultValue,
  onBack,
  canGoBack,
}: NameStepProps) {
  const form = useForm<NameFormValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: defaultValue ?? "",
    },
  });

  const handleSubmit = (values: NameFormValues) => {
    onSubmit(values.name.trim());
  };

  return (
    <BaseStepLayout onBack={onBack} canGoBack={canGoBack}>
      <header className="mb-8 space-y-2">
        <p className="text-xs sm:text-sm text-gray-300">{stepNumber} →</p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Seja bem-vindo, qual seu nome?*
        </h1>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    autoFocus
                    data-clarity-mask="true"
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
            <Button
              type="submit"
              size="lg"
              variant="default"
              className="cursor-pointer"
            >
              OK
            </Button>
            <span className="text-xs sm:text-sm text-gray-300">
              press <b>Enter</b> ↵
            </span>
          </div>
        </form>
      </Form>
    </BaseStepLayout>
  );
}
