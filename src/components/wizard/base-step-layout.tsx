"use client";

import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

type BaseStepLayoutProps = {
  children: ReactNode;
  onBack?: () => void;
  canGoBack?: boolean;
};

export function BaseStepLayout({
  children,
  onBack,
  canGoBack,
}: BaseStepLayoutProps) {
  return (
    <div className="w-full min-h-screen flex justify-center items-center py-15 px-4 sm:px-6">
      <div className="w-full max-w-4xl">
        <div className="flex items-center mb-6">
          {canGoBack && onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
