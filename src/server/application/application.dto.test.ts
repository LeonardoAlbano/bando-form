import { describe, it, expect } from "vitest";
import { createApplicationSchema } from "./application.dto";

describe("createApplicationSchema", () => {
  it("deve aceitar um payload válido", () => {
    const data = {
      name: "Leonardo",
      whatsapp: "+55 47 99999-9999",
      mainChallenge: "Entender meu funil de vendas",
      reactionToBlock: "Paro de postar conteúdo",
      controlLevel: 3,
      finalFit: "YES" as const,
      notJoinReason: null,
    };

    const result = createApplicationSchema.safeParse(data);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe(data.name);
      expect(result.data.finalFit).toBe("YES");
    }
  });

  it("deve falhar se o controlLevel estiver fora do range", () => {
    const data = {
      name: "Leonardo",
      whatsapp: "+55 47 99999-9999",
      mainChallenge: "Teste",
      reactionToBlock: "Teste",
      controlLevel: 10, 
      finalFit: "YES" as const,
      notJoinReason: null,
    };

    const result = createApplicationSchema.safeParse(data);

    expect(result.success).toBe(false);
    if (!result.success) {
      const issueMessages = result.error.issues.map((i) => i.message);
      expect(issueMessages.length).toBeGreaterThan(0);
    }
  });

  it("deve falhar se finalFit tiver um valor inválido", () => {
    const data = {
      name: "Leonardo",
      whatsapp: "+55 47 99999-9999",
      mainChallenge: "Teste",
      reactionToBlock: "Teste",
      controlLevel: 3,
      finalFit: "MAYBE",
      notJoinReason: null,
    };

    const result = createApplicationSchema.safeParse(data);

    expect(result.success).toBe(false);
  });
});
