import { z } from "zod";
import { ApplicationRepository } from "./application.repository";
import type { Application, CreateApplicationDTO } from "./application.dto";

const createApplicationSchema = z.object({
  name: z.string().min(2),
  whatsapp: z.string().min(5),
  mainChallenge: z.string().min(5),
  reactionToBlock: z.string().min(2),
  controlLevel: z.number().int().min(1).max(5),
  finalFit: z.enum(["YES", "NO"]),
  notJoinReason: z.string().optional().nullable(),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;

export class ApplicationService {
  private readonly repository: ApplicationRepository;

  constructor(repository?: ApplicationRepository) {
    this.repository = repository ?? new ApplicationRepository();
  }

  async createApplication(payload: unknown): Promise<Application> {
    const data = createApplicationSchema.parse(payload);

    const dto: CreateApplicationDTO = {
      name: data.name.trim(),
      whatsapp: data.whatsapp.trim(),
      mainChallenge: data.mainChallenge.trim(),
      reactionToBlock: data.reactionToBlock.trim(),
      controlLevel: data.controlLevel,
      finalFit: data.finalFit,
      notJoinReason: data.notJoinReason?.trim() || null,
    };

    return this.repository.create(dto);
  }

  async listApplications(): Promise<Application[]> {
    return this.repository.findAll();
  }
}
