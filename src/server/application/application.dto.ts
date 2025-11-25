import { z } from "zod";

export const createApplicationSchema = z.object({
  name: z.string().min(2).max(100),
  whatsapp: z
    .string()
    .min(8)
    .max(30)
    .regex(/^\+?[0-9()\s-]+$/, "WhatsApp inválido"),
  mainChallenge: z.string().min(5).max(1000),
  reactionToBlock: z.string().min(3).max(500),
  controlLevel: z.coerce.number().int().min(1).max(5),
  finalFit: z.enum(["YES", "NO"]),
  notJoinReason: z.string().max(1000).nullable().optional(),
});


export type CreateApplicationDTO = z.infer<typeof createApplicationSchema>;
