"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
    setIsSubmitting(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 bg-white/5 p-6 rounded-lg border border-white/10"
      >
        <h1 className="text-xl font-semibold">Login admin</h1>

        {error && <p className="text-sm text-red-300">{error}</p>}

        <div className="space-y-2">
          <label className="block text-sm">E-mail</label>
          <input
            name="email"
            type="email"
            className="w-full bg-transparent border border-white/30 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">Senha</label>
          <input
            name="password"
            type="password"
            className="w-full bg-transparent border border-white/30 rounded px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 rounded bg-white text-black text-sm font-medium disabled:opacity-60"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
