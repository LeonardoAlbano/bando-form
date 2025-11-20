"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HomePage() {
  const [stepIndex] = useState(0);

  return (
    <main className="min-h-screen flex items-center justify-center lg:justify-end">
      <div className="w-full max-w-5xl mx-auto px-6 py-10">
        <header className="mb-10">
          <p className="text-sm text-gray-300">Passo {stepIndex + 1}</p>
        </header>

        <section className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Você está a um passo de blindar sua operação...
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
            Entrando em uma comunidade exclusiva com players que se antecipam
            dos bloqueios e escalam sem medo no direct response!
          </p>
        </section>

        <footer className="mt-10 flex items-center gap-3">
          <Button>Continue</Button>
          <span className="text-sm text-gray-300">press Enter ↵</span>
        </footer>
      </div>
    </main>
  );
}
