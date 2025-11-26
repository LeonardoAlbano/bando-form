import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimit, MAX_REQUESTS } from "./rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimit();
  });

  it("permite até MAX_REQUESTS chamadas por chave dentro da janela", () => {
    const key = "ip:test-1";

    for (let i = 0; i < MAX_REQUESTS; i++) {
      const allowed = checkRateLimit(key);
      expect(allowed).toBe(true);
    }

    const blocked = checkRateLimit(key);
    expect(blocked).toBe(false);
  });

  it("isola o limite por chave (chaves diferentes não compartilham contagem)", () => {
    const keyA = "ip:test-2-a";
    const keyB = "ip:test-2-b";

    for (let i = 0; i < MAX_REQUESTS; i++) {
      expect(checkRateLimit(keyA)).toBe(true);
    }
    expect(checkRateLimit(keyA)).toBe(false); 

    expect(checkRateLimit(keyB)).toBe(true);
  });

  it("resetRateLimit limpa a contagem e libera novamente", () => {
    const key = "ip:test-3";

    for (let i = 0; i < MAX_REQUESTS; i++) {
      expect(checkRateLimit(key)).toBe(true);
    }
    expect(checkRateLimit(key)).toBe(false); 

    resetRateLimit();

    expect(checkRateLimit(key)).toBe(true);
  });
});
