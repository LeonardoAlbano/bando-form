import { prisma } from "../db/prisma";
import type { Application, CreateApplicationDTO } from "./application.dto";

export class ApplicationRepository {
  async create(data: CreateApplicationDTO): Promise<Application> {
    const created = await prisma.application.create({
      data: {
        name: data.name,
        whatsapp: data.whatsapp,
        mainChallenge: data.mainChallenge,
        reactionToBlock: data.reactionToBlock,
        controlLevel: data.controlLevel,
        finalFit: data.finalFit,
        notJoinReason: data.notJoinReason ?? null,
      },
    });

    return created;
  }

  async findAll(): Promise<Application[]> {
    const apps = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
    });

    return apps;
  }
}
