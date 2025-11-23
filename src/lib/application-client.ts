export type ApplicationPayload = {
  name: string;
  whatsapp: string;
  mainChallenge: string;
  reactionToBlock: string;
  controlLevel: number;
  finalFit: "YES" | "NO";
  notJoinReason?: string | null;
};

type ApplicationResponse = {
  id: string;
  name: string;
  whatsapp: string;
  mainChallenge: string;
  reactionToBlock: string;
  controlLevel: number;
  finalFit: "YES" | "NO";
  notJoinReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function submitApplication(
  payload: ApplicationPayload
): Promise<ApplicationResponse> {
  const res = await fetch("/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errorBody: unknown = null;
    try {
      errorBody = await res.json();
    } catch {
      try {
        const text = await res.text();
        errorBody = { raw: text };
      } catch {
        errorBody = null;
      }
    }

    console.error("[submitApplication] API error", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });

    const message =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (errorBody as any)?.message ??
      `Erro ao enviar aplicação (status ${res.status})`;

    throw new Error(message);
  }

  const data = (await res.json()) as ApplicationResponse;
  return data;
}
