"use client";

import { ReactNode } from "react";

type BaseStepLayoutProps = {
  children: ReactNode;
};

export function BaseStepLayout({ children }: BaseStepLayoutProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {children}
    </div>
  );
}
