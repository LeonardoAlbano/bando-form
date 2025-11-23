import { z } from "zod";

export const createApplicationSchema = z.object({
  name: z.string().min(1),
  whatsapp: z.string().min(1),
  mainChallenge: z.string().min(1),
  reactionToBlock: z.string().min(1),
  controlLevel: z.coerce.number().int().min(1).max(5),
  finalFit: z.enum(["YES", "NO"]),
  notJoinReason: z.string().nullable().optional(),
});

export type CreateApplicationDTO = z.infer<typeof createApplicationSchema>;
