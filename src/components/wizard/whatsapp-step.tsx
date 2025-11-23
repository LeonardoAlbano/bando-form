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
import { BaseStepLayout } from "./base-step-layout";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const whatsappSchema = z.object({
  phone: z.string().min(8, "Digite um número de WhatsApp válido."),
});

type WhatsappFormValues = z.infer<typeof whatsappSchema>;

type WhatsappStepProps = {
  stepNumber: number;
  onSubmit: (whatsapp: string) => void;
  defaultValue?: string;
  onBack?: () => void;
  canGoBack?: boolean;
};

export function WhatsappStep({
  stepNumber,
  onSubmit,
  defaultValue,
  onBack,
  canGoBack,
}: WhatsappStepProps) {
  const form = useForm<WhatsappFormValues>({
    resolver: zodResolver(whatsappSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleSubmit = (values: WhatsappFormValues) => {
    onSubmit(values.phone.trim());
  };

  return (
    <BaseStepLayout onBack={onBack} canGoBack={canGoBack}>
      <header className="mb-8 space-y-2">
        <p className="text-xs sm:text-sm text-gray-300">{stepNumber} →</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Em qual WhatsApp posso falar com você caso seja selecionado(a)?*
        </h1>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full max-w-2xl">
                <FormControl>
                  <PhoneInput
                    defaultCountry="br"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="(11) 96123-4567"
                    className="phone-input"
                    inputClassName="phone-input__field"
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
